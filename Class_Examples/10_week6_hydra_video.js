loadScript('/Users/ags419/Documents/Code/liveCoding/Class_Examples/11_week6_hydra_video_loadThisScript.js')

// choose video source from array
// use video within hydra (we can also use initVideo and then just the filepath, but this will add a video element every time: s0.initVideo("videoFilePathAndName") )
s0.init({src: vids[0]})

// main function, blending a secondary function controlled by cc[1] in
src(s0)
  .blend(o1,()=>cc[1])
  .out()
// secondary fuction
src(o0)
  .blend(src(o0).diff(s0).scale(.99),1.1)
  .modulatePixelate(noise(2,0.01).pixelate(16,16),1024)
  .out(o1)
//tapping into hydra's update loop to change the videos
update = () =>{
  // very important! only change source once, when necessary
  if (whichVid != ccActual[0]){
    whichVid = ccActual[0];
    s0.init({src: vids[whichVid]})
  }
}

//seek certain time stamp in video
s0.src.currentTime=0.0

// gets you the duration of a video
console.log( s0.src.duration )

// choosing different frames in the same video
s0.init({src: vids[2]})
src(s0).out()
let whichStamp=0
update = () =>{
  // need to change the timestamp only if it is different
  // otherwise it doesn't work (it will keep just choosing same frame and no tplay )
  let messageFromTidal = cc[0]*vids[2].duration
  if (messageFromTidal != whichStamp){
    whichStamp = messageFromTidal;
    s0.src.currentTime=whichStamp
  }
}

// play movie with sound
s0.initVideo("/Users/ags419/Documents/Code/liveCoding/media/jefferygibsonesque.mp4")

// only if you want to trigger it to play from the start
s0.src.loop = false
s0.src.autoplay = false

// turn on the sound (if you want louder, you need to adjust the audio in the file. html video volume is between 0 & 1)
s0.src.muted = false

// play and pause
s0.src.play()
s0.src.pause()

// remove the video
s0.src.src = '';

solid().out()

render()
