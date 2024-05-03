# Flok
Web-based P2P collaborative editor for live coding music and graphics from here: [https://github.com/munshkr/flok](https://github.com/munshkr/flok)

## Requirements

Flok is written in TypeScript and Nodejs. You will need to have installed Node versions 10+.

Go  [here](https://nodejs.org/)  to download Node.

## [](https://github.com/munshkr/flok#install)Install

Do the following on the command line:

`npm install -g flok-web@latest flok-repl@latest` ~`sudo npm i -g flok-repl@1.0.0-alpha.10 flok-web`~

Then try the following to test if install happened properly. It should print out the flok version you installed:

`flok-repl -V`

## Usage

### Server

When working in a group one person will need to start a server and share the url. There is a flok server on our class site:

[https://www.flok.livecoding.nyuadim.com](https://www.flok.livecoding.nyuadim.com)

Or you can use: [https://flok.cc/](https://flok.cc/) *(you will need to enable midi for hydra on this one, see near the end of this document for instructions)*

Copy the url and share with your collaborators:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/flok2.png)

You can press the REPLs button in the upper right corner to copy the script to connect the browser to supercollider:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/flok3.png)


### To Connect to Tidalcycles:

We need the code we copied to connect to Supercollider:

 1. First, quit Pulsar to make sure you're Supercollider is not connected
    to that Tidal instance.
 2. Next (you might not need to do this), restart the Supercoliider server.
 3. **If you want a custom BootTidal.hs file:** Take the code you copied before and paste this at the end of it `--extra '{ "bootScript": "~/Documents/Code/tidalscripts/BootTidal.hs" }'`
 	The complete code will look something like this: (replace the [TOKEN} part):

	`npx flok-repl@1.0.0-alpha.10 -H wss://www.flok.livecoding.nyuadim.com:3000 \
    -s varying-salmon-blackbird-ed20ba61 \
    -t tidal \
    -T user:aaron \
    --extra '{ "bootScript": "~/Documents/Code/tidalscripts/BootTidal.hs" }'`

Paste the code you copied from the site (with the addition of the custom boot file or not) into the command line (a different window from the server window) to connect to Supercollider.

You can change the flok-repl code to automatically load the correct BootTidal.hs without having to paste that extra bit on at the end:
 1. Find out where flok-repl is: `which flok-repl`
 2. `cd` to that directory (aka `cd /usr/local/bin/`)
 3. Right click on flok-repl and select "Show Original" (for Mac, it should be something similar on Windows)
 4. Go up a directory level and then open *lib/repl/tidal.js* in Atom or another text editor
 5. Search for the defaultBootScript() function and change the function to return your correct BootTidal.hs file location: `return '~/Documents/Code/tidalscripts/BootTidal.hs'// path.join(this.dataDir(), 'BootTidal.hs');` (the original part code is left there but commented out

### MIDI

You can evaluate the following lines of code on the hydra side in flok to enable midi:

```
// enable WebMidi
const s = document.createElement( 'script' )
s.src = 'https://cdn.rawgit.com/aaronsherwood/liveCoding/main/midi.js'
document.querySelector( 'head' ).appendChild( s )
```

## GHCI Error

### OSX

If you get an error about *ghci command not found* then paste the following into the command line (you'll need to open a new terminal window afterwards to see the effect), then try `flok-web` again:

`echo '. $HOME/.ghcup/env' >> "$HOME/.zshrc"`
*(If you have an older Mac OS you may need to change the `.zshrc` part of that command to `.bashrc`)*

You may also need to add ghci to PATH: `PATH=$PATH:~/.ghcup/bin/`

You only need to do this once.

### Windows 10, 11:

Find the *flok-repl.js* file under `C:\Users\\[USERNAME]\AppData\Roaming\npm\node_modules\flok-repl\bin`

Go to Line 76 (or around 76), find:

```
if (extra) {
  try {
    extraOptions = Object.assign(extraOptions, JSON.parse(extra));
  } catch {
    console.error('Invalid extra options JSON object:', extra);
    process.exit(1);
  }
}
```

Comment that entire if statement out.

Then add the following:

```
//Modify it and check if it is the adress of your BootTidal.hs file
extraOptions.bootScript = "C:/Users/[USERNAME]/.atom/packages/tidalcycles/lib/BootTidal.hs";
//add it if you use Stack to boot Tidal.
extraOptions.useStack = true;
```

That entire section of code should now look like:

```
const { extra } = program;
let extraOptions = config.extra || {};

//Modify it and check if it is the adress of your BootTidal.hs file
extraOptions.bootScript = "C:/Users/[USERNAME]/.atom/packages/tidalcycles/lib/BootTidal.hs";
//add it if you use Stack to boot Tidal.
extraOptions.useStack = true;

// if (extra) {
//   try {
//     extraOptions = Object.assign(extraOptions, JSON.parse(extra));
//   } catch {
//     console.error('Invalid extra options JSON object:', extra);
//     process.exit(1);
//   }
// }
```

There is no need to include `--extra` any longer when pasting code into the command line to start flok-repl.
