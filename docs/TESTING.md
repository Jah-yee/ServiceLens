# Testing Guide

## Automated Tests

ServiceLens uses [Vitest](https://vitest.dev/) for unit testing the classification logic.

```bash
npm test          # run once
npm run test:watch  # watch mode during development
```

Tests live in `tests/` and cover `src/lib/classifier.js` — the core service classification engine.

### Test policy

Every new classification rule or heuristic change **must** include a corresponding test in `tests/classifier.test.js`. PRs that change `classifier.js` without adding or updating tests will not be merged. This is documented in [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Manual Testing Checklist

Run this before every PR. Load the built `dist/` as an unpacked extension in Chrome first (`npm run build` → `chrome://extensions` → Load unpacked).

### Core functionality

- [ ] Open Chrome DevTools on any page — **Network Inspector** tab appears
- [ ] Requests are captured and grouped by service as you browse
- [ ] Expanding a service group shows individual request rows (method, URL, status, time)
- [ ] Slow requests (> threshold) are highlighted in amber; 3× threshold turns red

### Filtering

- [ ] Service dropdown filters to a single service
- [ ] Status tabs (2xx / 3xx / 4xx / 5xx) filter correctly
- [ ] Search box filters by URL substring
- [ ] "Failed only" toggle shows only non-2xx requests
- [ ] **Clear** button empties all captured requests

### Noise filtering

- [ ] Vite dev server traffic (`@vite`, `@react-refresh`, `node_modules`) does **not** appear
- [ ] Next.js static chunks (`_next/static/`) do **not** appear
- [ ] Google Fonts requests do **not** appear
- [ ] `favicon.ico` does **not** appear

### Config panel

- [ ] **Config** button opens the settings panel
- [ ] Adding a path rule correctly overrides auto-detection for matching URLs
- [ ] Adding a subdomain rule correctly overrides auto-detection
- [ ] Config persists after closing and reopening DevTools

### Export

- [ ] **Export JSON** downloads a valid JSON file containing all captured requests

### Build

```bash
npm run lint   # must pass with zero errors
npm run build  # must complete successfully
npm test       # all tests must pass
```
