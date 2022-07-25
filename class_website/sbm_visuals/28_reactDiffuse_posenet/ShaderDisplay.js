

shaderfiles["webgl2.fs_display"] = `
  #version 300 es

  #ifdef GL_ES
    precision highp float;
    precision mediump int;
  #endif

  out vec4 outfrag;

  uniform vec2 wh_rcp;
  uniform sampler2D tex;
  
  #define STEPS 7
  // arrays in webgl 1 suck!
  uniform vec3 PALLETTE[STEPS]; 
  
  vec3 getShading(float val){
    val = clamp(val, 0.0, 0.99999);
    float lum_steps = val * float(STEPS-1);
    float frac = fract(lum_steps);
    int id = int(floor(lum_steps));
    return mix(PALLETTE[id], PALLETTE[id+1], frac);
  }
  
  void main () {
    vec2 val = texture(tex, gl_FragCoord.xy * wh_rcp).rg;   
    outfrag = vec4(getShading(val.r*val.r), 1.0);
  }
`;


shaderfiles["webgl1.fs_display"] = `
  #version 100

  #ifdef GL_ES
    precision mediump float;
    precision mediump int;
  #endif

  uniform vec2 wh_rcp;
  uniform sampler2D tex;
  
  #define STEPS 7
  uniform vec3 PALLETTE[STEPS];

  vec3 getShading(float val){
    val = clamp(val, 0.0, 0.99999);
    float lum_steps = val * float(STEPS-1);
    float frac = fract(lum_steps);
    int id = int(floor(lum_steps));
    // array-access in webgl 1 sucks!
    if(id == 0) return mix(PALLETTE[0], PALLETTE[1], frac);
    if(id == 1) return mix(PALLETTE[1], PALLETTE[2], frac);
    if(id == 2) return mix(PALLETTE[2], PALLETTE[3], frac);
    if(id == 3) return mix(PALLETTE[3], PALLETTE[4], frac);
    if(id == 4) return mix(PALLETTE[4], PALLETTE[5], frac);
    if(id == 5) return mix(PALLETTE[5], PALLETTE[6], frac);
    return PALLETTE[6];
  }
  
  void main () {
    vec2 val = texture2D(tex, gl_FragCoord.xy * wh_rcp).rg;
    gl_FragColor = vec4(getShading(val.r*val.r), 1.0);
  }
`;