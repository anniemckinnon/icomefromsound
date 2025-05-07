let drywet = (p) => {
  let slider;
  let sliderLabelLeft, sliderLabelRight;
  let raindrops = [];
  let mistParticles = [];
  let canvas;

  p.setup = () => {
    let canvasSize = p.windowWidth * 0.29;
    canvas = p.createCanvas(canvasSize, canvasSize).parent('drywet');
    canvas.style('border', '0.2px solid black'); // Add border here

    // Create slider and labels only once
    if (!slider) {
      slider = p.createSlider(0, 100, 0); //first val = min, second val = max, third val = starting pos
      sliderLabelLeft = p.createSpan('Dry');
      sliderLabelRight = p.createSpan('Wet');

      // Style text labels
      [sliderLabelLeft, sliderLabelRight].forEach(label => {
        label.style('color', 'black');
        label.style('font-size', '14px');
        label.style('font-family', 'Arial');
      });

      // Style the slider
      slider.style('width', '200px');
      slider.style('accent-color', 'black');
      slider.style('background', 'black');
    }

    positionSlider();

    // Generate mist particles
    for (let i = 0; i < 300; i++) {
      mistParticles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(1, 5),
        opacity: 0,
        xSpeed: p.random(-0.5, 0.5),
        ySpeed: p.random(-0.5, 0.5)
      });
    }

    // Generate raindrops
    for (let i = 0; i < 100; i++) {
      raindrops.push({
        x: p.random(p.width),
        y: p.random(-500, -10),
        length: p.random(10, 50),
        speed: p.random(5, 20),
        opacity: 0
      });
    }
  };

  p.draw = () => {
    p.background(255);
    let scaleValue = slider.value();

    if (scaleValue < 50) {
      let mistOpacity = p.map(scaleValue, 0, 50, 0, 150);
      let mistSize = p.map(scaleValue, 0, 50, 1, 5);
      drawMist(mistOpacity, mistSize);
    }

    if (scaleValue >= 50 && scaleValue < 75) {
      let mistOpacity = p.map(scaleValue, 50, 75, 150, 0);
      let mistSize = p.map(scaleValue, 50, 75, 5, 1);
      drawMist(mistOpacity, mistSize);

      let t = p.map(scaleValue, 50, 75, 0, 1);
      let easedOpacity = easeInOut(t);
      let rainOpacity = p.lerp(50, 255, easedOpacity);
      let rainSpeed = p.map(scaleValue, 50, 75, 5, 20);
      drawRain(rainOpacity, rainSpeed, 50);
    }

    if (scaleValue >= 75) {
      let t = p.map(scaleValue, 75, 100, 0, 1);
      let easedOpacity = easeInOut(t);
      let rainOpacity = p.lerp(255, 255, easedOpacity);
      let rainSpeed = p.map(scaleValue, 75, 100, 20, 50);
      let rainLength = p.map(scaleValue, 75, 100, 75, 150);
      drawRain(rainOpacity, rainSpeed, rainLength);
    }
  };

  p.windowResized = () => {
    // Resize the canvas
    let canvasSize = p.windowWidth * 0.29;
    p.resizeCanvas(canvasSize, canvasSize);
    
    // Reposition the existing slider when the window is resized
    positionSlider();
  };

  const drawMist = (mistOpacity, mistSize) => {
    for (let mp of mistParticles) {
      mp.opacity = mistOpacity;
      mp.size = mistSize;

      mp.x += mp.xSpeed;
      mp.y += mp.ySpeed;

      if (mp.x < 0 || mp.x > p.width) mp.xSpeed *= -1;
      if (mp.y < 0 || mp.y > p.height) mp.ySpeed *= -1;

      p.fill(156, 156, 156, mp.opacity);
      p.noStroke();
      p.ellipse(mp.x, mp.y, mp.size);
    }
  };

  const drawRain = (rainOpacity, rainSpeed, rainLength) => {
    for (let r of raindrops) {
      r.opacity = rainOpacity;
      r.speed = rainSpeed;
      r.length = rainLength;

      r.y += r.speed;
      if (r.y > p.height) {
        r.y = p.random(-500, -10);
        r.x = p.random(p.width);
      }

      p.stroke(156, 156, 156, r.opacity);
      p.line(r.x, r.y, r.x, r.y + r.length);
    }
  };

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const positionSlider = () => {
    let bounds = canvas.elt.getBoundingClientRect();
    let yPos = window.scrollY + bounds.top + p.height * 0.05;
    let sliderWidth = 200;
    let centerX = window.scrollX + bounds.left + p.width / 2;

    slider.position(centerX - sliderWidth / 2, yPos);
    sliderLabelLeft.position(centerX - sliderWidth / 2 - 50, yPos + 5);
    sliderLabelRight.position(centerX + sliderWidth / 2 + 10, yPos + 5);
  };
};

new p5(drywet);
