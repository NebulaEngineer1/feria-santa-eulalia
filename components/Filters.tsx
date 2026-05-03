"use client";

import { Search, X } from "lucide-react";
import { CATEGORIES } from "@/data/seed";
import { Category } from "@/lib/types";

interface Props {
  selected: Category | "todos";
  onSelect: (c: Category | "todos") => void;
  search: string;
  onSearchChange: (s: string) => void;
  resultsCount: number;
}

export function Filters({ selected, onSelect, search, onSearchChange, resultsCount }: Props) {
  return (
    <div className="space-y-5">
      {/* Buscador */}
      <div className="relative max-w-2xl">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-moss-600 pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          id="search-input"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tomate, queso Turrialba, café..."
          className="w-full bg-cream-50 border border-moss-100 focus:border-moss-700 focus:ring-2 focus:ring-moss-700/10 rounded-full pl-14 pr-12 py-4 text-[15px] text-ink placeholder:text-ink-soft/60 outline-none transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-moss-100 hover:bg-moss-700 hover:text-cream-50 text-moss-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Chips horizontales scrolleables */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const active = selected === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                active
                  ? "bg-moss-800 text-cream-50 border-moss-800 shadow-soft"
                  : "bg-cream-50 text-ink-soft border-moss-100 hover:border-moss-700 hover:text-moss-800"
              }`}
            >
              <span className={active ? "" : "opacity-70"}>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-soft">
          <span className="font-semibold text-ink tabular-nums">{resultsCount}</span>{" "}
          producto{resultsCount === 1 ? "" : "s"}{" "}
          {search && (
            <>
              para <span className="italic font-display">"{search}"</span>
            </>
          )}
        </span>
        <span className="hidden sm:inline text-[11px] tracking-[0.18em] uppercase text-moss-600">
          Recolectado hoy
        </span>
      </div>
    </div>
  );
}
