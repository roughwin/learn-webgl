// 一个属性变量，将会从缓冲中获取数据
attribute vec2 a_position;
uniform vec2 u_resolution;

// 所有着色器都有一个main方法
void main() {
  // gl_Position 是一个顶点着色器主要设置的变量
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace, 0, 1);
}