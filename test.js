test = ()=>{osc(10,.1,1.).out() }

test2 = (baseRotation=1.57) => osc(()=>(time%1)+3,0,()=>time%1).rotate(()=>(time%4)*.314+baseRotation).out()

test3 = ()=>osc().out()

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
