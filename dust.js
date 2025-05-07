let dust = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let mistParticles = [];
    let canvas;
  
    p.setup = () => {
      let canvasSize = p.windowWidth * 0.29;
      canvas = p.createCanvas(canvasSize, canvasSize).parent('dust');;
      canvas.style('border', '0.2px solid black');
  
      // Create slider and labels only once
      if (!slider) {
        slider = p.createSlider(0, 100, 0);
        sliderLabelLeft = p.createSpan('Clean');
        sliderLabelRight = p.createSpan('Dusty');
  
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
  
      // Generate more smog particles with slower movement
      for (let i = 0; i < 600; i++) {
        mistParticles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(2, 6),
          opacity: 0,
          xSpeed: p.random(-0.2, 0.2),
          ySpeed: p.random(-0.2, 0.2)
        });
      }
    };
  
    p.draw = () => {
      p.background(255);
      let scaleValue = slider.value();
  
      // Mist opacity tops out at 100 for dusty transparency
      let mistOpacity = p.map(scaleValue, 0, 100, 0, 100);
      let mistSize = p.map(scaleValue, 0, 100, 2, 20);
      drawMist(mistOpacity, mistSize);
    };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
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
  
        p.fill(180, 160, 140, mp.opacity); // Warm dusty grey
        p.noStroke();
        p.ellipse(mp.x, mp.y, mp.size);
      }
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
  
  new p5(dust);
  