# ANR Creative — Portfolio Website

Production-ready portfolio site for ANR Creative web design studio.

## Structure

```
anr-create/
├── index.html          ← Main SPA (bilingual ES/EN)
├── css/styles.css      ← All styles
├── js/
│   ├── i18n.js         ← All translations (ES + EN)
│   └── main.js         ← Particles, animations, form, lang, cursor
├── demos/
│   ├── apex/           ← Demo: APEX Fitness Studio
│   ├── forma/          ← Demo: FORMA Architecture Studio
│   └── atelier-luna/   ← Demo: Atelier Luna Floristería
├── assets/             ← Favicons, OG image (add manually)
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

---

## How to customise

### 1. Replace the 3 demo project cards

In `index.html`, find each `<article class="project-card">` block.
In `js/i18n.js`, find the `proj.1.*`, `proj.2.*`, `proj.3.*` keys in both `es` and `en`.

For each card update:
- `proj.N.sector` — sector label (e.g. "Restauración · Hostelería")
- `proj.N.sub`    — subtitle (e.g. "Restaurante de autor")
- `proj.N.desc`   — description paragraph (both ES and EN)
- The `href` on `<a>` links and `card-link` → point to the deployed demo URL
- The `card-visual` CSS class — add a new class in `styles.css` for the visual background

### 2. Replace the Formspree endpoint

In `index.html`, find:
```html
<form id="contact-form" action="https://formspree.io/f/PLACEHOLDER"
```
Replace `PLACEHOLDER` with your real Formspree form ID.
Get one free at https://formspree.io

### 3. Replace the canonical domain

If the domain changes from `anrcreative.es`, do a global find & replace across:
- `index.html` (canonical, hreflang, og:url, og:image, JSON-LD)
- `sitemap.xml`
- `robots.txt` (Sitemap line)

### 4. Add the OG image

Create a 1200×630px image and save it as `/assets/og-image.jpg`.
This is used by social media previews (Facebook, Twitter, WhatsApp, LinkedIn).

### 5. Add favicons

Generate from https://realfavicongenerator.net and place in `/assets/`:
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`

### 6. Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://anrcreative.es/`
3. Verify via HTML file or DNS TXT record
4. Submit sitemap: `https://anrcreative.es/sitemap.xml`

---

## Deploy (Vercel)

Connected to GitHub — every push to `main` triggers an automatic deploy.

```bash
git add .
git commit -m "update"
git push
```

---

## Tech stack

- Pure HTML5 + CSS3 + Vanilla JS — no frameworks
- tsParticles (CDN) — hero particle effect
- Google Fonts — Playfair Display + Inter
- Formspree — contact form backend
- Vercel — static hosting
