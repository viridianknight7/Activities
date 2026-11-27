from pathlib import Path
import json
p=Path(__file__).resolve().parent
assert len(json.loads((p/'data.json').read_text()))==146
s=(p/'template.html').read_text()
geo=(p/'geometry_engine_from_v23.js').read_text()+'\n'+(p/'geometry25.js').read_text()+'\n'
s=s.replace('/*CSS*/',(p/'styles.css').read_text()).replace('/*DATA*/',(p/'data.json').read_text()).replace('/*GEOMETRY*/',geo).replace('/*APP*/',(p/'app.js').read_text())
(p/'index.html').write_text(s)
print('V25 self-contained HTML rebuilt:',len(s))
