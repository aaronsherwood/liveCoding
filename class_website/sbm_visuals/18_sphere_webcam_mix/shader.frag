precision mediump float;

uniform sampler2D uTexture;
uniform float uTextureMix;
varying vec3 vCam;
varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vEye;

// This function returns texture coordinates. We give it an eye position and the normal and it
// shows us how a sphere would reflect the texture.
// This particular implementation was borrowed from https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader/
vec2 tex(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}

void main() {

  vec3 color = vCam;

  // Calculate our uv
  vec2 uv = tex(vEye, vNormal) ;

  // Sample the texture
  vec4 texCol = texture2D(uTexture, uv);

  //color out - try different ways, uncomment & comment

  //mix
  vec3 colOut = mix(color, texCol.rgb, uTextureMix);

  // add
  /* vec3 colOut = color+texCol.rgb; */

  // sub
  /* vec3 colOut = color-texCol.rgb; */

  // abs sub
  /* vec3 colOut = abs(color-texCol.rgb); */

  // mult
  /* vec3 colOut = color*texCol.rgb; */

  // divide
  /* vec3 colOut = color/texCol.rgb; */

  //inverse
  /* vec3 colOut = vec3(1.)-color; */

  // draw it to screen
  gl_FragColor = vec4(colOut, 1.0);
}
