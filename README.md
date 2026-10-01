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

Example — set species on the mappa timber photo `C0-B2-060`:

1. Open `content/photos.json`.
2. Find the object whose `"id"` is `"C0-B2-060"`.
3. Change the species fields (leave other blanks as `""` if still unknown):

```json
"id": "C0-B2-060",
"species_ro": "plop negru bubos",
"species_en": "European poplar burl (mappa)",
"type": "slab",
"lane": "A_placi",
"dims": {
  "length": "",
  "width": "",
  "thickness": ""
},
"notes": "Busteni / raw material. Inventory fields incomplete."
```

4. Save. Refresh the site. `/stock` cards use `type` `slab`, `log`, or `veneer`. `/portfolio` cards use `type` `table` or `epoxy`.

**Rules**

- Empty string `""` means “not filled yet”. Do not invent lengths, moisture, weight, or prices.
- `type` must be one of: `slab` | `log` | `veneer` | `table` | `epoxy`.
- `lane` must be one of: `A_placi` | `B_furnir` | `C_special`.
- Photos themselves live in [`public/photos/`](public/photos/). Point `photo.src` at `/photos/filename.jpg`.

Marketing sentences (hero, about, contact placeholders) stay in [`content/en/copy.json`](content/en/copy.json). Keep `[TBD]` there until real values exist.

English is the only locale shipped. A Romanian locale can be added later as `content/ro/` — do not invent Romanian marketing copy until it is provided. `species_ro` on photo cards is a per-piece label, not a full locale.

## Pages

- `/` Home
- `/stock` Catalog (sample / placeholder stock)
- `/portfolio` Finished tables, labeled portfolio
- `/about` Family workshop
- `/contact` Email / WhatsApp placeholders + location

## Preview hosting

GitHub Pages deploys from this preview branch (not `main`, not captain0.com):

`https://citsuv28.github.io/captain0/`

Connecting the repo to Vercel later will add `*.vercel.app` preview URLs. Do not attach the custom domain until Bogdan asks.
