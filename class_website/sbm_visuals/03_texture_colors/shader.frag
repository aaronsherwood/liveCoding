precision mediump float;

varying vec2 uv;
uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D cam;

void main() {
  // the texture is loaded upside down and backwards by default so lets flip it
  vec4 color = texture2D(cam, 1.0-uv);

  color.r *= (sin(frameCount*0.1)+1.)*.5;
  color.g *= (cos(frameCount*0.05)+1.)*.5;
  color.b *= (tan(frameCount*0.01)+1.)*.5;

  gl_FragColor = vec4(color.rgb ,1.0);
}
