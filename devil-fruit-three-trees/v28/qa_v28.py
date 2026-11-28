from pathlib import Path
import json, hashlib, math
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright
P=Path(__file__).resolve().parent
HTML=(P/'index.html').read_text()
errs=[];reports=[]
angles=[(2.45,.28),(4.04,.30),(1.52,.30)]
shots=[
 ('01_Zoan_front.png','Zoan: front / silhouette, face and layered canopy'),
 ('02_Logia_front.png','Logia: front / storm-fire integration'),
 ('03_Paramecia_front.png','Paramecia: front / distinct flowers and loops'),
 ('04_Zoan_rear_high.png','Zoan: elevated rear / boughs and root depth'),
 ('05_Logia_far_side.png','Logia: opposite-side orbit / force anatomy'),
 ('06_Paramecia_side_high.png','Paramecia: high side / real flower volume'),
 ('07_family_low_oblique.png','Tori Tori: left-low angle / living branch support'),
 ('08_three_fruits_oblique.png','Substance Creation: right oblique / bunch spacing'),
 ('09_revealed_close_oblique.png','Awa Awa: shallow side / spirals and facts'),
 ('10_sealed_opposite.png','Numa Numa: opposing side / chain and facts')]

def snap(page,fn,viewport,angle,pitch,extra=400):
 page.evaluate('''args=>{const s=DF_DEBUG.state;s.orbit=args[0];s.orbitGoal=args[0];s.pitch=args[1];s.pitchGoal=args[1];s.target=[...s.goal];s.dist=s.distGoal;}''',[angle,pitch])
 page.wait_for_timeout(extra)
 if viewport[0]==390:page.screenshot(path=str(P/fn),animations='disabled')

with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 for width,height in [(390,844),(1440,900)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  page.on('pageerror',lambda e:errs.append(str(e)))
  page.set_content(HTML,wait_until='domcontentloaded')
  page.wait_for_function('window.DF_DEBUG?.worldVersion===28',timeout=42000)
  page.wait_for_timeout(190)
  stats=page.evaluate('''()=>{
   let d=DF_DEBUG, count=d.groups.map(x=>x.reduce((a,g)=>a+g.fruit.length,0)),fams=d.groups.map(x=>x.length),records=d.groups.flatMap(x=>x.flatMap(g=>g.fruit));
   let span=[];for(let ci=0;ci<3;ci++){let m=makeTree28(ci),mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
    for(let i=0;i<m.a.length;i+=9)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],m.a[i+k]);mx[k]=Math.max(mx[k],m.a[i+k]);}
    span.push({type:['Zoan','Logia','Paramecia'][ci],xyz:mx.map((v,i)=>+(v-mn[i]).toFixed(2)),triangles:m.a.length/27});}
   let bad=[];for(const d of records){let mesh=getFruitMesh(d);if(!(mesh?.a?.length||mesh?.n))bad.push('no mesh: '+d.name);
    for(const f of ['id','name','cls','group','power','subtype','users','affiliation','arcs','saga','origin'])if(d[f]===undefined||d[f]===null||d[f]==='')bad.push('missing '+f+' '+d.name);}
   return {span,count,fams,total:records.length,unique:new Set(records.map(x=>x.id)).size,bad,seal:records.filter(x=>x.appearance==='unverified').length,meshes:d.meshes.trees.length,webgl:!!d.gl,tip:document.querySelector('#tip').textContent}
  }''')
  assert stats['count']==[44,12,90] and stats['fams']==[12,3,4],stats
  assert stats['total']==stats['unique']==146 and stats['seal']==123 and stats['meshes']==3 and stats['webgl'] and not stats['tip'] and not stats['bad'],stats
  for i,m in enumerate(stats['span']):
   X,Y,Z=m['xyz'];assert X>30 and Y>60 and Z>30 and Z/X>.77,m
  for ci in range(3):
   page.evaluate('''ci=>{let s=DF_DEBUG.state;s.stage=0;s.cls=ci;gotoStage();s.target=[...s.goal];s.dist=s.distGoal;}''',ci)
   snap(page,shots[ci][0],(width,height),0,.04)
   snap(page,shots[ci+3][0],(width,height),*angles[ci])
   if width==1440:page.screenshot(path=str(P/f'desktop_{ci}.png'))
  # Tree -> tree-family: tap canvas, or direct open on desktop where scene spans three trees.
  page.evaluate('''()=>{let s=DF_DEBUG.state;s.stage=0;s.cls=0;gotoStage();s.target=[...s.goal];s.dist=s.distGoal;s.orbit=0;s.orbitGoal=0;}''')
  page.wait_for_timeout(130)
  if width==390:
   page.locator('#world').click(position={'x':width/2,'y':height*.48})
   assert page.evaluate('DF_DEBUG.state.stage')==1
  else:page.evaluate('DF_DEBUG.openClass(0)')
  page.evaluate("()=>{DF_DEBUG.openClass(0);DF_DEBUG.state.group=5;gotoStage()}")
  snap(page,shots[6][0],(width,height),-.48,-.14,450)
  assert page.locator('#labels .family-node').count()==1
  page.locator('#labels .family-node').click(force=True,timeout=6000)
  assert page.evaluate('DF_DEBUG.state.stage')==2
  # One populated family and representative visible illustrated/sealed fruit mix.
  page.evaluate('''()=>{DF_DEBUG.openClass(2);DF_DEBUG.openGroup(DF_DEBUG.groups[2].findIndex(x=>x.name==='Substance Creation'));}''')
  snap(page,shots[7][0],(width,height),-.52,.22,620)
  assert page.locator('#labels .fruit-node').count()>=3
  # Fruit info in opposed oblique camera angles.
  page.evaluate('''()=>{DF_DEBUG.openClass(2);DF_DEBUG.openGroup(DF_DEBUG.groups[2].findIndex(x=>x.name==='Substance Creation'));DF_DEBUG.openFruit(1)}''')
  snap(page,shots[8][0],(width,height),.57,.17,620)
  assert 'Awa Awa' in page.locator('#fruit-title').inner_text()
  page.evaluate("()=>{DF_DEBUG.openClass(1);DF_DEBUG.openGroup(1);DF_DEBUG.openFruit(2)}")
  assert 'Numa Numa' in page.locator('#fruit-title').inner_text()
  snap(page,shots[9][0],(width,height),-.62,.18,620)
  page.locator('#next').click();assert 'Mori Mori' in page.locator('#fruit-title').inner_text()
  page.locator('#back').click();assert page.evaluate('DF_DEBUG.state.stage')==2
  # Full explicit audit of the 146 catalogue details and eight preserved fields.
  details=page.evaluate('''()=>{let d=DF_DEBUG,fail=[],visited=0;
   for(let ci=0;ci<3;ci++){d.openClass(ci);for(let gi=0;gi<d.groups[ci].length;gi++){
    d.openGroup(gi);for(let i=0;i<d.groups[ci][gi].fruit.length;i++){
     d.openFruit(i);visited++;let f=d.groups[ci][gi].fruit[i];if(document.querySelector('#fruit-title').textContent!==f.name)fail.push('name '+f.id);
     if(document.querySelector('#fields').children.length!==8)fail.push('facts '+f.id);
    }}}
   return {visited,fail}
  }''')
  assert details['visited']==146 and not details['fail'],details
  # Swipe across full canvas, slow drag for orbit, two-pointer pinch for zoom.
  page.evaluate('''()=>{let s=DF_DEBUG.state;s.stage=0;s.cls=0;gotoStage();s.target=[...s.goal];s.dist=s.distGoal;}''')
  page.wait_for_timeout(170)
  if width==390:
   page.mouse.move(320,400);page.mouse.down();page.mouse.move(58,399,steps=5);page.mouse.up()
   assert page.evaluate('DF_DEBUG.state.cls')==1,'horizontal swipe failed'
  orbit=page.evaluate('DF_DEBUG.state.orbitGoal')
  page.mouse.move(width*.46,height*.43);page.mouse.down();page.mouse.move(width*.54,height*.56,steps=28);page.mouse.up()
  assert abs(page.evaluate('DF_DEBUG.state.orbitGoal')-orbit)>.01,'slow orbit failed'
  before=page.evaluate('DF_DEBUG.state.distGoal');page.mouse.wheel(0,115)
  after=page.evaluate('DF_DEBUG.state.distGoal');assert after!=before,'wheel zoom failed'
  pinch=page.evaluate('''()=>{let canvas=document.querySelector('#world'),s=DF_DEBUG.state;
   let send=(type,id,x,y)=>canvas.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,pointerType:'touch',clientX:x,clientY:y}));
   send('pointerdown',10,130,330);send('pointerdown',11,230,330);send('pointermove',10,90,330);send('pointermove',11,270,330);
   const result=s.distGoal;send('pointerup',10,90,330);send('pointerup',11,270,330);return result}''')
  assert abs(pinch-after)>.01,(pinch,after)
  assert not errs,errs
  reports.append({'viewport':[width,height],'catalogue':stats['count'],'family_groups':stats['fams'],'sealed':stats['seal'],'mesh_extents':stats['span'],'detail_screens_checked':details['visited'],'swipe':width==390,'slow_drag_orbit':True,'wheel_zoom':True,'two_touch_pinch':True,'runtime_errors':len(errs),'status':'PASS'})
  page.close()
 browser.close()
assert all((P/name).is_file() for name,label in shots)
# Contact sheet: deliberately diagnostic angles and captions, not randomly repeated front views.
W,H=390,844;sw,sh=295,638;margin=15;cap=35
out=Image.new('RGB',(sw*5+margin*6,(sh+cap)*2+margin*3),(239,245,249));d=ImageDraw.Draw(out)
for n,(name,label) in enumerate(shots):
 i=n%5;j=n//5;im=Image.open(P/name).convert('RGB').resize((sw,sh));x=margin+i*(sw+margin);y=margin+j*(sh+cap+margin)
 out.paste(im,(x,y));d.text((x+3,y+sh+6),f'{n+1:02d} {label[:37]}',fill=(32,53,77))
out.save(P/'V28_ten_diagnostic_angles.png')
(P/'QA_V28.json').write_text(json.dumps({'version':'V28','baseline':'V26 only','screenshots':[{'name':a,'purpose':b} for a,b in shots],'reports':reports,'source_hash_sha256':hashlib.sha256(HTML.encode()).hexdigest(),'known_limitations':['Original 146 project records retained, not exhaustive current manga canon','Only 23 historically illustrated models; all stylised, not canon-exact','RawGitHack and real Android performance not independently checked']},indent=2))
print(json.dumps(reports,indent=2));print('All screenshots',len(shots),'and checks passed')
