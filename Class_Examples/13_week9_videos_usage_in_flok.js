// first part will load the midi javascript stuff
const s = document.createElement( 'script' )
// change the next line to the file location on your computer
s.src = '/Users/ags419/Documents/Code/classes/liveCoding/midi.js'
document.querySelector( 'head' ).appendChild( s )

/*
LOCALHOST WAY

when running your own server you won't be able to load videos
SO! quit chrome altogether
find your binary path (eg: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome) to chrome
and start chrome from command line with these flags disbaling security:
<PATH_TO_CHROME> –allow-file-access-from-files --disable-web-security --user-data-dir=”~/temp”

then we need to start another server to serve the videos
first navigate in the command line to the folder where your videos are
then use python to start a simple server:
for python2 do: python -m "SimpleHTTPServer"
for python3 do : python -m "http.server"
this will server your videos at localhost:8000
*/

// now we'll load all the videos into separate video elements
vids = []
basePath = "http://localhost:8000/"
// basePath = "https://www.flok.livecoding.nyuadim.com:3000/" // to use with our class flok server
videoNames = [basePath+"0.mp4", basePath+"1.mp4", basePath+"2.mp4", basePath+"3.mp4", basePath+"4.mp4"]
for (let i=0; i<videoNames.length; i++){
	vids[i] = document.createElement('video')
	vids[i].autoplay = true
	vids[i].loop = true
  	vids[i].crossOrigin="anonymous"
  	vids[i].src = videoNames[i]
}

// test
s1.init({src: vids[0]})
src(s1).out()

// change the videos wth P5 and midi
src(s1).scale(()=>-1*cc[0]*cc[1]+1).out()
render(o0)
p5 = new P5()
// need to hide it!
p5.hide();
s0.init({src: p5.canvas})
let prev = -1;
p5.draw = ()=>{
  p5.background(255);
	// this time reinit the source with the different videos
  if (cc[2]!=prev){
    if (cc[1]==1){
      if (cc[2]==0){
        s1.init({src: vids[1]})
      } else if (cc[2]==1){
        s1.init({src: vids[4]})
      }
    } else {
      if (cc[2]==0){
        s1.init({src: vids[0]})
      } else if (cc[2]==1){
       s1.init({src: vids[3]})
      }
    }
    prev=cc[2];
  }
}

// LOADING VIDEOS REMOTELY
// only some websites will allow you to load a video from them
// our blog is setup to do this

//Loading a video with no sound is very easy:
s0.initVideo("https://blog.livecoding.nyuadim.com/wp-content/uploads/299.mp4")
src(s0).out()

//you can also load from giphy (and load your videos up on giphy):
s0.initVideo("https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.mp4")
src(s0).out()

//If you want sound from the video (click mouse for sound)
vid = document.createElement('video')
vid.crossOrigin = 'anonymous'
vid.autoplay = true
vid.loop = true
vid.muted = true // mute in order to load without user interaction
const onload = vid.addEventListener('loadeddata', () => {
  vid.play()
  s0.init({src: vid})
  src(s0).out(o0)
})
vid.src = "https://blog.livecoding.nyuadim.com/wp-content/uploads/299.mp4"
window.addEventListener("click", function(event) {
  vid.muted = false
})
