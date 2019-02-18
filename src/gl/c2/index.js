import { createProgram, createShader } from '../common.js';
import vertexShaderSource from './vertex.glsl';
import fragmentShaderSource from './fragment.glsl';

const KERNELS = {
  edgeDetectKernel: [
    -1, -1, -1,
    -1, 8, -1,
    -1, -1, -1,
  ],
  guassianBlur: [
    1, 2, 1,
    2, 4, 2,
    1, 2, 1
  ],
  normal: [
    0,0,0,
    0,1,0,
    0,0,0,
  ]

}

export default function c(canvas) {
  var image = new Image();
  image.src = process.env.PUBLIC_URL + "/leaves.jpg";
  image.onload = function() {
    render(canvas, image);
  };
}

function computeKernelWeight(kernel) {
  const weight = kernel.reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
  return weight <= 0 ? 1 : weight;
}

export function render(canvas, image) {
  const gl = canvas.getContext('webgl');
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  const kernelLocation = gl.getUniformLocation(program, 'u_kernel[0]');
  const kernelWeightLocation = gl.getUniformLocation(program, 'u_kernelWeight');
  const textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize');

  gl.uniform2f(textureSizeLocation, image.width, image.height);

  
  const useKernel = KERNELS.normal;
  gl.uniform1fv(kernelLocation, useKernel);
  gl.uniform1f(kernelWeightLocation, computeKernelWeight(useKernel));
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setRectangle(gl, 0, 0, image.width, image.height);

  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0,
  ]), gl.STATIC_DRAW);

  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");


  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

  gl.enableVertexAttribArray(texcoordLocation);

  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  gl.vertexAttribPointer(
      texcoordLocation, size, type, normalize, stride, offset);

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  var primitiveType = gl.TRIANGLES;
  var count = 6;
  gl.drawArrays(primitiveType, 0, count);

}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}