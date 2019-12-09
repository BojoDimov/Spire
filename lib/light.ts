import { PointLight, Geometry, LineBasicMaterial } from 'three';

export class LightWithBody {
  light: PointLight;
  geometry: Geometry;
  material: LineBasicMaterial = new LineBasicMaterial({ color: 0x59FF8D });

  constructor(intensity: number, distance: number) {
    this.light = new PointLight(0xffffff, intensity, distance, 2);
  }

  setPosition(x: number, y: number, z: number) {
    this.light.position.set(x, y, z);
  }

  objects() {
    return [this.light];
  }
}