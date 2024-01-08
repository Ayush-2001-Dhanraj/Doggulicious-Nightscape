export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Creepster";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    context.shadowBlur = 0;

    // setting
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    // draw
    context.fillText("🦴: " + this.game.score, 20, 50);

    // timer display
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("🕕: " + (this.game.timer * 0.001).toFixed(1), 20, 80);

    // lives display
    for (let i = 0; i < this.game.lives; i++)
      context.drawImage(live, 25 * i + 20, 95, 25, 25);

    if (this.game.gameOver) {
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      context.textAlign = "center";
      if (this.game.score > 5) {
        context.fillText(
          "Boo---yahhh!!!!! ",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText(
          "What are creatures of night afraid of?? YOU!!! ",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.fillText(
          "Love at first Bite???? ",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText(
          "Nope!! Better luck next time. ",
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    context.restore();
  }
}
