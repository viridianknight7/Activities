# Legendary Devil Fruit Trees V26 — permanent development and QA plan

**Date:** 27 November 2026
**Working application:** `devil-fruit-trees/v26/index.html`
**Baseline preserved:** V25 `index.html` and `GAMEPLAN.md`

## Locked creative direction

One seamless interactive 3D Devil Fruit encyclopaedia, fruit-centred rather than user-centred. **Three classes, each with TWO real independent volumetric 3D forms**, all in saturated macro-chibi flat-polygon game style on floating islands:

- **Zoan A1 Beast Grove / A3 Mythic Sanctuary**: thick sculpted roots, antlers, living guardian faces, lush tiered crowns, and in A3 split trunks and phoenix-like wings.
- **Logia B1 Elemental Confluence / B2 Primordial Tempest**: physical basalt, flame, water, storm-cloud masses, lightning, ice and spiralling cyclone.
- **Paramecia C1 Reality Bloom / C2 Possibility Nexus**: impossible but voluminous growth, large sculptural blossoms, twisting magenta bark, dimensional golden rings and asymmetric hanging clusters.

All sculptures must maintain robust X, Y, and Z dimensions and recognisable silhouettes at front and side angles; never replace with sprites, image billboards or fake 2.5D. The **A/B form-switch remains essential**. Keep the interface one page, without search or modal text cards. Families must visibly grow/hang from 3D branches.

The inherited historical project catalogue contains **146 fruits** (44 Zoan, 12 Logia, 90 Paramecia) in **19 groups** (12/3/4), with names, power, type, known user, affiliation, story arc, saga, awakening, origin. There are **38 inherited marked illustrated** and **108 sealed/unverified**. Do not describe these classifications as a complete canon-source audit.

## Step-by-step implementation checklist (V26)

1. [x] Recover V25 as latest known good source, inspect previous V25 QA and screenshot baselines.
2. [x] Preserve V25 intact and publish in new immutable `v26` version path.
3. [x] Retain the six chosen A1/A3, B1/B2 and C1/C2 identities.
4. [x] Rebuild Zoan A1 guardian tree with thicker roots, antlers and visibly separated front/back crowns.
5. [x] Rebuild Zoan A3 with split supporting trunks, feathers, living decorations and separate deep canopy masses.
6. [x] Rebuild Logia B1 with independent physical magma, ice, lightning, clouds, water and twisting basalt branches.
7. [x] Rebuild Logia B2 with stacked cyclonic storm volumes and 3D helical rings around differentiated elemental regions.
8. [x] Rebuild Paramecia C1 with thick flowering petal sculptures and raised golden cores.
9. [x] Rebuild Paramecia C2 with zigzag trunk, separated floating crown volumes, orthogonal spatial hoops and floating facets.
10. [x] Refine generic floating island and underside without stretching island into a full-screen flat landmass.
11. [x] Connect branches to physical family attachment points and prevent missing/undefined mesh colours.
12. [x] Render each inherited fruit as one distinct hanging group bud in its family at exploration distance; reduce distant overview to preview specimens for readability/performance.
13. [x] Preserve dark chained and locked appearances for unverified models; do not fabricate canonical artwork.
14. [x] Keep A/B variant switch, realm-switch arrows, tap Explore, select family, select fruit, Back/Next/Previous and camera orbit/zoom.
15. [x] Fix C2 wrong crown palette and a discovered petal face-colour bug that previously crashed rendering.
16. [x] Recreate the ten reference screenshot states at 390×731, including six overviews, Body Alteration, Energy & Weather, Ryu Ryu page 3 and Horo Horo fruit detail.
17. [x] Inspect actual portrait and 3/4-angle renders and verify genuine non-zero X/Y/Z extents.
18. [x] Verify responsive WebGL operation at 390×731, 390×844, 844×390 and 1366×768.
19. [x] Test all 146 detail paths, all 19 groups, six tree variants and actual pointer controls including canvas tap, drag and zoom; record runtime errors.
20. [x] Package standalone, editable source, complete screenshot sheet and the machine-readable QA record.
21. [x] Commit exact tested HTML, preserve accessible fallback and save continuation instructions.

## Measured geometry (tree portions above y=15)

| Variant | Faces | X extent | Y extent | Z extent |
|---|---:|---:|---:|---:|
| Zoan A1 | 11,105 | 127.82 | 155.23 | 108.21 |
| Zoan A3 | 11,661 | 128.96 | 171.94 | 109.91 |
| Logia B1 | 9,130 | 121.27 | 138.26 | 107.40 |
| Logia B2 | 11,090 | 140.01 | 167.20 | 126.40 |
| Paramecia C1 | 6,151 | 124.99 | 171.87 | 104.30 |
| Paramecia C2 | 11,360 | 125.77 | 169.23 | 125.28 |

All measured vertices finite, and the forms have genuinely distinct topology. This measures depth, **not** subjective aesthetic quality.

## Browser QA

- Catalogue: 146 unique records and all required legacy fields; 19 group records; 146 reachable detailed inspection routes.
- All six trees render with no missing face colour; all 146 detailed fruit meshes and 146 hanging buds constructed.
- Four responsive viewport test cases: 390×731, 390×844, 844×390, 1366×768. No uncaught JS page errors, no bad mesh colours.
- A/B form switch, realm navigation, explore, full back path, canvas fruit-family tap, drag orbit, wheel zoom tested in desktop Chromium with WebGL/software acceleration.
- Ten screenshots plus angled side views preserved in source archive.
- Full build source SHA-256: `8ba5a8c34bf4200f48ff2c0d4620e4fc36aa4d326c0fe31482903b32d9dc9f56`.

## Honest remaining work

- Full chapter/official-source audit of **all 146** fruits and which designs are actually illustrated is not completed; 38/108 are inherited tags only, not independently verified canon.
- Physical Android GPU performance, pinch responsiveness, thermals, frame-time spikes and the public GitHack CDN end-to-end load have **not** been independently verified. Browser success does not establish physical-device success.
- Artistic refinements remain: more individually sculpted fruit shapes, better crown-to-branch separation in every angled view, more cohesive shadows and lighting, improved petal spacing, fewer interfering floating ornaments and richer but not cluttered elemental materials.
- Do not call the project 100% aesthetically complete. All visual-match percentages remain subjective.

## Next-session continuation

**Read V26 index.html and this plan first, then V25 GAMEPLAN.md**. Preserve six designs, their working A/B selector, and 146 records. Make V27 or later under a new immutable path. Repeat the same 10 screenshots, all 146 entry traversals, X/Y/Z mesh ranges and four-viewport UI tests. Never announce a live CDN test without actually opening the rendered public page; otherwise provide GitHub source and the offline standalone HTML.