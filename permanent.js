let permanent = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let canvas;
  
    const positionSlider = () => {
      let bounds = canvas.elt.getBoundingClientRect();
      let yPos = window.scrollY + bounds.top + p.height * 0.05;
      let sliderWidth = 200;
      let centerX = window.scrollX + bounds.left + p.width / 2;
  
      slider.position(centerX - sliderWidth / 2, yPos);
      sliderLabelLeft.position(centerX - sliderWidth / 2 - 70, yPos + 5);
      sliderLabelRight.position(centerX + sliderWidth / 2 + 10, yPos + 5);
    };
  
    p.setup = () => {
      let canvasSize = p.windowWidth * 0.29;
      canvas = p.createCanvas(canvasSize, canvasSize).parent('permanent');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0, 0.01);
        sliderLabelLeft = p.createSpan('Temporary');
        sliderLabelRight = p.createSpan('Permanent');
  
        slider.style('width', '200px');
        slider.style('accent-color', 'black');
        slider.style('background', 'black');
  
        [sliderLabelLeft, sliderLabelRight].forEach(label => {
          label.style('color', 'black');
          label.style('font-size', '14px');
          label.style('font-family', 'Arial');
        });
      }
  
      setTimeout(positionSlider, 100); // Optional delay for better placement
    };
  
    p.draw = () => {
      let sliderVal = slider.value();
      p.background(255); // White background
  
      let centerY = p.height / 2;
      let squareSize = p.height * 0.1;
  
      // Just above or below center line (small offset)
      let offset = squareSize * 0.8;
      let squareY = p.lerp(centerY - offset, centerY + offset, sliderVal);
      let fillAlpha = p.map(sliderVal, 0, 1, 0, 255); // smoothly transition to solid
  
      // Draw center line
      p.stroke(0);
      p.noFill();
      p.strokeWeight(2);
      p.line(p.width * 0.2, centerY, p.width * 0.8, centerY);
  
      // Draw transitioning square
      p.rectMode(p.CENTER);
      p.stroke(0);
      if (sliderVal < 0.01) {
        p.noFill();
      } else {
        p.fill(0, fillAlpha);
      }
      p.rect(p.width / 2, squareY, squareSize, squareSize);
    };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(permanent);
  