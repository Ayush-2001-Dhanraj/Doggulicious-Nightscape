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
  let frameX = 0;
  let frameY = 3;
  let x = 0;
  let speedX = 1;
  let y = upperCanvas.height - playerHeight * 0.5;
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
    x += speedX;

    if (x >= upperCanvas.width) {
      x = -playerwidth;
    }

    if (frameTimer > frameInterval) {
      frameTimer = 0;
      if (frameX >= maxFrames) frameX = 0;
      else frameX += 1;
    } else frameTimer += deltaTime;

    upperCtx.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
    upperCtx.drawImage(
      playerImage,
      frameX * playerwidth,
      frameY * playerHeight,
      playerwidth,
      playerHeight,
      x,
      y,
      playerwidth * 0.5,
      playerHeight * 0.5
    );

    // animate enemies

    requestAnimationFrame(animateIntroCanvas);
  }

  animateIntroCanvas(0);
};
