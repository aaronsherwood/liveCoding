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
  particle(index) //this is the original
).out() // send out

// with feedback
new Array(howMany).fill().reduce((a,b)=>
a.add(particle(Math.random()*howMany))
,
  particle(index)
).blend(src(o0).scale(1.01),.9).out()

// wrap it all up in a function
boom = ()=> {
  new Array(howMany).fill().reduce((a,b)=>
  a.add(particle(Math.random()*howMany))
  ,
    particle(index)
  ).blend(src(o0).scale(1.01),.9).out()
}

// you can then use p5 to trigger the function like we did for videos (not illustrated here)
boom()

hush()
