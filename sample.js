/*
By Okazz
*/
let colors = [
  "#e6302b",
  "#fbd400",
  "#3a7bde",
  "#ffffff",
  "#7fc8f8",
  "#ffe45e",
  "#ff6392",
];
let ctx;
let motions = [];
let motionClasses = [];
let sceneTimer = 0;
let resetTime = 60 * 8;
let fadeOutTime = 30;
let bgclr;
let pg;
let font;

function preload() {
  font = "Mochiy Pop One";
}

function setup() {
  createCanvas(700, 700);
  rectMode(CENTER);
  ctx = drawingContext;
  bgclr = color("#000000");

  pg = createGraphics(width, height);
  pg.rectMode(CENTER);
  pg.background(255);
  pg.fill(0);
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.textSize(280);
  pg.textFont(font);
  pg.text("申確", width / 2, height / 2 - 150);
  pg.text("告定", width / 2, height / 2 + 150);

  INIT();
  background(bgclr);
}

function draw() {
  background(bgclr);
  for (let m of motions) {
    m.run();
  }

  let alph = 0;
  if (resetTime - fadeOutTime < sceneTimer && sceneTimer <= resetTime) {
    alph = map(sceneTimer, resetTime - fadeOutTime, resetTime, 0, 255);
    bgclr.setAlpha(alph);
    background(bgclr);
  }

  if (frameCount % resetTime == 0) {
    INIT();
  }

  sceneTimer++;
}

function INIT() {
  sceneTimer = 0;
  motions = [];
  motionClasses = [
    Motion01,
    Motion02,
    Motion03,
    Motion04,
    Motion05,
    Motion06,
    Motion07,
    Motion08,
  ];
  let drawingRegion = width;
  let cellCount = 50;
  let cellSize = drawingRegion / cellCount;
  for (let i = 0; i < cellCount; i++) {
    for (let j = 0; j < cellCount; j++) {
      let x = cellSize * j + cellSize / 2 + (width - drawingRegion) / 2;
      let y = cellSize * i + cellSize / 2 + (height - drawingRegion) / 2;
      let MotionClass = random(motionClasses);
      let t = -int(dist(x, y, width, 0) * 0.1) - int(random(10));
      let clr = pg.get(x, y);
      if (brightness(clr) < 10) {
        motions.push(new MotionClass(x, y, cellSize, t, "#ff0000"));
      }
    }
  }
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function drawHeart(x, y, w) {
  push();
  translate(x, y);
  beginShape();
  for (let a = PI; a < TAU + PI * 0.25; a += TAU / 180) {
    vertex(w / 4 + (w / 4) * cos(a), -(w / 8) + (w / 4) * sin(a));
  }
  vertex(0, w / 2);
  for (let a = PI - PI * 0.25; a < TAU; a += TAU / 180) {
    vertex(-(w / 4) + (w / 4) * cos(a), -(w / 8) + (w / 4) * sin(a));
  }
  endShape();
  pop();
}

class Agent {
  constructor(x, y, w, t, clr) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.t1 = int(random(50, 100));
    this.t2 = this.t1 + int(60);
    this.t3 = this.t2 + int(random(50, 100));
    this.t = t;
    this.clr2 = color(clr);
    this.clr1 = color(random(colors));
    this.currentColor = this.clr1;
  }

  show() {}

  move() {
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.updateMotion1(easeInOutQuint(n));
    } else if (this.t2 < this.t && this.t < this.t3) {
      let n = norm(this.t, this.t2, this.t3 - 1);
      this.updateMotion2(easeInOutQuint(n));
    }
    this.t++;
  }

  run() {
    this.show();
    this.move();
  }

  updateMotion1(n) {}
  updateMotion2(n) {}
}

class Motion01 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 3;
    this.ang = int(random(4)) * (TAU / 4);
    this.size = 0;
  }

  show() {
    noStroke();
    fill(this.currentColor);
    square(
      this.x + this.shift * cos(this.ang),
      this.y + this.shift * sin(this.ang),
      this.size
    );
  }

  updateMotion1(n) {
    this.shift = lerp(this.w * 3, 0, n);
    this.size = lerp(0, this.w, n);
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
  }
}

class Motion02 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = 0;
    this.ang = int(random(4)) * (TAU / 4);
    this.size = 0;
    this.corner = this.w / 2;
  }

  show() {
    noStroke();
    fill(this.currentColor);
    square(
      this.x + this.shift * cos(this.ang),
      this.y + this.shift * sin(this.ang),
      this.size,
      this.corner
    );
  }

  updateMotion1(n) {
    this.shift = lerp(0, this.w * 4, n);
    this.size = lerp(0, this.w / 2, n);
  }

  updateMotion2(n) {
    this.size = lerp(this.w / 2, this.w, n);
    this.shift = lerp(this.w * 4, 0, n);
    this.corner = lerp(this.w / 2, 0, n);
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
  }
}

class Motion03 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 2;
    this.ang = 0;
    this.size = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    noStroke();
    fill(this.currentColor);
    square(0, 0, this.size);
    pop();
  }

  updateMotion1(n) {
    this.ang = lerp(0, TAU, n);
    this.size = lerp(0, this.w, n);
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
  }
}

class Motion04 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 2;
    this.ang = int(random(4)) * (TAU / 4);
    this.rot = PI;
    this.side = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    translate(-this.w / 2, -this.w / 2);
    rotate(this.rot);
    fill(this.currentColor);
    rect(this.w / 2, this.w / 2 - (this.w - this.side) / 2, this.w, this.side);
    pop();
  }

  updateMotion1(n) {
    this.side = lerp(0, this.w, n);
  }

  updateMotion2(n) {
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
    this.rot = lerp(PI, 0, n);
  }
}

class Motion05 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 2;
    this.size = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 4; i++) {
      fill(this.currentColor);
      square(this.w / 4 + this.shift, this.w / 4 + this.shift, this.size);
      rotate(TAU / 4);
    }
    pop();
  }

  updateMotion1(n) {
    this.size = lerp(0, this.w / 4, n);
  }

  updateMotion2(n) {
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
    this.shift = lerp(this.w * 2, 0, n);
    this.size = lerp(this.w / 4, this.w / 2 + width * 0.0004, n);
  }
}

class Motion06 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.size = 0;
    this.ang = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    fill(this.currentColor);

    beginShape();
    for (let i = 0; i < 10; i++) {
      let a = map(i, 0, 10, 0, TAU) - PI / 2;
      let r = this.size;
      if (i % 2 == 0) {
        r = this.size / 2;
      }
      vertex(r * cos(a), r * sin(a));
    }
    endShape();
    if (this.t > this.t2) {
      square(0, 0, this.w - this.size);
    }
    pop();
  }

  updateMotion1(n) {
    this.size = lerp(0, this.w / 2, n);
    this.ang = lerp(0, PI, n);
  }

  updateMotion2(n) {
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
    this.ang = lerp(PI, 0, n);
    this.size = lerp(this.w / 2, 0, n);
  }
}

class Motion07 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 3;
    this.ang = int(random(4)) * (TAU / 4);
    this.size = 0;
  }

  show() {
    noStroke();
    fill(this.currentColor);
    drawHeart(
      this.x + this.shift * cos(this.ang),
      this.y + this.shift * sin(this.ang),
      this.size
    );
    if (this.t > this.t2) {
      square(this.x, this.y, this.w - this.size);
    }
  }

  updateMotion1(n) {
    this.shift = lerp(0, this.w * 3, n);
    this.size = lerp(0, this.w, n);
  }

  updateMotion2(n) {
    this.shift = lerp(this.w * 3, 0, n);
    this.size = lerp(this.w, 0, n);
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
  }
}

class Motion08 extends Agent {
  constructor(x, y, w, t, clr) {
    super(x, y, w, t, clr);
    this.shift = this.w * 3;
    this.ang = int(random(4)) * (TAU / 4);
    this.size = 0;
    this.rad = this.w * 4;
    this.rot = 0;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    fill(this.currentColor);
    noStroke();
    rect(
      0 + this.rad * cos(this.rot),
      -this.rad + this.rad * sin(this.rot),
      this.size
    );
    pop();
  }

  updateMotion1(n) {
    this.size = lerp(0, this.w, n);
  }

  updateMotion2(n) {
    this.rot = lerp(0, PI / 2, n);
    this.currentColor = lerpColor(this.clr1, this.clr2, n);
  }
}
