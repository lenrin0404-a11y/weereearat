function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}
function draw() {
}
function mousePressed() {  
  let count = random(10, 20);
  let r = random(5, 10);
      for (let i = 0; i < 10; i++) {
        fill(random(100, 255), random(100, 255), random(100, 255));
        ellipse(mouseX + random(-100, 100), mouseY + random(-100, 100), r);
        r = r * 0.9;
      }
}