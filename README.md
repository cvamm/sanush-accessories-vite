# Sanush Accessories — storefront

Single-page storefront for an anti-tarnish 18k gold plated jewelry brand. Built with React 19, Vite and Tailwind CSS 4; the production build inlines JS and CSS into one `index.html`.

## Develop

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build   # emits dist/
npm run preview
```

## Deploy

`.github/workflows/pages.yml` builds `dist/` and publishes it to GitHub Pages at `/sanush-accessories-vite/`. Image sources go through `src/utils/asset.ts`, which prefixes Vite's `BASE_URL` so the relative build paths resolve under that subpath.
