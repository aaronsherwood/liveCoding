// based on this: https://www.shadertoy.com/view/4tlSzl

let myShader;
let shaderGraphics;

function preload() {
  myShader = loadShader("basic.vert", "combust.frag");
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL);
  shaderGraphics.noStroke();
  shaderGraphics.pixelDensity(1);
}

function draw() {
  background(0);

  shaderGraphics.shader(myShader);
  // Send things to the shader via "uniforms"
  myShader.setUniform("iResolution", [shaderGraphics.width, shaderGraphics.height]);
  myShader.setUniform("iTime", frameCount * .01);
  myShader.setUniform("iMouse", [mouseX, map(mouseY, 0, shaderGraphics.height, shaderGraphics.height, 0)]);
  shaderGraphics.rect(0, 0, shaderGraphics.width, shaderGraphics.height);

  image(shaderGraphics, 0, 0, windowWidth, windowHeight);
}
