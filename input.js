export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.touchY = 0;
    this.touchX = 0;
    this.swipeThreshold = 30;
    this.mobileAttackBtn = document.getElementById("attactBtn");

    this.mobileAttackBtn.addEventListener("click", () => {
      if (this.keys.indexOf(" ") === -1) this.keys.push(" ");
      else {
        this.keys.splice(this.keys.indexOf(" "), 1);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      )
        this.keys.push(e.key);
      if (e.key === "d") this.game.debug = !this.game.debug;
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === " "
      )
        this.keys.splice(this.keys.indexOf(e.key), 1);
    });
    window.addEventListener("touchstart", (e) => {
      this.touchY = e.changedTouches[0].pageY;
      this.touchX = e.changedTouches[0].pageX;
    });
    window.addEventListener("touchmove", (e) => {
      const distanceY = e.changedTouches[0].pageY - this.touchY;
      const distanceX = e.changedTouches[0].pageX - this.touchX;
      if (
        distanceY < -this.swipeThreshold &&
        this.keys.indexOf("swipeUp") === -1
      ) {
        this.keys.push("swipeUp");
      } else if (
        distanceY > this.swipeThreshold &&
        this.keys.indexOf("swipeDown") === -1
      ) {
        this.keys.push("swipeDown");
      }

      if (
        distanceX < -this.swipeThreshold &&
        this.keys.indexOf("swipeLeft") === -1
      ) {
        this.keys.push("swipeLeft");
      } else if (
        distanceX > this.swipeThreshold &&
        this.keys.indexOf("swipeRight") === -1
      ) {
        this.keys.push("swipeRight");
      }
    });
    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("swipeUp"), 1);
      this.keys.splice(this.keys.indexOf("swipeDown"), 1);
      this.keys.splice(this.keys.indexOf("swipeLeft"), 1);
      this.keys.splice(this.keys.indexOf("swipeRight"), 1);
    });
  }
}
