import mat4 from "../../lib/tsm/mat4";
import vec3 from "../../lib/tsm/vec3";


export class Engine {
  backgroundColor = [49 / 255, 46 / 255, 46 / 255, 1.0];

  constructor(private gl: WebGLRenderingContext) { }

  loadShader(type: number, source: string) {
    // Create shader object
    const shader = this.gl.createShader(type);

    // Initialize shader with source code
    this.gl.shaderSource(shader, source);

    // Compile shader
    this.gl.compileShader(shader);

    // Compile-time error checking
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createProgram(vSource: string, fSource: string) {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fSource);

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('An error occurred compiling the program: ' + this.gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  }

  createRect(x: number, y: number, width: number, height: number) {
    // Create buffer
    const buffer = this.gl.createBuffer();

    // Select this buffer for the next buffer operations
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    // Create the positions for the vertices of the rectangle
    const posArr = [
      x - width / 2, y - height / 2,
      x + width / 2, y - height / 2,
      x + width / 2, y + height / 2,
      x - width / 2, y + height / 2
    ];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(posArr),
      this.gl.STATIC_DRAW);

    return {
      position: buffer
    };
  }

  initBuffers() {

    // Create a buffer for the square's positions.

    const positionBuffer = this.gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.

    const positions = [
      -1.0, 1.0,
      1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    this.gl.bufferData(this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }


  render(programInfo: ProgramInfo, buffers: { position: WebGLBuffer }) {
    this.gl.clearColor(
      this.backgroundColor[0],
      this.backgroundColor[1],
      this.backgroundColor[2],
      this.backgroundColor[3]);

    this.gl.clearDepth(1.0);                 // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Convert 45 degrees to radians
    const fieldOfView = 45 * Math.PI / 180;
    const aspectRation = (<HTMLCanvasElement>this.gl.canvas).clientWidth / (<HTMLCanvasElement>this.gl.canvas).clientHeight;

    // We want to see points whose distance is between [0.1, 100.0] from the camera
    const zNear = 0.1;
    const zFar = 100.0;

    const projectionMatrix = mat4.perspective(fieldOfView, aspectRation, zNear, zFar);
    const viewMatrix = new mat4().translate(new vec3([-0.0, 0.0, -6.0]));

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = this.gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
      this.gl.vertexAttribPointer(
        (<any>programInfo.attribLocations).vPos,
        numComponents,
        type,
        normalize,
        stride,
        offset);
      this.gl.enableVertexAttribArray(
        (<any>programInfo.attribLocations).vPos);
    }

    this.gl.useProgram(programInfo.program);
    this.gl.uniformMatrix4fv(
      (<any>programInfo.uniformLocations).projMat,
      false,
      new Float32Array(projectionMatrix.all()));
    this.gl.uniformMatrix4fv(
      (<any>programInfo.uniformLocations).viewMat,
      false,
      new Float32Array(viewMatrix.all()));

    {
      const offset = 0;
      const vertexCount = 4;
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
}

interface ProgramInfo {
  program: WebGLProgram,
  attribLocations: object;
  uniformLocations: object;
}