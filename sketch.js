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
let coins = 0;
let turtleTest;
let turtles = [];
let fish = [];
let sharks = [];

let flagEnd;

let recbutton, turtButton, fishbutton, sharkButton;
let counter = 0;
let counterStart = 0;
let startFlag = 0;

let d = 0;
let coinFlag = 0;

let racEnd;
let sharkEnd;
let fishEnd;
let turtEnd;

let turtCount = 0;
let endMessage;
let counterEnd = 0;
let tmpV = 0;

let swimD, swimL, swimR, swimU;

let groundL, groundR;

let streetSign;
// let groundLgif, grundRgif, swimDgif, swimLgif, swimRgif, swimUgif
let myPerson;
let personSpeed = 3;
let walkFlag = 1; // 1 is left

// HAMMER GAME ----------------------
var holes = [];
var rac, hammer;
var score = 0;
var timerValue = 20;
var gameOver = false;
var hammerEnd = 0;
var hammerStart = 0;
var hammerIntro;
var hammerRealStart = false;
var hammerEndMessage;

//AR GAME ------------------
let capture;
let currentTime = 0;
let poseNet;

let poses = [];
let readyToGo = false;
let arcion = 0;
let points = 0;
let classifier;
// let cnv;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/gWHirOLqD/";
let video;
let flippedVideo;
let tmpi = 0;
// To store the classification
let label = "";

let arRacs = [];
let racAR1, racAR2, racAR3, racAR4, racAR5, racAR6;

let arEggs = [];
let arInstruction;
let timeLimit = 60; // around 60 seconds
let tmpTime;
let realCurrTime = 0;
let countDown;
let tmpCount = 0;

let arIntro;
let arStart = 0;
//EGG GAME
let eggCoin = 0;
let basket;
let mybasket;
let fallEggs = [];
let fallPoints = 0;

let eggLost = 0;
let loseCounter = 0;
let tmpj = 0;
let eggInstruction;

let readyToGo2 = false;
let eggGameOver = false;
let eggCount = 0;

let eggStart = 0;
let eggIntro;
let tmpLose = 0;
// FISHING GAME
var yellow;
var yellows = [];

var person, boat, fishing;
var fisherX = 100;
var fisherXSpeed = 5;
var hookX, hookY, hookNowY, hookEndY;
var catching;
var getting;
var caughtFish;
var fishingTimer = 20;
var fishingPlaying;
var fishingPoint = 0;
var fishingStart = 0;
var fishingIntro;
var fishingRealStart = false;
var fishingEndMessage;
var fishingEnd = 0;

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

  swimD = loadImage("images/swimD.gif");
  swimL = loadImage("images/swimL.gif");
  swimR = loadImage("images/swimR.gif");
  swimU = loadImage("images/swimU.gif");

  groundL = loadImage("images/walkleft.gif");
  groundR = loadImage("images/walkright.gif");
  streetSign = loadImage("images/streetsign.png");
  // HAMMER GAME -----------
  rac = loadImage("images/jump0001.png");
  hammer = loadImage("images/hammer.png");

  // AR GAME ----------
  raccoon = loadImage("images/jump0001.png");
  raccoonRight = loadImage("images/racRight.png");
  egg = loadImage("images/egg.png");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");

  // egg game------
  basket = loadImage("images/basket.png");

  // FISHING GAME -----
  yellow = loadImage("images/yellowFish.png");
  person = loadImage("images/walkright.gif");
  boat = loadImage("images/boat.png");
  fishing = loadImage("images/fishing.png");
}

function setup() {
  capture = createCapture(VIDEO);
  capture.size(1200, 800);

  poseNet = ml5.poseNet(capture, modelReady);

  poseNet.on("pose", function (results) {
    poses = results;
  });
  capture.hide();
  for (let num = 0; num < 10; num++) {
    let tmpEgg = new ARegg();
    tmpEgg.build();
    arEggs.push(tmpEgg);
  }
  // FOR draw
  racAR1 = new Raccoon("right");
  racAR2 = new Raccoon("left");
  racAR3 = new Raccoon("right");
  racAR4 = new Raccoon("left");
  racAR5 = new Raccoon("right");
  racAR6 = new Raccoon("left");

  racAR1.y = 100;
  racAR2.y = 100;
  racAR3.y = 300;
  racAR4.y = 300;
  racAR5.y = 500;
  racAR6.y = 500;
  racAR1.arFlag = 1;
  racAR2.arFlag = 1;
  racAR3.arFlag = 1;
  racAR4.arFlag = 1;
  racAR5.arFlag = 1;
  racAR6.arFlag = 1;

  arRacs.push(racAR1);
  arRacs.push(racAR2);
  arRacs.push(racAR3);
  arRacs.push(racAR4);
  arRacs.push(racAR5);
  arRacs.push(racAR6);

  classifyVideo();
}

function draw() {
  // swimD.setFrame(0);
  // swimR.setFrame(0);
  // swimL.setFrame(0);
  // swimU.setFrame(0);

  // groundL.setFrame(0);
  // groundR.setFrame(0);
  if (counter < 1 || counterStart < 1 || counterEnd < 1) {
    //getItem("startFlag") == null
    if (startFlag == 0 && counter < 1) {
      intro = createP(
        "How To Play<br>To Win: Keep every species alive, not just turtles. Raise as many turtles as you can. <br> The game ends if: Any of the species dies out. Meaning you lose if any species die to the population of 0. <br> How to prevent losing: You can control the character to find entrances to small games. Winning the games will help you earn coins. Coins can be used to buy species to earn more opportunities. And it is your decision on when to buy those species to win the game. You do not have any coin to start with. <br>The objective: To raise as many turtles as possible. When your system dies, the system will tell you how many turtles you have raised. <br> Rules: Turtles eat fish, sharks eat turtles. Raccoons eat turtles' eggs."
      );
      buttonStart = createButton("Click To Start");
      intro.id("intro");
      intro.parent("#container");
      buttonStart.parent("#container");
      buttonStart.id("buttonStart");
      counter += 1;
    } else if (
      (turtles.length == 0 ||
        sharks.length == 0 ||
        fish.length == 0 ||
        raccoons.length == 0) &&
      flagEnd == 1
    ) {
      console.log("any dies");
      endMessage = createP(
        "<br><br><br><br>The game is over, thank you for raising the turtles. <br>The total amount of turtles you have raised during this game is: " +
          turtCount
      );
      endMessage.id("end");
      endMessage.parent("container");
      let p5canvas = document.getElementById("p5canvas");

      if (p5canvas != null) {
        p5canvas.remove();
      }
      counterEnd += 1;
    } else if (
      (startFlag == 1 || startFlag == 2 || startFlag == 3 || startFlag == 5) &&
      counterStart < 1
    ) {
      let buttonStartEle = document.getElementById("buttonStart");
      let introEle = document.getElementById("intro");
      if (buttonStartEle != null && introEle != null) {
        buttonStartEle.remove();
        introEle.remove();
      }
      cnv = createCanvas(1200, 950);
      flagEnd = 1;
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

      myPerson = new Person("right");

      // HAMMER GAME --------------
      for (let i = 800 / 2 - 200; i < 800; i += 230) {
        for (let j = 1200 / 2 - 330; j < 1200; j += 330) {
          let hole = new Hole(j, i);
          holes.push(hole);
        }
      }
      // FISHING GAME ---------------
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

      // SET UP FOR AR GAME --------------
      // MY EGG GAME
      mybasket = new Basket();
    }
  }
  //===
  if (startFlag == 0) {
    // intro.style("font-family", "Silkscreen");
    // intro.style("font-size", "30px");
    buttonStart.mousePressed(gameStart);
  } else if (startFlag == 1) {
    oldDraw();
  } else if (startFlag == 2) {
    hammerGame();
  } else if (startFlag == 3) {
    ARgame();
  } else if (startFlag == 4) {
    eggGame();
  } else if (startFlag == 5) {
    fishingGame();
  }
}

function oldDraw() {
  // console.log("GAME", startFlag);
  noStroke();
  background(0);
  imageMode(CORNER);
  image(ocean, 0, 0, 1200, 800);
  // groundR.delay(1000);
  // groundL.delay(1000);
  fill(44, 128, 205);
  //this is a white rec for displaying buttons
  rect(0, 800, 1200, 150);
  noFill();
  rect(10, 10, 1180, 500); // in the ocean

  // stroke("red");
  // strokeWeight(5);
  tmpCount = 0;
  rect(50, 550, 1100, 200); // places to lay egg
  image(streetSign, 100, 700, 50, 50);
  image(streetSign, 1100, 70, 50, 50);
  for (let i = 0; i < turtles.length; i++) {
    if (turtles[i].alive == true) {
      turtEnd = 1;
    } else {
      turtEnd = 0;
    }
  }
  for (let i = 0; i < fish.length; i++) {
    if (fish[i].alive == true) {
      fishEnd = 1;
    } else {
      fishEnd = 0;
    }
  }
  for (let i = 0; i < raccoons.length; i++) {
    if (raccoons[i].alive == true) {
      racEnd = 1;
    } else {
      racEnd = 0;
    }
  }
  for (let i = 0; i < sharks.length; i++) {
    if (sharks[i].alive == true) {
      sharkEnd = 1;
    } else {
      sharkEnd = 0;
    }
  }
  // if (turtEnd == 0) {
  //   fill("grey");
  //   rect(0, 0, 1200, 950);
  // }
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
  pop();
  push();
  imageMode(CENTER);
  // swimD.play();
  // swimL.play();
  // swimR.play();
  // swimU.play();
  // groundL.play();
  // groundR.play();
  myPerson.display();
  if (keyIsDown(83) && myPerson.y < 730) {
    //down
    myPerson.d = "down";
    myPerson.y += personSpeed;
  }
  if (keyIsDown(87) && myPerson.y > 50) {
    //up
    myPerson.d = "up";
    myPerson.y -= personSpeed;
  }
  if (keyIsDown(65) && myPerson.x > 50) {
    //move right
    myPerson.d = "left";
    walkFlag = 1;
    myPerson.x -= personSpeed;
  }
  if (keyIsDown(68) && myPerson.x < 1150) {
    //move right
    myPerson.d = "right";
    walkFlag = 0;
    myPerson.x += personSpeed;
  }
  if (myPerson.y < 525) {
    myPerson.state = "swim";
  } else if (myPerson.y >= 500) {
    myPerson.state = "walk";
  }
  pop();
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

  // TRIGGER HAMMER GAME
  // console.log(myPerson.x);
  if (myPerson.x >= 1145 && myPerson.y >= 650 && !gameOver) {
    startFlag = 2;
  }

  //TRIGGER AR GAME
  if (myPerson.x <= 250 && myPerson.y >= 650) {
    startFlag = 3;
  }

  //Trigger egg ar game
  if (myPerson.x <= 250 && myPerson.y <= 250 && !eggGameOver) {
    startFlag = 4;
  }

  // TRIGGER FISHING GAME
  // console.log(startFlag);
  if (myPerson.x >= 1037 && myPerson.y >= 65 && myPerson.y <= 110) {
    startFlag = 5;
  }
}

//AR GAME FUNCTIONS =======
function modelReady() {
  readyToGo = true;
}
function classifyVideo() {
  flippedVideo = ml5.flipImage(capture);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  label = results[0].label;
  // console.log("label", label);
  classifyVideo();
}

function eggGame() {
  let eggIntroEle = document.getElementById("eggIntro");
  if (eggStart <= 200) {
    image(ocean, 0, 0, 1200, 800);
    eggIntro = createElement(
      "p",
      "REDIRECTING... You found a surprise ONE TIME game! <br>Catch at least 8 eggs before losing 5 eggs!<br><br> RIASE only your RIGHT HAND to let the basket move RIGHT <br><br> Raise only your LEFT HAND for the basket to move LEFT.<br><br>Win to get 200 Coins! <br>"
    );
    eggIntro.id("eggIntro");
    eggIntro.parent("#container");
    eggIntro.position(350, 300);
    eggStart++;
  } else if (eggStart > 200) {
    eggIntroEle = document.getElementById("eggIntro");
    if (eggIntroEle != null) {
      eggIntroEle.remove();
    }
  }
  if (eggIntroEle == null && eggStart > 200) {
    background(0);
    // Draw the video
    imageMode(CORNER);
    if (readyToGo) {
      image(flippedVideo, 0, 0);

      // Draw the label
      fill(255);
      textSize(16);
      textAlign(CENTER);
      text(label, width / 2, height - 4);

      mybasket.display();
      mybasket.move();
      mybasket.checkCollision();
      if (frameCount % 50 == 0) {
        let tmpFallegg = new Fallegg();
        fallEggs.push(tmpFallegg);
      }
      for (let e = 0; e < fallEggs.length; e++) {
        if (loseCounter < 5) {
          fallEggs[e].display();
          fallEggs[e].move();
        }
        if (fallEggs[e].y > 800) {
          fallEggs.splice(e, 1);
          e -= 1;
          loseCounter += 1;
        }
        // if(fallEggs[e].loseFlag == 1){
        //   loseCounter+=1;
        // }
      }
      fill(255, 255, 255);
      if (loseCounter >= 5) {
        if (fallPoints >= 5) {
          //won the game
          console.log("fall");
          eggLost = 0;
          textSize(38);
          text("GAME OVER! YOU WON 200 COINS!", 500, height / 2);
          eggCount += 1;
          if (eggCoin == 0) {
            coins += 200;
            eggCoin = 1;
          }
          tmpLose = 1;
        } else if (fallPoints < 5) {
          //lost the game
          console.log("nofall");
          eggLost = 1;
          textSize(38);
          text("GAME OVER! YOU LOST! ", 500, height / 2);
          eggCount += 1;
          tmpLose = 1;
        }
        if (eggCount >= 100) {
          clear();

          // eggInstruction.remove();
          myPerson.x = 800;
          myPerson.y = 550;
          eggGameOver = true;
          startFlag = 1;
        }
      }
      textSize(18);
      text("Eggs Caught:" + fallPoints, 100, 20);
      text("Eggs Lost:" + loseCounter, 100, 40);
      // if (tmpj == 0) {
      //   eggInstruction = createElement(
      //     "p",
      //     "Congratulations! You found a surprise ONE TIME game! <br>Catch at least 8 eggs before losing 5 eggs!<br><br> RIASE only your RIGHT HAND to let the basket move RIGHT and only your LEFT HAND for the basket to move LEFT.<br><br>Win to get 200 Coins! <br>"
      //   );

      //   eggInstruction.parent("#arfall");
      //   tmpj += 1;
      // }
    } else {
      textSize(50);
      textAlign(CENTER);
      fill(255);
      text("Video Loading", width / 2, height / 2);
    }
  }
}

function ARgame() {
  let arIntroEle = document.getElementById("arIntro");
  if (arStart <= 120) {
    image(ocean, 0, 0, 1200, 800);
    arIntro = createElement(
      "p",
      "REDIRECTING... <br>For around 60 seconds, <br>avoid the raccons to eat all the eggs by:<br> using your nose to bounce back the raccons!<br><br> If there are still eggs left after 60 seconds,<br> you get 50 coins!"
    );
    arIntro.id("arIntro");
    arIntro.parent("#container");
    arIntro.position(400, 300);
    arStart++;
  } else if (arStart > 120) {
    arIntroEle = document.getElementById("arIntro");
    if (arIntroEle != null) {
      arIntroEle.remove();
    }
  }
  if (arIntroEle == null && arStart > 120) {
    let arIntroEle = document.getElementById("arIntro");
    if (arIntroEle != null) {
      arIntroEle.remove();
    }
    background(0);
    imageMode(CORNER);
    // image(capture, 0, 0, 1200, 800);

    if (readyToGo) {
      image(capture, 0, 0, 1200, 800);

      fill(255, 255, 0);

      if (poses.length > 0 && poses[0].pose.nose) {
        let noseX = poses[0].pose.nose.x;
        let noseY = poses[0].pose.nose.y;

        fill(0, 0, 255);
        ellipse(noseX, noseY, 50, 50);
        for (let num1 = 0; num1 < arRacs.length; num1++) {
          if (dist(noseX, noseY, arRacs[num1].x, arRacs[num1].y) < 40) {
            if (arRacs[num1].direction == "right") {
              arRacs[num1].x += random(30, 60);
              arRacs[num1].y += random(-10, 10);
            } else if (arRacs[num1].direction == "left") {
              arRacs[num1].x -= random(50, 90);
              arRacs[num1].y += random(-20, 20);
            }
          }
        }
      }

      // arInstruction.position(10, 830);
      fill(0, 0, 0);
      currentTime += 1;
      if (currentTime % 25 == 0) {
        realCurrTime += 1;
      }
      textSize(18);
      tmpTime = timeLimit - realCurrTime;
      if (tmpTime < 0) {
        tmpTime = 0;
      }
      text("TIME LEFT:" + tmpTime, 10, 20);
      // console.log("num", arEggs.length);
      fill(255, 255, 255);
      if (tmpTime <= 0) {
        tmpTime = 0;
        if (arEggs.length > 0) {
          arRacs = [];
          textSize(38);
          if (arcion == 0) {
            coins += 50;
            arcion = 1;
          }
          tmpCount += 1;
          text("GAME OVER! YOU WON 50 COINS!", 400, height / 2);
        } else if (arEggs.length <= 0) {
          arEggs = [];
          arRacs = [];
          textSize(38);
          tmpCount += 1;
          text("GAME OVER! YOU LOST!", 450, height / 2);
        }
        if (tmpCount >= 100) {
          arEggs = [];
          arRacs = [];
          clear();

          myPerson.x = 800;
          myPerson.y = 550;
          startFlag = 1;
        }
      }
      push();
      imageMode(CENTER);
      for (let j = 0; j < arEggs.length; j++) {
        if (arEggs[j].isAlive == false) {
          arEggs.splice(j, 1);
          j -= 1;
        } else if (arEggs[j].isAlive == true) {
          arEggs[j].display();
        }
      }
      for (let i = 0; i < arRacs.length; i++) {
        arRacs[i].display();
        arRacs[i].moveAR();
        arRacs[i].checkCollisionAR();
        // arRacs[i].checkCollision();
        // if (arRacs[i].alive == false) {
        //   arRacs.splice(i, 1);
        //   i -= 1;
        // }
      }

      // if (tmpi == 0) {
      //   arInstruction = createElement(
      //     "p",
      //     "For around 60 seconds, avoid the raccons to eat all the eggs by using your nose to bounce back the raccons!<br><br> If there are still eggs left after 60 seconds, you get 50 coins!"
      //   );

      //   arInstruction.parent("#arins");
      //   tmpi += 1;
      // }
    } else {
      textSize(50);
      textAlign(CENTER);
      fill(255);
      text("Video Loading", width / 2, height / 2);
    }
  }
}

function hammerGame() {
  image(ocean, 0, 0, 1200, 800);

  if (hammerStart <= 120) {
    hammerIntro = createElement(
      "h2",
      "Redirecting to Whack-A-Raccoon! <br>You found a surprise one-time game!<br>You have 20 seconds.<br>Each Score = 50 Coins<br><br>Ready... GO!"
    );
    hammerIntro.id("hammerIntro");
    hammerIntro.parent("#container");
    hammerIntro.position(300, 300);
    hammerStart++;
  } else {
    let hammerIntroEle = document.getElementById("hammerIntro");
    if (hammerIntroEle != null) {
      hammerIntroEle.remove();
    }
    hammerStart++;
    if (hammerStart >= 300) {
      hammerRealStart = true;
    }

    if (hammerRealStart) {
      noStroke();
      fill("black");
      textSize(40);
      text("Score: ", 40, 100);
      text(score, 180, 100);
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
        if (mouseY <= 750) {
          image(hammer, mouseX - 30, mouseY - 50, 200, 100);
        }

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
        textSize(50);
        text("TIME'S UP!", 470, 300);
        text("Coins you have earned:", 300, 400);
        text(50 * score, 830, 400);

        hammerEnd += 1;
      }
      if (hammerEnd >= 180) {
        coins += score * 50;
        startFlag = 1;
      }
    }
  }
}

function fishingGame() {
  image(ocean, 0, 0, 1200, 800);

  if (fishingStart <= 160) {
    fishingIntro = createElement(
      "h2",
      "Redirecting to Fishing Game!<br>Click the mouse to fish!<br>You have 20 seconds. <br> Each fish you caught = 50 coins.<br><br>Ready... GO!"
    );
    fishingIntro.id("fishingIntro");
    fishingIntro.parent("#container");
    fishingIntro.position(400, 270);
    fishingStart++;
  } else {
    let fishingIntroEle = document.getElementById("fishingIntro");
    if (fishingIntroEle != null) {
      fishingIntroEle.remove();
    }
    fishingStart++;
    if (fishingStart >= 360) {
      fishingRealStart = true;
    }
  }

  if (fishingRealStart) {
    // POINTS
    if (fishingPlaying) {
      let temp = 0;
      for (let i = 0; i < yellows.length; i++) {
        if (yellows[i].caught) {
          temp++;
        }
      }
      fishingPoint = temp;
    }

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
      if (d <= 20 && fishingPlaying) {
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

    // GAME OVER
    if (!fishingPlaying) {
      textSize(50);
      text("TIME'S UP!", 470, 300);
      text("Coins you have earned:", 300, 400);
      text(50 * fishingPoint, 830, 400);

      fishingEnd += 1;

      if (fishingEnd >= 180) {
        coins += 50 * fishingPoint;
        fishingPoint = 0;
        fishingStart = 0;
        fishingPlaying = true;
        fishingRealStart = false;
        fishingEnd = 0;
        fishingTimer = 20;
        myPerson.x = 800;
        myPerson.y = 200;
        hookEndY = hookY;
        hookNowY = hookY;
        startFlag = 1;
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

// egg game classes
class Basket {
  constructor() {
    this.x = 400;
    this.y = 600;
  }
  display() {
    image(basket, this.x, this.y, 200, 200);
  }
  move() {
    if (label == "left") {
      if (this.x >= 0) {
        this.x -= 5;
      }
    } else if (label == "right") {
      if (this.x <= 1000) {
        this.x += 5;
      }
    }
  }
  checkCollision() {
    for (let i = 0; i < fallEggs.length; i++) {
      if (
        fallEggs[i].x >= this.x &&
        fallEggs[i].x <= this.x + 180 &&
        fallEggs[i].y > 600
      ) {
        // console.log("EGG CAUGHT");
        fallEggs.splice(i, 1);
        i -= 1;
        fallPoints += 1;
      }
    }
  }
}
class Fallegg {
  constructor() {
    this.x = random(5, 700);
    this.y = random(-120, -50);
    this.loseFlag = 0;
  }
  display() {
    image(egg, this.x, this.y, 100, 100);
  }
  move() {
    this.y += 5;
  }
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
      //console.log("button press");
      if (coins - this.price < 0 || coins == 0) {
        coinFlag = 1;
      } else if (coins - this.price > 0) {
        coinFlag = 0;
      }
      if (coinFlag == 0) {
        coins -= this.price;
        if (this.type == "turt") {
          //console.log("what");
          turtCount += 1;
          let turtBut = new Turtle(0);
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

    // strokeWeight(1);
    // rect(this.x + 25, this.y + 10, 30, 30);
    // stroke("purple");
    // strokeWeight(10);
    // point(this.x + 40, this.y + 30);
  }

  move() {
    if (!this.newBorn) {
      this.moveXAmount = map(noise(this.noiseXLoc), 0, 1, -1, 1);
      this.moveYAmount = map(noise(this.noiseYLoc), 0, 1, -2, 2);
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

class Person {
  constructor(d) {
    this.d = d;
    this.state = "walk";
    this.x = 800;
    this.y = 550;
    this.currentFrame = 0;
    this.currentFrame1 = 0;
    this.currentFrame2 = 0;
    this.currentFrame3 = 0;
    this.currentFrame4 = 0;
    this.currentFrame5 = 0;
  }
  display() {
    if (this.state == "walk") {
      if (this.d == "right") {
        groundR.setFrame(this.currentFrame);
        this.currentFrame += 1;
        if (this.currentFrame > groundR.numFrames() - 1) {
          this.currentFrame = 0;
        }
        image(groundR, this.x, this.y, 150, 150);
      } else if (this.d == "left") {
        groundL.setFrame(this.currentFrame1);
        this.currentFrame1 += 1;
        if (this.currentFrame1 > groundL.numFrames() - 1) {
          this.currentFrame1 = 0;
        }
        image(groundL, this.x, this.y, 160, 150);
      } else {
        if (walkFlag == 1) {
          groundL.setFrame(this.currentFrame1);
          this.currentFrame1 += 1;
          if (this.currentFrame1 > groundL.numFrames() - 1) {
            this.currentFrame1 = 0;
          }
          image(groundL, this.x, this.y, 160, 150);
        } else if (walkFlag == 0) {
          groundR.setFrame(this.currentFrame);
          this.currentFrame += 1;
          if (this.currentFrame > groundR.numFrames() - 1) {
            this.currentFrame = 0;
          }
          image(groundR, this.x, this.y, 150, 150);
        }
      }
    } else if (this.state == "swim") {
      //console.log(swimU.numFrames());
      if (this.d == "up") {
        swimU.setFrame(this.currentFrame2);
        this.currentFrame2 += 1;
        if (this.currentFrame2 > swimU.numFrames() - 1) {
          this.currentFrame2 = 0;
        }
        image(swimU, this.x, this.y, 170, 170);
      } else if (this.d == "down") {
        swimD.setFrame(this.currentFrame3);
        this.currentFrame3 += 1;
        if (this.currentFrame3 > swimD.numFrames() - 1) {
          this.currentFrame3 = 0;
        }
        image(swimD, this.x, this.y, 170, 170);
      }
      if (this.d == "left") {
        swimL.setFrame(this.currentFrame4);
        this.currentFrame4 += 1;
        if (this.currentFrame4 > swimL.numFrames() - 1) {
          this.currentFrame4 = 0;
        }
        image(swimL, this.x, this.y, 170, 170);
      }
      if (this.d == "right") {
        swimR.setFrame(this.currentFrame5);
        this.currentFrame5 += 1;
        if (this.currentFrame5 > swimR.numFrames() - 1) {
          this.currentFrame5 = 0;
        }
        image(swimR, this.x, this.y, 170, 170);
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
      // stroke("red");
      // strokeWeight(2);
      // point(this.x + 130, this.y + 40);
      // rect(this.x + 100, this.y + 10, 60, 60);
    } else if (this.d == "left") {
      image(sharkL, this.x, this.y, 150, 75);
      // stroke("red");
      // strokeWeight(10);
      // // rect(this.x + 15, this.y - 35, 50, 50);
      // point(this.x + 45, this.y + 45);
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

    if (this.y >= 400) {
      this.y = 400;
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

class ARegg {
  build() {
    this.isAlive = true;
    this.x = random(40, 1000);
    this.y = random(40, 660);
  }
  display() {
    image(egg, this.x, this.y, 30, 30);
  }
}
class Raccoon {
  constructor(direction) {
    this.direction = direction;
    // NEW NEW

    this.noiseXLoc = random(2000, 3000);
    this.noiseYLoc = random(3000, 4000);

    if (this.direction == "left") {
      this.y = 600;
      this.x = 11;
    } else if (this.direction == "right") {
      this.x = 1200;
      this.y = 600;
    }
    this.arFlag = 0;
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
    if (this.arFlag == 0) {
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
    }
    if (this.lives == 0) {
      this.alive = false;
    }
  }
  moveAR() {
    let moveXAmount = map(noise(this.noiseXLoc), 0, 1, 2, 4);
    let moveYAmount = map(noise(this.noiseYLoc), 0, 1, -4, 5);
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
    if (this.x <= -100) {
      this.x = 1200;
      this.direction = "right";
    }
    if (this.y <= 30) {
      this.y = 30;
    }
    if (this.y >= 670) {
      this.y = 670;
    }
    this.noiseXLoc += 0.01;
    this.noiseYLoc += 0.01;
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
  checkCollisionAR() {
    for (let n = 0; n < arEggs.length; n++) {
      let disA;
      //different mouth directoins
      if (this.direction == "right") {
        disA = dist(this.x - 40, this.y - 10, arEggs[n].x + 3, arEggs[n].y - 5);
      } else if (this.direction == "left") {
        disA = dist(this.x + 40, this.y - 10, arEggs[n].x + 3, arEggs[n].y - 5);
      }

      if (disA <= 40) {
        // console.log(disA);
        arEggs[n].isAlive = false;
      }
    }
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
    // console.log("IN TURTLE BORN");
    if (this.isAlive) {
      if (this.birthTime % this.bornTime == 0) {
        // console.log("BORN");
        turtCount += 1;
        turtles.push(new Turtle(1, this.x, this.y));
        this.isAlive = false;
      }
      this.birthTime += 1;
    }
  }
}

function gameStart() {
  // console.log("hi");
  startFlag = 1;
  // storeItem("startFlag", 0);
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
