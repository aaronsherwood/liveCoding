// change the blend amount between 0 and 1 to switch in different hydra scripts
shape(3).blend(osc(),0).out()

// look at the script in this file
loadScript('/Users/ags419/Documents/Code/liveCoding/Class_Examples/14_week7_trigger_hydra_scripts_loadThisScript.js')

// OR if in flok:
// loadScript("https://cdn.jsdelivr.net/gh/aaronsherwood/liveCoding@main/Class_Examples/14_week7_trigger_hydra_scripts_loadThisScript.js")

visuals[0]()

visuals[whichVisual]()

// can use update and switch case with midi:
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

// if you want to load a remote URL in pulsar you can use this function:

window.loadRemoteScript = (url) => {
  return fetch(url)
    .then((r) => r.text())
    .then((code) => window.eval(`${code}\n//# sourceURL=${url}`))
}

loadRemoteScript("https://cdn.jsdelivr.net/gh/aaronsherwood/liveCoding@main/test.js")
