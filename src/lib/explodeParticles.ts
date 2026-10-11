// Letras que se deshacen en puntos que salen volando. Sin dependencias de three/vue:
// los shaders son strings y el resto es matemática pura (probada en Node y en WebGL).
//
// Idea: el texto es una malla 3D. Para "explotar" se reparten miles de puntos sobre su superficie.
// Al subir `uProgress` (0 → 1) la malla se desvanece, los puntos nacen sobre las letras y salen
// disparados con una ola de izquierda a derecha, y se apagan al final. Bajar `uProgress` los
// hace volver (todo es función del progreso, así que es reversible y sirve para el scroll).

export const vertexShader = /* glsl */ `
uniform float uProgress;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2  uBoundsX;   // x mínima y máxima del texto (para la ola)
attribute vec3  aDir;     // dirección de salida
attribute float aSpeed;   // cuánto se aleja (unidades del mundo)
attribute float aRand;
varying float vAlpha;
varying float vTwinkle;

void main() {
  float p = clamp(uProgress, 0.0, 1.0);

  // ola de izquierda a derecha + azar: cada punto sale en su momento
  float wave  = (position.x - uBoundsX.x) / max(uBoundsX.y - uBoundsX.x, 0.0001);
  float delay = wave * 0.35 + aRand * 0.2;          // 0 .. 0.55
  float t     = clamp((p - delay) / 0.45, 0.0, 1.0); // 0 .. 1 para este punto
  float e     = 1.0 - pow(1.0 - t, 3.0);             // sale rápido y frena

  vec3 pos = position + aDir * aSpeed * e;
  // remolino suave mientras vuela
  float w = uTime * 1.3 + aRand * 40.0;
  pos += vec3(sin(w), cos(w * 1.2), sin(w * 0.7)) * (0.9 + aRand) * e;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position  = projectionMatrix * mv;
  // el tamaño crece al acercarse a la cámara, pero con tope (si no, la nube se funde en una mancha)
  gl_PointSize = min(uSize * uPixelRatio * (0.7 + aRand * 0.9) * (420.0 / -mv.z), 6.0 * uPixelRatio);

  // invisible en reposo (lo dibuja la malla); desde que arranca nace sobre la superficie y se apaga al final
  float started = step(0.0005, p);
  vAlpha   = started * (1.0 - smoothstep(0.55, 1.0, t));
  vTwinkle = 0.7 + 0.3 * sin(uTime * 8.0 + aRand * 60.0);
}
`;

export const fragmentShader = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
varying float vTwinkle;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;                 // punto redondo
  float a = smoothstep(0.5, 0.0, d);    // borde suave
  gl_FragColor = vec4(uColor * vTwinkle * 0.8, a * vAlpha);
}
`;

export interface ParticleOptions {
  center: [number, number, number]; // centro del texto
  half: [number, number, number]; // semi-extensiones del texto
  spread: number; // distancia máxima de salida (unidades del mundo)
  rnd?: () => number;
}

/** A partir de puntos muestreados sobre la superficie, calcula dirección, velocidad y azar de cada uno. */
export function buildParticleAttributes(samples: Float32Array, o: ParticleOptions) {
  const n = samples.length / 3;
  const rnd = o.rnd ?? Math.random;
  const dir = new Float32Array(n * 3);
  const speed = new Float32Array(n);
  const rand = new Float32Array(n);
  const g = () => (rnd() + rnd() + rnd()) / 1.5 - 1; // ~[-1, 1], concentrada al centro

  for (let i = 0; i < n; i++) {
    const x = samples[i * 3], y = samples[i * 3 + 1];
    const ox = (x - o.center[0]) / Math.max(o.half[0], 1e-3); // -1..1 a lo largo del texto
    const oy = (y - o.center[1]) / Math.max(o.half[1], 1e-3);
    // salen en todas direcciones (también en profundidad, con z positiva o negativa), con un empuje
    // hacia afuera del texto: así se ve bien desde cualquier ángulo de la cámara
    let dx = ox * 0.8 + g();
    let dy = oy * 0.5 + g() + 0.15;
    let dz = g();
    const l = Math.hypot(dx, dy, dz) || 1;
    dx /= l; dy /= l; dz /= l;
    dir[i * 3] = dx; dir[i * 3 + 1] = dy; dir[i * 3 + 2] = dz;
    const r = rnd();
    rand[i] = r;
    speed[i] = o.spread * (0.35 + 0.65 * Math.pow(rnd(), 1.5));
  }
  return { dir, speed, rand };
}

/** Acerca `current` a `target` de forma suave e independiente del framerate. */
export function dampProgress(current: number, target: number, dt: number, rate = 3.2) {
  return current + (target - current) * (1 - Math.exp(-rate * Math.min(Math.max(dt, 0), 0.1)));
}

/** Progreso (0..1) según el scroll: explota mientras el banner sale de pantalla. */
export function scrollProgress(scrollY: number, viewportH: number, start = 0.08, range = 0.55) {
  const t = (scrollY - viewportH * start) / (viewportH * range);
  return Math.min(Math.max(t, 0), 1);
}

/** Modo "loop": explota, se queda un rato y se rehace, cada `every` segundos. */
export function loopTarget(elapsed: number, every: number, hold = 2.5) {
  const c = elapsed % every;
  const start = every * 0.6;
  return c >= start && c < start + hold ? 1 : 0;
}

/** "#RRGGBB" → [r, g, b] en 0..1 (valores sRGB, tal cual se escriben en el canvas) */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

/** Medidas que dependen del grosor: profundidad de extrusión y bisel (en unidades del mundo). */
export function thicknessParams(size: number, thickness: number) {
  return {
    depth: size * 0.45 * thickness, // fondo de la letra
    bevelSize: size * 0.028 * thickness, // el bisel engrosa el trazo por fuera (~2 × bevelSize)
    bevelThickness: size * 0.03 * thickness,
  };
}
