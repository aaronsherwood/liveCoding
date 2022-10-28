# Flok
Web-based P2P collaborative editor for live coding music and graphics from here: [https://github.com/munshkr/flok](https://github.com/munshkr/flok)

## Requirements

Flok is written in TypeScript and Nodejs. You will need to have installed Node versions 10+. The LTS version (currently 14) is recommended.

Go  [here](https://nodejs.org/)  to download Node.

## [](https://github.com/munshkr/flok#install)Install

Right now, the easiest way to use Flok is to install the  `repl`  and  `web`  packages.

npm install -g flok-repl flok-web

If that doesn't work: We need to install older versions of each. Do both of the following:

`npm i -g flok-web@0.4.4`

`npm i -g flok-repl@0.4.5`

Then try to start your own server:

`flok-web`

If that gives you an error about *ghci command not found* then paste the following into the command line (you'll need to open a new terminal window afterwards to see the effect), then try `flok-web` again:

`echo '. $HOME/.ghcup/env' >> "$HOME/.zshrc"`
*(If you have an older Mac OS you may need to change the `.zshrc` part of that command to `.bashrc`)*

## Usage

### Class site server

There is a flok server on our class site:

[https://www.flok.livecoding.nyuadim.com/](https://www.flok.livecoding.nyuadim.com/)

When working in a group one person will need to start a server and share the url.

Type in *tidal, hydra* when prompted to enable both of those for use:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/flok1.png)

Then copy the url and share with your collaborators:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/flok2.png)

Then everyone should copy the code at the bottom on the next screen. This is how you will connect the browser to supercollider:

![enter image description here](https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/media/flok3.png)

Then click Join!

### To Connect to Tidalcycles:

 1. First, quit Atom to make sure you're Supercollider is not connected
    to that Tidal instance.
 2. Next (you might not need to do this), restart the Supercollider server.
 3. Paste the code you copied from the browser into the command line to connect to Supercollider.
