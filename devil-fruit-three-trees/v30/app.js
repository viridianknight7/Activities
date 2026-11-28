/* The Legendary Devil Fruit Trees, original WebGL world. No external runtime. */
const CLASS=['Zoan','Logia','Paramecia'];
const PINS=[[-78,0,0],[0,0,0],[78,0,0]];
const groups=CLASS.map(cls=>{const map=new Map();for(const d of DATA.filter(d=>d.cls===cls)){if(!map.has(d.group))map.set(d.group,[]);map.get(d.group).push(d)}return [...map].map(([name,fruit],idx)=>({name,fruit,idx,cls}))});
const GUESS={Zoan:'BEAST GROVE',Logia:'ELEMENTAL CONFLUENCE',Paramecia:'POSSIBILITY NEXUS'};
const TREE_NAMES=['A1 · BEAST GROVE','B1 · ELEMENTAL CONFLUENCE','C2 · POSSIBILITY NEXUS'];

const TYPES={Zoan:'INSTINCT · EVOLUTION · WILL',Logia:'NATURE · FORCE · EMBODIMENT',Paramecia:'ALTERATION · POSSIBILITY · FREEDOM'};
const fruitsById=new Map(DATA.map(d=>[d.id,d]));
const glCanvas=document.getElementById('world'),gl=glCanvas.getContext('webgl',{antialias:true,alpha:true,powerPreference:'high-performance',depth:true,preserveDrawingBuffer:false});
const hud=document.getElementById('hud'),floatLabels=document.getElementById('labels'),detail=document.getElementById('detail');
const titleNode=document.getElementById('heading'),subNode=document.getElementById('subheading'), crumb=document.getElementById('crumb');
const backBtn=document.getElementById('back'),nextBtn=document.getElementById('next'),prevBtn=document.getElementById('prev'),tip=document.getElementById('tip'),pageNum=document.getElementById('page-num');
const warn=document.getElementById('fallback');
let scaleFactor=1,WIDTH=390,HEIGHT=800,last=0,frame=0,glProgram=null,loc={},drawCalls=0;
const state={stage:0,cls:0,group:0,fruit:0,page:0,orbit:0,orbitGoal:0,pitch:.09,pitchGoal:.09,dist:68,distGoal:68,target:V(0,11,0),goal:V(0,11,0),hover:'',initialized:false};
const meshes={trees:[],islands:[],clusters:[],familyBranches:[],fruits:new Map(),sealed:new Map(),insignia:null};
function compile(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
function initialiseGL(){if(!gl){warn.textContent='WebGL is unavailable on this device. Please use a browser with WebGL support.';warn.style.display='block';return false}
 const vert=`attribute vec3 aPosition; attribute vec3 aNormal; attribute vec3 aColor;uniform mat4 uVP;uniform vec3 uOffset;uniform float uLift;uniform float uScale;uniform float uTime;uniform float uSway;varying vec3 vColor;void main(){vec3 w=aPosition*uScale+uOffset;w.y+=uLift;w.x+=uSway*.16*max(w.y,0.)/48.*sin(uTime*.52+w.y*.105+w.z*.08);gl_Position=uVP*vec4(w,1.);vec3 N=normalize(aNormal);float sun=max(dot(N,normalize(vec3(-.38,.74,.50))),0.);float bounce=max(dot(N,normalize(vec3(.65,.25,-.38))),0.);float light=.58+sun*.48+bounce*.16;vec3 tint=mix(vec3(.91,.98,1.06),vec3(1.07,1.02,.93),sun*.62);vColor=aColor*light*tint;}`;
 const frag=`precision mediump float;varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,1.);}`;
 const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,vert));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,frag));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.useProgram(p);glProgram=p;['aPosition','aNormal','aColor'].forEach(n=>loc[n]=gl.getAttribLocation(p,n));['uVP','uOffset','uLift','uScale','uTime','uSway'].forEach(n=>loc[n]=gl.getUniformLocation(p,n));gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);return true}
function buildAssets(){
 meshes.insignia=new Mesh();
 const ring=Array.from({length:33},(_,i)=>{let a=i*TAU/32;return [Math.cos(a)*2.0,Math.sin(a)*2.2,-1.35]});
 tube(meshes.insignia,ring,ring.map(()=>.085),'#ffd879',7);
 for(let k=0;k<4;k++){let a=k*TAU/4;shard(meshes.insignia,[Math.cos(a)*2.15,Math.sin(a)*2.3,-1.35],[Math.cos(a)*2.45,Math.sin(a)*2.6,-1.35],.15,'#fff6cc',5)}
 for(let ci=0;ci<3;ci++){
 meshes.trees.push(makeTree30(ci));meshes.islands.push(makeIsland30(ci));
 meshes.familyBranches.push(v29FamilyBranch(ci));const gs=groups[ci];meshes.clusters[ci]=gs.map((group,gidx)=>{const gg=new Mesh(),anchor=anchorFor(ci,gidx),count=group.fruit.length;
 // Every fruit in each family physically exists on its hanging branch. No unverified silhouettes at this distance.
 let spread=count>30?3.7:count>12?3.0:count>5?2.3:1.8;
 // One oversized illustrated/representative fruit anchors the family. All
 // remaining 145 entries stay as physical bunch members at subtler scale.
 let hero=group.fruit.findIndex(f=>f.appearance!=='unverified');if(hero<0)hero=0;
 for(let i=0;i<count;i++){
  let seed=group.fruit[i].id,angle=i*2.39996+.13,r=i===hero?0:spread*Math.sqrt((i+.27)/Math.max(1,count));
  let y=-(1.75+Math.floor(i/8)*.49)+(i===hero?-.95:0);
  const pos=[Math.cos(angle)*r,y,1.05+Math.sin(angle)*r*.67];
  let size=i===hero?(ci===0?3.75:ci===1?4.35:4.05):count>30?.24:count>15?.31:count>5?.44:.52;
  gg.append(i===hero?v30HeroFruit(ci,gidx):genericFruit25(ci,seed),pos,size);
  tube(gg,[[0,2.3,-.4],[pos[0]*.58,.1,pos[2]*.64],add(pos,[0,size*.72,0])],[.20,.14,.04],i===hero?'#fbd36c':'#b98a50',6);
 }
 // A family has one physical gold-curled twig rather than repetitive halo spam.
 const curl=Array.from({length:24},(_,k)=>{let t=k/23,a=t*TAU*1.15;return [Math.cos(a)*(1.45-1.25*t),2.4+t*2.3,1.2+Math.sin(a)*(.8-.65*t)]});
 tube(gg,curl,curl.map((_,k)=>.18*(1-.65*k/24)),'#ffd766',6);
 return {mesh:gg,anchor,group};});
 }
 }
function anchorFor(ci,gidx){
 const pos=[
  [[-24,47,20],[-12,54,22],[2,49,25],[19,50,20],[-30,37,14],[-10,36,24],[11,39,25],[29,36,13],[-18,62,10],[14,62,10],[-1,45,26],[3,58,-13]],
  [[-25,43,17],[1,58,19],[27,42,15]],
  [[-25,48,20],[-6,60,23],[18,50,23],[26,42,16]]
 ];
 return pos[ci][gidx];
}
function getFruitMesh(d){const key=d.id;const map=d.appearance==='unverified'?meshes.sealed:meshes.fruits;if(!map.has(key))map.set(key,d.appearance==='unverified'?sealedFruit(key):specialFruit23(d));return map.get(key)}
function perspective(fovy,aspect,near,far){const f=1/Math.tan(fovy/2),inv=1/(near-far);return [f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*inv,-1,0,0,2*far*near*inv,0]}
function view(eye,target){const front=norm(sub(target,eye)),right=norm(cross(front,[0,1,0])),up=cross(right,front);return [right[0],up[0],-front[0],0,right[1],up[1],-front[1],0,right[2],up[2],-front[2],0,-dot(right,eye),-dot(up,eye),dot(front,eye),1]}
const dot=(a,b)=>a.reduce((sum,n,i)=>sum+n*b[i],0);
function matMul(a,b){let o=Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
let cam={eye:V(),right:V(1,0,0),up:V(0,1,0),front:V(0,0,-1),vp:null};
function updateCamera(dt){let k=1-Math.exp(-Math.min(dt,.05)*7.4);state.target=mix(state.target,state.goal,k);state.dist=lerp(state.dist,state.distGoal,k);state.orbit=lerp(state.orbit,state.orbitGoal,k);state.pitch=lerp(state.pitch,state.pitchGoal,k);
 const xy=Math.cos(state.pitch),eye=add(state.target,[state.dist*Math.sin(state.orbit)*xy,state.dist*Math.sin(state.pitch),state.dist*Math.cos(state.orbit)*xy]);cam.eye=eye;cam.front=norm(sub(state.target,eye));cam.right=norm(cross(cam.front,[0,1,0]));cam.up=cross(cam.right,cam.front);cam.vp=matMul(perspective(.86,WIDTH/HEIGHT,.12,400),view(eye,state.target))}
function project(p){let v=sub(p,cam.eye),z=dot(v,cam.front);if(z<.05)return null;let f=HEIGHT/(2*Math.tan(.86/2));return {x:WIDTH/2+f*dot(v,cam.right)/z,y:HEIGHT/2-f*dot(v,cam.up)/z,z};}
function draw(mesh,offset=V(),lift=0,scale=1,sway=0){mesh.upload(gl);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vbo);gl.vertexAttribPointer(loc.aPosition,3,gl.FLOAT,false,36,0);gl.vertexAttribPointer(loc.aNormal,3,gl.FLOAT,false,36,12);gl.vertexAttribPointer(loc.aColor,3,gl.FLOAT,false,36,24);for(let key of ['aPosition','aNormal','aColor'])gl.enableVertexAttribArray(loc[key]);gl.uniform3fv(loc.uOffset,offset);gl.uniform1f(loc.uLift,lift);gl.uniform1f(loc.uScale,scale);gl.uniform1f(loc.uTime,frame*.016);gl.uniform1f(loc.uSway,sway);gl.drawArrays(gl.TRIANGLES,0,mesh.n);drawCalls++}
function visiblePageItems(list,count){let pages=Math.ceil(list.length/count);if(state.page>=pages)state.page=Math.max(0,pages-1);return list.slice(state.page*count,(state.page+1)*count)}
function visibleFamilyLabels(){return visiblePageItems(groups[state.cls],WIDTH<640?3:5)}
function visibleFruits(){return visiblePageItems(groups[state.cls][state.group].fruit,WIDTH<640?3:5)}
function previewPosition(i,total){let spread=WIDTH<640?3.35:4.7;return [(i-(total-1)/2)*spread,0,0]}
function fruitStagePosition(i,total){const p=previewPosition(i,total);return add(PINS[state.cls],[p[0],21.1+(i%2)*.1,19.95])}
function displayFruitPosition(){return add(PINS[state.cls],[0,22.5,23.0])}
function doRender(dt){if(!glProgram)return;updateCamera(dt);gl.viewport(0,0,glCanvas.width,glCanvas.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(glProgram);gl.uniformMatrix4fv(loc.uVP,false,new Float32Array(cam.vp));drawCalls=0;
 const mobile=WIDTH<670;
 if(state.stage===0){for(let ci=0;ci<3;ci++){if(mobile&&ci!==state.cls)continue;draw(meshes.islands[ci],PINS[ci]);draw(meshes.trees[ci],PINS[ci],0,1,1);for(let cl of meshes.clusters[ci])draw(cl.mesh,add(PINS[ci],cl.anchor))}}
 else {const ci=state.cls;
 if(state.stage===1){draw(meshes.islands[ci],PINS[ci]);draw(meshes.trees[ci],PINS[ci],0,1,1);for(let cl of meshes.clusters[ci])draw(cl.mesh,add(PINS[ci],cl.anchor));const focus=meshes.clusters[ci][state.group];if(focus)draw(meshes.insignia,add(PINS[ci],add(focus.anchor,[0,-1.55,0])),Math.sin(frame*.024)*.18,.85)}
 if(state.stage===2){draw(meshes.familyBranches[ci],add(PINS[ci],[0,25.0,19.7]),0,.55);const vis=visibleFruits();for(let i=0;i<vis.length;i++){const f=vis[i],p=fruitStagePosition(i,vis.length);draw(getFruitMesh(f),p,Math.sin(frame*.017+i)*.16,3.12)}}
 else if(state.stage===3){const f=groups[ci][state.group].fruit[state.fruit],p=displayFruitPosition();draw(meshes.insignia,p,0,WIDTH<670?1.55:2.35);draw(getFruitMesh(f),p,Math.sin(frame*.016)*.12,3.04)}
 }
 if(frame%8===0)layoutLabels();frame++;
}
function stageName(){return state.stage===0?'The origins of Devil Fruits':state.stage===1?CLASS[state.cls]+' · The legendary tree':state.stage===2?groups[state.cls][state.group].name:'Devil Fruit';}
function updateHud(){
 document.body.dataset.stage=state.stage;document.body.dataset.cls=CLASS[state.cls].toLowerCase();
 const c=CLASS[state.cls],g=groups[state.cls][state.group];
 titleNode.textContent=state.stage===0?c:state.stage===1?g.name:state.stage===2?g.name:'';
 subNode.textContent='';crumb.textContent='';tip.textContent='';backBtn.hidden=state.stage===0;
 const total=state.stage===0?3:state.stage===1?groups[state.cls].length:state.stage===2?Math.ceil(g.fruit.length/(WIDTH<640?3:5)):g.fruit.length;
 const cur=state.stage===0?state.cls:state.stage===1?state.group:state.stage===2?state.page:state.fruit;
 pageNum.replaceChildren();const bar=document.createElement('i');bar.style.width=(100*(cur+1)/Math.max(1,total))+'%';pageNum.append(bar);
 pageNum.setAttribute('aria-label',`${cur+1} of ${total}`);detail.hidden=state.stage!==3;
 if(state.stage===3)updateDetail();layoutLabels();
}
function updateDetail(){let d=groups[state.cls][state.group].fruit[state.fruit];let fields=[['POWER',d.power],['CLASSIFICATION',d.subtype],['KNOWN USER',d.users],['AFFILIATION',d.affiliation],['STORY ARCS',d.arcs],['SAGA',d.saga],['AWAKENING',d.awakened],['ORIGIN',d.origin]];
 document.getElementById('fruit-title').textContent=d.name;document.getElementById('fruit-state').textContent=d.appearance==='unverified'?'APPEARANCE UNKNOWN':'';document.getElementById('fruit-state').dataset.sealed=d.appearance==='unverified';let field=document.getElementById('fields');field.replaceChildren();for(let [name,value] of fields){const cell=document.createElement('div');cell.className='fact';const a=document.createElement('span');a.textContent=name;const b=document.createElement('strong');b.textContent=value;cell.append(a,b);field.append(cell)}}
function button(label,p,cb,subtext,kind='fruit'){if(!p||p.z<.1)return null;const el=document.createElement('button');el.className='float-node '+kind;el.style.left=p.x+'px';el.style.top=p.y+'px';el.type='button';el.innerHTML='';const name=document.createElement('span');name.textContent=label;el.appendChild(name);if(subtext){const sub=document.createElement('small');sub.textContent=subtext;el.appendChild(sub)}el.addEventListener('click',e=>{e.stopPropagation();cb()});return el}
function layoutLabels(){
 if(!cam.vp)return;floatLabels.replaceChildren();
 if(state.stage===1){const cl=meshes.clusters[state.cls][state.group];if(!cl)return;
  const pt=add(PINS[state.cls],add(cl.anchor,[0,-2.2,1.8]));const p=project(pt);
  if(p){p.x=Math.max(45,Math.min(WIDTH-45,p.x));p.y=Math.max(HEIGHT*.27,Math.min(HEIGHT*.70,p.y));
   const el=button(cl.group.name,p,()=>openGroup(state.group),'','family-node');if(el)floatLabels.append(el)}
 }else if(state.stage===2){const vis=visibleFruits();for(let i=0;i<vis.length;i++){
  let d=vis[i],p=project(add(fruitStagePosition(i,vis.length),[0,-2.65,0]));if(!p)continue;
  p.x=WIDTH<640?WIDTH*(i+.5)/vis.length:Math.max(125,Math.min(WIDTH-125,p.x));
  p.y=WIDTH<640?HEIGHT*.64:Math.max(HEIGHT*.48,Math.min(HEIGHT*.68,p.y));
  let short=d.name.includes('Model:')?d.name.split('Model:')[1].trim():d.name.replace(' no Mi','');
  const el=button(short,p,()=>openFruit(state.page*(WIDTH<640?3:5)+i),'','fruit-node');if(el)floatLabels.append(el);
 }}
}
function gotoStage(){
 if(state.stage===0){state.goal=WIDTH<670?add(PINS[state.cls],[0,34,0]):[0,34,0];state.distGoal=WIDTH<670?188:216;state.orbitGoal=0;state.pitchGoal=.06}
 if(state.stage===1){let p=meshes.clusters[state.cls][state.group].anchor;state.goal=add(PINS[state.cls],[p[0]*.42,p[1]-10,p[2]*.39]);state.distGoal=WIDTH<670?116:130;state.orbitGoal=p[0]*.008;state.pitchGoal=.075}
 if(state.stage===2){state.goal=add(PINS[state.cls],[0,19,19.7]);state.distGoal=WIDTH<670?35:38;state.orbitGoal=.02;state.pitchGoal=.03}
 if(state.stage===3){state.goal=add(displayFruitPosition(),[0,-1.35,0]);state.distGoal=WIDTH<670?27:25;state.orbitGoal=0;state.pitchGoal=0}
 updateHud();}
function openClass(ci){state.cls=ci;state.stage=1;state.group=0;state.page=0;gotoStage()}
function openGroup(gi){state.group=gi;state.stage=2;state.page=0;gotoStage()}
function openFruit(index){state.fruit=Math.min(groups[state.cls][state.group].fruit.length-1,index);state.stage=3;gotoStage()}
function goBack(){if(state.stage===0)return;state.stage--;if(state.stage<=1)state.page=0;gotoStage()}
function navigate(dir){
 if(state.stage===0){state.cls=(state.cls+dir+3)%3;gotoStage()}
 else if(state.stage===1){state.group=(state.group+dir+groups[state.cls].length)%groups[state.cls].length;gotoStage()}
 else if(state.stage===2){let pages=Math.ceil(groups[state.cls][state.group].fruit.length/(WIDTH<640?3:5));state.page=(state.page+dir+pages)%pages;updateHud()}
 else {const len=groups[state.cls][state.group].fruit.length;state.fruit=(state.fruit+dir+len)%len;updateHud()}
}
function syncSize(){WIDTH=innerWidth;HEIGHT=innerHeight;scaleFactor=Math.min(1.65,devicePixelRatio||1);glCanvas.width=Math.round(WIDTH*scaleFactor);glCanvas.height=Math.round(HEIGHT*scaleFactor);glCanvas.style.width=WIDTH+'px';glCanvas.style.height=HEIGHT+'px';updateHud()}
let pointers=new Map(),startPointer=null,lastPointer=null,dragged=false,wasPinching=false,downTime=0;
function pointerDown(e){try{glCanvas.setPointerCapture(e.pointerId)}catch(_){}pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size>=2)wasPinching=true;if(pointers.size===1){startPointer=[e.clientX,e.clientY];downTime=performance.now();lastPointer=null;dragged=false}}
function pointerMove(e){if(!pointers.has(e.pointerId))return;let old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);
 let dx=e.clientX-old[0],dy=e.clientY-old[1];if(pointers.size===1){if(Math.hypot(e.clientX-(startPointer?.[0]||0),e.clientY-(startPointer?.[1]||0))>9)dragged=true;state.orbitGoal+=dx*.0065;state.pitchGoal=Math.max(-.26,Math.min(.32,state.pitchGoal-dy*.0025))}
 else if(pointers.size===2){const pt=[...pointers.values()],d=Math.hypot(pt[0][0]-pt[1][0],pt[0][1]-pt[1][1]);if(typeof lastPointer==='number')state.distGoal=Math.min(270,Math.max(12,state.distGoal+(lastPointer-d)*.045));lastPointer=d}}
function canvasTap(x,y){if(state.stage===0){openClass(WIDTH<670?state.cls:nearestTree(x,y));return}
 if(state.stage===1){let ci=state.cls,best=null;for(let i=0;i<meshes.clusters[ci].length;i++){let p=project(add(add(PINS[ci],meshes.clusters[ci][i].anchor),[0,-1.7,0]));if(!p)continue;let delta=Math.hypot(p.x-x,p.y-y);if(!best||delta<best.delta)best={i,delta}}
  openGroup(best&&best.delta<Math.max(65,WIDTH*.20)?best.i:state.group);return}
 if(state.stage===2){let vis=visibleFruits(),best=null;for(let i=0;i<vis.length;i++){let p=project(fruitStagePosition(i,vis.length));if(!p)continue;let xx=WIDTH<640?WIDTH*(i+.5)/vis.length:p.x;let delta=Math.hypot((xx-x)*.9,(p.y-y)*1.1);if(!best||delta<best.delta)best={i,delta}}
  if(best&&best.delta<Math.max(120,WIDTH*.25))openFruit(state.page*(WIDTH<640?3:5)+best.i)}}
function pointerUp(e){if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);if(!pointers.size){if(wasPinching){wasPinching=false;lastPointer=null;startPointer=null;dragged=false;return}let dx=e.clientX-(startPointer?.[0]??e.clientX),dy=e.clientY-(startPointer?.[1]??e.clientY);let duration=performance.now()-downTime;
 if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.35&&duration<510){navigate(dx<0?1:-1);state.orbitGoal=state.stage===1?state.orbitGoal*.12:0}else if(!dragged)canvasTap(e.clientX,e.clientY);lastPointer=null;startPointer=null}}
function nearestTree(x,y){let a=[0,1,2].map(ci=>({ci,p:project(add(PINS[ci],[0,22,0]))}));return a.reduce((best,cur)=>Math.abs(x-cur.p.x)<Math.abs(x-best.p.x)?cur:best).ci}
function bind(){backBtn.addEventListener('click',goBack);nextBtn.addEventListener('click',()=>navigate(1));prevBtn.addEventListener('click',()=>navigate(-1));glCanvas.addEventListener('pointerdown',pointerDown);glCanvas.addEventListener('pointermove',pointerMove);glCanvas.addEventListener('pointerup',pointerUp);glCanvas.addEventListener('pointercancel',pointerUp);glCanvas.addEventListener('wheel',e=>{e.preventDefault();state.distGoal=Math.min(270,Math.max(12,state.distGoal+e.deltaY*.02))},{passive:false});window.addEventListener('resize',syncSize);window.addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Backspace')goBack();if(e.key==='ArrowRight')navigate(1);if(e.key==='ArrowLeft')navigate(-1)})}
function start(){try{if(!initialiseGL())return;buildAssets();bind();syncSize();gotoStage();state.target=[...state.goal];state.dist=state.distGoal;let prev=performance.now();function frameLoop(now){let dt=Math.min(.05,(now-prev)/1000);prev=now;doRender(dt);requestAnimationFrame(frameLoop)}requestAnimationFrame(frameLoop);state.initialized=true;window.DF_DEBUG={state,DATA,groups,openClass,openGroup,openFruit,goBack,navigate,project,meshes,gl,worldVersion:30,canvasTap};}catch(e){console.error('Devil Fruit startup failed',e);warn.textContent='Unable to start the 3D world: '+e.message;warn.style.display='block'}}
start();

