// based on this: https://www.shadertoy.com/view/wdBXRW

let myShader;
let poseNet;
let poses = [];
// this variable will hold our createGraphics layer
let shaderGraphics;
var capture;
var w = 640;
var h = 480;
var points;

function preload() {
  myShader = loadShader("basic.vert", "lines.frag");
}

function setup() {
  pixelDensity(2);
  createCanvas(w * 2, h); //windowWidth, windowHeight);

  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(capture, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });

  shaderGraphics = createGraphics(w, h, WEBGL);
  shaderGraphics.noStroke();

}

function draw() {
  background(0);
  {
    push();
    translate(w, 0);
    image(capture, 0, 0, w, h);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    pop();
  }
  {

    shaderGraphics.shader(myShader);

    // Send things to the shader via "uniforms"
    myShader.setUniform("uCamTexture", capture);
    myShader.setUniform("iResolution", [shaderGraphics.width, shaderGraphics.height]);
    myShader.setUniform("iTime", frameCount * .01);
    myShader.setUniform("iMouse", [mouseX, map(mouseY, 0, shaderGraphics.height, shaderGraphics.height, 0)]);
    myShader.setUniform("points", points);
    myShader.setUniform("howMany", points.length/2);

    shaderGraphics.rect(0, 0, shaderGraphics.width, shaderGraphics.height);
  }
  image(shaderGraphics, 0, 0, w, h);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  points = [];
  // Loop through all the poses detected
  for (let i = 0; i < poses.length && i==0; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log(pose.keypoints.length);
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        points.push(map(keypoint.position.x, 0, w, -1, 1));
        points.push(map(keypoint.position.y, 0, h, 1, -1));
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
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}
