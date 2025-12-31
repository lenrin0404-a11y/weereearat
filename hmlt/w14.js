let z = [];
let x = [];
let y = [];
let c = [];
let dep = 50;

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < dep; i = i + 1) {
    x[i] = random(-width / 2, width / 2);
    y[i] = random(-height / 2, height / 2);

    z[i] = random(-1000, 1000);
    c[i] = color(random(200), 0, 100);
  }    
}
function draw () {
background(205);
lights();
  ambientLight(120, 10, 10);

  orbitControl();

  for (let i = 0; i < dep; i = i + 1) {
    z[i] = z[i] + 30;
    if (z[i] > 1000) {
      z[i] = -1000;
    }

    push();
    translate(x[i], y[i], z[i]);
    fill(c[i]);
    box(60);
    pop();
  }        

}