# Legendary Devil Fruit World V29

A one-page, **finger-first interactive 3D Devil Fruit encyclopaedia**, continuing exclusively from the verified V28 source. The three independent macro-chibi low-poly tree sculptures take their direction from the three supplied reference images:

- **Zoan · Ancient Beast Grove:** a broad, tiered green oak, warm orange carved animal-guardian trunk, deep radially supported crown and roots, colourful embossed hanging fruit, and two golden crescent wings grown from the antlers. The crescent motif is deliberately restricted instead of repeated as visual spam.
- **Logia · Elemental Confluence:** a dramatic fused dark volcanic trunk, orange-yellow fire canopy, purple volumetric storm/vortex, forked electric cracks, crystalline glacier and twisting cyan currents.
- **Paramecia · Possibility Nexus:** braided ivory and rose-coloured branch anatomy, expanded pink low-poly sakura crowns, dimensional lotus blossoms, two restrained celestial rings, and a luminous violet portal integrated at the roots.

All three sit on faceted floating rock islands with brighter connected waterfalls, clouds and smaller distant islands. Each of the 19 hanging fruit families has a visually prominent representative fruit, with its other source records still present physically within the bunch. The original historical 146 records remain (44 Zoan, 12 Logia, 90 Paramecia); these should not be represented as an independently canon-verified complete list.

## Using the world

Touch the tree to explore the selected class. Tap the highlighted hanging family, then a fruit. Swipe horizontally to cycle trees/families/fruits, slowly drag to orbit in 3D, and pinch to zoom; icon-only navigation buttons provide a fallback. Only the selected class/family/fruit names and factual fruit metadata are visible. Every fruit detail screen includes its eight inherited data fields.

Open **`index.html`** directly in a browser with WebGL. No external JS, fonts, assets or server is needed. Build from the editable source with `python build.py`. The game uses the same original source modules from V28 and the additional `geometry29.js` models, with `app.js` containing touch/selection and `styles.css` containing the minimal HUD.

## Tests and artefacts

`qa_v29.py` exercises both a 390×844 portrait viewport and a 1440×900 desktop viewport in Chromium with software WebGL. It creates ten intentional diagnostic images and a labelled contact sheet, validates geometry depth/width, traverses all 146 detail screens and exercises actual click and drag plus simulated two-pointer pinch. `QA_V29.json` records the machine results and the design gaps. `GAMEPLAN.md` is the persistent complete continuation record.

**Honest limitations:** these are procedurally built volumetric models, not source meshes from the three polished 2D concept illustrations; further hand modelling is necessary to match the art's richness. The 23 historically illustrated fruit appearances are stylised and not validated as exact manga depictions. The other 123 remain sealed where physical appearance is unverified. No physical Android sustained-frame-rate test or third-party preview CDN load verification has been performed.
