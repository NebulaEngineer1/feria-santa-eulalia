"use client";

import { ShoppingBag, Search, MapPin } from "lucide-react";

interface Props {
  itemCount: number;
  onCartClick: () => void;
  onSearchClick?: () => void;
}

export function Header({ itemCount, onCartClick }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-cream-50/85 backdrop-blur-md border-b border-moss-100">
      {/* Banda superior tipo "newsroom" */}
      <div className="bg-moss-800 text-cream-100 text-[11px] tracking-[0.18em] uppercase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terra-400 animate-pulse" />
            <span className="hidden sm:inline">Feria abierta — viernes y sábado · entrega el mismo día</span>
            <span className="sm:hidden">Feria abierta · viernes y sábado</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 opacity-80">
            <MapPin className="w-3 h-3" />
            <span>Atenas, Costa Rica</span>
          </div>
        </div>
      </div>

      {/* Línea principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-moss-700 flex items-center justify-center shadow-soft">
              <span className="font-display text-cream-50 text-xl leading-none italic">F</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-terra-500 border-2 border-cream-50" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl sm:text-[22px] text-ink tracking-tighter">
              Feria <span className="italic font-light">Santa Eulalia</span>
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-moss-600 mt-1">
              Mercado del agricultor · est. 2024
            </span>
          </div>
        </a>

        {/* Nav central — desktop */}
        <nav className="hidden lg:flex items-center gap-7 text-sm text-ink-soft">
          <a href="#mercado" className="link-underline hover:text-moss-700 transition-colors">
            Mercado
          </a>
          <a href="#combos" className="link-underline hover:text-moss-700 transition-colors">
            Combos
          </a>
          <a href="#productores" className="link-underline hover:text-moss-700 transition-colors">
            Productores
          </a>
          <a href="#zonas" className="link-underline hover:text-moss-700 transition-colors">
            Zonas de entrega
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => document.getElementById("search-input")?.focus()}
            aria-label="Buscar"
            className="hidden sm:flex w-11 h-11 items-center justify-center text-ink-soft hover:text-moss-700 hover:bg-moss-50 rounded-full transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button
            type="button"
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 bg-moss-700 hover:bg-moss-800 text-cream-50 px-4 sm:px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:shadow-soft btn-organic"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="hidden sm:inline">Mi canasta</span>
            {itemCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-terra-500 text-cream-50 text-xs font-bold tabular-nums animate-fade-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
