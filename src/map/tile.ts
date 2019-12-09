export class Tile {
  static vertexShaderSource = `
  uniform float delta;

  void main(){
    vec4 mvPosition = modelViewMatrix * vec4(position.x, position.y + position.y * sin(delta), position.z, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
  `;

  static fragmentShaderSource = `
  void main(){
    gl_FragColor = vec4(0.75, 0.25, 1.0, 1.0);
  }
  `;
}