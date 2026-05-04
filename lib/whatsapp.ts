import { CartItem, CheckoutForm, Zone } from "@/lib/types";
import { formatCRC } from "@/lib/format";

// Número receptor de pedidos. Reemplazar con el número real en producción.
// Formato internacional sin "+", sin espacios, sin guiones.
// Ejemplo CR: 50688887777
export const WHATSAPP_NUMBER = "50688555027";

interface BuildMessageInput {
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
 * Construye un mensaje de pedido legible y bien formateado.
 * Incluye encabezado, cliente, productos, totales y método de pago.
 */
export function buildWhatsAppMessage(input: BuildMessageInput): string {
  const { cart, form, subtotal, deliveryFee, total, zone } = input;

  const lines: string[] = [];

  lines.push("🛒 *NUEVO PEDIDO — Feria Santa Eulalia*");
  lines.push("");
  lines.push("👤 *Cliente*");
  lines.push(`• Nombre: ${form.name}`);
  lines.push(`• Teléfono: ${form.phone}`);
  if (form.deliveryType === "domicilio") {
    lines.push(`• Dirección: ${form.address}`);
    if (zone) lines.push(`• Zona: ${zone.id} — ${zone.name}`);
  } else {
    lines.push("• Modalidad: Retiro en punto físico");
  }
  lines.push(`• Horario: ${form.schedule}`);
  lines.push("");

  lines.push("📦 *Productos*");
  cart.forEach((item, idx) => {
    const subtotalItem = item.product.price * item.quantity;
    lines.push(
      `${idx + 1}. ${item.product.name} — ${item.quantity} ${item.product.unit} × ${formatCRC(
        item.product.price
      )} = *${formatCRC(subtotalItem)}*`
    );
  });
  lines.push("");

  lines.push("💰 *Totales*");
  lines.push(`• Subtotal: ${formatCRC(subtotal)}`);
  if (form.deliveryType === "domicilio") {
    lines.push(`• Envío: ${formatCRC(deliveryFee)}`);
  } else {
    lines.push(`• Envío: Retiro (sin costo)`);
  }
  lines.push(`• *TOTAL: ${formatCRC(total)}*`);
  lines.push("");

  lines.push("💳 *Pago*");
  lines.push(`• Método: ${PAYMENT_LABELS[form.paymentMethod]}`);
  lines.push(`• Modalidad: ${DELIVERY_LABELS[form.deliveryType]}`);

  if (form.notes && form.notes.trim().length > 0) {
    lines.push("");
    lines.push("📝 *Notas*");
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
