import { Engine } from "./engine/engine";

const vertexShaderSource = `
  attribute vec4 vPos;

  uniform mat4 projMat;
  uniform mat4 viewMat;

  void main(){
    gl_Position = projMat * viewMat * vPos;
  }
`;

const fragmentShaderSource = `
  void main(){
    gl_FragColor = vec4(113/255, 1.0, 241/255, 1.0);
  }
`;


function main() {
  const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const engine = new Engine(gl);
  const program = engine.createProgram(vertexShaderSource, fragmentShaderSource);

  const programInfo = {
    program,
    attribLocations: {
      vPos: gl.getAttribLocation(program, 'vPos')
    },
    uniformLocations: {
      projMat: gl.getUniformLocation(program, 'projMat'),
      viewMat: gl.getUniformLocation(program, 'viewMat')
    }
  };

  const rectBuffer = engine.initBuffers();
  engine.render(programInfo, rectBuffer);
}

window.onload = main;