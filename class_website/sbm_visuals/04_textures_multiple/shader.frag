precision mediump float;

varying vec2 uv;
uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D cam;
uniform sampler2D tex0;
uniform float textureMix;

void main() {
  // the texture is loaded upside down and backwards by default so lets flip it

  // the texture is loaded upside down and backwards by default so lets flip it
  vec4 colorCam = texture2D(cam, 1.0-uv);

  vec4 texCol = texture2D(tex0, uv);

  vec3 colOut;

  //mix
  colOut = mix(colorCam.rgb, texCol.rgb, textureMix);

  // distance
  /* vec2 dist = mouse - gl_FragCoord.xy;

  if (length(dist)>50.)
    colOut = texCol.rgb;
  else
    colOut = colorCam.rgb; */

  // mix based on pixel color
  /* colOut = texCol.rgb;
  if (texCol.r>.75)
    colOut = colorCam.rgb; */

  // draw it to screen
  gl_FragColor = vec4(colOut, 1.0);
}
