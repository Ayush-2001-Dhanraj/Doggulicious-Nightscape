/** @type {HTMLCanvasElement} */

import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemy.js";
import { UI } from "./ui.js";

const gameModeInfoTxt = ["Slowest speed", "Faster speed", "Fastest game speed"];

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1300;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.gameMargin = 80;
      this.mode = 0;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.enemySponInterval = 1000;
      this.debug = true;
      this.score = 0;
      this.fontColor = "black";
      this.UI = new UI(this);
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      this.maxParticles = 200;
      this.timer = 80000;
      this.gameOver = false;
      this.lives = 5;
      this.pause = true;
    }
    update(deltaTime) {
      if (this.pause) return;
      if (this.timer < 0) {
        this.timer = 0;
        this.gameOver = true;
      } else this.timer -= deltaTime;

      this.background.update();
      this.player.update(this.input.keys, deltaTime);

      if (this.enemyTimer > this.enemySponInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else this.enemyTimer += deltaTime;

      // update elements on canvas

      this.enemies.forEach((enemy) => enemy.update(deltaTime));

      this.particles.forEach((particle) => particle.update());

      this.collisions.forEach((col) => col.update(deltaTime));

      this.floatingMessages.forEach((fm) => fm.update());

      // remove removable elements

      this.enemies = this.enemies.filter((e) => !e.markedForRemoval);
      this.particles = this.particles.filter((p) => !p.markedForRemoval);
      this.collisions = this.collisions.filter((c) => !c.markedForRemoval);
      this.floatingMessages = this.floatingMessages.filter(
        (fm) => !fm.markedForRemoval
      );

      // limit max particles on the screen

      if (this.particles.length > this.maxParticles)
        this.particles.length = this.maxParticles;
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);

      this.enemies.forEach((enemy) => enemy.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.collisions.forEach((col) => col.draw(context));
      this.floatingMessages.forEach((fm) => fm.draw(context));

      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() > 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver && !game.pause) requestAnimationFrame(animate);
  }

  const startGameBtn = document.getElementById("startGameBtn");
  const gameMode = document.getElementsByName("mode");
  const modeInfo = document.getElementById("modeInfo");
  modeInfo.textContent = gameModeInfoTxt[0];
  const introContainer = document.getElementById("introContainer");

  gameMode.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      game.mode = this.value;
      game.maxSpeed = parseInt(this.value * 4) || 5;
      modeInfo.textContent = gameModeInfoTxt[this.value];
    });
  });

  startGameBtn.addEventListener("click", () => {
    game.pause = false;
    introContainer.style.display = "none";
    animate(0);
  });
});
