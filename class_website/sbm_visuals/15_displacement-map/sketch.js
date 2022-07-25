// the shader variable
let camShader;

// the camera variable
let cam;
let movie;

let flip = false;

function preload() {
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  movie = createVideo('flow.mp4', vidLoad);
  movie.hide();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(camShader);

  // lets just send the cam to our shader as a uniform
  if (!flip) {
    camShader.setUniform('tex0', movie);
    camShader.setUniform('tex1', cam);
  } else {
    camShader.setUniform('tex0', cam);
    camShader.setUniform('tex1', movie);
  }

  camShader.setUniform('amt', map(mouseX, 0, width, 0, 0.92));
  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}

function mousePressed() {
  flip = true;
}

function mouseReleased() {
  flip = false;
}

// This function is called when the video loads
function vidLoad() {
  movie.loop();
  movie.volume(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
