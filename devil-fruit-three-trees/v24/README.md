# Legendary Devil Fruit Trees — V24

A single-page interactive WebGL Devil Fruit encyclopaedia, built exclusively from V23.

Three new independent monumental macro-chibi, flat-faceted 3D sculptures: Zoan / Beast Grove, Logia / Elemental Confluence, Paramecia / Possibility Nexus. Exactly one per category. Orbits and zooms with mouse or touch; tap a tree, select a hanging family, choose a fruit, inspect details. Arrow buttons and Back work on mobile. The original 146 records in 19 inherited family groups are retained.

## Editable code

- `index.html`: dependency-free published standalone app
- `data.json`: preserved source catalogue
- `geometry_engine_from_v23.js`: unchanged geometry code from the V23 HTML (includes historic V22/V23 helpers)
- `geometry24.js`: newly sculpted V24 trees, islands, branch connectors and generic fruit models
- `app.js`: existing application/navigation with 3-D model dispatch and camera updated
- `styles.css`: original V23 styles plus a small V24 style override
- `template.html`, `rebuild.py`: exact standalone rebuild (run `python rebuild.py`)
- `build_v24.py`: transparent V23-only construction recipe
- `qa_v24.py`, `QA_V24.json`: browser test harness and machine-readable results
- `GAMEPLAN.md`: detailed implementation/validation requirements and follow-on work

## Important limitations

The 146-entry catalogue is preserved as supplied and is not a freshly audited complete manga census. A stylised revealed fruit is not necessarily identical to its canon art. The unverified fruits are deliberately black chained silhouettes. Actual Android performance and external CDN hosting remain to be checked independently. See `GAMEPLAN.md`.