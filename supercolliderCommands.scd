// show where sample folder is
Quarks.gui

//list input and output devices
ServerOptions.devices;

//set output for zoom (on Mac, might be a little different on windows)
Server.default.options.outDevice_("External Headphones")

SuperDirt.start

//MIDI
MIDIClient.init;

//Note: you need to put the correct name here, IAC (etc.) is for a Mac
~midiOut = MIDIOut.newByName("IAC Driver", "Bus 1"); // FOR MAC
~midiOut = MIDIOut.newByName("loopMIDI Port", "loopMIDI Port"); // FOR WINDOWS

~dirt.soundLibrary.addMIDI(\midi, ~midiOut);
~midiOut.latency = 0.0;