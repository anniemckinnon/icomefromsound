let hotcold = (p) => {
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
      canvas = p.createCanvas(canvasSize, canvasSize).parent('hotcold');
      canvas.style('border', '0.2px solid black'); // Add border here
  
      if (!slider) {
        slider = p.createSlider(0, 1, 0.5, 0.01);//first val = min, second val = max, third val = starting pos
        sliderLabelLeft = p.createSpan('Hot');
        sliderLabelRight = p.createSpan('Cold');
  
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
        let fromColor, toColor, t;
      
        if (sliderVal < 0.5) {
          fromColor = p.color(255, 204, 122);    // Red
          toColor = p.color(255, 255, 255);  // white
          t = sliderVal * 2; // Map 0–0.5 to 0–1
        } else {
          fromColor = p.color(255, 255, 255); // white
          toColor = p.color(200, 221, 230);       // Blue
          t = (sliderVal - 0.5) * 2; // Map 0.5–1 to 0–1
        }
      
        let bgColor = p.lerpColor(fromColor, toColor, t);
        p.background(bgColor);
      };
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(hotcold);
  