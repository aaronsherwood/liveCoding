setFunction({
  name: 'simpleShader',
  type: 'src',
  inputs: [{
      type: 'float',
      name: 'locX',
      default: 0.,
    },
    {
      type: 'float',
      name: 'locY',
      default: 0.,
    }
  ],
  glsl: `
  return vec4(1.,0.,0.,1.);
`
})
simpleShader().out()


// glow circle
setFunction({
  name: 'glowCircle',
  type: 'src',
  inputs: [{
      type: 'float',
      name: 'locX',
      default: 0.,
    },
    {
      type: 'float',
      name: 'locY',
      default: 0.,
    },
    {
      type: 'float',
      name: 'glowAmount',
      default: 50.,
    },
    {
      type: 'float',
      name: 'r',
      default: 0.6,
    },
    {
      type: 'float',
      name: 'g',
      default: 0.3,
    },
    {
      type: 'float',
      name: 'b',
      default: 0.5,
    },
  ],
  glsl: `
  vec2 loc = vec2(locX,locY);
  // loc is in screen spaces, but _st is in normalized space
  float dist = glowAmount/distance(_st*resolution, loc);
  return vec4(r*dist,g*dist,b*dist,1.);
`
})


glowCircle(() => mouse.x, () => mouse.y, 50).out()

// parameters have defalts, ut we can also change them
glowCircle(() => mouse.x, () => mouse.y, 50, .1, .5, .3).out()


p5 = new P5()

particle = (offset) => glowCircle(() => p5.noise(time * .1 + offset) * width, () => p5.noise(time * .1 - offset) * height, 10)
particle(Math.random()).out()

//particle system
howMany = 20
new Array(howMany).fill().reduce((a) =>
  a.add(particle(Math.random() * howMany)) // a is previous and then use hydra's add function to add another particle
  ,
  particle(Math.random() * howMany) //this is the original
).out() // send out

// with feedback
new Array(howMany).fill().reduce((a) =>
  a.add(particle(Math.random() * howMany)),
  particle(Math.random() * howMany)
).blend(src(o0).scale(1.01), .9).out()

setFunction({
  name: 'mosaic',
  type: 'coord',
  inputs: [{
      type: 'float',
      name: 'amt',
      default: 0.1,
    },
    {
      type: 'float',
      name: 'squares',
      default: 10.,
    },
    {
      type: 'float',
      name: 'power',
      default: 0.,
    },
    {
      type: 'float',
      name: 'side',
      default: 0.5,
    }
  ],
  glsl: `
  // copy texture coord
  vec2 st = uv;
  // correct for window aspect to make squares
  float aspect = resolution.x / resolution.y;
  st.x *= aspect;
  amt *= pow(side-uv.x, power);
  float offset = amt;
  // tile will be used to offset the texture coordinates
  // taking the fract will give us repeating patterns
  vec2 tile = fract(st * squares) * amt;
  return uv + tile - offset;
`
})

noise(1, .5).mult(osc(10, 0, .7)).mosaic().out()
// params: amount, square count, power
noise(1, .5).mult(osc(10, 0, .7)).mosaic(1, 30, 3).out()
// params: amount, square count, power, which side (0-1)
noise(1, .5).mult(osc(10, 0, .7)).mosaic(.1, 30, 3, 0).out()
// compare to pixelate
noise(1, .5).mult(osc(10, 0, .7)).pixelate(10).out()

///// SHADERS in P5js \\\\\

p5 = new P5({width: window.innerWidth, height:window.innerHeight, mode: 'WEBGL'})
shader = p5.loadShader("/Users/ags419/Documents/Code/classes/liveCoding/Class_Examples/shaders/basic.vert", "/Users/ags419/Documents/Code/classes/liveCoding/Class_Examples/shaders/ocean.frag");
// need to set the pixel density
p5.pixelDensity(1);

p5.draw = ()=>{
    shader.setUniform("time", time*0.3);
    shader.setUniform("resolution", [width, height]);
    shader.setUniform("mouse",[p5.mouseX, p5.mouseY]);
    p5.shader(shader);
    p5.rect(0, 0, width, height);
}
p5.hide();
s0.init({src: p5.canvas})
src(s0).out()

hush()


// try to port this one together this: https://www.shadertoy.comview/lscczl
