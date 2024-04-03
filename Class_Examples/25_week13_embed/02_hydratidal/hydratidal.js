var webDirt;
var audiogoing = false;

//this loads the audio library
webDirt = new WebDirt("sampleMap.json", "Dirt-Samples", 0, function() {
  console.log("callback from WebDirt constructor completed");
  webDirt.initializeWebAudio();
})

class Tidal {
  constructor() {

    this.val = null;
    this.phase = 0;
    this.pPhase = 0;
    this.evts = [];
    this.end = -Infinity;
    this.euclid = false;
    console.log("new tidal!")
  }

  pat(pattern, cycles) {
    if (cycles == null)
      cycles = 1;
    let p = Pattern(pattern);
    this.pPhase = this.phase;

    this.phase = time % cycles

    if (this.evts.length <= 0 && (this.pPhase > this.phase)) {
      this.evts = p.query(0, cycles)
    }

    if (this.evts[0] !== undefined && this.phase >= this.evts[0].arc.start.valueOf()) {
      const evt = this.evts.shift()
      this.val = evt.value
      if (evt.value.type == "number"){ //for euclid
        this.val = evt.value.value
        this.euclid=true;
      } else {
        this.euclid=false;
      }

      this.end = evt.arc.end.valueOf()
      this.value=null;

    } else if (this.euclid) this.val = null;

    return this.val

  }



  sound(pattern, spd, gn, samp, cycles) {
    if (cycles == null)
      cycles = 1;

    let p = Pattern(String(pattern));

    this.pPhase = this.phase;
    this.phase = time % cycles
    if (this.evts.length <= 0 && (this.pPhase > this.phase)) { //this.phase >= this.end ||
      this.evts = p.query(0, cycles)

    }

    if (this.evts[0] !== undefined && this.phase >= this.evts[0].arc.start.valueOf()) {
      const evt = this.evts.shift()

      this.val = evt.value

      if (evt.value.type == "number" || evt.value.type == "string") //for euclid
        this.val = evt.value.value

      this.end = evt.arc.end.valueOf()

      if (audiogoing) {

        let sample = this.val.split(':')[0]
        let sampleNum = parseInt(this.val.split(':')[1]);
        let s = 1;
        let g = 1;

        if (spd != null) s = spd;
        if (gn != null) g = gn;
        if (samp != null) sampleNum = samp;
        let m = {
          s: sample,
          n: sampleNum,
          speed: s,
          gain: g
        };
        webDirt.playSample(m);
      }
    }
    return this.val
  }
}

tidal = [];
for (let i = 0; i < 100; i++) {
  tidal[i] = new Tidal();
}
