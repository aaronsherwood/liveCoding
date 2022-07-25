precision mediump float;

uniform vec2 resolution;
uniform sampler2D tex0;
uniform sampler2D tex1;
float spread = 0.75;
float decay = 0.02;
uniform bool alternate;

void main() {
  vec2 res = resolution.xy;
  vec2 step = spread / res;
  vec2 uv = gl_FragCoord.xy / res;
  vec4 sum;
  if (alternate){
    sum = texture2D(tex1, vec2(1.-uv.x,uv.y));
    decay = 0.04;
  } else {
    sum = texture2D(tex0, vec2(uv.x,1.-uv.y));
    decay = 0.02;
  }

  // 49 taps gives us better results but you could probably find settings that work with less
  for(int y = -7; y <= 7; y++){
      for(int x = -7; x <= 7; x++){
        vec4 color;
        if (alternate)
          color = texture2D(tex0, vec2(uv.x,1.-uv.y) + vec2(x, y) * step);
        else
          color = texture2D(tex1, vec2(1.-uv.x,uv.y) + vec2(x, y) * step);
        sum = max(color, sum);
      }
  }

  gl_FragColor = sum - decay;
}
