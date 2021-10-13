// create an html5 video element
vid = document.createElement('video')
vid.autoplay = true
vid.loop = true

// an array for the video names, use complete file path
// you need to change the base path (and names) for your own videos!
basePath = "/Users/ags419/Documents/Code/classes/liveCoding/media/"
videos = [basePath+"0.mp4", basePath+"1.mp4", basePath+"2.mp4", basePath+"3.mp4", basePath+"4.mp4"]

// choose video source from array
vid.src = videos[4]

// use video within hydra
s0.init({src: vid})

// wrapping init in a listener might help with loading larger files
vid.addEventListener(
"loadeddata", function () {
  s0.init({ src: vid });
  console.log("new video")
}, false);

// main function, belnding a secondary function controlled by cc[1] in
src(s0)
  .blend(o1,()=>cc[1])
  .out()

src(o0)
  .blend(src(o0).diff(s0).scale(.99),1.1)
  .modulatePixelate(noise(2,0.01).pixelate(16,16),1024)
  .out(o1)

solid().out()

  ///////////////////////////////////////////////////////////////////////
  // register WebMIDI; need to paste this in console
  // access console cmnd + optn + i (macOS)
  // cntl + shft + i (windows)
  navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess) {
      var inputs = midiAccess.inputs;
      var outputs = midiAccess.outputs;
      for (var input of midiAccess.inputs.values()){
          input.onmidimessage = getMIDIMessage;
      }
  }

  function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
  }

  //create an array to hold our cc values and init to a normalized value
  var cc=Array(128).fill(0.5)

// custom midi receive function
  getMIDIMessage = function(midiMessage) {
      var arr = midiMessage.data
      var index = arr[1]
      // set vid src based on 0-127 number from tidal
      // for ccn 0
      if (index == 0)
        vid.src = videos[arr[2]]
      var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
      console.log(val)
      cc[index]=val
  }
  ///////////////////////////////////////////////////////////////////////
