# Legendary Devil Fruit Trees — V25 retained game plan

## Provenance and scope

**Starting point: V24 only.** The new `geometry25.js` replaces all V24 tree and island generators. The scene engine and inherited records are carried forward, without importing later projects. There is exactly **one** selectable macro-chibi sculptural tree per class, and there is no search, no modal page and no alternative tree switch. The application is one WebGL page with an overview, suspended families, fruit selections and readable inspection details.

The inherited catalogue contains **146 records** (44 Zoan, 12 Logia, 90 Paramecia) in **19 grouped families**. These are historical project figures, not a claim that every newly introduced canon fruit as of November 2026 is included.

## Artistic approval decisions (must be preserved)

- **Style:** oversized One Piece-inspired adventure-game shapes, colourful *flat-shaded macro-polygons*, facets instead of blurry realism, large inlaid spirals, readable gold/navy text, tangible deep geometry and a lively aerial setting.
- **Zoan · Beast Grove (A1 with Mythic Sanctuary motifs):** an enormous biological organism with powerful flaring roots, branching antlers that grow from wood, prehistoric foliage, a gentle animal-guardian face integrated into bark, pale carved veins and rounded leafy clumps. Not a regular orchard or pasted-on skull.
- **Logia · Elemental Confluence (B1 with B2 weather elements):** the *tree itself is nature*: a basalt core with thick lava cracks, stormy clouds, separate curving flames, lightning, 3D ice and water currents twisting around the trunk. Not geometric diamonds pretending to be flames or a cloud ornament on a normal tree.
- **Paramecia · Possibility Nexus (C2 with C1 Reality Bloom motifs):** three impossible braided columns, strong asymmetric 3D rose-like blooms, layered portal rings at different angles, floating material fragments and elastic spirals. Not a plain pink tree with rings stuck on top.
- **Islands:** single shared generic irregular floating geology, thick layered rock, turf and a pair of bent waterfall sheets. Avoid identical large cylindrical platforms or straight pipe waterfalls.
- **Fruits:** every named family member physically exists on its tree; at distance it is stylised as a small fruit. At the individual inspection stage, illustrated appearances are visibly distinct *stylised interpretations*, while unverified physical designs use a black silhouette, chain and lock.

## Same ten-screen visual acceptance matrix

Capture six class previews (three head-on and three 3/4 orbit angles) and four representative templates (tree-family view, three-fruit family, illustrated-fruit detail and sealed-fruit detail). Inspect the actual 390x844 WebGL output, not generative concept art. Separately render and validate all three classes at 1440x900 desktop. Every tree must exhibit a meaningful Z extent comparable to X; prohibit squashing to fill a portrait crop.

## Ordered release plan and V25 evidence

1. [x] Reopen V24 exact source and earlier screenshot examples; score V24 against the artistic brief. Estimated **65% vision match / 78% completeness** (subjective).
2. [x] Record the prior approved and rejected artistic elements above.
3. [x] Choose exactly one new independent anatomical design per fruit class, with no design selector.
4. [x] Rebuild Zoan tree from mesh primitives: muscular roots, extended tree-antlers, thick 3D radial branches, carved bark and multi-layer macro leaf crowns.
5. [x] Rebuild Logia tree: geological central trunk, radial storm branches, cloud masses, curved 3D fire, lightning, ice and water spiral anatomy.
6. [x] Rebuild Paramecia tree: intertwined columns, actual deep flower petals, spatially distinct portals, 3D suspended pieces and spiral inlays.
7. [x] Replace floating island geometry with thicker, layered, non-flat polygons and staggered falling-water surfaces.
8. [x] Rebuild hanging branch architecture and spread each fruit family's suspended bunch while keeping all 146 fruit records.
9. [x] Preserve the seal treatment for unverified fruit designs, without inventing canon physical appearances.
10. [x] Correct mobile and desktop camera framing and improve large-font readability and detail-panel placement.
11. [x] Generate the **exact ten-screen template matrix** and inspect it as one contact sheet.
12. [x] Test WebGL navigation on 390x844 and 1440x900 screens, including tree selection, family labels, fruit selection, Next, Previous, Back and pointer orbit.
13. [x] Construct and traverse all 146 fruit models and all 19 families; check required fields, no duplicate IDs and no uncaught JavaScript errors.
14. [x] Measure true XYZ mesh bounds. Zoan (42.11, 61.73, 45.65), Logia (38.84, 61.56, 36.38), Paramecia (37.51, 62.87, 37.70). All axes use model units.
15. [x] Verify the editable-source rebuild is identical to the release HTML, generate the ZIP, README, screenshot package and this plan.
16. [x] Publish the separate immutable GitHub V25 revision and verify the exact repository source SHA. The external preview host is separately qualified as unverified.

## Explicitly not complete

- Current 23 *historically illustrated* entries are stylised procedural models, not individually canon-verified exact sculptures. The remaining 123 entries are project-labelled unrevealed/unverified. The appearance classifications require an authoritative manga-reference audit and should not be treated as authoritative canon.
- Real-device Android sustained performance, GPU memory use, energy consumption and device-specific touch behaviour have not been benchmarked.
- External CDN availability must be independently verified after publication; GitHub confirmation alone does not prove the third-party preview host is working.
- Artistic fit and completeness percentages are judgement calls; the models can continue to improve after V25.

## Continuation rule

Continue from **V25**, do not overwrite the user-approved concepts or silently switch to another codebase. Preserve the ten-screenshot matrix, game plan and history in this repository. For each next release: first validate actual visuals and full catalog, fix cropping, check source integrity, then publish as a new immutable GitHub commit with screenshots, QA details and a transparent list of remaining gaps.
