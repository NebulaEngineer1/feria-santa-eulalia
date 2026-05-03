# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server at http://localhost:3000
npm run build    # production build
npm start        # serve production build
npm run lint     # next lint
```

There is no test suite.

## Architecture

Marketplace MVP for a Costa Rican farmers' market (Feria Santa Eulalia). **No backend** — orders are not persisted; they are formatted as a WhatsApp message and sent via `wa.me` link to a single admin number. This shapes everything below.

### Data flow

1. `data/seed.ts` is the source of truth at runtime — `PRODUCTS`, `COMBOS`, `ZONES`, `CATEGORIES` are static module-level constants imported directly by client components.
2. `app/page.tsx` is the single orchestrator: a `"use client"` component that holds filter/search state, owns the cart via `useCart`, and renders all sections in a fixed order (Header → Hero → Marquee → mercado grid → Combos → Producers → Footer → Cart drawer).
3. `lib/useCart.ts` is a plain `useState`-based hook (no Context, no Redux). Cart lives only in memory — refresh wipes it. Stock clamping happens inside the hook (`Math.min(quantity, product.stock)`), so callers don't need to validate.
4. `Cart.tsx` is a two-step drawer (`step: "cart" | "checkout"`). On submit it calls `buildWhatsAppMessage` + `buildWhatsAppLink` and opens `https://wa.me/...` — that is the order submission.

### Combo → cart heuristic

`app/page.tsx::handleAddCombo` does **not** map combo items to product IDs. It does a fuzzy name match (`comboItem.name` contains the first word of `product.name`, lowercased). Mismatches silently no-op. If you add/rename combos or products, verify the match still works rather than assuming a registry exists.

### Money & business rules

- All prices are integer CRC (Costa Rican colones). Format only at the edges via `lib/format.ts::formatCRC`.
- Delivery fee comes from `ZONES[zone].fee` and is **0 for `retiro`** (pickup). The `Cart` computes `total = subtotal + deliveryFee` — don't recompute elsewhere.
- Five zones, three payment methods (`sinpe` / `tarjeta` / `efectivo`), two delivery types (`domicilio` / `retiro`) — all enumerated in `lib/types.ts`. Add new options there first.

### WhatsApp integration — production gotcha

`lib/whatsapp.ts::WHATSAPP_NUMBER = "50688887777"` is a placeholder. **Must be replaced before production.** Format: country code + number, no `+`, no spaces, no dashes. The message body uses `*bold*` markdown (WhatsApp-flavored) and is `encodeURIComponent`-encoded, so emojis/tildes/ñ work as-is.

## Conventions

- **Path alias**: `@/*` → repo root (configured in `tsconfig.json`). Always import as `@/components/Foo`, `@/lib/types`, `@/data/seed`.
- **Client components**: most components are `"use client"` because they touch state or browser APIs. Keep `app/layout.tsx` as the only server component unless you have a reason to add more.
- **Design tokens are not optional**: the `cream`/`moss`/`terra`/`ink` palette and `font-display` (Fraunces) / `font-sans` (Manrope) in `tailwind.config.ts` define the brand. Don't introduce raw hex colors or new font families without a deliberate reason — see README.md "Notas de diseño".
- **Spanish UI**: all user-facing copy is in Costa Rican Spanish (voseo). Match the existing tone in new strings.
- **Stock is enforced in the hook, not the UI**: `QuantityStepper` and `ProductCard` can pass any number to `addItem`/`updateQuantity` — `useCart` clamps. Don't duplicate the clamp logic in components.
