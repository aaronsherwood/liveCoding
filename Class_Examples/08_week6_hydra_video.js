// an array for the video names, use complete file path
// you need to change the base path (and names) for your own videos!
basePath = "/Users/ags419/Documents/Code/classes/liveCoding/media/"
// basePath = "https://blog.livecoding.nyuadim.com/wp-content/uploads/" // to use with our class flok server
videoNames = [basePath+"0.mp4", basePath+"1.mp4", basePath+"2.mp4", basePath+"3.mp4", basePath+"4.mp4"] //"https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.mp4"
vids = []
for (let i=0; i<videoNames.length; i++){
	vids[i] = document.createElement('video')
	vids[i].autoplay = true
	vids[i].loop = true
  vids[i].crossOrigin="anonymous"
  vids[i].src = videoNames[i]
}

// choose video source from array
whichVid = 4
// use video within hydra (we can also use initVideo and then jsut the filepath, but this will add a video element every time: s0.initVideo("videoFilePathAndName") )
s0.init({src: vids[whichVid]})

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

// can use to switch between different hydra scripts too!
update = () =>{
  // very important! only change source once, when necessary
  if (whichVid != ccActual[0]){
    whichVid = ccActual[0];
    switch (whichVid){
      case 0:
      shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).out()
      break;
      case 1:
      shape(3,0.3,0.025).scale(1,innerHeight/innerWidth).invert().out()
      break;
      case 2:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).out()
      break;
      case 3:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05).pixelate(20,100).out()
      break;
      case 4:
      shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(2,0.05),.05).out()
      break;
    }
  }
}

solid().out()

// wrapping init in a listener might help with loading larger files
vid.addEventListener(
"loadeddata", function () {
  s0.init({ src: vid });
  console.log("new video")
}, false);
