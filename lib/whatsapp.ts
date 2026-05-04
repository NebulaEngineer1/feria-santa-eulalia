import { CartItem, CheckoutForm, Zone } from "@/lib/types";
import { formatCRC } from "@/lib/format";

// Configuración única del número receptor de pedidos.
// Formato internacional sin "+", sin espacios, sin guiones.
export const WHATSAPP_NUMBER = "50688555027";

interface BuildMessageInput {
  orderCode: string;
  cart: CartItem[];
  form: CheckoutForm;
  subtotal: number;
  deliveryFee: number;
  total: number;
  zone?: Zone;
}

const PAYMENT_LABELS: Record<string, string> = {
  sinpe: "SINPE Móvil",
  tarjeta: "Tarjeta",
  efectivo: "Efectivo contra entrega",
};

const DELIVERY_LABELS: Record<string, string> = {
  domicilio: "Entrega a domicilio",
  retiro: "Retiro en punto físico",
};

/**
 * Genera un código único de pedido tipo FSE-2026-XXXX.
 * Suficiente para volumen bajo sin backend; ~1.6M combinaciones por año.
 */
export function generateOrderCode(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FSE-${year}-${random}`;
}

/**
 * Construye el mensaje de pedido para WhatsApp.
 * Formato sin emojis: usa etiquetas tipo [SECCION] para evitar problemas de encoding/fuente.
 * Orden: código, cliente, entrega, pago, productos, totales, notas.
 */
export function buildWhatsAppMessage(input: BuildMessageInput): string {
  const { orderCode, cart, form, subtotal, deliveryFee, total, zone } = input;

  const lines: string[] = [];

  lines.push("*NUEVO PEDIDO — Feria Santa Eulalia*");
  lines.push(`*Código:* ${orderCode}`);
  lines.push("");

  lines.push("*[CLIENTE]*");
  lines.push(`• Nombre: ${form.name}`);
  lines.push(`• Teléfono: ${form.phone}`);
  lines.push("");

  lines.push("*[ENTREGA]*");
  lines.push(`• Tipo: ${DELIVERY_LABELS[form.deliveryType]}`);
  if (form.deliveryType === "domicilio") {
    if (zone) lines.push(`• Zona: ${zone.id} — ${zone.name}`);
    lines.push(`• Dirección: ${form.address}`);
  }
  lines.push(`• Horario: ${form.schedule}`);
  lines.push("");

  lines.push("*[PAGO]*");
  lines.push(`• Método: ${PAYMENT_LABELS[form.paymentMethod]}`);
  lines.push("");

  lines.push("*[PRODUCTOS]*");
  cart.forEach((item, idx) => {
    const subtotalItem = item.product.price * item.quantity;
    lines.push(
      `${idx + 1}. ${item.product.name} — ${item.quantity} ${item.product.unit} × ${formatCRC(
        item.product.price
      )} = *${formatCRC(subtotalItem)}*`
    );
  });
  lines.push("");

  lines.push("*[TOTALES]*");
  lines.push(`• Subtotal: ${formatCRC(subtotal)}`);
  if (form.deliveryType === "domicilio") {
    lines.push(`• Envío: ${formatCRC(deliveryFee)}`);
  } else {
    lines.push(`• Envío: Retiro (sin costo)`);
  }
  lines.push(`• *TOTAL: ${formatCRC(total)}*`);

  if (form.notes && form.notes.trim().length > 0) {
    lines.push("");
    lines.push("*[NOTAS]*");
    lines.push(form.notes.trim());
  }

  lines.push("");
  lines.push("— Pedido generado desde feriasantaeulalia.cr");

  return lines.join("\n");
}

/**
 * Genera un link wa.me con el mensaje correctamente codificado.
 */
export function buildWhatsAppLink(message: string, phone = WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
