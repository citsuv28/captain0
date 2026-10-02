# Captain0 marketing site (preview)

English marketing site for **Captain0**, a family workshop in Piatra Neamț, Neamț County, Romania. Primary product: **raw rare European wood** sold B2B (live-edge slabs, burl, blanks, bookmatched pairs). Finished epoxy river tables are **portfolio only**, not the main SKU.

This repository is a **preview / PR build**. It is **not** the live [captain0.com](https://captain0.com) domain. Do not attach a custom domain to this project until Bogdan says so. Preview builds stay `noindex`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static production build (`out/`) |
| `npm run start` | Serve the exported `out/` folder |
| `npm test` | Content-contract tests (locked copy, empty unfilled fields) |
| `npm run lint` | ESLint |

## How Bogdan edits one photo’s species

All stock and portfolio cards read from **one JSON file**: [`content/photos.json`](content/photos.json). You do not need to touch React components.

Example — set species on the Home featured slab `C0-A03`:

1. Open `content/photos.json`.
2. Find the object whose `"id"` is `"C0-A03"`.
3. Change the species fields (leave other blanks as `""` if still unknown):

```json
"id": "C0-A03",
"species_ro": "plop negru bubos",
"species_en": "European poplar burl (mappa)",
"type": "slab",
"lane": "A_placi",
"dims": {
  "length": "",
  "width": "",
  "thickness": ""
},
"notes": "Home featured. Huge live-edge mappa slab held for scale. Inventory fields incomplete."
```

4. Save. Refresh the site. `/stock` cards use `type` `slab`, `log`, or `veneer`. `/portfolio` cards use `type` `table` or `epoxy`.

**Rules**

- Empty string `""` means “not filled yet”. Do not invent lengths, moisture, weight, or prices.
- `type` must be one of: `slab` | `log` | `veneer` | `table` | `epoxy`.
- `lane` must be one of: `A_placi` | `B_furnir` | `C_special`.
- `sort` is display order. Home featured is `C0-A03`. Stock is A03, A04, A02, A09, A06, B04. Portfolio is P01–P06.
- The site photo set is these 12 files only, in [`public/photos/stock/`](public/photos/stock/) and [`public/photos/portfolio/`](public/photos/portfolio/). No workshop, crane, or collage heroes.


Marketing sentences (hero, about, contact placeholders) stay in [`content/en/copy.json`](content/en/copy.json). Keep `[TBD]` there until real values exist.

English is the only locale shipped. A Romanian locale can be added later as `content/ro/` — do not invent Romanian marketing copy until it is provided. `species_ro` on photo cards is a per-piece label, not a full locale.

## Pages

- `/` Home
- `/stock` Catalog (sample / placeholder stock)
- `/portfolio` Finished tables, labeled portfolio
- `/about` Family workshop
- `/contact` Email / WhatsApp placeholders + location

## Preview hosting

Clickable preview (noindex, not captain0.com):

**https://temporary-swift-geode-peb0r3g.vercel.app/**

| Page | URL |
| --- | --- |
| Home | https://temporary-swift-geode-peb0r3g.vercel.app/ |
| Stock | https://temporary-swift-geode-peb0r3g.vercel.app/stock/ |
| Portfolio | https://temporary-swift-geode-peb0r3g.vercel.app/portfolio/ |
| About | https://temporary-swift-geode-peb0r3g.vercel.app/about/ |
| Contact | https://temporary-swift-geode-peb0r3g.vercel.app/contact/ |

Keep this deployment (otherwise anonymous Vercel previews expire): [claim on Vercel](https://vercel.com/claim-deployment?code=a154b455-dd92-4876-b6c3-b2c3bef85b02).

For a lasting GitHub preview, the repo owner enables Pages once: **Settings → Pages → Source: GitHub Actions**. After that, this branch publishes to `https://citsuv28.github.io/captain0/` (still noindex, still not captain0.com). Importing the GitHub repo into a Vercel account also gives durable `*.vercel.app` URLs on every PR. Do not attach the custom domain until Bogdan asks.
