import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4BDCFF });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
renderer.setClearColor(new THREE.Color(49, 46, 46), 1);

camera.position.z = 5;
let velX = 0;
let velY = 0;

function main() {
  requestAnimationFrame(main);
  if (velX > 0)
    velX -= .01;
  if (velX < 0)
    velX += .01;

  cube.position.x += .1 * velX;
  renderer.render(scene, camera);
}

main();

document.addEventListener('keydown', keyboardManager);

let lastKey = null;

function keyboardManager(input: KeyboardEvent) {
  if (input.code === 'KeyA') {
    //cube.position.x += 0.1 * velX;
    if (lastKey === 'KeyA')
      velX -= .1;
    else
      velX -= .5;
    lastKey = 'KeyA';
  }
  if (input.code === 'KeyD') {
    //cube.position.x += 0.1 * velX;
    if (lastKey === 'KeyD')
      velX += .1;
    else
      velX += .5;
    lastKey = 'KeyD';
  }
}