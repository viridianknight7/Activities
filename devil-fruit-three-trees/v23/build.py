from pathlib import Path
p=Path(__file__).parent
s=(p/'template.html').read_text()
g='\n'.join((p/name).read_text() for name in ('geometry.js','geometry22.js','geometry23.js'))
s=s.replace('/*INLINE_CSS*/',(p/'style.css').read_text()).replace('/*INLINE_DATA*/',(p/'data.json').read_text()).replace('/*INLINE_GEOMETRY*/',g).replace('/*INLINE_APP*/',(p/'app.js').read_text())
(p/'index.html').write_text(s)
print('Built V23')
