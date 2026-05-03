"use client";

import { useState, useCallback, useMemo } from "react";
import { CartItem, Product } from "@/lib/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

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
