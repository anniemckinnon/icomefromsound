let undercover = (p) => {
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
      canvas = p.createCanvas(canvasSize, canvasSize).parent('undercover');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0, 0.01);
        sliderLabelLeft = p.createSpan('Open');
        sliderLabelRight = p.createSpan('Undercover');
  
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
      p.background(255); // white background
  
      let centerX = p.width / 2;
      let centerY = p.height / 2;
  
      // Draw main center line
      p.stroke(0);
      p.strokeWeight(4);
      p.line(p.width * 0.2, centerY, p.width * 0.8, centerY);
  
      // Draw center dot
      p.noStroke();
      p.fill(255, 0, 0);
      p.circle(centerX, centerY, 12);
  
      // Draw responsive upper line
      if (sliderVal > 0) {
        let upperY = centerY - 50;
        let startX = p.width * 0.2;
        let endX = p.width * 0.8;
        let totalLength = endX - startX;
  
        p.stroke(0);
        p.strokeWeight(4);
  
        let maxGap = 40;
        let minGap = 2;
        let gap = p.lerp(maxGap, minGap, sliderVal);
        let dashLength = 10;
  
        for (let x = startX; x < endX; x += dashLength + gap) {
          p.line(x, upperY, x + dashLength, upperY);
        }
      }
    };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(undercover);
  