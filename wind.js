let wind = (p) => {
  let slider;
  let sliderLabelLeft, sliderLabelRight;
  let airStreaks = [];
  let canvas;

  p.setup = () => {
    let canvasSize = p.windowWidth * 0.29;
    canvas = p.createCanvas(canvasSize, canvasSize).parent('wind');
    canvas.style('border', '0.2px solid black');

    if (!slider) {
      slider = p.createSlider(0, 100, 0);
      sliderLabelLeft = p.createSpan('Calm');
      sliderLabelRight = p.createSpan('Turbulent');

      [sliderLabelLeft, sliderLabelRight].forEach(label => {
        label.style('color', 'black');
        label.style('font-size', '14px');
        label.style('font-family', 'Arial');
      });

      slider.style('width', '200px');
      slider.style('accent-color', 'black');
      slider.style('background', 'black');
    }

    positionSlider();

    for (let i = 0; i < 200; i++) {
      airStreaks.push({
        x: p.random(p.width),
        y: p.random(p.height),
        opacity: p.random(20, 70),
        noiseSeedX: p.random(1000),
        noiseSeedY: p.random(1000),
        velocityFactor: p.random(0.8, 1.5),
        jitterSeed: p.random(1000),
        gustSeed: p.random(1000)
      });
    }
  };

  p.draw = () => {
     p.background(255,255,255); // light blue
    let turbulence = slider.value();

    if (turbulence > 5) {
      drawAir(turbulence);
    }
  };

  const drawAir = (turbulence) => {
    let tNorm = p.map(turbulence, 0, 100, 0, 2);

    for (let a of airStreaks) {
      let noiseScale = p.lerp(0.001, 0.04, tNorm);
      let noiseStrength = p.lerp(1, 12, tNorm);
      let jitterStrength = p.lerp(0, 2, tNorm);

      // Base angle from noise
      let angleNoise = (p.noise(a.x * noiseScale + a.noiseSeedX, a.y * noiseScale + a.noiseSeedY) - 0.5) * p.TWO_PI;

      // Wind direction bias
      let biasAngle = p.radians(p.lerp(0, 30, tNorm));

      // Small continuous turbulence
      let gust = (p.noise(a.jitterSeed + p.frameCount * 0.01) - 0.5) * jitterStrength;

      // ⚡ Sudden directional gusts at high turbulence
      let maxGustOffset = p.lerp(0, p.PI, tNorm * tNorm); // nonlinear increase
      let gustAngleOffset = p.map(p.noise(a.gustSeed + p.frameCount * 0.02), 0, 1, -maxGustOffset, maxGustOffset);

      let combinedAngle = angleNoise + gust + gustAngleOffset;

      // Blend toward dominant wind direction
      let angle = p.lerpAngle(combinedAngle, biasAngle, p.lerp(0.2, 0.9, tNorm));

      let speed = noiseStrength * a.velocityFactor;
      a.x += p.cos(angle) * speed;
      a.y += p.sin(angle) * speed;

      // Wrap edges
      if (a.x < 0) a.x = p.width;
      if (a.x > p.width) a.x = 0;
      if (a.y < 0) a.y = p.height;
      if (a.y > p.height) a.y = 0;

      let tailLength = p.lerp(10, 35, tNorm);
      let trailX = a.x - p.cos(angle) * tailLength;
      let trailY = a.y - p.sin(angle) * tailLength;

      p.stroke(196, 59, 51, a.opacity);
      p.strokeWeight(1);
      p.line(a.x, a.y, trailX, trailY);
    }
  };

  p.lerpAngle = (a1, a2, t) => {
    let diff = p.angleDifference(a1, a2);
    return a1 + diff * t;
  };

  p.angleDifference = (a1, a2) => {
    let diff = (a2 - a1 + p.PI) % p.TWO_PI - p.PI;
    return diff < -p.PI ? diff + p.TWO_PI : diff;
  };

  p.windowResized = () => {
    let canvasSize = p.windowWidth * 0.29;
    p.resizeCanvas(canvasSize, canvasSize);
    positionSlider();
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

new p5(wind);
