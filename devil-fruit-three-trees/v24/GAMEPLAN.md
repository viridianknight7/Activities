# Legendary Devil Fruit Trees — V24 game plan, provenance and handoff

## Non-negotiable provenance

**V24 is built exclusively from `devil_fruit_v23/index.html`, the user's V23 project and its previous ten screenshots.** No V25 or other newer variant is consulted or merged. `build_v24.py` reads this exact V23 local file, appends the V24 mesh builders and modifies only the existing navigation and camera. `rebuild.py` checks that the editable components reconstruct `index.html` byte-for-byte.

The catalogue is preserved verbatim: **146 records**, divided as **44 Zoan, 12 Logia, 90 Paramecia** and **19 family groupings**. These are the project's inherited counts, not a claim to be the exhaustive 2026 manga catalogue.

## Locked V24 brief

Exactly **one** monumental, unsquashed, fully volumetric tree per category, in the established chibi macro-polygonal adventure game style. No two-design switch, no search, modal or new page. The entire experience remains a freely orbitable single-page WebGL world with one generic floating geological island under each tree. The hanging family clusters remain integral to the tree, not a separate encyclopaedia grid. A known appearance may receive a stylised fruit; an unknown appearance stays chained and sealed. Never describe all stylised forms as canon-accurate.

1. **Zoan · Beast Grove:** Thick branching tree with eight large roots, natural animal guardian face, raised carved spirals, real three-dimensional antlers, several deep vegetation lobes, hanging families. Biological instinct and inherited will.
2. **Logia · Elemental Confluence:** Geological basalt-like trunk, lava/fire as thick extrusions, layered 3D thunderheads, luminous lightning, swirling water around the trunk, macro-faceted ice at the roots, hanging families. Nature is the substance of the tree.
3. **Paramecia · Possibility Nexus:** Three intertwined twisting trunk limbs, strong three-dimensional pink flowers with inlays, impossible upright tilted rings and a flowing golden spiral, colourful floating shapes, hanging families. Alteration and creativity rather than merely pink foliage.

## Ordered release plan with evidence

1. [x] Reinspect the ten V23 screenshots and score aesthetic alignment/completeness explicitly as estimates (**60% / 74%** prior starting assessment).
2. [x] Open and validate the exact V23 source, without using a newer project.
3. [x] Lock exactly three replacement model directions, one per type.
4. [x] Sculpt brand-new 3D macro-faceted Zoan wood, roots, antlers, anatomy and multi-depth foliage.
5. [x] Sculpt new 3D Logia magma, cloud, storm, lightning, ice, water and geological architecture.
6. [x] Sculpt new 3D Paramecia growth, blooming foliage, ring portals and floating sculptural details.
7. [x] Refactor the common floating island to support a deeper XYZ underside, multiple strata, surface vegetation and bending water falls.
8. [x] Rebuild 3D physical bough connections so every inherited group hangs from a tree; keep full catalogue count.
9. [x] Improve macro-styled hanging fruit generic shapes without altering unrevealed-fruit inspection logic.
10. [x] Remove two-design switching entirely. Retain overview → family → fruit selection → detail, one page and mouse/touch orbit.
11. [x] Reframe mobile and desktop cameras for new tree height and widen depth-sensitive viewing.
12. [x] Syntax-check every script with Node; check missing fields, catalogue and group counts.
13. [x] Headful Chromium WebGL test (SwiftShader under Xvfb) at **390×844** and **1440×900**, all 3 trees, group view and detail view; click tree, click group, click fruit, Previous/Next/Back.
14. [x] Quantify 3D mesh bounds in **all three axes**. **Zoan X/Y/Z: 42.6 / 63.2 / 40.1; Logia 38.7 / 60.9 / 40.1; Paramecia 37.5 / 62.1 / 38.1.** Every depth-to-width ratio is at least 0.94: these are not flat planes.
15. [x] Reconstruct the single HTML page byte-for-byte from editable components; package QA evidence and preview screenshots.
16. [x] Publish V24 HTML, editable sources, this plan and QA report into a **new V24 GitHub folder**. Verify commit and link before final response.

## Outstanding improvements, not misrepresented as completed

- A comprehensive physical-appearance audit against official manga/game references for *every* fruit remains to be done. Historical data currently mark only 23 fruits as illustrated. The other 123 retain sealed silhouettes.
- The sculptural models improve geometry and depth but are still procedural interpretations rather than exact hand-built replicas of earlier concept paintings.
- Real-device Android GPU performance, especially after extended exploration, and public CDN availability have not been independently benchmarked.
- This plan is saved in a versioned GitHub file so future sessions can resume it; it is **not** a claim that the assistant has permanently updated an account memory record.

## Acceptance rules for subsequent work

Keep the single-page interaction and 146 inherited records. Avoid flattening any tree into a 2D billboard, or crushing Y or Z to fit a portrait screenshot. Show concrete XYZ bounds and actual browser screenshots before calling a model complete. Publish a separate immutable commit for every release. No invented links or untested "100%" claims.