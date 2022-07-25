//from here: https://www.openprocessing.org/sketch/496452/

/**
 * dwgl.js - a very lightweight webgl wrapper.
 *
 * Copyright 2018 by Thomas Diewald (https://www.thomasdiewald.com)
 *
 *           MIT License: https://opensource.org/licenses/MIT
 *            ource: https://github.com/diwi/p5.EasyCam (will be moved)
 *
 * versions: webgl1, webgl2
 *
 */

/**
 * Note:
 * This is just a draft and for experimental purposes only.
 * To work with it you need a browser that supports webgl2.
 *
 * http://webglreport.com/?v=2
 * https://caniuse.com/#feat=webgl2
 * https://webglstats.com/
 *
 */


/**
 * This Reaction-Diffusion Demo is a port from the PixelFlow-Library.
 * https://github.com/diwi/PixelFlow/tree/master/examples/Miscellaneous/ReactionDiffusion
 */


'use strict';

let poseNet;
let poses = [];
var capture;
var smoothedPos;

// framebuffer
var fbo;

// tex-struct (ping-pong)
var tex = {
  src: null,
  dst: null,
  swap: function() {
    var tmp = this.src;
    this.src = this.dst;
    this.dst = tmp;
  }
};

// shader
var shaderfiles = {};
var shader_grayscott;
var shader_display;

// offscreen resolution scale factor.
var SCREEN_SCALE = 1.0;

// reaction diffusion settings and presets
var rdDef = {
  name: 'ReactionDiffusion',
  da: 1.0,
  db: 0.6,
  feed: 0.04,
  kill: 0.06,
  dt: 1.0,
  iter: 10,
  reset: initRD,
  preset0: function() {
    this.feed = 0.040;
    this.kill = 0.060;
    this.da = 1.00;
    this.db = 0.60;
  },
  preset1: function() {
    this.feed = 0.034;
    this.kill = 0.059;
    this.da = 1.00;
    this.db = 0.60;
  },
  preset2: function() {
    this.feed = 0.080;
    this.kill = 0.060;
    this.da = 1.00;
    this.db = 0.40;
  },
  preset3: function() {
    this.feed = 0.015;
    this.kill = 0.050;
    this.da = 1.00;
    this.db = 0.60;
  },
  preset4: function() {
    this.feed = 0.072;
    this.kill = 0.062;
    this.da = 0.50;
    this.db = 0.25;
  },
  preset5: function() {
    this.feed = 0.071;
    this.kill = 0.063;
    this.da = 0.40;
    this.db = 0.20;
  },
  preset6: function() {
    this.feed = 0.023;
    this.kill = 0.052;
    this.da = 0.50;
    this.db = 0.50;
  },
  preset7: function() {
    this.feed = 0.029;
    this.kill = 0.056;
    this.da = 0.60;
    this.db = 0.46;
  },
  preset8: function() {
    this.feed = 0.04;
    this.kill = 0.06;
    this.da = 1.;
    this.db = 0.17;
  },
};



function setup() {
  pixelDensity(1);

  // webgl canvas
  createCanvas(windowWidth, windowHeight, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(capture, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });

  // create gui (dat.gui)
  var gui = new dat.GUI();
  gui.add(rdDef, 'name');
  gui.add(rdDef, 'da', 0, 1).listen();
  gui.add(rdDef, 'db', 0, 1).listen();
  gui.add(rdDef, 'feed', 0.01, 0.09).listen();
  gui.add(rdDef, 'kill', 0.01, 0.09).listen();
  gui.add(rdDef, 'dt', 0, 1);
  gui.add(rdDef, 'iter', 1, 50);
  gui.add(rdDef, 'preset0');
  gui.add(rdDef, 'preset1');
  gui.add(rdDef, 'preset2');
  gui.add(rdDef, 'preset3');
  gui.add(rdDef, 'preset4');
  gui.add(rdDef, 'preset5');
  gui.add(rdDef, 'preset6');
  gui.add(rdDef, 'preset7');
  gui.add(rdDef, 'preset8');
  gui.add(rdDef, 'reset');


  // webgl context
  var gl = this._renderer.GL;

  // webgl version (1=webgl1, 2=webgl2)
  var VERSION = gl.getVersion();
  gl.c

  console.log("WebGL Version: " + VERSION);


  // get some webgl extensions
  // if(VERSION === 1){
  // var ext = gl.newExt(['OES_texture_float', 'OES_texture_float_linear'], true);
  // }
  // if(VERSION === 2){
  // var ext = gl.newExt(['EXT_color_buffer_float'], true);
  // }

  // beeing lazy ... load all available extensions.
  gl.newExt(gl.getSupportedExtensions(), true);


  // create FrameBuffer for offscreen rendering
  fbo = gl.newFramebuffer();

  // create Textures for multipass rendering
  var def = {
    target: gl.TEXTURE_2D,
    iformat: gl.RGBA32F,
    format: gl.RGBA,
    type: gl.FLOAT,
    wrap: gl.CLAMP_TO_EDGE,
    filter: [gl.NEAREST, gl.LINEAR]
  }


  var tex_w = ceil(width * SCREEN_SCALE);
  var tex_h = ceil(height * SCREEN_SCALE);

  tex.src = gl.newTexture(tex_w, tex_h, def);
  tex.dst = gl.newTexture(tex_w, tex_h, def);



  // Shader source, depending on available webgl version
  // var fs_grayscott = document.getElementById("webgl"+VERSION+".fs_grayscott").textContent;
  // var fs_display   = document.getElementById("webgl"+VERSION+".fs_display"  ).textContent;

  var fs_grayscott = shaderfiles["webgl" + VERSION + ".fs_grayscott"];
  var fs_display = shaderfiles["webgl" + VERSION + ".fs_display"];
  // crreate Shader
  shader_grayscott = new Shader(gl, {
    fs: fs_grayscott
  });
  shader_display = new Shader(gl, {
    fs: fs_display
  });


  // place initial samples
  initRD();

  smoothedPos = createVector(width/2,height/2);

}



function windowResized() {
  if (!fbo) return;
  var w = windowWidth;
  var h = windowHeight;
  resizeCanvas(w, h);

  var tex_w = ceil(w * SCREEN_SCALE);
  var tex_h = ceil(h * SCREEN_SCALE);

  tex.src.resize(tex_w, tex_h);
  tex.dst.resize(tex_w, tex_h);

  initRD();
}



// shading colors
var pallette = [
  1.00, 1.00, 1.00,
  0.00, 0.40, 0.80,
  0.20, 0.00, 0.20,
  1.00, 0.80, 0.40,
  0.50, 0.25, 0.12,
  0.50, 0.50, 0.50,
  0.00, 0.00, 0.00
];



function randomizeColors() {
  var num = pallette.length / 3;
  for (var i = 1; i < num - 1; i++) {
    var id = i * 3;
    var r = random(1);
    var g = random(1);
    var b = random(1);

    pallette[id + 0] = r;
    pallette[id + 1] = g;
    pallette[id + 2] = b;
  }
}


function keyReleased() {
  if (key === 'C') {
    randomizeColors();
  }
}

function draw() {
  if (!fbo) return;
  // ortho(0, width, -height, 0, 0, 20000);
  push();
  ortho();
  translate(-width / 2, -height / 2, 0);
  updateRD();
  pop();

  var w = tex.dst.w / SCREEN_SCALE;
  var h = tex.dst.h / SCREEN_SCALE;


  // display result
  shader_display.viewport(0, 0, w, h);
  shader_display.begin();
  shader_display.uniformF('PALLETTE', pallette, 7);
  shader_display.uniformT('tex', tex.src);
  shader_display.uniformF('wh_rcp', [1.0 / w, 1.0 / h]);
  shader_display.quad();
  shader_display.end();

}



function initRD() {
  ortho();
  // translate(-width/2, -height/2, 0);

  var gl = fbo.gl;

  // bind framebuffer and texture for offscreenrendering
  fbo.begin(tex.dst);

  var w = tex.dst.w;
  var h = tex.dst.h;

  gl.viewport(0, 0, w, h);
  gl.clearColor(1.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.disable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  // < native p5 here
  noStroke();
  fill(0, 255, 0);
  // ellipse(-100, 0, 100, 100);
  // ellipse(+100, 0, 100, 100);
  // ellipse(0, -100, 100, 100);
  // ellipse(0, +100, 100, 100);
  // >
  tex.swap();
  fbo.end();

}









function updateRD() {

  var gl = fbo.gl;

  // multipass rendering (ping-pong)
  for (var i = 0; i < rdDef.iter; i++) {

    // set texture as rendertarget
    fbo.begin(tex.dst);

    var w = tex.dst.w;
    var h = tex.dst.h;

    // clear texture
    gl.viewport(0, 0, w, h);
    gl.clearColor(1.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    // apply shader
    shader_grayscott.begin();
    shader_grayscott.uniformF("dA", [rdDef.da]);
    shader_grayscott.uniformF("dB", [rdDef.db]);
    shader_grayscott.uniformF("feed", [rdDef.feed]);
    shader_grayscott.uniformF("kill", [rdDef.kill]);
    shader_grayscott.uniformF("dt", [rdDef.dt]);
    shader_grayscott.uniformF("wh_rcp", [1.0 / w, 1.0 / h]);
    shader_grayscott.uniformT("tex", tex.src);
    shader_grayscott.quad();
    shader_grayscott.end();

    // < native p5 here
    if (mouseIsPressed) {
      noStroke();
      fill(0, 255, 0);
      ellipse(mouseX, mouseY, 10, 10);

      ellipse(mouseY, mouseX, 10, 10);
    }
    // drawKeypoints();
    drawSkeleton();
    if (poses.length > 0) {
      let pose = poses[0].pose;
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[0]; //nose
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {

        let curPos = createVector(map(keypoint.position.x, 0, 640, 0, width), map(keypoint.position.y, 0, 480, 0, height));
        curPos.sub(smoothedPos);
        curPos.mult(.1);
        smoothedPos.add(curPos);
        // ellipse(smoothedPos.x, smoothedPos.y, 50, 50);
      }

    }
    fill(0, 255, 0);
    noStroke();
    ellipse(smoothedPos.x, smoothedPos.y, 150, 150);
    // >

    // ping-pong
    tex.swap();
  }

  // end fbo, so p5 can take over again.
  fbo.end();
}



// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // points = [];

  // Loop through all the poses detected
  for (let i = 0; i < poses.length && i == 0; i++) {
    // For each pose detected, loop through all the keypoints

    let pose = poses[i].pose;

    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(map(keypoint.position.x, 0, 640, 0, width), map(keypoint.position.y, 0, 480, 0, height), 5, 5);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0, 255, 0);
      line(map(partA.position.x, 0, 640, 0, width), map(partA.position.y, 0, 480, 0, height), map(partB.position.x, 0, 640, 0, width), map(partB.position.y, 0, 480, 0, height));
    }
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}









(function() {

  var loadJS = function(filename) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  loadJS("https://rawgit.com/diwi/p5.EasyCam/master/dwgl.js");
  loadJS("https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.5/dat.gui.min.js");

  document.oncontextmenu = function() {
    return false;
  }
  document.onmousedown = function() {
    return false;
  }

})();
