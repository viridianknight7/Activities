# Devil Fruit World V31 — reference-led production and quality plan

## Baseline and source

**Only build on the verified V30 folder** (`devil-fruit-three-trees/v30`, published HTML Git blob `b2c348f9edf99db4aa1819e1a56cd27b4f6c3736`). Recovered the exact V30 modular source and 14-shot test suite. No newer branch code or unrelated designs. User's three portrait painted 3D-concept references are the target, but they do not provide usable 3D meshes. **V30 subjective baseline against them: 52% artistic match, 90% functional/project completeness**. It works as an encyclopaedia but is visually far short of studio art. Do not claim to create an exact reference-derived 3D asset solely from paintings.

## Art rules that carry forward

Three, and exactly three, different meshes: one Zoan, one Logia, one Paramecia. No tree-variant selector. True 3D triangulated X/Y/Z structures, no billboard copies, no squashing to fit portrait. Larger, integrated fruit silhouettes; strong macro-chibi faceted adventure look; saturated sky; organic wood; connected floating island and falling water. **Absolutely no Zoan faces, eyes, muzzles, nose or masks.** Instead mature oak growth, visible muscular buttresses and one or two asymmetrically embedded golden ancient lunar/cambium accents. Logia must look like one tree made from physical fire, storm and glacier with rich front/rear distribution. Paramecia must have a truly ivory-blush intertwined silhouette, several differently angled thick sakura/lotus crowns and a restrained pair of gold cosmic arcs with a portal grown out of wood. Do not resurrect repeated giant pancake foliage, excessive pink spikes, fake flame rings, cloned cloud balls, ladder-like waterfalls, repetitive particles or decorative text.

**User interaction:** one full 3D world; tap tree, physically hanging family and individual fruit; swipe between items; slow drag to orbit; pinch zoom; small icon controls; only selected class/family/fruit names and the eight real factual fields on the screen. Retain exact original 146 historic fruit records in 19 groups, 23 historically illustrated style flags and 123 appearance-unverified sealed silhouettes. Do not claim completeness of the latest One Piece canon or exact fruit replica status.

## Pre-implementation visual inspection

Reopened the three original concept images and V30's front, high/rear and opposing screenshots. Faults: V30 Zoan canopy forms a narrow tiered cluster with disproportionately thin main boughs, its large fruits remain scattered around rather than integrated into a broad tree; Logia is a trident of separate orange, purple and cyan procedural objects rather than one branching elemental organism; Paramecia crowns look like floating pink layered burgers with too little cream wood visible; all islands are conical with streams that become linear blue pipes; the fact sheet and family markers remain easy to lose at portrait mobile size. Aesthetic target requires much more custom surface shaping than V30's generated tubes and ovals.

## Ordered gates — mark complete only after the actual evidence

1. [x] Recover V30 exact editable application/QA, study the reference art and actual old screenshots; state baseline honestly.
2. [x] Save this 20-point V31 production and continuation plan before changing code.
3. [x] Build an anatomically broad, asymmetric Zoan with overlapping 3D canopy masses, large coherent roots, articulated side boughs and NO face at all; retain only 1–2 integrated ancient golden crescents.
4. [x] Build connected Logia with winding charcoal structure, substantial glowing fire on the left, a single deep dark-violet storm overhead, ice/wind on the right and dimensional energy in the central trunk.
5. [x] Build intertwined ivory, cream and blossom-pink Paramecia with sculpted broad petal groups, spatial openings, portal, two sparse gold loops and asymmetric branch supports.
6. [x] Replace conical islands with class-specific wide multi-shelf facets, smaller connected waterfalls and real underside volume; avoid blue pipes.
7. [x] Upgrade lighting/material response and tasteful spatial atmosphere without external runtimes or painting over the actual 3D geometry.
8. [x] Give the finger-first world refined state transitions, accessible tap targets and polished detail information; absolutely no extra tutorial copy, cards or clutter.
9. [x] Keep all 146 entries, 19 groups, family anchors, fruit selection, illustrated versus sealed models, and 8 metadata fields.
10. [x] JavaScript syntax and standalone rebuild check; verify no missing mesh functions or dependencies.
11. [x] Capture 3 frontal overview screenshots assessing silhouette, mass, fruit visibility, island joining.
12. [x] Capture 3 *different* rear/side/high overview screenshots checking bough depth, material continuity, hidden clipping and waterfall attachment.
13. [x] Capture 8 varied UI states: two separate Zoan families, Logia and Paramecia family states, two hanging-fruit groups, one illustrated fruit and one sealed fruit, from angles that reveal controls, occlusion and text readability.
14. [x] Inspect actual 14-shot contact sheet; record defects and visibly repair them in the model/code, then reshoot the affected angles.
15. [x] Verify all 3 X/Y/Z mesh bounds and true depth/width >= 0.85, not visually squashed; avoid unbounded camera clipping.
16. [x] Browser QA on 390×844 phone portrait and 1440×900 desktop, actual WebGL screenshots, zero page errors, layout not overflowing horizontally.
17. [x] Tap, swipe, slow orbit, pinch, wheel, Back, Next, Previous and keyboard navigation checks; inspect all 146 fruit records and 8 fields.
18. [x] Make self-contained offline HTML, editable geometry/app/styles/data, QA script/report, a 14-shot contact sheet, before/after comparison, README, source ZIP and deterministically reproducible build script.
19. [x] Publish one new versioned immutable GitHub revision, verify source Git blob hash and reconstruct published HTML exactly from editable files; do not overwrite V30.
20. [x] Give the link, screenshots, honest new score, persistent plan, download fallback and unresolved art/canon/real-phone limitations.

## Future continuation constraints

For V32 and beyond, retain all V30/V31 art decisions and do NOT restore a Zoan face. Always use a new branch/version and re-evaluate all 14 purpose-chosen views (not just six prettiest fronts). Prioritise substantially greater reference-led authorship, actual low-poly tree morphology, meaningful colour/material facets, readable phone interactions, and diverse observable rear surfaces. Award-winning studio quality and exactness cannot be certified from a software-rendered procedural mesh. Do not claim 100% or physical Android FPS without independent validation.

## V31 completed browser QA and visual defect log

Both independent browser passes passed: **390×844 mobile** and **1440×900 desktop** under Chromium software SwiftShader WebGL. All three trees and all three islands constructed; the six front/rear/side views plus eight distinct family/fruit UI states captured; all 146 unique fruit detail records visited and every eight-field panel checked. The suite exercised canvas tree selection, focused family tap, fruit selection, quick swipe, slower orbit drag, wheel zoom, simulated two-pointer pinch, Back/Next/Previous and keyboard arrows, without uncaught JavaScript errors or horizontal page overflow. It is browser simulation, not a real Android GPU benchmark.

**Actual geometry extents in scene units (width, height, depth):** Zoan 119.99 × 108.30 × 105.36 (depth/width 0.878); Logia 105.42 × 103.37 × 93.25 (0.885); Paramecia 122.78 × 123.29 × 112.39 (0.915). Each class has exactly one independent main tree mesh and no intentional flattening or face.

**Defect-driven changes:** First pass revealed an undefined pale-wood colour in Paramecia, fixed before WebGL screenshots. Initial V31 trees were cropped at the mobile viewport edges; camera was pulled back and the 3D sky enriched with sparse faceted clouds. Broad Zoan crowns were too horizontally banded; reauthored individual polygon colour facets and enlarged structural boughs. Gold moon/cambium details were hidden by leaves; moved them to real wood-supported outer side joints. Logia flame fans still looked too flag-like, so softened taper, removed excess overlapping lobes, adjusted curvature and expanded the real rear storm depth. Pink Paramecia crowns looked like layered disks; added irregular daughter sakura lobes and reduced uniform thin petals. Waterfall channels looked like identical long pipes; reduced count/length, varied widths and joined them to island shelf/rim. The eight UI screens revealed family scenes zoomed far too close into bark; adjusted family camera pivot and distance and reshot.

**Honest updated estimate:** V30 **52% visual reference match / 90% functional completeness** using a stricter comparison to the three concept images; V31 **60% visual match / 92% project completeness** after repairs. These are subjective, not an artistic measurement. Studio parity still requires hand-authored geometry sculpting, precise surface art, bespoke materials/lighting and professional motion design. It is not fair to call this exact to the reference or a guaranteed design-award winner.

The exact fourteen UI/image tests are in `QA_V31.json` and `V31_fourteen_diagnostic_views.png`. The before/after evidence is `V31_reference_V30_V31_comparison.png`. Continue future iterations *only from this immutable V31 source*, with this plan and the same purpose-chosen view matrix, without a Zoan face.

## V31 immutable release validation

The V31 standalone HTML was checked against GitHub's blob hash 65b606ec8dd82d296836d70416a6dab24b0a5625. Published editable modules must reconstruct that exact HTML. The 14 screenshot checklist is in QA_V31.json; independent 390x844 and 1440x900 browsers each traversed all 146 records with eight fields. No physical Android or CDN performance verification has been claimed.
