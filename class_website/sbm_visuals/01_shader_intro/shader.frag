precision mediump float;

uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;

void main() {
  // red color - range 0. - 1.
   vec3 color = vec3(1., 0., 0.);

  // use gl_FragCoord
  /* color = vec3(gl_FragCoord.x/resolution.x, 0., 0.); */

  // use the mouse & gl_FragCoord
  /* if (gl_FragCoord.x < mouse.x)
    color = vec3(0., 0., 1.); */

  /* if (gl_FragCoord.y  < mouse.y)
    color = vec3(0., 1., 0.); */

  // use gl_FragCoord for the color (has to be in normalized range)
  // use sine of frameCount
  /* color = vec3(gl_FragCoord.x/resolution.x, 0., gl_FragCoord.y/resolution.y); */
  /* color = vec3(gl_FragCoord.x/resolution.x,  (sin(frameCount*.01)+1.)*.5,   gl_FragCoord.y/resolution.y); */

  // distance
  vec2 dist = mouse - gl_FragCoord.xy;

  // discard
  /* if (length(dist)>200.) discard; */

  // inverse
  if (length(dist)>200.)
    color = 1.-color;

  gl_FragColor = vec4(color, 1.0);
}
