from pathlib import Path
import json,hashlib,math
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright
P=Path(__file__).resolve().parent
HTML=(P/'index.html').read_text()
SCREENS=[
 ('01_Zoan_front.png','Zoan front: golden crescent wing connection, canopy, hanging fruits'),
 ('02_Logia_front.png','Logia front: curved fire canopy, storm vortex, rooted glacier'),
 ('03_Paramecia_front.png','Paramecia front: ivory-pink braid, sakura depth, base portal'),
 ('04_Zoan_elevated_rear.png','Zoan 135-degree elevated rear: radial support, roots, foliage depth'),
 ('05_Logia_opposite_rear.png','Logia 235-degree elevated rear: storm-vortex depth, ice, flame backside'),
 ('06_Paramecia_high_side.png','Paramecia 80-degree elevated side: canopy back, flower and orbit thickness'),
 ('07_Tori_family_low_oblique.png','Tori Tori family low orbit: physical bough attachment and marker'),
 ('08_Substance_fruits_side.png','Substance Creation family side: fruit size, spacing and tap targets'),
 ('09_Awa_revealed_oblique.png','Awa Awa fruit angled: illustrated 3D surface and data legibility'),
 ('10_Numa_sealed_opposite.png','Numa Numa opposite angle: sealed chain, lock and data legibility')]
errors=[];reports=[]

def settle(page,a,p,ms=260):
 page.evaluate('''([a,p])=>{const s=DF_DEBUG.state;s.orbit=a;s.orbitGoal=a;s.pitch=p;s.pitchGoal=p;s.target=[...s.goal];s.dist=s.distGoal;}''',[a,p])
 page.wait_for_timeout(ms)

with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 for w,h in [(390,844),(1440,900)]:
  page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(HTML,wait_until='domcontentloaded')
  page.wait_for_function('window.DF_DEBUG?.worldVersion===29',timeout=35000)
  page.wait_for_timeout(180)
  counts=page.evaluate('''()=>{
    const d=DF_DEBUG, groups=d.groups,records=groups.flatMap(gs=>gs.flatMap(g=>g.fruit));let bad=[];
    for(let f of records){let model=getFruitMesh(f);if(!model?.a?.length&&!model?.n)bad.push('no mesh '+f.name);
      for(let field of ['id','name','cls','group','power','subtype','users','affiliation','arcs','saga','origin'])
       if(f[field]===undefined||f[field]===null||f[field]==='')bad.push('missing '+field+' '+f.id);
    }
    let span=[];for(let i=0;i<3;i++){let m=makeTree29(i),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
      for(let k=0;k<m.a.length;k+=9)for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],m.a[k+j]);hi[j]=Math.max(hi[j],m.a[k+j]);}
      span.push({class:['Zoan','Logia','Paramecia'][i],xyz:hi.map((x,j)=>+(x-lo[j]).toFixed(2)),triangles:m.a.length/27});
    }
    return {webgl:!!d.gl,stage:d.state.stage,records:records.length,unique:new Set(records.map(x=>x.id)).size,
      counts:groups.map(gs=>gs.reduce((n,g)=>n+g.fruit.length,0)),familyCounts:groups.map(gs=>gs.length),
      sealed:records.filter(x=>x.appearance==='unverified').length,illustrated:records.filter(x=>x.appearance!=='unverified').length,
      bad,span,treeMeshes:d.meshes.trees.length,hiddenInstructions:document.querySelector('#tip').textContent.length===0};
   }''')
  assert counts['webgl'] and counts['records']==146 and counts['unique']==146 and counts['counts']==[44,12,90] and counts['familyCounts']==[12,3,4] and counts['sealed']==123 and counts['illustrated']==23 and not counts['bad'],counts
  assert counts['hiddenInstructions'] and counts['treeMeshes']==3
  for m in counts['span']:
   X,Y,Z=m['xyz'];assert X>40 and Y>70 and Z/X>=.75,m
  for ci in range(3):
   page.evaluate('''ci=>{const s=DF_DEBUG.state;s.stage=0;s.cls=ci;gotoStage()}''',ci)
   settle(page,0,.06,310)
   if w==390:page.screenshot(path=str(P/SCREENS[ci][0]))
   else:page.screenshot(path=str(P/f'desktop_front_{ci}.png'))
   a=[2.36,4.10,1.40][ci];pitch=[.24,.29,.28][ci]
   settle(page,a,pitch,380)
   if w==390:page.screenshot(path=str(P/SCREENS[ci+3][0]))
   else:page.screenshot(path=str(P/f'desktop_oblique_{ci}.png'))
  # One actual canvas touch/click from overview into tree.
  page.evaluate('''()=>{const s=DF_DEBUG.state;s.stage=0;s.cls=0;gotoStage();}''')
  settle(page,0,.06,220)
  if w==390:
   page.locator('#world').click(position={'x':w*.5,'y':h*.43})
   assert page.evaluate('DF_DEBUG.state.stage')==1,'overview canvas tap broken'
  else: page.evaluate('DF_DEBUG.openClass(0)')
  # Tree family attachment: Tori Tori, choose currently focused entry.
  page.evaluate("()=>{DF_DEBUG.openClass(0);DF_DEBUG.state.group=5;gotoStage()}")
  settle(page,-.65,-.11,360)
  assert page.locator('#labels .family-node').count()==1
  if w==390:page.screenshot(path=str(P/SCREENS[6][0]))
  page.locator('#labels .family-node').click(force=True,timeout=5000)
  assert page.evaluate('DF_DEBUG.state.stage')==2,'family selection broken'
  # Substances: first page of fruits, angled from side for physical separation.
  page.evaluate("()=>{DF_DEBUG.openClass(2);DF_DEBUG.openGroup(2)}")
  settle(page,.51,.15,350)
  assert page.locator('#labels .fruit-node').count()==(3 if w<640 else 5)
  if w==390:page.screenshot(path=str(P/SCREENS[7][0]))
  # Tap visible fruit label to guarantee click target works.
  page.locator('#labels .fruit-node').first.click(force=True,timeout=5000)
  assert page.evaluate('DF_DEBUG.state.stage')==3,'fruit touch target broken'
  # Show Awa Awa illustrated appearance.
  page.evaluate("()=>{DF_DEBUG.openClass(2);DF_DEBUG.openGroup(2);const f=DF_DEBUG.groups[2][2].fruit.findIndex(x=>x.name==='Awa Awa no Mi');DF_DEBUG.openFruit(f)}")
  settle(page,.50,.14,400)
  assert 'Awa Awa' in page.locator('#fruit-title').inner_text()
  assert page.locator('#fields .fact').count()==8
  if w==390:page.screenshot(path=str(P/SCREENS[8][0]))
  # Show sealed Numa Numa, opposite angle and check flag.
  page.evaluate("()=>{DF_DEBUG.openClass(1);DF_DEBUG.openGroup(1);const f=DF_DEBUG.groups[1][1].fruit.findIndex(x=>x.name==='Numa Numa no Mi');DF_DEBUG.openFruit(f)}")
  settle(page,-.62,.15,420)
  assert 'Numa Numa' in page.locator('#fruit-title').inner_text()
  assert page.locator('#fruit-state').inner_text()=='APPEARANCE UNKNOWN'
  if w==390:page.screenshot(path=str(P/SCREENS[9][0]))
  page.locator('#next').click(force=True)
  assert page.evaluate('DF_DEBUG.state.stage')==3
  page.locator('#back').click(force=True)
  assert page.evaluate('DF_DEBUG.state.stage')==2
  # Traverse every grouped record to ensure eight fields match its name.
  allDetails=page.evaluate('''()=>{let bad=[],seen=0,d=DF_DEBUG;
    for(let ci=0;ci<3;ci++){d.openClass(ci);for(let j=0;j<d.groups[ci].length;j++){d.openGroup(j);
      for(let k=0;k<d.groups[ci][j].fruit.length;k++){let f=d.groups[ci][j].fruit[k];d.openFruit(k);seen++;
       if(document.querySelector('#fruit-title').textContent!==f.name)bad.push('wrong name '+f.id);
       if(document.querySelector('#fields').children.length!==8)bad.push('wrong fields '+f.id);
      }
    }}return {seen,bad};}''')
  assert allDetails['seen']==146 and not allDetails['bad'],allDetails
  # Fast swipe should switch tree, deliberately slow drag should orbit it.
  page.evaluate('''()=>{const s=DF_DEBUG.state;s.stage=0;s.cls=0;gotoStage();}''')
  settle(page,0,.06,160)
  if w==390:
   page.mouse.move(325,390);page.mouse.down();page.mouse.move(60,393,steps=5);page.mouse.up()
   assert page.evaluate('DF_DEBUG.state.cls')==1,'fast swipe not changing class'
  before=page.evaluate('DF_DEBUG.state.orbitGoal')
  page.mouse.move(w*.46,h*.40);page.mouse.down();page.mouse.move(w*.53,h*.55,steps=22);page.mouse.up()
  assert abs(page.evaluate('DF_DEBUG.state.orbitGoal')-before)>.01,'slow orbit failed'
  before=page.evaluate('DF_DEBUG.state.distGoal');page.mouse.wheel(0,180)
  after=page.evaluate('DF_DEBUG.state.distGoal');assert after!=before,'wheel zoom failed'
  pinch=page.evaluate('''()=>{const c=document.querySelector('#world'),s=DF_DEBUG.state;
    const send=(t,id,x,y)=>c.dispatchEvent(new PointerEvent(t,{bubbles:true,pointerId:id,pointerType:'touch',clientX:x,clientY:y}));
    send('pointerdown',10,125,350);send('pointerdown',11,235,350);
    send('pointermove',10,94,350);send('pointermove',11,272,350);
    const dist=s.distGoal;send('pointerup',10,94,350);send('pointerup',11,272,350);
    return {dist,stage:s.stage};}''')
  assert abs(pinch['dist']-after)>.01 and pinch['stage']==0,'pinch triggered tap or failed zoom'
  assert not errors,errors
  reports.append({'viewport':[w,h],'status':'PASS','model_extents':counts['span'],'counts':counts['counts'],'families':counts['familyCounts'],
    'catalogue':146,'illustrated':23,'sealed':123,'inspected':allDetails['seen'],'real_canvas_tap':w==390,
    'finger_swipe':w==390,'drag_orbit':True,'wheel_zoom':True,'synthetic_two_touch_pinch':True,'js_errors':len(errors)})
  page.close()
 browser.close()
assert not errors,errors
assert all((P/f).is_file() for f,_ in SCREENS)
# Visual QA contact sheet (captions are deliberately about possible faults).
TW,TH=280,606;gap=12;caption=54
canvas=Image.new('RGB',(5*(TW+gap)+gap,2*(TH+caption+gap)+gap),(246,249,253));d=ImageDraw.Draw(canvas)
for n,(filename,description) in enumerate(SCREENS):
 x=gap+(n%5)*(TW+gap);y=gap+(n//5)*(TH+caption+gap)
 im=Image.open(P/filename).convert('RGB').resize((TW,TH),Image.Resampling.LANCZOS)
 canvas.paste(im,(x,y));d.text((x+6,y+TH+5),f'{n+1:02}  '+description[:34],fill=(30,53,77))
canvas.save(P/'V29_ten_diagnostic_angles.png',optimize=True)
report={'version':'V29','source':'Recovered V28 standalone, exact prior app engine and 146-record dataset','baseline_vision_match_subjective_pct':48,
        'baseline_completeness_subjective_pct':85,'ten_screenshots':[{'filename':f,'diagnostic_goal':d} for f,d in SCREENS],
        'reports':reports,'js_errors':errors,'html_sha256':hashlib.sha256(HTML.encode()).hexdigest(),
        'limitations':['The three supplied reference pictures are rendered concept art, not original 3D source models',
         'The 146 project records are historical and not verified as complete current manga canon',
         'Only 23 historically illustrated fruit forms are stylised interpretations; 123 are sealed as unverified',
         'Local Chromium software WebGL is not sustained real Android GPU performance',
         'Third-party hosting and external preview are not tested by this local browser run']}
(P/'QA_V29.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print('QA PASS',[(r['viewport'],r['status']) for r in reports],reports[0]['model_extents'],'screens',len(SCREENS))
