let pages = [];
let currentPage = 0;
const totalPages = 13;
let arrowSize = 20;
let isHovering = false;
let canvas;

function preload() {
  for (let i = 1; i <= totalPages; i++) {
    let img = loadImage(`https://anniemckinnon.github.io/icomefromsound/images/method${i}.png`);
    pages.push(img);
  }
}

function setup() {
  let canvasSize = 0.8 * windowHeight;
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('method');
  imageMode(CENTER);
}

function draw() {
  background(255);

  // Draw current page image
  if (pages[currentPage]) {
    let img = pages[currentPage];
    let aspect = img.width / img.height;
    let targetWidth = width * 0.8;
    let targetHeight = targetWidth / aspect;

    if (targetHeight > height * 0.9) {
      targetHeight = height * 0.9;
      targetWidth = targetHeight * aspect;
    }

    image(img, width / 2, height / 2, targetWidth, targetHeight);
  }

  // Draw navigation arrows if hovering
  if (isHovering) {
    drawArrows();
  }
}

function drawArrows() {
  stroke(50);
  strokeWeight(3);
  noFill();

  let centerY = height / 2;

  // Left arrow
  if (currentPage > 0) {
    beginShape();
    vertex(50 + arrowSize, centerY - arrowSize);
    vertex(50, centerY);
    vertex(50 + arrowSize, centerY + arrowSize);
    endShape();
  }

  // Right arrow
  if (currentPage < totalPages - 1) {
    beginShape();
    vertex(width - 50 - arrowSize, centerY - arrowSize);
    vertex(width - 50, centerY);
    vertex(width - 50 - arrowSize, centerY + arrowSize);
    endShape();
  }
}

function mousePressed() {
  if (!isHovering) return;

  let centerY = height / 2;

  // Left arrow area
  if (
    currentPage > 0 &&
    mouseX >= 30 && mouseX <= 70 &&
    mouseY >= centerY - 30 && mouseY <= centerY + 30
  ) {
    currentPage = max(0, currentPage - 1);
  }

  // Right arrow area
  if (
    currentPage < totalPages - 1 &&
    mouseX >= width - 70 && mouseX <= width - 30 &&
    mouseY >= centerY - 30 && mouseY <= centerY + 30
  ) {
    currentPage = min(currentPage + 1, totalPages - 1);
  }
}

function mouseMoved() {
  isHovering = true;
}

function mouseOut() {
  isHovering = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
