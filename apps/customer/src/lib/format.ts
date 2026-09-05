export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatPriceTier(tier: number): string {
  return '₼'.repeat(Math.max(1, Math.min(4, Math.round(tier))));
}

export function formatMoney(cents: number): string {
  return `${(cents / 100).toFixed(2)} ₼`;
}
