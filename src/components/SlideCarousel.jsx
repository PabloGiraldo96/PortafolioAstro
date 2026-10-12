import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/styles.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../styles/gamesSwiper.css"; // después de los CSS de Swiper, para poder ajustarlos

function useScrollFade() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle("is-visible", e.isIntersecting);
        // al salir, recordar por dónde salió para que se vaya en esa dirección
        el.classList.toggle("is-above", !e.isIntersecting && e.boundingClientRect.top < 0);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function SlideCarousel({ slides }) {
  const rootRef = useScrollFade();
  // Se calcula una vez (el componente se monta solo en el cliente, con client:only)
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <div ref={rootRef} className="gs-root">
      <Swiper
        spaceBetween={45}
        slidesPerView={1}
        loop={true}
        speed={reduceMotion ? 0 : 30}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="gs-swiper h-74 bg-black"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.href} className="cardsSwiper gs-slide">
            {/* rel="noopener noreferrer": con target="_blank" evita que la otra página controle esta */}
            <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
              {/* w-fit: el overlay mide exactamente lo mismo que la imagen */}
              <div className={`gs-frame relative mx-auto w-fit ${s.top ?? "mt-6"} ${s.title ? "" : "gs-plain"}`}>
                <img
                  src={s.src}
                  alt={s.alt ?? s.label}
                  className="gs-img mx-auto"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                {s.title && (
                  <div className="gs-overlay absolute inset-0 flex items-center justify-center text-white">
                    <h2 className={`gs-title ${s.titleClass ?? ""} px-6 text-center italic font-sans text-4xl sm:text-6xl lg:text-8xl z-40`}>
                      {s.title}
                    </h2>
                  </div>
                )}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
