// This line is used for auto completion in VSCode
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
//this variable will hold our shader object
let myShader;
let cam;
let movie;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("shader.vert", "shader.frag");
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

  pixelDensity(1);

  movie = createVideo('flow.mp4', vidLoad);
  movie.hide();
}

function draw() {
  background(0);

  // shader() sets the active shader with our shader
  shader(myShader);

  // Send the frameCount to the shader
  myShader.setUniform("frameCount", frameCount);
  myShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  myShader.setUniform("resolution", [width, height]);
  myShader.setUniform("cam", cam);
  myShader.setUniform("tex0", movie);
  myShader.setUniform("textureMix", map(mouseX, 0., width, 0., 1.));
  rect(0, 0, width, height);

}

// This function is called when the video loads
function vidLoad() {
  movie.loop();
  movie.volume(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
