// Recursos del banner (fuente y texturas), cargados UNA sola vez y lo antes posible.
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { createCache } from "./loadOnce";
import { mark } from "./perf";

// Fuente propia, recortada a los caracteres que se usan (ver scripts/subset-font.mjs): pesa una fracción
// de la original y se sirve desde tu mismo dominio. Si el archivo aún no existe, cae a la fuente remota.
export const FONT_URL = "/fonts/FiraCode-subset.json";
const REMOTE_FONT_URL = "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

export const loadFont = createCache(async (url: string) => {
  try {
    return await new FontLoader().loadAsync(url);
  } catch (e) {
    if (url === FONT_URL) return new FontLoader().loadAsync(REMOTE_FONT_URL);
    throw e;
  }
});

export const loadTexture = createCache(async (url: string) => {
  const t = await new TextureLoader().loadAsync(url);
  t.colorSpace = SRGBColorSpace;
  return t;
});

// La descarga de la fuente arranca EN CUANTO se carga este módulo, sin esperar a que Vue monte el canvas.
if (typeof window !== "undefined") {
  loadFont(FONT_URL).then(() => mark("font-ready")).catch(() => {});
}
