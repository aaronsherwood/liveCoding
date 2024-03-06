visuals = [
  ()=>{shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).out()},
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().out(),
  ()=>shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).out(),
  ()=>{solid()
    .blend(src(o0).diff(solid()).scale(.999)
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

whichVisual = 0
