import { FlyingEnemy } from "./enemy.js";

export const introAnimation = () => {
  // info modal canvas(s)
  const upperCanvas = document.getElementById("upperCanvas");
  const lowerCanvas = document.getElementById("lowerCanvas");

  // info modal ctx(s)
  const upperCtx = upperCanvas.getContext("2d");
  const lowerCtx = lowerCanvas.getContext("2d");

  const playerImage = player;
  const playerwidth = 100;
  const playerHeight = 91.3;
  const playerSizeModifier = 0.5;
  let frameX = 0;
  let frameY = 3;
  let x = 0;
  let speedX = Math.random() * 1 + 1;
  let y = upperCanvas.height - playerHeight * playerSizeModifier;
  let lastTime = 0;
  let fps = 20;
  let frameInterval = 1000 / fps;
  let frameTimer = 0;
  let maxFrames = 8;
  let enemyTimer = 0;
  let enemySponInterval = 750;
  let enemies = [];

  function animateIntroCanvas(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    // animate player

    // movement along X axis
    x += speedX;

    if (x >= upperCanvas.width) {
      x = -playerwidth;
    }

    // update frames
    if (frameTimer > frameInterval) {
      frameTimer = 0;
      if (frameX >= maxFrames) frameX = 0;
      else frameX += 1;
    } else frameTimer += deltaTime;

    // add new enemy
    if (enemyTimer > enemySponInterval) {
      enemyTimer = 0;
      const enemyCanvasData = {
        speed: Math.random() * 0.5 + 0.1,
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

    upperCtx.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
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
    lowerCtx.clearRect(0, 0, upperCanvas.width, upperCanvas.height);

    enemies.forEach((enemy) => enemy.update(deltaTime));
    enemies = enemies.filter((e) => !e.markedForRemoval);

    enemies.forEach((enemy) => enemy.draw(lowerCtx));

    // animate enemies

    requestAnimationFrame(animateIntroCanvas);
  }

  animateIntroCanvas(0);
};
