import { FlyingEnemy } from "./enemy.js";

export const introAnimation = (game) => {
  // info modal canvas(s)
  const upperCanvas = document.getElementById("upperCanvas");
  const middleCanvas = document.getElementById("middleCanvas");
  const lowerCanvas = document.getElementById("lowerCanvas");

  // info modal ctx(s)
  const upperCtx = upperCanvas.getContext("2d");
  const middleCtx = middleCanvas.getContext("2d");
  const lowerCtx = lowerCanvas.getContext("2d");

  // player aka dog
  const playerImage = player;
  const playerwidth = 100;
  const playerHeight = 91.3;
  const playerSizeModifier = 0.5;
  let frameX = 0;
  let frameXSit = 0;
  let frameY = 3;
  let x = 0;
  let speedX = Math.random() * 1 + 1;
  let y = upperCanvas.height - playerHeight * playerSizeModifier;

  // middle canvas plant
  const plantEnemy = plant;
  const plantWidth = 60;
  const plantHeight = 87;
  const plantSizeModifier = 1.3;
  let frameXPlant = 0;

  // lower canvas enemies
  let enemyTimer = 0;
  let enemySponInterval = 750;
  let enemies = [];

  // frame update variables
  let lastTime = 0;
  let fps = 20;
  let frameInterval = 1000 / fps;
  let frameTimer = 0;
  let maxFrames = 8;

  function animateIntroCanvas(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    // animate player

    // movement along X axis
    x += speedX + game.mode * 0.7;

    if (x >= upperCanvas.width) {
      x = -playerwidth;
    }

    // update frames
    if (frameTimer > frameInterval) {
      frameTimer = 0;
      if (frameX >= maxFrames) frameX = 0;
      else if (frameXSit >= 4) frameXSit = 0;
      else if (frameXPlant >= 1) frameXPlant = 0;
      else {
        frameX += 1;
        frameXSit += 1;
        frameXPlant += 1;
      }
    } else frameTimer += deltaTime;

    // add new enemy
    if (enemyTimer > enemySponInterval) {
      enemyTimer = 0;
      const enemyCanvasData = {
        speed: Math.random() * 0.5 + 0.1 + game.mode * 0.7,
        debug: false,
        width: lowerCanvas.width,
        height: lowerCanvas.height * 0.5,
        gameMargin: 0,
      };
      let enemySizeModifier = Math.random() * 0.5 + 0.2;
      if (window.innerWidth < 430) {
        enemySizeModifier = Math.random() * 0.5 + 0.5;
      }
      enemies.push(new FlyingEnemy(enemyCanvasData, enemySizeModifier));
    } else enemyTimer += deltaTime;

    enemies.forEach((enemy) => enemy.update(deltaTime));
    enemies = enemies.filter((e) => !e.markedForRemoval);

    upperCtx.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
    middleCtx.clearRect(0, 0, middleCanvas.width, middleCanvas.height);
    lowerCtx.clearRect(0, 0, lowerCanvas.width, lowerCanvas.height);

    upperCtx.drawImage(
      playerImage,
      frameX * playerwidth,
      frameY * playerHeight,
      playerwidth,
      playerHeight,
      x,
      y,
      playerwidth * playerSizeModifier,
      playerHeight * playerSizeModifier
    );
    middleCtx.drawImage(
      plantEnemy,
      frameXPlant * plantWidth,
      0,
      plantWidth,
      plantHeight,
      middleCanvas.width * 0.6 - plantWidth * 0.5,
      middleCanvas.height - plantHeight * plantSizeModifier,
      plantWidth * plantSizeModifier,
      plantHeight * plantSizeModifier
    );
    middleCtx.drawImage(
      playerImage,
      frameXSit * playerwidth,
      5 * playerHeight,
      playerwidth,
      playerHeight,
      middleCanvas.width * 0.4 - playerwidth * 0.5,
      middleCanvas.height - playerHeight,
      playerwidth,
      playerHeight
    );
    enemies.forEach((enemy) => enemy.draw(lowerCtx));

    // animate enemies

    requestAnimationFrame(animateIntroCanvas);
  }

  animateIntroCanvas(0);
};
