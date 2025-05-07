let altitude = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let canvas;
  
    const positionSlider = () => {
      let bounds = canvas.elt.getBoundingClientRect();
      let yPos = window.scrollY + bounds.top + p.height * 0.05;
      let sliderWidth = 200;
      let centerX = window.scrollX + bounds.left + p.width / 2;
  
      slider.position(centerX - sliderWidth / 2, yPos);
      sliderLabelLeft.position(centerX - sliderWidth / 2 - 60, yPos + 5);
      sliderLabelRight.position(centerX + sliderWidth / 2 + 10, yPos + 5);
    };
  
    p.setup = () => {
      let canvasSize = p.windowWidth * 0.29;
      canvas = p.createCanvas(canvasSize, canvasSize).parent('altitude');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0.5, 0.01);
        sliderLabelLeft = p.createSpan('High Up');
        sliderLabelRight = p.createSpan('Deep Down');
  
        slider.style('width', '200px');
        slider.style('accent-color', 'black');
        slider.style('background', 'black');
  
        [sliderLabelLeft, sliderLabelRight].forEach(label => {
          label.style('color', 'black');
          label.style('font-size', '14px');
          label.style('font-family', 'Arial');
        });
      }
  
      positionSlider();
    };
  
    p.draw = () => {
      let sliderVal = slider.value();
      p.background(255); // Always white background
      drawHillValleyLine(sliderVal);
    };
  function drawHillValleyLine(sliderVal) {
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();
  
    let midY = p.height / 2;
    let amplitude = p.map(Math.abs(sliderVal - 0.5), 0, 0.5, 0, p.height * 0.3);
    let direction = sliderVal < 0.5 ? -1 : 1;
  
    let sharpness = p.map(Math.abs(sliderVal - 0.5), 0, 0.5, 1, 20);
  
    let startX = p.width * 0.3;
    let endX = p.width * 0.7;
  
    let centerX = (startX + endX) / 2; // Center of the wave horizontally
    let centerY = 0;
  
    p.beginShape();
    for (let x = startX; x <= endX; x++) {
      let t = p.map(x, startX, endX, 0, p.PI); // Half sine wave
      let base = Math.sin(t);
      let shaped = Math.sign(base) * Math.pow(Math.abs(base), sharpness); // Apply sharpness
      let yOffset = shaped * amplitude * direction;
      p.vertex(x, midY + yOffset);
  
      // If x is close to centerX, we store the y position to move the dot
      if (Math.abs(x - centerX) < 1) { 
        centerY = midY + yOffset; // Get the y offset for the center point
      }
    }
    p.endShape();
  
    // Draw the dot at the center of the wave
    p.fill(0, 0, 0); // Red color for the dot
    p.noStroke();
    p.circle(centerX, centerY, 8); // Draw the dot at the center
  }
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(altitude);
  