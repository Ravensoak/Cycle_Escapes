## Quick orientation — what this project is

Cycle*Escapes is a small static PWA-style website: primarily plain HTML, CSS and vanilla JavaScript. Pages live at the repo root (e.g. `index.html`, `TourList.html`, `about_us.html`, `2027*\*`pages). Assets are under`js/`, `css/`, `data/`, `graphics/`, and `pictures/`.

Key runtime behaviors to know:

- The site is served as static files; there is no build step or bundler. Developers should preview via a local HTTP server (see "Dev server" below).
- `js/site.js` contains the central UI helpers: dynamic component loader (`loadComponent`), lightbox functions, mobile menu init and the floating refresh button used when running as a PWA.
- HTML fragments are loaded at runtime into placeholders (e.g. `#footer-placeholder`, `#navindex-placeholder`) using `loadComponent('selector', 'file.html', fallback, callback)` — editing these fragments updates every page that loads them.
- The repo includes a simple service worker at `js/service-worker.js`. Currently it sets `CACHE_VERSION` and has install/activate handlers, but no caching logic in `fetch` (pass-through). Bump `CACHE_VERSION` to force clients to update.
- Data is loaded via simple fetch calls from `data/` (e.g. `data/hotels.json`) — follow the pattern in `js/tourlist.js` when adding JSON-driven pages.

Files you should inspect first

- `index.html` — main entry; registers `js/service-worker.js` and loads `js/site.js`.
- `js/site.js` — dynamic component loading, lightbox, mobile nav behavior and PWA refresh button.
- `js/service-worker.js` — service worker lifecycle; update `CACHE_VERSION` to push changes.
- `data/manifest.json` — PWA manifest and icons.
- `css/common.css` and `css/index.css` — global styling and page-specific rules.

Project-specific conventions and patterns

- Static fragment loading: use `footer.html`, `nav.html` or `navindex.html` and let `site.js` inject them. If you add a fragment, add a callback initializer if it needs JS hookup (see `initNavigationMenu`).
- Page files are top-level HTML files and often prefixed with a year (e.g. `2027_Scottish_Lowlands.html`). Keep paths relative when linking resources so `loadComponent` and service worker locate them correctly.
- Images live in `graphics/` and `pictures/` with subfolders for tours (`Wales-South_to_North`, `Scottish_Lowlands`, etc.). Use the existing naming and folder structure.
- Fetch patterns: Prefer graceful degradation — check `response.ok` and show fallback UI (see `js/tourlist.js` pattern).

Dev server & debug notes

- Because of the service worker and fetch usage, open files directly with `file://` will not behave correctly. Run a local HTTP server from the project root.
  - Python 3: `python -m http.server 8000` (PowerShell) and open `http://localhost:8000`.
  - VS Code: use the Live Server extension to host the project root.
  - Node (if available): `npx http-server -c-1 .` to disable caching.
- Service worker tips: when developing, unregister the SW via DevTools (Application → Service Workers) or bump `CACHE_VERSION` in `js/service-worker.js`. Use the Console + Application tabs to inspect registration and cached resources.

Editing guidelines for safe changes

- When changing shared fragments (nav/footer), search for `loadComponent` and `#footer-placeholder` to find all injection points before editing markup.
- If you add functionality that requires initialization after a fragment loads, pass a callback to `loadComponent(url, callback)` or call the same initializer used elsewhere (e.g. `initNavigationMenu`).
- Keep JS small and dependency-free. There are no package manifests; adding node tooling is allowed but document it in the README.

Common troubleshooting

- Problem: changes not showing in browser — likely service worker cache. Bump `CACHE_VERSION` or unregister the worker in DevTools.
- Problem: dynamic HTML fragment fails to load — check network tab for 404s and ensure correct relative path (fragments are fetched from the page origin).

If you're unsure

- Read `index.html` and `js/site.js` first — they explain the dynamic-loading and PWA scaffolding.
- Ask for guidance and indicate which page/fragment you plan to change; include file paths and a short summary of intended DOM/JS changes.

---

If you'd like, I can also:

- add small example tests (simple fetch smoke tests) or a tiny dev script (package.json) to standardize the local server command, or
- add a short CONTRIBUTING.md with how to preview pages and bump the service worker.
