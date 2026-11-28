from pathlib import Path
import os
import json,hashlib,math
from PIL import Image,ImageDraw
from playwright.sync_api import sync_playwright
P=Path(__file__).resolve().parent
HTML=(P/'index.html').read_text()
CASES=[
 ('01_Zoan_front.png','Zoan front: face-free oak, connected gold lunar arcs, non-flat crown, fruit'),
 ('02_Logia_front.png','Logia front: integrated fire, thunderhead, glacier and root forks'),
 ('03_Paramecia_front.png','Paramecia front: interlocking ivory branches, blossoms and grown portal'),
 ('04_Zoan_high_rear.png','Zoan elevated 136°: structural branch support and rear foliage volume'),
 ('05_Logia_back_opposite.png','Logia opposite 234°: storm rear, glowing basalt and ice branch attachment'),
 ('06_Paramecia_high_side.png','Paramecia high 84°: flower thickness, negative space, gold ring alignment'),
 ('07_Tori_family_low.png','Zoan Tori family below: focus ring must clear fruit and branch'),
 ('08_Ryu_family_rear.png','Zoan Ryu family from rear: marker/fruit vs foliage occlusion'),
 ('09_Energy_family_high.png','Logia Energy high side: 3D focus marker and fire backdrop'),
 ('10_Environment_family_side.png','Paramecia Environment from side: focus and petal overlap'),
 ('11_Tori_fruits_angled.png','Tori fruits oblique: distinct fruit meshes and spaced finger targets'),
 ('12_Substance_fruits_angled.png','Substance fruit group side: grouping and clear labels'),
 ('13_Awa_illustrated_oblique.png','Awa Awa close: genuine dimensional geometry and factual typography'),
 ('14_Numa_sealed_opposite.png','Numa Numa opposite: real lock depth and eight fields readable')]
errors=[];logs=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 for w,h in ([(390,844)] if os.getenv("QA_ONLY")=="mobile" else [(1440,900)] if os.getenv("QA_ONLY")=="desktop" else [(390,844),(1440,900)]):
  page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(HTML,wait_until='domcontentloaded')
  page.wait_for_function('window.DF_DEBUG?.worldVersion===31',timeout=50000)
  print('START QA',w,h,flush=True)
  page.wait_for_timeout(190)
  stats=page.evaluate('''()=>{
   const d=DF_DEBUG,records=d.groups.flatMap(gs=>gs.flatMap(g=>g.fruit)),counts=d.groups.map(gs=>gs.reduce((a,g)=>a+g.fruit.length,0));
   let fail=[],measures=[];
   for(const f of records){const model=getFruitMesh(f);if(!(model?.a?.length||model?.n))fail.push('missing mesh '+f.id);
    for(const k of ['id','name','cls','group','power','subtype','users','affiliation','arcs','saga','origin'])if(f[k]===undefined||f[k]===null||f[k]==='')fail.push('missing '+k+' '+f.id);
   }
   for(let ci=0;ci<3;ci++){
    const m=makeTree31(ci),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
    for(let i=0;i<m.a.length;i+=9)for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],m.a[i+j]);hi[j]=Math.max(hi[j],m.a[i+j]);}
    measures.push({class:['Zoan','Logia','Paramecia'][ci],xyz:hi.map((x,j)=>+(x-lo[j]).toFixed(2)),triangles:m.a.length/27});
   }
   return {loaded:!!d.gl,worldVersion:d.worldVersion,treeMeshes:d.meshes.trees.length,records:records.length,unique:new Set(records.map(f=>f.id)).size,
    counts,families:d.groups.map(x=>x.length),sealed:records.filter(x=>x.appearance==='unverified').length,
    illustrated:records.filter(x=>x.appearance!=='unverified').length,fail,measures,
    textTip:document.querySelector('#tip').textContent,displayedControls:[...document.querySelectorAll('#back,#prev,#next')].map(el=>({id:el.id,width:el.getBoundingClientRect().width}))};}''')
  assert stats['loaded'] and stats['worldVersion']==31 and stats['treeMeshes']==3,stats
  assert stats['counts']==[44,12,90] and stats['families']==[12,3,4],stats
  assert stats['records']==stats['unique']==146 and stats['sealed']==123 and stats['illustrated']==23,stats
  assert not stats['fail'] and not stats['textTip'],stats
  for model in stats['measures']:
   X,Y,Z=model['xyz'];assert X>65 and Y>70 and Z/X>=.85,model
  def settle(angle,pitch,ms=300):
   page.evaluate('''([a,b])=>{const s=DF_DEBUG.state;s.orbit=a;s.orbitGoal=a;s.pitch=b;s.pitchGoal=b;s.target=[...s.goal];s.dist=s.distGoal;}''',[angle,pitch])
   page.wait_for_timeout(ms)
  def capture(name):
   if w==390:page.screenshot(path=str(P/name),animations='disabled')
  # Six purposeful tree angles
  for ci in range(3):
   page.evaluate('''ci=>{let s=DF_DEBUG.state;s.stage=0;s.cls=ci;gotoStage()}''',ci)
   settle(0,.065,320)
   capture(CASES[ci][0])
   settle([2.37,4.10,1.47][ci],[.28,.34,.30][ci],460)
   capture(CASES[ci+3][0])
   if w==1440:page.screenshot(path=str(P/f'desktop_{ci}.png'))
  print('TREE SCREENS DONE',w,flush=True)
  # At least one actual canvas click from overview into tree.
  page.evaluate('''()=>{let s=DF_DEBUG.state;s.stage=0;s.cls=0;gotoStage()}''');settle(0,.06,180)
  if w==390:
   page.locator('#world').click(position={'x':w*.5,'y':h*.45})
   assert page.evaluate('DF_DEBUG.state.stage')==1,'overview real tap failed'
  else:page.evaluate('DF_DEBUG.openClass(0)')
  # Four different *tree family* states at different camera angles.
  famStates=[(0,5,-.66,-.17),(0,3,2.48,.21),(1,0,4.05,.28),(2,3,1.21,.30)]
  for index,(ci,gi,orbit,pitch) in enumerate(famStates):
   page.evaluate('''([ci,gi])=>{DF_DEBUG.openClass(ci);DF_DEBUG.state.group=gi;gotoStage()}''',[ci,gi])
   settle(orbit,pitch,450)
   assert page.locator('#labels .family-node').count()==1,('focus missing',ci,gi)
   capture(CASES[index+6][0])
  print('FAMILY SCREEN DONE',w,flush=True)
  # Focus marker real click must open family; full record remains connected.
  page.locator('#labels .family-node').click(force=True,timeout=8000)
  assert page.evaluate('DF_DEBUG.state.stage')==2,'focus marker click failed'
  # Two distinct fruit-family screens with 3 mobile or 5 desktop fruit options.
  for index,(ci,gi,orbit,pitch) in enumerate([(0,5,.46,.23),(2,2,-.59,.29)]):
   page.evaluate('''([ci,gi])=>{DF_DEBUG.openClass(ci);DF_DEBUG.openGroup(gi)}''',[ci,gi])
   settle(orbit,pitch,430)
   assert page.locator('#labels .fruit-node').count()==min(page.evaluate('DF_DEBUG.groups[DF_DEBUG.state.cls][DF_DEBUG.state.group].fruit.length'), 3 if w<640 else 5),('fruit labels',ci,gi,page.locator('#labels .fruit-node').count())
   capture(CASES[10+index][0])
  print('FRUIT PAGES DONE',w,flush=True)
  page.locator('#labels .fruit-node').first.click(force=True,timeout=8000)
  assert page.evaluate('DF_DEBUG.state.stage')==3,'fruit label click failed'
  # Illustrated and sealed records from different classes and angled closeups.
  for index,(ci,group,name,angle,pitch) in enumerate([
    (2,2,'Awa Awa no Mi',.58,.16),(1,1,'Numa Numa no Mi',-.69,.18)]):
   page.evaluate('''([ci,gi,name])=>{DF_DEBUG.openClass(ci);DF_DEBUG.openGroup(gi);const i=DF_DEBUG.groups[ci][gi].fruit.findIndex(x=>x.name===name);DF_DEBUG.openFruit(i)}''',[ci,group,name])
   settle(angle,pitch,460)
   assert page.locator('#fruit-title').inner_text()==name
   assert page.locator('#fields .fact').count()==8
   if index==1:assert page.locator('#fruit-state').inner_text()=='APPEARANCE UNKNOWN'
   # Clear on-screen data width and touch navigation controls; no horizontal scrolling.
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2')
   capture(CASES[12+index][0])
  print('DETAILS SCREEN DONE',w,flush=True)
  page.locator('#next').click(force=True);assert page.evaluate('DF_DEBUG.state.stage')==3
  page.locator('#prev').click(force=True);assert page.evaluate('DF_DEBUG.state.stage')==3
  page.locator('#back').click(force=True);assert page.evaluate('DF_DEBUG.state.stage')==2
  # Traversal of every entry and eight metadata fields, checking visible name.
  traversal=page.evaluate('''()=>{let d=DF_DEBUG,issues=[],checked=0;
   for(let ci=0;ci<3;ci++)for(let gi=0;gi<d.groups[ci].length;gi++){
    d.openClass(ci);d.openGroup(gi);let items=d.groups[ci][gi].fruit;
    for(let fi=0;fi<items.length;fi++){d.openFruit(fi);checked++;
     if(document.querySelector('#fruit-title').textContent!==items[fi].name)issues.push('name '+items[fi].id);
     if(document.querySelector('#fields').children.length!==8)issues.push('fields '+items[fi].id);
    }
   }return {checked,issues}}''')
  print('RECORD TRAVERSAL DONE',w,flush=True)
  assert traversal['checked']==146 and not traversal['issues'],traversal
  # Swipe cycles the class; a deliberately slow, diagonal drag orbits the tree.
  page.evaluate('''()=>{let s=DF_DEBUG.state;s.cls=0;s.stage=0;gotoStage()}''');settle(0,.06,200)
  if w==390:
   page.mouse.move(323,396);page.mouse.down();page.mouse.move(56,393,steps=6);page.mouse.up()
   assert page.evaluate('DF_DEBUG.state.cls')==1,'fast swipe failed'
  before=page.evaluate('DF_DEBUG.state.orbitGoal')
  page.mouse.move(w*.44,h*.42);page.mouse.down();page.mouse.move(w*.52,h*.58,steps=29);page.mouse.up()
  assert abs(page.evaluate('DF_DEBUG.state.orbitGoal')-before)>.01,'slow orbit failed'
  before=page.evaluate('DF_DEBUG.state.distGoal');page.mouse.wheel(0,160)
  after=page.evaluate('DF_DEBUG.state.distGoal');assert after!=before,'wheel zoom failed'
  pinch=page.evaluate('''()=>{let c=document.querySelector('#world'),s=DF_DEBUG.state;
   let f=(t,id,x,y)=>c.dispatchEvent(new PointerEvent(t,{bubbles:true,pointerId:id,pointerType:'touch',clientX:x,clientY:y}));
   f('pointerdown',10,136,346);f('pointerdown',11,231,346);f('pointermove',10,94,346);f('pointermove',11,274,346);
   let value=s.distGoal;f('pointerup',10,94,346);f('pointerup',11,274,346);return {value,stage:s.stage}}''')
  assert abs(pinch['value']-after)>.01 and pinch['stage']==0,'pinch failed or tap wrongly advanced'
  page.keyboard.press('ArrowRight');assert page.evaluate('DF_DEBUG.state.cls')==(2 if w==390 else 1)
  assert not errors,errors
  print('GESTURES DONE',w,flush=True)
  logs.append({'viewport':[w,h],'status':'PASS','catalogue_counts':stats['counts'],'family_counts':stats['families'],
   'records_inspected':traversal['checked'],'sealed':stats['sealed'],'illustrated':stats['illustrated'],'geometry':stats['measures'],
   'tree_tap':w==390,'swipe':w==390,'slow_orbit':True,'wheel_zoom':True,'two_pointer_pinch':True,'keyboard':True,
   'back_next_prev':True,'family_click':True,'fruit_click':True,'runtime_errors':len(errors)})
  page.close()
 browser.close()
assert not errors,errors
assert len(CASES)==14 and all((P/name).is_file() for name,caption in CASES)
# 7x2 contact matrix: deliberately fault-finding, not ten repeated showcase fronts.
TW,TH=252,545;cap=50;gap=10
image=Image.new('RGB',(7*(TW+gap)+gap,2*(TH+cap+gap)+gap),'#f5f8fc');draw=ImageDraw.Draw(image)
for i,(name,caption) in enumerate(CASES):
 col=i%7;row=i//7;x=gap+col*(TW+gap);y=gap+row*(TH+cap+gap)
 im=Image.open(P/name).convert('RGB').resize((TW,TH),Image.Resampling.LANCZOS)
 image.paste(im,(x,y));draw.text((x+4,y+TH+5),f'{i+1:02d}. {caption[:29]}',fill='#183550')
 draw.text((x+4,y+TH+21),caption[29:59],fill='#55718a')
image.save(P/'V31_fourteen_diagnostic_views.png',optimize=True)
report={
 'version':'V31','parent':'V30 immutable GitHub release 262576e03ef7fbd86bf6f2743cdf739d6c037de2',
 'screenshots':[{'file':name,'purpose':caption} for name,caption in CASES],
 'tests':logs,'errors':errors,'html_sha256':hashlib.sha256(HTML.encode()).hexdigest(),
 'scope':{'unique_tree_classes':3,'historical_catalogue':146,'families':19,'historically_illustrated':23,'sealed_unverified':123},
 'art_direction':'No Zoan face. Two asymmetric gold lunar-growth motifs. Three uniquely redesigned spatial spirit trees. Data-only touch UI.',
 'limitations':['Concept paintings are 2D references and cannot be exactly reconstructed as 3D from one camera angle without hand-authored production assets.',
  'No physical Android FPS, memory, thermal or battery testing.',
  'The inherited 146-entry database is not independently audited as a complete current canonical listing.',
  '23 historically illustrated forms remain stylised, 123 remain sealed as unverified.',
  'CDN preview availability is separate from GitHub file verification; do not infer it from tests.']}
(P/'QA_V31.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print('PASS V31',[(x['viewport'],x['status'],x['records_inspected']) for x in logs]);print('Geometries',logs[0]['geometry'])
