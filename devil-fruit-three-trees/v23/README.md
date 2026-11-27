# Legendary Devil Fruit Trees — V23 development handoff
## Locked artistic direction
A fully interactive **single-page WebGL world** built around the Devil Fruits themselves, not their users. Deliberately oversized **macro-chibi, flat-shaded polygonal** artwork with hand-built facet geometry, bright One Piece-inspired colour, and atmospheric chibi island landscapes. No search box, scroll-card grids, page changes or popup story screens. Touch, drag, swipe, pinch and simple Previous / Next / Back navigation.

Tree identification: **Zoan A1 Beast Grove** (animal instinct, muscular roots, giant antlers, living guardian mask) and **Zoan A3 Mythic Sanctuary** (living wings, mystical growth and phoenix-like crown); **Logia B1 Elemental Confluence** (lava, ice, light, smoke/cloud, lightning and water all contributing to the tree’s anatomy) and **Logia B2 Primordial Tempest** (storm cyclone and engulfing natural forces); **Paramecia C2 Possibility Nexus** (impossible topology, portals, exaggerated spirals) and **Paramecia C1 Reality Bloom** (elastic growth and enormous blooms). Floating islands share the same geological logic, with irregular terrain and cascading, bending waterfalls.

## Execution and verification
1. Preserve all existing catalogue data and the four-level navigation. **Completed.**
2. Validate counts and family grouping against stored project data: 44 Zoan + 12 Logia + 90 Paramecia = **146**; 12 + 3 + 4 = **19 family groups**. **Completed.** These are project counts, not a claim about the exhaustive current canon.
3. Develop distinct sculptural forms instead of repainted copies. **Completed in geometry23.js** with six tree builders.
4. Implement macro-faceted crowns, roots, branches, organic animal features and mythical winged anatomy. **Completed.**
5. Integrate elemental currents, magma fire, ice shards, thunderclouds and lightning into Logia anatomy. **Completed.**
6. Build impossible blooming/portal silhouettes for Paramecia. **Completed.**
7. Rebuild floating islands with wider geological slabs, uneven grass, tapered undersides and stepped water ribbons. **Completed.**
8. Keep one physical fruit per catalogue entry in hanging family bunches, with branch supports. **Completed.**
9. Make family inspection visibly hang fruits *below*, not above, the bough. **Completed.**
10. Preserve dark chained/locked unrevealed appearances, distinct stylised models only for entries marked illustrated in historical data. **Completed in the data model; independent canon audit not completed.**
11. Improve portrait camera framing, variant-control placement and separate inspection plaque. **Completed and visually reviewed; further layout polish desirable.**
12. Validate WebGL on portrait mobile (390×844) and desktop (1440×900), both variants per tree, family and inspection screens. **Passed in Chromium with software WebGL via virtual X11.**
13. Check actual UI controls with pointer clicks, Back, page arrows, design toggle, tree/family/fruit selection. **Passed.**
14. Traverse 146 records and construct 146 models with required data fields. **Passed.**
15. Build one dependency-free HTML, editable sources, screenshot comparison and a ZIP, publish GitHub and verify commit SHA. **Completed for V23.**

## Non-completed acceptance gates
- The historical project marked only **23** fruits illustrated; this is *not* a full canonical appearance audit of the 146 named entries. Do not describe every 'revealed' mesh as exact manga artwork or the catalogue as the complete current canon.
- The six low-poly trees are interactive conceptual models; they do not yet reproduce the approved painterly 2D sketches with perfect asset-by-asset fidelity.
- No live physical Android frame-rate benchmark or external RawGitHack CDN page-load test.
- Many illustrated-fruit sculptures still share procedural design primitives and need individual reference-backed geometry.
- Visual improvements in foliage silhouette, typography, distinct islands and less repetitive decoration remain possible.

## Next release acceptance
Audit the physical appearance of each fruit against chapter- or official-game-verified visual sources. For an unknown appearance use the same sealed black silhouette. Create one distinct verified modelling specification per known fruit. Render before/after comparisons on actual mobile dimensions. Reject releases with clipped branches, buttons obscuring art, or fruit bunches mistaken for grapes. Retain the tested navigation and all project data. Publish a separate versioned GitHub commit and visual/functional QA log.

## Files
`index.html` standalone site; `geometry23.js` all V23 sculptures; `geometry.js` and `geometry22.js` backwards-compatible 3D primitives; `data.json` historical 146-fruit catalogue; `app.js`, `style.css`, `template.html`, `build.py`. Regenerate with `python build.py`.
