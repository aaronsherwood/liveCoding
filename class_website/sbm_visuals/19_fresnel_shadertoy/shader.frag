// came from here: https://www.shadertoy.com/view/XtKSDm

precision mediump float;

uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D cam;

const float ring = 5.0;
const float div = 0.5;

void main() {

  vec2 res = resolution.xy;
  float aspect = res.x / res.y;
  vec2 uv = gl_FragCoord.xy / res;
  float t = frameCount * 0.0005;

  vec2 p = vec2(uv.x * aspect, uv.y);

  float r = distance(p, vec2(mouse.x / resolution.x * aspect, mouse.y / resolution.y));
  r -= t;
  r = fract(r*ring)/div;

  uv = -1.0 + 2.0 * uv;
  uv *=  r;
  uv = uv * 0.5 + 0.5;
  uv.y= 1.-uv.y;

  vec4 fragColor = texture2D(cam, uv);

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(fragColor.rgb ,1.0);
}
