/* The Legendary Devil Fruit Trees, original WebGL world. No external runtime. */
const CLASS=['Zoan','Logia','Paramecia'];
const PINS=[[-34,0,0],[0,0,0],[34,0,0]];
const groups=CLASS.map(cls=>{const map=new Map();for(const d of DATA.filter(d=>d.cls===cls)){if(!map.has(d.group))map.set(d.group,[]);map.get(d.group).push(d)}return [...map].map(([name,fruit],idx)=>({name,fruit,idx,cls}))});
const GUESS={Zoan:'BEAST GROVE',Logia:'ELEMENTAL CONFLUENCE',Paramecia:'REALITY BLOOM'};
const VARIANT_NAMES=[['BEAST GROVE','MYTHIC SANCTUARY'],['ELEMENTAL CONFLUENCE','PRIMORDIAL TEMPEST'],['REALITY BLOOM','POSSIBILITY NEXUS']];
let designVariant=0;
const TYPES={Zoan:'INSTINCT · EVOLUTION · WILL',Logia:'NATURE · FORCE · EMBODIMENT',Paramecia:'ALTERATION · POSSIBILITY · FREEDOM'};
const fruitsById=new Map(DATA.map(d=>[d.id,d]));
const glCanvas=document.getElementById('world'),gl=glCanvas.getContext('webgl',{antialias:true,alpha:true,powerPreference:'high-performance',depth:true,preserveDrawingBuffer:false});
const hud=document.getElementById('hud'),floatLabels=document.getElementById('labels'),detail=document.getElementById('detail');
const titleNode=document.getElementById('heading'),subNode=document.getElementById('subheading'), crumb=document.getElementById('crumb');
const backBtn=document.getElementById('back'),nextBtn=document.getElementById('next'),prevBtn=document.getElementById('prev'),tip=document.getElementById('tip'),pageNum=document.getElementById('page-num');
const warn=document.getElementById('fallback');
let scaleFactor=1,WIDTH=390,HEIGHT=800,last=0,frame=0,glProgram=null,loc={},drawCalls=0;
const state={stage:0,cls:0,group:0,fruit:0,page:0,orbit:0,orbitGoal:0,pitch:.09,pitchGoal:.09,dist:68,distGoal:68,target:V(0,11,0),goal:V(0,11,0),hover:'',initialized:false};
const meshes={trees:[],islands:[],clusters:[],fruits:new Map(),sealed:new Map(),insignia:null};
function compile(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
function initialiseGL(){if(!gl){warn.textContent='WebGL is unavailable on this device. Please use a browser with WebGL support.';warn.style.display='block';return false}
 const vert=`attribute vec3 aPosition; attribute vec3 aNormal; attribute vec3 aColor;uniform mat4 uVP;uniform vec3 uOffset;uniform float uLift;uniform float uScale;varying vec3 vColor;void main(){vec3 w=aPosition*uScale+uOffset;w.y+=uLift;gl_Position=uVP*vec4(w,1.);float sun=max(dot(aNormal,normalize(vec3(.34,.75,.5))),0.);float light=.65+sun*.34;vColor=aColor*light;}`;
 const frag=`precision mediump float;varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,1.);}`;
 const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,vert));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,frag));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.useProgram(p);glProgram=p;['aPosition','aNormal','aColor'].forEach(n=>loc[n]=gl.getAttribLocation(p,n));['uVP','uOffset','uLift','uScale'].forEach(n=>loc[n]=gl.getUniformLocation(p,n));gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);return true}
function buildAssets(){
 meshes.insignia=new Mesh();
 const ring=Array.from({length:33},(_,i)=>{let a=i*TAU/32;return [Math.cos(a)*2.0,Math.sin(a)*2.2,-1.35]});
 tube(meshes.insignia,ring,ring.map(()=>.085),'#ffd879',7);
 for(let k=0;k<4;k++){let a=k*TAU/4;shard(meshes.insignia,[Math.cos(a)*2.15,Math.sin(a)*2.3,-1.35],[Math.cos(a)*2.45,Math.sin(a)*2.6,-1.35],.15,'#fff6cc',5)}
 for(let ci=0;ci<3;ci++){
 meshes.trees.push(makeTree(ci,designVariant));meshes.islands.push(island(ci));
 const gs=groups[ci];meshes.clusters[ci]=gs.map((group,gidx)=>{const gg=new Mesh(),anchor=anchorFor(ci,gidx),count=group.fruit.length;
 // Every fruit in each family physically exists on its hanging branch. No unverified silhouettes at this distance.
 let spread=count>30?3.1:count>12?2.55:count>5?1.95:1.65;
 for(let i=0;i<count;i++){let seed=group.fruit[i].id,angle=i*2.39996,r=spread*Math.sqrt((i+.25)/Math.max(1,count)),y=-(.85+Math.floor(i/7)*.55);
 const pos=[Math.cos(angle)*r,y,Math.sin(angle)*r*.7];gg.append(genericFruit(ci,seed),pos,count>28?.48:count>10?.63:.85);
 tube(gg,[[-.10,1.23,0],[pos[0]*.6,.35,pos[2]*.6],add(pos,[0,.58,0])],[.11,.07,.025],['#b88c50'],5);
 }
 // sturdy branch attachment and a readable dangling charm
 tube(gg,[[0,3.2,-1],[0,1.8,-.15],[0,1.18,0]],[.46,.27,.14],[ci===0?'#a96732':ci===1?'#49899f':'#b54b84'],7);
 return {mesh:gg,anchor,group};});
 }
 }
function anchorFor(ci,gidx){
 // Staggered, genuinely branch-attached fruit clusters. Each family occupies its own bough.
 if(ci===0){const col=gidx%4,row=Math.floor(gidx/4);return [(col-1.5)*5.8,12.5+row*4.2+(col%2)*1.0,6.1+(row%2)*1.2]}
 if(ci===1)return [[-8.5,17.5,6.4],[0,20.5,7.0],[8.5,17.5,6.4]][gidx];
 return [[-9,16,6],[-3.2,20.5,6.8],[3.8,17.2,7.0],[9,21.5,5.8]][gidx];
}
function getFruitMesh(d){const key=d.id;const map=d.appearance==='unverified'?meshes.sealed:meshes.fruits;if(!map.has(key))map.set(key,d.appearance==='unverified'?sealedFruit(key):specialFruit(d));return map.get(key)}
function perspective(fovy,aspect,near,far){const f=1/Math.tan(fovy/2),inv=1/(near-far);return [f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*inv,-1,0,0,2*far*near*inv,0]}
function view(eye,target){const front=norm(sub(target,eye)),right=norm(cross(front,[0,1,0])),up=cross(right,front);return [right[0],up[0],-front[0],0,right[1],up[1],-front[1],0,right[2],up[2],-front[2],0,-dot(right,eye),-dot(up,eye),dot(front,eye),1]}
const dot=(a,b)=>a.reduce((sum,n,i)=>sum+n*b[i],0);
function matMul(a,b){let o=Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
let cam={eye:V(),right:V(1,0,0),up:V(0,1,0),front:V(0,0,-1),vp:null};
function updateCamera(dt){let k=1-Math.exp(-Math.min(dt,.05)*5.1);state.target=mix(state.target,state.goal,k);state.dist=lerp(state.dist,state.distGoal,k);state.orbit=lerp(state.orbit,state.orbitGoal,k);state.pitch=lerp(state.pitch,state.pitchGoal,k);
 const xy=Math.cos(state.pitch),eye=add(state.target,[state.dist*Math.sin(state.orbit)*xy,state.dist*Math.sin(state.pitch),state.dist*Math.cos(state.orbit)*xy]);cam.eye=eye;cam.front=norm(sub(state.target,eye));cam.right=norm(cross(cam.front,[0,1,0]));cam.up=cross(cam.right,cam.front);cam.vp=matMul(perspective(.86,WIDTH/HEIGHT,.12,400),view(eye,state.target))}
function project(p){let v=sub(p,cam.eye),z=dot(v,cam.front);if(z<.05)return null;let f=HEIGHT/(2*Math.tan(.86/2));return {x:WIDTH/2+f*dot(v,cam.right)/z,y:HEIGHT/2-f*dot(v,cam.up)/z,z};}
function draw(mesh,offset=V(),lift=0,scale=1){mesh.upload(gl);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vbo);gl.vertexAttribPointer(loc.aPosition,3,gl.FLOAT,false,36,0);gl.vertexAttribPointer(loc.aNormal,3,gl.FLOAT,false,36,12);gl.vertexAttribPointer(loc.aColor,3,gl.FLOAT,false,36,24);for(let key of ['aPosition','aNormal','aColor'])gl.enableVertexAttribArray(loc[key]);gl.uniform3fv(loc.uOffset,offset);gl.uniform1f(loc.uLift,lift);gl.uniform1f(loc.uScale,scale);gl.drawArrays(gl.TRIANGLES,0,mesh.n);drawCalls++}
function visiblePageItems(list,count){let pages=Math.ceil(list.length/count);if(state.page>=pages)state.page=Math.max(0,pages-1);return list.slice(state.page*count,(state.page+1)*count)}
function visibleFamilyLabels(){return visiblePageItems(groups[state.cls],WIDTH<640?3:5)}
function visibleFruits(){return visiblePageItems(groups[state.cls][state.group].fruit,WIDTH<640?3:5)}
function previewPosition(i,total){let spread=WIDTH<640?3.35:4.7;return [(i-(total-1)/2)*spread,0,0]}
function fruitStagePosition(i,total){const p=previewPosition(i,total);return add(PINS[state.cls],[p[0],19.5+(i%2)*.3,19.8])}
function displayFruitPosition(){return add(PINS[state.cls],[0,19.9,23.0])}
function doRender(dt){if(!glProgram)return;updateCamera(dt);gl.viewport(0,0,glCanvas.width,glCanvas.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(glProgram);gl.uniformMatrix4fv(loc.uVP,false,new Float32Array(cam.vp));drawCalls=0;
 const mobile=WIDTH<670;
 if(state.stage===0){for(let ci=0;ci<3;ci++){if(mobile&&ci!==state.cls)continue;draw(meshes.islands[ci],PINS[ci]);draw(meshes.trees[ci],PINS[ci]);for(let cl of meshes.clusters[ci])draw(cl.mesh,add(PINS[ci],cl.anchor))}}
 else {const ci=state.cls;
 if(state.stage!==3){draw(meshes.islands[ci],PINS[ci]);draw(meshes.trees[ci],PINS[ci]);for(let cl of meshes.clusters[ci])draw(cl.mesh,add(PINS[ci],cl.anchor));}
 if(state.stage===2){const vis=visibleFruits();for(let i=0;i<vis.length;i++){const f=vis[i],p=fruitStagePosition(i,vis.length);draw(getFruitMesh(f),p,Math.sin(frame*.017+i)*.16,2.05)}}
 else if(state.stage===3){const f=groups[ci][state.group].fruit[state.fruit],p=displayFruitPosition();draw(meshes.insignia,p,0,WIDTH<670?1.55:2.35);draw(getFruitMesh(f),p,Math.sin(frame*.016)*.12,2.60)}
 }
 if(frame%8===0)layoutLabels();frame++;
}
function stageName(){return state.stage===0?'The origins of Devil Fruits':state.stage===1?CLASS[state.cls]+' · The legendary tree':state.stage===2?groups[state.cls][state.group].name:'Devil Fruit';}
function updateHud(){document.body.dataset.stage=state.stage;document.body.dataset.cls=CLASS[state.cls].toLowerCase();let c=CLASS[state.cls],item=state.stage>=2?groups[state.cls][state.group]:null;
 titleNode.textContent=state.stage===0?'THE LEGENDARY DEVIL FRUIT TREES':state.stage===1?`${c.toUpperCase()} · ${VARIANT_NAMES[state.cls][designVariant]}`:state.stage===2?item.name:state.stage===3?item.fruit[state.fruit].name:'';
 subNode.textContent=state.stage===0?'146 FRUITS · THREE LEGENDARY SPIRITS':state.stage===1?TYPES[c]:state.stage===2?`${item.fruit.length} FRUIT${item.fruit.length===1?'':'S'} · TOUCH A FRUIT`:'';
 crumb.textContent=state.stage===0?'THE ORIGINS':state.stage===1?'THE TREE':state.stage===2?'THE FAMILY':'THE FRUIT';backBtn.hidden=state.stage===0;
 let total=state.stage===0?3:state.stage===1?Math.ceil(groups[state.cls].length/(WIDTH<640?3:5)):state.stage===2?Math.ceil(item.fruit.length/(WIDTH<640?3:5)):item.fruit.length;
 let cur=state.stage===0?state.cls+1:state.stage===3?state.fruit+1:state.page+1;
 pageNum.textContent=state.stage===0?`${c.toUpperCase()} · ${DATA.filter(f=>f.cls===c).length} FRUITS`:`${cur} / ${total}`;
 document.getElementById('variant').textContent=`DESIGN ${designVariant+1}/2 · ${VARIANT_NAMES[state.cls][designVariant]}`;
 tip.textContent=state.stage===0?'TAP TREE TO EXPLORE · SWIPE TO SWITCH':state.stage===1?'TAP A HANGING FAMILY':state.stage===2?'TAP A FRUIT TO EXAMINE':'DRAG TO ORBIT · PREV / NEXT FRUIT';
 detail.hidden=state.stage!==3;if(state.stage===3)updateDetail();layoutLabels();}
function updateDetail(){let d=groups[state.cls][state.group].fruit[state.fruit];let fields=[['POWER',d.power],['CLASSIFICATION',d.subtype],['KNOWN USER',d.users],['AFFILIATION',d.affiliation],['STORY ARCS',d.arcs],['SAGA',d.saga],['AWAKENING',d.awakened],['ORIGIN',d.origin]];
 document.getElementById('fruit-title').textContent=d.name;document.getElementById('fruit-state').textContent=d.appearance==='unverified'?'SEALED · APPEARANCE NOT VERIFIED':'STYLISED MODEL · DESIGN REFERENCE';document.getElementById('fruit-state').dataset.sealed=d.appearance==='unverified';let field=document.getElementById('fields');field.replaceChildren();for(let [name,value] of fields){const cell=document.createElement('div');cell.className='fact';const a=document.createElement('span');a.textContent=name;const b=document.createElement('strong');b.textContent=value;cell.append(a,b);field.append(cell)}}
function button(label,p,cb,subtext,kind='fruit'){if(!p||p.z<.1)return null;const el=document.createElement('button');el.className='float-node '+kind;el.style.left=p.x+'px';el.style.top=p.y+'px';el.type='button';el.innerHTML='';const name=document.createElement('span');name.textContent=label;el.appendChild(name);if(subtext){const sub=document.createElement('small');sub.textContent=subtext;el.appendChild(sub)}el.addEventListener('click',e=>{e.stopPropagation();cb()});return el}
function layoutLabels(){if(!cam.vp)return;floatLabels.replaceChildren();
 if(state.stage===0){if(WIDTH<670){return;}else{for(let ci=0;ci<3;ci++){let p=project(add(PINS[ci],[0,-5,9]));const label=button(CLASS[ci],p,()=>openClass(ci),`${DATA.filter(d=>d.cls===CLASS[ci]).length} DEVIL FRUITS`,'tree-node');if(label)floatLabels.append(label)}}return}
 if(state.stage===1){let list=visibleFamilyLabels(),nodes=[];for(let i=0;i<list.length;i++){let item=list[i],pt=add(PINS[state.cls],meshes.clusters[state.cls][item.idx].anchor);const p=project(add(pt,[0,-1.1,0]));if(p){nodes.push({label:item.name,p,idx:item.idx,count:item.fruit.length});}}
 // Readable floating labels in tree space. Stagger labels if a branch projects over another.
 nodes.sort((a,b)=>a.p.y-b.p.y);for(let i=0;i<nodes.length;i++){let n=nodes[i],p={...n.p};p.x=Math.max(WIDTH*.22,Math.min(WIDTH*.78,p.x));p.y=Math.max(HEIGHT*.32,Math.min(HEIGHT*.77,p.y));if(i&&p.y<nodes[i-1].displayY+68)p.y=nodes[i-1].displayY+68;n.displayY=p.y;const label=button(n.label,p,()=>openGroup(n.idx),`${n.count} FRUIT${n.count===1?'':'S'}`,'family-node');if(label)floatLabels.append(label)}
 }else if(state.stage===2){let vis=visibleFruits();for(let i=0;i<vis.length;i++){let d=vis[i],p=project(add(fruitStagePosition(i,vis.length),[0,-2.0,0]));if(p){p.x=WIDTH<640?WIDTH*(i+.5)/vis.length:Math.max(120,Math.min(WIDTH-120,p.x));p.y=WIDTH<640?HEIGHT*.596:Math.max(HEIGHT*.48,Math.min(HEIGHT*.69,p.y));let short=d.name.includes('Model:')?d.name.split('Model:')[1].trim():d.name.replace(' no Mi','');const node=button(short,p,()=>openFruit(state.page*(WIDTH<640?3:5)+i),d.appearance==='unverified'?'SEALED':'REVEALED','fruit-node');if(node)floatLabels.append(node)}}}
 }
function gotoStage(){if(state.stage===0){state.goal=WIDTH<670?add(PINS[state.cls],[0,10.8,0]):[0,10.8,0];state.distGoal=WIDTH<670?82:100;state.orbitGoal=0;state.pitchGoal=.10}
 if(state.stage===1){state.goal=add(PINS[state.cls],[0,15,0]);state.distGoal=WIDTH<670?66:67;state.orbitGoal=.03;state.pitchGoal=.08}
 if(state.stage===2){state.goal=add(PINS[state.cls],[0,19,14]);state.distGoal=WIDTH<670?35:40;state.orbitGoal=.02;state.pitchGoal=.05}
 if(state.stage===3){state.goal=add(displayFruitPosition(),[0,-3,0]);state.distGoal=WIDTH<670?17:19;state.orbitGoal=0;state.pitchGoal=0}
 updateHud()}
function openClass(ci){state.cls=ci;state.stage=1;state.page=0;gotoStage()}
function openGroup(gi){state.group=gi;state.stage=2;state.page=0;gotoStage()}
function openFruit(index){state.fruit=Math.min(groups[state.cls][state.group].fruit.length-1,index);state.stage=3;gotoStage()}
function goBack(){if(state.stage===0)return;state.stage--;if(state.stage<=1)state.page=0;gotoStage()}
function navigate(dir){if(state.stage===0){state.cls=(state.cls+dir+3)%3;gotoStage()}
 else if(state.stage===1){const pages=Math.ceil(groups[state.cls].length/(WIDTH<640?3:5));state.page=(state.page+dir+pages)%pages;updateHud()}
 else if(state.stage===2){let pages=Math.ceil(groups[state.cls][state.group].fruit.length/(WIDTH<640?3:5));state.page=(state.page+dir+pages)%pages;updateHud()}
 else {const len=groups[state.cls][state.group].fruit.length;state.fruit=(state.fruit+dir+len)%len;updateHud()}}
function syncSize(){WIDTH=innerWidth;HEIGHT=innerHeight;scaleFactor=Math.min(1.65,devicePixelRatio||1);glCanvas.width=Math.round(WIDTH*scaleFactor);glCanvas.height=Math.round(HEIGHT*scaleFactor);glCanvas.style.width=WIDTH+'px';glCanvas.style.height=HEIGHT+'px';updateHud()}
let pointers=new Map(),startPointer=null,startOrbit=0,lastPointer=null,dragged=false;
function pointerDown(e){glCanvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===1){startPointer=[e.clientX,e.clientY];lastPointer=[e.clientX,e.clientY];dragged=false}}
function pointerMove(e){if(!pointers.has(e.pointerId))return;let old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);let dx=e.clientX-old[0],dy=e.clientY-old[1];if(Math.abs(e.clientX-startPointer?.[0])>8||Math.abs(e.clientY-startPointer?.[1])>8)dragged=true;
 if(pointers.size===1){state.orbitGoal+=dx*.006;state.pitchGoal=Math.max(-.28,Math.min(.35,state.pitchGoal-dy*.0025));}
 else if(pointers.size===2){const pts=[...pointers.values()],d=Math.hypot(pts[0][0]-pts[1][0],pts[0][1]-pts[1][1]);if(lastPointer&&typeof lastPointer==='number'){state.distGoal=Math.min(150,Math.max(11,state.distGoal+(lastPointer-d)*.045))}lastPointer=d}}
function pointerUp(e){if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);if(pointers.size===0){let dx=e.clientX-(startPointer?.[0]||e.clientX),dy=e.clientY-(startPointer?.[1]||e.clientY);if(WIDTH<670&&Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.7){navigate(dx<0?1:-1);state.orbitGoal=0}else if(!dragged&&state.stage===0){let t=WIDTH<670?state.cls:nearestTree(e.clientX,e.clientY);openClass(t)}}lastPointer=null}
function nearestTree(x,y){const a=[0,1,2].map(ci=>({ci,p:project(add(PINS[ci],[0,15,0]))}));return a.reduce((best,cur)=>Math.abs(x-cur.p.x)<Math.abs(x-best.p.x)?cur:best).ci}
function setVariant(index){
 const next=((index%2)+2)%2;if(next===designVariant)return;designVariant=next;
 for(let i=0;i<3;i++){if(meshes.trees[i]?.vbo)gl.deleteBuffer(meshes.trees[i].vbo);meshes.trees[i]=makeTree(i,designVariant);}
 updateHud();
}
function bind(){document.getElementById('variant').addEventListener('click',()=>setVariant(designVariant+1));backBtn.addEventListener('click',goBack);nextBtn.addEventListener('click',()=>navigate(1));prevBtn.addEventListener('click',()=>navigate(-1));glCanvas.addEventListener('pointerdown',pointerDown);glCanvas.addEventListener('pointermove',pointerMove);glCanvas.addEventListener('pointerup',pointerUp);glCanvas.addEventListener('pointercancel',pointerUp);glCanvas.addEventListener('wheel',e=>{e.preventDefault();state.distGoal=Math.min(150,Math.max(11,state.distGoal+e.deltaY*.02))},{passive:false});window.addEventListener('resize',syncSize);window.addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Backspace')goBack();if(e.key==='ArrowRight')navigate(1);if(e.key==='ArrowLeft')navigate(-1)})}
function start(){try{if(!initialiseGL())return;buildAssets();bind();syncSize();gotoStage();state.target=[...state.goal];state.dist=state.distGoal;let prev=performance.now();function frameLoop(now){let dt=Math.min(.05,(now-prev)/1000);prev=now;doRender(dt);requestAnimationFrame(frameLoop)}requestAnimationFrame(frameLoop);state.initialized=true;window.DF_DEBUG={state,DATA,groups,openClass,openGroup,openFruit,goBack,navigate,setVariant,project,meshes,gl,getVariant:()=>designVariant};}catch(e){console.error('Devil Fruit startup failed',e);warn.textContent='Unable to start the 3D world: '+e.message;warn.style.display='block'}}
start();

