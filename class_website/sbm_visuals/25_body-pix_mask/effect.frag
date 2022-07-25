precision mediump float;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform vec2 resolution;
uniform float frameCount;



void main()
{
    gl_FragColor = vec4(0.,0.,0.,1.);
    vec4 cam = texture2D(tex0, 1. - vTexCoord);

    if (cam.r>0.){
      gl_FragColor = texture2D(tex1, 1. - vTexCoord);;
    }

}
