// webmidi https://github.com/djipco/webmidi

var size=20;
var circleSize = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  WebMidi.enable(function(err) {

    if (err) {
      console.log('WebMidi could not be enabled.', err);
    } else {
      console.log('WebMidi enabled!');
    }

    console.log("—");
    console.log("Inputs Ports: ");
    for (i = 0; i < WebMidi.inputs.length; i++) {
      console.log(i + ": " + WebMidi.inputs[i].name);
    }
    console.log("—");
    console.log("Output Ports: ");
    for (i = 0; i < WebMidi.outputs.length; i++) {
      console.log(i + ": " + WebMidi.outputs[i].name);
    }

    inputSoftware = WebMidi.inputs[0];

    inputSoftware.addListener('noteon', "all",
      function(e) {
        console.log("Received noteon message(" + e.note.name + e.note.octave +").");
        size = e.note.number;
      }
    );
  });
}

function draw() {
  background(map(mouseY,0,height,0,255));
  noStroke();
  fill(map(mouseX,0,width,0,255),0,0);
  circleSize += (map(size,60,120,0,255)-circleSize)*.5;
  ellipse(width/2, height/2, circleSize, circleSize);
  // send OSC
  sendOsc('/ctrl', 'speed', map(mouseX,0,width,0.5,3.5));
  sendOsc('/ctrl', 'gain', map(mouseY,0,width,0.0,1.5));
}
