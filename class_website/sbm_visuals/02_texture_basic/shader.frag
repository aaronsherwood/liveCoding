precision mediump float;

varying vec2 uv;
uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D cam;

void main() {
  // the texture is loaded upside down and backwards by default so lets flip it
  vec4 color = texture2D(cam, 1.0-uv);

  // to not mirror X
  /* color = texture2D(cam, vec2(uv.x,1.0-uv.y)); */

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color.rgb ,1.0);
}
