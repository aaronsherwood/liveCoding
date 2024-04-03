let p5 = new P5();
s0.init({src: p5.canvas})
// p5 out
src(s0).out()
// in a browser you'll want to hide the canvas
p5.hide();
let gif = p5.loadImage("/Users/ags419/Documents/Code/liveCoding/media/haiku1.gif")
gif.play();
p5.fill(255)
p5.draw = ()=>{
  p5.image(gif,0,0,p5.width,p5.height);
  // uncomment below to sync the gif with tidal
  // gif.setFrame(Math.floor((cc[0]*gif.numFrames())));
}
