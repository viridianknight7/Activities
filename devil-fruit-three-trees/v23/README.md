# Legendary Devil Fruit Trees — V23

A standalone interactive 3D Devil Fruit encyclopaedia. Six independently constructed hero trees represent original, non-canonical metaphors for Zoan, Logia and Paramecia Devil Fruits. Fan project; not an official One Piece experience.

## Approved art direction

**Macro-chibi flat-polygon 3D** — enormous readable silhouettes, rounded-but-faceted massive forms, brightly coloured opaque polygon faces, no photographic texture, individually shaped trunks/branches, sculptural inlays and huge fantasy floating islands. The final visual benchmark is the user's latest portrait concept image. Avoid compressed, flat, smushed or generic crowns. User's referenced choice: Zoan as a living evolutionary structure without a detached beast head; Logia as a tree whose trunk and crown embody elemental phenomena; Paramecia as a physically impossible pink/gold tree.

## Two selectable, actually implemented 3D forms per class

- Zoan A: braided organic trunks, turquoise living scales, ivory tusks and feathers, articulated foliage and claw-like roots. Zoan B: tall primordial banyan, hanging roots and two serpentine growth systems. Expresses instinct, evolution and inherited will.
- Logia A: basalt organism of volcano, storms, magma, ice, clouds, flowing current, lightning and fire. Logia B: cyclone/tree hybrid with multi-level storm shelves and crystalline ice ribbons. Expresses embodiment of natural phenomena.
- Paramecia A: gigantic tiered magenta blossom, gold orbitals and alternate geometry. Paramecia B: broken reality tree with spatial loops, hovering masses and warped branches. Expresses free alteration and possibilities.

Version A/B changes real 3D mesh content; it is not a new skin or static illustration. The active camera, branches and selection position respond to the selected variant.

## Development and acceptance plan — executed

1. [x] Inspect user-uploaded screenshots of V22 and identify actual regressions.
2. [x] Estimate pre-rebuild vision match and project completeness.
3. [x] Generate two tall concepts for each Devil Fruit type, six total.
4. [x] Replace existing shared 3D tree architectures with six bespoke geometric meshes.
5. [x] Build full-volume polygonal canopies; keep readable silhouettes and replace flat canopy stacks.
6. [x] Rebuild the floating islands as tiered, tapered, irregular 3D rock with thick grassy caps, falls and greenery.
7. [x] Integrate horn, feather, scale, elemental flow, cloud, flame, ice and impossible spatial motifs into the physical tree anatomy.
8. [x] Rebuild fruit-bearing branches to follow each chosen form and preserve all fruit positions.
9. [x] Preserve known-versus-unrevealed appearance distinction (black locked silhouettes for unverified fruit forms). Do not fabricate specific canon fruit appearances.
10. [x] Retain all 146 catalogue records, 19 named families, all fields.
11. [x] Enable functional Form A/B controls at the overview and family levels.
12. [x] Remove duplicate preview bunches during group close-ups, while keeping the parent tree in scene.
13. [x] Reframe single-fruit inspection to show a large model above, with a separate scrollable lore panel below.
14. [x] Adjust camera distances for portrait mobile, desktop and mobile landscape.
15. [x] Capture and inspect real browser screenshots of each of the six tree forms, family, group and fruit pages.
16. [x] Correct the first-run JavaScript initialisation error caused by a missing legacy branch alias.
17. [x] Re-run browser rendering without JS errors and check actual navigation flows.
18. [x] Exhaustively select all 146 records, verify their metadata is visible, confirm each unique ID and the 44 / 12 / 90 type breakdown.
19. [x] Test the real Form A/B button, previous/next page, Explore, Back, and hidden-state behaviour.
20. [x] Test a landscape viewport and its final detail panel.
21. [x] Publish the exact tested single-file HTML to GitHub and record the commit.

## Tested facts

- Record IDs: 146 unique / 146 existing; Zoan 44, Logia 12, Paramecia 90.
- Family group counts: Zoan 12, Logia 3, Paramecia 4.
- Full direct selection: 146/146 successful.
- Two distinct 3D mesh variants per type (different vertex/face geometry).
- Successful real-button navigation, correct visible detail metadata, all UI stages.
- Browser views: portrait 390 × 844, desktop 1366 × 768, landscape 844 × 390.
- Local JavaScript error count: 0 after corrections.

## Limitations and uncompleted targets

- The real-time models are materially simpler than the six concept-art illustrations. Passing functional QA does **not** mean 90% visual concept-art fidelity or artistic completion. More bespoke texturing and canon fruit model auditing remain future refinements.
- The QA Chrome instance used software-based 3D rendering. Rendering on the user's particular Android device, high-performance WebGL compatibility and live external-link caching were not independently tested.
- 38 fruit appearances are conservatively marked represented by sourced appearance design knowledge; the rest use chained, sealed symbolic models. Canonical lore accuracy of every record was not independently re-audited in V23.
- Some fruit families need paginated close-up selection to prevent text and fruit overlap on mobile. All families remain fully accessible.

## Instructions

Open `index.html` in a modern browser. Tap a tree, explore a family, select a hanging fruit and read its description. Use **Switch Form A / B** to compare two real 3D builds per type. Drag to orbit, swipe between classes, pinch/scroll to zoom, and use Back for previous stages.

## Reproduction

`index.html` embeds all source data, shaders, geometry, styles and JS. No CDN required. `source/v23_geometry.js` and `source/build_v23.py` record the construction changes, and `qa/qa_v23.py`, `qa/qa_v23_exhaustive.py` provide reproducible tests.