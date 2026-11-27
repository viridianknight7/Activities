# The Three Legendary Trees — Rebirth 01
27 November 2026 | Permanent design, build and QA continuation plan

## Non-negotiable instructions
Build exactly three legendary trees: one Zoan, one Logia, one Paramecia. Never reintroduce A/B forms, six competing trees or copied older shapes. The new website must be original. Prior screenshots, artworks, layouts, tree geometry and styling code must not be used as visual references. Only the inherited structured 146-fruit information may be retained, separately from all new artwork.

"Cartoony macro chibi flat polygonal" means bold oversized readable shapes, friendly exaggerated proportions, a silhouette that reads at tiny phone size, intentional broad facets and flat colour patches, and *actual substantial 3D geometry*. Do not flatten a 3D model into a plane, hide depth with a front-on orthographic trick, or fill the scene with tiny repetitive decorations. "Legendary" must be apparent in the tree's anatomy before ornaments and interface text are added.

## Three identities
Zoan, the Beastheart Grove: an ancient living giant, thick rooted trunk, tiered volumetric crown, widely separated load-bearing boughs and subtle mythical-animal growth.
Logia, the Primordial Heart: a dark primal tree bearing separate organic elemental quadrants, with fire, storm/lightning, ice and wind grown out of distinct limbs rather than decorative stickers.
Paramecia, the Dreamweaver: an S-curving ivory-pink tree with layered living blossom masses, a restrained golden orbit, a portal motif and strange spatial depth.

## Completed release sequence
1. Audit source ownership. Identify only files created by the assistant on the repository's main branch.
2. Compare current GitHub blob SHAs against known assistant-authored versions before deletion.
3. Delete only five unchanged assistant-created paths: v24/index.html, v25/index.html, v25/GAMEPLAN.md, v27/index.html and v27/GAMEPLAN.md. The two v26 files had subsequently changed and were preserved. Do not touch any other branches or files of uncertain ownership.
4. Start a new source folder and do not import or inspect prior artwork or design code.
5. Extract only the inherited records as JSON, preserving all 146 names, powers, users, arcs, classification and other metadata.
6. Implement an original standalone HTML/CSS/JS application with no external packages, network services, shaders or textures to download.
7. Build a reusable three-dimensional triangle-mesh engine with normals, perspective, depth, orbit camera and zoom. Provide native WebGL and software 3D fallback.
8. Build floating islands with substantial X, Y and Z rock geometry, terrain, grass and waterfalls.
9. Sculpt precisely one Zoan mesh from new tubes, roots, tapered wood, foliage volumes and animal motifs.
10. Sculpt precisely one Logia mesh with independently readable fire, storm, frost and wind anatomy.
11. Sculpt precisely one Paramecia mesh with a spatial helix, blossoming branches, orbit shapes and portal.
12. Set the mobile camera and compact bottom HUD so the crown, fruit positions, trunk, roots and island are not hidden.
13. Author chapter switching, family tabs, pagination, archive search and details from scratch.
14. Preserve 19 family groups and the 44/12/90 class counts. Build dynamic hanging fruit ornaments so the clickable 3D fruit matches the current page's record rather than opening an unrelated item.
15. Show power, type, user, affiliation, arcs, saga, awakening and origin for every record.
16. Audit geometry for NaN values, full nonzero extents and at least thousands of triangles per tree.
17. Test actual canvas click selection, orbit drag, mousewheel zoom, class change, group pagination, search and previous/next fruit.
18. Open 146/146 records through the interactive app; check its labels and fields.
19. Test 390×731, 360×800, 430×932, 844×390 and 1366×768 for horizontal overflow. Capture 10 true browser screenshots: 3 hero, 3 rotated, 3 groups, 1 details.
20. Publish only the new rebirth source path on main. Read the GitHub file back before sharing the raw.githack preview and original source links. The external preview's accessibility must be described separately from the confirmed commit.

## Release QA (verified locally)
- 146 unique Devil Fruit names and IDs: 44 Zoan, 12 Logia, 90 Paramecia, spanning 19 groups.
- Three independent physical meshes. Triangle counts: Zoan 10,190; Logia 9,372; Paramecia 10,750. X/Y/Z extents: Zoan 9.10/13.84/6.62, Logia 9.35/13.23/6.62, Paramecia 9.27/13.74/6.62.
- All 146 details opened with eight information fields; no browser page errors.
- Clickable hanging fruit, class navigation, family selection, full catalogue search, orbit drag, zoom and details next/previous tested.
- All five tested screen widths had zero horizontal overflow.
- Ten actual 390×731 captures are saved in the downloadable source package.
- The local test browser used software 3D due to unavailable WebGL; physical Android GPU and performance are still unverified.

## Visual acceptance and unresolved work
Do not confuse functional completeness with vision match. V27: approximately 5% visual match and 75% functional completeness. Rebirth 01: cautiously estimated at approximately 30% artistic vision match, 80% implementation completeness. These figures are subjective, not automated scores.

The three new sculptures are genuinely volumetric, cleaner and easier to recognise, but they remain too primitive for final legendary status. The priority is bespoke sculpting, not more procedural clutter. The Zoan needs a more monumental canopy, integrated animal anatomy and richer bark/root shaping. The Logia needs stronger elemental material continuity, livelier lighting and clearer storm, flame, ice and wind gestures. The Paramecia needs a bolder surreal crown, deeper spatial forms and more ambitious architecture. The 146 fruits need individually faithful models and reliable natural/revealed appearance rules.

Before claiming a future version matches the vision:
- Inspect front, oblique, side and elevated views of all three.
- View each silhouette at thumbnail size and in greyscale with no labels. All must still read as distinct legendary trees.
- Confirm branches actually support their canopies and no fruit hangs inside other geometry.
- Ensure no clipping or overlay collisions on a real phone.
- Implement beautiful but restrained materials, lighting and motion without overwhelming the main forms.
- Independently audit the 146 inherited lore records against current authoritative canon.
- Test Android WebGL, sustained framerate, touch pinch and real device performance.
- Re-run 146/146 records, all group pages, five viewport checks and 10 screenshots before publishing.
- Preserve the established three-tree rule and never overwrite other branches or unrelated files.

## Reuse and persistence
The new source is a single offline-ready HTML with entirely original mesh and UI code. The source ZIP also contains editable JavaScript, CSS, inherited fruit JSON, QA_REPORT.json, evidence screenshots and the more detailed local game plan. This GitHub file is the durable continuation record; a GitHub commit does not guarantee that ChatGPT's long-term memory has been updated.