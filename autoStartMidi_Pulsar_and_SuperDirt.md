# Setup SuperDirt and MIDI to start when supercollider loads

Open SuperCollider. Click on File > Open startup file. Paste the following text-file in the new buffer that just appeared. COMMENT OUT THE MIDI LINE WHICH IS NOT FOR YOUR COMPUTER (Mac or Windows). Save and viola!


```

(
s.reboot { // server options are only updated on reboot
    // configure the sound server: here you could add hardware specific options
    // see http://doc.sccode.org/Classes/ServerOptions.html
    s.options.numBuffers = 1024 * 256; // increase this if you need to load more samples
    s.options.memSize = 8192 * 32; // increase this if you get "alloc failed" messages
    s.options.numWireBufs = 64; // increase this if you get "exceeded number of interconnect buffers" messages
    s.options.maxNodes = 1024 * 32; // increase this if you are getting drop outs and the message "too many nodes"
    s.options.numOutputBusChannels = 2; // set this to your hardware output channel size, if necessary
    s.options.numInputBusChannels = 2; // set this to your hardware output channel size, if necessary
    // uncomment here for different outputs
    //s.options.outDevice_("External Headphones");
    //s.options.outDevice_("Crestron");
    // boot the server and start SuperDirt
    s.waitForBoot {
        ~dirt = SuperDirt(2, s); // two output channels, increase if you want to pan across more channels
        ~dirt.loadSoundFiles;   // load samples (path containing a wildcard can be passed in)
        // for example: ~dirt.loadSoundFiles("/Users/myUserName/Dirt/samples/*");
        // s.sync; // optionally: wait for samples to be read
        //MIDI
        MIDIClient.init;

        //Comment out the one that is not for your computer:
        ~midiOut = MIDIOut.newByName("IAC Driver", "Bus 1"); // FOR MAC
        ~midiOut = MIDIOut.newByName("loopMIDI Port", "loopMIDI Port"); // FOR WINDOWS

        ~dirt.soundLibrary.addMIDI(\midi, ~midiOut);
        ~midiOut.latency = 0.0;
        ~dirt.start(57120, 0 ! 12);   // start listening on port 57120, create two busses each sending audio to channel 0

        // optional, needed for convenient access from sclang:
        (
            ~d1 = ~dirt.orbits[0]; ~d2 = ~dirt.orbits[1]; ~d3 = ~dirt.orbits[2];
            ~d4 = ~dirt.orbits[3]; ~d5 = ~dirt.orbits[4]; ~d6 = ~dirt.orbits[5];
            ~d7 = ~dirt.orbits[6]; ~d8 = ~dirt.orbits[7]; ~d9 = ~dirt.orbits[8];
            ~d10 = ~dirt.orbits[9]; ~d11 = ~dirt.orbits[10]; ~d12 = ~dirt.orbits[11];
        );
    };

    s.latency = 0.3; // increase this if you get "late" messages
};
);
```

# Set MIDI to automatically be loaded in Atom

In Pulsar:
* Go to: Preferences >> Packages
* Search for Hydra
* Click anywhere in the Hydra grey box. This should bring you to an Atom-Hydra settings page in Atom.
* Click View Code
* Navigate to node_modules >> hydra-synth >> hydra-synth.js (make sure it's not the hydra-synth.js in the src folder, we want to be in the main hydra-synth folder)
* In hydra-synth.js, paste in the following after `this._initCanvas(canvas)`. Be sure to put the full file path to the midi.js file on your computer:
```
const s = document.createElement( 'script' )
// change the next line to the file location on your computer
s.src = 'PUT_YOUR_FILE_PATH_HERE/liveCoding/midi.js'
document.querySelector( 'head' ).appendChild( s )
```
