let smooth = (p) => {
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
    canvas = p.createCanvas(canvasSize, canvasSize).parent('smooth');
    canvas.style('border', '0.2px solid black');

    if (!slider) {
      slider = p.createSlider(0, 1, 0, 0.01);
      sliderLabelLeft = p.createSpan('Smooth');
      sliderLabelRight = p.createSpan('Edges');

      slider.style('width', '200px');
      slider.style('accent-color', 'black');
      slider.style('background', 'black');

      [sliderLabelLeft, sliderLabelRight].forEach(label => {
        label.style('color', 'black');
        label.style('font-size', '14px');
        label.style('font-family', 'Arial');
      });
    }

    // Delay slider positioning slightly
    setTimeout(positionSlider, 100);
  };

  p.draw = () => {
    let sliderVal = slider.value();
    p.background(255); // white background
    drawMorphingWave(sliderVal);
  };

  function drawMorphingWave(val) {
    let amplitude = p.height * 0.2;
    let centerY = p.height / 2;
    let startX = p.width * 0.1;
    let endX = p.width * 0.9;
    let steps = 500;
    let range = endX - startX;
    let frequency = 2;

    p.noFill();
    p.stroke(0);
    p.strokeWeight(3);
    p.beginShape();

    for (let i = 0; i <= steps; i++) {
      let t = i / steps;
      let x = startX + t * range;
      let phase = t * frequency;

      let sineY = p.sin(phase * p.TWO_PI) * amplitude;
      let triY = 2 * Math.abs(2 * (phase - Math.floor(phase + 0.5))) - 1;
      triY *= -amplitude;
      let squareY = (p.sin(phase * p.TWO_PI) > 0 ? 1 : -1) * amplitude;

      let yOffset = 0;

      if (val < 0.33) {
        let amt = p.map(val, 0.0, 0.33, 0, 1);
        yOffset = p.lerp(0, sineY, amt);
      } else if (val < 0.66) {
        let amt = p.map(val, 0.33, 0.66, 0, 1);
        yOffset = p.lerp(sineY, triY, amt);
      } else {
        let amt = p.map(val, 0.66, 1.0, 0, 1);
        yOffset = p.lerp(triY, squareY, amt);
      }

      p.vertex(x, centerY + yOffset);
    }

    p.endShape();
  }

  p.windowResized = () => {
    let canvasSize = p.windowWidth * 0.29;
    p.resizeCanvas(canvasSize, canvasSize);
    positionSlider();
  };
};

new p5(smooth);
