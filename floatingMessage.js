export class FloatingMessage {
  constructor(value, x, y, targetX, targetY) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.timer = 0;
    this.markedForRemoval = false;
  }
  update() {
    this.x += (this.targetX - this.x) * 0.003;
    this.y += (this.targetY - this.y) * 0.003;
    this.timer += 1;
    if (this.timer > 100) this.markedForRemoval = true;
  }
  draw(context) {
    context.font = "20px Creepster";
    context.fillStyle = "black";
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = "white";
    context.fillText(this.value, this.x + 2, this.y + 2);
  }
}
