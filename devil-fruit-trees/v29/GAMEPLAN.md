# Legendary Devil Fruit Trees V29 — permanent game plan

**Release:** 27 November 2026, Waterloo (Canada)  
**Source:** [V29 index.html](index.html)  
**Goal:** three distinctly sculpted legendary Devil Fruit trees, deeply volumetric in X, Y and Z, with the cartoony macro-chibi, flat-faceted polygon style, finger-first navigation and the 146-entry encyclopaedia.

## Vision contract — do not undo

Exactly **one tree per class**: Zoan / Logia / Paramecia, not six alternatives or A/B forms. No billboards, flattened meshes, thin poles, smushed trunks or crowded overlays. The home screen is almost entirely the interactive 3D tree. Touch swipes change class, tapping the tree enters its branches, drag rotates, pinch or mouse wheel zooms, and tapping a hanging fruit brings up its records. Use a compact family selector and an optional catalogue icon. No persistent explanations, instructions, massive title cards, duplicate buttons or dense on-screen text.

Preserve **previously endorsed** visual ingredients: massive rooted trees, bright saturated low-poly colours, round readable chibi proportions, lush multilayered Zoan crown and mythical teal dragon/wing/crown motifs, dark elemental Logia with fire/ice/storm/wind as living growth, elegant pink-ivory-gold Paramecia with spiral, portal, large blossoms and one restrained celestial orbit. Keep floating rocky islands, a bright ocean sky and distinct oversized hanging Devil Fruits. Reject the recurring cylindrical-trunk / ball-on-stick trees, mushroom-disc crowns, tiny disconnected stickers, excessive repeated trinkets, A/B selections and UI clutter.

**Crucially:** functional correctness is not artistic acceptance. The user has rated prior visuals **1%**. Respect that benchmark and never substitute a high assistant rating for the user's aesthetic judgement.

## Required screenshot audit, before every release

Capture **sixteen actual browser screenshots**, not generated concept art. At the same portrait dimensions (390×731), acquire for each tree: **front, 45°/oblique, true side, elevated** (12). Then recreate the four original reference screens exactly by state: **Paramecia Body Alteration, page 1/11; Logia Energy & Weather, page 1/2; Zoan Ryu Ryu no Mi, page 3/3; Horo Horo no Mi information sheet**. Also keep a ten-screen contact sheet if useful for quick comparisons. Examine silhouettes for depth, negative space, unsupported limbs, occlusion, front/back overlap and fruit visibility.

## Ordered V29 implementation and validation checklist

1. Open and inspect V28’s live source and the 16 screenshot audit before editing.
2. Separate subjective vision match from measurable implementation completeness.
3. Preserve only the 146 inherited Devil Fruit records and successful touch-first behaviour.
4. Create a new versioned path without overwriting old versions or other branches.
5. Replace the V28 disc-like foliage with angular, volumetric multi-lobed leaf surfaces.
6. Model large flared root buttresses and thick branch junctions extending in all three axes.
7. Build one broad Zoan with separated foliage masses, integrated teal dragon, horns, feather fans and a restrained crown.
8. Build one Logia with an elemental fire growth, lightning-bearing storm, rising ice and wind growth on corresponding massive branches.
9. Build one Paramecia with ivory bark, pink sculpted blossoms, double-helix ribbons, one perspective-tilted gold orbit and a small root portal.
10. Make all tree meshes navigable through a real orbit camera; no fake 2D tree swap.
11. Test the mobile portrait camera’s composition at the top crown, trunk, fruit placement and island rim.
12. Inspect the actual front renders, including whether tree elements look grown into the trunk and whether any accents resemble loose sticks.
13. Correct the camera clipping and loose bark strip artefacts observed on the first draft.
14. Strengthen the Paramecia blossoms by using thick, raised geometric petals rather than thin planar strips.
15. Move Logia’s coloured foliage closer to its branches and colour the distal wood consistently.
16. Preserve minimal visible UI with a small class/count marker and icons only; content text appears on demand.
17. Keep family pagination at three fruits per page, with the correct fruit ID attached to each clickable 3D hanging fruit.
18. Run JavaScript syntax verification and measure mesh triangle counts, X/Y/Z bounds and finite geometry coordinates.
19. Open all 146 entries; compare titles, powers and their seven supporting data-field values against inherited JSON.
20. Test 19 groups and the 44 Zoan / 12 Logia / 90 Paramecia class totals.
21. Test finger horizontal swipe for class change, dragging to orbit, wheel zoom, canvas fruit picking, catalogue search, family navigation, detail next and previous.
22. Test responsive widths 360, 390, 430, 844 and 1366 without document horizontal overflow or browser errors.
23. Capture all 16 required screenshots after every final geometry change, not just pre-release candidates.
24. Attempt native WebGL; if unavailable, report that the software 3D fallback was tested and Android GPU remains unverified.
25. Package a standalone HTML plus the art code, data, tests, README, QA report and all screenshots.
26. Commit only the new V29 files to GitHub, read them back, and supply the preview and verified source URLs.

## Verifiable V29 results

The **146/146 details** sweep passed, with **19 families**, **44 Zoan**, **12 Logia** and **90 Paramecia**. Canvas fruit tapping, swipe, drag orbit, mouse-wheel zoom, catalogue search, family navigation and detail prev/next all passed. No browser page errors or horizontal overflow across five tested sizes. The 16 screenshot views were successfully captured.

- Zoan: **30,272 triangles**; measured XYZ extents **12.29 × 17.62 × 7.35**.
- Logia: **25,512 triangles**; measured XYZ extents **11.04 × 17.06 × 6.62**.
- Paramecia: **37,656 triangles**; measured XYZ extents **11.02 × 17.49 × 6.62**.

The browser used **software 3D rendering**; a SwiftShader WebGL attempt still fell back to software. Physical Android hardware performance, touch comfort, native WebGL compatibility and current One Piece canon verification are **not** confirmed.

**Visual acceptance is NOT met.** The best conservative assistant estimate is about **15% vision match** and **85% implementation completeness**, both subjective. There is genuine 3D depth but the overall style remains too obviously procedural: Zoan crowns still have generic lobes, Logia has an exposed column and relatively detached elemental growth, and Paramecia’s petals/ribbons still look mechanically assembled. Do not call the project visually finished.

## Next required artistic method change

1. Stop making small tweaks to procedural cylinders, balls and ribbons. Use a genuinely sculptural editable 3D workflow for tree anatomy and detailed hero features (e.g. hand-modelled Blender meshes exported as optimised GLB), then integrate with the functional browser UI.
2. Produce one hero Zoan prototype first; compare front, 45°, side, elevated and greyscale thumbnail silhouette before extending the approach to Logia and Paramecia.
3. Attach boughs convincingly, transition from trunk to leaf clusters naturally, deepen layered foliage and establish a majestic but uncluttered silhouette.
4. Make Logia’s elemental material transitions part of the branch anatomy, not attached displays; redesign the central cloud and dark trunk as a dramatic elemental tree.
5. Make Paramecia’s spatial helix and blossom anatomy feel like one magical organism; preserve negative space around the gold ring.
6. Individually sculpt recognisable fruit appearances and verify their in-world positions and picking targets.
7. Independently review all inherited lore against current reliable canon, flagging uncertainty or noncanonical items instead of asserting completeness.
8. Test on the target Android phone with genuine GPU WebGL, multi-touch, real framerate and battery/thermal behaviour.
9. Re-run all 146 records, 19 family groups, 16 screenshots and five viewport checks for each future release.
10. Do not claim a high vision percentage or release readiness until the user approves **actual interactive renders**, not static concept illustrations.

## Persistence

This GitHub Markdown file is the permanent continuation record. Saving it does not establish that ChatGPT long-term memory has been updated. Future chats can open this file and the versioned V29 source; never delete unrelated files or change other branches.
