// change the blend amount between 0 and 1 to switch in different hydra scripts
shape(3).blend(osc(),1).out()

// look at the script in this file
loadScript('/Users/ags419/Documents/Code/liveCoding/Class_Examples/14_week7_trigger_hydra_scripts _loadThisScript.js')

visuals[0]()

// can use update and switch case with midi:
var whichVisual = 0
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
