precision mediump float;
// 纹理
uniform sampler2D u_image;
uniform vec2 u_textureSize;
uniform float u_kernel[9];
uniform float u_kernelWeight;

// 从顶点着色器传入的纹理坐标
varying vec2 v_texCoord;
 
void main() {
   // 在纹理上寻找对应颜色值
  vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
  vec4 colorSum = texture2D(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
    texture2D(u_image, v_texCoord + onePixel * vec2(0, -1)) * u_kernel[1] +
    texture2D(u_image, v_texCoord + onePixel * vec2(1, -1)) * u_kernel[2] +
    texture2D(u_image, v_texCoord + onePixel * vec2(-1, 0)) * u_kernel[3] +
    texture2D(u_image, v_texCoord + onePixel * vec2(0, 0)) * u_kernel[4] +
    texture2D(u_image, v_texCoord + onePixel * vec2(-1, 1)) * u_kernel[5] +
    texture2D(u_image, v_texCoord + onePixel * vec2(0, 1)) * u_kernel[6] +
    texture2D(u_image, v_texCoord + onePixel * vec2(1, 1)) * u_kernel[7];
    
  gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1.0);
}