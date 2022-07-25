//from here: https://www.shadertoy.com/view/4t3cD2

// shaders
let maskShader, dilatePingShader, dilatePongShader, renderShader;

//pgraphics
let ping, pong, mask;

//camera
let cam;

let alternate = false;

function preload() {
  maskShader = loadShader("shader.vert", "mask.frag");
  dilatePingShader = loadShader("shader.vert", "dilate.frag");
  dilatePongShader = loadShader("shader.vert", "dilate.frag");
  renderShader = loadShader("shader.vert", "final.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();

  pixelDensity(1);

  // create FBOs
  mask = createGraphics(windowWidth, windowHeight, WEBGL);
  ping = createGraphics(windowWidth, windowHeight, WEBGL);
  pong = createGraphics(windowWidth, windowHeight, WEBGL);

}

function draw() {
  background(0);

  // mask shader
  mask.shader(maskShader);
  maskShader.setUniform("frameCount", frameCount);
  maskShader.setUniform('mouseX', 1. - mouseX / width);
  maskShader.setUniform("resolution", [width, height]);
  maskShader.setUniform("tex0", cam);
  mask.rect(0, 0, width, height);

  // dilate shaders
  ping.shader(dilatePingShader);
  dilatePingShader.setUniform("resolution", [width, height]);
  dilatePingShader.setUniform("tex0", pong);
  dilatePingShader.setUniform("tex1", mask);
  dilatePingShader.setUniform("alternate", alternate);
  ping.rect(0, 0, width, height);

  pong.shader(dilatePongShader);
  dilatePongShader.setUniform("resolution", [width, height]);
  dilatePongShader.setUniform("tex0", ping);
  dilatePongShader.setUniform("tex1", mask);
  dilatePongShader.setUniform("alternate", alternate);
  pong.rect(0, 0, width, height);

  // render shader
  shader(renderShader);
  renderShader.setUniform("resolution", [width, height]);
  maskShader.setUniform("frameCount", frameCount);
  renderShader.setUniform("tex0", ping);
  renderShader.setUniform("tex1", mask);
  renderShader.setUniform("tex2", cam);
  renderShader.setUniform("alternate", alternate);
  rect(0, 0, width, height);
}

function mousePressed() {
  alternate = !alternate;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
