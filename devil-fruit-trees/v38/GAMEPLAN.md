# The Three Legendary Devil Fruit Trees: V38 mesh replacement

Release date: 27 November 2026. This is the durable source, inspection, and release checklist.

## Visual target and protected decisions

Use the THREE most recent individually generated portrait reference images: the colossal orange-dragon green **Zoan**, the purple storm/flame/wind/ice **Logia**, and the pink/ivory lotus-orbit-portal **Paramecia**. They are reference illustrations, NOT 3D assets. Do not show them in place of the actual interactive model or call still images orbitable models.

The user's required game style is chibi/macro, large hand-defined polygon facets, saturated flat colour, oversized anatomy and fruits, true independent 3D volume, thick buttressed roots and floating islands. Exactly three trees, one per class. Do not resurrect former six-tree A/B variants, generic mushroom domes, thin Sudowoodo/twig trunks, text-filled default interfaces or disconnected ornamental confetti. Home must show actual 3D geometry with icon-only touch navigation; fruit data appears after deliberate selection.

## Ordered work completed

1. Read V33's actual webpage source and retained 146-record catalogue; separate the mesh constructors from the renderer, fruit data and controls.
2. Examine the three latest reference portraits, identifying their distinctive massing: Zoan's broad tiered canopy and large dragon, Logia's large flame/storm/wind/ice quadrants, Paramecia's giant central lotus, pink layered crown, twisted ivory wood, orbit and lower portal.
3. Establish consistent world units and camera composition, with y=0 at the island top and full model height approximately 24–25 units.
4. Author a new `art38.js` from scratch: explicit custom polygon silhouette coordinates, five-layer 3D hull construction, radial/buttressed trunks, separately directed thick branch paths and large flat-shaded colour planes.
5. Build a new irregular 3D island with faceted rock faces and three broad waterfalls, rather than reuse older island mesh geometry.
6. Build Zoan's own trunk rings, rooted boughs, eight individually placed multi-depth green canopy volumes, coiling large orange dragon body, bespoke polygonal head/mane and three fruit slots.
7. Build Logia's own wide dark fork, handcrafted fire silhouettes, tiered storm volumes, gold lightning, icy prism clusters, large white wind ribbons and three fruit slots.
8. Build Paramecia's own S-curving ivory/pink trunk, broad pink blossom masses, six deep lotus petals, real three-axis tilted gold ring, root portal and three fruit slots.
9. Remove the three still illustrations and base64 payloads from the default website presentation. The default HOME is the real 3D canvas, not a static art card.
10. Leave the existing functional catalogue, family selection, direct fruit canvas picking, home swipe, touch gestures, orbit, zoom and detail sheets intact.
11. Create a browser inspection instrument to set reproducible front, right side, rear and elevated cameras.
12. Render and examine 12 actual model screenshots, four angles per class. Inspect whether props are buried, silhouette identity survives rotation, tree trunks bear their crowns and crowns have actual Z thickness.
13. Correct initial slab-like crown sides by rebuilding the class-specific hulls into multi-ring convex 3D volumes rather than planar extrusions.
14. Correct hidden Zoan dragon head by bringing the orange head forward, and enlarge significant fire/ice/lotus structures and the floating islands.
15. Compare the actual three model fronts directly against the latest three portrait illustrations and record any mismatch as an unfinished criterion, not a success.
16. Run the original four fruit UI template states: Body Alteration, Energy & Weather, Ryu Ryu no Mi, and Horo Horo no Mi detail, including 3-per-page fruit navigation.
17. Run a complete 146/146 record sweep for title, power and all seven additional metadata fields. Keep 19 groups and 44 Zoan / 12 Logia / 90 Paramecia records.
18. Test world fruit clicking, explore orbit dragging, wheel zoom, five viewport sizes and no JavaScript page errors.
19. Export the exact live geometry of each class, with per-vertex colours, to three separate `.glb` assets. Reload each export with `trimesh` and verify triangle counts, finite coordinates and XYZ bounds.
20. Package the standalone HTML, `art38.js`, 3 GLBs, fruit JSON, QA scripts/report, a 12-view high-resolution inspection board, four UI captures, reference comparisons and this plan.
21. Publish in a NEW versioned GitHub path without editing unrelated branches, the user's own files or previous versions. Read back the exact published HTML and plan before sharing the browser preview, verified source and offline bundle.

## Measured geometry (actual meshes)

| Tree | Faces | X span | Y span | Z span | Z / X |
|---|---:|---:|---:|---:|---:|
| Zoan | 2,551 | 17.061 | 24.428 | 13.535 | 0.793 |
| Logia | 2,209 | 15.265 | 24.494 | 11.408 | 0.747 |
| Paramecia | 3,335 | 16.261 | 23.856 | 11.856 | 0.729 |

These counts are intentionally low for the *large polygonal plane* visual requirement. Each GLB is exported from the SAME vertices and vertex colours used by the web runtime. The site creates these exact meshes via its authored JavaScript generator rather than parsing the GLB at runtime.

## Verified runtime QA

- 146/146 inherited records opened and displayed their stored title, power and other seven information labels.
- All 3 actual polygon meshes loaded, rendered, and were measured in X/Y/Z. Three exact GLB exports reload with the matching face count and finite coordinates.
- Three distinct four-angle browser capture sets (front, right side, rear, top-elevated) were produced at 390 × 731. Four original fruit-screen states were also captured.
- The initial screen shows the real model, not an image; no default big text labels. Fruit canvas selection worked.
- Orbit drag and wheel zoom changed actual camera state. Screens at 360×800, 390×731, 430×932, 844×390 and 1366×768 had no horizontal overflow and generated zero JavaScript page errors.
- Browser screenshot generation used **software 3D projection**, due unavailable headless WebGL. Actual Android GPU performance, touch comfort and sustained FPS have NOT been tested.

## Honest aesthetic gate: NOT MET

The models are technically new and demonstrably three-dimensional, but still lack the cinematic sculptural quality and exact proportions of the reference illustrations. Particular remaining shortcomings: Zoan's dragon anatomy and crown joins remain simplified; Logia's materials appear compartmentalised; Paramecia's petal surfaces are too crystalline, and the camera/island composition is less majestic than the references. An automated 3D face count or screenshot does not prove a legendary visual match. The user has not approved the visual result.

Before a future award-quality claim: manually author polished Blender meshes (or another full 3D DCC) at this reference's proportions, build actual integrated creature/elemental/lotus anatomy, use optimised GLB assets as the runtime source, verify all four angles on a real phone, improve individual Devil Fruit sculptures, independently audit canon, and repeat the 12 model/4 UI screenshot matrix and all data/touch tests. Keep source editable and avoid dense screen text.

This versioned GitHub plan is the durable record. It does not guarantee automatic ChatGPT memory storage.