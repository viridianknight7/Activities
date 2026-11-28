from pathlib import Path
import json
from playwright.sync_api import sync_playwright
P=Path(__file__).resolve().parent
s=(P/'index.html').read_text();logs=[]
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
 for w,h in ((390,844),(1440,900)):
  errors=[];page=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(s,wait_until='domcontentloaded')
  page.wait_for_function('window.DF_DEBUG?.worldVersion===32',timeout=55000)
  r=page.evaluate('''()=>{const d=DF_DEBUG;let issues=[],count=0,ext=[];
    for(let ci=0;ci<3;ci++){let m=makeTree32(ci),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
     for(let i=0;i<m.a.length;i+=9)for(let j=0;j<3;j++){lo[j]=Math.min(lo[j],m.a[i+j]);hi[j]=Math.max(hi[j],m.a[i+j]);}
     ext.push(hi.map((x,j)=>Math.round((x-lo[j])*100)/100));
     d.openClass(ci);for(let gi=0;gi<d.groups[ci].length;gi++){d.openGroup(gi);for(let fi=0;fi<d.groups[ci][gi].fruit.length;fi++){
      d.openFruit(fi);count++;let f=d.groups[ci][gi].fruit[fi];
      if(document.querySelector('#fruit-title').textContent!==f.name||document.querySelector('#fields').children.length!==8)issues.push(f.id);
     }}}
    return {count,issues,ext,counts:d.groups.map(x=>x.reduce((sum,g)=>sum+g.fruit.length,0)),families:d.groups.map(x=>x.length),models:d.meshes.trees.length};
   }''')
  assert r['count']==146 and not r['issues'] and r['counts']==[44,12,90] and r['families']==[12,3,4] and r['models']==3,r
  for x,y,z in r['ext']:assert x>80 and y>100 and z/x>.85,(x,y,z)
  page.evaluate('''()=>{let d=DF_DEBUG;d.openClass(0);d.openGroup(5);d.openFruit(0);d.goBack();d.goBack();d.goBack();}''')
  assert page.evaluate('DF_DEBUG.state.stage')==0
  assert not errors,errors
  logs.append({'viewport':[w,h],'passed':True,'records_checked':r['count'],'tree_extents':r['ext'],'runtime_errors':len(errors)})
  page.close()
 b.close()
print(json.dumps(logs,indent=2))
(P/'QA_V32_final_fast.json').write_text(json.dumps(logs,indent=2)+'\n')
