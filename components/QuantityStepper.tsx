"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = "md" }: Props) {
  const isSm = size === "sm";
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw === "") {
      onChange(min);
      return;
    }
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
  };

  return (
    <div
      className={`inline-flex items-center bg-cream-100 border border-moss-100 rounded-full ${
        isSm ? "h-9" : "h-11"
      }`}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
        className={`flex items-center justify-center text-moss-700 hover:text-moss-900 hover:bg-moss-100 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSm ? "w-9 h-9" : "w-11 h-11"
        }`}
      >
        <Minus className={isSm ? "w-3.5 h-3.5" : "w-4 h-4"} strokeWidth={2.5} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        aria-label="Cantidad"
        className={`bg-transparent text-center font-medium text-ink focus:outline-none tabular-nums ${
          isSm ? "w-8 text-sm" : "w-10 text-base"
        }`}
      />
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className={`flex items-center justify-center text-moss-700 hover:text-moss-900 hover:bg-moss-100 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
          isSm ? "w-9 h-9" : "w-11 h-11"
        }`}
      >
        <Plus className={isSm ? "w-3.5 h-3.5" : "w-4 h-4"} strokeWidth={2.5} />
      </button>
    </div>
  );
}
