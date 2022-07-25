precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform vec2 resolution;
uniform float mouseX;

float amt = 0.2; // the amount of displacement, higher is more
float squares = 20.0; // the number of squares to render vertically

// this is a common glsl function of unknown origin to convert rgb colors to luminance
// it performs a dot product of the input color against some known values that account for our eyes perception of brighness
// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float normpdf(float x, float sigma)
{
	return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;
}


void main() {

  //all BLUR stuff
  //declare stuff
	const int mSize = 11;
	const int kSize = (mSize-1)/2;
	float kernel[mSize];
	vec3 final_colour = vec3(0.0);

	//create the 1-D kernel
	float sigma = 70.0;
	float Z = 0.0;
	for (int j = 0; j <= kSize; ++j)
	{
		kernel[kSize+j] = kernel[kSize-j] = normpdf(float(j), sigma);
	}

	//get the normalization factor (as the gaussian has been clamped)
	for (int j = 0; j < mSize; ++j)
	{
		Z += kernel[j];
	}

	//read out the texels
	for (int i=-kSize; i <= kSize; ++i)
	{
		for (int j=-kSize; j <= kSize; ++j)
		{
			final_colour += kernel[kSize+j]*kernel[kSize+i]*texture2D(tex0, (1.-(gl_FragCoord.xy+vec2(float(i),float(j))) / resolution.xy)).rgb;

		}
	}

  // convert the texture to grayscale by using the luma function
  float gray = luma(final_colour/(Z*Z));

  // here we will use the step function to convert the image into black or white
  // any color less than mouseX will become black, any color greater than mouseX will become white
  float thresh = 1.-step(mouseX, gray);

  //set backgroundcolor
  gl_FragColor = vec4(0.,0.,0.,1.);

  // do the mask
  if (thresh>0.){
    float aspect = resolution.x / resolution.y;
    float offset = amt * 0.5;

    vec2 uv = vTexCoord;

    // the texture is loaded upside down and backwards by default so lets flip it
    uv.y = 1.0 - uv.y;

    // copy of the texture coords
    vec2 tc = uv;

    // move into a range of -0.5 - 0.5
    uv -= 0.5;

    // correct for window aspect to make squares
    uv.x *= aspect;

    // tile will be used to offset the texture coordinates
    // taking the fract will give us repeating patterns
    vec2 tile = fract(uv * squares + 0.5) * amt;

    // sample the texture using our computed tile
    // offset will remove some texcoord edge artifacting
    vec2 texC = tc + tile - offset;
    texC.x = 1.-texC.x;
    vec4 tex = texture2D(tex0, texC);
    gl_FragColor = tex;
  }
}
