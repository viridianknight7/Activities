# Legendary Devil Fruit Trees V30 — permanent design, build and QA plan

**27 November 2026 · Source:** [index.html](index.html) · **Status:** working interactive version, NOT artistically approved as legendary.

## Binding user vision

The user gave V29 **1% visual match** and specifically rejected an enormous text-covered family chooser, cropped trees, simple ball/disc crowns, thin trunks, disconnected ornaments, generic AI-like modelling and six A/B variants. This rating is the starting point; never treat passing code checks as aesthetic approval.

Exactly **three** actual volumetric low-poly macro-chibi trees: Zoan, Logia and Paramecia. They must have truly substantial **X, Y, Z depth**, broad genuinely load-bearing branches, majestic trunk/root anatomy, dimensional crown and floating island. Chibi means exaggerated expressive silhouettes and big readable features, **not** a set of basic cylinders and spheres. Keep saturated cartoony polygon facets, playful but monumental proportions and readable negative space.

**At rest, no visible text at all.** The home screen is nearly all 3D tree: no titles, paragraphs, helper text, class names, permanent family grid, large labels, A/B switch or pop-up. Only very small transparent touch icons and three position dots. Data text is appropriate **only after deliberate user action**: fruit details, search or a temporary fruit-family picker. The family list must never cover the central tree.

Previously endorsed distinct identities:
- **Zoan:** broad rooted living oak, deep multilayered green foliage, integrated turquoise mythic dragon and restrained crown/feather motifs.
- **Logia:** dark rooted elemental organism, strong fire, storm/lightning, crystalline ice, wind and cloud growth arising from heavy branches.
- **Paramecia:** thick pink/ivory twisting magical tree, actual large 3D blossom petals, one gold spatial orbit, a portal and restrained curved ribbons.
- Every fruit page has **three hanging fruit positions**, with enough negative space to tap and orbit around them.

Do not reintroduce elements repeatedly rejected by the user: paper-flat tree models, squashed crowns, decorative confetti, detached sticks, A/B duplicates, dense permanent text or vague progress claims.

## Exact screenshot contract

At **390 × 731** portrait pixels, capture **front, three-quarter, true side and elevated** for each class (**12 tree views**). Capture four additional user-provided template states at **helpful rotated angles**:
1. Paramecia, **Body Alteration** family, page **1/11**, three-quarter.
2. Logia, **Energy & Weather**, page **1/2**, near side angle.
3. Zoan, **Ryu Ryu no Mi**, page **3/3**, elevated.
4. **Horo Horo no Mi** detail sheet, Paramecia at oblique angle behind it.

Plus one **family chooser regression screenshot**, proving the selector is an on-demand **56px single horizontal row** rather than a huge blocking grid. All **17 actual browser PNGs** and contact sheet are in the ZIP.

## Completed V30 build steps

1. Inspect the user's exact screenshot and actual V29 code; identify obstructing text controls, cropped artwork and generic crown anatomy.
2. Carry forward only the 146-entry inherited catalogue and proven 3D engine/data navigation; do not reuse old tree sculpture geometry.
3. Build three new independent base meshes, no form selector or extra trees.
4. Implement thick radial root buttresses and massive tapered continuous tree trunks.
5. Implement a new thick lenticular **3D leaf-blade** primitive with curve, variable width, true front/back thickness and arbitrary three-axis roll.
6. Construct sculpted irregular multi-depth leaf fans from these blades, supported by broad boughs rather than sphere piles.
7. Assemble Zoan anatomy and the visible dragon with face, horns and a winding body.
8. Assemble Logia's connected fire, ice, storm, wind and cloud branches, with physically attached material transitions.
9. Assemble Paramecia's dimensional blossoms, pink/ivory body, helix, one orbit and portal.
10. Correct full-body camera framing so crown and floating island fit without crop in portrait.
11. Reject an intermediate top-support prototype which looked like detached loops; thicken the continuous central trunk instead.
12. Remove persistent headings, instructions and class text; leave tiny transparent icon-only controls.
13. Reduce family chooser to a narrow horizontal on-demand list, measured at **56px**; default state always hidden.
14. Preserve 3 fruits per page and direct 3D picking of the actual record ID.
15. Preserve one-finger class swipe, in-tree orbit, two-finger pinch, desktop wheel zoom and optional catalogue search.
16. Run syntax and geometry checks for finite coordinates, nonzero substantial XYZ extents and thousands of triangles.
17. Check all **146/146** entries render name, power and seven stored detail fields, retaining 44/12/90 classes and 19 families.
18. Verify all three screenshot family-page counts (11/2/3) and the Horo Horo sheet.
19. Test class-swipe pointer gestures, direct 3D fruit tapping, drag orbit, pinch and wheel zoom, family navigation, search and detail previous/next.
20. Test **390×731, 360×800, 430×932, 844×390 and 1366×768** for overflow and runtime errors.
21. Capture and inspect all **17** screenshots *after* the last geometry change.
22. Package offline self-contained HTML, editable sculpture source, catalogue JSON, scripts, screenshots, QA report and game plan.
23. Publish **only** this V30 path to GitHub. Do not modify unrelated branches, files or earlier versions.
24. Read the published HTML and plan back from GitHub before presenting any link; distinguish confirmed source publication from third-party GitHack preview caching.

## Measured results

Local browser QA: **146/146** details passed with eight displayed fields; **19 families**; 44 Zoan, 12 Logia, 90 Paramecia. All 5 test sizes passed without horizontal overflow. Real 3D fruit tapping, gestures, search, family selection and detail navigation passed with **zero browser page errors**. A synthetic two-pointer pinch reduced camera distance **35.53 → 33.25**, confirming zoom interaction. The opened chooser is **56px tall**.

Separate Zoan, Logia and Paramecia triangle meshes have substantial X/Y/Z extents and more than 10,000 triangles each. Exact counts are in [QA_REPORT.json](QA_REPORT.json). The 17 screenshot views are in the downloadable ZIP.

**Limitations:** Screenshot QA used Canvas2D software 3D because Chrome WebGL was disabled. Physical Android WebGL performance, sustained framerate, multi-touch comfort and thermal/battery behaviour are not verified. Inherited canon data has not been independently fact-checked and the 146 fruit visual models are not individually canon-accurate. The new sculptures remain visibly too simple for the full ornate legendary vision. Do not label them visually finished or claim the user approved them.

## Next artistically necessary phase

1. Stop small procedural blob-and-cylinder modifications as a substitute for art direction.
2. Sculpt one **hero Zoan** mesh with professionally designed silhouette, limb junctions, deep foliage architecture, true dragon anatomy and integrated material shapes in a 3D authoring tool (e.g. editable Blender / GLB). Review in greyscale and thumbnail scale as well as the four 3D angles.
3. Obtain **user approval of the actual interactive Zoan render**, not a concept illustration, before using that detail level to sculpt Logia and Paramecia.
4. Model Logia elemental growth as a single organism, with coherent material transitions, not decorative attachments.
5. Model Paramecia blossoms and impossible spiral with dramatic dimensional depth while keeping negative space around the ring.
6. Sculpt distinct individual Devil Fruits, preserving accurate picking targets at all camera angles. Separately audit 146 inherited lore records against current authoritative canon, marking uncertain claims.
7. Use optimised GLB and WebGL material/shader improvements if they materially improve art. Avoid throwing Rive, WebGPU, motion sensors or new libraries at an unsolved modelling problem.
8. Validate on the real Android target for WebGL, touch, FPS, battery, accessibility and loading.
9. Repeat all 17 screenshots, every fruit entry, 19 group pages, five screen sizes, gesture tests and zero-text/default no-overlay checks before any release.
10. Publish only approved/tested files in a new version folder, preserving user and third-party work.

This GitHub plan is the durable record for future iterations. Its existence does not imply it was saved into ChatGPT account memory.