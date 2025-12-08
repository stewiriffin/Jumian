/**
 * Format price in Kenyan Shillings (KES)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price without currency symbol
 */
export function formatPriceSimple(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
