# Feria Santa Eulalia · Marketplace MVP

Marketplace web para la feria del agricultor de Santa Eulalia (Atenas, Costa Rica). Permite a clientes hacer pedidos desde web y enviarlos por WhatsApp a la administración central.

Estética **organic editorial** — tipografía Fraunces + Manrope, paleta moss/cream/terra, layouts asimétricos tipo revista. Pensado para sentirse artesanal, no como una tienda genérica.

---

## Stack

- **Next.js 14** (App Router)
- **React 18** (hooks puros, sin librerías de estado)
- **TypeScript** estricto
- **Tailwind CSS** con tokens de diseño custom
- **lucide-react** para iconografía

Sin backend. Estado en memoria. Listo para conectar a Supabase / Postgres / API REST cuando llegue el momento.

## Setup

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Build de producción:
```bash
npm run build && npm start
```

---

## Estructura

```
.
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Página principal (orquestador)
│   └── globals.css         # Estilos globales + fuentes
├── components/
│   ├── Header.tsx          # Nav + carrito + banda superior
│   ├── Hero.tsx            # Hero editorial con stats
│   ├── Marquee.tsx         # Banda animada tipo periódico
│   ├── Filters.tsx         # Buscador + chips de categorías
│   ├── ProductCard.tsx     # Card de producto
│   ├── CombosSection.tsx   # Sección oscura con combos
│   ├── ProducersSection.tsx# Storytelling de productores
│   ├── Footer.tsx          # Zonas + footer corporativo
│   ├── Cart.tsx            # Drawer con carrito + checkout (2 pasos)
│   └── QuantityStepper.tsx # +/- editable con input
├── lib/
│   ├── types.ts            # Tipos del dominio
│   ├── format.ts           # Formato CRC
│   ├── whatsapp.ts         # Construcción de mensaje + link wa.me
│   └── useCart.ts          # Hook custom del carrito
└── data/
    └── seed.ts             # Productos, combos, zonas
```

---

## WhatsApp — configuración crítica

El número receptor está en `lib/whatsapp.ts`:

```ts
export const WHATSAPP_NUMBER = "50688887777";
```

**Antes de salir a producción**, reemplazar por el número real del administrador. Formato: código país + número, sin `+`, sin espacios, sin guiones.

El mensaje generado se ve así en WhatsApp:
```
🛒 NUEVO PEDIDO — Feria Santa Eulalia

👤 Cliente
• Nombre: María Pérez
• Teléfono: 88887777
• Dirección: 200m sur del parque
• Zona: 2 — San Rafael de Atenas
• Horario: 9:00 — 11:00 AM

📦 Productos
1. Tomate aliñado — 2 kg × ₡1.200 = ₡2.400
2. Aguacate Hass — 1 kg × ₡2.500 = ₡2.500

💰 Totales
• Subtotal: ₡4.900
• Envío: ₡2.000
• TOTAL: ₡6.900

💳 Pago
• Método: SINPE Móvil
• Modalidad: Entrega a domicilio
```

El encoding está manejado con `encodeURIComponent`, así que tildes, ñ y emojis funcionan correctamente.

---

## Modelo de negocio reflejado en el código

| Reglas del negocio | Dónde está |
|---|---|
| Días: viernes y sábado | `Header.tsx` (banda superior) + `Footer.tsx` |
| 5 zonas con tarifas | `data/seed.ts` → `ZONES` |
| Domicilio vs retiro | `Cart.tsx` (toggle + lógica de fee) |
| 3 métodos de pago | `Cart.tsx` (SINPE / tarjeta / efectivo) |
| Productos por proveedor | `Product.supplier` + `supplierLocation` |
| Combos predefinidos | `data/seed.ts` → `COMBOS` |

---

## Próximos pasos sugeridos para v2

1. **Backend**: API routes en Next.js + Postgres (Supabase). Tabla `orders`, `products`, `suppliers`, `zones`.
2. **Persistencia carrito**: `localStorage` o cookie para sobrevivir refresh.
3. **Panel admin**: ruta `/admin` con login (NextAuth + Supabase) para gestionar productos y consolidar pedidos.
4. **Estado de pedido**: cambiar de "enviar por WhatsApp" a crear pedido en BD + notificar por WhatsApp Business API (Twilio o Meta directo).
5. **Pagos**: SDK SINPE, integración Tilopay o PayPal CR.
6. **Repartidores**: panel separado con rutas optimizadas por zona.
7. **Inventario en tiempo real**: stock que disminuye con cada pedido confirmado.
8. **PWA**: manifest + service worker para uso offline en feria.

---

## Notas de diseño

La paleta y tipografía no son opcionales — definen la identidad. Si se cambian, perdés el "carácter" que diferencia esto de un template genérico de Shopify.

- **Verde olivo (`moss`)**: tierra, no "fresh tech green"
- **Crema (`cream`)**: papel reciclado, fondo cálido
- **Terracota (`terra`)**: barro, acento humano
- **Fraunces** (display): serif variable con personalidad
- **Manrope** (body): humanista, legible, no "Inter más"

El grano sutil (`grain`) sobre fondos crema imita la textura de papel impreso.
