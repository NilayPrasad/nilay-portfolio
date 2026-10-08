"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The "Kinetic Metal" background shader, ported from the reference build.
 *
 * A pair of full-screen triangles running a fragment shader that distorts
 * UV space through four octaves of sin/cos, samples three channels at
 * slightly offset phases to split the colour, then raises the result to a
 * high power so most of the frame stays near-black and only the crests
 * catch light. That power curve is what gives it the brushed-metal read.
 *
 * Uniform defaults match the reference exactly: speed 0.5, wave density 5,
 * contrast power 8, base #050505.
 */

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_colorScale;
uniform float u_frequency;
uniform vec3 u_baseColor;

vec2 distort(vec2 p, float offset) {
  p += offset;
  for (float i = 1.0; i < 4.0; i++) {
    p.x += 0.3 / i * sin(i * 3.0 * p.y + u_time);
    p.y += 0.3 / i * cos(i * 3.0 * p.x + u_time);
  }
  return p;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;

  float r = sin(distort(uv, 0.0).x * u_frequency) * 0.5 + 0.5;
  float g = sin(distort(uv, 0.02).x * u_frequency) * 0.5 + 0.5;
  float b = sin(distort(uv, 0.04).x * u_frequency) * 0.5 + 0.5;

  vec3 color = pow(vec3(r, g, b), vec3(u_colorScale));
  vec3 finalColor = mix(u_baseColor, color, 0.8);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function ShaderField({
  className = "",
  speed = 0.5,
  frequency = 5,
  colorScale = 8,
  /** Scales the whole canvas down. Useful behind body copy. */
  opacity = 1,
}: {
  className?: string;
  speed?: number;
  frequency?: number;
  colorScale?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Live params, so prop changes don't force a context rebuild.
  const params = useRef({ speed, frequency, colorScale });
  params.current = { speed, frequency, colorScale };
  // iOS drops WebGL contexts when the tab is backgrounded or memory runs
  // short. Bumping this rebuilds the program once the context comes back.
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onLost = (e: Event) => e.preventDefault();
    const onRestored = () => setEpoch((n) => n + 1);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    const unlisten = () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };

    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return unlisten;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return unlisten;

    const program = gl.createProgram();
    if (!program) return unlisten;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return unlisten;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      colorScale: gl.getUniformLocation(program, "u_colorScale"),
      frequency: gl.getUniformLocation(program, "u_frequency"),
      baseColor: gl.getUniformLocation(program, "u_baseColor"),
    };

    // Capped DPR: at 8x contrast the extra pixels buy nothing visible and
    // this runs full-bleed behind several sections at once. On touch it
    // drops to 1x, which keeps older iPhones smooth and looks the same.
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const dprCap = touch ? 1 : 1.5;

    // Reallocating the buffer clears it, so only do it when the pixel size
    // actually changes, not on every resize event iOS fires as the toolbar
    // moves.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (!w || !h || (w === canvas.width && h === canvas.height)) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let time = 0;
    let frame = 0;
    let visible = true;

    const draw = () => {
      time += params.current.speed * 0.015;
      gl.uniform1f(u.time, time);
      gl.uniform1f(u.colorScale, params.current.colorScale);
      gl.uniform1f(u.frequency, params.current.frequency);
      gl.uniform3f(u.baseColor, 0.0196, 0.0196, 0.0196);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Don't burn frames on a field that's scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "10%" }
    );
    io.observe(canvas);

    if (reduce) {
      draw();
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      unlisten();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [epoch]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#050505] ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-full w-full"
        style={{ opacity, pointerEvents: "none" }}
      />
    </div>
  );
}
