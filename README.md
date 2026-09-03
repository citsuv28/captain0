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

## Photos

Workshop photos live in [`public/photos/`](public/photos/) and are referenced from `content/en/stock.json` and `content/en/portfolio.json`. Finished tables (C0-P01–P03) are portfolio only.

## Edit stock without touching UI code

Listings and page copy live under [`content/en/`](content/en/):

- `copy.json` — locked marketing copy, CTAs, contact placeholders
- `stock.json` — catalog cards (mark `sample: true` until live inventory exists)
- `portfolio.json` — finished-table examples (`primarySku: false`)

Keep `[TBD]` visible. Do not invent years in business, prices, moisture, weights, defects, email, or WhatsApp numbers.

English is the only locale shipped. A Romanian locale can be added later as `content/ro/` plus locale-aware routing in the App Router — do not invent Romanian marketing copy until it is provided. Species common names already listed in the brief (mappa / plop negru bubos, nuc, stejar) may appear as parentheticals on English stock cards.

## Pages

- `/` Home
- `/stock` Catalog (sample / placeholder stock)
- `/portfolio` Finished tables, labeled portfolio
- `/about` Family workshop
- `/contact` Email / WhatsApp placeholders + location
