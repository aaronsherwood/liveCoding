// the shader variable
let camShader;

// the camera variable
let cam;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // the background layer doesn't need to be WEBGL
  background = createGraphics(windowWidth, windowHeight);

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();
  pixelDensity(1);
}

function draw() {
  // shader() sets the active shader with our shader
  shader(camShader);

  camShader.setUniform('tex0', cam);
  camShader.setUniform('mouseX', 1.-mouseX/width);
  camShader.setUniform('resolution', [width, height]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
