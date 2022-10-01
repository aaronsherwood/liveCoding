// change the blend amount between 0 and 1 to switch in different hydra scripts
shape(3).blend(osc(),1).out()

// make an array of hydra scripts
visuals = [
  ()=>{shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).out(o0)},
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().out(),
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).out(),
  ()=>{src(s0)
    .blend(src(o0).diff(s0).scale(.999)
  	.modulatePixelate(noise(10,0.01).pixelate(16,16),1024),1)
    .out()},
  ()=>{
  	shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(3,0.05),.03).out(o1)
    src(o0)
      .modulate(
        osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
      ,0.003)
      .blend(o1,0.005).out()
      }
]

visuals[0]()

// can use update and switch case with midi:
whichVisual = 4
update = () =>{
  // very important! only change source once, when necessary
  if (whichVisual != ccActual[0]){
    whichVisual = ccActual[0];
    visuals[whichVisual]()
  }
}

// clear update
hush()
// OR (without stopping visuals all together)
update = ()=> {}
