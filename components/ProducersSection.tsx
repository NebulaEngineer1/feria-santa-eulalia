"use client";

const PRODUCERS = [
  {
    name: "Don Beto",
    location: "Vara Blanca",
    quote:
      "Tres generaciones cultivando zanahoria en la misma finca. Sin químicos desde el 2018.",
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&auto=format&fit=crop&q=80",
    years: "32",
  },
  {
    name: "Doña Cecilia",
    location: "Atenas",
    quote:
      "El pan se hace con tiempo. Mi masa madre tiene siete años y la cuido como a mis nietos.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80",
    years: "18",
  },
  {
    name: "Familia Quesada",
    location: "Atenas",
    quote:
      "Aguacates Hass de altura. Cosechamos solo cuando están en su punto exacto.",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&auto=format&fit=crop&q=80",
    years: "12",
  },
];

export function ProducersSection() {
  return (
    <section
      id="productores"
      className="relative py-20 sm:py-28 bg-cream-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-moss-700" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-moss-700 font-medium">
                Detrás del producto
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-ink leading-[0.95] tracking-tightest">
              Las manos
              <span className="italic font-light"> que cultivan </span>
              tu mesa.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p className="text-ink-soft leading-relaxed">
              Cada producto en este mercado tiene un nombre y una historia. Conocé a algunas de las personas que hacen posible la feria.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PRODUCERS.map((p, i) => (
            <article
              key={p.name}
              className="group bg-cream-50 rounded-2xl overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                  <span className="text-[10px] tracking-[0.22em] uppercase opacity-80">
                    {p.location}
                  </span>
                  <h3 className="font-display text-3xl tracking-tight mt-1">
                    {p.name}
                  </h3>
                </div>
                <div className="absolute top-5 right-5 bg-cream-50/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-center">
                  <div className="font-display text-xl text-ink leading-none tabular-nums">
                    {p.years}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-moss-700 mt-0.5">
                    años
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="font-display italic text-lg text-ink-soft leading-snug">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
