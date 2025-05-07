let nightday = (p) => {
  let slider;
  let sliderLabelLeft, sliderLabelRight;
  let canvas;

  const positionSlider = () => {
    // Ensure the canvas has been fully loaded and its dimensions are correct
    let bounds = canvas.elt.getBoundingClientRect();
    let yPos = window.scrollY + bounds.top + p.height * 0.05;
    let sliderWidth = 200;
    let centerX = window.scrollX + bounds.left + p.width / 2;

    // Position the slider and labels inside the canvas area
    slider.position(centerX - sliderWidth / 2, yPos);
    sliderLabelLeft.position(centerX - sliderWidth / 2 - 50, yPos + 5);
    sliderLabelRight.position(centerX + sliderWidth / 2 + 10, yPos + 5);
  };

  p.setup = () => {
    let canvasSize = p.windowWidth * 0.29;
    // Create canvas and attach it to the 'daynight' div
    canvas = p.createCanvas(canvasSize, canvasSize).parent('lightdark');
    canvas.style('border', '0.2px solid black'); // Add border here

    // Create the slider and labels only once (not on resize)
    if (!slider) {
      slider = p.createSlider(0, 1, 0, 0.01);//first val = min, second val = max, third val = starting pos
      sliderLabelLeft = p.createSpan('Light');
      sliderLabelRight = p.createSpan('Dark');

      // Style slider and labels
      slider.style('width', '200px');
      slider.style('accent-color', 'black');
      slider.style('background', 'black');

      [sliderLabelLeft, sliderLabelRight].forEach(label => {
        label.style('color', 'black');
        label.style('font-size', '14px');
        label.style('font-family', 'Arial');
      });
    }

    // Position the slider immediately after the canvas has been created
    positionSlider();
  };

  p.draw = () => {
    let sliderVal = slider.value();
    let bgColor = p.lerp(255, 60, sliderVal);
    p.background(bgColor);
  };

  p.windowResized = () => {
    // Resize the canvas
    let canvasSize = p.windowWidth * 0.29;
    p.resizeCanvas(canvasSize, canvasSize);

    // Reposition the existing slider when the window is resized
    positionSlider();
  };
};

new p5(nightday);
