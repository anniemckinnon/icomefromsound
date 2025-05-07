let cloud = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let clouds = [];
    let canvas;
  
    p.setup = () => {
      let canvasSize = p.windowWidth * 0.29;
      canvas = p.createCanvas(canvasSize, canvasSize).parent('cloud');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 100, 0);
        sliderLabelLeft = p.createSpan('Clear');
        sliderLabelRight = p.createSpan('Cloudy');
  
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
  
      // Initial cloud generation
      for (let i = 0; i < 3; i++) {
        let cloud = {
          x: p.random(-p.width, p.width),  // Start offscreen to the left
          y: p.random(p.height / 2, p.height),
          size: p.random(50, 150),
          opacity: p.random(20, 70),
          speed: p.random(0.1, 0.2) // Slower speed for clear sky
        };
        clouds.push(cloud);
      }
    };
  
    p.draw = () => {
      let cloudinessLevel = slider.value();
  
      // Sky color transition from clear blue to stormy gray
      let skyColor = p.lerpColor(p.color(135, 206, 235), p.color(50, 50, 50), cloudinessLevel / 100);
      p.background(skyColor);
  
      // Add more clouds as the sky becomes stormier (no clouds if cloudinessLevel is 0)
      if (cloudinessLevel > 0 && clouds.length < 20) {
        for (let i = 0; i < 2; i++) {  // Add a few more clouds as it gets cloudier
          let cloud = {
            x: -p.random(150, 300),  // Start offscreen to the left
            y: p.random(p.height / 2, p.height),
            size: p.random(50, 150),
            opacity: p.random(20, 70),
            speed: p.random(0.1, 0.2) + cloudinessLevel * 0.002 // Slower speed with slight increase
          };
          clouds.push(cloud);
        }
      }
  
      // If the sky is clear (slider at 0), clear the clouds
      if (cloudinessLevel === 0) {
        clouds = [];
      }
  
      // Update the position and draw each cloud
      for (let i = 0; i < clouds.length; i++) {
        let cloud = clouds[i];
  
        // Move the cloud to the right more slowly based on the slider
        cloud.x += cloud.speed + cloudinessLevel * 0.01;  // Slow cloud movement
  
        // If the cloud moves off the right edge of the canvas, remove it and spawn a new one
        if (cloud.x - cloud.size > p.width) {
          clouds.splice(i, 1);
          clouds.push({
            x: -cloud.size, // Start offscreen to the left
            y: p.random(p.height / 2, p.height),
            size: p.random(50, 150),
            opacity: p.random(20, 70),
            speed: p.random(0.1, 0.2) + cloudinessLevel * 0.002 // Slower speed
          });
        }
  
        drawCloud(cloud, cloudinessLevel);
      }
    };
  
    const drawCloud = (cloud, cloudinessLevel) => {
      // Cloud color becomes more grey as cloudiness increases
      let cloudColor = p.lerpColor(p.color(255, 255, 255), p.color(100, 100, 100), cloudinessLevel / 100);
      let opacity = p.map(cloudinessLevel, 0, 100, 50, 200); // Adjust opacity based on cloudiness slider
  
      p.noStroke();
      p.fill(cloudColor.levels[0], cloudColor.levels[1], cloudColor.levels[2], opacity);
  
      // Clouds become denser and larger as cloudiness increases
      let cloudDensity = p.map(cloudinessLevel, 0, 100, 3, 8);  // More cloud layers as it storms
      let cloudSize = p.map(cloudinessLevel, 0, 100, cloud.size, cloud.size * 2);  // Increase size with storm
  
      // Draw the cloud with increased size and density
      for (let i = 0; i < cloudDensity; i++) {
        p.ellipse(cloud.x, cloud.y, cloudSize, cloudSize * 0.6);
      }
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
  
  new p5(cloud);
  