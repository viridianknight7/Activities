# V32 · Reference-led 3D Devil Fruit World: execution and future handoff

## Baseline and source freeze

Continue **exclusively from V31**, the tested source at `devil-fruit-three-trees/v31`, verified Git blob `65b606ec8dd82d296836d70416a6dab24b0a5625`. V31's actual 14-shot contact sheet and reference comparison are the visual baseline. The three user-supplied portrait concept paintings are visual references, not editable geometry or camera-complete 3D models. **Baseline subjective V31: 60% reference match, 92% functional completeness**. Do not claim award quality or reference-exact replication without those standards actually being reached.

No Zoan face, eyes, muzzle, head or mask. Retain a few asymmetrical gold lunar growth arcs physically rooted in boughs, not mirrored horns/wings or repeated spam. Three independent true-volume silhouettes: Zoan oak with chunky connected radial branches and a powerful organic green canopy; Logia magma-black tree whose fire, purple thunderstorm, cyan ice and water are its actual structure; Paramecia wide ivory-blush braided tree with large side-facing sakura blooms, a rooted portal and sparse gold rings. Strong front/rear Z geometry and no flattened billboards.

The user wants a finger-first, almost text-free interface: only real class/group/fruit names and full eight-field fruit data. Preserve 146 historical project records (44 Zoan, 12 Logia, 90 Paramecia), 19 families, 23 historically illustrated stylised models and 123 historically sealed unknowns, all four 3D navigation stages. No search, modal, oversized labels, tutorials, counter or variant picker.

## Visual shortcomings observed in V31

- The wide reference trees fill their entire island with substantial sculpted boughs and a more integrated large-fruit canopy; V31 is thin and has repetitive round, layered treetop disks.
- Logia V31's orange blade fans, purple saucer cloud and cyan hanging rods look pasted onto a black stick; the reference fuses fire/cloud/ice/wind into the same living timber volume.
- Paramecia V31 is repetitive layered pink disks atop straight white spokes; the reference has expressive swooping ivory-pink braided trunk and dimensional crowns with a portal built into real branches.
- V31's family views cut off tree landmarks, the three black sealed fruit icons dominate empty sky, and small text and navigation controls need more useful spatial context.
- Island waterfalls show pipe-like angular strips rather than joined, tapering free-flowing sheets when viewed side-on.

## Ordered execution and validation checklist

1. [x] Open exact V31 geometry, app, original references and 14 actual screenshots; record baseline and defects.
2. [x] Save this V32 game plan before any code edits.
3. [x] Build exactly one new custom volumetric Zoan sculptural model, no face. More custom leaf facet variation, integrated thick lateral growth and restrained ancient lunar bough arcs.
4. [x] Build exactly one new Logia model with wide integrated flame-and-storm architecture, not planar fan blades and rods; include illuminated magma, ice crystals and curling wind.
5. [x] Build exactly one new Paramecia model with broad ivory-blush braided branches and irregular multi-orientation sakura/lotus crowns, 3D portal and restrained gold orbital geometry.
6. [x] Reauthor class-specific floating islands so green turf/stone/stream structure aligns; remove pipe-like waterfall segmentation and add depth on opposing view.
7. [x] Preserve all 146 project records, physical hanging fruit families, 19 groups and seal/illustration flags.
8. [x] Improve finger navigation spatial context, legibility and discoverability without extra non-data text; retain thumb-accessible icon controls.
9. [x] Rebuild standalone HTML directly from editable app/geometry/style/template/data and check exact byte equality.
10. [x] Create 3 direct overview screenshots and 3 purpose-chosen high/rear/opposing overview screenshots exposing canopy, bough and island depth.
11. [x] Create 8 different family/fruit screenshots: two Zoan groups, Logia family, Paramecia family, two separate fruit-selection groups, one illustrated detail and one sealed detail; choose orbits that expose actual UI defects.
12. [x] Inspect contact sheet visually and fix visible defects, recapturing affected screens rather than accepting only numeric mesh bounds.
13. [x] Construct all models and measure XYZ extent for every class; require depth/width >= 0.85 and no intended flattening.
14. [x] Test real WebGL in 390×844 portrait and 1440×900 desktop browsers, check no JS errors and no horizontal overflow.
15. [x] Test all 146 detail records, eight fields, all 19 groups, canvas tap, family marker, fruit tap, swipe, orbit, pinch, wheel and Back/Next/Previous/keyboard.
16. [x] Produce 14-view visual contact sheet, dedicated reference comparison, reproducible source ZIP, standalone HTML, README and machine-readable QA report.
17. [x] Publish new immutable V32 GitHub revision with complete source and development plan, and verify published HTML Git blob matches tested local file and editable source rebuild exactly.
18. [x] Give verified browser link, download fallbacks, honest percentages and concrete remaining gaps; don't claim studio-reference exactness.

## Future continuation rule

Carry forward this file and all previous design approvals in V33. Do not restore a face, overdecorate gold motifs, add user-facing clutter or silently change catalogue. Every version must use six deliberately different real 3D tree views and eight different useful family/fruit UI states, with defect-driven reshooting before release. Canon audit and physical Android performance remain outside local simulated WebGL QA until independently verified.

## V32 observed result and defect-to-fix log

**Final actual diagnostic:** captured three front tree views, three distinct elevated/opposing views and eight previously used but differently oriented UI templates: Tori, Ryu, Energy, Environment, Tori-fruit collection, Substance Creation fruit collection, illustrated Awa Awa and sealed Numa Numa. Tested viewport **390×844 portrait** and **1440×900 desktop**. All 146 records and all eight data facts per record inspected, all 19 families preserved; tap, swipe, slow orbit, wheel, two-pointer simulated pinch, Back/Next/Previous and keyboard checks reached completion with no uncaught JavaScript errors. The post-correction fast suite also independently passed 146 details at each viewport.

**Design-specific fixes from screenshots:** the first V32 render showed checkerboard-looking leaves and blossoms; changed face colours to respond more coherently to light direction and low-frequency shape patches. The Logia fire volumes looked like floating spikes; grew a shared warm flame core and additional physically supported tongues into the left boughs, and thickened the storm and ice. The V31 waterfalls still resembled bent pipes; built four full-width, varying-depth waterfalls descending from the island turf across its rim. Three small chained fruit-selection objects overlapped on a bare plank; created a shaped bough with three drop stems, increased spacing and enlarged contextual names. Rebuilt the six tree-angle renders and fourteen-state QA after these repairs.

**Physical XYZ extents:** Zoan 117.35 × 120.61 × 118.65 (Z/X 1.011), Logia 102.49 × 112.20 × 90.86 (Z/X 0.887), Paramecia 124.29 × 142.00 × 124.36 (Z/X 1.001). All models are actual triangulated 3D objects, not sprite projections. No flattening to fit the portrait camera.

**Artistic score:** previous V31 60% subjective reference match / 92% functional completeness, now V32 **64% / 94%**. This is a modest incremental improvement in the real rendered result, not a studio-grade breakthrough. An exact reproduction of 2D concept paintings from every possible 3D viewpoint requires substantial human-led sculpting, material art and lighting; do not market V32 as award-winning or exact. The older inherited 146-fruit dataset remains historical project data, not audited latest manga canon; 123 unknown appearance states remain sealed.

**Mandatory V33 priorities:** genuine artist-authored foliage shapes and branch junctions, integrated energy-source materials rather than primitive separation, full ivory ribbon bark anatomy, detailed individually authored sakura petals, water visibly cascading over the shelf from rear/side, purposeful fruit stylisation, thumb-first UI touch tests on real phones, meaningful device performance metrics, and no unrelated text or excessive golden decor. Preserve exact 14-test camera matrix and source/checksum integrity.

## Immutable publication verification

The exact tested V32 standalone Git blob is `c24470b6f5939234000c8404ee070badc84a776f`. I fetched the published HTML, template, CSS, original JSON, application and all nine geometry modules from GitHub and reconstructed the HTML byte-for-byte. The final simulated mobile and desktop tests traversed 146 fruit records and eight fields per fruit, and the 14 actual screenshot angles remain packaged with the user-downloadable source ZIP. CDN availability and physical Android frame rate remain unverified.
