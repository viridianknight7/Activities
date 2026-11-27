from pathlib import Path
root=Path(__file__).parent
s=(root/'template.html').read_text()
s=s.replace('/*INLINE_CSS*/',(root/'style.css').read_text()).replace('/*INLINE_DATA*/',(root/'data.json').read_text()).replace('/*INLINE_GEOMETRY*/',(root/'geometry.js').read_text()).replace('/*INLINE_APP*/',(root/'app.js').read_text())
(root/'index.html').write_text(s)
Path('/mnt/data/legendary_devil_fruit_v20.html').write_text(s)
print('built',len(s), 'bytes')
