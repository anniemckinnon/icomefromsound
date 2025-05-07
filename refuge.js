let refuge = (p) => {
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
    canvas = p.createCanvas(canvasSize, canvasSize).parent('refuge');
    canvas.style('border', '0.2px solid black');

    if (!slider) {
      slider = p.createSlider(0, 1, 0.5, 0.01);
      sliderLabelLeft = p.createSpan('Prospect');
      sliderLabelRight = p.createSpan('Refuge');

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
    p.background(255);

    let centerX = p.width / 2;
    let centerY = p.height / 2;

    // Draw center dot
    p.noStroke();
    p.fill(0, 0, 0);
    p.circle(centerX, centerY, 10);

    // Draw arc circle growing clockwise
    if (sliderVal > 0) {
      let radius = 60;
      let segments = 200; // smoothness of arc
      let endAngle = p.TWO_PI * sliderVal;

      p.stroke(0);
      p.strokeWeight(3);
      p.noFill();

      p.beginShape();
      for (let angle = 0; angle <= endAngle; angle += p.TWO_PI / segments) {
        let x = centerX + radius * p.cos(angle);
        let y = centerY + radius * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape();
    }
  };

  p.windowResized = () => {
    let canvasSize = p.windowWidth * 0.29;
    p.resizeCanvas(canvasSize, canvasSize);
    positionSlider();
  };
};

new p5(refuge);
