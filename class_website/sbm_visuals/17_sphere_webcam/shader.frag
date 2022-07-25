precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vCam;

void main() {

  vec3 color = vCam;

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(color ,1.0);
}
