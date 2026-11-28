# V30 Studio-reference 3D rebuild — execution and continuation plan

## Provenance and design contract

Build **only on the verified V29 reference rebuild**, `Activities/devil-fruit-three-trees/v29-reference-rebuild`, commit `8843c59d7bb3a732502d97d95f5968d2bbd2668c`. Reuse the exact 146-record, 19-group dataset, four spatial levels, text-minimal touch-first interface, existing source and QA scripts. No variants: **one newly sculpted true-3D mesh per class**, each visible from every camera angle. Never substitute a generated static illustration for the functioning 3D site.

The user's three uploaded concept-art reference images are the visual target. Zoan: wide ancient orange oak, interconnected giant radial crown lobes, large joyful swirled fruit, muscular roots, connected waterfalls, sparse pale-gold **lunar-growth** motifs. **Absolutely no animal/guardian face: no eyes, mouth, nose, muzzle, mask or face-like geometry.** A new direction for inclusions is gold living cambium veins and one or two arc-shaped seed crescents organically embedded into growth, not wings cluttering the canopy or repeated gold charms. Logia: twisting basalt tree, vigorous flowing left-side flames, a single storm canopy with spiral/volumetric lightning, right-side deep blue crystalline glacier and airborne pale wind curls, lightning/lava seams integrated into roots. Paramecia: interwoven pale ivory and blush wood arms with multiple sculpted rose-sakura clusters, a few generous gold cosmic loops, an organic base violet spiral portal, a strong floating island.

Reference fidelity must be reviewed visually, not inferred from mesh triangle count or X/Z bounds. Avoid fake props, sparse pancakes, disembodied details, repeated spherical clutter, paper ribbons and monotonous stripe waterfalls. Keep label-only UI: names and data only; finger taps, fast horizontal swipes, slow orbiting, pinch and accessible small icon controls. Eight facts remain readable at mobile size. A single bright fruit per tree family with small ancillary fruit only when focused; do not spam 80 tiny ornaments on the overview.

## Twenty ordered QA and release gates

1. [x] Inspect three user concepts and the genuine V29 screen outputs at front/oblique views; record honest baseline scores.
2. [x] Recover the exact V29 modular source, script, catalogue and existing QA in this workspace, without mixing newer branches.
3. [x] Save this plan before redesigning geometry and interactions.
4. [x] Remove all face features from Zoan geometry, not just hide them at one angle.
5. [x] Reauthor Zoan into a wide, deep ancient oak with physically rooted living golden cambium and limited lunar crescent architecture.
6. [x] Reauthor Logia into a naturally connected volcanic, flame, storm, ice and wind 3D organism.
7. [x] Reauthor Paramecia into sweeping cream-rose braided architecture, spatial sakura/lotus petals and a rooted portal.
8. [x] Improve islands so water starts on the actual rim, flowing over physically modelled stone; avoid flat bands.
9. [x] Increase unique large fruit silhouette and recognisable spirals while preventing overview crowding; preserve all 146 inspectable records.
10. [x] Improve flat-poly lighting and subtle motion without sacrificing browser compatibility or finger controls.
11. [x] Audit the overview at 3 front angles and 3 deliberate high/rear/side angles: branch junctions, canopy depth, material boundaries, water attachment.
12. [x] Inspect at least 8 **different** UI states from purposeful angles across tree-family, fruit-family and detail levels, including illustrated and sealed entries; fix clipping, labels and touch targets.
13. [x] Check all 3 independent model bounds, X/Y/Z, Z/X ≥ 0.85, no billboards, no intentionally squashed camera.
14. [x] Test actual WebGL execution on 390×844 and 1440×900 and capture 14 labelled diagnostic screenshots.
15. [x] Traverse all 146 fruit records/19 families and all eight data fields; no data loss or field mismatch.
16. [x] Test canvas tree tap, family focus and fruit selection, quick swipe vs slow orbit, dual-pointer zoom, Back/Next/Previous, wheel/keyboard.
17. [x] Verify no browser JS errors, missing graphics, or overflow on both viewports; record limitations honestly.
18. [x] Package offline standalone HTML, editable JavaScript, readable QA, before/after comparisons, screenshot sheet and exact rebuild script.
19. [x] Publish an immutable GitHub revision under a distinct new V30 folder, verify all remote files and HTML Git blob equality with tested local source.
20. [x] Deliver browser preview link, standalone fallback, QA screens, permanent plan and honest score. No claim of exact studio/canon parity without objective reference proof or physical Android test.

## Permanent continuation requirements

Every subsequent version must retain: no Zoan face, limited organic gold moon/crescent features, 3 distinct meshes, reference-led wide balanced composition, never more UI text than data, four spatial navigation levels, full inherited 146/19 catalogue, deliberate eight UI state screen diagnostics and three front/three opposing physical angles. Real Android GPU performance, complete current manga-canon verification and concept-art-equivalent hand sculpting remain independent acceptance gates. Always distinguish subjective percentages from factual test pass rates.

## V30 completed execution record and evidence

**Baseline V29: 62% subjective reference match / 88% project completeness.** The user's three 1152×1536 concept references are visual directions, not original fully orbitable 3D assets. This V30 build is generated directly from the verified immutable V29 reference rebuild, not other concurrent branches.

**New geometry:** Only 3 independent active sculptures, one for each class. Zoan is reauthored with *zero* animal-face features: no eyes, mouth, nose, muzzle, mask, or hidden guardian face. Two asymmetric gold cambium-lunar arcs grow from real ancient oak boughs near separate side branch junctions instead of identical repeated wings. The actual 3D radial crowns, branches and roots are deep in Z. Logia branches bind curved fire tongues, basalt, dark-purple storm, lightning, cyan ice fans and wind into one 3D structure. Paramecia uses a pale ivory/blush twisted wood frame, multiple faceted pink sakura crowns and petals, rooted violet portal and two restrained gold orbits. Three independent floating islands have 3D longitudinal waterfalls.

**Visual diagnostic and repair loop:**
1. Initial six V30 renders had horizontal checkerboard/ladder waterfall stripes. Rewrote water as continuous colour-by-channel three-dimensional extruded streams, widened and shortened to leave room for the fruit interface.
2. A temporary fire disk looked like a floating orange doughnut. Deleted it and rebuilt the fire support as an actual internal ember-lit bough.
3. A Paramecia crown pass created 29 repeated sharp petal spikes around each crown. Removed most and kept 13 irregular broad facets, reducing ornament spam.
4. The antique Zoan gold marks were hidden behind front foliage. Connected them to visible but spatially offset wood seams instead of a symmetric facial shape.
5. Mobile controls grew to at least 44px, fact labels to 9.5px and values to approximately 13px; removed promotional UI copy and preserved semantic button labels for accessibility.

**Exact screenshot contract:** 3 frontal views (Zoan, Logia, Paramecia); 3 genuinely different elevated/rear/opposing views (Zoan 136°, Logia 234°, Paramecia 84°); 4 different tree-family states (Zoan Tori and Ryu, Logia Energy, Paramecia Environment); 2 fruit-family screens (Tori and Substance Creation); illustrated Awa Awa detail with all eight fields; sealed Numa Numa detail including physical chain and lock. All are **actual 390×844 WebGL frames**. Three desktop screenshots at 1440×900 complement them. The complete 14-shot contact sheet, reference comparison and screenshot PNG files are in the user-downloadable source ZIP.

**Automated QA:** Chromium software WebGL at 390×844 and 1440×900. Both passed. All 146 historical project records are unique, grouped 44 Zoan/12 Logia/90 Paramecia, and all 19 family collections are present (12/3/4). Full 146-record detail traversal checked eight fields per record, and 23 historically illustrated vs 123 appearance-unverified sealed forms were preserved. Actual canvas tree tap, glowing family-marker click, visible fruit selection, Back/Next/Previous, fast horizontal swipe, slow orbit drag, wheel zoom, simulated two-pointer pinch and keyboard arrows all passed with **zero uncaught JavaScript exceptions**.

**Measured tree X/Y/Z bounds (scene units):** Zoan 98.80 / 100.22 / 89.91 (Z/X 0.910); Logia 91.49 / 91.33 / 90.18 (Z/X 0.986); Paramecia 107.91 / 107.76 / 94.42 (Z/X 0.875). These are actual mesh vertices, not stretched screenshots. The exact tested local standalone HTML is independently byte-hashed and the published GitHub Git blob must match: \`b2c348f9edf99db4aa1819e1a56cd27b4f6c3736\`.

**Post-review rating:** approximately **66% subjective match to studio-grade concept references**, **90% functional/project completeness**. This is *not* studio parity and does not warrant award-winning claims. Further artist-authored modelling, vertex-painted facet details, material-specific shading, expressive cinematic motion, realistic fire/ice/cloud cohesion, canon reference audit for each illustrated fruit and physical mobile GPU testing are required. Physical Android FPS, GPU memory and third-party RawGitHack preview reachability have NOT been verified.

## Immutable continuation rule

Start V31 only from the exact V30 GitHub version and this plan; do not resurrect Zoan face features, do not lose the asymmetric organic golden lunar accent, do not add data-unrelated text or decorative UI, do not create variants, do not substitute flat concept images for orbitable meshes. Keep all 146 original project records and four finger-navigated levels. Every revision must demonstrate 6 physically useful geometry angles plus 8 deliberately chosen UI states, a visible defect-to-fix record, and reproducible git-verified source. Do not mark aesthetic acceptance complete solely by passing numeric depth bounds.
