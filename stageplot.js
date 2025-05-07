let soundFiles = [
    "https://icomefromsound.vercel.app/mp3/left1.mp3",
    "https://icomefromsound.vercel.app/mp3/c1.mp3",
    "https://icomefromsound.vercel.app/mp3/right1.mp3",
    "https://icomefromsound.vercel.app/mp3/left2.mp3",
    "https://icomefromsound.vercel.app/mp3/c2.mp3",
    "https://icomefromsound.vercel.app/mp3/right2.mp3",
    "https://icomefromsound.vercel.app/mp3/left3.mp3",
    "https://icomefromsound.vercel.app/mp3/c3.mp3",
    "https://icomefromsound.vercel.app/mp3/right3.mp3"
  ];
  
  let labels = [
    "upstage right",
    "upstage",
    "upstage left",
    "stage right",
    "centre stage",
    "stage left",
    "downstage right",
    "downstage",
    "downstage left"
  ];
  
  let sounds = [];
  let buttons = [];
  let canvas;
  
  function preload() {
    for (let i = 0; i < soundFiles.length; i++) {
      sounds[i] = loadSound(soundFiles[i]);
    }
  }
  
  function setup() {
    let canvasSize = 0.3 * windowHeight;
    canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('stageplot');
    textAlign(CENTER, CENTER);
    textSize(14);
  
    // Define button regions
    let cellW = width / 3;
    let cellH = height / 3;
  
    for (let i = 0; i < labels.length; i++) {
      let col = i % 3;
      let row = floor(i / 3);
      let x = col * cellW;
      let y = row * cellH;
  
      buttons.push({
        x: x + cellW / 2 - 60,
        y: y + cellH / 2 - 20,
        w: 120,
        h: 40,
        label: labels[i],
        index: i,
        playing: false
      });
    }
  }
  
  function draw() {
    background(240);
  
    // Draw 3x3 grid
    stroke(180);
    let cellW = width / 3;
    let cellH = height / 3;
    for (let i = 1; i < 3; i++) {
      line(i * cellW, 0, i * cellW, height);
      line(0, i * cellH, width, i * cellH);
    }
  
    // Draw buttons
    for (let btn of buttons) {
      fill(btn.playing ? "#ff6666" : "#1f77b4");
      stroke(0);
      rect(btn.x, btn.y, btn.w, btn.h, 8);
  
      fill(255);
      noStroke();
      textSize(12);
      text((btn.playing ? "⏸ " : "▶ ") + btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  
    fill(50);
    textSize(18);
    //text("Stage Map – Click a region to play/pause", width / 2, 20);
  }
  
  function mousePressed() {
    for (let btn of buttons) {
      if (
        mouseX > btn.x &&
        mouseX < btn.x + btn.w &&
        mouseY > btn.y &&
        mouseY < btn.y + btn.h
      ) {
        if (sounds[btn.index].isPlaying()) {
          sounds[btn.index].pause();
          btn.playing = false;
        } else {
          sounds[btn.index].play();
          btn.playing = true;
        }
      }
    }
  }
  