# Legendary Devil Fruit Trees — V29 permanent design and QA game plan

## Scope and artistic intent
Continue exclusively from the tested V28 source, with **one new 3-D tree per class**, not six variants or a different project. Preserve 146 historical records (44 Zoan / 12 Logia / 90 Paramecia), 19 families, and the illustrated-versus-sealed convention (23 stylised illustrated, 123 unknown sealed). Retain one continuous touch-first WebGL universe. The interface must have almost no text except selected class/family/fruit names and the eight encyclopaedia fields; no marketing title, explanatory paragraphs, pop-up story cards or large rectangular navigation bars.

Preserve the user's approved macro-chibi, bright, flat-faceted adventure visual language: thick physically volumetric trunks, exaggerated organic growth, natural structural roots, hand-sculpted features and distinct floating island geology. **Zoan** should be an ancient guardian organism with integrated face, branching antlers and dense irregular jungle crown. **Logia** should embody connected weather, volcanic fire, ice, water and lightning instead of unrelated ornaments. **Paramecia** should braid impossible magenta trunks with multi-directional, curled, solid pink blossoms and intersecting gold/aqua portals.

## Ten-view diagnostic protocol
Each screenshot must expose a particular modelling weakness. Six class views: Zoan frontal silhouette and elevated rear branch support; Logia frontal fire-to-storm continuity and far-side cloud undersides; Paramecia frontal blossom separation and elevated side petal thickness. Four deliberately **different** inspection templates this version: the Inu Inu tree-family attachment viewed low and from the rear, Body Alteration three-fruit spacing from above/side, a revealed Mera Mera fruit viewed obliquely with metadata, and the sealed Okuchi no Makami viewed from the opposite oblique angle showing chain/lock and facts. Capture all ten at 390 × 844 after animation settles; separately render class fronts at 1440 × 900. Do not reuse the same pleasing angle when another angle would reveal a defect.

## Ordered execution checklist
1. [x] Reopen V28 source, README, QA, game plan and ten actual screenshots.
2. [x] Assess V28 against the user's intent: 79% vision / 88% project completion, subjective.
3. [x] Lock exactly three one-off designs, original data and data-only finger-first interface.
4. [x] Sculpt a Zoan guardian with nonuniform 3-D radial crown bodies, forward/rear branches, buttress roots, ivory antlers and living animal face.
5. [x] Sculpt a Logia volcanic trunk with closed multi-ring flame volumes, integrated weather mass, lightning, helical water and ice.
6. [x] Sculpt a Paramecia with thick swept petals, inner/outer flower whorls, rear/front blossoms, braided stems and intersecting spatial portals.
7. [x] Keep three materially distinct geological islands; add source pools and physical short spillways where waterfalls cross the rim.
8. [x] Retain all 146 fruit meshes, 19 families, 23 stylised illustrated entries, 123 sealed appearances and eight fields per record.
9. [x] Preserve tap to inspect, fast horizontal swipe, slow drag to orbit, pinch and wheel zoom, minimal icon navigation and single-page routing.
10. [x] Build one dependency-free HTML from editable modules; pass JavaScript syntax checks.
11. [x] Render initial front and opposite views; adjust Zoan/Paramecia forward-back crown/bloom positioning until depth/width is at least 0.85.
12. [x] Capture six actual tree renders and four varied exploration screenshots, checking face, boughs, clouds, petal thickness, fruit spacing, locks and metadata.
13. [x] Run Chromium software WebGL tests at 390 × 844 and 1440 × 900, exercising all 146 fruit detail screens and all 19 families.
14. [x] Verify tap/swipe/drag/wheel/pinch, zero uncaught JS errors, correct counts and no missing metadata.
15. [x] Measure object extents in all three dimensions; confirm non-flat sculptures: Zoan 58.72 × 77.81 × 55.00; Logia 47.19 × 73.39 × 42.65; Paramecia 58.06 × 84.66 × 54.95 (X × Y × Z, scene units).
16. [x] Produce contact sheet, QA JSON, reproducible standalone HTML, source ZIP and this persistent plan.
17. [x] Publish a new immutable GitHub V29 revision, verify that the published HTML equals the tested file (blob `5aafb81b315e6854e3e24f2a972ec13056c1dc93`) and verify modular source rebuild.
18. [x] Provide permanent preview URL, source fallback and QA links; explicitly report unverified third-party CDN and physical Android performance.

## V29 observed test evidence
Both 390 × 844 and 1440 × 900 Chromium/SwiftShader WebGL runs passed. Zoan mesh 9,456 triangles, Logia 12,151, Paramecia 51,706. Measured depth/width ratios are 0.94, 0.90 and 0.95. All 146 individual detail panels showed eight fields; all 19 groups existed; fast swipe, deliberate orbit, wheel zoom and two-pointer synthetic pinch passed; no uncaught JavaScript runtime errors occurred in the tested sessions. Editable source and tested standalone HTML rebuild identically.

## Known limitations and required future continuation
The trees remain stylised procedural meshes, not exact reproductions of finished hand-drawn concept art. Zoan foliage still shows regularity, Logia fire can look like separate tall plumes, and Paramecia flowers share a procedural construction. Waterfall sources intersect the rim but may still look disconnected from rear angles. The 23 inherited illustrated fruit models are *not* individually verified canon replicas, and the other 123 remain sealed. The fixed 146-entry catalogue is not an exhaustive current-canon claim. Physical Android frame rate/battery and external RawGitHack delivery have not been independently tested.

For V30+, continue **from V29**. Preserve the finger-first minimal-text contract, all historical data, one tree per class, and six purpose-picked camera angles plus four varied inspection templates. Before a new link, critique actual screenshots, fix the most visible problems, rerun code/gesture/content tests, record limitations and publish a different immutable commit. A geometry depth ratio alone does not prove visual quality.
