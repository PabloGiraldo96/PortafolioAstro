// Marcas de rendimiento del banner. Abre la página con ?perf al final de la URL (por ejemplo /?perf)
// y verás en la consola una tabla con el tiempo (ms desde que empezó la navegación) de cada hito.
export function mark(name: string) {
  if (typeof performance !== "undefined") performance.mark(`banner:${name}`);
}

export function printTimings() {
  const rows = performance
    .getEntriesByType("mark")
    .filter((m) => m.name.startsWith("banner:"))
    .map((m) => ({ hito: m.name.slice(7), "ms desde la navegación": Math.round(m.startTime) }));
  console.table(rows);
}
