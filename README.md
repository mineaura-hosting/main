# MineAura Hosting — Website

A premium, production-ready marketing site for **MineAura Hosting**, built with the official
MineAura identity: deep navy surfaces (`#030B25` / `#061638` / `#091A3D`), cyan → purple →
pink gradients, thin gradient borders and clean white typography.

BisectHosting-level structure and polish, entirely original MineAura layout, copy and visual
language. No frameworks, no build step, no external requests — just three files of code.

---

## 1. Run it

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 4173        # then visit http://localhost:4173
```

Deploy by uploading the whole folder to any static host (Netlify, Vercel, Cloudflare Pages,
cPanel, Nginx, S3…). Nothing needs to be compiled.

---

## 2. Drop in the four branding PNGs (only remaining step)

The uploaded MineAura assets were not present in the workspace, so the site is wired to the
exact filenames and currently shows a styled text fallback wherever a PNG is missing
(no broken images, ever). Copy the official files into `assets/img/`:

| File | Used for |
| --- | --- |
| `assets/img/favicon.png` | Favicon, navbar hexagonal mark, footer mark |
| `assets/img/minecraft_title.png` | Wordmark in the navbar and footer |
| `assets/img/minecraft_title_3.png` | **AURA BUDGET PLANS** section title |
| `assets/img/minecraft_title_4.png` | **AURA ADVANCED PLANS** section title |
| `assets/img/minecraft_title_2.png` | **AURA VPS PLANS** section title |

The PNGs are used exactly as supplied: never redrawn, recoloured, cropped or distorted.
CSS only constrains height, so original aspect ratios and transparency are preserved
(`image-rendering: pixelated` keeps the pixel art crisp when scaled).

`assets/img/hero-island.svg` is an original decorative MineAura illustration (a floating
voxel island in brand colours), not a branding asset — replace or delete it freely.

---

## 3. File structure

```
index.html                  All page markup (semantic, SEO + JSON-LD ready)
assets/css/main.css         Design system: tokens, components, responsive, motion
assets/js/config.js         ← EDIT ME: plans, recommended flag, locations, Discord URL
assets/js/main.js           Rendering + all interactions (~250 lines, no dependencies)
assets/img/                 Branding PNGs (drop-in) + hero illustration
tools/make_hero_island.py   Generator for the hero SVG (optional)
```

---

## 4. Editing content

### Plans and pricing — `assets/js/config.js`

Every package lives in `window.MINEAURA_CONFIG.plans` under three categories:
`budget`, `advanced`, `vps`. Each plan supports:

| Field | Notes |
| --- | --- |
| `name` | Package name |
| `blurb` | One-line positioning |
| `ram`, `cpu`, `storage`, `backups`, `ddos`, `location` | Spec rows, in this order |
| `price` + `period` | Rendered as `$price period` |
| `cta` | Optional; defaults to `MINEAURA_CONFIG.purchaseCta` |
| `recommended` | `true` highlights the card (only one per category) |

**All values currently shipped are clearly-labelled placeholders** (see the footnote under
each pricing grid). Replace them with MineAura's real packages before launch.

### Recommended plan

Set `recommended: true` on the plan you want highlighted and remove it from the others.
The card gains a gradient border, a "Recommended" badge, elevation and a purple glow.

### Locations — `assets/js/config.js`

Update the `locations` array with **only verified MineAura regions**. Fields:
`code` (2-letter badge fallback), `flag` (emoji), `name`, `region`, `status`, `latency`.
Latency is intentionally a placeholder (`—`) until real measurements exist.

---

## 5. Purchases → Discord (by design)

There is **no checkout, cart, payment gateway or order form anywhere** in this project.

Every purchase-related control — *Choose Plan, Order in Discord, Client Area, Get Started,
Join Discord, sales links* — points to:

```
https://discord.gg/QuMcykHhRR
```

and opens in the **same browser tab** (no `target="_blank"`). `main.js` also re-applies this
URL at runtime to every `[data-discord]` element, so the link can never drift. To change it,
edit `discordUrl` in `config.js` (plan CTAs are generated from it automatically).

---

## 6. What's included

- Sticky navbar: transparent over the hero, blurred navy after scroll, scroll-spy active link
- Hero: headline, value line, three highlight chips, gradient CTA, voxel island visual, marquee
- Hosting overview: three category cards → three separate pricing sections (never merged)
- Pricing grid: RAM, CPU, storage, backups, DDoS, location, price, configurable recommendation
- Ten feature cards with inline SVG icons (no external icon library)
- Pterodactyl-inspired control-panel mockup: console, live-style CPU/RAM/disk bars, status,
  start / restart / stop — a visual mockup only, not a live integration
- Server locations with flags, availability and latency placeholders
- "Built for your next adventure" benefit grid
- Eight-question FAQ accordion (purchases explained as Discord-based)
- Support CTA band, closing CTA, full footer with logo, description and navigation
- Motion: scroll reveal, hover transitions, gradient glows, smooth accordion — all lightweight
  and fully disabled under `prefers-reduced-motion`
- Responsive at 1920 → 390 px with no horizontal overflow; drawer navigation under 1080 px
- Accessibility: skip link, focus-visible rings, ARIA on the accordion, menu and mockup,
  semantic landmarks, contrast-checked palette
- SEO: descriptive title/meta, canonical, Open Graph/Twitter tags, Organization + WebSite +
  FAQPage JSON-LD. No fake statistics, reviews or testimonials anywhere.

---

## 7. Pre-launch checklist

- [ ] Copy the four branding PNGs into `assets/img/`
- [ ] Replace every placeholder price, spec and location with confirmed values
- [ ] Set the canonical URL and `og:url` / `og:image` to the live domain
- [ ] Choose the recommended plan per category
- [ ] Confirm the Discord invite is permanent
- [ ] Point support/documentation links at the real pages (they currently all go to Discord,
      since sales and support are Discord-based)

© 2026 MineAura Hosting. All Rights Reserved.
