function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
blendMode(BLEND);
  background(225);
  blendMode(MULTIPLY);

  let c1 = color("red");
  let c2 = color("blue");

  fill(c1);
  rect(windowWidth - 50, height / 2, 50, 50);
  fill(c2);
  for (let i = 0; i < windowWidth; i += 500) {
    c1.setAlpha(35);
    ellipse(windowWidth / 2, height / 2, i);
    fill(c1);
    
    //let rate =map(i, 0, windowWidth, 0, 1);
   // let midColor = lerpColor(c1, c2, rate);
   // fill(midColor);
  // rect(i, 0, 50, windowHeight);
   noStroke(); 

  }
    for (let i = 0; i < windowWidth; i += 100) {
    c2.setAlpha(35);
    ellipse(windowWidth - 50 / 2, height / 2, i);
    fill(c2);
   noStroke();}
   
}