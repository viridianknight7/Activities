# Legendary Devil Fruit Trees · V21

Fan-made 3D Devil Fruit encyclopaedia. Three original trees represent Zoan, Logia and Paramecia, respectively. These tree designs are not part of official One Piece canon.

## Approved visual design

Macro-chibi, hand-sculpted look, broad opaque polygon faces with flat lighting, exaggerated proportions, vibrant solid colours, intricate-but-legible inlays, oversized spiral-patterned fruits, organically integrated branches and tall tree structures. Distinct legends: Zoan as beast/life/evolution, Logia as embodiment of elemental nature, Paramecia as impossible transformation/possibility. The game presents two selectable 3D variants for each (A and B).

## Art and technical release plan

1. Inspect the supplied mobile screenshots and list visual/functional failures.
2. Develop two vertically proportioned concepts for each of the three trees.
3. Reconstruct real 3D mesh geometry for six distinct tree forms.
4. Rebuild floating island geometry and material palette.
5. Keep 146 fruit entries and their existing family classification.
6. Generate fruit branches, stems, spiral inlays and unknown-design markers.
7. Rebuild controls, contextual text, camera framing and family navigation.
8. Prevent duplicate family fruit geometry from appearing on top of tree fruit geometry.
9. Provide a separate, readable detailed-fruit information display.
10. Visual QA of mobile and desktop overview, family, group and fruit views.
11. Validate all A/B toggles and page controls.
12. Run record-by-record navigation tests for every source record.
13. Correct found rendering defects; publish tested standalone HTML.
14. Recheck GitHub publication and the exact committed file.

## QA performed

- Desktop and mobile browser screenshots inspected.
- JavaScript syntax validation passed.
- 146 catalogue items / 146 unique IDs, group totals Zoan 44, Logia 12, Paramecia 90.
- All 146 records selected through corresponding class and family without exceptions.
- Category switches, A/B model toggles, family selection, group selection, detail panel, and back navigation exercised on mobile and desktop.
- Local headless Chromium used its **software 3D** fallback. Real-world Android WebGL performance and external caching are not independently confirmed.

## Remaining quality limitations

- Concept illustrations are references. This build does **not** achieve faithful 90% visual reproduction of the generated concept art. The six real-time 3D sculptures are simplified by comparison.
- Fruit appearance knowledge is incomplete. 'Unknown design' denotes a symbolic representation, not an invented canon appearance.
- Desktop overview draws a small representative set of fruits per family for performance. Selecting a tree renders its complete hanging-bunch catalogue.
- Rendering throughput on specific Android hardware still needs user-device testing.

## Source and access

Open `index.html` in a modern browser. The HTML includes all source data, shaders, geometry and interface, no CDN dependencies. This release is at `devil-fruit-three-trees/v21/index.html` in `viridianknight7/Activities`.
