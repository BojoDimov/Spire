export class Player {
  x = 350;
  y = 400;
  width = 100;
  height = 100;

  color = 0x67DBFF;

  move(keys) {
    if (keys['W'].isDown) {
      this.y += -5;
    }

    if (keys['A'].isDown) {
      this.x += -5;
    }

    if (keys['S'].isDown) {
      this.y += 5;
    }

    if (keys['D'].isDown) {
      this.x += 5;
    }
  }

  draw(graphics) {
    graphics.fillStyle(0x67DBFF);
    graphics.fillRect(this.x, this.y, this.width, this.height);
  }
}
