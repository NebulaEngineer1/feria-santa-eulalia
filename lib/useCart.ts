"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "fse:cart:v1";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Cargar carrito persistido en el primer mount (cliente).
  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  // Persistir cambios. El flag `hydrated` evita pisar el storage con [] en el primer render.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // QuotaExceededError u otros: ignorar, el estado en memoria sigue funcionando.
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id !== productId) return i;
          const clamped = Math.max(0, Math.min(quantity, i.product.stock));
          return { ...i, quantity: clamped };
        })
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    subtotal,
    itemCount,
  };
}
