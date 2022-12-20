var ocean;
var yellow;
var yellows = [];

var person;
var boat, fishing;
var fisherX = 100;
var fisherXSpeed = 5;
var hookX, hookY, hookNowY, hookEndY;
var catching;
var getting;
var caughtFish;
var fishingTimer = 20;
var fishingPlaying;
var fishingPoint = 0;

function preload() {
  ocean = loadImage("images/eco.png");
  yellow = loadImage("images/yellowFish.png");
  person = loadImage("images/walkright.gif");
  boat = loadImage("images/boat.png");
  fishing = loadImage("images/fishing.png");
}

function setup() {
  createCanvas(1200, 800);

  hookX = fisherX + 215;
  hookY = 68;
  hookEndY = hookY;
  hookNowY = hookY;
  catching = false;
  getting = false;
  caughtFish = false;
  fishingPlaying = true;

  for (let i = 0; i < 20; i++) {
    yellows.push(new Yellow());
  }
}

function draw() {
  image(ocean, 0, 0, 1200, 800);

  // POINTS
  let temp = 0;
  for (let i = 0; i < yellows.length; i++) {
    if (yellows[i].caught) {
      temp++;
    }
  }
  fishingPoint = temp;
  noStroke();
  textSize(30);
  text("Points:", 900, 700);
  text(fishingPoint, 1000, 700);

  // TIMER
  if (frameCount % 60 == 0 && fishingTimer > 0) {
    fishingTimer--;
  }
  if (fishingTimer == 0) {
    fishingPlaying = false;
  }
  text("Time Left:", 900, 650);
  if (fishingTimer >= 10) {
    text("0:" + fishingTimer, 1050, 650);
  } else if (fishingTimer < 10) {
    text("0:0" + fishingTimer, 1050, 650);
  }

  person.setFrame(10);

  image(boat, fisherX, -15, 100, 150);
  image(person, fisherX + 35, 25, 70, 70);
  image(fishing, fisherX + 70, 57, 150, 30);

  if (keyIsDown(65) || keyIsDown(97)) {
    fisherX -= fisherXSpeed;
    hookX -= fisherXSpeed;
    if (fisherX <= -60) {
      fisherX = -60;
      hookX = fisherX + 215;
    }
  }
  if (keyIsDown(68) || keyIsDown(100)) {
    fisherX += fisherXSpeed;
    hookX += fisherXSpeed;
    if (fisherX >= 970) {
      fisherX = 970;
      hookX = fisherX + 215;
    }
  }

  if (fishingPlaying) {
    stroke("black");
    strokeWeight(2);
    line(hookX, hookY, hookX, hookNowY);
  }

  for (let i = 0; i < yellows.length; i++) {
    let d = dist(yellows[i].x + 30, yellows[i].y + 20, hookX, hookNowY);
    if (d <= 20) {
      yellows[i].caught = true;
      caughtFish = true;
    }
    yellows[i].move();
  }

  // CATCHING FISH ALGO
  if (fishingPlaying) {
    if (caughtFish) {
      fisherXSpeed = 0;
      if (hookNowY >= hookY) {
        hookNowY -= 3;
      }
      if (hookNowY <= hookY) {
        getting = false;
        caughtFish = false;
        catching = false;
        fisherXSpeed = 5;
      }
    } else if (catching) {
      if (hookNowY <= hookEndY) {
        hookNowY += 3;
      } else {
        catching = false;
        getting = true;
      }
    } else if (!catching) {
      if (hookNowY >= hookY) {
        hookNowY -= 3;
      }
      if (hookNowY <= hookY) {
        getting = false;
      }
    }
  }
}

class Yellow {
  constructor() {
    this.x = random(1250, 2500);
    this.y = random(200, 470);
    this.len = 60;
    this.hei = 40;
    this.xMove = random(1, 3);
    this.yMove = random(-1.5, 1.5);
    this.noiseXLoc = random(1000);
    this.noiseYLoc = random(1000, 2000);

    this.upBound = random(0, 100);
    this.lowBound = random(400, 500);
    this.out = false;
    this.caught = false;
    this.cage = false;
  }

  move() {
    image(yellow, this.x, this.y, this.len, this.hei);
    let moveX = map(noise(this.noiseXLoc), 0, 1, -1, -3);
    let moveY = map(noise(this.noiseYLoc), 0, 1, -1.5, 1.5);
    if (!this.caught) {
      this.x += moveX;
      this.y += moveY;
      if (this.x <= -20) {
        this.x = random(1300, 2000);
      }
      if (this.y > 500) {
        this.y = 500;
      } else if (this.y < 200) {
        this.y = 200;
      }
      this.noiseXLoc += 0.01;
      this.noiseYLoc += 0.01;
    } else {
      if (!this.cage) {
        this.y -= 3;
        if (this.y <= hookY) {
          this.x = random(400, 800);
          this.y = random(650, 700);
          this.xMove = 0;
          this.yMove = 0;
          this.cage = true;
        }
      }
    }
  }
}

function mousePressed() {
  if (!catching && !getting) {
    catching = true;
    hookEndY = mouseY;
  }
}
