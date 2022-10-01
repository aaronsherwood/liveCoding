// change the blend amount between 0 and 1 to switch in different hydra scripts
shape(3).blend(osc(),1).out()

// make an array of hydra scripts
visuals = [
  shape(3,0.3,0.025).scale(1,innerHeight/innerWidth),
  shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert(),
  shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)),
  shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05).pixelate(20,100),
  shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05)]

whichVisual = 0
visuals[whichVisual].out()

// can use update and switch case with midi:
update = () =>{
  // very important! only change source once, when necessary
  if (whichVisual != ccActual[0]){
    whichVisual = ccActual[0];
    visuals[whichVisual].out()
  }
}

// clear update
hush()
// OR (without stopping visuals all together)
update = ()=> {}

// or you could use a switch case
update = () =>{
  // very important! only change source once, when necessary
  if (whichVisual != ccActual[0]){
    whichVisual = ccActual[0];
    switch (whichVisual){
      case 0:
      shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).out()
      break;
      case 1:
      shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().out()
      break;
      case 2:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).out()
      break;
      case 3:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05).pixelate(20,100).out()
      break;
      case 4:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05).out()
      break;
    }
  }
}

hush()
