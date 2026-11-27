# Legendary Devil Fruit Trees V27 — release record and permanent continuation plan

Release date: 27 November 2026. Project: `viridianknight7/Activities/devil-fruit-trees/v27`.

## The user's non-negotiable vision

**Exactly THREE independent, fully volumetric 3D trees**. One Zoan (Living Evolution), one Logia (Elemental Confluence) and one Paramecia (Possibility Nexus). **No A/B alternative forms.** The user's own three high-quality concept portraits are the visual target; the current procedurally rendered meshes are *not* equivalent to those portraits.

Visual goals: polished, colourful low-poly fantasy video-game aesthetic; huge majestic organic trees with unmistakable class-specific silhouettes; thick tapered trunks; flaring roots on floating islands; large but spaced branching crowns; sensible front/back branch layering; balanced environmental motifs; readable independently designed hanging fruits; clear negative space and no mesh clipping, overlapping walls of blobs, flattened planes or visually squashed anatomy. The full 3D trees should look coherent when rotated, not just in one fixed screenshot.

Zoan: warm monumental oak-like timber; generous lush green canopy; restrained ivory feathered crown and mythic creature/serpent accent. Logia: physically integrated dark elemental wood, distinct flames, clouds, storm, ice and wind, not random props pasted onto a pole. Paramecia: graceful sculptural ivory/pink twisting wood, intentional magical gold orbits, elegant blossoms, portal at base and a few carefully placed fruits.

Preserve the complete inherited 146-record catalogue, 19 families, eight displayed information fields, keyboard/mobile navigation, page progression, and clear revealed-vs-unrevealed fruit appearance handling. Do not invent unverified canonical appearances or misrepresent concept art as rendered live 3D.

## V27 completed implementation and gates

1. Reopened actual V26 HTML, V26 reference screenshots, V26 game plan, three art concepts, automated QA scripts, and the inherited full data catalogue.
2. Kept three classes and a single authored `generateTree` mesh per class. Legacy A/B duplicate references are internal compatibility aliases only, and the form switch is hidden.
3. Added interpolated 3D limbs/trunks with stable tube section colours, no patchwork colour flicker, curved taper, and multiple roots spanning X/Z.
4. Added volumetric layered crowns with a central 3D puff, three smaller spherical lobes and geometric foliage accents (not flat planes). Tested software renderer at 390×731.
5. Zoan rebuild: bent timber skeleton, five principal foliage clusters and a rear depth cluster, crown-like crest, teal serpent coil, bark relief, island roots.
6. Logia rebuild: dedicated fire crown and flames, storm crown and lightning branches, 3D ice crystal cluster, two wind-ribbon paths and a pale cloud vortex, integrated orange and cyan fissures.
7. Paramecia rebuild: ivory-pink bent wood, five deep blossom groups, one high gold orbital ring, sculpted pink ribbon and gold inlay, portal framing at base.
8. Preserved group branches and preview fruit rendering; removed duplicated sculpt-only decorative fruits that caused front-screen clutter.
9. Increased default camera yaw to exhibit depth while keeping swipe-to-change-tree on overview, orbit drag inside class/family stages, and wheel zoom.
10. Tested all 146 records against actual catalogue values for power, subtype, users, affiliation, story arcs, saga, awakening and origin. No mismatches in the 146-entry browser test.
11. Confirmed class counts 44 Zoan, 12 Logia, 90 Paramecia; family counts 12, 3, 4; 38 existing 'revealed' fruit designs, 108 sealed/not illustrated.
12. Verified one unique 3D model per class: Zoan X/Y/Z bounding ranges 148.20/171.38/98.85, Logia 147.41/168.49/95.37, Paramecia 143.53/173.78/98.02 units (excluding island base below y=15); no nonfinite vertices.
13. Verified browser navigation buttons, backwards transition, real canvas fruit click opening details, mouse-wheel zoom and mouse-pointer class-stage orbit changes.
14. Verified no JavaScript page errors and no horizontal overflow at 320×640, 390×731, 844×390, 1366×768 in local Chromium software 3D renderer.
15. Captured TEN corresponding 390×731 portrait states: three overview trees, three 3D oblique views, Body Alteration, Energy & Weather, Ryu Ryu no Mi, Horo Horo no Mi detail, and generated a contact sheet. Matching captures refer to these specific in-app states, not photorealistic reference illustrations.
16. Preserved immutable V26 and prior paths; prepared standalone HTML, local source/test/references ZIP, V27_QA.json, screenshots and this game plan.
17. Publish the tested HTML and this plan to a new GitHub `v27` folder, verify source integrity/read-back and provide a browser URL only after upload succeeds. Keep any unverified GitHack caching status distinct from a verified GitHub commit.

## Honest assessment and remaining problems

**Current V27 visual concept fidelity remains low, around 30–40% by qualitative comparison to the approved portrait references. This is NOT a 90% match, and users should judge the actual screenshots themselves.** In particular, procedural 3D shading is relatively flat; large spherical canopy volumes lack realistic foliage; Zoan's animal detailing is small; Logia's four elemental territories can look like separate attachments; Paramecia's rings/portal are simplistic; and some fruit sprigs do not look convincingly anchored to the large tree branches. These problems are not hidden by the mesh-depth metrics.

The functional browser implementation is comparatively advanced, but the entire artistic/canonical product is not complete. The recorded 146/146 tests confirm inherited fields display consistently, NOT that every field is canonically accurate. Only 38 inherited fruit appearances are treated as revealed; the other 108 do not have confirmed visual designs in this version. Android device-side WebGL frame rate, thermal impact, touch pinch on hardware, colour calibration and GitHack page caching have not been verified.

## Required future improvements — v28+ quality gates

1. **Validate the actual reference, not a percentage.** Set three concept PNGs alongside the same 390×731 *live 3D* screenshot states, compare proportions with a shared bounding box, and identify exact missing silhouette elements by class. Keep a screenshot log of each iteration.
2. **Replace generic sphere canopy primitives** with purpose-built leaf mounds, layered clusters, irregular faceted silhouettes, organic curvature and polished shading. Negative space between the five crown groups must be intentional, with no five-identical-blob effect.
3. **Sculpt anatomy, not geometry noise.** Add stylised bark striations and root flares as surface-following meshes, better junctions at branches and taper continuity. Avoid duplicate trunks and straight stick-like side branches.
4. **Zoan hero sculpture:** implement a clear creature-inspired head/claw or feathered wings at appropriate scale, crown ornament, grown-in teal dragon body, large green canopy that frames the trunk, restrained animal guardian base details.
5. **Logia element integration:** redesign fire as a canopy made of three-dimensional flames (not a golden ball); storm with volume and meaningful internal bolt geometry; ice on branches/roots; wind as spatial spirals without repetitive railings; use clear material boundaries that flow from bark.
6. **Paramecia spatial fantasy:** invent realistic-looking faceted bloom clusters without disk geometry; more fluent ivory and magenta torsion, a proper portal/step composition behind or through the trunk, one clean gold orbit system with depth and no overlapping clutter.
7. **Physically attach fruits** to correctly oriented branch tip/stems and verify they remain visible at 0°, 45°, 90°, 135° yaw. Fruit records should not move into other branches or intersect geometry.
8. **Lighting and materials:** improve the GPU and software renderer's soft fill lighting, ambient shade, material hierarchy, gentle gold emissive accent, and colour cohesion. Develop a performance-friendly detail-level system for Android.
9. **Orbit depth acceptance:** all 3 meshes must have wide X/Z footprints AND visually readable anatomy from side, not merely numeric bounds. Capture turntable front/oblique/side screenshots of each tree.
10. **Mobile framing:** no major trunk/crown clipping at 320×640 or 390×731; the three backgrounds/buttons remain unobscured; group/detail views must be legible at both sizes and landscape.
11. **Interaction QA:** verify swipe between trees, drag to orbit inside class, tap tree, group, fruit, next/back, keyboard, wheel/pinch, scrolling detail, handling hidden designs. Target real-device Android browser tests, not only software Chromium.
12. **Data QA:** independently check Devil Fruit canon and proper affiliations/arcs from reliable One Piece sources; maintain explicit provenance and never conflate 'appearance unknown' with 'fruit absent'.
13. **Performance:** profile number of triangles/draw calls, frame time and memory in software, WebGL 1 and actual phone, then produce a detail-level fallback without flattening the model.
14. **Quality release gate:** compare next actual screenshots to the reference art and seek the user's own visual acceptance; do not self-certify 'vast improvement' based only on code or file size.
15. **Publish immutably:** only create a new `/v28/` after all tested screenshots, screenshot hashes, source, QA log and GAMEPLAN are tied to exactly the committed build. Verify the GitHub read-back and where possible live preview.

## How to resume in a future chat

Open `https://github.com/viridianknight7/Activities/blob/main/devil-fruit-trees/v27/GAMEPLAN.md` and `https://github.com/viridianknight7/Activities/blob/main/devil-fruit-trees/v27/index.html`. Read the user's *three original concept art PNGs*, the latest screenshots and the actual source. Treat V27 as a working but artistically incomplete baseline. The user's goal is exactly three *excellent real 3D trees*, not a sixth variant, a static fake-3D illustration, or inflated QA estimates.