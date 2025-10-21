"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, Clock, ExternalLink, Instagram, Facebook, Mail } from "lucide-react";
/** CONFIG */
const MAPS_URL = "https://maps.app.goo.gl/LkcM9Qhhnch4GibRA"; // TODO
const MENU_URL = "https://qrfy.io/p/4H3Im6fI8r"; // TODO
const ADDRESS = "Dirección: Av. Santa Isabel 517, Providencia"; // TODO
const HOURS: { d: string; h: string }[] = [
  { d: "Lun–Vie", h: "07:30–19:30" },
  { d: "Sáb-Dom y Festivos", h: "10:30–19:30" }
];
const SOCIALS = { ig: "https://www.instagram.com/chileancoffee/" }; // TODO
import AOS from "aos"
import "aos/dist/aos.css";

export default function ComingSoonContent() {
  const [email, setEmail] = useState("");
  const [showSecondLogo, setShowSecondLogo] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // Cambiado a false para permitir animaciones repetidas
      mirror: true  // Cambiado a true para permitir animaciones en ambas direcciones
    });
  }, []);

  // Detectar scroll para mostrar/ocultar el segundo logo
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 300; // Punto donde aparece el segundo logo (aumentado para mejor efecto)
      
      if (scrollPosition > triggerPoint && !showSecondLogo) {
        setShowSecondLogo(true);
        // Refrescar AOS para las nuevas animaciones
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      } else if (scrollPosition <= triggerPoint && showSecondLogo) {
        setShowSecondLogo(false);
        // Refrescar AOS para las nuevas animaciones
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSecondLogo]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email:", email); // integra tu POST/Resend/Mailchimp aquí
    setEmail("");
  };

  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Estilos personalizados para transiciones suaves */}
      <style jsx>{`
        [data-aos="fade-out"] {
          opacity: 0 !important;
          transform: translateY(20px) !important;
        }
        
        .logo-container figure {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .logo-container img {
          max-height: 400px;
          object-fit: contain;
        }
      `}</style>
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 1 }}
              animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.07, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="will-change-transform"
            >
              <Image
                src="/brand/logo-mensaje.svg"
                alt="Chilean Coffee"
                width={256}   // cálculo interno (SVG)
                height={256}
                priority
                className="h-12 md:h-14 lg:h-16 xl:h-20 w-auto shrink-0 mt-5"
              />
            </motion.div>
            {/* <span className="font-[var(--font-bebas)] text-2xl md:text-3xl lg:text-4xl tracking-wider">
    CHILEAN COFFEE
  </span> */}
          </Link>

          <nav className="flex items-center gap-4 text-white/80">
            <a href={SOCIALS.ig} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white">
              <Instagram className="w-10 h-10" />
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* numeral outline */}
        <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
          <div className="font-display text-[36vh] leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:2px_white] opacity-[0.06]">
            01
          </div>
        </div>



        <motion.div style={{ y: heroY }} className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24 relative z-20">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Título + CTAs */}
            <div className="md:col-span-7" data-aos="fade-right">
              <p className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/20">
                YA ABRIMOS EN BARRIO ITALIA
              </p>

              {/* Contenedor para los logos con sticky positioning */}
              <div className="mt-4 h-[300px] md:h-[400px] sticky top-20 z-10">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Primer logo - visible al inicio */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      !showSecondLogo 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible translate-y-4'
                    }`}
                    style={{ transitionDelay: !showSecondLogo ? '200ms' : '0ms' }}
                  >
                    <img 
                      src="/brand/logo-central.svg" 
                      alt="Chilean Coffee" 
                      className="w-full h-full object-contain drop-shadow-2xl max-w-4xl" 
                    />
                  </div>
                  
                  {/* Segundo logo - aparece con scroll */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      showSecondLogo 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible translate-y-4'
                    }`}
                    style={{ transitionDelay: showSecondLogo ? '200ms' : '0ms' }}
                  >
                                       <motion.div
        initial={{ scale: 1 }}
        animate={prefersReducedMotion ? { scale: 1.1 } : { scale: [1, 1.07, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        className="will-change-transform"
      >
                    <img 
                      src="/brand/chachai.svg" 
                      alt="Chilean Coffee - Cachái" 
                      className="w-full h-full object-contain drop-shadow-2xl max-w-4xl" 
                    />
                    </motion.div>
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
                Café chileno con carácter urbano, humor criollo y servicio a toda hora. ¿CACHAI?
              </p>

              <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 h-12 rounded-full hover:opacity-95 transition"
                >
                  <MapPin className="w-4 h-4" />
                  Cómo llegar
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                </a>
                <a
                  href={MENU_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-5 h-12 rounded-full hover:bg-white hover:text-black transition"
                >
                  Ver carta <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Dirección + horarios */}
            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-7 pointer-events-auto"
              data-aos="fade-left"
            >
              <div className="flex items-start gap-3">
                <div className="grid place-items-center w-9 h-9 rounded-md bg-white/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Barrio Italia</h3>
                  <p className="text-white/70 text-sm">{ADDRESS}</p>
                  <a href={MAPS_URL} target="_blank" rel="noreferrer" className="underline underline-offset-4 text-sm">
                    Abrir en Google Maps
                  </a>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <div className="grid place-items-center w-9 h-9 rounded-md bg-white/10">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Horarios</h3>
                  <ul className="mt-1.5 space-y-1">
                    {HOURS.map((it) => (
                      <li key={it.d} className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{it.d}</span>
                        <span className="font-medium">{it.h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>

        {/* marquee ¿CACHAI? */}
        <div className="border-t border-white/10">
          <div className="overflow-hidden">
            <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap py-3 text-white/70">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="mx-6 font-display tracking-widest text-2xl">
                  ¿CACHAI? • LA ONCE, A TODA HORA • CHILEAN COFFEE •
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* separador diagonal */}
      <div className="h-8 bg-[linear-gradient(184deg,#000_49%,#111_50%)]" />

      {/* Posters */}
      <section className="bg-[#111] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative mb-8">
            <div className="absolute -top-8 right-0 font-display text-[22vh] leading-none text-transparent [-webkit-text-stroke:2px_white] opacity-[0.05]">
              02
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wide">MERCH • MOOD</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <PosterCard
              title="¿CACHAI?"
              caption="LA ONCE, A TODA HORA."
              invert
              svg={
                <svg viewBox="0 0 120 120" className="w-24 h-24">
                  <path d="M20 20h80v10H20zM30 30h60l-6 60a15 15 0 0 1-15 13H51a15 15 0 0 1-15-13L30 30z" fill="currentColor" />
                </svg>
              }
            />
            <PosterCard
              title="CHILEAN — COFFEE"
              caption="Conversao’ de barra."
              svg={
                <svg viewBox="0 0 160 120" className="w-28 h-24">
                  <circle cx="45" cy="30" r="20" fill="currentColor" />
                  <circle cx="115" cy="30" r="20" fill="currentColor" />
                  <rect x="30" y="55" width="30" height="40" rx="4" fill="currentColor" />
                  <rect x="100" y="55" width="30" height="40" rx="4" fill="currentColor" />
                </svg>
              }
            />
            <PosterCard
              title="HECHO CON AMOR"
              caption="Detalles que importan."
              invert
              svg={
                <svg viewBox="0 0 140 120" className="w-28 h-24">
                  <path d="M30 70a30 20 0 0 0 60 0v-8H30v8z" fill="currentColor" />
                  <rect x="90" y="60" width="30" height="16" rx="8" fill="currentColor" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black py-14 border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center" data-aos="fade-up">
          <h3 className="font-display text-4xl md:text-5xl tracking-wide">PRONTO: TIENDA & HISTORIAS</h3>
          <p className="text-white/70 mt-2">Déjanos tu correo y te avisamos sin spam.</p>

          <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-full bg-white text-black px-5 outline-none"
              aria-label="Correo"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-95"
            >
              <Mail className="inline-block w-4 h-4 mr-2" />
              Notifícame
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Chilean Coffee — LA ONCE, A TODA HORA.
        </div>
      </footer>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CafeOrCoffeeShop",
            name: "Chilean Coffee",
            address: {
              "@type": "PostalAddress",
              streetAddress: ADDRESS,
              addressLocality: "Ñuñoa",
              addressRegion: "Región Metropolitana",
              addressCountry: "CL",
            },
            url: "https://chileancoffee.cl/", // TODO
            sameAs: [SOCIALS.ig],
            servesCuisine: "Coffee",
          }),
        }}
      />
    </div>
  );
}

/** Poster 1 color (negro/blanco) */
function PosterCard({
  title,
  caption,
  svg,
  invert = false,
}: {
  title: string;
  caption: string;
  svg: React.ReactNode;
  invert?: boolean;
}) {
  const bg = invert ? "bg-white text-black" : "bg-black text-white";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border ${invert ? "border-black/10" : "border-white/10"} p-6 md:p-8 ${bg}`}
    >
      <div className="mb-6">{svg}</div>
      <h3 className="font-display text-4xl tracking-wide">{title}</h3>
      <p className={`${invert ? "text-black/70" : "text-white/70"} mt-1`}>{caption}</p>
    </motion.article>
  );
}
