precision mediump float;

varying vec2 uv;
uniform float frameCount;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform bool alternate;

// just composite everything
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

  vec2 res = resolution.xy;
  vec2 uv = gl_FragCoord.xy / res;
  vec4 t = texture2D(tex0, vec2(1.-uv.x,uv.y));
  float a = texture2D(tex1, vec2(uv.x,1.-uv.y)).r;
  vec4 orig = texture2D(tex2, vec2(1.-uv.x,1.-uv.y));

  float numRings = 30.;//30.;
  if (alternate)
    numRings = 12.;
  vec4 m = floor(mod(t*numRings, 1.0)+0.5);
  float mr = m.r;
  m.rgb = mr * hsv2rgb(vec3(t.r + frameCount*0.5 , 0.745,1.0));
  m.a = mr;


  vec3 mask = vec3(0.);
  if (a>0.)
    mask = orig.rgb;

  gl_FragColor = mix(vec4(mask,1.), m, mr);
  gl_FragColor = mix(vec4(mask,1.), gl_FragColor, step(0.001, t));//step(0.01, t));
  gl_FragColor = mix(gl_FragColor, vec4(mask,1.), a);
  /* gl_FragColor = sin(t*6.28*16.0)*0.5 + 0.5;//
  gl_FragColor = vec4(m.rgba);//floor(mod(t*12.0, 1.0)+0.5); */
  /* gl_FragColor = t; */

  /* gl_FragColor = orig;//vec4(vec3(a),1.); */
}
