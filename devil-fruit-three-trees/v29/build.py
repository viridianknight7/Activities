from pathlib import Path
import json, hashlib
p=Path(__file__).resolve().parent
assert len(json.loads((p/'data.json').read_text()))==146
s=(p/'template.html').read_text()
s=s.replace('/*CSS*/',(p/'styles.css').read_text()).replace('/*DATA*/',(p/'data.json').read_text().strip())
s=s.replace('/*GEOMETRY*/','\n'.join((p/name).read_text() for name in (
 'geometry_engine_from_v23.js','geometry25.js','geometry26.js','geometry27.js','geometry28.js','geometry29.js')))
s=s.replace('/*APP*/',(p/'app.js').read_text())
(p/'index.html').write_text(s)
print('Built V29',len(s),'characters',hashlib.sha256(s.encode()).hexdigest())
