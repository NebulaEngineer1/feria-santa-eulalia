"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Filters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import { CombosSection } from "@/components/CombosSection";
import { Marquee } from "@/components/Marquee";
import { ProducersSection } from "@/components/ProducersSection";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { useCart } from "@/lib/useCart";
import { PRODUCTS } from "@/data/seed";
import { Category, Combo } from "@/lib/types";

export default function Home() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "todos">("todos");
  const [search, setSearch] = useState("");

  // Filtrado memoizado
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === "todos" || p.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  // Mapa de cantidades en carrito por producto (para mostrar badge en card)
  const inCartMap = useMemo(() => {
    const map: Record<string, number> = {};
    cart.items.forEach((i) => (map[i.product.id] = i.quantity));
    return map;
  }, [cart.items]);

  // Handler para combos: agrega productos relacionados al carrito y abre drawer
  const handleAddCombo = (combo: Combo) => {
    // Estrategia: por cada item del combo, busca el producto por nombre similar
    // y lo agrega. Si no encuentra, no falla.
    combo.items.forEach((comboItem) => {
      const found = PRODUCTS.find((p) =>
        comboItem.name.toLowerCase().includes(p.name.toLowerCase().split(" ")[0])
      );
      if (found) cart.addItem(found, 1);
    });
    setCartOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header itemCount={cart.itemCount} onCartClick={() => setCartOpen(true)} />

      <Hero />

      <Marquee />

      {/* Mercado */}
      <section id="mercado" className="bg-cream-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="grid lg:grid-cols-12 gap-8 mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-moss-700" />
                <span className="text-[11px] tracking-[0.32em] uppercase text-moss-700 font-medium">
                  El mercado · Edición de la semana
                </span>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-[0.95] tracking-tightest">
                Lo que está
                <span className="italic font-light"> fresco </span>
                hoy.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="text-ink-soft leading-relaxed">
                {PRODUCTS.length} productos disponibles esta semana, todos cosechados o producidos por nuestros 18 productores asociados. Filtrá por categoría o buscá lo que necesités.
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-10">
            <Filters
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              search={search}
              onSearchChange={setSearch}
              resultsCount={filteredProducts.length}
            />
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  <ProductCard
                    product={product}
                    onAdd={cart.addItem}
                    inCart={inCartMap[product.id]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-ink-soft italic">
                No encontramos nada con esos filtros.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("todos");
                }}
                className="mt-4 text-moss-700 underline underline-offset-2 hover:text-moss-900"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      <CombosSection onAddCombo={handleAddCombo} />

      <ProducersSection />

      <Footer />

      {/* Cart drawer (modal) */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQty={cart.updateQuantity}
        onRemove={cart.removeItem}
        onClearCart={cart.clear}
      />

      {/* FAB carrito en móvil cuando hay items */}
      {cart.itemCount > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 right-5 sm:hidden z-30 bg-moss-800 hover:bg-moss-900 text-cream-50 rounded-full px-5 py-4 flex items-center gap-3 shadow-card animate-fade-up font-medium"
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-terra-500 text-cream-50 text-xs font-bold tabular-nums">
            {cart.itemCount}
          </span>
          <span>Ver canasta</span>
        </button>
      )}
    </main>
  );
}
