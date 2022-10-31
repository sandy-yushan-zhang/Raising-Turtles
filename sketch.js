let ocean;
let fish1L;
let fish1R;
let fish2L;
let fish2R;
let fish3L;
let fish3R;
let sharkL;
let sharkR;
let turtlePNG;

let raccoon;
let egg;
let raccoons = [];
let eggs = [];
let raccoonRight;

let turtleTest;

function preload() {
  ocean = loadImage("images/eco.png");
  fish1L = loadImage("images/fish1L.png");
  fish1R = loadImage("images/fish1R.png");
  fish2L = loadImage("images/fish2L.png");
  fish2R = loadImage("images/fish2R.png");
  fish3L = loadImage("images/fish3L.png");
  fish3R = loadImage("images/fish3R.png");
  sharkL = loadImage("images/sharkL.png");
  sharkR = loadImage("images/sharkR.png");
  turtlePNG = loadImage("images/turtle.png");
  raccoon = loadImage("images/jump0001.png");
  raccoonRight = loadImage("images/racRight.png");
  egg = loadImage("images/egg.png");
}

function setup() {
  createCanvas(1200, 800);
  noiseDetail(24);

  turtleTest = new Turtle();
  sharkT = new Shark("right");
}

function draw() {
  image(ocean, 0, 0, 1200, 800);

  noFill();
  rect(10, 10, 1180, 500); // in the ocean
  turtleTest.display();
  turtleTest.move();
  sharkT.display();
  sharkT.move();
  image(fish1R, 200, 200, 40, 20);
  image(fish2R, 300, 200, 40, 20);
  image(fish3R, 400, 200, 40, 20);

  // background("grey");
  if (frameCount % 200 == 0) {
    let tmpRaccoon = new Raccoon();
    raccoons.push(tmpRaccoon);
  }
  if (frameCount % 400 == 0) {
    let tmpEgg = new Egg();
    eggs.push(tmpEgg);
  }
  console.log(eggs);
  for (let i = 0; i < raccoons.length; i++) {
    raccoons[i].display();
    raccoons[i].move();
  }
  for (let j = 0; j < eggs.length; j++) {
    eggs[j].display();
  }
}

class Turtle {
  constructor() {
    this.x = random(10, 980);
    this.y = random(10, 500);
    this.noiseXLoc = random(1000);
    this.noiseYLoc = random(1000, 2000);
  }

  display() {
    image(turtlePNG, this.x, this.y, 80, 40);
  }

  move() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, -1, 1);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -0.5, 0.5);
    this.x += moveXAmount;
    this.y += moveYAmount;
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
    if (this.x >= 980) {
      this.x = 980;
    }
    if (this.x <= 10) {
      this.x = 10;
    }
    if (this.y >= 500) {
      this.y = 500;
    }
    if (this.y <= 10) {
      this.y = 10;
    }
  }
}

class Shark {
  constructor(d) {
    this.d = d;
    if (this.d == "right") {
      this.x = random(-300, -200);
    } else if (this.d == "left") {
      this.x = random(1100, 1150);
    }
    this.y = random(20, 300);
    this.noiseXLoc = random(2000, 3000);
    this.noiseYLoc = random(3000, 4000);
  }

  display() {
    if (this.d == "right") {
      image(sharkR, this.x, this.y, 150, 75);
    } else if (this.d == "left") {
      image(sharkL, this.x, this.y, 150, 75);
    }
  }

  move() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 0, 1);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -1, 1);

    this.y += moveYAmount;
    if (this.d == "right") {
      this.x += moveXAmount;
    } else if (this.d == "left") {
      this.x -= moveXAmount;
    }
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
    if (this.d == "right") {
      if (this.x >= 1100) {
        this.d = "left";
        this.x = random(1100, 1150);
      }
    } else if (this.d == "left") {
      if (this.x <= -300) {
        this.d = "right";
        this.x = random(-300, -200);
      }
    }

    if (this.y >= 300) {
      this.y = 300;
    }
    if (this.y <= 10) {
      this.y = 10;
    }
  }
}

class Fish {
  constructor() {
    this.id = int(random(3));
    this.dId = int(random(2));
    if (this.dId == 0) {
      this.d = "right";
    } else if (this.dId == 1) {
      this.d = "left";
    }
    this.y = random(20, 400);
    this.noiseXLoc = random(4000, 5000);
    this.noiseYLoc = random(5000, 6000);
  }

  display() {
    if (this.id == 0) {
      if (this.d == "right") {
        image(fish1R, this.x, this.y);
      }
    }
  }
}

class Raccoon {
  constructor() {
    this.direction = random(["left", "right"]);
    this.x = -240;
    this.y = 600;

    this.noiseXLoc = random(2000, 3000);
    this.noiseYLoc = random(3000, 4000);

    if (this.direction == "left") {
      this.x = -230;
    } else if (this.direction == "right") {
      this.x = 1240;
    }
  }
  display() {
    if (this.direction == "left") {
      image(raccoon, this.x, this.y, 200, 200);
    } else if (this.direction == "right") {
      image(raccoonRight, this.x, this.y, 200, 200);
    }
  }
  move() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 1, 3);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -0.5, 0.5);

    if (this.direction == "left") {
      this.x += moveXAmount;
      this.y += moveYAmount;
    } else if (this.direction == "right") {
      this.x -= moveXAmount;
      this.y += moveYAmount;
    }
  }
}

class Egg {
  constructor() {
    this.x = random(50, 1050);
    this.y = random(600, 700);
  }
  display() {
    image(egg, this.x, this.y, 50, 50);
  }
}
