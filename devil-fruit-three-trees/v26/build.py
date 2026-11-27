from pathlib import Path
import json, hashlib
p=Path(__file__).resolve().parent
assert len(json.loads((p/'data.json').read_text()))==146
s=(p/'template.html').read_text().replace('/*CSS*/',(p/'styles.css').read_text()).replace('/*DATA*/',(p/'data.json').read_text())
s=s.replace('/*GEOMETRY*/','\n'.join((p/name).read_text() for name in ('geometry_engine_from_v23.js','geometry25.js','geometry26.js')))
s=s.replace('/*APP*/',(p/'app.js').read_text())
(p/'index.html').write_text(s)
print('Rebuilt V26',len(s),'characters',hashlib.sha256(s.encode()).hexdigest())
