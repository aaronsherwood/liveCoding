// the shader variables
let mosaicShader, delayShader;

// the camera variable
let cam;

//p-graphics variable
let fbo;

// we will need at least two layers for this effect
let shaderLayer;

// how many delays do we want
let numDelays = 3;

// how many past frames should we store at once
// the more you store, the further back in time you can go
// however it's pretty memory intensive so don't push it too hard
let numLayers = 30 * numDelays;

// an array where we will store the past camera frames
let layers = [];

// index on which starting point of time we are in
let indexes = [];

let bodypix;
let segmentation;
let pix;

function preload(){
  // load the shaders
  mosaicShader = loadShader('effect.vert', 'mosaic.frag');
  delayShader = loadShader('effect.vert', 'delay.frag');
}

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.5 // 0 - 1, defaults to 0.5
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // the background layer doesn't need to be WEBGL
  background = createGraphics(windowWidth, windowHeight);

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(320, 180);

  // hide the html element that createCapture adds to the screen
  cam.hide();
  pixelDensity(1);

  fbo = createGraphics(windowWidth, windowHeight, WEBGL);

  noStroke();

  // this layer will use webgl with our shader
  shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);

  // create a ton of createGraphics layers
  for (let i = 0; i < numLayers; i++){
    let l = createGraphics(windowWidth, windowHeight);
    layers.push(l);
  }

  // three indices representing a given momeny in time
  // index1 is current
  // index2 is 30 frames behind
  // index3 is 60 frames behind
  for (let i = 0; i < numDelays; i++){
    indexes[i] = i * numLayers/numDelays;
  }

  bodypix = ml5.bodyPix(cam, modelReady)
  // draw the body pix into a offscreen buffer
  pix = createGraphics(width, height);
}

function draw() {
  // shader() sets the active shader with our shader
  fbo.shader(mosaicShader);

  mosaicShader.setUniform('tex0', pix);
  mosaicShader.setUniform('resolution', [width, height]);
  // mosaicShader.setUniform('amount', map(mouseX,0,width,0,1));
  // mosaicShader.setUniform('power', map(mouseY,0,height,0,10));

  // rect gives us some geometry on the screen
  fbo.rect(0,0,width, height);


  // draw the camera on the current layer
  layers[indexes[0]].image(fbo, 0, 0, width, height);

  // shader() sets the active shader with our shader
  shaderLayer.shader(delayShader);

  // send the camera and the two other past frames into the camera feed
  delayShader.setUniform('tex0', layers[indexes[0]]);
  delayShader.setUniform('tex1', layers[indexes[1]]);
  delayShader.setUniform('tex2', layers[indexes[2]]);
  // delayShader.setUniform('tex3', layers[indexes[3]]);
  // delayShader.setUniform('tex4', layers[indexes[4]]);


  // rect gives us some geometry on the screen
  shaderLayer.rect(0,0,width, height);

  // render the shaderlayer to the screen
  translate(-width/2, -height/2);
  image(shaderLayer, 0,0,width, height);

  // increase all indices by 1, resetting if it goes over layers.length
  // the index runs in a circle 0, 1, 2, ... 29, 30, 0, 1, 2, etc.
  // index1
  // index2 will be somewhere in the past
  // index3 will be even further into the past
  for (let i = 0; i < numDelays; i++){
    indexes[i] = (indexes[i] + 1)  % layers.length;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  console.log('ready!')
  bodypix.segment(gotResults, options)
}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  segmentation = result;

  pix.background(255);
  pix.image(cam, 0, 0, width, height); // comment out to get white mask
  pix.image(segmentation.maskBackground, 0, 0, width, height)
  bodypix.segment(gotResults, options)
}
