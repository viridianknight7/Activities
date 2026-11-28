from pathlib import Path
import json,hashlib
p=Path(__file__).resolve().parent
assert len(json.loads((p/'data.json').read_text()))==146
s=(p/'template.html').read_text().replace('/*CSS*/',(p/'styles.css').read_text())
s=s.replace('/*DATA*/',(p/'data.json').read_text().strip())
s=s.replace('/*GEOMETRY*/','\n'.join((p/n).read_text() for n in ['geometry_engine_from_v23.js','geometry25.js','geometry26.js','geometry27.js','geometry28.js','geometry29.js','geometry30.js','geometry31.js','geometry32.js']))
s=s.replace('/*APP*/',(p/'app.js').read_text())
(p/'index.html').write_text(s)
print(len(s),'chars',hashlib.sha256(s.encode()).hexdigest())
