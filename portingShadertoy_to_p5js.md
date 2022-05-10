# Porting a Shadertoy shader to p5js
## * Note: this only covers porting the simplest shaders.

### Find replace
Find the following and replace all the instances of the first item with the second:
 - iTime => time
 - iResolution => resolution
 - iMouse => mouse
 - fragCoord => gl_FragCoord
 - fragColor => gl_FragColor

### void main...
Change
`void mainImage( out vec4 fragColor, in vec2 fragCoord )`
to:
`void main( void )`

### Add float precision & uniforms:
Paste in the following at the top of the shader:
```
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
```

### void VR
If there is a void VR function delete it.

### iChannel
We need to do something with iChannel, either we will pass in some sort of texture, or we will figure out a way to not use it.
