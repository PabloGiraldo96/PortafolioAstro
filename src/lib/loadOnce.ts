// Utilidades pequeñas y sin dependencias (probadas en Node).

/** Memoriza una carga por clave: pedir el mismo recurso dos veces devuelve LA MISMA promesa (una sola descarga).
 *  Si la carga falla, se olvida para poder reintentar. */
export function createCache<T>(load: (key: string) => Promise<T>) {
  const map = new Map<string, Promise<T>>();
  return (key: string): Promise<T> => {
    let p = map.get(key);
    if (!p) {
      p = load(key);
      map.set(key, p);
      p.catch(() => map.delete(key));
    }
    return p;
  };
}

/** Ejecuta `cb` cuando el navegador está libre (sin bloquear el primer frame). Devuelve una función para cancelar. */
export function scheduleIdle(cb: () => void, timeout = 1500): () => void {
  const w = globalThis as any;
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}
