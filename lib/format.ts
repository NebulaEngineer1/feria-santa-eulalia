/**
 * Formatea un número como colones costarricenses.
 * Ejemplo: 12500 → "₡12.500"
 */
export function formatCRC(amount: number): string {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-CR").format(n);
}
