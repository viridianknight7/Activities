# Legendary Devil Fruit Trees — Rebirth Touch
Date: 2026-11-27

## User-defined acceptance criteria
The user rated Rebirth's previous visual match at **1%** and explicitly rejected the subsequent increase in text density, thin trunks, crowded overlays, button-heavy navigation and generic sculptures. Do not substitute an assistant-generated percentage for the user's score.

**Scene first, information on demand:** the default screen should be almost entirely three-dimensional tree and floating island, with no big masthead, instruction banners, paragraph, A/B controls, tabs, large title card or floating labels. Keep just an icon-only catalogue control, a small class-and-fruit-count data marker, tiny progress dots, and a small icon to enter the branches. Only data such as fruit names, groups, users, powers and story fields should appear when navigating the selected fruit.

Three legendary trees, not six: exactly one chibi, volumetric low-poly Zoan, Logia and Paramecia. Each needs a thick monumental trunk, deeply three-dimensional silhouette, legible branch supports, distinctive growing elements and a floating island. Never flatten or squash the geometry or hide it behind text.

## Interface / gesture contracts
- One-finger horizontal swipe on the home scene switches among Zoan / Logia / Paramecia.
- Tap a hanging 3D fruit to show that specific fruit's data.
- Tap the tree, or the icon-only expand control, to enter the current fruit family.
- In explore mode, drag to orbit, pinch to zoom. Mouse drag/wheel also work on desktop.
- The compact family tray displays only the family name and current page. Swipe the tray or tap icon-only arrows to move through family/page combinations.
- Tapping the family label opens an optional data-only list of families.
- The top-right search icon opens the 146-fruit catalogue. Keep all descriptions out of the normal screen.
- Three hanging fruits per page: Body Alteration 11 pages, Energy & Weather 2, Ryu Ryu no Mi 3.

## Completed build + audit
1. Inspected the overcrowded Rebirth source and real browser screenshots.
2. Removed persistent masthead, instruction badge, class tabs, large bottom HUD, descriptive blurb, and text-based CTA.
3. Rebuilt a full-bleed canvas layout and icon-only mobile controls.
4. Retained the 146 inherited fruit records: 44 Zoan / 12 Logia / 90 Paramecia, 19 groups.
5. Increased trunk and branch radii, improved root volume, and restored visible dragon coils, elemental seams, magical ribbons, crown details and portal motifs after thickening.
6. Preserved genuinely volumetric geometry (no billboards or flattened images), 3 separate meshes.
7. Implemented single-finger tree switching, 3D canvas fruit picking, explore orbit, pinch handling, wheel zoom, family navigation, direct search and data sheets.
8. Restored 3-per-page fruit pagination.
9. Validated all 146 record detail openings, title/power and seven structured labels, class counts and 19 groups.
10. Verified swipe, fruit canvas hit testing, search, family selection, detail prev/next and mouse orbit/zoom.
11. Captured ten real 390×731 browser screenshots: three front and three oblique views; Body Alteration 1/11; Energy & Weather 1/2; Ryu Ryu no Mi 3/3; and Horo Horo no Mi details.
12. Checked widths 360, 390, 430, 844 and 1366 with no horizontal overflow and no browser page errors.
13. Packaged the standalone offline HTML, editable modules, QA_REPORT.json, and ten screenshots in the downloadable source ZIP.
14. Published to a new GitHub folder on main; never overwrite other branches or unrelated files.

## Local QA measurements
- Zoan: 14,156 triangles, extents X/Y/Z = 10.28 / 15.54 / 6.70.
- Logia: 14,126 triangles, extents X/Y/Z = 10.89 / 14.56 / 6.62.
- Paramecia: 15,186 triangles, extents X/Y/Z = 10.21 / 15.39 / 6.92.
- 146/146 entries opened, no browser errors, five device widths tested.
- Automated touch-pointer swipes tested in Chromium; real Android hardware, multi-finger comfort and GPU framerate still unverified.
- The screenshot test environment used the software 3D renderer because WebGL was unavailable there.

## Next visual iteration (must do before making high vision-match claims)
- User acceptance of the minimal, finger-first screen comes first. No unrequested informational text.
- Sculpt each tree as bespoke characterful geometry, not as cylinders plus spherical crowns. Preserve saturated macro-chibi polygonal art, thick trunks and clear canopy-to-branch anatomy.
- Increase class-specific richness: Zoan mythic growth and sweeping animal motif, Logia grown-in fire/cloud/storm/ice/wind material continuity, Paramecia deep spatial pathways and restrained magical orbit.
- Independently review front, three-quarter, side and elevated perspectives of all three, on real Android hardware as well as browser screenshots.
- Add distinct faithful 3D fruit models and independently canon-audit metadata; do not mark placeholders as completed.
- Keep three fruits visible per family page. Verify all group lengths, especially the 11/2/3 page templates.
- Re-run data integrity, gesture and 10-screenshot audit before every release; no version should be called legendary solely because code passes.

This file is the durable project continuation plan on GitHub. It does not guarantee automatic ChatGPT memory storage.