// just one cc value used for noise
osc(200,0.01,1).rotate(1).layer(osc(30,0,1).saturate().luma(0.2,.2).color(0,0,0,1)).layer(osc(30,0,1).luma(0.5,0.01)).modulate(noise(()=>(cc[0])*3,.1)).out(o0)
// two values, used for noise and luma
osc(200,0.01,1).rotate(1).layer(osc(30,0,1).saturate().luma(0.2,.2).color(0,0,0,1)).layer(osc(30,0,1).luma(()=>cc[1],0.01)).modulate(noise(()=>(cc[0])*3,.1)).out(o0)
//three values, two used for noise and added together, and the third for luma
osc(200,0.01,1).rotate(1).layer(osc(30,0,1).saturate().luma(0.2,.2).color(0,0,0,1)).layer(osc(30,0,1).luma(()=>cc[1],0.01)).modulate(noise(()=>(cc[0]+cc[2])*3,.1)).out(o0)


///////////////////////////////////////////////////////////////////////
// register WebMIDI; need to paste this in console
// access console cmnd + optn + i
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
    var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
    cc[index]=val
}
///////////////////////////////////////////////////////////////////////
