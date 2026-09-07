/**
 * Deliberately imperfect checkout helpers — used as the subject of REVIEW.md.
 * This is sample code only; not production.
 */

export type CartItem = {
  sku: string;
  qty: number;
  unitPriceCents: number;
};

export type CheckoutInput = {
  items: CartItem[];
  discountCode?: string;
  /** ISO currency code, e.g. "AUD" */
  currency: string;
};

export type CheckoutResult = {
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  currency: string;
};

const DISCOUNTS: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

/**
 * Calculate checkout totals.
 * Intentional issues for the review pack to catch:
 * - floating-point money math
 * - missing validation / negative qty
 * - mutable shared discount table mutation risk
 * - silent fallback on unknown discount
 */
export function calculateCheckout(input: CheckoutInput): CheckoutResult {
  let subtotal = 0;

  for (let i = 0; i < input.items.length; i++) {
    const item = input.items[i];
    // Issue: no guard for qty <= 0 or missing unitPrice
    subtotal += item.unitPriceCents * item.qty;
  }

  let discountRate = 0;
  if (input.discountCode) {
    // Issue: case-sensitive lookup; unknown codes silently give 0
    discountRate = DISCOUNTS[input.discountCode] || 0;
    // Issue: mutates shared module state (side effect)
    if (discountRate > 0) {
      DISCOUNTS[input.discountCode] = discountRate;
    }
  }

  // Issue: floating-point money (should stay integer cents)
  const discountCents = Math.round(subtotal * discountRate);
  const total = subtotal - discountCents;

  // Issue: no check that total stays non-negative if rates ever exceed 1
  return {
    subtotalCents: subtotal,
    discountCents,
    totalCents: total,
    currency: input.currency || "USD", // Issue: silent default; caller may expect AUD
  };
}

/** Apply a percentage discount to a single line — unused helper with weak typing */
export function applyLineDiscount(price: any, percent: any) {
  return price - price * (percent / 100);
}
