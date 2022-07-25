precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
/* uniform sampler2D tex3;
uniform sampler2D tex4; */

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // get the three webcam feeds
  vec4 cam = texture2D(tex0, uv);
  vec4 cam2 = texture2D(tex1, uv);
  vec4 cam3 = texture2D(tex2, uv);
  /* vec4 cam4 = texture2D(tex3, uv);
  vec4 cam5 = texture2D(tex4, uv); */

  // lets use one channel from each of the textures
  vec4 colOut = vec4(cam.r, cam2.g, cam3.b, 1.0);

  // next lines will make full color delays
  /* vec4 colOut = vec4(cam.rgb, 1.0) + vec4(cam2.rgb, 1.0) + vec4(cam3.rgb, 1.0);// + vec4(cam4.rgb, 1.0) + vec4(cam5.rgb, 1.0); */
  /* colOut.rgb = colOut.rgb/vec3(3.); // change number here for more layers */

  // render the output
  gl_FragColor = colOut;
}
