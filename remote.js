let remote = (p) => {
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
      canvas = p.createCanvas(canvasSize, canvasSize).parent('remote');
      canvas.style('border', '0.2px solid black');
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0, 0.01);
        sliderLabelLeft = p.createSpan('Connected');
        sliderLabelRight = p.createSpan('Remote');
  
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
      let val = slider.value();
      p.background(255);
  
      let dotSize = 5;
      let margin = dotSize / 2 + 10;
  
      let leftX = p.lerp(p.width / 2, margin, val);
      let rightX = p.lerp(p.width / 2, p.width - margin, val);
      let y = p.height / 2;
  
      p.noStroke();
      p.fill(0);
      p.ellipse(leftX, y, dotSize);
      p.ellipse(rightX, y, dotSize);
    };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(remote);
  