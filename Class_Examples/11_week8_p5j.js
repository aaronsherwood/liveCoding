// start a new p5js instance
p5 = new P5()

// can just use functions from p5 without actually drawing anything
// everything specific to thep5 library should start with p5.

// use perlin noise
shape(2,.01).rotate(()=>p5.noise(time*.1)).out()

// use map
shape(2,.01).rotate(()=>p5.map(p5.mouseX,0,p5.width,0,p5.TWO_PI)).out()

// use the p5 canvas as a source for hydra
s0.init({src: p5.canvas})
// p5 out
src(s0).out()
// in a browser you'll want to hide the canvas
p5.hide();
// no need for setup
p5.noFill()
p5.strokeWeight(20);
p5.stroke(255);
// p5 draw loop
p5.draw = ()=>{
  p5.background(0);
  p5.ellipse(p5.noise(time*.2)*p5.width,p5.noise(time*.3+100)*p5.height,300,300);
}
render(o0)

// combine with hydra
shape(2,.01).rotate(()=>p5.map(p5.mouseX,0,p5.width,0,p5.TWO_PI)).out(o1)
src(s0).diff(o1).out()

src(s0).modulate(noise(2,0.1),.03).diff(src(o1)).out()

src(s0).modulate(noise(2,0.1),.03).mult(osc(10,0,1)).diff(src(o1)).out()

// feedback
src(s0).mult(osc(10,0,1)).out()
osc(2,0.,1).modulate(noise(3,0.01),1).out(o1)
src(o2).modulate(src(o1).add(solid(1,1),-0.5),.005).blend(src(o0).add(o0).add(o0).add(o0),0.1).out(o2)
render(o2)
s0.init({src: p5.canvas})
// in a browser you'll want to hide the canvas
p5.hide();
// no need for setup
p5.noFill()
p5.strokeWeight(20);
p5.stroke(255);
// with tidal
p5.draw = ()=>{
  p5.background(0);
  if (cc[1]==1){
    p5.ellipse(p5.width/2,p5.height/2,600*cc[0]+300*p5.noise(cc[0]),600*cc[0]+300*p5.noise(cc[0]));
  } else {
    p5.ellipse(p5.noise(cc[0]*2)*p5.width,cc[0]*p5.height,300,300);
  }
}

// video control
vid = document.createElement('video')
vid.autoplay = true
vid.loop = true

// BE SURE TO CHANGE THE FOLDER NAME
// BE SURE TO PUT A SLASH AFTER THE FOLDER NAME TOO
basePath = "/Users/ags419/Documents/Code/classes/liveCoding/media/"
videos = [basePath+"0.mp4", basePath+"1.mp4", basePath+"2.mp4", basePath+"3.mp4", basePath+"4.mp4"]

// choose video source from array
vid.src = videos[0]

// use video within hydra
s1.init({src: vid})
// cc[1] will be zero always during the "A" section
// thus making the scale value not change
src(s1).scale(()=>-1*cc[0]*cc[1]+1).out()
render(o0)
p5 = new P5()
s0.init({src: p5.canvas})
let prev = -1;
p5.draw = ()=>{
  p5.background(0);
  // only change the video when the number from tidal changes,
  // otherwise the video wil keep triggering from the beginning and look like it's not playing
  // cc[2] is for changing the video
  if (cc[2]!=prev){
    // cc[1] changes when it is the "B" section
    if (cc[1]==1){
      if (cc[2]==0){
        vid.src = videos[1]
      } else if (cc[2]==1){
        vid.src = videos[4]
      }
    } else {
      if (cc[2]==0){
        vid.src = videos[0]
      } else if (cc[2]==1){
        vid.src = videos[3]
      }
    }
    prev=cc[2];
  }
}

///////////////////////////////////////////////////////////////////////
// register WebMIDI; need to paste this in console
// access console cmnd + optn + i (macOS)
// cntl + shft + i (windows)
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
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

getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data
    var index = arr[1]
    //console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
    var val = (arr[2])/127.0  // normalize CC values to 0.0 - 1.0
    cc[index]=val
}
///////////////////////////////////////////////////////////////////////
