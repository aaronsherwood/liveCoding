# MIDI steps for flok

1.  start server `flok-web`
2.  use `localhost` in browser on server computer (not IP address) ***very important***
3.  activate midi JS on server computer
	`const s = document.createElement( 'script' );
	s.src = 'https://livecoding.nyuadim.com/public/midi.js';
	document.querySelector( 'head' ).appendChild( s );`
4.  make sure to activate midi in supercollider (on server computer)
5.  add this in the hydra side on the client computer to make sure you don't get an error:
 `var cc=Array(128).fill(0.5)`
7.  evaluate midi in tidal in either server or client computer and you will see visuals react appropriately on server computer
8.  visuals will not react to midi on client computer
