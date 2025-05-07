let slope = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let canvas;
  
    const positionSlider = () => {
      let bounds = canvas.elt.getBoundingClientRect();
      let yPos = window.scrollY + bounds.top + p.height * 0.05;
      let sliderWidth = 200;
      let centerX = window.scrollX + bounds.left + p.width / 2;
  
      slider.position(centerX - sliderWidth / 2, yPos);
      sliderLabelLeft.position(centerX - sliderWidth / 2 - 50, yPos + 5);
      sliderLabelRight.position(centerX + sliderWidth / 2 + 10, yPos + 5);
    };
  
    p.setup = () => {
      let canvasSize = p.windowWidth * 0.29;
      canvas = p.createCanvas(canvasSize, canvasSize).parent('slope');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0, 0.01);
        sliderLabelLeft = p.createSpan('Flat');
        sliderLabelRight = p.createSpan('Steep');
  
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
      p.background(255); // Keep the background white
  
      // Draw rotating line
      let angle = p.map(sliderVal, 0, 1, 0, p.HALF_PI); // Map slider to rotation angle (0 to 90 degrees)
      drawRotatingLine(angle);
    };
  
    // Function to draw rotating line
    function drawRotatingLine(angle) {
      p.push();
      p.translate(p.width / 2, p.height / 2); // Move the origin to the center of the canvas
  
      p.rotate(angle); // Apply rotation based on the slider value
  
      p.stroke(0);
      p.strokeWeight(4);
      p.line(-p.width * 0.3, 0, p.width * 0.3, 0); // Draw a line from left to right, rotated
  
      p.pop();
    }
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(slope);
  