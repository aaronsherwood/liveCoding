
shaderfiles["webgl2.fs_grayscott"] = `
  #version 300 es

  #ifdef GL_ES
    precision highp float;
    precision mediump int;
  #endif

  #define FRAG_CLAMP 1

  out vec2 outfrag;

  uniform vec2 wh_rcp;
  uniform sampler2D tex;

  uniform float dA  ;
  uniform float dB  ;
  uniform float feed;
  uniform float kill;
  uniform float dt  ;

  void main () {

    vec2 posn = gl_FragCoord.xy * wh_rcp;
    vec2 val = texture(tex, posn).rg;  
    vec2 lap = -val;
    
    lap += textureOffset(tex, posn, ivec2(-1, 0)).rg * 0.20;
    lap += textureOffset(tex, posn, ivec2(+1, 0)).rg * 0.20;
    lap += textureOffset(tex, posn, ivec2( 0,-1)).rg * 0.20;
    lap += textureOffset(tex, posn, ivec2( 0,+1)).rg * 0.20;
    lap += textureOffset(tex, posn, ivec2(-1,-1)).rg * 0.05;
    lap += textureOffset(tex, posn, ivec2(+1,-1)).rg * 0.05;
    lap += textureOffset(tex, posn, ivec2(-1,+1)).rg * 0.05;
    lap += textureOffset(tex, posn, ivec2(+1,+1)).rg * 0.05;
    
    float nA = dA * lap.r - val.r * val.g * val.g + feed * (1.0 - val.r);
    float nB = dB * lap.g + val.r * val.g * val.g - (feed + kill) * val.g;
    
    outfrag = val + vec2(nA, nB) * dt;
    
  #if FRAG_CLAMP
    outfrag = clamp(outfrag, vec2(0.0), vec2(1.0));
  #endif
  }
`;



shaderfiles["webgl1.fs_grayscott"] = `
  #version 100

  #ifdef GL_ES
    precision highp float;
    precision mediump int;
  #endif

  #define FRAG_CLAMP 1

  vec2 outfrag;

  uniform vec2 wh_rcp;
  uniform sampler2D tex;

  uniform float dA  ;
  uniform float dB  ;
  uniform float feed;
  uniform float kill;
  uniform float dt  ;

  void main () {

    vec2 posn = gl_FragCoord.xy * wh_rcp;
    vec2 val = texture2D(tex, posn).rg;  
    vec2 lap = -val;
    
    lap += texture2D(tex, posn + vec2(-1, 0) * wh_rcp).rg * 0.20;
    lap += texture2D(tex, posn + vec2(+1, 0) * wh_rcp).rg * 0.20;
    lap += texture2D(tex, posn + vec2( 0,-1) * wh_rcp).rg * 0.20;
    lap += texture2D(tex, posn + vec2( 0,+1) * wh_rcp).rg * 0.20;
    lap += texture2D(tex, posn + vec2(-1,-1) * wh_rcp).rg * 0.05;
    lap += texture2D(tex, posn + vec2(+1,-1) * wh_rcp).rg * 0.05;
    lap += texture2D(tex, posn + vec2(-1,+1) * wh_rcp).rg * 0.05;
    lap += texture2D(tex, posn + vec2(+1,+1) * wh_rcp).rg * 0.05;
    
    float nA = dA * lap.r - val.r * val.g * val.g + feed * (1.0 - val.r);
    float nB = dB * lap.g + val.r * val.g * val.g - (feed + kill) * val.g;
    
    outfrag = val + vec2(nA, nB) * dt;
    
  #if FRAG_CLAMP
    outfrag = clamp(outfrag, vec2(0.0), vec2(1.0));
  #endif

    gl_FragColor = vec4(outfrag, 0.0, 1.0);
  }
`;