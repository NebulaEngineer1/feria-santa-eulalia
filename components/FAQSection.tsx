"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Cómo funciona la entrega?",
    a: "Los pedidos se entregan el mismo día de la feria (viernes y sábado). Podés elegir entrega a domicilio en las zonas de Atenas, o retiro en el punto físico de la feria en Santa Eulalia, Atenas.",
  },
  {
    q: "¿Hasta cuándo puedo hacer mi pedido?",
    a: "Recibimos pedidos hasta las 7:00 AM del día de la feria. Pedidos después de esa hora se programan para el siguiente día de feria.",
  },
  {
    q: "¿Qué pasa si un producto no hay?",
    a: "Te avisamos por WhatsApp y te ofrecemos un producto similar o te devolvemos el monto correspondiente.",
  },
  {
    q: "¿Cómo pago?",
    a: "Aceptamos SINPE Móvil, tarjeta de débito/crédito con datáfono, y efectivo contra entrega.",
  },
  {
    q: "¿Los productos son orgánicos?",
    a: "Algunos productores tienen certificación orgánica, marcados con el badge verde en cada producto. Todos son cultivados localmente sin cadena de frío.",
  },
  {
    q: "¿Puedo modificar o cancelar mi pedido?",
    a: "Sí, contactanos por WhatsApp con tu código de pedido antes de las 8:00 AM del día de entrega.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="preguntas" className="py-20 sm:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — mismo patrón editorial que Productores/Combos */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-moss-700" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-moss-700 font-medium">
                Preguntas frecuentes
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-ink leading-[0.95] tracking-tightest">
              Lo que
              <span className="italic font-light"> todos </span>
              nos preguntan.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p className="text-ink-soft leading-relaxed">
              Si después de leer estas te queda alguna duda, escribinos por WhatsApp y te respondemos el mismo día.
            </p>
          </div>
        </div>

        {/* Acordeón */}
        <div className="max-w-3xl mx-auto divide-y divide-moss-100 border-y border-moss-100">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-5 py-5 sm:py-6 text-left group"
                >
                  <h3
                    className={`font-display text-lg sm:text-xl leading-snug tracking-tight transition-colors ${
                      isOpen ? "text-moss-800" : "text-ink group-hover:text-moss-700"
                    }`}
                  >
                    {faq.q}
                  </h3>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-moss-700 text-cream-50"
                        : "bg-moss-100 text-moss-700 group-hover:bg-moss-200"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </span>
                </button>

                {/* Truco grid-rows para animar altura sin saber el contenido */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink-soft leading-relaxed pb-6 sm:pb-7 pr-12">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
