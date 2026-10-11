// Scroll suave (Lenis) + animaciones con ScrollTrigger, responsivas y con respeto a "reducir movimiento".
//
//   npm i gsap lenis
//
// Marcado en el HTML (ver App.example.vue):
//   [data-section]        cada bloque de la página (About, Projects, Games...). Al salir de pantalla se
//                         atenúa y se encoge un poco: el "descenso suave" hacia el siguiente bloque.
//   [data-section-inner]  (opcional) el contenedor interno que se anima; si no existe, se anima la sección
//   [data-reveal]         elementos que suben y aparecen en cascada al entrar en pantalla
//   [data-parallax="0.1"] elementos con parallax (imágenes, títulos grandes)
//   [data-banner]         el banner 3D: se aleja y se desvanece al bajar
import { onBeforeUnmount, onMounted, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollOptions {
  banner?: Ref<HTMLElement | null>; // opcional: si no, busca [data-banner]
  headerOffset?: number; // px de un header fijo, para que los anclajes no queden tapados
}

export function useScrollAnimations(opts: ScrollOptions = {}) {
  let lenis: Lenis | null = null;
  let mm: gsap.MatchMedia | null = null;
  let tick: ((time: number) => void) | null = null;
  let onClick: ((e: MouseEvent) => void) | null = null;

  onMounted(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (!reduceMotion) {
      root.classList.add("anim"); // el CSS oculta [data-reveal] solo si hay JS y movimiento permitido

      // --- scroll suave sincronizado con ScrollTrigger (en táctil se deja el scroll nativo)
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // --- anclajes (#projects, #experience...) con desplazamiento suave
    onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!a || !id || id === "#") return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -(opts.headerOffset ?? 0), duration: 1.6 });
      else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    // --- animaciones por tamaño de pantalla (se recrean solas al cambiar de breakpoint)
    mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1025px)",
        tablet: "(min-width: 641px) and (max-width: 1024px)",
        mobile: "(max-width: 640px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const c = ctx.conditions as Record<string, boolean>;
        if (c.reduce) return; // sin movimiento: todo queda visible y en su sitio

        const dist = c.desktop ? 70 : c.tablet ? 44 : 28; // cuánto suben los [data-reveal]
        const revealStart = c.mobile ? "top 94%" : "top 88%";

        // 1) Banner: se aleja y se desvanece mientras sale (y deja pasar los clics al contenido)
        const banner = opts.banner?.value ?? document.querySelector<HTMLElement>("[data-banner]");
        if (banner) {
          gsap.to(banner, {
            y: c.desktop ? 90 : 40,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: banner,
              start: "top top",
              end: "bottom top",
              scrub: true,
              onLeave: () => (banner.style.pointerEvents = "none"),
              onEnterBack: () => (banner.style.pointerEvents = ""),
            },
          });
        }

        // 2) Entrada en cascada de los elementos de cada sección
        gsap.set("[data-reveal]", { opacity: 0, y: dist });
        ScrollTrigger.batch("[data-reveal]", {
          start: revealStart,
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: c.mobile ? 0.7 : 1, ease: "power3.out", stagger: 0.12, overwrite: true }),
        });

        // 3) Descenso suave entre componentes: la sección que sale se atenúa y se encoge un poco
        const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
        sections.forEach((sec, i) => {
          if (i === sections.length - 1) return; // la última (contacto) no se apaga
          const inner = sec.querySelector<HTMLElement>("[data-section-inner]") ?? sec;
          gsap.to(inner, {
            opacity: c.mobile ? 0.4 : 0.12,
            scale: c.desktop ? 0.96 : 1,
            y: c.desktop ? -50 : -20,
            ease: "none",
            scrollTrigger: { trigger: sec, start: "bottom 65%", end: "bottom 5%", scrub: c.desktop ? 0.8 : true },
          });
        });

        // 4) Parallax suave (imágenes, títulos); la mitad de intensidad en pantallas chicas
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax ?? "0.1") * (c.desktop ? 100 : 50);
          gsap.fromTo(
            el,
            { yPercent: -amt },
            { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      }
    );

    // las alturas cambian al cargar fuentes e imágenes: recalcular los disparadores
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh);
  });

  onBeforeUnmount(() => {
    if (onClick) document.removeEventListener("click", onClick);
    if (tick) gsap.ticker.remove(tick);
    mm?.revert(); // limpia las animaciones y los ScrollTriggers creados dentro
    lenis?.destroy();
    document.documentElement.classList.remove("anim");
  });
}
