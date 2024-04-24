// in our class flok website there is a loadscript function
// use it to load hydra code you've prepared ahead of time
// load scripts up on github then use cdn.jsdeliver.net in the following way:
// https://cdn.jsdelivr.net/gh/user/repo@version/file

// you can use this in flok to load scripts:
loadScript("https://cdn.rawgit.com/aaronsherwood/liveCoding/main/test.js")

// or locally in pulsar
loadScript("/Users/ags419/Documents/Code/liveCoding/test.js")

// you will most likely not have this in your local flok instances (it won't work at all in atom either)
// in your local flok you can make the function by pasting this into the console:
window.loadScript = (url = "") => {
	const p = new Promise((res, rej) => {
		var script = document.createElement("script");
		script.onload = function () {
			console.log(`loaded script ${url}`);
			res();
		};
		script.onerror = (err) => {
			console.log(`error loading script ${url}`, "log-error");
			res()
		};
		script.src = url;
		document.head.appendChild(script);
	});
	return p;
};

test() // test2() and test3()

visuals[0]()

// to load midi:
const s = document.createElement( 'script' )
s.src = 'https://cdn.rawgit.com/aaronsherwood/liveCoding/main/midi.js'
document.querySelector( 'head' ).appendChild( s )

// then do the loadScript call as at top in hydra after pasting that

// Loading shaders online
// You can use github to store your shader files
// Get the raw version of the file and use that URL
// NOTE: p5 WEBGL mode in flok should be lowercase (webgl) but in pulsar should be upper case

p5 = new P5({width: window.innerWidth, height:window.innerHeight, mode: 'webgl'})
shader = p5.loadShader("https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/Class_Examples/shaders/basic.vert", "https://raw.githubusercontent.com/aaronsherwood/liveCoding/main/Class_Examples/shaders/ocean.frag");
p5.hide() // REMEMBER TO DO HIDE!

p5.draw = ()=>{
  shader.setUniform("time", time);
  shader.setUniform("resolution", [p5.width, p5.height]);
  shader.setUniform("mouse",[p5.mouseX, p5.mouseY]);
  p5.shader(shader);
  p5.rect(0, 0, width, height);
}
s0.init({src: p5.canvas})
src(s0).out()

p5.remove() // REMEMBER TO REMOVE P5!

hush()
// GIPHY
// you can load gifs from giphy as mp4s

// steps:
// 1. find soemthing on giphy you like: https://giphy.com/stories/10-funtastic-gifs-from-bangla-cinema-7ad51806-6880
// 2. rightclick on it, open image in new tab you then might get this: https://media4.giphy.com/media/ydyPHV9Fw79TplUhMq/giphy.webp
// 3. find the file extension (in this case, .webp), change to .mp4 (right in browser): https://media4.giphy.com/media/ydyPHV9Fw79TplUhMq/giphy.mp4
// 4. now load in hydra:

s0.initVideo("https://media4.giphy.com/media/ydyPHV9Fw79TplUhMq/giphy.mp4")

// Another common example:
// 1. https://giphy.com/gifs/internet-college-class-ny7UCd6JETnmE
// 2. https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.gif?cid=ecf05e47kd4iv4uvv4p4cuax3j8vqgap31lqgaa4pkjnq07x&rid=giphy.gif&ct=g
// (notice the actual .gif extension here is about midway through that url)
// 3. https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.mp4

s0.initVideo("https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.mp4")

// SPEED
// change the speed hydra loops at, default is 1
speed = 0.5

// UPDATE
// hydra has an update function that goes at the same speed as the rest of its loops
// use as follows:

update = ()=>{
	//do stuff in here
}

//example:
speed = 0.5

counter=0
ptime=0

update = ()=>{
 mod = time%1
 if ( ptime > mod)
  counter = (counter+1)%3
 ptime = mod
}

shape(()=>counter+3).rotate(()=>(Math.cos(time)+1)*.5*6.28).scale(1,()=>height/width).out()

// WAY TO BE SURE OF IMAGE LOAD IN FLOK
image = document.createElement('img')
image.crossOrigin="anonymous"
image.src = "https://blog.livecoding.nyuadim.com/wp-content/uploads/photo-1711873317754-11f6de89f7ae-scaled.jpg"

loaded = ()=>{
  s0.init({src: image})
  src(s0).out()
  console.log("Image loaded");
}

if (image.complete) {
  loaded()
} else {
  image.addEventListener('load', loaded)
}

/*
TIDALCYCLES load custom BootTidal.hs in flok:

add this to the end of your script to paste in the terminal:

--extra '{ "bootScript": "/path/to/BootTidal.hs"}'

need to put a \ at the end of the previous line for it to work

npx flok-repl@latest -H wss://www.flok.livecoding.nyuadim.com:3000 \
  -s lost-scarlet-wombat-8ed1b8d5 \
  -t tidal \
  -T user:aaron \
	--extra '{ "bootScript": "/Users/ags419/Documents/Code/tidalscripts/BootTidal.hs"}'
*/
