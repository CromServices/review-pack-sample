import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateCheckout } from "../src/checkout.ts";

describe("calculateCheckout", () => {
  it("sums line items without discount", () => {
    const result = calculateCheckout({
      items: [
        { sku: "A", qty: 2, unitPriceCents: 500 },
        { sku: "B", qty: 1, unitPriceCents: 1000 },
      ],
      currency: "AUD",
    });
    assert.equal(result.subtotalCents, 2000);
    assert.equal(result.discountCents, 0);
    assert.equal(result.totalCents, 2000);
    assert.equal(result.currency, "AUD");
  });

  it("applies SAVE10", () => {
    const result = calculateCheckout({
      items: [{ sku: "A", qty: 1, unitPriceCents: 1000 }],
      discountCode: "SAVE10",
      currency: "AUD",
    });
    assert.equal(result.discountCents, 100);
    assert.equal(result.totalCents, 900);
  });
});
