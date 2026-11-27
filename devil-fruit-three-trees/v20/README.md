# The Legendary Devil Fruit Trees — V20

A **single-page, self-contained interactive WebGL encyclopaedia** preserving the user's original source dataset of 146 named Devil Fruits (44 Zoan, 12 Logia, 90 Paramecia). It is an original macro-chibi, broad-faceted low-polygon interpretation of three legendary trees inspired by Devil Fruit classes, not an official One Piece asset.

## Art direction and two variants per tree

All three tree types are independently sculpted and expose **Design 1 / Design 2** in the same world:

- **Zoan A1 Beast Grove:** massive tropical crown, branching living roots, ivory horns, natural bark spiral and large friendly beast mask.
- **Zoan A2 Mythic Sanctuary:** asymmetrical green canopies, giant leaf antlers, feathers, bright sanctuary growth and carved animal features.
- **Logia B1 Elemental Confluence:** a single stone core, magma and ice branches, cloud canopy, water helix and lightning.
- **Logia B2 Primordial Tempest:** flowing volcanic pillar, broader storm canopy, tall magma spikes, angular lightning and swirling water.
- **Paramecia C1 Reality Bloom:** exaggerated polygonal pink flowers, elastic trunk, golden spiral and unusual branch growth.
- **Paramecia C2 Possibility Nexus:** asymmetrical pink growth, impossible golden portal, floating geometric facets and multiple golden rings.

The six models share a restrained macro-flat-polygon material language and bright palette. The floating islands remain deliberately *generic*, with grass, stratified rocky underlayers, wide angular waterfalls and base vegetation. Their shape and depth have been revised independently of the tree models.

## Interaction and data

On mobile, swipe left/right or use the arrow controls to change trees; tap the central tree to open its families. On desktop, select the tree via its floating name marker. Tap a hanging family, then a fruit, then inspect its name, class, power, users, affiliations, story arcs, saga, awakening and origin. Drag to orbit and pinch/wheel to zoom; Back retraces the hierarchy. The **Design 1 / 2** control changes the tree geometry without leaving the page.

All 19 hanging clusters contain generic colourful fruit models for *each* source record, including those without a verified canonical physical appearance. When inspected, those unverified designs use a black low-poly silhouette with physical chains and a gold lock, while 23 source records have stylised colour-specific models. This figure reflects a conservative data flag, **not an exhaustive November 2026 canonical appearance audit**; no claim is made that the reference models are 1:1 replicas of the manga.

## Verification

The release QA was run in headed Chromium using the software WebGL backend at 390 × 844 and 1440 × 900:

- Both viewports initialised without JavaScript exceptions.
- All 6 tree variants rendered without runtime errors.
- Actual tap/click navigation: overview → class → family → fruit → Back; Previous/Next and the design switch passed.
- 19 family meshes and 146 nonempty fruit models were checked for validity and data completeness.
- Every record retains its core fields, and IDs are unique.

The screenshots in the `qa_screenshots` folder are local render captures, *not* proof of live hosting performance on every mobile phone. Fidelity to the original concept painting, detailed fruit-specific canonical sculpting, runtime performance on physical hardware and deep material shading can still be improved; this is a complete functioning V20 application, **not a claim of 100% artistic fidelity**.

## Rebuild

Run `python build.py` from this directory. The script embeds `style.css`, `geometry.js`, `app.js` and `data.json` into one standalone `index.html` with **no external JavaScript or network dependencies**. The page can be uploaded to any static host.

The project handoff and ongoing development plan are saved here and in the GitHub repository; this makes them accessible to future sessions when the same repository is provided or connected.
