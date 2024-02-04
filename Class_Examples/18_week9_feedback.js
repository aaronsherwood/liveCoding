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

// we were doing mult, which makes a black bakckground
// mask will make a transparent background
osc(24,0.01,.7).mask(shape(3,0.3,0.01).rotate(0,.1).scale(1,()=>window.innerHeight/window.innerWidth)).out(o1)

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

// blend it in with the output, orverdrive the blend
src(o0).blend(src(o1).diff(o0).scale(1.01),1.01).out(o0)

// layer the original ontop
src(o0).blend( src(o1).diff(o0).scale(1.01),1.05).layer(o1).out(o0);

// video's have intersting effects with feedback
// COPY AND PASTE INTO CONSOLE OR LOAD SEPARATELY
vid = document.createElement('video')
vid.autoplay = true
vid.loop = true
vid.src = "https://blog.livecoding.nyuadim.com/wp-content/uploads/stylegan.mp4"
vid.crossOrigin="anonymous"
s0.init({src: vid})

src(s0).out()
src(s0).blend( src(o0).diff(s0).scale(1.01),[0,2]).out(o0);

// sink playback rate with hydra's rate
// multiply it by 0.5 to make it go half as fast
vid.playbackRate = vid.duration*0.5

// if you want ot get the start of the video to sink up you can use update
let prevTime = 0;
update =()=>{
  if (time%2 < prevTime)
    vid.currentTime=0
  prevTime = time%2
}

hush()
