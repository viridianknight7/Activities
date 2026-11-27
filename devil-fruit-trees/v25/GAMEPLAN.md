# Legendary Devil Fruit Trees V25 — build, validation and continuation game plan

**Date:** 27 November 2026  
**Project:** Interactive fan-made One Piece Devil Fruit encyclopaedia, based on the user-supplied V23 screenshot sequence and the recovered V23/V24 project.  
**Primary hosted-source repository:** `viridianknight7/Activities`  
**GitHub source:** https://github.com/viridianknight7/Activities/blob/main/devil-fruit-trees/v25/index.html  
**GitHack rendering URL:** https://raw.githack.com/viridianknight7/Activities/main/devil-fruit-trees/v25/index.html (derived from GitHack's GitHub-path convention; remote service reachability could not be independently tested).  
**Git commit:** `fd7e614fd80ab5013599b984f19e605fff1b3c24`  

## User's desired outcome

- Six distinct, **genuinely dimensional** tree sculptures: two alternatives for Zoan, two for Logia and two for Paramecia. No squashed crowns, glued-on 2D images, flat sprite trees, indistinguishable recolours or false 3D perspective.
- The established low-poly, saturated, chibi fantasy island world, lively sky, ornate trunks, hanging Devil Fruits, physical effects, A/B form switch and approachable mobile game UI.
- Preserve selected favourites from the longer design history: **Zoan A1 Beast Grove**, **Zoan A3 Mythic Sanctuary**, **Logia B1 Elemental Confluence**, and **Paramecia C2 Possibility Nexus**. Keep contrasting companion forms B2 Primordial Tempest and C1 Reality Bloom.
- Keep all **146** previously inherited fruit records (44 Zoan, 12 Logia, 90 Paramecia), **19** family groupings and each existing lore field. Use sealed-looking fruit appearances when inherited source did not verify a distinct fruit design; do not invent canon patterns.
- Recreate the supplied **ten mobile screenshot views** at the same app-content aspect ratio (~390 × 731), including six tree forms, Body Alteration, Energy & Weather, Ryu Ryu page 3 and Horo Horo details.

## V24 baseline before this iteration

- Estimated match to user's visual concept: **76%** (subjective).
- Estimated implementation-feature completeness: **90%** (subjective, based on V24 local QA).
- Issues observed: visually busy overlapping fruit and ornament clusters, simple crowns, insufficient separation of branch/canopy masses, very compressed Logia elemental composition, and Paramecia ornament forms without enough recognisable individual flower architecture.

## Completed V25 checklist

1. [x] Recover and inspect the true V24 HTML, V23 source, six mobile captures, catalogue and previous QA results. Avoid assuming that screenshot appearance alone proves functionality or accuracy.
2. [x] Keep the user's six named concepts and prior A1/A3/B1/C2 preferences intact; design and code both variations for each tree.
3. [x] Rebuild Zoan A1 with a robust twisting guardian trunk, organic multi-lobed canopy, sculpted animal facial features, antlers, ivy scales, and deeply rooted floating island.
4. [x] Rebuild Zoan A3 as genuinely split supporting trunks, separated deep canopy groups, upper phoenix feather crest, ivory antlers, hanging aerial roots and living turquoise spiral scales.
5. [x] Rebuild Logia B1 as a black basalt elemental organism containing separated thunderclouds, flame, lava veins, falling water, lightning and grounded ice prisms.
6. [x] Rebuild Logia B2 with a twisting basalt tree, three-dimensional stacked storm masses, a wraparound cyclone helix, physical orbital rings, fire, lightning and ice.
7. [x] Rebuild Paramecia C1 with multi-layer sculpted flowering petals, actual front/back thickness, raised gold centres, spatial rings, floating facets and volumetric magenta bark.
8. [x] Rebuild Paramecia C2 with a stronger zigzag trunk, separately spaced floating magenta crown volumes, three-axis interlocking gold rings, hanging fruit and crystal satellites.
9. [x] Rebuild island ornaments without flattening its underside: stepped earth, rooted rock formations, waterfalls and physically separate stones.
10. [x] Rebalance camera height for new taller tree sculptures; enlarge recognisable hanging fruit silhouettes and position family anchors on full 3D branches.
11. [x] Preserve A/B form-switch buttons, class navigation, intermediate family and fruit pages, fruit detail view, drag/orbit, pinch/scroll zoom, previous/next and back navigation.
12. [x] Render both alternatives for all three trees in portrait and inspect the actual screenshots, not only the mesh source code.
13. [x] Recreate the ten views in the exact 390 × 731 app-content aspect-ratio screenshot set, with six main forms and four content close-ups.
14. [x] Test every inherited record programmatically: 146/146 detail openings, 146 distinct IDs, all eight legacy metadata fields present, 44/12/90 counts and 19 families.
15. [x] Test both forms of each tree for finite vertices, genuine non-zero x/y/z range, different geometry and no rendering exceptions. See metrics below.
16. [x] Test controls via real simulated user interactions: switch, page changes, full back path, **canvas tap on a hanging fruit**, **pointer-drag orbit**, and **wheel zoom**.
17. [x] Test 390 × 731, 390 × 844, 844 × 390 and 1366 × 768 browsers and no browser page errors in those four environments.
18. [x] Confirm the exact final HTML is self-contained (no CDN dependency) and archive it alongside the original screenshot comparisons, geometry source and full QA.
19. [x] Create the immutable V25 Github source `devil-fruit-trees/v25/index.html`; refetch file from GitHub and confirm exact UTF-8 text length / marker contents and commit SHA.
20. [x] Deliver a downloadable standalone HTML, comparison screenshots, complete source ZIP and this plan; retain the immutable V24 source as a fallback.

## Real 3D dimensions of sculpted portions (excluding island y <= 15)

| Class and form | Faces | X span | Y span | Z span |
|---|---:|---:|---:|---:|
| Zoan A1 | 11,082 | 120.78 | 142.00 | 71.08 |
| Zoan A3 | 10,440 | 120.11 | 162.99 | 72.56 |
| Logia B1 | 8,318 | 118.50 | 136.80 | 89.86 |
| Logia B2 | 17,918 | 112.96 | 152.97 | 89.69 |
| Paramecia C1 | 26,280 | 99.01 | 139.70 | 54.77 |
| Paramecia C2 | 16,570 | 112.63 | 144.86 | 88.20 |

All have finite vertices and extensive depth. The presence of polygon faces alone does not guarantee a desired visual quality: the 10 supplied V25 screenshots are the separate artistic inspection evidence.

## Verification and limitations

- Six generated models have different shapes and face counts, not flat billboards; all use perspective software rendering in the local automated browser, with WebGL GPU path retained.
- All **146** inherited records were reachable and their name, power, subtype, user, affiliation, story arcs, saga, awakening and origin fields displayed. This is **software data integrity**, not independent canon source verification.
- No JavaScript page errors in the automated checks. No missing internal navigation path was found by tested scenarios.
- Only **38** inherited fruit appearances are marked "revealed". Others deliberately use sealed black fruit forms. This is **not** 146 canon-verified individual fruit appearances.
- Canon completeness and all entries' correctness are **not** independently established. Before stating a percentage of canonical fruit coverage or calling the index exhaustive, do a source-by-source One Piece audit and agree on manga/anime/games/SMILE inclusion.
- Test browsers employed the perspective **software** fallback. Physical-device Android GPU, refresh rate, frame timing under background loads, and browser-specific behaviour still require testing on a real phone.
- GitHub source was successfully committed and fetched from the connector. GitHack live rendering could not be fetched in this environment, so no claim of independently verified public hosting availability is made. The GitHub source and the standalone offline HTML are confirmed fallbacks.

## V25 assessment

**Visual match: approximately 84%**, a subjective assessment based on the six matching before/after portrait views. The strong points are independent silhouettes, distinctive motifs, three-dimensional volume and additional ornamentation. Remaining gaps are the highly stylised illustrative polish, lushness in Zoan crowns, untangled branches/fruit placement and smoother visual organisation.

**Implementation-feature completeness: approximately 94%**, based on tests of the existing catalogue and navigation. This does *not* mean 94% of all official One Piece Devil Fruits have confirmed lore or artwork. All six model variants and 146 inherited catalogue records work in the tested scenes.

## Game plan for V26 and beyond

1. Lock existing source and screenshot baselines. Do not destroy the tested V25 file. Start a new versioned branch/path and retain Git hashes.
2. Decide whether the user prioritises polishing the six current variants or adding still more structures; preserve A1/A3/B1/C2 as chosen core motifs.
3. Rework Zoan to add less angular leaf faceting, individual tiered canopy clearances, carved branch ornamentation, physical readable guardian animals, and better green colour harmonisation.
4. Rework Logia to better connect each element to the trunk anatomy, soften the cloud volumes without losing faceting, improve lightning fork silhouettes, and avoid placing giant energy ropes over fruit click targets.
5. Rework Paramecia with fuller layered blossoms and clear petal spacing, thinner but still 3D spatial hoops, subtle edge highlights, and more asymmetric crown groupings.
6. Visually separate representative fruit specimens from all ornamentation in the overview, family, group and detail screens. Do not remove any actual records or prematurely reveal undescribed fruit patterns.
7. Add visual LOD performance profiles for slower Android devices; use correct whole-mesh simplification rather than dropping alternate triangles and making holes.
8. Add real-device mobile WebGL/WebGPU compatibility and performance checks; maintain software renderer fallback.
9. Perform independent canon verification of every fruit name, model, use, owner, arc, awakening, and origin, recording whether the appearance is confirmed or unverified; avoid inventing facts.
10. Rerun the 146-record, six-mesh dimensional QA; screenshot all ten reference positions at 390 × 731; compare against V23, V24 and V25.
11. Use a published new immutable link only after automated interactions, real-device rendering and exact site-URL response checks succeed. Record any blocked checks explicitly.

**Continuation instruction:** If editing this project in a later conversation, open this plan alongside the standalone V25 HTML and the screenshot comparison. Check current source version and tests first, then make changes and rerun the entire quality gate before returning a replacement link.