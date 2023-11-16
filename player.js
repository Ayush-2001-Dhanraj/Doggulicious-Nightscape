import { Sitting, Running, Jumping, Falling } from "./states.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.image = player;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.gameMargin;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 1;
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);

    // movements for x
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;

    this.x += this.speed;

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    // boundaries for x movement
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // sprite animations
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrames) this.frameX = 0;
      else this.frameX += 1;
    } else this.frameTimer += deltaTime;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.gameMargin;
  }
  setState(stateIndex, speed) {
    this.currentState = this.states[stateIndex];
    this.frameX = 0;
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
}
