/**
 * 着色器常用方法封装
 */

// 创建着色器
const _createShader = (gl, type, shaderSourceCode) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, shaderSourceCode);
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
      const error = gl.getShaderInfoLog(shader);
      console.log(`Failed to compile shader: ${error}`);
      alert(error);
      gl.deleteShader(shader);
      return;
  }
  return shader;
}

export const initShaders = (gl, vertex_shader, fragment_shader) => {
  const v_shader = _createShader(gl, gl.VERTEX_SHADER, vertex_shader);
  const f_shader = _createShader(gl, gl.FRAGMENT_SHADER, fragment_shader);
  if (!v_shader || !f_shader) {
      return;
  }
  const program = gl.createProgram();
  if (!program) {
      return;
  }
  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
      const error = gl.getProgramInfoLog(program);
      console.log(`Failed to link program: ${error}`);
      alert(error);
      gl.deleteProgram(program);
      gl.deleteShader(fragmentShader);
      gl.deleteShader(vertexShader);
      return;
  }
  gl.useProgram(program);
  gl.program = program;
  return program;
}
