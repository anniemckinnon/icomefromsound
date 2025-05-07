let private = (p) => {
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
      canvas = p.createCanvas(canvasSize, canvasSize).parent('private');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0, 0.01);
        sliderLabelLeft = p.createSpan('Public');
        sliderLabelRight = p.createSpan('Private');
  
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
  
      // Draw center dot
      p.noStroke();
      p.fill(255, 0, 0);
      p.circle(centerX, centerY, 12);
  
      // Draw square around dot with responsive dashed line
      if (sliderVal > 0) {
        let boxSize = 80;
        let halfSize = boxSize / 2;
        let left = centerX - halfSize;
        let right = centerX + halfSize;
        let top = centerY - halfSize;
        let bottom = centerY + halfSize;
  
        let maxGap = 40;
        let minGap = 2;
        let gap = p.lerp(maxGap, minGap, sliderVal);
        let dashLength = 10;
  
        p.stroke(0);
        p.strokeWeight(3);
        p.noFill();
  
        // Draw dashed square: 4 sides with dash logic
        // Top edge
        for (let x = left; x < right; x += dashLength + gap) {
          p.line(x, top, x + dashLength, top);
        }
  
        // Right edge
        for (let y = top; y < bottom; y += dashLength + gap) {
          p.line(right, y, right, y + dashLength);
        }
  
        // Bottom edge
        for (let x = right; x > left; x -= dashLength + gap) {
          p.line(x, bottom, x - dashLength, bottom);
        }
  
        // Left edge
        for (let y = bottom; y > top; y -= dashLength + gap) {
          p.line(left, y, left, y - dashLength);
        }
      }
    };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(private);
  