import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import { Player } from './player/player';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    create,
    update
  }
};

const keys = {}

const game = new Phaser.Game(config);
const player = new Player();
let graphics

function create() {
  graphics = this.add.graphics();
  keys['W'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keys['A'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keys['S'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keys['D'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

function clear() {
  graphics.fillStyle(0x000000);
  graphics.fillRect(0, 0, 800, 600);
}

function update() {
  clear();
  player.move(keys);
  player.draw(graphics);
}
