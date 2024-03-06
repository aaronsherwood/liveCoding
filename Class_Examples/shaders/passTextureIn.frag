precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D tex0;


void main( void )
{
	vec2 q = gl_FragCoord.xy/resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*resolution.xy)/resolution.y;



	vec3 col = vec3(1.0,0.0,0.0);

	col = texture2D(tex0,q).rgb;
	vec3 red = vec3(1.,0.,0.);

	gl_FragColor = vec4( col, 1.0 );
}
