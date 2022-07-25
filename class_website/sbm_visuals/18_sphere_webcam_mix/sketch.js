// This line is used for auto completion in VSCode
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object

let myShader;
let cam;
let texture;
let movie;
let mix = .5;
let amplitude = -.5;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");
  texture = loadImage("texture.png");
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
  background(0);
  // shader() sets the active shader with our shader
  shader(myShader);

  // Send things to the shader via "uniforms"
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uCamTexture", cam);
  myShader.setUniform("uTexture", texture); //try "texture" or "movie" here
  myShader.setUniform("uAmplitude", amplitude);
  myShader.setUniform("uTextureMix", map(mouseX, 0, width, 0, 1));

  // Rotate our geometry on the X and Y axes
  rotateX(radians(0));
  rotateY(radians(-180));

  // Draw some geometry to the screen
  // We're going to tessellate the sphere a bit so we have some more geometry to work with
  sphere(width / 5, 250, 250);
}

// This function is called when the video loads
function vidLoad() {
  movie.loop();
  movie.volume(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
