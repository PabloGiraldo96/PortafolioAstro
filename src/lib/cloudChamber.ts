// Trazas de partículas estilo "cámara de niebla" (sin dependencias: solo arreglos tipados).
//
// Cada traza es un "disparo": una partícula sale de un origen casi al instante y deja una cadena de
// gotitas (condensación) a lo largo de su camino. Las gotitas aparecen al pasar la partícula, se
// ensanchan un poco (difusión) y se desvanecen; las más viejas (cerca del origen) se apagan primero.
// Hay tres tipos, como en las fotos reales:
//   alfa : corta, gruesa y brillante          beta : larga, delgada, se curva y se enrosca
//   muón : casi recta, larga y tenue
// Algunas trazas lanzan una rama corta y curva (rayo delta), el típico "tenedor".

export type Vec3 = [number, number, number];
export type RGB = [number, number, number];

export interface ChamberOptions {
  tracks: number; // trazas simultáneas
  anchors: Vec3[]; // puntos desde donde nacen
  palette: RGB[];
  spread: number; // dispersión del origen alrededor del ancla
  rnd?: () => number; // inyectable para pruebas
}

export const MAIN_DROPS = 84; // gotitas por traza principal
export const BRANCH_DROPS = 14; // gotitas por rama
export const DROPS = MAIN_DROPS + BRANCH_DROPS;
const PATH_N = 40; // puntos del camino principal (precalculado al nacer)
const BRANCH_N = 14;
const BRANCH_GROW = 0.12; // s que tarda la rama en dibujarse
const SHOT_EXP = 2.2; // la partícula frena: sale muy rápido y termina despacio

type Range = [number, number];
interface Kind {
  weight: number;
  len: Range;
  curv: Range; // curvatura inicial (rad por unidad de largo)
  curv2: Range; // curvatura extra que crece con la distancia (espiral al perder energía)
  jitter: Range; // grosor de la traza (dispersión de las gotitas)
  gain: number; // brillo
  shot: Range; // s que tarda la partícula en recorrerla toda
  life: Range; // s hasta que se apaga
  branch: number; // probabilidad de rama
}
const KINDS: Kind[] = [
  { weight: 0.35, len: [26, 58], curv: [0.0005, 0.003], curv2: [0, 0], jitter: [0.8, 1.1], gain: 1.0, shot: [0.08, 0.13], life: [2.2, 3.6], branch: 0.1 },
  { weight: 0.45, len: [80, 175], curv: [0.006, 0.02], curv2: [0.00004, 0.00028], jitter: [0.25, 0.45], gain: 0.85, shot: [0.12, 0.2], life: [3.0, 5.2], branch: 0.5 },
  { weight: 0.2, len: [130, 200], curv: [0.0002, 0.0009], curv2: [0, 0], jitter: [0.25, 0.4], gain: 0.6, shot: [0.08, 0.12], life: [2.6, 4.0], branch: 0.15 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const norm = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// Camino plano: avanza en `fwd` y se curva hacia `lat` (ángulo = curv·s + curv2·s²)
function integrate(out: Float32Array, off: number, n: number, o: Vec3, fwd: Vec3, lat: Vec3, len: number, curv: number, curv2: number) {
  let x = o[0], y = o[1], z = o[2];
  const ds = len / (n - 1);
  for (let s = 0; s < n; s++) {
    const p = (off + s) * 3;
    out[p] = x; out[p + 1] = y; out[p + 2] = z;
    const d = s * ds;
    const phi = curv * d + curv2 * d * d;
    const c = Math.cos(phi) * ds, sn = Math.sin(phi) * ds;
    x += c * fwd[0] + sn * lat[0];
    y += c * fwd[1] + sn * lat[1];
    z += c * fwd[2] + sn * lat[2];
  }
}

function sample(arr: Float32Array, off: number, n: number, f: number, out: Float32Array) {
  const x = Math.min(Math.max(f, 0), 1) * (n - 1);
  const i0 = Math.min(n - 2, Math.floor(x));
  const t = x - i0;
  const a = (off + i0) * 3, b = a + 3;
  out[0] = arr[a] + (arr[b] - arr[a]) * t;
  out[1] = arr[a + 1] + (arr[b + 1] - arr[a + 1]) * t;
  out[2] = arr[a + 2] + (arr[b + 2] - arr[a + 2]) * t;
}

export function createCloudChamber(opts: ChamberOptions) {
  const T = opts.tracks;
  const rnd = opts.rnd ?? Math.random;
  const range = (r: Range) => lerp(r[0], r[1], rnd());
  const gauss = () => (rnd() + rnd() + rnd()) / 1.5 - 1; // ~[-1, 1], concentrada al centro

  // estado por traza
  const origin = new Float32Array(T * 3);
  const path = new Float32Array(T * PATH_N * 3);
  const branchPath = new Float32Array(T * BRANCH_N * 3);
  const hasBranch = new Uint8Array(T);
  const branchAt = new Float32Array(T); // fracción de la traza donde nace la rama
  const base = new Float32Array(T * 3);
  const life = new Float32Array(T);
  const birth = new Float32Array(T);
  const shot = new Float32Array(T);
  const jitter = new Float32Array(T);
  const gain = new Float32Array(T);
  // por gotita (fijo mientras vive la traza)
  const dropF = new Float32Array(T * DROPS);
  const dropJ = new Float32Array(T * DROPS * 3);
  const dropFlick = new Float32Array(T * DROPS);

  // salidas: se suben tal cual a la GPU
  const dropPositions = new Float32Array(T * DROPS * 3);
  const dropColors = new Float32Array(T * DROPS * 3);
  const flashPositions = new Float32Array(T * 2 * 3); // [vértice del disparo, cabeza de la partícula]
  const flashColors = new Float32Array(T * 2 * 3);

  const tmp = new Float32Array(3);

  function spawn(i: number, now: number) {
    const a = opts.anchors[Math.floor(rnd() * opts.anchors.length)];
    const o: Vec3 = [a[0] + (rnd() * 2 - 1) * opts.spread, a[1] + (rnd() * 2 - 1) * opts.spread, a[2] + (rnd() * 2 - 1) * opts.spread];
    origin.set(o, i * 3);

    // dirección uniforme en la esfera + plano de curvatura aleatorio
    const z = rnd() * 2 - 1, t = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z);
    const dir: Vec3 = [r * Math.cos(t), z, r * Math.sin(t)];
    const aux: Vec3 = Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const u = norm(cross(dir, aux));
    const v = cross(dir, u);
    const rho = rnd() * Math.PI * 2;
    const lat: Vec3 = [u[0] * Math.cos(rho) + v[0] * Math.sin(rho), u[1] * Math.cos(rho) + v[1] * Math.sin(rho), u[2] * Math.cos(rho) + v[2] * Math.sin(rho)];
    const nrm = cross(dir, lat); // eje fuera del plano

    // tipo de traza (ruleta ponderada)
    let pick = rnd(), k = KINDS[KINDS.length - 1];
    for (const kd of KINDS) {
      if ((pick -= kd.weight) <= 0) { k = kd; break; }
    }
    const sign = rnd() < 0.5 ? -1 : 1;
    const len = range(k.len);
    integrate(path, i * PATH_N, PATH_N, o, dir, lat, len, sign * range(k.curv), sign * range(k.curv2));

    life[i] = range(k.life);
    shot[i] = range(k.shot);
    jitter[i] = range(k.jitter);
    gain[i] = k.gain;
    birth[i] = now;
    const c = opts.palette[Math.floor(rnd() * opts.palette.length)];
    base[i * 3] = c[0]; base[i * 3 + 1] = c[1]; base[i * 3 + 2] = c[2];

    // rama (rayo delta): corta, nace en un punto de la traza y se enrosca fuerte
    hasBranch[i] = rnd() < k.branch ? 1 : 0;
    if (hasBranch[i]) {
      const fb = 0.25 + rnd() * 0.55;
      branchAt[i] = fb;
      sample(path, i * PATH_N, PATH_N, fb, tmp);
      const bo: Vec3 = [tmp[0], tmp[1], tmp[2]];
      sample(path, i * PATH_N, PATH_N, Math.min(1, fb + 0.03), tmp);
      const tang = norm([tmp[0] - bo[0], tmp[1] - bo[1], tmp[2] - bo[2]]);
      const sg = rnd() < 0.5 ? -1 : 1;
      const th = sg * (0.45 + rnd() * 0.8); // 25° – 70°
      const sigma = rnd() * Math.PI;
      const w: Vec3 = [lat[0] * Math.cos(sigma) + nrm[0] * Math.sin(sigma), lat[1] * Math.cos(sigma) + nrm[1] * Math.sin(sigma), lat[2] * Math.cos(sigma) + nrm[2] * Math.sin(sigma)];
      const bdir = norm([tang[0] * Math.cos(th) + w[0] * Math.sin(th), tang[1] * Math.cos(th) + w[1] * Math.sin(th), tang[2] * Math.cos(th) + w[2] * Math.sin(th)]);
      let blat = cross(bdir, tang);
      if (Math.hypot(blat[0], blat[1], blat[2]) < 1e-3) blat = lat;
      integrate(branchPath, i * BRANCH_N, BRANCH_N, bo, bdir, norm(blat), 7 + rnd() * 13, (rnd() < 0.5 ? -1 : 1) * (0.08 + rnd() * 0.17), 0);
    }

    // gotitas: reparto estratificado a lo largo del camino + desplazamiento fijo
    for (let d = 0; d < DROPS; d++) {
      const idx = i * DROPS + d;
      dropF[idx] = d < MAIN_DROPS ? (d + rnd()) / MAIN_DROPS : (d - MAIN_DROPS + rnd()) / BRANCH_DROPS;
      dropJ[idx * 3] = gauss(); dropJ[idx * 3 + 1] = gauss(); dropJ[idx * 3 + 2] = gauss();
      dropFlick[idx] = rnd();
    }
  }

  // arranque escalonado: cada traza empieza en un punto distinto de su ciclo
  for (let i = 0; i < T; i++) {
    spawn(i, 0);
    birth[i] = -rnd() * life[i];
  }

  const hide = (idx: number, i: number) => {
    const p = idx * 3;
    dropPositions[p] = origin[i * 3]; dropPositions[p + 1] = origin[i * 3 + 1]; dropPositions[p + 2] = origin[i * 3 + 2];
    dropColors[p] = dropColors[p + 1] = dropColors[p + 2] = 0; // aditivo: negro = invisible
  };

  // intensidad de una gotita: aparece rápido y se apaga con curva suave
  const envelope = (a: number, lifeLeft: number) => Math.min(1, a / 0.05) * Math.pow(Math.max(0, 1 - a / lifeLeft), 1.8);

  function update(elapsed: number) {
    for (let i = 0; i < T; i++) {
      let age = elapsed - birth[i];
      if (age > life[i]) {
        spawn(i, elapsed);
        age = 0;
      }
      if (age < 0) age = 0; // por si el reloj retrocede (p. ej. al reiniciar el render loop)
      const L = life[i], S = shot[i];
      const u = age / L;
      const headF = 1 - Math.pow(1 - Math.min(1, age / S), SHOT_EXP); // cuánto del camino ya recorrió
      const diff = 1 + 2.5 * u; // difusión: la traza se ensancha al envejecer
      const j = i * 3;
      const br = base[j], bg = base[j + 1], bb = base[j + 2];

      for (let d = 0; d < DROPS; d++) {
        const idx = i * DROPS + d;
        const p = idx * 3;
        const f = dropF[idx];
        let env = 0;

        if (d < MAIN_DROPS) {
          if (f <= headF) {
            const tApp = S * (1 - Math.pow(1 - f, 1 / SHOT_EXP));
            env = envelope(age - tApp, L - tApp);
            sample(path, i * PATH_N, PATH_N, f, tmp);
          }
        } else if (hasBranch[i]) {
          // la rama se dibuja cuando la partícula pasa por su punto de origen
          const tB = S * (1 - Math.pow(1 - branchAt[i], 1 / SHOT_EXP));
          const bt = age - tB;
          if (bt > 0) {
            const headB = 1 - Math.pow(1 - Math.min(1, bt / BRANCH_GROW), 2);
            if (f <= headB) {
              const tApp = tB + BRANCH_GROW * (1 - Math.sqrt(1 - f));
              env = envelope(age - tApp, L - tApp);
              sample(branchPath, i * BRANCH_N, BRANCH_N, f, tmp);
            }
          }
        }

        if (env <= 0) {
          hide(idx, i);
          continue;
        }
        const jt = jitter[i] * diff;
        dropPositions[p] = tmp[0] + dropJ[p] * jt;
        dropPositions[p + 1] = tmp[1] + dropJ[p + 1] * jt;
        dropPositions[p + 2] = tmp[2] + dropJ[p + 2] * jt;
        const flick = 0.82 + 0.18 * Math.sin(elapsed * 9 + dropFlick[idx] * 50); // titileo sutil
        const b = env * gain[i] * flick;
        dropColors[p] = br * b; dropColors[p + 1] = bg * b; dropColors[p + 2] = bb * b;
      }

      // destello del vértice (el "disparo") y cabeza de la partícula, más blancos que la traza
      const fv = i * 2 * 3;
      const bv = age < 0.2 ? Math.pow(1 - age / 0.2, 2) : 0;
      flashPositions[fv] = origin[j]; flashPositions[fv + 1] = origin[j + 1]; flashPositions[fv + 2] = origin[j + 2];
      flashColors[fv] = (br * 0.5 + 0.5) * bv; flashColors[fv + 1] = (bg * 0.5 + 0.5) * bv; flashColors[fv + 2] = (bb * 0.5 + 0.5) * bv;

      const fh = fv + 3;
      const bh = age < S ? 1 : Math.pow(Math.max(0, 1 - (age - S) / 0.12), 2);
      sample(path, i * PATH_N, PATH_N, headF, tmp);
      flashPositions[fh] = tmp[0]; flashPositions[fh + 1] = tmp[1]; flashPositions[fh + 2] = tmp[2];
      flashColors[fh] = (br * 0.5 + 0.5) * bh; flashColors[fh + 1] = (bg * 0.5 + 0.5) * bh; flashColors[fh + 2] = (bb * 0.5 + 0.5) * bh;
    }
  }

  return { dropPositions, dropColors, flashPositions, flashColors, dropCount: T * DROPS, flashCount: T * 2, update };
}
