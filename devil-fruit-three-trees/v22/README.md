# The Legendary Devil Fruit Trees — V22

A single-page, entirely self-contained WebGL Devil Fruit encyclopaedia containing the established **146-entry** curated collection: **44 Zoan, 12 Logia, 90 Paramecia**. All 19 families are represented as 3D hanging clusters on one of three legendary trees. Fruit-first navigation: type → family → fruit → powers, user, affiliation, story arcs, saga, awakening and origin. There are no search inputs, page reloads or text modals.

## Art direction and production checklist

Approved direction: **oversized macro-chibi, flat-shaded, faceted polygonal forms** in saturated adventure-game colours, with fantastical organic anatomy rather than ordinary trees decorated with props. Each sculpt is an original fan-inspired design, not an official One Piece model. The 2×3 concept sheet is in `a_vibrant_stylized_vector_flat_polygon_concept_sh.png` in the conversation; actual application models are documented with the included V22 browser screenshots.

1. [x] Audit V21 screenshots, identifying overlapping badges, similar crown primitives, plain fruit models, duplicated island silhouettes, and obscured details.
2. [x] Develop two substantially different silhouette concepts for each of Zoan, Logia and Paramecia.
3. [x] Preserve the 146-record catalogue and its 19 families, with all important fields intact.
4. [x] Remove old V20/V21 tree-generation code from the production toolkit.
5. [x] Rebuild six trees as original V22 WebGL meshes using giant branches, distinctive canopies and type-specific details.
6. [x] Zoan A1: world-beast with a carved feline face and huge antlers; Zoan A3: phoenix with giant feather wings.
7. [x] Logia B1: confluence of clouds, fire and flowing water; Logia B2: thunder cyclone and magma growth.
8. [x] Paramecia C2: intertwined twin trees and large dimensional portals; Paramecia C1: exaggerated flower canopy and elastic golden ribbons.
9. [x] Rebuild the generic floating island mesh with irregular stone strata, thick grass, vegetation and segmented waterfalls.
10. [x] Attach every family cluster to thick, branching arms; preserve one individually rendered fruit per entry.
11. [x] Sculpt source-marked illustrated fruits with differentiated shapes, protruding spiral inlays and stems, retaining chained black silhouettes for physical appearances marked unverified.
12. [x] Improve portrait camera and HUD placement; reduce visual overlap and make fruit inspection information readable.
13. [x] Render all six trees at 390×844 and 1440×900; run navigation and mesh validation.
14. [x] Package the reproducible source and standalone HTML.
15. [ ] Independently confirm the public raw.githack preview works on a real mobile device. GitHub publication will be validated independently through its contents API.

## Fidelity limits

The tree forms are original stylised interpretations and do **not** precisely reproduce the approved concept drawings. The curated 23 appearance-referenced fruits are differentiated models but do not yet all match every canonical physical detail. The unverified status concerns the *physical appearance in the supplied dataset*, not whether the fruit or user exists. V22 is a functioning application under the tested Chromium/SwiftShader WebGL environment, but physical-device FPS has not been benchmarked.

## Build

From this directory:

```bash
python build.py
```

This embeds `geometry.js`, `geometry22.js`, `app.js`, `style.css` and `data.json` into `index.html`, with no external runtime dependencies. The packaged HTML can be opened as a file or served through GitHub/RawGitHack.

## Navigation

Swipe left/right or use the arrow buttons to switch between types. Tap a tree to enter it; tap a hanging family, then a fruit; use Back to return. Use the design toggle to compare a type's two sculptures. Drag to orbit; pinch or mouse-wheel to zoom. Mobile and desktop on-screen controls were tested locally.