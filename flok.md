# Flok
Web-based P2P collaborative editor for live coding music and graphics from here: [https://github.com/munshkr/flok](https://github.com/munshkr/flok)

## Requirements

Flok is written in TypeScript and Nodejs. You will need to have installed Node versions 10+. The LTS version (currently 14) is recommended.

Go  [here](https://nodejs.org/)  to download Node.

## [](https://github.com/munshkr/flok#install)Install

Right now, the easiest way to use Flok is to install the  `repl`  and  `web`  packages.

`npm install -g flok-repl flok-web`

## Usage

### Server

#### To start your own server simply do:

`flok-web`

Your local server will be available on  [http://localhost:3000](http://localhost:3000/)  from your computer. To share the URL with your friends, change  `localhost`  with your local IP. See  [how to find your local and external IP address](https://lifehacker.com/how-to-find-your-local-and-external-ip-address-5833108).

#### Class site server

There is also a flok server on our class site:

[https://www.flok.livecoding.nyuadim.com/](https://www.flok.livecoding.nyuadim.com/)

### REPL

The last step is to start  `flok-repl`, to connect Flok with your REPLs. When you join a session it will give you a command to start the connection to tidalcycles via the command line.

You will need to specify the server (prefixing with  `wss://`) where you created the session (or where you were invited to), the session  _token_  and the kind of REPL you want to start.

For example, if your session token is  `1a0c2df3-5931-46dd-9c7c-52932de15a5d`, to start a  `tidal`  REPL, run the following:

flok-repl -H wss://flok-hub.herokuapp.com -t tidal -s 1a0c2df3-5931-46dd-9c7c-52932de15a5d

*IMPORTANT* If you don't hear any sound that might mean that you need to specify where your tidalcyles' boot file is. If you start tidal in Atom it will give you the path location. Is using a homemade server use `ws` for the server location (substitute in the proper token):

`flok-repl -H ws://localhost:3000 -s [TOKEN] -t tidal --extra '{ "bootScript": "~/.atom/packages/tidalcycles/lib/BootTidal.hs" }'`

Use `wss` if using a public server:
`flok-repl -H wss://www.flok.livecoding.nyuadim.com:3000 -s [TOKEN] -t tidal --extra '{ "bootScript": "~/.atom/packages/tidalcycles/lib/BootTidal.hs" }' `
