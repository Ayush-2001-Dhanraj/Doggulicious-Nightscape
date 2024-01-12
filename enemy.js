class Enemy {
  constructor(sizeModifier = 1) {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForRemoval = false;
    this.sizeModifier = sizeModifier;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrames) this.frameX = 0;
      else this.frameX += 1;
    } else this.frameTimer += deltaTime;

    if (this.x + this.width < 0) this.markedForRemoval = true;
  }
  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * this.sizeModifier,
      this.height * this.sizeModifier
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game, sizeModifier = 1) {
    super(sizeModifier);
    this.game = game;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.maxFrames = 4;
    this.speedX = 2;
    this.speedY = 0;
    this.width = 60;
    this.height = 44;
    this.image = fly;
    this.angle = 0;
    this.va = Math.random() * 0.2 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.game.gameMargin - this.height;
    this.maxFrames = 1;
    this.speedX = 0;
    this.speedY = 0;

    this.image = plant;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.x = this.game.width;
    this.y = Math.random() * 0.5 * this.game.height;
    this.maxFrames = 5;
    this.image = big_spider;
    this.width = 120;
    this.height = 144;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
  }
  update(deltaTime) {
    super.update(deltaTime);

    if (this.y > this.game.height - this.game.gameMargin - this.height)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForRemoval = true;
  }
  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width * 0.5, 0);
    context.lineTo(this.x + this.width * 0.5, this.y + 50);
    context.stroke();
  }
}
