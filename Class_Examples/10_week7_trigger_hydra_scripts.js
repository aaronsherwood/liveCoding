// change the blend amount between 0 and 1 to switch in different hydra scripts
shape(3).blend(osc(),1).out()

// make an array of hydra scripts
visuals = [
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).out(),
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().out(),
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).out(),
  ()=>{src(s0)
    .blend(src(o0).diff(s0).scale(.9999)
  	.modulatePixelate(noise(10,0.001).pixelate(16,16),1024),1)
    .out()},
  ()=>shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(3,0.05),.03).out()
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
