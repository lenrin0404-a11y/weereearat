let xp = 50;
let yp = 50;

let xs = 4;
let ys = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}
function draw() {
  background(0);
  ellipse(xp, yp, 50);
  //初始位置
  fill(255, 20, 25);
  xp += xs;
  yp += ys;

  ys += 0.1;

  if (yp > height) {
    ys = -ys * 0.5;
    yp = windowHeight;
  }

  if (xp >= windowWidth / 1.2) {
    xp = windowWidth / 1.2;
  }

  console.log(floor(yp));
}
