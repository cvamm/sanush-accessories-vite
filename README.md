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

## Payments

Checkout runs on Razorpay Checkout (`src/lib/razorpay.ts`), opened client-side from the on-site bag. Set your key in `src/data/site.ts` → `RAZORPAY_KEY_ID`, or provide it at build time:

```bash
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx npm run build
```

Razorpay test mode uses a test key and the test cards listed in its dashboard; swap in the live key when the account is approved. Because this site is static GitHub Pages with no server, orders are not created or verified server-side: keep an eye on the Razorpay dashboard for payments and confirm dispatch from there. Adding a small order-creating endpoint later is what enables `order_id` + signature verification.
