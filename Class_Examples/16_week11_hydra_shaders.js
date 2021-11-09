setFunction({
  name: 'simpleShader',
  type: 'src',
  inputs: [
    {
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
`})
simpleShader().out()


// glow circle
setFunction({
  name: 'glowCircle',
  type: 'src',
  inputs: [
    {
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
`})


glowCircle(()=>mouse.x, ()=>mouse.y, 50).out()

// parameters have defalts, ut we can also change them
glowCircle(()=>mouse.x, ()=>mouse.y, 50,.1,.5,.3).out()


p5=new P5()

particle = (offset)=>glowCircle(()=>p5.noise(time*.1+offset) * width, ()=>p5.noise(time*.1-offset)*height, 10)
particle(Math.random()).out()

//particle system
howMany=20
new Array(howMany).fill().reduce((a,b)=>
  a.add(particle(Math.random()*howMany)) // a is previous and then use hydra's add function to add another particle
,
  particle(Math.random()*howMany) //this is the original
).out() // send out

// with feedback
new Array(howMany).fill().reduce((a,b)=>
a.add(particle(Math.random()*howMany))
,
  particle(Math.random()*howMany)
).blend(src(o0).scale(1.01),.9).out()

setFunction({
  name: 'mosaic',
  type: 'coord',
  inputs: [
    {
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
  vec2 uv = _st;
  // correct for window aspect to make squares
  float aspect = resolution.x / resolution.y;
  uv.x *= aspect;
  amt *= pow(side-_st.x, power);
  float offset = amt;
  // tile will be used to offset the texture coordinates
  // taking the fract will give us repeating patterns
  vec2 tile = fract(uv * squares) * amt;
  return _st + tile - offset;
`})

noise(3).mult(osc(10,0,.7)).mosaic().out()
// params: amount, square count, power
noise(3).mult(osc(10,0,.7)).mosaic(1,30,3).out()
// params: amount, square count, power, which side (0-1)
noise(3).mult(osc(10,0,.7)).mosaic(.1,30,3,0).out()
// compare to pixelate
noise(3).mult(osc(10,0,.7)).pixelate(10).out()

hush()
