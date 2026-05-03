"use client";

import { Product } from "@/lib/types";
import { formatCRC } from "@/lib/format";
import { Plus, Leaf, MapPin } from "lucide-react";

interface Props {
  product: Product;
  onAdd: (p: Product) => void;
  inCart?: number;
}

export function ProductCard({ product, onAdd, inCart = 0 }: Props) {
  return (
    <article className="group relative flex flex-col bg-cream-50 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Imagen */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges sobre la imagen */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.organic && (
            <span className="inline-flex items-center gap-1 bg-moss-700 text-cream-50 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase">
              <Leaf className="w-3 h-3" /> Orgánico
            </span>
          )}
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 bg-terra-500 text-cream-50 text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase">
              ★ Top
            </span>
          )}
        </div>

        {/* Botón añadir flotante */}
        <button
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Agregar ${product.name} al carrito`}
          className="absolute bottom-3 right-3 w-11 h-11 bg-cream-50 hover:bg-moss-700 hover:text-cream-50 text-moss-800 rounded-full flex items-center justify-center shadow-card transition-all duration-200 active:scale-90"
        >
          {inCart > 0 ? (
            <span className="font-bold text-sm tabular-nums">{inCart}</span>
          ) : (
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          )}
        </button>

        {/* Categoría chip discreto */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] tracking-[0.18em] uppercase text-cream-50 bg-ink/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg sm:text-xl text-ink leading-tight tracking-tight">
            {product.name}
          </h3>
        </div>

        <p className="mt-1.5 text-[13px] text-ink-soft leading-snug line-clamp-2">
          {product.description}
        </p>

        {/* Productor */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-moss-600">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">
            <span className="italic font-display">{product.supplier}</span>
            <span className="opacity-60"> · {product.supplierLocation}</span>
          </span>
        </div>

        {/* Precio */}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-display text-2xl text-ink tracking-tighter tabular-nums">
              {formatCRC(product.price)}
            </span>
            <span className="text-[11px] text-ink-soft -mt-0.5">por {product.unit}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
