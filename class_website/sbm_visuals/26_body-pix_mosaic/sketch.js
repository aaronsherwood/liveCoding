let bodypix;
let video;
let segmentation;
let pix;
let camShader;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.5 // 0 - 1, defaults to 0.5
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // load up your video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide(); // Hide the video element, and just show the canvas
  bodypix = ml5.bodyPix(video, modelReady)
  // draw the body pix into a offscreen buffer
  pix = createGraphics(width, height);
}

function draw(){
  // translate(-width/2, -height/2);
  // image(pix, 0, 0);
  // shader() sets the active shader with our shader
  shader(camShader);

  // send the camera and the resolution to the shader
  camShader.setUniform('tex0', pix);
  camShader.setUniform('resolution', [width, height]);
  camShader.setUniform('amount', map(mouseX,0,width,0,1));
  camShader.setUniform('power', map(mouseY,0,height,0,10));

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
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
  pix.image(video, 0, 0, width, height); // comment out to get white mask
  pix.image(segmentation.maskBackground, 0, 0, width, height)
  bodypix.segment(gotResults, options)
}
