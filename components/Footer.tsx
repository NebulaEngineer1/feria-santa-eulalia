"use client";

import { ZONES } from "@/data/seed";
import { formatCRC } from "@/lib/format";
import { MapPin, Clock, Phone, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream-100 border-t border-moss-100">
      {/* Sección zonas */}
      <section id="zonas" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-moss-700" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-moss-700 font-medium">
                Cobertura
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tightest leading-[0.95]">
              Llegamos a
              <span className="italic font-light"> 5 zonas </span>
              de Heredia.
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed max-w-md">
              Pedidos hasta las 7 AM se entregan el mismo día. Después, se programan para el siguiente día de feria.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-3">
              {ZONES.map((zone) => (
                <div
                  key={zone.id}
                  className="bg-cream-50 rounded-2xl p-5 hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-moss-700 text-cream-50 flex items-center justify-center font-display text-base">
                        {zone.id}
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-ink leading-tight">
                          {zone.name}
                        </h3>
                        <span className="text-[11px] text-moss-600">
                          {zone.schedule.length} horarios disponibles
                        </span>
                      </div>
                    </div>
                    <span className="font-display text-base text-terra-500 tabular-nums">
                      {formatCRC(zone.fee)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-soft pl-12">
                    <Clock className="w-3 h-3" />
                    <span>{zone.schedule.join(" · ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer info */}
      <div className="border-t border-moss-100 bg-moss-900 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cream-50 flex items-center justify-center">
                  <span className="font-display text-moss-800 text-xl italic">F</span>
                </div>
                <span className="font-display text-2xl text-cream-50 tracking-tight">
                  Feria <span className="italic font-light">Santa Eulalia</span>
                </span>
              </div>
              <p className="text-cream-100/70 text-sm leading-relaxed max-w-sm">
                Conectamos productores locales de la zona de Heredia con familias que valoran la comida fresca, sana y de origen conocido.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-cream-50 hover:text-moss-900 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/50688887777"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-cream-50 hover:text-moss-900 transition-all"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:hola@feriasantaeulalia.cr"
                  aria-label="Correo"
                  className="w-10 h-10 rounded-full border border-cream-100/20 flex items-center justify-center hover:bg-cream-50 hover:text-moss-900 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <span className="text-[11px] tracking-[0.22em] uppercase text-terra-400 font-medium block mb-4">
                Mercado
              </span>
              <ul className="space-y-2.5 text-sm text-cream-100/80">
                <li><a href="#mercado" className="hover:text-cream-50 link-underline">Productos</a></li>
                <li><a href="#combos" className="hover:text-cream-50 link-underline">Combos</a></li>
                <li><a href="#productores" className="hover:text-cream-50 link-underline">Productores</a></li>
                <li><a href="#zonas" className="hover:text-cream-50 link-underline">Zonas de entrega</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <span className="text-[11px] tracking-[0.22em] uppercase text-terra-400 font-medium block mb-4">
                Visitanos
              </span>
              <div className="flex items-start gap-2.5 text-sm text-cream-100/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>Salón comunal Santa Eulalia</p>
                  <p className="opacity-70">Heredia, Costa Rica</p>
                  <p className="mt-2 italic font-display text-cream-100/60">
                    Viernes 6 AM — 1 PM · Sábado 6 AM — 12 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-100/50">
            <span>© {new Date().getFullYear()} Feria Santa Eulalia. Todos los derechos reservados.</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-cream-100 link-underline">Términos</a>
              <a href="#" className="hover:text-cream-100 link-underline">Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
