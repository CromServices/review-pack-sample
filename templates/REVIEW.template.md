<!--
REVIEW TEMPLATE. Copy to REVIEW.md in the delivery and fill every {{...}}.
Canonical findings format; REVIEW.md in this repo is a filled example.
Public-safe: no personal names (reviewer is "Crom Services"), no amounts.
Severity:
  block  = must fix before merge (correctness, security, data or money loss)
  should = fix soon; real risk or cost, but not a merge stopper
  nit    = style or clarity; optional
Hours band: S (under ~2h), M (half a day to a day), L (more than a day).
Delete this comment before delivery.
-->

# Review pack: {{subject}}

**Client / assignment:** {{client or repo}}, {{PR / module / prompt pack reviewed}}
**Reviewer:** Crom Services
**Date:** {{YYYY-MM-DD}}
**Hours band:** {{S | M | L}}
**Billable note:** {{what this review covered, and anything noted but not billed}}

---

## Assignment summary

{{One short paragraph: what was reviewed, for what (correctness, safety, clarity), and the scope limits.}}

---

## Verdict

**{{Ready to merge | Ready after fixes | Not ready to merge as-is}}.** {{One or two sentences: count of block / should / nit and how heavy the fix is.}}

---

## Findings

<!-- One section per finding, ordered block, then should, then nit. -->

### block: {{short title}}

{{What is wrong and why it matters.}}

**Where:** {{file / function / line}}
**Suggested fix:** {{concrete change, plus the test that proves it}}

---

### should: {{short title}}

{{What is wrong and why it matters.}}

**Where:** {{file / function / line}}
**Suggested fix:** {{concrete change}}

---

### nit: {{short title}}

{{Style or clarity note.}}

---

## Out of scope (noted, not billed)

- {{item}}

---

## Remediation estimate

{{Hours band for the fix and what it includes. Say whether a re-review is suggested.}}
