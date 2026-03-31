// base
osc(24,0.01,.7).mult(shape(3).scale(1,()=>window.innerHeight/window.innerWidth)).out()

// basic feedback
src(o0).out(o0)

// scale (larger or smaller)
src(o0).scale(1.01).out(o0)

//rotate
src(o0).rotate(0.01).out(o0)

// blend (adjust the amount of blend)
// send the base to o1
osc(24,0.01,.7).mult(shape(3).scale(1,()=>window.innerHeight/window.innerWidth)).out(o1)
src(o0).scale(1.01).blend(o1,.1).out(o0)

// add more color in
src(o0).scale(1.01).blend(o1,.05).add(o1, 0.1).out(o0)

// scroll x
src(o0).scale(1.01).rotate(.01).scrollX(0.01).blend(o1,.05).add(o1, 0.1).out(o0)

// layer with luma is more crisp
src(o0).scale(1.01).rotate(0.01).layer(src(o1).luma(0.08)).out(o0)

// modulate
src(o0).modulate(src(o0).scale(1.01), 0.01).blend(o1,.01).out(o0)

// modulate hue (with larger modulate value) to make the modulaton centered
src(o0).modulateHue(src(o0).scale(1.01), 10).blend(o1,.01).out(o0)

// pattern without/with smooth
src(o0).modulateHue(src(o0).scale(1.01), 10).blend(o1,[.01, 0.1]).out(o0)

src(o0).modulateHue(src(o0).scale(1.01), 10).blend(o1,[.01, 0.1].smooth()).out(o0)

// with layer
src(o0).modulateHue(src(o0).scale(1.01), 10).layer(src(o1).luma(0.1)).out(o0)

// with layer and mask

// we were doing mult, which makes a black background
// mask will make a transparent background
osc(24,0.01,.7).mask(shape(3,0.3,0.01).rotate(0,.1).scale(1,()=>window.innerHeight/window.innerWidth)).out(o1)

render()

src(o0)
  .modulate(
    osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
  ,0.003)
  .layer(o1).out()

// blend in the none feedback version at the end (use smooth to animate the blend)
src(o0)
  .modulate(
    osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
  ,0.003)
  .layer(o1).blend(o1,[0, 0.1].smooth()).out()

// use diff and scale (we've seen this before)
src(o1).diff(src(o0).scale(.9)).out()

// blend it in with the output, overdrive the blend
src(o0).blend(src(o1).diff(o0).scale(1.01),1.01).out(o0)

// layer the original ontop
src(o0).blend( src(o1).diff(o0).scale(1.01),1.05).layer(o1).out(o0);

// video's have intersting effects with feedback

s0.initVideo("https://blog.livecoding.nyuadim.com/wp-content/uploads/stylegan.mp4")

src(s0).out()
src(s0).blend( src(o0).diff(s0).scale(1.01),[0,2]).out(o0);

// Sinc playback rate with hydra's rate

// We want the video to repeat in sync with Hydra's update speed.
// This means the video should restart every 2 seconds.
const loop = 2
// This remembers where we were in the loop on the previous frame.
// We'll use it to notice when the loop jumps back to the beginning.
let prevTime = 0
// Change the video's speed so that it takes exactly `loop` seconds
// to play from beginning to end.
//
// For example:
// if the video is 1.5 seconds long and `loop` is 2,
// the playback rate becomes 1.5 / 2 = 0.75
// so the video plays a bit slower and now lasts 2 seconds.
s0.src.playbackRate = s0.src.duration / loop
// Hydra calls `update()` over and over while it runs.
update = () => {
  // `time` keeps increasing forever, but `time % loop`
  // turns it into a repeating number:
  //
  // 0 -> 1 -> 1.9 -> 0 -> 1 -> 1.9 -> 0 ...
  //
  // So this tells us where we currently are inside the 2-second loop.
  const phase = time % loop
  // If `phase` suddenly becomes smaller than it was before,
  // that means the loop has just started over.
  //
  // Example:
  // previous frame: 1.98
  // current frame: 0.01
  //
  // When that happens, we jump the video back to the start too.
  if (phase < prevTime) {
    s0.src.currentTime = 0
  }
  // Save the current loop position so we can compare it
  // again on the next frame.
  prevTime = phase
}


hush()
