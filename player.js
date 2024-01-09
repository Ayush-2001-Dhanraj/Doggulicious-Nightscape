import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessage.js";
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Dizzy,
} from "./states.js";

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
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Dizzy(this.game),
    ];
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(input, deltaTime) {
    // check for collisions
    this.checkCollisions();

    this.currentState.handleInput(input);

    // movements for x
    if (input.includes("ArrowRight") && this.currentState !== this.states[6])
      this.speed = this.maxSpeed;
    else if (
      input.includes("ArrowLeft") &&
      this.currentState !== this.states[6]
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;

    this.x += this.speed;

    // boundaries for x movement
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // movement for y

    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    // boundary for y

    if (this.y > this.game.height - this.game.gameMargin - this.height)
      this.y = this.game.height - this.game.gameMargin - this.height;

    // sprite animations
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrames) this.frameX = 0;
      else this.frameX += 1;
    } else this.frameTimer += deltaTime;
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
  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        this.x < enemy.x + enemy.width &&
        this.x + this.width > enemy.x &&
        this.y < enemy.y + enemy.height &&
        this.y + this.height > enemy.y
      ) {
        // collision
        // remove enemy player collided with
        enemy.markedForRemoval = true;
        this.game.collisions.unshift(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        // if player was in scoring state
        // increase score
        if (
          this.currentState == this.states[4] ||
          this.currentState == this.states[5]
        ) {
          this.game.score += 1;
          this.game.floatingMessages.unshift(
            new FloatingMessage("+1 🦴", enemy.x, enemy.y, 0, 0)
          );
        }
        // player collided but not in a scoring state
        // decrese player life
        else {
          this.setState(6, 0);
          this.game.lives -= 1;
          if (this.game.lives <= 0) this.game.gameOver = true;
          this.game.floatingMessages.unshift(
            new FloatingMessage("-1 ❤", enemy.x, enemy.y, 0, 0)
          );
        }
      }
    });
  }
}
