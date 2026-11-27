# Legendary Devil Fruit Trees V28 — permanent visual direction, build and QA plan

**Release date:** 27 November 2026. **Target:** exactly three independent, substantial 3D macro-chibi low-poly sculptures. **Interface:** finger navigation and essentially no permanent text except selected fruit data, with a small class/count chip permitted. The user's earlier verdict was 1% visual match, and this must not be overridden with inflated assistant scores.

## Current result

V28 is one new actual polygon mesh for each of Zoan, Logia and Paramecia. It keeps the 146 inherited records (44 Zoan / 12 Logia / 90 Paramecia) and 19 fruit families. Real 3D means substantial width, height and depth, not a flattened billboard or static image. The revised tree art is visibly incomplete. Qualitative match to the user's desired legendary visual character is approximately **12–18%**, while functional completeness is approximately **83%**. Neither percentage is instrumented.

The essential previous design ideas to keep are: wide majestic living Zoan, turquoise mythical dragon and subtle wing/crown detail; monumental dark Logia with distinct fire, storm, ice and wind growth; pink, ivory and gold twisting Paramecia with portal and one spatial orbit. Use saturated faceted polygons, floating grassy islands and big readable fruits. Avoid generic spherical crowns, thin trunks, chaotic overlays, repeated geometric confetti, excessive instructions and unwanted A/B forms.

## Build and verification steps completed

1. Reopened the Rebirth Touch source and inspected its actual ten-browser-screenshot matrix before changing anything.
2. Compared all three original tree front views and three oblique rotations to the intended silhouettes.
3. Inspected the four reference screens: Body Alteration page 1 of 11; Energy & Weather page 1 of 2; Ryu Ryu no Mi page 3 of 3; Horo Horo no Mi detail.
4. Preserved the minimal touch-first interface: swipe trees at home, tap tree to explore, drag to orbit, pinch to zoom, tap a hanging fruit for information, search in an optional overlay.
5. Left the existing 146-record dataset, grouped family navigation and eight information fields intact; introduced no additional permanent text UI.
6. Authored a separate V28 source rather than overwriting previous releases or files in other branches.
7. Built a new Zoan tree sculpture with heavily rooted broad trunk, sweeping support branches, large uneven foliar volumes, teal dragon and integrated animal/wing/crown details.
8. Built a new Logia sculpture with thick dark rooted body, elemental limbs, substantially larger fire growth, lightning-bearing storm, blue crystal/ice and pale wind shapes.
9. Built a new Paramecia sculpture with broad ivory-pink body, heavy support branches, layered blossom structure, golden spatial orbit, double-helix ribbons and magical doorway.
10. Replaced old ring/circular foliage primitives with connected 3D multi-lobed implicit foliage. Marching tetrahedra yields real volumetric vertices and faceted triangle normals in all axes.
11. Improved the preview fruit volume and preserved three fruits per family page; page buttons open their correct record identifiers.
12. Ran JavaScript syntax validation and a full local browser suite.
13. Verified all 146 unique records by opening each and checking title, power and seven corresponding structured fields.
14. Verified 19 families and the class totals of 44/12/90 without omissions.
15. Tested direct 3D fruit click, mouse orbit drag, home touch-pointer class swipe, wheel zoom, catalogue search, family tabs and detail prev/next.
16. Tested 390×731, 360×800, 430×932, 844×390 and 1366×768; no horizontal overflow.
17. Captured ten reference-layout screenshots (three fronts, three oblique, four fruit screen states).
18. Captured an expanded **sixteen-screen audit**: front, oblique, true side and elevated for each of the three classes, plus the four fruit screens.
19. Visually inspected all sixteen screenshots; documented persistent silhouette/lighting/model weaknesses instead of calling the visual target met.
20. Packaged the standalone HTML, modular source, data, machine-readable QA, screenshots, scripts and this plan.
21. Published a new source file on GitHub under /devil-fruit-trees/v28 and read it back; do not delete or overwrite any unrelated repository content.

## Test evidence and limitations

- The 146/146 browser record sweep, direct canvas selection, swipe, zoom, search, family navigation and detail navigation passed. Zero JavaScript page errors.
- Three 3D models were present with nonzero X/Y/Z extents and tens of thousands of triangles each. Exact counts and extents are in the downloadable QA_REPORT.json.
- All five responsive widths had no horizontal overflow.
- The portrait capture browser used software 3D because native WebGL was unavailable in that test environment.
- Real Android WebGL/GPU frame rate, touch pinch comfort, sustained battery performance and external raw.githack caching remain unverified.
- The inherited Devil Fruit lore was not independently canon audited. Individual faithful models are not complete for every fruit.

## Mandatory next phase: art acceptance, not additional UI

1. First remove the primitive trunk-and-mushroom silhouette. Do not just add more triangles or decorative clutter. A tree must look legendary in greyscale from front, 45°, side and elevated angles at thumbnail size.
2. Sculpt bespoke thick trunk transitions and foliage-to-branch anatomy in a true modelling workflow (e.g. meshes exported to optimised GLB) where procedural primitives no longer achieve sufficient quality.
3. Zoan: grander rooted bark, full depth canopy, expressive dragon/beast anatomy; avoid tiny pasted-on emblems and wings.
4. Logia: fuse heat, lightning, weather, ice and wind **into** the wood rather than attaching tiny dishes of effects to branches. Dramatically improve cloud forms and ice translucency.
5. Paramecia: make the helix and impossibility visible in perspective without accumulating rings, and sculpt organic branching and blossom clusters rather than generic mushroom caps.
6. Build visibly unique hanging Devil Fruit meshes and ensure actual 3D click hotspots map to current page's items at all camera angles.
7. Keep the main screen free of explanatory banners, tooltips, large labels and redundant controls. No A/B or extra trees.
8. Profile native WebGL on the actual target Android phone, including gesture conflicts, camera speed, memory, thermal load and browser refresh behaviour.
9. Independently validate the 146 inherited records against reliable current canon and mark uncertainties; never silently assert speculative data as proven.
10. Repeat the 16 actual screenshot states, all groups, 146 records, five viewport sizes, no error tests and external preview verification **before** claiming a new release.
11. Respect user-supplied visual ratings. Automated QA success is not aesthetic acceptance.

**Persistence:** This Markdown file is committed to the user's GitHub repository as an explicit continuation reference. It is not proof that ChatGPT long-term memory was updated.