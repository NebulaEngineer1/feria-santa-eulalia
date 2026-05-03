"use client";

import { Combo } from "@/lib/types";
import { COMBOS } from "@/data/seed";
import { formatCRC } from "@/lib/format";
import { Sparkles, Check } from "lucide-react";

interface Props {
  onAddCombo: (combo: Combo) => void;
}

export function CombosSection({ onAddCombo }: Props) {
  return (
    <section id="combos" className="relative py-20 sm:py-28 bg-moss-800 text-cream-100 overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream-100/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-terra-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-4 h-4 text-terra-400" />
              <span className="text-[11px] tracking-[0.32em] uppercase text-terra-400 font-medium">
                Combos curados por el chef
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tightest text-cream-50">
              Listos para
              <span className="italic font-light text-terra-400"> ahorrar</span>
              <br />
              tiempo y dinero.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-cream-100/80 leading-relaxed max-w-md">
              Cada semana armamos canastas con productos en su mejor punto. Una sola tarjeta, una sola decisión, hasta 20% menos que comprando por separado.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMBOS.map((combo, idx) => (
            <ComboCard key={combo.id} combo={combo} onAdd={onAddCombo} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComboCard({
  combo,
  onAdd,
  index,
}: {
  combo: Combo;
  onAdd: (c: Combo) => void;
  index: number;
}) {
  const savings = combo.originalPrice - combo.price;
  const savingsPct = Math.round((savings / combo.originalPrice) * 100);

  return (
    <article
      className="group relative bg-cream-50 text-ink rounded-2xl overflow-hidden flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={combo.image}
          alt={combo.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0" />

        {combo.badge && (
          <span className="absolute top-3 left-3 inline-flex items-center bg-cream-50 text-moss-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
            {combo.badge}
          </span>
        )}

        <div className="absolute top-3 right-3 bg-terra-500 text-cream-50 font-bold text-sm px-3 py-1.5 rounded-full">
          −{savingsPct}%
        </div>

        <div className="absolute bottom-4 left-5">
          <p className="font-display italic text-cream-100/90 text-sm">{combo.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-display text-2xl text-ink tracking-tight">{combo.name}</h3>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{combo.description}</p>

        {/* Lista de items */}
        <ul className="mt-4 space-y-1.5 text-[13px] text-ink-soft border-t border-moss-100 pt-4">
          {combo.items.slice(0, 4).map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-moss-700 mt-0.5 shrink-0" strokeWidth={2.5} />
              <span>
                <span className="text-ink">{item.name}</span>
                <span className="opacity-60"> · {item.qty}</span>
              </span>
            </li>
          ))}
          {combo.items.length > 4 && (
            <li className="text-xs text-moss-700 pl-[22px] italic font-display pt-1">
              + {combo.items.length - 4} producto{combo.items.length - 4 === 1 ? "" : "s"} más
            </li>
          )}
        </ul>

        {/* Footer precio */}
        <div className="mt-auto pt-5 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-ink tracking-tighter tabular-nums">
                {formatCRC(combo.price)}
              </span>
              <span className="text-xs line-through text-ink-soft/60 tabular-nums">
                {formatCRC(combo.originalPrice)}
              </span>
            </div>
            <span className="text-[11px] text-moss-700 mt-0.5">
              Ahorrás {formatCRC(savings)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onAdd(combo)}
            className="bg-moss-800 hover:bg-moss-900 text-cream-50 px-5 py-2.5 rounded-full font-medium text-sm transition-all btn-organic"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
