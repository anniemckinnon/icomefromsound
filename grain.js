let grain = (p) => {
    let slider;
    let sliderLabelLeft, sliderLabelRight;
    let canvas;
    let dots = []; // Array to store the dot positions
  
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
      canvas = p.createCanvas(canvasSize, canvasSize).parent('grain');
      canvas.style('border', '0.2px solid black');
  
      slider = p.createSlider(0, 1, 0, 0.01);
      sliderLabelLeft = p.createSpan('Granular');
      sliderLabelRight = p.createSpan('Solid');
  
      slider.style('width', '200px');
      slider.style('accent-color', 'black');
      slider.style('background', 'black');
  
      [sliderLabelLeft, sliderLabelRight].forEach(label => {
        label.style('color', 'black');
        label.style('font-size', '14px');
        label.style('font-family', 'Arial');
      });
  
      // Store the dots in an array only once
      for (let i = 0; i < 100; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        dots.push({ x: x, y: y });
      }
  
      positionSlider();
    };
  
    p.draw = () => {
      p.background(255); // white canvas
  
      let val = slider.value();
      let maxSize = 120; // maximum size for the hexagons
      let minSize = 1;  // minimum size for the hexagons
      let hexSize = p.lerp(minSize, maxSize, val); // lerp between minSize and maxSize based on the slider value
  
      p.noStroke();
      p.fill(128, 96, 87);
  
      // Draw the hexagons, scaling their size based on slider value
      for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        drawHexagon(dot.x, dot.y, hexSize); // Draw the hexagon at the dot position
      }
    };
  
    // Function to draw a hexagon
    function drawHexagon(x, y, size) {
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = p.TWO_PI / 6 * i;
        let xOffset = p.cos(angle) * size;
        let yOffset = p.sin(angle) * size;
        p.vertex(x + xOffset, y + yOffset);
      }
      p.endShape(p.CLOSE);
    }
  
    p.windowResized = () => {
      let canvasSize = p.windowWidth * 0.29;
      p.resizeCanvas(canvasSize, canvasSize);
      positionSlider();
    };
  };
  
  new p5(grain);
  