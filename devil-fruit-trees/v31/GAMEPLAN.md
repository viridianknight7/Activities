# Legendary Devil Fruit Trees V31 — Ancient Titans

**Release:** 27 November 2026. **Status:** tested interactive 3D prototype; visual acceptance not yet granted.
**Website:** [V31 HTML](index.html). **Technical checks:** [QA report](QA_REPORT.json).

## Design contract to preserve

Exactly **THREE** independently authored and genuinely volumetric 3D macro-chibi low-poly trees: **Zoan, Logia and Paramecia**. One per class, no A/B toggles and no six alternate trees. A legendary tree should read as an ancient giant from any camera angle, with massive flared roots, a trunk that can carry its canopy, physically joined supporting boughs, a deep, dense crown and a substantial floating island. The user called V30 a **Sudowoodo/twig** and rated it approximately **1% vision match**; technical correctness never overrides that feedback.

**Keep** saturated cartoony faceted polygons, oversized silhouettes, big readable fruit, sky and floating island. Zoan retains mythical life, huge green crown, integrated teal dragon, wings/crest; Logia retains grown-in fire, lightning, storm, ice, wind and cloud; Paramecia retains an ivory/pink twisting body, sculpted large blossoms, portal and ONE tilted gold orbit. Ornament must enhance the tree, not stand in for its anatomy.

**Remove/never reintroduce** thin pole trunks, isolated sticks, a circle of disconnected plant balls, flat mushroom/parasols, detached rings, overlaid stickers, unrelated glitter, crowded buttons, text-heavy headers, gigantic family lists, instruction banners and default A/B forms.

**At rest, show no text at all**, only minimal transparent touch icons and three dots. Swipe horizontally on the home tree to change classes; tap to explore; drag to orbit; pinch or wheel to zoom; tap actual hanging fruits to see their records. Keep a temporary narrow family picker (max 56px tall), a compact exploration dock and on-demand catalogue. Show three hanging fruits per family page.

## Required repeatable screenshot matrix

At **390×731**, always capture actual interactive browser renders, NEVER still concept-art substitutes:

- Each tree from **front, three-quarter/oblique, full side, elevated and rear**, fifteen diagnostic views total. A front view alone hides the exact flattening and unsupported-bough problems that repeatedly failed.
- Four user reference templates at *useful distinct angles*: **Paramecia Body Alteration page 1/11** at oblique; **Logia Energy & Weather page 1/2** near true side; **Zoan Ryu Ryu no Mi page 3/3** elevated; and the **Horo Horo no Mi** information sheet with Paramecia at an oblique backdrop.
- One family menu regression capture to prove it remains a **56px** horizontal temporary bar, not a tree-obscuring panel.

20 final screenshots; inspect top/crown clip, branch-root join, trunk weight, object hierarchy, all-angle depth, hanging fruit visibility, text overflow and background UI state.

## Ordered V31 work and release checklist

1. Read the V30 actual screenshots and working source, rather than judging static aspirations.
2. Audit functional/data coverage separately from aesthetics: inherited 146 records, 19 families, 44 Zoan / 12 Logia / 90 Paramecia.
3. Preserve the proven fruit catalogue, exact record IDs, three-per-page grouping, touch navigation and default text-free screen.
4. Work only in a new V31 directory. Never modify other branches, user files or earlier versions.
5. Create a new main trunk, with a **wide real 3D taper** instead of the rejected straight pole.
6. Sculpt nine large anchored root buttresses and seven very thick boughs spreading into three-dimensional crown space.
7. Build a **connected smooth-union volumetric crown field**, converted to finite low-poly 3D triangles, so the crowns have actual mass rather than thin caps or separate blobs.
8. Assemble Zoan's massive living crown, turquoise dragon coil with face, restrained attached ivory feathers and crown.
9. Assemble Logia's single united elemental canopy with **smooth colour transitions** across fire, cloud, lightning, ice and wind areas; add rooted elemental bark seams and several large physically placed details.
10. Assemble Paramecia's pink/ivory wood, dense crown, three chunky lotus-like blossom sculptures, bark helix, portal and one perspective-correct orbit.
11. Enlarge the floating grass/rock islands to actually carry the enormous roots and add two modest waterfall ribbons.
12. Render V31 at 390×731 with no instructions, category labels or massive panel at rest.
13. Reject any render in which the crown fails to appear. Correct 3D implicit-field operator precedence and surface winding first.
14. Reject the first overly segmented Logia colour patchwork. Use blended elemental weight fields.
15. Move mythic/flower/elemental details to the *actual visible outer surface* so canopy occlusion cannot bury them.
16. Rotate every tree to an exact side profile and inspect front-to-back flattening.
17. Increase **true Z mesh depth** and retest until **Z / X extent is above 0.75** for all three. Reposition the visible landmarks after that change.
18. Keep crown-to-island camera framing intact and fruits clickable in world space.
19. Validate JavaScript parsing; ensure three separate geometries with >20,000 actual 3D triangles and finite 3D mesh XYZ extents.
20. Open **all 146 details**, check names, powers and all seven additional metadata values. Confirm 19 groups and the 44/12/90 class counts.
21. Test home horizontal swipe, direct 3D canvas fruit tap, orbit drag, wheel zoom, catalogue search, group/page navigation and details previous/next.
22. Test 390×731, 360×800, 430×932, 844×390 and 1366×768. Require zero horizontal document overflow and zero browser page errors.
23. Capture 15 diagnostic tree views, four user reference states and one opened compact family menu *from the final source*. Inspect, improve and reshoot if any geometry changes.
24. Clearly distinguish software-rendered screenshot QA from native Android WebGL hardware testing.
25. Package the complete offline self-contained HTML, authored V31 sculpting source, inherited JSON data, 20 images, QA_REPORT.json and full continuation plan.
26. Publish only v31/index.html, GAMEPLAN.md, README.md and QA_REPORT.json to the user's existing GitHub **main** branch.
27. Read the GitHub files back and verify actual source content, counts and title, not just a successful commit response.
28. Give the website preview, GitHub source and downloadable standalone/source ZIP links. **Do not call the artwork finished unless the user accepts actual interactive renders**.

## Verified V31 evidence

- Three independently authored meshes, with true XYZ extents:
  - **Zoan:** 28,590 triangles; **15.005 × 20.890 × 11.304**, depth/width **0.753**.
  - **Logia:** 28,050 triangles; **14.932 × 20.921 × 11.334**, depth/width **0.759**.
  - **Paramecia:** 32,238 triangles; **15.001 × 21.363 × 11.849**, depth/width **0.790**.
- Browser sweep opened **146/146** records with correct title, power and seven other recorded fields. 19 groups, 44/12/90 class distribution. Source is based on the inherited catalogue, **not independent canon verification**.
- **20/20 diagnostic screenshots** captured and inspected, including all three trees at five angles and the four reference fruit template states.
- Tested home swipe, 3D fruit selection, orbit drag, zoom, catalogue search, family selector/page navigation and detail next/previous. Five tested viewport sizes with **no horizontal overflow**, **zero JS page errors**. Temporary family picker height was **56px**.
- The headless browser had no WebGL; captures are from the *same 3D meshes projected through the Canvas2D software fallback*. Physical Android GPU/WebGL and sustainable frame rate remain unverified.

## Honest artistic assessment and next release

The user's V30 rating was **1% visual match**. V31 fixes the fatal twig silhouette and significant side-view flattening: there is now a broad 3D mass and thick trunk. However, the solid crowns still read as stylised rounded clouds in some views. This is **not yet a finished legendary visual design**; no user approval has been claimed. Implementation completeness can be roughly estimated above 85%, but that measures function, not artistic merit.

The next phase must **change the art method**, not just add procedural polygons: produce an approved individually sculpted Zoan hero model with meaningful leaf silhouettes, integrated dragon anatomy and bespoke branch joins; carry that quality to a unified elemental Logia and surreal floral Paramecia. A polished manual 3D asset pipeline (e.g. editable Blender → optimised GLB) may be needed. Add individually accurate Devil Fruit models and independently canon-audit the 146 records, then test actual Android touch/WebGL performance. Re-run all 20 screenshots, 146 records, five screen sizes and interaction regressions before any future link.

**Persistence:** This versioned GitHub file is the durable project continuation plan. It does not guarantee automatic ChatGPT long-term memory storage. Future sessions should read it before making changes.