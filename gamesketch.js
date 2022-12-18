var beach;
var holes = [];
var rac, hammer;
var score = 0;
var timerValue = 10;
var gameOver = false;
var hammerStart = 0;

function preload() {
  beach = loadImage("images/eco.png");
  rac = loadImage("images/jump0001.png");
  hammer = loadImage("images/hammer.png");
}

function setup() {
  createCanvas(1200, 800);

  for (let i = height / 2 - 150; i < height; i += 230) {
    for (let j = width / 2 - 330; j < width; j += 330) {
      let hole = new Hole(j, i);
      holes.push(hole);
    }
  }
}

function draw() {
  image(beach, 0, 0, 1200, 800);
  noStroke();
  fill("black");
  textSize(40);
  text("Score: ", 40, 100);
  text(score, 180, 100);

  if (hammerStart <= 300) {
    console.log("LESS");
    noStroke();
    fill("black");
    textSize(100);
    text("Welcome to Whack-A-Raccoon!", width / 2 - 200, height / 2);
    text("You have 10 second.", width / 2 - 200, height / 2 + 100);
    text("Ready...? GO!", width / 2 - 200, height / 2 + 200);
    hammerStart++;
  } else {
    // TIMER
    if (frameCount % 60 == 0 && timerValue > 0) {
      timerValue--;
    }
    if (timerValue == 0) {
      gameOver = true;
    }
    text("Time Left:", 800, 100);
    if (timerValue >= 10) {
      text("0:" + timerValue, 1000, 100);
    } else if (timerValue < 10) {
      text("0:0" + timerValue, 1000, 100);
    }

    if (!gameOver) {
      // ALL HOLES
      holes.forEach(function (each) {
        each.display();
        each.rac();
      });

      // HAMMER
      image(hammer, mouseX - 30, mouseY - 50, 200, 100);

      // RACCOON APPEAR RANDOMLY
      if (frameCount % 60 == 0) {
        let i = int(random(9));
        holes.forEach(function (each) {
          each.racAppear = false;
        });
        holes[i].racAppear = true;
      }
    } else {
      holes.forEach(function (each) {
        each.racAppear = false;
      });
      noStroke();
      fill("black");
      textSize(100);
      text("GAME OVER", width / 2 - 300, height / 2);
    }
  }
}

class Hole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 120;
    this.racAppear = false;
  }

  display() {
    strokeWeight(25);
    stroke(234, 120, 0);
    noFill();
    ellipse(this.x, this.y, this.size, this.size);
  }

  rac() {
    if (this.racAppear == true) {
      image(rac, this.x - 150, this.y - 120, 250, 250);
      stroke("red");
      strokeWeight(5);
      // rect(this.x - 30, this.y - 65, 70, 120);
      // let d = dist(this.x, mouseY, this.x, this.y);
      // text(d, 400, 400);
      // left: 30, right: 35
      // up: 60, down: 55
    }
  }

  checkHitRac() {
    if (dist(mouseX, this.y, this.x, this.y) <= 30) {
      if (dist(this.x, mouseY, this.x, this.y) <= 55) {
        if (this.racAppear) {
          this.racAppear = false;
          score += 1;
        }
      }
    }
  }
}

function mouseClicked() {
  if (!gameOver) {
    holes.forEach(function (each) {
      each.checkHitRac();
    });
  }
}
