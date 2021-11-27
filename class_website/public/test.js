test = ()=>{osc(10,.1,1.).out() }

test2 = (baseRotation=1.57) => osc(()=>(time%1)+3,0,()=>time%1).rotate(()=>(time%4)*.314+baseRotation).out()
