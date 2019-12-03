import * as THREE from 'three';
import velocity from '../lib/velocity';
import { range } from '../lib/util';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 55;
camera.position.y = 30;
camera.position.x = 0;
camera.lookAt(new THREE.Vector3(0, 0, -5));

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4BDCFF });

const cubes = range(1, 1024)
  .map((_, index, arr: number[]) => {
    let obj = new THREE.Mesh(geometry, material);
    obj.position.x = index % Math.sqrt(arr.length) * 2 - Math.sqrt(arr.length);
    obj.position.z = index / Math.sqrt(arr.length) * 2 - Math.sqrt(arr.length);
    return obj;
  });

scene.add(...cubes);


function main() {
  requestAnimationFrame(main);
  renderer.render(scene, camera);
}

main();

// document.addEventListener('keydown', keyboardManager);

// function keyboardManager(inputEvent: KeyboardEvent) {
// }