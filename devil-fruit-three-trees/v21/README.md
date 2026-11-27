# The Legendary Devil Fruit Trees — V21

## Approved visual direction

Single-page 3D Devil Fruit encyclopaedia rendered in a saturated, flat-faceted, oversized **macro-chibi adventure-game** style inspired by the spirit of *One Piece*. The tree sculptures are **original non-canon designs**, not reproductions of official assets.

The preferred design selection is **Zoan A1 Beast Grove** and **Zoan A3 Mythic Ascension** (two switchable variants), **Logia B1 Elemental Confluence** (default), and **Paramecia C2 Possibility Nexus** (default). Logia B2 and Paramecia C1 remain as alternative designs, providing two variants per type. Switching designs does not reset the catalogue or open a new page.

## Development plan and completion record

1. Preserve source catalogue and original single-page navigation: **done** (146 entries; 44 Zoan / 12 Logia / 90 Paramecia).
2. Lock six sculptural concepts, prioritising A1, A3, B1, C2: **done**.
3. Rebuild the three tree classes as distinct macro-faceted polygonal sculptures with two variants each: **done**.
4. Sculpt oversized trunks, horn/feather Zoan motifs, elemental Logia growth and impossible Paramecia forms: **done as stylised interpretation**.
5. Rebuild the generic floating islands with grass, stratified rock, waterfalls and vegetation: **done**.
6. Connect physical fruit-family clusters to the trees: **done** (19 groups and all 146 generic hanging fruits).
7. Model revealed fruits with visible front-facing spiral relief and preserve locked unrevealed silhouettes: **done as stylised models; canon-accurate physical reproduction remains incomplete**.
8. Recompose the family-inspection and individual-fruit views, avoiding oversized tree backdrops obscuring information: **done**.
9. Improve mobile typography, navigation spacing, camera positioning and selectability: **done**.
10. Retain names, powers, users, affiliations, arcs, saga, awakening and origin: **done**.
11. Render both variants of each tree on portrait mobile and desktop: **done** (QA screenshots in this package).
12. Inspect and adjust large forms and silhouette placement: **done as a first visual pass; exact concept-art fidelity is an open artistic task**.
13. Test touch/click navigation, 146 nonempty fruit meshes, 19 groups and UI paths: **passed locally** at 390×844 and 1440×900.
14. Publish the standalone app and editable source to GitHub: release step.
15. Verify published commit and public link: release step.

## Navigation

Choose one of three tree classes; tap its hanging family, then a fruit. Use Back and Previous/Next to navigate. Tap the `Design 1/2` switch to compare tree sculptures. Drag to orbit; pinch or scroll to zoom. No search, modal route or conventional card grid. All content lives in one continuous 3D world.

## Factual limitations

The appearance flag comes from the supplied curated source. It is **not** a complete independent verification of every manga appearance as of November 2026. The 23 appearance-referenced fruits are enhanced stylised representations, **not guaranteed one-to-one canon models**. The black chained silhouette means physical appearance was unverified in the source data, not that the fruit or character is inaccessible.

## Build and QA

Run `python build.py` in the source directory to embed `style.css`, `geometry.js`, `app.js`, `data.json` into a single standalone `index.html`, with no external dependencies. Run `xvfb-run -a python qa21_short.py` on systems with Chromium and Xvfb for local WebGL testing.

The QA guarantees successful local browser interaction under the tested software WebGL environment; it does not establish measured FPS on all physical devices. Future changes should rerun mobile and desktop renders and verify each view before publication.