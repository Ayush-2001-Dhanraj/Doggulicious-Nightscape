export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = boom;
    this.sizeModifier = Math.random() * 0.5 + 0.2;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.width * 0.5;
    this.frameX = 0;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.maxFrames = 4;
    this.markedForRemoval = false;
    this.played = false;
    this.hit = new Audio();
    this.hit.src = "/assests/hit.wav";
    this.dizzy = new Audio();
    this.dizzy.src = "/assests/dizzy.wav";
  }
  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      if (
        this.game.player.currentState == this.game.player.states[6] &&
        !this.played
      ) {
        this.dizzy.play();
      } else if (!this.played) {
        this.hit.play();
      }
      this.played = true;
      this.frameTimer = 0;
      if (this.frameX > this.maxFrames) {
        this.markedForRemoval = true;
      } else this.frameX += 1;
    } else this.frameTimer += deltaTime;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
