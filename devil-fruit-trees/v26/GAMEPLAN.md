# Legendary Devil Fruit Trees V26 — permanent build and continuation game plan

Date: 2026-11-27. Source of truth: `index.html` in this release, which preserves the 146-record catalogue from V25. Three illustration references: `zoan_legendary_tree_showcase.png`, `logia_elemental_confluence_tree.png` and `paramecia_possibility_nexus_tree.png` (concept art, *not* functional 3D models).

## Non-negotiable product intent

- Exactly **three** legendary trees: Zoan, Logia, Paramecia. The old A/B tree switch was rejected; each class has **one** final live 3D sculpture.
- A bright, readable, saturated, game-like low-poly environment. No cramped tree silhouettes, oversized obstructive embellishments, flat pseudo-3D sprites, or branches/fruit bunches overlapping in one plane.
- Trees must stand as readable sculptural shapes from front, side, and 45° oblique camera angles. Every branch/canopy should have thickness and meaningful X/Y/Z dimension.
- Zoan: noble lush living tree, broad separated canopy, integrated mythic organic motif, crown and roots.
- Logia: powerful elemental anatomy. Fire, lightning, cloud, and ice occupy separate parts of a single legible trunk/branch system.
- Paramecia: elegant twisting ivory, magenta, gold, pink bloom and limited spatial ornaments. No wall of oversized pink polygons.
- Preserve metadata and interaction: browse 44 Zoan, 12 Logia, and 90 Paramecia; retain 19 families, fruit-group pages, name, power, user, affiliation, story arcs, saga, awakening and origin. Do not invent unverified canon appearances.

## V26 completed actions

1. Reviewed V23 screenshots and the three new refined portrait concept images.
2. Reopened V25 HTML and catalogue; reused its complete dataset, renderer, camera, and controls.
3. Removed the form selector from UI and selection logic.
4. Generated exactly three unique 3D tree meshes. They are authored vertex geometry, not screenshots or image planes.
5. Rebuilt organic skeletons with fewer, thick, separated branches and a rooted island.
6. Replaced checkerboard foliage with normal-shaded, faceted canopy materials.
7. Made Zoan's silhouette predominantly green foliage and timber with a single teal coil.
8. Made Logia's elements physically distinct: orange fire on left, dark storm on right, pale cloud crowns above and crystalline ice at the base.
9. Made Paramecia's silhouette pink and ivory with a physically wrapped ribbon and a small gold orbit ring.
10. Reduced initial preview fruit crowding to three representative models per tree.
11. Preserved the existing fruit-group/gallery/detail stages, source metadata, and navigation.
12. Verified JS syntax; verified all three models load with no browser page errors in 390 × 731 software-rendered preview.
13. Checked 146 catalogue entries and all eight corresponding metadata fields (previous full automated pass). Another full release-level QA pass should precede claims of bug-free completion.
14. Captured the three 390 × 731 tree screens plus oblique-orbit and group/detail screens, saved under `screenshots`.
15. Measured actual mesh geometry above Y=15: Zoan X=130.37 Y=168.39 Z=85.15; Logia X=123.56 Y=156.89 Z=85.67; Paramecia X=127.55 Y=156.89 Z=87.37; all vertices finite.
16. Preserved earlier versions unchanged and produced a new self-contained V26 file and archive.

## Quality assessment, without inflated claims

- **Concept image fidelity** is still limited. The actual 3D meshes are simpler, sparser, more angular, and less detailed than the generated portraits. The new renders should not be presented as if they reproduce the concept art.
- **Structural cleanliness** has improved substantially relative to the user-rejected V25 designs. The goal of simplifying the visual mass and building a clearer base was achieved in the tested front views.
- **Completeness of the intended final visual experience is not 100%.** There are 146 inherited entries but only 38 inherited designs considered revealed; another 108 are sealed/unrevealed. Canon lore is not independently verified. Actual Android GPU performance, touch gestures on physical hardware, and externally hosted delivery have not been independently measured.

## Next work sequence / v27 gates

1. Obtain user evaluation of actual V26 website screenshots against the three approved concept portraits, not relative to any prior assistant percentage.
2. Create a side-by-side measurable silhouette comparison at identical 390 × 731 framing: crown height, trunk width, canopy distribution, percentage of negative space, floating-island scale, and UI occlusion.
3. Sculpt a more lifelike Zoan: tapered limbs, tiered leaves, feathered central crown, one carved animal guardian with restrained scale; maintain open front-facing fruit space.
4. Sculpt a more visually distinct Logia: cloud cyclone and lightning integrated as curved volume, glowing elemental seams, credible dark roots, no detached flat fire spikes or oversized pale spheres.
5. Sculpt a more graceful Paramecia: smoother but still faceted twisting branches, layered pink blossoms and measured gold orbit arcs, a convincing magical portal without UI overlap.
6. Improve all three silhouettes under yaw angles 0°, 45°, 90° and 135°, verifying no camera-side collapse or self-occlusion.
7. Design and verify genuine physical attachment points for preview fruits and family-view fruits. No floating fruit stems or decorative stubs masquerading as branches.
8. Add subtle ambient shading, material highlights, and more refined gradient-like colour palettes without checkerboard panels.
9. Ensure the three concept names, fruit counts, page labels, group screens and detail panels remain readable at 320 × 640, 390 × 731, 844 × 390 and 1366 × 768.
10. Programmatically test every fruit entry against the stored catalogue, check class/group membership, all eight metadata fields and all navigation buttons.
11. Test touch swipe, drag orbit, pinch and physical-device WebGL where possible, plus keyboard and software-renderer fallback.
12. Reproduce exactly 10 named portrait screenshot states and make one contact sheet. Compare them against the user's initial 10 examples.
13. Audit lore and official/unrevealed appearances explicitly before marking any of the 108 sealed entries as revealed.
14. Save updated QA JSON, screenshots, a complete immutable ZIP and continuation plan in the release folder.
15. Publish only after source and screenshots actually correspond to the tested build, then verify remote content, remote link and commit.
16. Never repeat overly generous percentage assessments. Clearly distinguish visual fidelity, structural depth, data coverage, and functioning UI.

For future continuation, this file and the previous versions are the handoff. Treat V26 as a **functional three-tree simplification baseline**, not as a finished recreation of the three high-fidelity illustration concepts.