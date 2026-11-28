# Legendary Devil Fruit Trees V39 — Reforged Origins

28 November 2026. Permanent design, development and QA continuation plan. Versioned source: devil-fruit-trees/v39/index.html.

## User's binding vision

Exactly THREE separately authored 3D trees: Zoan, Logia and Paramecia. No A/B variants, no copied underlying tree mesh, no flat illustration masquerading as a rotatable sculpture. Source references are the three individually generated portrait images: orange-dragon green Zoan, purple storm-fire-ice Logia, and ivory/pink giant lotus-orbit-portal Paramecia.

Art style: deliberately BIG flat polygon faces, exaggerated macro-chibi videogame proportions, saturated colours, wide root buttresses, load-bearing branches, deep crowns and floating islands. A tree must visually communicate its class with labels and fruit decorations hidden. Preserve independent XYZ depth from front, side, rear and above. Reject narrow twigs, repetitive mushroom discs, detached confetti, generic shared trunks, noisy UI overlays, and text walls.

The HOME view must show actual live 3D, nearly no text, a small search icon and position dots. Finger swipe switches class. Explore allows orbit and pinch, 3 fruits per page, direct in-world fruit tapping, 19 families and on-demand data sheets. Retain the inherited 146 records (44 Zoan, 12 Logia, 90 Paramecia) unless independently fact-checked with a separately documented correction.

## Ordered work completed in V39

1. Inspected V38's genuine front/side/rear/above screenshot audit and its reference-versus-model comparison.
2. Read the old HTML and isolated the functioning renderer, touch interface, 146-entry JSON catalogue and navigation from its rejected tree geometry.
3. Compared the three latest class-specific portrait references to establish distinct trunk, crown and island proportions.
4. Wrote NEW art-directed sculpture source, sculpt_v39.py, rather than reusing V38's tree constructors. Authored full 3D triangles from large deliberate contours and polygonal planes.
5. Modelled a broad faceted floating island and thick rocky strata, real turf geometry and three waterfalls.
6. Zoan: massive orange-brown buttressed oak, independently supported full-depth green foliage masses, and an orange dragon with large horned head, body, jaw and teeth, plus restrained paw crest.
7. Logia: independently forked deep maroon wood, storm crown, fire-shaped solid polygonal tongues, ice prisms, wind ribbons and an angular lightning/lava path connecting the elements to the trunk.
8. Paramecia: separate ivory-pink S-curve body, thick double helix, giant raised multi-layer lotus petals, flowering lateral crowns, one three-dimensional tilted golden orbital ring and a real root portal.
9. Exported exactly three GLB files; reloaded each with trimesh and verified triangle face counts and finite coordinates.
10. Packed the EXACT same exported triangle positions and per-face colours into the standalone HTML. The runtime displays genuine 3D geometry from the first screen, not image substitution.
11. Retained renderer and catalogue operation, revised portrait camera framing and zoom range, and kept the resting UI text-free.
12. Rendered and inspected initial Zoan/Logia/Paramecia front views; expanded underweight canopy masses, widened trunks and strengthened paramecia roots/lotus.
13. Corrected a lightning silhouette that read like a straight plank, replacing it with an actual spatial zigzag, and added class-specific features lower in the tree.
14. Captured FIFTEEN actual model screenshots: front, three-quarter, true side, rear and elevated/above for EACH class, at 390x731.
15. Captured EIGHT beneficial UI state screenshots, from meaningful angles: Zoan home, Zoan Ryu Ryu no Mi page 3/3, compact family selector, Logia Energy & Weather page 1/2, Mera Mera detail, Paramecia Body Alteration page 1/11, Horo Horo details, and on-demand catalogue search.
16. Ran one complete 146/146 record test for title, power and seven metadata fields. Verified 19 groups and class counts 44/12/90.
17. Tested on-canvas 3D fruit picking, orbit dragging, mouse-wheel zoom, group paging, search and no JavaScript page errors.
18. Tested widths 360, 390, 430, 844 and 1366px; no horizontal document overflow.
19. Produced full source ZIP with offline HTML, art construction code, editable GLBs, triangle buffers, 23 screenshots, comparison boards, QA data and current reference images.
20. Published only V39 under a NEW GitHub path, leaving old versions and other branches untouched, and read back committed source and this document.

## Actual mesh evidence, before hanging preview fruit additions

Zoan: 3,680 triangles; X/Y/Z extents 17.19 / 30.01 / 14.55; Z/X 0.846.
Logia: 2,140 triangles; X/Y/Z extents 16.50 / 29.22 / 14.55; Z/X 0.882.
Paramecia: 5,754 triangles; X/Y/Z extents 17.34 / 32.08 / 14.55; Z/X 0.839.

These are individually authored solid meshes; counts are intentionally moderate to preserve broad facets. The JavaScript preview adds three interactive fruit models in each class. Automated browser screenshots used Canvas2D software projection of the same triangle mesh because native headless WebGL was unavailable. Actual Android GPU speed, memory, physical multitouch and sustained framerate are NOT independently verified. Inherited lore is not independently canon-audited, and 146 individually faithful fruit sculpts are not complete.

## Honest acceptance status and future gates

V39 is NOT artistically approved and NOT award-ready. It improves class independence and real XYZ volume over V38, but still looks far simpler than the three reference paintings. Side/rear views reveal imperfect crown-to-bough joins. Zoan's dragon anatomy needs a polished bespoke sculpt, Logia's materials remain compartmentalised, and Paramecia's lotus and portal still lack visual integration. Vision-match and completion percentages are subjective estimates, NEVER a substitute for user feedback.

Next release priority: in a dedicated modelling workflow (e.g. Blender/GLB), establish one truly majestic Zoan hero sculpt using large manually designed planes and matching its reference proportions from four angles. Make the silhouette read as legendary with all fruit/ornaments hidden; obtain user acceptance of actual browser-rendered 3D before treating the direction as proven. Then model Logia and Paramecia at the same quality, independently audit current canon and build faithful distinctive fruits. Validate physical Android WebGL and gesture comfort. Repeat all 15 angle views, all 8 UI state views, 146 records and 5 viewport sizes before releasing another version.

Durability: this versioned GitHub document and the downloadable source ZIP are the continuation record. Publication does NOT mean ChatGPT account memory was updated.