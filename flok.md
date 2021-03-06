# Flok
Web-based P2P collaborative editor for live coding music and graphics from here: [https://github.com/munshkr/flok](https://github.com/munshkr/flok)

## Requirements

Flok is written in TypeScript and Nodejs. You will need to have installed Node versions 10+. The LTS version (currently 14) is recommended.

Go  [here](https://nodejs.org/)  to download Node.

## [](https://github.com/munshkr/flok#install)Install

Right now, the easiest way to use Flok is to install the  `repl`  and  `web`  packages.

~~npm install -g flok-repl flok-web~~ 

A new version was just uploaded which doesn't work. We need to install older viersions of each. Do both of the following:

`npm i -g flok-web@0.4.4`

`npm i -g flok-repl@0.4.5`

Then try to start your own server:

`flok-web` 

If that gives you an error about *ghci command not found* then paste the following into the command line (you'll need to open a new terminal window afterwards to see the effect), then try `flok-web` again:

`echo '. $HOME/.ghcup/env' >> "$HOME/.zshrc"` 
*(If you have an older Mac OS you may need to change the `.zshrc` part of that command to `.bashrc`)*

## Usage

### Server

When working in a group one person will need to start a server:

`flok-web`

You will then see something like this. You now have a local server on your computer.

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/listening.png)

Navigate to it in your browser:  [http://localhost:3000](http://localhost:3000/) 

To share the URL with others, change  `localhost`  with your local IP. See  [how to find your local and external IP address](https://lifehacker.com/how-to-find-your-local-and-external-ip-address-5833108). This will only work while on the NYU wifi (or the same wifi network, if not NYU).

Type in tidal, hydra when prompted to enable both of those for use:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/typeIN.png)

Copy this code on the next screen:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/copythispart.png)

### To Connect to Tidalcycles:

We need the code we copied to connect to Supercollider:

 1. First, quit Atom to make sure you're Supercollider is not connected
    to that Tidal instance.
 2. Next (you might not need to do this), restart the Supercoliider server.
 3. Take the code you copied before and paste this at the end of it `--extra '{ "bootScript": "~/.atom/packages/tidalcycles/lib/BootTidal.hs" }'`
 4. The complete code will look something like this: (replace the [TOKEN} part): 

	`flok-repl -H ws://localhost:3000 -s [TOKEN] -t tidal --extra '{ "bootScript": "~/.atom/packages/tidalcycles/lib/BootTidal.hs" }'` 
	
	Paste that into the command line (a different window from the server window) to connect to Supercollider.
	 
### Class site server

There is also a flok server on our class site:

[https://www.flok.livecoding.nyuadim.com/](https://www.flok.livecoding.nyuadim.com/)

