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

solid().out()
