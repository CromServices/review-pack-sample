# Review pack sample

Sample code-review delivery pack: a small TypeScript subject under review plus a finished `REVIEW.md` and a reusable template.

<!-- Toolchain from CromServices/crom-ts-api-starter at b2cd23a (package.json "starter.config"): tsconfig*, .gitignore, LICENSE, npm scripts. This sample is not an API, so it takes no Express, Docker or Fly files. -->

## What it is

A public sample of how Crom Services delivers a code review. It is not a client engagement.

- `src/checkout.ts`: deliberately imperfect checkout helpers, the subject under review.
- `REVIEW.md`: the finished review pack, with verdict, findings graded **block / should / nit**, hours band and billable note.
- `templates/REVIEW.template.md`: the canonical findings format that every real review starts from.
- `test/`: minimal `node:test` smoke tests for the subject.

## What it proves

- A review arrives as one structured document: a scoped assignment, a clear verdict, findings tagged by severity with where and how to fix, and an hours band (S / M / L) for the remediation.
- Findings are concrete enough to act on (money math, input validation, side effects, silent defaults), not generic advice.

## Live link

Not hosted. The deliverable is [`REVIEW.md`](REVIEW.md) in this repo.

## Run in 3 commands

Needs Node 20 or newer.

```bash
npm install
npm test
npm run check      # strict typecheck
```

`npm run build` compiles the subject to `dist/`.

## Reuse for a new job

1. Copy [`templates/REVIEW.template.md`](templates/REVIEW.template.md) into the delivery as `REVIEW.md`.
2. Fill every `{{...}}`: subject, assignment, date, hours band, verdict, then one section per finding (block, then should, then nit).
3. Delete the guidance comment at the top and check the public-face rules (no personal names, location "Australia" only).
4. For a TypeScript subject that needs a runnable harness, start from [CromServices/crom-ts-api-starter](https://github.com/CromServices/crom-ts-api-starter) and set `starter.config.ref` to the starter commit.

## Footer

---

Crom Services · Australia · cromservices@gmail.com
Site: https://cromservices.com.au · Packs: https://cromservices.github.io/job-page-sample/packs/

<a href="https://cromservices.com.au"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cromservices.com.au/brand/credit/crom-credit-lockup-dark@2x.png"><img src="https://cromservices.com.au/brand/credit/crom-credit-lockup-light@2x.png" width="175" height="20" alt="Built by Crom Services"></picture></a>

MIT, see LICENSE.
