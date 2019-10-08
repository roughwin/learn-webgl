import { createProgram, createShader, setViewPort } from '../common.js';
import vertexShaderSource from './vertex.glsl';
import fragmentShaderSource from './fragment.glsl';

export default function c1(canvas) {
  const gl = canvas.getContext('webgl');
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  var program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);
  setViewPort(gl);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.enableVertexAttribArray(positionAttributeLocation);

  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2;          // 每次迭代运行提取两个单位数据
  var type = gl.FLOAT;   // 每个单位的数据类型是32位浮点型
  var normalize = false; // 不需要归一化数据
  var stride = 0;        // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
  // 每次迭代运行运动多少内存到下一个数据开始点
  var offset = 0;        // 从缓冲起始位置开始读取
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  function randomDraw(gl) {
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // setRecatngle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
    setRecatngle(gl, 10, 20, gl.canvas.width / 2, gl.canvas.height / 2)
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  window.draw = function() {
    randomDraw(gl)
  }
  randomDraw(gl)
  // randomDraw(gl)
  // randomDraw(gl)
}



function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function setRecatngle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
 
  // 注意: gl.bufferData(gl.ARRAY_BUFFER, ...) 将会影响到
  // 当前绑定点`ARRAY_BUFFER`的绑定缓冲
  // 目前我们只有一个缓冲，如果我们有多个缓冲
  // 我们需要先将所需缓冲绑定到`ARRAY_BUFFER`
 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2]), gl.STATIC_DRAW);
}