"use client";

const ITEMS = [
  "✦ Cosechado el día de entrega",
  "Sin intermediarios",
  "✦ Pago al productor en 24 horas",
  "Apoyo directo al campo",
  "✦ Empaque biodegradable",
  "Atenas · Costa Rica",
];

export function Marquee() {
  // Duplicamos los items para hacer el loop infinito
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-terra-500 text-cream-50 py-4 overflow-hidden border-y border-terra-600/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {all.map((item, i) => (
          <span
            key={i}
            className="font-display italic text-xl sm:text-2xl mx-8 tracking-tight"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
