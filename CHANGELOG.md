# Changelog

All notable changes to ServiceLens are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-05-13

### Added
- Initial release of ServiceLens Chrome DevTools extension
- Auto-classification of network requests by microservice using subdomain heuristics, path heuristics, and SAP/reverse-DNS package prefix extraction
- User-defined service rules (path and subdomain pattern matching) via Config panel
- Grouped request view with per-service aggregate stats (request count, average time, error count)
- Filtering by service, HTTP status class (2xx / 3xx / 4xx / 5xx), URL text search, and failed-only toggle
- Slow request highlighting with configurable threshold (amber at 1×, red at 3×)
- JSON export of all captured requests
- Persistent config via `chrome.storage.local`
- Dark Tokyonight-inspired UI
- Manifest V3 service worker with request buffering (up to 500 requests) and reconnect logic
- Automatic filtering of Vite dev server, Next.js static, and CDN/font noise requests

### Security
- No host permissions — extension only reads `chrome.devtools.network` events
- All request data processed locally, never sent to external servers
- Dependency audit via `npm audit` on every CI run

[1.0.0]: https://github.com/RishavRajSingh44/ServiceLens/releases/tag/v1.0.0
