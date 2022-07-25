precision mediump float;

varying vec2 uv;
uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D cam;

void main() {
  vec2 pos = gl_FragCoord.xy/resolution;
	pos.x = pos.x + sin(pos.y*20.+frameCount*0.02)*0.05;
  gl_FragColor = texture2D(cam, 1.-pos);
}
