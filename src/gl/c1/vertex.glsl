// 一个属性变量，将会从缓冲中获取数据
attribute vec2 a_position;
uniform vec2 u_resolution;

varying vec4 v_color;

vec2 trans2d(vec2 point) {
  vec2 x = a_position / u_resolution;
  vec2 x2 = x * 2.0;
  return x2 - 1.0;
}

// 所有着色器都有一个main方法
void main() {
  vec2 result = trans2d(a_position);
  gl_Position = vec4(result, 0, 1);
  v_color = gl_Position * 0.5 + 0.5;
}