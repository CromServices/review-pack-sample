# Review pack — checkout helpers (sample)

**Client / assignment:** Public portfolio sample (fictional cart checkout module)
**Reviewer:** Crom Services
**Date:** 2026-09-07
**Hours band:** S
**Billable note:** Sample only — not a live engagement. Illustrates a finished S-band review pack.

---

## Assignment summary

Review a small TypeScript checkout calculator (`src/checkout.ts`) for correctness, money-handling safety, and API clarity before merge. Scope limited to the single module and its public surface; no framework or payment-provider integration in scope.

---

## Verdict

**Not ready to merge as-is.** Two **block** findings around money math / input validation, plus clear **should** improvements. Easy S-band remediation; re-review of a patch PR would be light.

---

## Findings

### block — Money arithmetic uses floating-point rates on integer cents

`discountCents` is derived via `subtotal * discountRate` where `discountRate` is a float (`0.1`, `0.2`). Even with `Math.round`, this pattern drifts on larger carts and non-terminating binary fractions. Prefer fixed-point: store rates as basis points (e.g. `1000` = 10%) and compute `Math.trunc((subtotal * bps) / 10000)` (or banker rounding policy documented explicitly).

**Where:** `calculateCheckout`, discount application
**Suggested fix:** Integer-only cents + basis-point discounts; unit tests for awkward totals (e.g. 333 cents x 10%).

---

### block — Missing validation for quantity and price

`qty` and `unitPriceCents` are trusted without bounds checks. Negative `qty` or negative prices invert totals; zero/`NaN` values produce silent bad money. Callers (HTTP handlers, admin tools) will eventually pass bad data.

**Where:** loop over `input.items`
**Suggested fix:** Reject with an explicit error type (`ValidationError`) when `qty < 1`, `!Number.isInteger(unitPriceCents)`, or `unitPriceCents < 0`. Fail closed.

---

### should — Shared `DISCOUNTS` table is mutated

The success path writes back into the module-level `DISCOUNTS` object. Unnecessary side effect; complicates tests and concurrency. Treat the map as read-only.

**Where:** `DISCOUNTS[input.discountCode] = discountRate`
**Suggested fix:** Remove the write; export a frozen map or lookup function.

---

### should — Unknown / mistyped discount codes fail silently

`DISCOUNTS[code] || 0` means `save10` or `SAVE1O` quietly applies no discount. Ops and support will chase broken promos.

**Suggested fix:** If `discountCode` is present and not in the table, throw or return a structured error; normalize case if product requires case-insensitivity.

---

### should — Silent currency default to `"USD"`

`input.currency || "USD"` hides missing currency on an AU-facing sample. Prefer requiring `currency` (already on the type) and dropping the fallback, or defaulting to `"AUD"` if product policy says so — but document it.

---

### nit — `applyLineDiscount` uses `any` and is unused

Weak typing and dead code in the same PR surface. Either wire it with proper types (`number` cents + basis points) or delete it from the diff.

---

### nit — Index `for` loop vs `for...of`

Style only; `for (const item of input.items)` is clearer and avoids off-by-one noise.

---

## Out of scope (noted, not billed)

- Payment capture / PSP integration
- Tax / GST line items
- Idempotency keys for checkout sessions

---

## Remediation estimate

S-band patch: validation + integer discount math + remove mutation + tests for edge cases. Re-review optional after PR.
