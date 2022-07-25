// this sketch shows how to use texture coordinates to create a fly's eye mosaic effect


// the shader variable
let camShader;

// the camera variable
let cam;

var size=20;
var power = 0;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

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
        // console.log("Received noteon message(" + e.note.name + e.note.octave +").");
        size = e.note.number;
        console.log(size)
      }
    );

    // Listen to control change message on all channels
    inputSoftware.addListener('controlchange', "all",
      function (e) {
        console.log("Received 'controlchange' message.", e);
        if (e.controller.number==30)
          size = e.value;
        if (e.controller.number==31)
          power = e.value;
      }
    );
  });
}

function draw() {


  // shader() sets the active shader with our shader
  shader(camShader);
  // send the camera and the resolution to the shader
  camShader.setUniform('tex0', cam);
  camShader.setUniform('resolution', [width, height]);
  camShader.setUniform('amount', map(size,0,127,0,1.));
  camShader.setUniform('power', map(power,0,127,0,10.));

  // rect gives us some geometry on the screen
  rect(0,0,width, height);

  // send OSC
  sendOsc('/ctrl', 'speed', map(mouseX,0,width,0.5,3.5));
  sendOsc('/ctrl', 'gain', map(mouseY,0,width,0.0,1.5));
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
