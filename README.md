# Captain0 marketing site (preview)

English marketing site for **Captain0**, a family workshop in Piatra Neamț, Neamț County, Romania. Primary product: **raw rare European wood** sold B2B (live-edge slabs, burl, blanks, bookmatched pairs). Finished epoxy river tables are **portfolio only**, not the main SKU.

This repository is a **preview / PR build**. It is **not** the live [captain0.com](https://captain0.com) domain. Do not attach a custom domain to this project until Bogdan says so.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (must succeed before merge) |
| `npm run start` | Serve the production build |
| `npm test` | Content-contract tests (locked copy, `[TBD]` fields) |
| `npm run lint` | ESLint |

## Edit stock without touching UI code

Listings and page copy live under [`content/en/`](content/en/):

- `copy.json` — locked marketing copy, CTAs, contact placeholders
- `stock.json` — catalog cards (mark `sample: true` until live inventory exists)
- `portfolio.json` — finished-table examples (`primarySku: false`)

Keep `[TBD]` visible. Do not invent years in business, prices, moisture, weights, defects, email, or WhatsApp numbers.

English is the only locale shipped. A `content/ro/` catalog can be added later by extending `LOCALES` in `src/lib/content.ts` — do not invent Romanian copy until it is provided.

## Pages

- `/` Home
- `/stock` Catalog (sample / placeholder stock)
- `/portfolio` Finished tables, labeled portfolio
- `/about` Family workshop
- `/contact` Email / WhatsApp placeholders + location
