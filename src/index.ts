import * as THREE from 'three';
import velocity from '../lib/velocity';
import { range } from '../lib/util';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { LightWithBody } from '../lib/light';
import { Tile } from './map/tile';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
scene.background = new THREE.Color('#261934');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const stats = new Stats();


const light = new LightWithBody(2, 150);//new THREE.PointLight(0xffffff, 25, 100);
light.setPosition(0, 40, 0);
scene.add(...light.objects());

camera.position.z = 25;
camera.position.y = 15;
camera.position.x = 0;
camera.lookAt(new THREE.Vector3(0, 0, -5));

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(stats.dom);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x4BDCFF });

const cubes = range(1, 1024)
  .map((_, index, arr: number[]) => {
    let obj = new THREE.Mesh(geometry, material);
    obj.position.x = (index % Math.sqrt(arr.length)) * 2 - Math.sqrt(arr.length) + 1;
    obj.position.z = Math.floor(index / Math.sqrt(arr.length)) * 2 - Math.sqrt(arr.length) + 1;
    return obj;
  });

scene.add(...cubes);


const lineMaterial1 = new THREE.LineBasicMaterial({ color: 0x312DB3 });
const lineMaterial2 = new THREE.LineBasicMaterial({ color: 0xFFA573 });
const lineMaterial3 = new THREE.LineBasicMaterial({ color: 0x50CC33 });

const xAxisGeometry = new THREE.Geometry();
const yAxisGeometry = new THREE.Geometry();
const zAxisGeometry = new THREE.Geometry();
xAxisGeometry.vertices.push(new THREE.Vector3(-10000, 0, 0));
xAxisGeometry.vertices.push(new THREE.Vector3(10000, 0, 0));
yAxisGeometry.vertices.push(new THREE.Vector3(0, -10000, 0));
yAxisGeometry.vertices.push(new THREE.Vector3(0, 10000, 0));
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -10000));
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, 10000));
const xAxis = new THREE.Line(xAxisGeometry, lineMaterial2);
const yAxis = new THREE.Line(yAxisGeometry, lineMaterial1);
const zAxis = new THREE.Line(zAxisGeometry, lineMaterial3);
// scene.add(xAxis);
// scene.add(yAxis);
// scene.add(zAxis);

// const uniforms = {
//   delta: 15 * Math.PI / 180
// };

// const customMat = new THREE.ShaderMaterial({
//   uniforms,
//   vertexShader: Tile.vertexShaderSource,
//   fragmentShader: Tile.fragmentShaderSource
// });

// const customGeom = new THREE.BoxBufferGeometry(1, 1, 1);
// const oscillator = new THREE.Mesh(customGeom, customMat);
// oscillator.position.set(0, 10, 0);
// scene.add(oscillator);

function main(time: number) {
  requestAnimationFrame(main);
  stats.update();
  cubes.forEach((cube, index) => {
    cube.position.y = 35 * Math.sin(index / cubes.length * 16 + (time + index) / 700) / 100;
  });
  renderer.render(scene, camera);
}

main(0);