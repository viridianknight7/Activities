# Devil Fruit Trees — V38 bespoke geometry

V38 replaces all three V33 procedural exploration meshes with new class-specific 3D polygon models. **The homepage now displays the actual 3D mesh, not a still illustration.** The new shapes have hand-plotted large planes and a real front, side, back and top. Zoan contains a green ancient grove and an orange dragon; Logia uses distinct storm, flame, ice and wind planes; Paramecia uses pink lotus crowns, ivory twisted wood, a gold spatial orbit and a portal.

Open `index.html` in a modern browser (offline-compatible). Swipe horizontally on the home screen to change class, tap the tree or the small arrow to enter explore mode, drag to orbit, pinch or wheel to zoom, and tap a hanging fruit to read its data. The 146 inherited records remain intact.

`models/*.glb` contains each actual 3D model with vertex colours; these were exported directly from the same geometry used by the website. Use these in Blender or other tools for further sculpting. `art38.js` is the editable authored geometry source.

`four_angle_3d_audit.png` contains actual FRONT / SIDE / REAR / ELEVATED browser captures of all three. `reference_vs_actual.png` directly compares the three original visual targets with the still-unfinished real meshes. The QA report and `GAMEPLAN.md` state validation results and aesthetic limitations.

The models are technically valid but are **not** yet visually equivalent to the illustrated references. Browser QA used software 3D projection because native WebGL was unavailable in the headless test environment; real Android GPU performance remains unverified.