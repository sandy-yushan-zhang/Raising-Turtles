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
let cnv;
let heart;
let intro;
let buttonStart;

let raccoon;
let egg;
let raccoons = [];
let eggs = [];
let buttons = [];
let raccoonRight;
let coins = 500;
let turtleTest;
let turtles = [];
let fish = [];
let sharks = [];
let recbutton, turtButton, fishbutton, sharkButton;
let counter = 0;
let counterStart = 0;
let startFlag = 0;

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
  heart = loadImage("images/heart.png");
}

function setup() {}

function draw() {
  if (counter < 1 || counterStart < 1) {
    //getItem("startFlag") == null
    if (startFlag == 0 && counter < 1) {
      intro = createP(
        "How To Play<br>To Win: Keep every species alive, not just turtles.<br> You lose if: Any of the species dies out. Meaning you lose if any species die to the population of 0. <br> How to prevent losing: You can use points to buy species to earn more opportunities. And it is your decision on when to buy those species to win the game. You only get 500 coins and the number of coins will not change. <br>The objective: To raise as many turtles as possible. When your system dies, the system will tell you how many turtles you have raised. "
      );
      buttonStart = createButton("Click To Start");
      intro.id("intro");
      intro.parent("#container");
      buttonStart.parent("#container");
      buttonStart.id("buttonStart");
      counter += 1;
    } else if (startFlag == 1 && counterStart < 1) {
      let buttonStartEle = document.getElementById("buttonStart");
      let introEle = document.getElementById("intro");
      if (buttonStartEle != null && introEle != null) {
        buttonStartEle.remove();
        introEle.remove();
      }

      cnv = createCanvas(1200, 950);
      cnv.id("p5canvas");
      noiseDetail(24);
      cnv.parent("#container");

      // for (let i = 0; i < 2; i++) {
      //   let dId = int(random(2));
      //   if (dId == 0) {
      //     raccoons.push(new Raccoon("right"));
      //   } else if (dId == 1) {
      //     raccoons.push(new Raccoon("left"));
      //   }
      // }
      raccoons.push(new Raccoon("left"));
      raccoons.push(new Raccoon("right"));
      for (let i = 0; i < 5; i++) {
        turtles.push(new Turtle(0));
      }
      for (let i = 0; i < 10; i++) {
        fish.push(new Fish());
      }
      sharkT = new Shark("right");
      for (let i = 0; i < 1; i++) {
        let dir = int(random(2));
        if (dir == 0) {
          sharks.push(new Shark("left"));
        } else {
          sharks.push(new Shark("right"));
        }
      }
      recbutton = new Buttons("rac", 100, 870, 100);
      turtButton = new Buttons("turt", 300, 870, 500);
      sharkButton = new Buttons("shark", 540, 870, 100);
      fishbutton = new Buttons("fish", 740, 870, 100);
      buttons.push(recbutton);
      buttons.push(turtButton);
      buttons.push(sharkButton);
      buttons.push(fishbutton);
      counterStart += 1;
    }
  }
  //===
  if (startFlag == 0) {
    intro.style("font-family", "Silkscreen");
    intro.style("font-size", "30px");
    buttonStart.mousePressed(gameStart);
  } else if (startFlag == 1) {
    oldDraw();
  }
}

function oldDraw() {
  noStroke();
  image(ocean, 0, 0, 1200, 800);
  fill(44, 128, 205);
  //this is a white rec for displaying buttons
  rect(0, 800, 1200, 150);
  noFill();
  rect(10, 10, 1180, 500); // in the ocean

  // stroke("red");
  // strokeWeight(5);
  rect(50, 550, 1100, 200); // places to lay egg

  for (let i = 0; i < turtles.length; i++) {
    if (turtles[i].alive == false) {
      turtles.splice(i, 1);
      i -= 1;
    } else {
      turtles[i].display();
      if (turtles[i].layingEgg == false) {
        turtles[i].move();
      }
      if (turtles[i].fecund == true) {
        turtles[i].layEgg();
      }
    }
  }

  for (let sharki = 0; sharki < sharks.length; sharki++) {
    sharks[sharki].display();
    sharks[sharki].move();
    sharks[sharki].checkTurtle();
    if (sharks[sharki].alive == false) {
      sharks.splice(sharki, 1);
      sharki -= 1;
    }
  }

  for (let i = 0; i < fish.length; i++) {
    fish[i].display();
    fish[i].move();
    // if (fish[i].caught) {
    //   fish[i].beingEat();
    // }
    if (fish[i].alive == false) {
      fish.splice(i, 1);
      i -= 1;
    }
  }
  // background("grey");

  // if (frameCount % 200 == 0) {
  //   let tmpRaccoon = new Raccoon();
  //   raccoons.push(tmpRaccoon);
  // }
  // if (frameCount % 400 == 0) {
  //   let tmpEgg = new Egg();
  //   eggs.push(tmpEgg);
  // }
  //console.log(eggs);
  push();
  imageMode(CENTER);
  for (let j = 0; j < eggs.length; j++) {
    eggs[j].display();
    eggs[j].turtleBorn();
    if (eggs[j].isAlive == false) {
      eggs.splice(j, 1);
      j -= 1;
    }
  }
  for (let i = 0; i < raccoons.length; i++) {
    raccoons[i].display();
    raccoons[i].move();
    raccoons[i].checkCollision();
    if (raccoons[i].alive == false) {
      raccoons.splice(i, 1);
      i -= 1;
    }
  }

  for (let buttoni = 0; buttoni < buttons.length; buttoni++) {
    buttons[buttoni].display();
    buttons[buttoni].checkClick();
  }

  noStroke();

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
  pop();

  // console.log(eggs.length);
}

class Buttons {
  constructor(type, positionx, positiony, price) {
    this.type = type;
    this.x = positionx;
    this.y = positiony;
    this.price = price;
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
    // console.log(d);
    if (mouseIsPressed == true && d <= 40) {
      console.log("button press");
      if (coins - this.price < 0 || coins == 0) {
        coinFlag = 1;
      } else if (coins - this.price > 0) {
        coinFlag = 0;
      }
      if (coinFlag == 0) {
        coins -= this.price;
        if (this.type == "turt") {
          console.log("what");
          let turtBut = new Turtle();
          turtles.push(turtBut);
        } else if (this.type == "rac") {
          let racBut = new Raccoon("right");
          raccoons.push(racBut);
        } else if (this.type == "fish") {
          let fishBut = new Fish();
          fish.push(fishBut);
        } else if (this.type == "shark") {
          let sharkBut = new Shark("right");
          sharks.push(sharkBut);
        }
      }

      mouseIsPressed = false;
    }
  }
}
class Turtle {
  constructor(ifNewBorn, x, y) {
    if (ifNewBorn == 0) {
      this.x = random(10, 980);
      this.y = random(10, 500);
    } else if (ifNewBorn == 1) {
      this.x = x;
      this.y = y;
    }
    if (ifNewBorn == 1) {
      this.newBorn = true;
    } else if (ifNewBorn == 0) {
      this.newBorn = false;
    }
    this.noiseXLoc = random(1000);
    this.noiseYLoc = random(1000, 2000);
    this.moveXAmount;
    this.moveYAmount;
    this.layingEgg = false;
    this.readyToLay = false; // when move to position, then it's ready
    this.finishLay = false; // when finish laying eggs, turtle go back to ocean, after went back, change layingEgg and readyToLay to false
    this.laidEggAmount = 0;
    this.layingEggTrack = 0; // set to 0 frame count when the turtles starts to lay, keep track of frames when turtle lay eggs

    this.lives = 5;
    this.alive = true;
    this.liveCount = 1;
    this.fecundId = int(random(2));
    this.fecund;
    if (this.fecundId == 0) {
      this.fecund = true;
      this.eggTime = int(random(1200, 1801)); // for how many frameCount does it lay an egg
      this.eggAmount = int(random(1, 2));
      this.layX = random(50, 1150); // where to lay eggs
      this.layY = random(550, 750);
    } else {
      this.fecund = false;
    }

    this.goBackX = random(10, 980); // where the turtle goes back after laid eggs, or after new born
    this.goBackY = random(400, 500);
  }

  display() {
    image(turtlePNG, this.x, this.y, 80, 40);
    let hpDistance = 0;
    for (let i = 0; i < this.lives; i++) {
      image(heart, this.x + 16 + hpDistance, this.y - 10, 7, 7);
      hpDistance += 10;
    }

    // Slowly decrease lives
    if (this.liveCount % 1800 == 0) {
      this.lives -= 1;
    }
    this.liveCount += 1;
    if (this.lives == 0) {
      this.alive = false;
    }

    strokeWeight(1);
    rect(this.x + 25, this.y + 10, 30, 30);
    stroke("purple");
    strokeWeight(10);
    point(this.x + 40, this.y + 30);
  }

  move() {
    if (!this.newBorn) {
      this.moveXAmount = map(noise(this.noiseXLoc), 0, 1, -1, 1);
      this.moveYAmount = map(noise(this.noiseYLoc), 0, 1, -1.5, 1.5);
      this.x += this.moveXAmount;
      this.y += this.moveYAmount;
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
    } else {
      //stroke("red");
      point(this.goBackX, this.goBackY);
      if (
        this.x > this.goBackX + 5 ||
        this.x < this.goBackX - 5 ||
        this.y > this.goBackY + 5
      ) {
        if (this.x > this.goBackX + 5) {
          this.x -= random(0.5, 1);
        }
        if (this.x < this.goBackX - 5) {
          this.x += random(0.5, 1);
        }
        if (this.y > this.goBackY + 5) {
          this.y -= random(0.5, 1);
        }
      } else {
        this.newBorn = false;
      }
    }
  }

  layEgg() {
    if (frameCount % this.eggTime == 0) {
      this.layingEgg = true;
    }
    if (this.layingEgg) {
      if (!this.readyToLay) {
        // console.log("MOVE");
        if (this.x > this.layX + 5 || this.y > this.layY + 5) {
          if (this.x > this.layX + 5) {
            this.x -= random(0.5, 1);
          }
          if (this.y > this.layY + 5) {
            this.y -= random(0.5, 1);
          }
        } else if (this.x < this.layX - 5 || this.y < this.layY - 5) {
          if (this.x < this.layX - 5) {
            this.x += random(0.5, 1);
          }
          if (this.y < this.layY - 5) {
            this.y += random(0.5, 1);
          }
        } else {
          this.readyToLay = true;
        }
      }

      if (this.readyToLay) {
        // lay egg one by one
        if (!this.finishLay) {
          // console.log("LAID", this.laidEggAmount);
          // console.log("TOTAL", this.eggAmount);
          if (this.laidEggAmount < this.eggAmount) {
            if (this.layingEggTrack % (this.eggTime * 60) == 0) {
              let tempEggX = this.x + random(-10, 90);
              let tempEggY = (this.y += random(-20, 0));
              eggs.push(new Egg(tempEggX, tempEggY));
              this.laidEggAmount++;
              this.layingEggTrack++;
            }
          } else {
            // console.log("FINISH!!!!!!!!!!");
            this.finishLay = true;
            this.layingEggTrack = 0;
            this.goBackX = random(10, 980);
            this.goBackY = random(400, 500);
          }
        }
      }

      if (this.finishLay) {
        // console.log("X: ", this.goBackX);
        // console.log("Y: ", this.goBackY);
        point(this.goBackX, this.goBackY);
        if (
          this.x > this.goBackX + 5 ||
          this.x < this.goBackX - 5 ||
          this.y > this.goBackY + 5
        ) {
          if (this.x > this.goBackX + 5) {
            this.x -= random(0.5, 1);
          }
          if (this.x < this.goBackX - 5) {
            this.x += random(0.5, 1);
          }
          if (this.y > this.goBackY + 5) {
            this.y -= random(0.5, 1);
          }
        } else {
          this.readyToLay = false;
          this.layingEgg = false;
          this.finishLay = false;
          this.laidEggAmount = 0;
          this.layX = random(50, 1150); // reset so next time lay at a different place
          this.layY = random(630, 760);
        }
      }
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
    this.lives = 5;
    this.alive = true;
    this.liveCount = 1;
  }

  display() {
    if (this.d == "right") {
      image(sharkR, this.x, this.y, 150, 75);
      stroke("red");
      strokeWeight(2);
      point(this.x + 130, this.y + 40);
      rect(this.x + 100, this.y + 10, 60, 60);
    } else if (this.d == "left") {
      image(sharkL, this.x, this.y, 150, 75);
      stroke("red");
      strokeWeight(10);
      // rect(this.x + 15, this.y - 35, 50, 50);
      point(this.x + 45, this.y + 45);
    }

    let hpDistance = 0;
    for (let i = 0; i < this.lives; i++) {
      image(heart, this.x + +35 + hpDistance, this.y - 10, 10, 10);
      hpDistance += 18;
    }
    // Slowly decrease lives
    if (this.liveCount % 3600 == 0) {
      this.lives -= 1;
    }
    this.liveCount += 1;
    if (this.lives == 0) {
      this.alive = false;
    }
  }

  move() {
    //original x: 0, 1 REMEMBER to change back!!!!!
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 2, 3);
    //changed it to -2 2 from -1 1 , might be better??
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -2, 2);

    this.y += moveYAmount;
    if (this.d == "right") {
      this.x += moveXAmount;
    } else if (this.d == "left") {
      this.x -= moveXAmount;
    }
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
    if (this.d == "right") {
      if (this.x >= 1400) {
        this.d = "left";
        this.x = random(1300, 1400);
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
  checkTurtle() {
    for (let turtNum = 0; turtNum < turtles.length; turtNum++) {
      let turtDis;
      if (this.d == "right") {
        turtDis = dist(
          this.x + 130,
          this.y + 40,
          turtles[turtNum].x + 40,
          turtles[turtNum].y + 30
        );
      } else if (this.d == "left") {
        turtDis = dist(
          this.x + 45,
          this.y + 45,
          turtles[turtNum].x + 40,
          turtles[turtNum].y + 30
        );
      }

      if (turtDis <= 50) {
        // console.log(disA);
        turtles[turtNum].alive = false;
        if (this.lives < 5) {
          this.lives += 1;
        }
      }
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
    if (this.d == "right") {
      this.x = random(-200, -70);
    } else if (this.d == "left") {
      this.x = random(1250, 1380);
    }
    this.y = random(20, 470);
    this.noiseXLoc = random(4000, 5000);
    this.noiseYLoc = random(5000, 6000);
    this.alive = true;
    this.caught = false;
    this.caughtX;
    this.caughtY;
    this.lives = 5;
    this.liveCount = 1;
  }

  display() {
    if (this.id == 0) {
      if (this.d == "right") {
        image(fish1R, this.x, this.y, 40, 20);
      } else if (this.d == "left") {
        image(fish1L, this.x, this.y, 40, 20);
      }
    } else if (this.id == 1) {
      if (this.d == "right") {
        image(fish2R, this.x, this.y, 40, 20);
      } else if (this.d == "left") {
        image(fish2L, this.x, this.y, 40, 20);
      }
    } else if (this.id == 2) {
      if (this.d == "right") {
        image(fish3R, this.x, this.y, 40, 20);
      } else if (this.d == "left") {
        image(fish3L, this.x, this.y, 40, 20);
      }
    }

    point(this.x + 20, this.y + 10);

    if (this.caught) {
      point(this.x + 30, this.y + 10);
    }

    let hpDistance = 0;
    for (let i = 0; i < this.lives; i++) {
      image(heart, this.x + hpDistance, this.y - 10, 5, 5);
      hpDistance += 8;
    }
    // Slowly decrease lives
    if (this.liveCount % 3600 == 0) {
      this.lives -= 1;
    }
    this.liveCount += 1;
    if (this.lives == 0) {
      this.alive = false;
    }
  }

  move() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 0, 3);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -0.5, 0.5);

    this.y += moveYAmount;
    if (this.d == "right") {
      this.x += moveXAmount;
    } else if (this.d == "left") {
      this.x -= moveXAmount;
    }
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
    if (this.d == "right") {
      if (this.x >= 1380) {
        this.d = "left";
        this.x = random(1250, 1380);
      }
    } else if (this.d == "left") {
      if (this.x <= -200) {
        this.d = "right";
        this.x = random(-70, -200);
      }
    }

    if (this.y >= 470) {
      this.y = 470;
    }
    if (this.y <= 10) {
      this.y = 10;
    }

    // check if the fish will be caught by any turtle; if will be caught, then catch by turtle and eat by turtle
    for (let i = 0; i < turtles.length; i++) {
      let liveDist = dist(
        this.x + 20,
        this.y + 10,
        turtles[i].x + 40,
        turtles[i].y + 30
      );
      if (this.caught == false) {
        if (liveDist <= 20) {
          this.caught = true;
          this.caughtX = turtles[i].x;
          this.caughtY = turtles[i].y;
        }
      }
      if (liveDist <= 20) {
        this.alive = false;
        if (turtles[i].lives < 5) {
          turtles[i].lives += 1;
        }

        // DO NOT DELETE ----------------------------------------------------------------
        // (HOW TO LET THIS FISH REMEMBER WHICH TURTLE EATS IT)
        // this.caught = true;
        // this.caughtX = turtles[i].x;
        // this.caughtY = turtles[i].y;
        // DO NOT DELETE ----------------------------------------------------------------
      }
      // DO NOT DELETE ------------------------------------------------------------------
      // if fish is caught, drag to turtle's mouth and die
      // if (this.caught) {
      //   if (this.x + 20 >= this.caughtX + 40) {
      //     this.x -= 0.01;
      //   } else if (this.x + 20 <= this.caughtX + 40) {
      //     this.x += 0.01;
      //   }
      //   if (this.y + 10 >= this.caughtY + 30) {
      //     this.y -= 0.01;
      //   } else if (this.y + 10 <= this.caughtY + 30) {
      //     this.y += 0.01;
      //   }
      // }
      // if (dist(this.x + 20, 100, turtles[i].x + 40, 100) <= 7) {
      //   if (dist(100, this.y + 10, 100, turtles[i].y + 30) <= 7) {
      //     this.alive = false;
      //   }
      // }
      // DO NOT DELETE --------------------------------------------------------------------
    }
  }

  // beingEat() {
  //   if (this.x + 20 >= this.caughtX + 40) {
  //     this.x -= 0.01;
  //   } else if (this.x + 20 <= this.caughtX + 40) {
  //     this.x += 0.01;
  //   }
  //   if (this.y + 10 >= this.caughtY + 30) {
  //     this.y -= 0.01;
  //   } else if (this.y + 10 <= this.caughtY + 30) {
  //     this.y += 0.01;
  //   }
  //   if (dist(this.x + 20, 100, this.caughtX, 100) <= 7) {
  //     if (dist(100, this.y + 10, 100, this.caughtY + 30) <= 7) {
  //       this.alive = false;
  //     }
  //   }
  // }
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
      this.x = 1200;
      this.y = 600;
    }

    this.lives = 5;
    this.alive = true;
    this.liveCount = 1;
  }
  display() {
    strokeWeight(1);

    if (this.direction == "left") {
      image(raccoon, this.x, this.y, 200, 200);
      // rect(this.x + 15, this.y - 35, 50, 50);
      // stroke("red");
      // strokeWeight(10);
      // point(this.x + 40, this.y - 10);
    } else if (this.direction == "right") {
      image(raccoonRight, this.x, this.y, 200, 200);
      // rect(this.x - 65, this.y - 35, 50, 50);
      // stroke("red");
      // strokeWeight(10);
      // point(this.x - 40, this.y - 10);
    }

    let hpDistance = 0;
    let hpXPos;
    if (this.direction == "right") {
      hpXPos = -62;
    } else if (this.direction == "left") {
      hpXPos = -11;
    }
    for (let i = 0; i < this.lives; i++) {
      image(heart, this.x + hpXPos + hpDistance, this.y - 80, 9, 9);
      hpDistance += 18;
    }
    // Slowly decrease lives
    if (this.liveCount % 3600 == 0) {
      this.lives -= 1;
    }
    this.liveCount += 1;
    if (this.lives == 0) {
      this.alive = false;
    }
  }
  move() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 0.2, 1.2);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -1, 1);
    //this.y = constrain(this.y, 550, 720);
    if (this.direction == "left") {
      this.x += moveXAmount;
      this.y += moveYAmount;
    } else if (this.direction == "right") {
      this.x -= moveXAmount;
      this.y += moveYAmount;
    }
    if (this.x >= 1230) {
      this.x = 11;
      this.direction = "left";
    }
    if (this.x <= -10) {
      this.x = 1200;
      this.direction = "right";
    }
    if (this.y <= 550) {
      this.y = 550;
    }
    if (this.y >= 750) {
      this.y = 750;
    }
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
  }
  checkCollision() {
    for (let n = 0; n < eggs.length; n++) {
      let disA;
      //different mouth directoins
      if (this.direction == "right") {
        disA = dist(this.x - 40, this.y - 10, eggs[n].x + 3, eggs[n].y - 5);
      } else if (this.direction == "left") {
        disA = dist(this.x + 40, this.y - 10, eggs[n].x + 3, eggs[n].y - 5);
      }

      if (disA <= 40) {
        // console.log(disA);
        eggs[n].isAlive = false;

        if (this.lives < 5) {
          this.lives += 1;
        }
      }
    }
  }
}

class Egg {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.bornTime = int(random(600, 1201)); // after how many frameCount it will become a turtle
    this.birthTime = 1;
  }
  display() {
    image(egg, this.x, this.y, 30, 30);
    // stroke("black");
    // strokeWeight(10);
    // point(this.x + 5, this.y - 5);
    // rect(this.x - 15, this.y - 15, 30, 30);
  }

  turtleBorn() {
    console.log("IN TURTLE BORN");
    if (this.isAlive) {
      if (this.birthTime % this.bornTime == 0) {
        console.log("BORN");
        turtles.push(new Turtle(1, this.x, this.y));
        this.isAlive = false;
      }
      this.birthTime += 1;
    }
  }
}

function gameStart() {
  console.log("hi");
  startFlag = 1;
  // storeItem("startFlag", 0);
}
