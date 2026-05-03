"use client";

import { ArrowDown, Sparkles } from "lucide-react";

export function Hero() {
  const today = new Date();
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const dayName = days[today.getDay()];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream-50 grain"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-moss-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-terra-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 animate-fade-up">
          <div className="h-px w-12 bg-moss-700" />
          <span className="text-[11px] tracking-[0.32em] uppercase text-moss-700 font-medium">
            Edición {today.getFullYear()} · {dayName}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Bloque principal */}
          <div className="lg:col-span-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h1 className="font-display text-ink leading-[0.92] tracking-tightest text-[14vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5vw]">
              <span className="block">Cosecha</span>
              <span className="block italic font-light">
                de la semana,
              </span>
              <span className="block flex items-baseline gap-3 sm:gap-5">
                en tu mesa
                <span className="font-display-wonky text-terra-500 italic">.</span>
              </span>
            </h1>
          </div>

          {/* Columna lateral con copy */}
          <div
            className="lg:col-span-4 lg:pb-6 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-md">
              Productos frescos de
              <span className="font-display italic text-moss-700"> 18 productores </span>
              de la zona de Heredia. Hacé tu pedido hoy y lo llevamos a tu casa el mismo día.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#mercado"
                className="inline-flex items-center gap-2 bg-moss-800 text-cream-50 px-6 py-3.5 rounded-full font-medium text-sm hover:bg-moss-900 transition-all btn-organic shadow-soft"
              >
                Explorar el mercado
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#combos"
                className="inline-flex items-center gap-2 text-moss-800 hover:text-moss-900 px-2 py-2 text-sm font-medium link-underline"
              >
                <Sparkles className="w-4 h-4" />
                Ver combos curados
              </a>
            </div>
          </div>
        </div>

        {/* Stats inferiores tipo periódico */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-moss-100 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-x-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <Stat label="Productores locales" value="18" suffix="fincas" />
          <Stat label="Días de entrega" value="2" suffix="vie · sáb" />
          <Stat label="Zonas cubiertas" value="5" suffix="rutas" />
          <Stat label="Tiempo de entrega" value="2-4h" suffix="el mismo día" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] tracking-[0.22em] uppercase text-moss-600 mb-1.5">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl sm:text-4xl text-ink tracking-tightest">
          {value}
        </span>
        <span className="text-xs text-ink-soft italic font-display">{suffix}</span>
      </div>
    </div>
  );
}
