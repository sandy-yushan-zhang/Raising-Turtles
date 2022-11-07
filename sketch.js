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
let buttons = [];
let raccoonRight;
let coins = 500;
let turtleTest;

let recbutton, turtButton, fishbutton, sharkButton;

let d = 0;
let coinFlag = 0;
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
  //original 1200,800, changing it now to add buttons
  createCanvas(1200, 950);
  noiseDetail(24);

  // for (let num = 0; num < 2; num++) {
  //   let tmpRaccoon = new Raccoon();
  //   raccoons.push(tmpRaccoon);
  // }
  let tmpRac = new Raccoon("right");
  raccoons.push(tmpRac);
  let tmpRac2 = new Raccoon("left");
  raccoons.push(tmpRac2);
  turtleTest = new Turtle();
  sharkT = new Shark("right");

  recbutton = new Buttons("rac", 100, 870);
  turtButton = new Buttons("turt", 300, 870);
  sharkButton = new Buttons("shark", 540, 870);
  fishbutton = new Buttons("fish", 740, 870);
  buttons.push(recbutton);
  buttons.push(turtButton);
  buttons.push(sharkButton);
  buttons.push(fishbutton);
}

function draw() {
  noStroke();
  image(ocean, 0, 0, 1200, 800);
  fill("white");
  //this is a white rec for displaying buttons
  rect(0, 800, 1200, 150);
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
  push();
  imageMode(CENTER);
  if (frameCount % 300 == 0) {
    let tmpEgg = new Egg();
    eggs.push(tmpEgg);
  }

  for (let i = 0; i < raccoons.length; i++) {
    raccoons[i].display();
    raccoons[i].move();
    raccoons[i].checkCollision();
  }
  for (let j = 0; j < eggs.length; j++) {
    eggs[j].display();
  }
  for (let buttoni = 0; buttoni < buttons.length; buttoni++) {
    buttons[buttoni].display();
    buttons[buttoni].checkClick();
  }

  pop();
  strokeWeight(4);
  fill("black");

  textSize(18);
  text("100 coins", 50, 930);
  text("500 coins", 270, 930);
  text("100 coins", 500, 930);
  text("100 coins", 700, 930);
  textSize(22);
  text("Click the animal to buy", 900, 900);
  text("Coins Left:  " + coins, 900, 870);
}
class Buttons {
  constructor(type, positionx, positiony) {
    this.type = type;
    this.x = positionx;
    this.y = positiony;
  }
  display() {
    if (this.type == "rac") {
      image(raccoonRight, this.x, this.y, 150, 150);
    } else if (this.type == "turt") {
      image(turtlePNG, this.x, this.y, 100, 60);
    } else if (this.type == "shark") {
      image(sharkL, this.x, this.y, 100, 100);
    } else if (this.type == "fish") {
      image(fish1L, this.x, this.y, 100, 100);
    }
  }
  checkClick() {
    d = dist(mouseX, mouseY, this.x, this.y);
    console.log(d);
    if (mouseIsPressed == true && d <= 40) {
      console.log("button press");
      if (coins <= 0) {
        coinFlag = 1;
      }
      if (this.type == "turt" && coinFlag == 0) {
        console.log("what");
        coins -= 500;
      } else {
        if (coinFlag == 0) {
          coins -= 100;
        }
      }
    }
    mouseIsPressed = false;
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
  // checkTurtle(){
  //   for (let turtNum = 0; n < turtle.length; n++) {
  //     let disA = dist(this.x, this.y, eggs[n].x, eggs[n].y);
  //     if (disA <= 100) {
  //       // console.log(disA);
  //       eggs.splice(n, 1);
  //     }
  //   }
  // }
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
  constructor(direction) {
    this.direction = direction;

    this.noiseXLoc = random(2000, 3000);
    this.noiseYLoc = random(3000, 4000);

    if (this.direction == "left") {
      this.x = 11;
      this.y = 600;
    } else if (this.direction == "right") {
      this.x = 980;
      this.y = 600;
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
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 0, 1);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -1, 1);
    this.y = constrain(this.y, 550, 720);
    if (this.direction == "left") {
      this.x += moveXAmount;
      this.y += moveYAmount;
    } else if (this.direction == "right") {
      this.x -= moveXAmount;
      this.y += moveYAmount;
    }
    if (this.x >= 1000) {
      this.x = 11;
      this.direction = "left";
    }
    if (this.x <= 10) {
      this.x = 980;
      this.direction = "right";
    }
  }
  checkCollision() {
    for (let n = 0; n < eggs.length; n++) {
      let disA = dist(this.x, this.y, eggs[n].x, eggs[n].y);
      if (disA <= 100) {
        // console.log(disA);
        eggs.splice(n, 1);
      }
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
