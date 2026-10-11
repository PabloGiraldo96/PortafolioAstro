/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

// ---- Ajustes de la animación (unidades 3D; la cámara está a 6 u con fov 40, así que se ven ±2.2 u)
const ENTER = {
  from: 3.4, // altura inicial sobre su sitio: fuera del cuadro, por arriba
  duration: 3.8, // s que tarda en bajar
  overshoot: 1.2, // 0 = frena sin rebote; >1 = se pasa un poco y sube a asentarse
  tilt: 0.35, // rad: baja con la nariz inclinada y se nivela al llegar
};
const BOB = {
  amp: 0.12, // cuánto sube y baja al flotar
  speed: 0.10, // rad/s (periodo ≈ 4.5 s)
  roll: 0.04, // balanceo muy leve
};

const clamp01 = (x) => MathUtils.clamp(x, 0, 1);
const easeOutBack = (x, c1) => {
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Ship(props) {
  const { scene } = useGLTF("/models/Spaceship.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/Spaceship.glb");

// Baja al entrar en pantalla y, ya asentada, flota con un vaivén suave en Y.
// (Reemplaza a <Float>: así el vaivén arranca justo cuando termina el descenso.)
function FloatingShip({ reduced, ...props }) {
  const group = useRef();
  const t0 = useRef(null);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    if (reduced) {
      g.position.y = 0;
      return;
    }

    // el canvas solo renderiza mientras es visible, así que el primer frame = "acaba de entrar"
    if (t0.current === null) t0.current = clock.elapsedTime;
    const p = clamp01((clock.elapsedTime - t0.current) / ENTER.duration);

    const fall = 1 - easeOutBack(p, ENTER.overshoot); // 1 arriba -> 0 en su sitio (rebota apenas bajo 0)
    const amp = smooth(0.65, 1, p); // el vaivén entra suavemente al final del descenso
    const w = clock.elapsedTime * BOB.speed;

    g.position.y = fall * ENTER.from + Math.sin(w) * BOB.amp * amp;
    g.rotation.x = fall * ENTER.tilt;
    g.rotation.z = Math.sin(w * 0.7) * BOB.roll * amp;
  });

  return (
    <group ref={group} position={[0, ENTER.from, 0]}>
      <Ship {...props} />
    </group>
  );
}

export default function SpaceshipWidget({ size = 300 }) {
  const wrap = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    // Se considera "en cámara" cuando se ve al menos el 35 % del widget
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 1, 6], fov: 40 }}
        dpr={[1, 2]}
        frameloop={inView || reduced ? "always" : "never"} // no gasta GPU fuera de pantalla
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <FloatingShip scale={1} reduced={reduced} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={!reduced} autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}