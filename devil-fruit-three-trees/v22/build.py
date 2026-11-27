from pathlib import Path
r=Path(__file__).parent
s=(r/'template.html').read_text().replace('V21','V22')
s=s.replace('/*INLINE_CSS*/',(r/'style.css').read_text()).replace('/*INLINE_DATA*/',(r/'data.json').read_text())
s=s.replace('/*INLINE_GEOMETRY*/',(r/'geometry.js').read_text()+'\n'+(r/'geometry22.js').read_text()).replace('/*INLINE_APP*/',(r/'app.js').read_text())
(r/'index.html').write_text(s)
print('V22',len(s),'bytes')
