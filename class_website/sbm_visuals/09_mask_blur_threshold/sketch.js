// the shader variable
let camShader;

// the camera variable
let cam;

let movie;

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

  movie = createVideo('flow.mp4', vidLoad);
  movie.hide();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);

  // send the movie to the shader
  camShader.setUniform('tex1', movie);

  // also send the mouseX value but convert it to a number between 0 and 1
  camShader.setUniform('mouseX', 1.-mouseX/width);

  // also send the size of 1 texel on the screen
  camShader.setUniform('resolution', [width, height]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

// This function is called when the video loads
function vidLoad() {
  movie.loop();
  movie.volume(0);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
