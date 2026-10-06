# BJCRUM landing-site export

Exact public frontend captured from https://bjcrum.com on 6 October 2026.
The original HTML, CSS, JavaScript, fonts, images, and 3D model are preserved
byte-for-byte. This is a static, editable export, not the unpublished source
project or the authenticated BJCRUM application.

## Preview locally

Install Node.js 18 or newer if it is not already available. Extract the ZIP,
open a terminal in the `bjcrum-lander` folder, and run:

```sh
node server.mjs
```

Open http://127.0.0.1:4173. Use `node server.mjs 4174` for a different port.
Stop with Ctrl+C. No npm install, build command, environment file, API key,
or paid AI call is needed. Use the local server instead of double-clicking
the HTML: the site uses root-relative assets and JavaScript modules.

## Contents

- `public/index.html`: homepage, including inline SVG artwork and copy.
- `public/css/` and `public/tailwind.css`: existing compiled styles.
- `public/js/`: editable behavior, pricing configuration, motion, and vendored 3D libraries.
- `public/images/`: logos, screenshots, social image, and `robot-head.glb`.
- `public/fonts/`: all fonts referenced by the exported CSS.
- `public/legal/index.html` and `public/legal/*/index.html`: legal index and five policies.
- `server.mjs`: dependency-free local preview server.
- `export-manifest.json`: source URL, export timestamp, paths, sizes, SHA-256 checksums,
  external destinations, and download failures for the 99 downloaded files.

The directory mapping keeps `/legal`, `/legal/terms`, `/legal/privacy`,
`/legal/acceptable-use`, `/legal/refund`, and `/legal/cookies` working locally.
For deployment, use `public/` as the static document root and configure the
host to resolve directory index files. The preview server is for local use.

## Checklist for the next white-label customer

1. Replace BJCRUM names, headlines, offer copy, image alt text, accessible
   labels, footer contact details, and other branding throughout the HTML and JS.
2. Update `public/js/site-config.js`: brand name, site origin, app URL, docs
   URL, support email, plans, prices, credit allowances, and benefits. Some
   values also appear directly in `public/index.html`; update both. There is
   no recovered build generator that synchronizes them automatically.
3. Replace the favicon/logo, social preview image, customer screenshots, and
   showcase images. Image filenames are inherited from the deployed site.
4. Adjust colors and styles in the CSS as needed. This export includes compiled
   Tailwind CSS; no Tailwind source configuration or build pipeline is included.
5. Replace app, sign-in, documentation, template, and prompt-form destinations.
   Review every `bjcrum.com` occurrence, including absolute URLs in HTML,
   JavaScript configuration, metadata, canonical links, and legal copy.
6. Update titles, descriptions, Open Graph/Twitter metadata, contact email,
   and the `bjcrum-theme` browser-storage key in `theme.js` and `chrome.js`.
7. Adapt the legal pages and business-specific claims for the new customer.
8. Recheck desktop/mobile layouts, both themes, menu, pricing selectors, tour,
   image dialogs, FAQ, animations, and every destination after editing.

## Preserved behavior and boundaries

The copy deliberately retains BJCRUM's live branding and outgoing links.
Get started, sign-in, templates, docs, and prompt submissions still lead to
`app.bjcrum.com`; they must be changed for the next customer. The authenticated
app, backend, customer data, and payment functionality are not in this ZIP.
The Stripe privacy link in the legal copy also remains external.

All page-rendering assets are local. The 3D enhancement loads when its section
approaches the viewport and falls back to the existing illustration when
WebGL or motion is unavailable. Rendering does not require contacting an AI
provider. Existing third-party library/license comments are retained.
