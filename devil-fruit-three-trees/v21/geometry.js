/* Devil Fruit World - original self contained geometric modelling toolkit. */
const TAU=Math.PI*2;
const V=(x=0,y=0,z=0)=>[x,y,z];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,n)=>[a[0]*n,a[1]*n,a[2]*n];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>{const l=Math.hypot(...a)||1;return mul(a,1/l)};
const lerp=(a,b,t)=>a+(b-a)*t;
const mix=(a,b,t)=>a.map((n,i)=>lerp(n,b[i],t));
const C=h=>{const x=parseInt(h.replace('#',''),16);return [((x>>16)&255)/255,((x>>8)&255)/255,(x&255)/255]};
const shades=(h,f=1)=>C(h).map(x=>Math.min(1,x*f));
function rng(seed){let x=seed>>>0;return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296}}
class Mesh {
 constructor(){this.a=[];this.vbo=null;this.n=0}
 tri(a,b,c,col){const n=norm(cross(sub(b,a),sub(c,a)));const color=Array.isArray(col)?col:C(col);for(let p of [a,b,c])this.a.push(...p,...n,...color)}
 quad(a,b,c,d,col){this.tri(a,b,c,col);this.tri(a,c,d,col)}
 append(other,at=V(),scale=1){for(let i=0;i<other.a.length;i+=9){let o=other.a.slice(i,i+9);o[0]=o[0]*scale+at[0];o[1]=o[1]*scale+at[1];o[2]=o[2]*scale+at[2];this.a.push(...o)}}
 upload(gl){if(this.vbo)return;this.vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.a),gl.STATIC_DRAW);this.n=this.a.length/9;this.a.length=0}
}
function tube(g,pts,rad,color,sides=8){const cols=Array.isArray(color)?color:[color];const rings=[];
 for(let i=0;i<pts.length;i++){const tangent=norm(sub(pts[Math.min(pts.length-1,i+1)],pts[Math.max(0,i-1)]));let u=norm(cross(tangent,[0,0,1]));if(Math.hypot(...u)<.01)u=[1,0,0];const w=norm(cross(tangent,u));let r=Array.isArray(rad)?rad[Math.min(i,rad.length-1)]:rad;
 rings.push(Array.from({length:sides},(_,j)=>{const a=j*TAU/sides;return add(pts[i],add(mul(u,Math.cos(a)*r),mul(w,Math.sin(a)*r)))}));}
 for(let i=0;i<rings.length-1;i++)for(let j=0;j<sides;j++)g.quad(rings[i][j],rings[i][(j+1)%sides],rings[i+1][(j+1)%sides],rings[i+1][j],cols[i%cols.length]);
 const top=pts[pts.length-1];for(let j=0;j<sides;j++)g.tri(top,rings.at(-1)[j],rings.at(-1)[(j+1)%sides],cols.at(-1));
}
function blob(g,p,r,color,seed=1,segments=9,lat=5){const R=rng(seed),verts=[];let col=Array.isArray(color)?color:[color];for(let j=0;j<=lat;j++){let t=j*Math.PI/lat,ring=[];for(let k=0;k<segments;k++){let a=k*TAU/segments,sc=1+.045*(R()-.5);ring.push(add(p,[Math.sin(t)*Math.cos(a)*r[0]*sc,Math.cos(t)*r[1],Math.sin(t)*Math.sin(a)*r[2]*sc]))}verts.push(ring)}for(let j=0;j<lat;j++)for(let k=0;k<segments;k++)g.quad(verts[j][k],verts[j][(k+1)%segments],verts[j+1][(k+1)%segments],verts[j+1][k],col[Math.floor(j/2)%col.length]);}
function leaf(g,a,b,w,col,mid){const t=norm(sub(b,a)),side=norm(cross(t,[0,0,1]));const c=mix(a,b,.50),u=add(c,mul(side,w)),v=sub(c,mul(side,w));g.tri(a,u,b,col);g.tri(a,b,v,col);if(mid){g.tri(a,add(c,[0,w*.12,.06]),u,mid);g.tri(a,v,add(c,[0,w*.12,.06]),mid)}}
function shard(g,foot,tip,rad,col,sides=6){const mid=mix(foot,tip,.64);tube(g,[foot,mid,tip],[rad,rad*.7,.015],[col],sides)}
function arc(g,start,end,rise,rad,col,count=11){const pts=[];for(let i=0;i<=count;i++){let t=i/count;pts.push(add(mix(start,end,t),[0,Math.sin(t*Math.PI)*rise,0]))}tube(g,pts,pts.map((_,i)=>Math.max(.06,rad*Math.pow(1-i/pts.length,.83))),col,8)}
function torus(g,p,rx,rz,y,rad,col,start=0,turns=1,steps=65){let ps=Array.from({length:steps+1},(_,i)=>{const t=i/steps,a=start+t*TAU*turns;return add(p,[Math.cos(a)*rx,y(t),Math.sin(a)*rz])});tube(g,ps,ps.map(()=>rad),col,7)}
// V20: Six independent, macro-chibi spirit-tree sculptures. No inherited V19 tree templates.
const classColors=[
 {main:'#6bdb35',stem:'#b87839',bright:'#c2f34e',alt:'#0f9862',accent:'#ffe37a'},
 {main:'#39bdeb',stem:'#4d405c',bright:'#d8fbff',alt:'#ff6e20',accent:'#ffe163'},
 {main:'#ff6cb5',stem:'#d34291',bright:'#ffd5e8',alt:'#8e55de',accent:'#ffcb47'}
];
function island(ci){
 const g=new Mesh(),n=16,R=rng(801+ci),rings=[];
 const radius=[15.0,15.5,14.5,10.9,5.5,.2],Y=[0,-1.8,-5.0,-9.1,-12.5,-15.3];
 for(let j=0;j<radius.length;j++)rings.push(Array.from({length:n},(_,k)=>{
  const a=TAU*k/n;const r=radius[j]*(1+.085*Math.sin(k*2.4+ci*2)+.043*Math.cos(k*4.2));
  return [Math.cos(a)*r,Y[j]+(j===0?.2*R():.1*R()),Math.sin(a)*r*.87];
 }));
 for(let k=0;k<n;k++){
  const m=(k+1)%n;
  g.tri([0,.22,0],rings[0][k],rings[0][m],k%3?'#7cce32':'#a3e343');
  for(let j=0;j<5;j++)g.quad(rings[j][k],rings[j][m],rings[j+1][m],rings[j+1][k],
   j===0?'#4aaf37':j===1?(k%2?'#bb8f62':'#d0a271'):j===2?(k%2?'#9d6d69':'#ad8372'):'#574761');
 }
 // Seven clumps of broad, game-like ground-cover plants at the base. The islands stay generic.
 for(let k=0;k<9;k++){
  const a=TAU*k/9+.26,rad=11.5+R()*1.1,p=[Math.cos(a)*rad,.58,Math.sin(a)*rad*.78];
  blob(g,p,[1.1,.52,1.06],k%3?'#36a948':'#73cf3e',203+k,7,3);
  for(let j=0;j<3;j++){const q=a+j*.9;leaf(g,p,add(p,[Math.cos(q)*2,1.2+R(),Math.sin(q)*1.9]),.53,'#359f42','#a2eb4d')}
 }
 // Angular water cascades break into three diagonal segments rather than straight pipes.
 for(let sign of [-1,1]){
  const x=sign*7.2,z=11.7;
  for(let segment=0;segment<3;segment++){
   const y0=-.10-segment*5.3,y1=-.10-(segment+1)*5.3;
   const cx=x+[0,sign*.46,-sign*.35,sign*.55][segment];
   const nx=x+[0,sign*.46,-sign*.35,sign*.55][segment+1];
   const wd=[1.85,1.68,2.16,1.58][segment];
   const wn=[1.85,1.68,2.16,1.58][segment+1];
   for(let j=0;j<4;j++){
    const u=j/4,uu=(j+1)/4;
    g.quad([cx+(2*u-1)*wd,y0,z+segment*.84],[cx+(2*uu-1)*wd,y0,z+segment*.84],
     [nx+(2*uu-1)*wn,y1,z+(segment+1)*.84],[nx+(2*u-1)*wn,y1,z+(segment+1)*.84],
     j===0?'#c7f9ff':j===1?'#3fcaf2':j===2?'#75e9ff':'#18b8df');
   }
   // A few bright foam shards at each bend give the falls an intentional chibi silhouette.
   for(let f=0;f<2;f++){
    const pos=[nx+(f-.5)*1.2,y1+.3,z+(segment+1)*.84+.14];
    shard(g,pos,add(pos,[(f-.5)*1.1,.60,.15]),.22,'#f7feff',5);
   }
  }
  for(let j=0;j<5;j++)blob(g,[x+(j-2)*.72,-16,z+2.9],[.85,.46,.7],j%2?'#e2fdff':'#7be6ff',239+j,6,3);
 }
 return g;
}
// Helpers deliberately preserve obvious flat polygon surfaces, not rounded subdivision meshes.
function bough(g,pts,r,color){tube(g,pts,r,color,9)}
function crown(g,p,r,col,seed=1){blob(g,p,r,col,seed,9,5)}
function boulder(g,p,r,col){blob(g,p,r,col,49+Math.round(p[0]*7),6,4)}
function spiralInlay(g,p,r,col){spiral3d(g,p,r,r*.16,Math.max(.12,r*.105),col,1.65,39)}
function vines(g,start,end,col='#53b742'){arc(g,start,end,-1.25,.20,col,10)}
function branchCluster(g,at,col,leafCol,count=4){
 for(let j=0;j<count;j++){
  let ang=j*TAU/count+at[0]*.1;
  let q=add(at,[Math.cos(ang)*2.6,1.8+j%2*.5,Math.sin(ang)*2.3]);
  leaf(g,at,q,1.4,leafCol,col);
 }
}
function familyArms(g,ci,variant){
 // Each fruit family is physically connected to a substantial branching arm.
 // Anchor positions are supplied by the same function used for the hanging fruit clusters.
 const c=['#a76532','#4b506e','#bc3a86'][ci];
 for(let i=0;i<groups[ci].length;i++){
  let p=anchorFor(ci,i);
  const root=[p[0]*.2,9.2+i%3*1.5,p[2]*.17];
  const mid=[p[0]*.72,p[1]+2.4,p[2]*.64-1.8];
  bough(g,[root,mid,add(p,[0,2.9,-.6]),add(p,[0,2.3,0])],[1.38,1.08,.65,.24],c);
  // The cluster mount grows a deliberate flattened leaf collar for clarity.
  leaf(g,add(p,[-1.5,2.9,-.6]),add(p,[1.1,3.2,0]),.75,ci===2?'#ffaecc':ci===1?'#8ce2e6':'#72ca3c');
 }
}
function roots(g,col,scale=1){for(let k=0;k<7;k++){const a=k*TAU/7;
 bough(g,[[Math.cos(a)*1.1,4,Math.sin(a)*1.1],[Math.cos(a)*5*scale,1.0,Math.sin(a)*4*scale],[Math.cos(a)*10*scale,.3,Math.sin(a)*8*scale]],
 [2.0*scale,1.45*scale,.10],col);
}}
// A1 — primal jungle sovereign. Oversized winged antler canopy and feline wood-mask.
function zoanGrove(g){
 roots(g,'#a76b31',1.08);
 bough(g,[[0,.1,0],[-1.3,5.7,.2],[1,11.5,0],[-.2,18,0],[.8,26,-.1]], [4.9,4.45,3.8,2.8,.58],'#b87936');
 for(let k=0;k<8;k++){let a=k*2.399,h=16+k%3*2.5,r=9+(.8*(k%3));let end=[Math.cos(a)*r,h+2.9,Math.sin(a)*r*.67];
  bough(g,[[0,8.8+k%3*2,0],[end[0]*.50,h-1,end[2]*.50],end],[2.5,1.65,.17],'#ad6b35');
  crown(g,add(end,[0,2.0,0]),[5.3,3.4,4.5],[k%3===0?'#43b735':'#2da24a',k%3===1?'#a9eb3e':'#77d53b'],k+7);
  branchCluster(g,add(end,[0,3,0]),'#c5f258','#3ecb55',4);
 }
 crown(g,[0,27,-.5],[7.5,4.0,6.3],['#76d73d','#b4ec48'],100);
 // Giant creamy tusks arc above the outer canopy. Deliberately oversized and visible from far away.
 for(let side of [-1,1]){
  bough(g,[[side*3,17,1.6],[side*6,23,2],[side*9,28,2],[side*11,26,2]], [1.7,1.5,.95,.09],'#ffdf9b');
  boulder(g,[side*1.8,14,4.05],[1.35,.77,.48],'#ffd879');
  shard(g,[side*1.3,13.6,4.45],[side*2.4,13.0,4.8],.34,'#26384a',5);
 }
 spiralInlay(g,[0,9.7,4.24],2.5,'#ffd566');
 for(let k=0;k<5;k++){let a=k*TAU/5;vines(g,[Math.cos(a)*6.3,22,Math.sin(a)*3.4],[Math.cos(a)*6.0,14,Math.sin(a)*3.9],'#7fd23b')}
}
// A2 — mythical sanctuary. Feathered wings, leaf antlers and a verdant scaled trunk.
function zoanSanctuary(g){
 roots(g,'#986039',.93);
 bough(g,[[0,.4,0],[1.5,6,-.1],[-1.4,12.4,0],[.9,20,0],[0,29,0]], [5.0,4.2,3.65,2.3,.35],'#946139');
 for(let j=0;j<7;j++){let a=j*TAU/7,r=9.8,end=[Math.cos(a)*r,19+j%3*3,Math.sin(a)*r*.7];
  bough(g,[[0,10+j%3*2,0],[end[0]*.56,end[1]-3,end[2]*.5],end],[2.4,1.4,.1],'#b27642');
  crown(g,add(end,[0,2,0]),[5.7,3.7,4.2],j%2?'#57cb42':'#198f59',55+j);
 }
 crown(g,[0,29,0],[6.8,3.9,5.4],'#8de33f',81);
 for(let side of [-1,1]){
  bough(g,[[side*2.3,20,0],[side*7.5,26,0],[side*13.2,24,1]], [2.2,1.1,.1],'#ffdc92');
  // Large Phoenix-like feather fans (distinct from the A1 horns).
  for(let j=0;j<5;j++){
   let x=side*(6.0+j*1.8),y=24+(j%3)*2.3;
   leaf(g,[side*2.8,22,0],[x,y,1.3],1.3,j%2?'#fff7d5':'#f5c65e',j%2?'#ff8e53':'#ffffff');
  }
 }
 for(let k=0;k<9;k++){let a=k*TAU/9;puffScale(g,[Math.cos(a)*2.5,6+k*1.6,2.4],.78,k%2?'#4ccab4':'#80dea1')}
 spiralInlay(g,[0,11.0,3.85],2,'#ffd875');
}
// B1 — Elemental Confluence. Massive cloud cap with fire and ice growing from the same stone form.
function logiaConfluence(g){
 roots(g,'#493f60',1.05);
 bough(g,[[0,0,0],[-1.5,5,0],[1,12,-.5],[-1,19,0],[0,27,0]], [5.1,4.6,3.5,2.6,.5],'#453b5c');
 for(let j=0;j<7;j++){let a=j*2.399,end=[Math.cos(a)*9.0,16+j%3*3,Math.sin(a)*7];
  bough(g,[[0,8+j%3*2,0],[end[0]*.63,end[1]-4,end[2]*.66],end],[2.5,1.45,.1],'#59465e');
  if(j%2){for(let k=0;k<3;k++){
    let p=add(end,[(k-1)*2.3,1,0]);crown(g,p,[3.6,2.5,3.2],['#d7f4f9','#fffefe'],j*7+k);
   }}else for(let k=0;k<4;k++){let p=add(end,[(k-1.5)*1.8,0,k%2]);shard(g,p,add(p,[1,4.1+k%2*1.5,0]),1.0,k%2?'#ffba31':'#ff6a20',6)}
 }
 for(let j=0;j<7;j++){let a=j*TAU/7;shard(g,[Math.cos(a)*7,.5,Math.sin(a)*7],[Math.cos(a)*8.4,6+j%3*2,Math.sin(a)*8],1.15,'#66dfff',5)}
 spiral3d(g,[0,13,0],6.3,22,1.15,'#12bbed',1.2,65);
 spiral3d(g,[0,13,0],6.5,22,.42,'#b4f5ff',1.2,65);
 for(let j=0;j<5;j++){let x=(j-2)*3.7; bough(g,[[x,25,3],[x+.6,20,3],[x-1.5,19,3],[x-.5,15,3]], [.35,.34,.29,.05],'#ffe050')}
}
// B2 — Primordial Tempest. A tall magma pillar under a broad cyclone, more sky than rock.
function logiaTempest(g){
 roots(g,'#57405a',1.02);
 bough(g,[[0,0,0],[2,5,0],[-1.6,12,0],[1.2,20,0],[-.8,30,0]], [5.5,4.9,3.8,2.5,.35],'#4d3755');
 for(let k=0;k<9;k++){let a=k*2.399,p=[Math.cos(a)*8.7,20+k%4*2.1,Math.sin(a)*7.8];
 bough(g,[[0,11+k%3*3,0],[p[0]*.55,p[1]-3,p[2]*.6],p],[2.6,1.65,.18],'#5b4660');
 if(k%2===0)for(let j=0;j<4;j++)crown(g,add(p,[(j-1.5)*2.4,1.1,0]),[3.8,2.8,3.3],j%2?'#e0f7ff':'#b8dced',k*5+j);
 else for(let j=0;j<4;j++)shard(g,add(p,[(j-1.5)*1.6,0,0]),add(p,[(j-1.5)*1.4,5+j%2*2,0]),1.1,j%2?'#ffbc3f':'#ff581f',6);
 }
 spiral3d(g,[0,13,0],7.4,26,1.35,'#3cccf6',1.5,88);spiral3d(g,[0,11,0],7.0,26,.36,'#fff3c4',1.5,88);
 for(let j=0;j<7;j++){
 let a=j*TAU/7,p=[Math.cos(a)*9,1,Math.sin(a)*9],q=[Math.cos(a)*10,7+j%2*2,Math.sin(a)*10];shard(g,p,q,1.45,'#71e8fe',6);
 }
 for(let j=0;j<4;j++)bough(g,[[j*4-6,26,1],[j*4-5,21,1],[j*4-7,20,2],[j*4-5,16,2]],[.43,.42,.39,.07],'#ffe156');
 // The molten core is carved directly onto the surface rather than a separate flame accessory.
 for(let j=0;j<5;j++){let a=j*TAU/5,p=[Math.cos(a)*3.3,2+j*1.8,Math.sin(a)*3.3],tip=[Math.cos(a+.3)*3.4,15+j%2*3,Math.sin(a+.3)*3.4];
  bough(g,[p,mix(p,tip,.48),tip],[.4,.3,.09],j%2?'#ffb12e':'#ff5b2b');}
}
// C1 — Reality Bloom. Candy-pink tall flowers, irregular growth and golden looping foliage.
function parameciaBloom(g){
 roots(g,'#af3b81',1.01);
 bough(g,[[0,0,0],[2.1,6,0],[-1.4,12,0],[1.2,19,0],[-1.3,27,0]], [5.2,4.3,3.7,2.5,.4],'#c9448d');
 for(let k=0;k<8;k++){let a=k*2.399,p=[Math.cos(a)*8.2,17+k%4*2.6,Math.sin(a)*6.8];
  bough(g,[[0,9+k%4*1.6,0],[p[0]*.6,p[1]-2,p[2]*.58],p],[2.7,1.7,.18],'#bd398d');
  crown(g,add(p,[0,2.1,0]),[4.5,3.1,4.0],k%3===0?'#f68ac1':k%3===1?'#ff72b7':'#e969bd',k+57);
  for(let j=0;j<5;j++){let b=j*TAU/5;leaf(g,add(p,[0,1.8,0]),add(p,[Math.cos(b)*5,2.5,Math.sin(b)*4]),1.55,'#ffa7d9','#ffdae8')}
 }
 crown(g,[0,27,0],[6.6,4.1,5.5],'#ff90ca',111);
 spiral3d(g,[0,11.8,0],6.5,21,1.0,'#ffcf49',1.7,65);spiral3d(g,[0,11.8,0],7.0,21,.20,'#fff1b9',1.7,65);
 spiralInlay(g,[0,8.7,4.7],2.1,'#ffcc4e');
}
// C2 — Possibility Nexus. A spiralling, impossible gateway with floating facets and offset pink blooms.
function parameciaNexus(g){
 roots(g,'#a43a8e',.96);
 bough(g,[[0,0,0],[2.6,4,0],[-2.2,10,0],[2.5,16,0],[-1.2,23,0],[.3,29,0]], [5,4.3,3.5,2.8,1.7,.2],'#b43185');
 for(let k=0;k<7;k++){let a=k*2.399,p=[Math.cos(a)*8.1,16+k%4*2.7,Math.sin(a)*7];
  bough(g,[[0,11+k%3*2,0],[p[0]*.61,p[1]-3,p[2]*.7],p],[2.5,1.5,.16],'#d84d9a');
  crown(g,add(p,[0,2.1,0]),[4.5,2.8,3.8],k%2?'#ff74c0':'#f09cdd',82+k);
 }
 for(let j=0;j<2;j++){
  const pts=Array.from({length:41},(_,i)=>{const a=i*TAU/40;return [5+Math.cos(a)*(4.9+j*1.2),19+Math.sin(a)*(5.8+j*.6),-1.0-j*.5]});
  bough(g,pts,pts.map(()=>j===0?.8:.38),j===0?'#ffd048':'#f8a3fd');
 }
 spiral3d(g,[0,11,0],7.4,22,1.0,'#ffe052',2.2,85);
 spiral3d(g,[0,10,0],7.5,22,.18,'#fff0b0',2.2,85);
 for(let j=0;j<9;j++){const a=j*TAU/9,p=[Math.cos(a)*10,7+j%4*4,Math.sin(a)*8];shard(g,p,add(p,[1.5,1.9,1.1]),.65,j%3?'#ffbb61':'#a86ce7',5)}
 spiralInlay(g,[.7,10,4.1],2.2,'#ffe291');
}
function puffScale(g,p,rad,col){boulder(g,p,[rad,rad*.69,rad*.55],col)}

// Large, readable spirit details are sculpted INTO each tree, not scattered particle ornaments.
function beastVisage(g,alt){
 // Oversized angular wooden mask, readable even when the tree is thumbnail-sized.
 boulder(g,[0,15.3,5.3],[3.8,2.8,2.15],alt?'#c88a44':'#bc7e37');
 for(let side of [-1,1]){
  boulder(g,[side*1.55,15.9,7],[.75,.62,.35],'#ffdc7e');
  shard(g,[side*1.5,15.92,7.32],[side*1.97,15.62,7.60],.33,'#182b3d',5);
  // Macro ivory cheek fur gives a recognisable friendly beast shape.
  shard(g,[side*2.9,15.1,6.1],[side*4.1,13.9,6.6],.84,'#ffe5ad',5);
 }
 boulder(g,[0,13.7,7.65],[1.10,.72,.50],'#f6c36e');
 shard(g,[0,13.5,8.12],[0,13.1,8.24],.48,'#27334b',5);
 spiralInlay(g,[0,17.3,7.11],.66,'#ffe698');
}
function phoenixWings(g){
 for(let side of [-1,1])for(let i=0;i<7;i++){
  const y=18.5+i*.84,spread=side*(5.5+i*1.25);
  leaf(g,[side*2.1,18.2,1.8],[spread,y+5+(i%3)*1.1,3.3],1.5,i%2?'#fff5d0':'#f7cc73',i%3?'#fda467':'#d6f7cc');
 }
}
function natureDuality(g){
 // The left crown is storm-cloud water; the right crown is rising fire, both organically integrated.
 for(let i=0;i<4;i++){
  crown(g,[-8.0+(i%2)*3,24+(i%2)*2.2,3.4],[4.0,2.5,3.2],i%2?'#e6f6fd':'#afdff0',300+i);
  const x=6+(i%2)*3,z=2.5+i%2;
  shard(g,[x,19,z],[x+((i%2)?2:-1),26+i%3*2,z+.7],1.8,i%2?'#ffab28':'#ff5f21',6);
 }
 // Two deliberate, faceted lightning shapes on the exposed front.
 for(let side of [-1,1]){
  const x=side*8.5;
  bough(g,[[x,25,7],[x+side*1.6,21.5,7],[x-side*1.3,21,7],[x,16.2,7]], [.48,.45,.35,.07],'#ffef70');
 }
}
function realityGlyph(g){
 spiralInlay(g,[0,11.3,4.7],2.2,'#ffdf73');
 for(let j=0;j<5;j++){
  let a=j*TAU/5,p=[Math.cos(a)*8,20+j%2*2,Math.sin(a)*5+2];
  shard(g,p,add(p,[1.1,1.2,.9]),.70,j%2?'#f5cb64':'#a25dee',6);
 }
}
function makeTree(ci,variant=0){
 const g=new Mesh();
 if(ci===0){if(variant===0)zoanGrove(g);else zoanSanctuary(g);beastVisage(g,variant===1);if(variant===1)phoenixWings(g)}
 else if(ci===1){if(variant===0)logiaConfluence(g);else logiaTempest(g);natureDuality(g)}
 else {if(variant===0)parameciaBloom(g);else parameciaNexus(g);realityGlyph(g)}
 familyArms(g,ci,variant);
 return g;
}
function spiral3d(g,center,rad,height,thick,color,turns=1,steps=45){const pts=Array.from({length:steps+1},(_,i)=>{const t=i/steps,a=t*TAU*turns+.3;return add(center,[Math.cos(a)*rad*(1-.14*t),height*(t-.5),Math.sin(a)*rad*(1-.14*t)])});tube(g,pts,pts.map(()=>thick),color,7)}
function genericFruit(ci,seed=0){const g=new Mesh(),P=classColors[ci],R=rng(seed+128),tone=[P.main,P.bright,P.alt][seed%3];blob(g,[0,0,0],[.73,.82,.71],[tone],seed+9,9,5);tube(g,[[0,.56,0],[.04,.85,.02],[.24,.95,.04]],[.13,.095,.035],'#67ab42',6);leaf(g,[.02,.84,0],[.49,.98,0],.22,'#85ca3c');spiral3d(g,[0,.13,.64],.26,.21,.048,'#fff4ad',1.3,18);return g}
function sealedFruit(seed=0){const g=new Mesh();blob(g,[0,0,0],[.72,.87,.68],['#080f1e','#161b2c'],seed,10,6);tube(g,[[0,.74,0],[.15,1.1,.03]],[.12,.04],'#3a3c46',6);
 for(let s of [-1,1]){for(let k=0;k<8;k++){let t=(k+.5)/8,y=lerp(-.56,.56,t),x=s*y*.72,z=.68*Math.sqrt(Math.max(.12,1-y*y/.78-x*x/1.1));const p=[x,y,z+.07],a=[];for(let j=0;j<=10;j++){let th=j*TAU/10;a.push(add(p,[Math.cos(th)*.14,Math.sin(th)*.085,0]))}tube(g,a,a.map(()=>.031),'#bcb39f',5)}}
 // simple golden lock, shackle and keyhole in 3D, visible on black frontal body
 const z=.88;g.quad([-.25,-.41,z],[.25,-.41,z],[.25,-.04,z],[-.25,-.04,z],'#eec75c');tube(g,[[-.15,-.05,z],[ -.15,.16,z],[.15,.16,z],[.15,-.05,z]],[.05,.05,.05,.05],'#ffe8ac',6);shard(g,[0,-.19,z+.025],[0,-.32,z+.02],.055,'#1b2940',5);return g}
function specialFruit(d){let g=new Mesh(),name=d.name,id=d.id;let palette=['#f75d75','#fb8b91','#ffc9b1'];let special='round';
 if(name.includes('Ope Ope'))special='heart';else if(name.includes('Giraffe'))special='banana';else if(name.includes('Mera Mera'))special='flame';else if(name.includes('Hana Hana'))special='flower';else if(name.includes('Mochi'))special='mochi';
 else if(name.includes('Nika'))palette=['#9878d2','#c0a4f0','#e6ceff'];else if(name.includes('Yami'))palette=['#654582','#9974b6','#dbc3ea'];else if(name.includes('Hito Hito'))palette=['#d84855','#ff6f78','#ffd3a3'];else if(name.includes('Seiryu'))palette=['#219dd1','#62cbe9','#b5f8f3'];else if(name.includes('Mero Mero'))palette=['#ef6f96','#f8a5b3','#ffdbd2'];else if(name.includes('Suna Suna'))palette=['#e6ac5f','#f6d083','#fff0aa'];else if(d.cls==='Zoan')palette=['#ed9f4b','#f4ce76','#ffefa9'];else if(d.cls==='Logia')palette=['#5cbbe9','#a0def6','#f7e3ae'];else palette=['#c976c7','#ec9bdc','#ffd2e9'];
 if(special==='heart'){ // two-lobe heart, pointed base
 for(let sign of [-1,1])blob(g,[sign*.38,.29,0],[.57,.61,.50],['#dc4b72','#f47b91'],id+sign,8,5);
 const a=[[-.95,.45,0],[-.78,-.2,0],[0,-1.12,.05],[.78,-.2,0],[.95,.45,0]];for(let k=0;k<4;k++)g.tri(a[k],a[k+1],[0,.14,.49],palette[0]);
 }else if(special==='banana'){for(let k=0;k<5;k++){let a=k*TAU/5;const ps=Array.from({length:9},(_,j)=>{let t=j/8;return [Math.cos(a)*(.19+.42*t)+.13*Math.sin(t*Math.PI),.96-1.95*t,Math.sin(a)*(.19+.42*t)]});tube(g,ps,ps.map((_,j)=>.07+.21*Math.sin(Math.PI*j/8)),k%2?'#e4754b':'#f3a76a',7)}}
 else if(special==='flower'){for(let k=0;k<9;k++){let a=k*TAU/9;leaf(g,[0,.05,0],[Math.cos(a)*1.1,.15,Math.sin(a)*.95],.28,k%2?'#f59ec4':'#f7cbdf','#ffdef0')}blob(g,[0,.08,0],[.42,.41,.42],['#ffc96a'],4,8,4)}
 else if(special==='mochi'){blob(g,[0,.4,0],[.94,.77,.80],['#eee4cb'],5,9,5);blob(g,[0,-.54,0],[.65,.51,.59],['#fff4da'],6,9,5)}
 else {let size=special==='flame'?[.8,.95,.74]:[.88,1.05,.80];blob(g,[0,0,0],size,[palette[0],palette[1]],id,10,6)}
 if(special==='flame'){for(let k=0;k<7;k++){let a=k*TAU/7;leaf(g,[Math.cos(a)*.35,.6,Math.sin(a)*.3],[Math.cos(a)*.64,1.55+Math.sin(k)*.25,Math.sin(a)*.53],.3,k%2?'#ffb130':'#f26c22','#fff27e')}}
 tube(g,[[0,.87,0],[.05,1.2,.04],[.34,1.31,.09]],[.14,.095,.045],'#5a9f4c',7);leaf(g,[.06,1.16,0],[.57,1.33,-.07],.26,'#57b74a','#b0e36f');
 if(special!=='flower')for(let k=0;k<5;k++){let a=k*TAU/5;const p=[Math.cos(a)*.49,.30*Math.sin(a),Math.sin(a)*.40];spiral3d(g,p,.13,.11,.026,palette[2],.8,14)}
 return g}

/* --- V21 sculptural upgrades --- */
/* V21 original macro-chibi sculptural system. The approved A1 / A3 / B1 / C2 concepts are prioritised. */
function planeSpiral(g,origin,rad,col,turns=1.6,line=.095,steps=42){
 const pp=[];for(let i=0;i<=steps;i++){let t=i/steps,ang=turns*TAU*t+.25;pp.push(add(origin,[Math.cos(ang)*rad*(1-t*.92),Math.sin(ang)*rad*(1-t*.92),.14+.035*Math.sin(ang)]));}
 tube(g,pp,line,col,6);
}
function macroCanopy(g,pos,rx,ry,rz,main,highlight,seed=0){
 // Broad, flat facets rather than stacks of low-poly sphere primitives.
 const sides=11,R=rng(seed+156),phase=seed*.23, rings=[];
 for(const [h,r] of [[-.62,.68],[-.27,.99],[.24,1.06],[.66,.83],[1.0,.38]]){
  rings.push(Array.from({length:sides},(_,i)=>{let a=TAU*i/sides+phase,und=1+.065*Math.sin(a*3+seed);return [pos[0]+Math.cos(a)*rx*r*und,pos[1]+h*ry,pos[2]+Math.sin(a)*rz*r*und]}));
 }
 for(let j=0;j<rings.length-1;j++)for(let i=0;i<sides;i++){let k=(i+1)%sides;g.quad(rings[j][i],rings[j][k],rings[j+1][k],rings[j+1][i],(i+j)%4===0?highlight:main)}
 const top=[pos[0],pos[1]+1.21*ry,pos[2]];
 for(let i=0;i<sides;i++)g.tri(rings[4][i],rings[4][(i+1)%sides],top,(i%3===0?highlight:main));
}
function macroTrunk(g,pts,rs,col){tube(g,pts,rs,col,10)}
function giantBlades(g,base,spread,col,alt,count=5){for(let j=0;j<count;j++){const a=(j/(count-1)-.5)*1.8,tip=add(base,[Math.cos(a)*spread*1.1,spread*(.5+.3*Math.sin(j*1.9)),Math.sin(a)*spread*.6]);leaf(g,base,tip,spread*.23,j%2?alt:col)} }
function runeGlyph(g,origin,scale,col){
 planeSpiral(g,origin,scale,col,1.65,.14,42);
 const x=origin[0],y=origin[1],z=origin[2];
 // Two large angular bookend fins act like cut-in decorative ridges.
 shard(g,[x-scale*.9,y-scale*.9,z-.05],[x-scale*.2,y-scale*.48,z+.16],.17,col,5);
 shard(g,[x+scale*.8,y+scale*.9,z-.05],[x+scale*.2,y+scale*.47,z+.16],.17,col,5);
}
function originalIsland21(ci){
 const g=new Mesh(),R=rng(240+ci),n=15,radii=[17.6,18.2,15.8,12.8,6.8,0.03],ys=[-.25,-2.1,-5.5,-9.8,-14.0,-17.4],ring=[];
 for(let j=0;j<radii.length;j++)ring.push(Array.from({length:n},(_,i)=>{const a=TAU*i/n;const r=radii[j]*(1+.075*Math.sin(i*3+ci));return [Math.cos(a)*r,ys[j],Math.sin(a)*r*.78]}));
 for(let i=0;i<n;i++){let k=(i+1)%n;g.tri([0,.35,0],ring[0][i],ring[0][k],i%2?'#8edc35':'#74cb25');for(let j=0;j<radii.length-1;j++)g.quad(ring[j][i],ring[j][k],ring[j+1][k],ring[j+1][i],j===0?'#3e9f2d':j===1?'#bd9562':j===2?'#a27b61':j===3?'#835c60':'#57496e');}
 for(let i=0;i<13;i++){let a=i*TAU/13,p=[Math.cos(a)*(13+R()*2),.7,Math.sin(a)*(9.8+R())];macroCanopy(g,p,.85,.5,.9,i%2?'#4ca93a':'#6eca35','#9fe34d',i+11)}
 for(let side of [-1,1]){
   const x=side*8.2,z=13.9;
   for(let j=0;j<4;j++){let a=[x,-.5-j*5.0,z+j*.85],b=[x+side*Math.sin(j*2)*.5,-5.5-j*5.0,z+(j+1)*.85];
    g.quad([a[0]-1.5,a[1],a[2]],[a[0]+1.5,a[1],a[2]],[b[0]+1.45,b[1],b[2]],[b[0]-1.45,b[1],b[2]],j%2?'#13b9e6':'#66e7ff');
    g.quad([a[0]-.39,a[1],a[2]+.03],[a[0]+.36,a[1],a[2]+.03],[b[0]+.32,b[1],b[2]+.03],[b[0]-.37,b[1],b[2]+.03],'#c5faff');
   }
   for(let j=0;j<4;j++)macroCanopy(g,[x+(j-1.5)*.75,-20,z+4.3],.65,.31,.58,'#cbffff','#82e9ff',70+j);
 }
 return g;
}
function rootSculpture21(g,color){for(let k=0;k<7;k++){let a=k*TAU/7;macroTrunk(g,[[Math.cos(a)*1.8,3,Math.sin(a)*1.8],[Math.cos(a)*6.8,1.5,Math.sin(a)*6.4],[Math.cos(a)*12,.45,Math.sin(a)*10]],[2.55,1.72,.08],color)} }
function zoanGrove21(g){
 // A1: huge lionhearted life-tree, deliberate visual weight and iconic tusk arc.
 rootSculpture21(g,'#a7672e');
 macroTrunk(g,[[0,0,0],[-1.7,6,0],[2,14,0],[-.7,21,0],[0,29,0]],[6.1,5.6,4.3,3.2,.6],'#a96931');
 for(let i=0;i<7;i++){let a=2.39996*i,r=12+(i%3)*2,y=17+(i%4)*2,tip=[Math.cos(a)*r,y+4,Math.sin(a)*r*.78];
  macroTrunk(g,[[0,8+i%3*1.8,0],[tip[0]*.58,y-2,tip[2]*.58],tip],[3.2,2.1,.32],'#ae7037');
  macroCanopy(g,add(tip,[0,3,0]),5.7,3.5,4.6,i%2?'#54c731':'#1e9e49',i%3?'#92e846':'#67d345',i+8);
 }
 macroCanopy(g,[0,31,-.6],9.6,4.4,8.0,'#62cd23','#aaec39',4);
 // Sweeping ivory horns grow from trunk, not perched on top of the crown.
 for(let side of [-1,1]){
  const ps=[[side*2.8,19,5],[side*7.2,22.9,7],[side*11.5,27.3,8],[side*12.5,31.8,8],[side*11.4,35.1,7.7]];
  macroTrunk(g,ps,[2.15,1.85,1.37,.74,.07],'#ffe1a0');
  giantBlades(g,[side*6.4,29,7.2],6.7,'#c9ee35','#f6db72',4);
 }
 // Carved integrated beast visage in the large front trunk.
 macroCanopy(g,[0,15.5,5.3],3.5,2.85,1.8,'#ca853e','#e8a451',30);
 for(let side of [-1,1]){
  shard(g,[side*1.5,16.2,7.15],[side*2.3,15.9,7.5],.64,'#253d43',5);
  shard(g,[side*2.7,15.2,6.1],[side*3.9,13.4,6.3],.87,'#ffe5ae',5);
 }
 macroCanopy(g,[0,14.2,7.1],1,.75,.55,'#ffd078','#fff0c2',5);
 runeGlyph(g,[0,10.3,5.85],2.3,'#fce18a');
 for(let j=0;j<10;j++){let a=j*2.3,p=[Math.cos(a)*10,26+(j%4)*1.2,Math.sin(a)*7];leaf(g,p,add(p,[Math.sin(a)*4,-4.7,1]),1.8,j%2?'#d5f45d':'#69c932')}
}
function zoanAscension21(g){
 // A3: mythical phoenix growth, not A1 with another animal face.
 rootSculpture21(g,'#ad7134');
 macroTrunk(g,[[0,0,0],[2,7,0],[-2,14,-.5],[1.2,22,0],[-.8,29,0],[0,35,0]],[5.4,5.0,3.9,2.8,1.5,.2],'#bb8038');
 for(let i=0;i<7;i++){let a=2.39996*i,p=[Math.cos(a)*12.8,21+i%3*2.4,Math.sin(a)*9.4];
  macroTrunk(g,[[0,10+i%3*2,0],[p[0]*.5,p[1]-3,p[2]*.4],p],[2.7,1.65,.12],'#ac6b37');
  macroCanopy(g,add(p,[0,2,0]),6,3.3,5.2,i%2?'#1a9d5c':'#65cf36',i%2?'#b5e94e':'#58ad46',i+52);
 }
 macroCanopy(g,[0,34,0],9.7,4.2,7.5,'#66d534','#b5ef44',33);
 // Massive wing-like feather boughs, dramatic and readable at phone scale.
 for(let side of [-1,1]){
  macroTrunk(g,[[side*1.8,20,5.2],[side*7,26,7.3],[side*13,29,7.8],[side*18,26.0,7]],[2.35,1.75,1,.12],'#ffe4ae');
  for(let j=0;j<7;j++){
   const base=[side*(5.0+j*1.8),26+j%3*1.2,7.6];
   const tip=[side*(8.6+j*1.65),23-j*.52,8.1];
   leaf(g,base,tip,1.3+(j%2)*.3,j%3===0?'#ff7751':j%3===1?'#fff3cd':'#ffce6a','#fdf7dd');
  }
  // Amber feathers inlaid into the trunk itself.
  for(let j=0;j<4;j++)leaf(g,[side*1,13+j*2,5.0],[side*3.8,14+j*2.7,5.4],1.0,'#e7e99b','#ffd369');
 }
 // Bird-shaped frontal beak mask, composed of two angular cheek wings.
 for(let side of [-1,1])leaf(g,[side*.7,18,4.8],[side*3.2,21,5.0],1.9,'#fbf6d9','#f8b84f');
 shard(g,[0,18.2,5.6],[0,15.3,6.7],1.25,'#ffd060',6);
 runeGlyph(g,[0,10.7,5.0],2.0,'#fff0a9');
}
function logiaConfluence21(g){
 // B1: different physical states embodied by one basalt core, with a cloud crown.
 rootSculpture21(g,'#3f3959');
 macroTrunk(g,[[0,.3,0],[-1.2,7,0],[1.6,14,-1],[-1,22,0],[.2,30,0]],[6.25,5.8,4.9,3.2,.18],'#43364d');
 for(let i=0;i<8;i++){let a=2.39996*i,r=11+(i%3),p=[Math.cos(a)*r,20+(i%4)*2.4,Math.sin(a)*r*.67];
  macroTrunk(g,[[0,10+i%3,0],[p[0]*.55,p[1]-3,p[2]*.45],p],[2.75,1.8,.20],'#554460');
  if(i%2===0){
   macroCanopy(g,add(p,[0,2.2,0]),5.7,3.1,4.2,i%4===0?'#e4f7ff':'#b6e7fa','#ffffff',80+i);
  }else{
   for(let k=0;k<5;k++){let q=add(p,[(k-2)*1.3,0,1.2]);
    leaf(g,q,add(q,[((k%2)?1:-1)*.55,5+(k%3)*1.3,0]),1.5,k%2?'#ffd55c':'#fe5d20','#ffac3c');}
  }
 }
 macroCanopy(g,[-5,29,0],9.2,4.2,7.7,'#ddeef9','#ffffff',21);
 macroCanopy(g,[6,30,-1],8.9,3.9,7.1,'#afdef4','#f2fcff',22);
 // Deliberate volcanic cracks integrated into front face of the trunk.
 for(let sign of [-1,1]){
  const ps=[[sign*2,2,5.0],[sign*1.1,7,5.3],[sign*2.7,11.5,5.0],[sign*.4,17.0,4.2]];
  macroTrunk(g,ps,[.55,.67,.40,.1],sign<0?'#ff6a1d':'#ffb42d');
  shard(g,[sign*8,.5,4],[sign*9.2,8.5,4.2],1.6,'#6bd9ff',5);
 }
 spiral3d(g,[0,14.3,0],7.0,23.5,1.52,'#00b7e8',1.25,64);
 spiral3d(g,[0,14.3,0],7.07,23.5,.30,'#c2faff',1.25,64);
 for(let s of [-1,1]){
  macroTrunk(g,[[s*7,28,3],[s*9.5,23,3],[s*7,21,3],[s*8.5,15.4,3]],[.55,.51,.40,.06],'#fff074');
 }
}
function logiaTempest21(g){
 rootSculpture21(g,'#36324f');
 macroTrunk(g,[[0,0,0],[1.7,7,-.3],[-1.8,14,0],[1.7,23,0],[0,32,0]],[6.0,5.25,4.8,2.9,.15],'#43344f');
 for(let i=0;i<8;i++){let a=2.4*i,p=[Math.cos(a)*13,21+i%4*2.5,Math.sin(a)*10];macroTrunk(g,[[0,11+i%3,0],[p[0]*.55,p[1]-2,p[2]*.5],p],[3.0,1.8,.18],'#5b4561');
  macroCanopy(g,add(p,[0,1.9,0]),6.5,3.2,5.0,i%2?'#abb8f5':'#d6ecff',i%2?'#f3fcff':'#b7d7f7',i+21);
 }
 for(let i=0;i<7;i++){let a=i*TAU/7;shard(g,[Math.cos(a)*9,1,Math.sin(a)*8],[Math.cos(a)*9.3,9+(i%3)*2,Math.sin(a)*8],1.45,'#67dbfa',6)}
 spiral3d(g,[0,15,0],9,23,1.7,'#28d2f1',1.8,75);
 spiral3d(g,[0,15,0],9.3,23,.42,'#fff5bb',1.8,75);
 for(let i=0;i<7;i++){let a=i*TAU/7;const p=[Math.cos(a)*4,8+i%3*3,Math.sin(a)*4];
  leaf(g,p,add(p,[.8,8.0+(i%3)*1.2,0]),1.65,i%2?'#ffba3b':'#f85b20','#ffe37a');
 }
 for(let s of [-1,1])macroTrunk(g,[[s*9,27,2],[s*11,22,2],[s*8,20,2],[s*9,15,2]],[.6,.52,.46,.09],'#ffdf49');
}
function parameciaNexus21(g){
 // C2: orbiting reality, asymmetric living pink canopy and large 3D golden impossible loops.
 rootSculpture21(g,'#b62d84');
 macroTrunk(g,[[0,0,0],[2.9,7,.1],[-2.4,13,0],[2.5,20,0],[-1.3,27,0],[1.5,33,-.5]],[6.2,5.4,4.5,3.5,2.4,.20],'#c12b88');
 for(let i=0;i<7;i++){let a=i*2.4,p=[Math.cos(a)*12,17+(i%4)*2.6,Math.sin(a)*10];macroTrunk(g,[[0,9+i%4*1.2,0],[p[0]*.57,p[1]-3,p[2]*.52],p],[3.1,1.9,.12],'#cb368f');
  macroCanopy(g,add(p,[0,2.6,0]),5.8,3.5,4.8,i%2?'#f758b5':'#ed86d1',i%2?'#ffc3e7':'#ff99d4',30+i);
 }
 macroCanopy(g,[1,33,0],9,4.4,8.2,'#ff71ca','#ffc0ed',42);
 // Three offset elliptical 3D portal loops, deliberately visible independently from the tree.
 for(let ring=0;ring<3;ring++){
  const pts=Array.from({length:49},(_,i)=>{let a=i*TAU/48;return [ring===0?5+6.7*Math.cos(a):-4+7.1*Math.cos(a),ring===2?28+5.8*Math.sin(a):18+4.7*Math.sin(a)+ring*2,ring===1?7.6+2*Math.cos(a):6.8+Math.sin(a)*1.9]});
  tube(g,pts,ring===1?.84:ring===2?.57:.69,ring===1?'#ffe47b':ring===2?'#b8f6ff':'#ffd453',8);
 }
 spiral3d(g,[0,12,0],7.5,22,1.25,'#ffd65c',1.6,64);
 for(let i=0;i<12;i++){let a=i*TAU/12,p=[Math.cos(a)*(11+i%2*2),9+i%5*4,Math.sin(a)*9];
  shard(g,p,add(p,[1.2,1.8,.8]),i%3===0?1.12:.62,i%3===0?'#ffdb61':i%2?'#9f70ed':'#ffbce9',5);
 }
 runeGlyph(g,[0,10.6,5.85],2.9,'#ffdc70');
}
function parameciaBloom21(g){
 rootSculpture21(g,'#a63583');
 macroTrunk(g,[[0,0,0],[-2.6,6,0],[2.8,14,0],[-2.4,21,0],[0,31,0]],[6,5.2,4.3,3,.3],'#c6449a');
 for(let i=0;i<9;i++){let a=i*2.4,p=[Math.cos(a)*11.5,18+i%4*2.5,Math.sin(a)*8.6];macroTrunk(g,[[0,11+i%3,0],[p[0]*.6,p[1]-2,p[2]*.5],p],[3.1,1.8,.15],'#b83f91');
  macroCanopy(g,add(p,[0,2,0]),5.6,3.1,5.0,i%2?'#ff7bbd':'#f55ea8',i%2?'#ffc2e0':'#ffa1d1',i+19);
  for(let j=0;j<4;j++){let ang=j*TAU/4;leaf(g,p,add(p,[Math.cos(ang)*4.5,4,Math.sin(ang)*4]),1.8,'#ffabd8','#fff1cb')}
 }
 macroCanopy(g,[0,33,0],8.0,4.0,7,'#e875ca','#ffd6f4',12);
 spiral3d(g,[0,13,0],8,25,1.28,'#ffd04a',1.65,70);
 for(let i=0;i<9;i++){let a=i*TAU/9;const q=[Math.cos(a)*8,1.2,Math.sin(a)*8];shard(g,q,add(q,[1.4,2,0]),.8,'#ffa0dc',6)}
 runeGlyph(g,[0,10.5,5.4],2.5,'#ffe188');
}
function makeTree21(ci,variant=0){
 const g=new Mesh();
 if(ci===0)(variant===0?zoanGrove21:zoanAscension21)(g);
 else if(ci===1)(variant===0?logiaConfluence21:logiaTempest21)(g);
 else (variant===0?parameciaNexus21:parameciaBloom21)(g);
 familyArms21(g,ci,variant);
 return g;
}
function familyArms21(g,ci,variant){
 const colors=['#b7773c','#493f68','#bd3f87'];
 for(let i=0;i<groups[ci].length;i++){
  let p=anchorFor(ci,i),from=[p[0]*.10,12.8+(i%4)*1.5,p[2]*.13],mid=[p[0]*.65,p[1]+3,p[2]*.63-1.8];
  macroTrunk(g,[from,mid,add(p,[0,2.8,0])],[1.55,1.05,.15],colors[ci]);
  leaf(g,add(p,[-1.3,2.1,-.2]),add(p,[1.45,2.7,.3]),.78,['#7ed63e','#a9ebff','#ffb7db'][ci]);
 }
}
function genericFruit21(ci,seed=0){
 const g=new Mesh(),base=[['#4bae42','#69d64b','#9bee36'],['#18b7e7','#77dbe9','#ff6b26'],['#ff70ad','#b67ced','#ffbc68']][ci],color=base[(seed+3)%3];
 blob(g,[0,0,0],[.82,.91,.76],color,seed+30,10,5);
 macroTrunk(g,[[0,.68,0],[.08,1.05,.03],[.26,1.13,0]],[.13,.09,.04],'#658c35');
 leaf(g,[0,1.03,0],[.52,1.21,-.03],.25,'#62bd4c','#bce967');
 planeSpiral(g,[0,.05,.74],.29,'#ffe8ad',1.35,.046,20);
 return g;
}
function specialFruit21(d){
 const name=d.name,id=d.id,g=new Mesh();
 const col=(()=>{
 if(/Nika/.test(name))return ['#9672d8','#eee3ff','#d2bdf6'];
 if(/Ope Ope/.test(name))return ['#f5a6b2','#ec6084','#fff0ce'];
 if(/Mera Mera/.test(name))return ['#ff7b39','#ffc351','#fff2a2'];
 if(/Seiryu/.test(name))return ['#00abd3','#68e0e7','#d6fffa'];
 if(/Suna Suna/.test(name))return ['#e9ad50','#ffe09c','#fff0b9'];
 if(/Mochi/.test(name))return ['#f3e3b2','#fff5de','#e3cc9b'];
 if(/Yami Yami/.test(name))return ['#7149a8','#a88cd9','#d7c6ef'];
 if(/Mero Mero/.test(name))return ['#f57393','#f9bdce','#fff1d9'];
 if(/Hito Hito/.test(name))return ['#e54f62','#ff90a2','#fff1cc'];
 if(/Hana Hana/.test(name))return ['#e979b7','#ffc1eb','#ffffff'];
 if(/Giraffe/.test(name))return ['#e5a448','#ffd080','#fff0b3'];
 if(d.cls==='Logia')return ['#3fc4e7','#83dff0','#ffe39a'];
 if(d.cls==='Zoan')return ['#efab64','#ffc476','#ffe39c'];
 return ['#a56cdd','#d3aaf0','#f3d9ff'];})();
 if(/Ope Ope/.test(name)){
  for(let s of [-1,1])macroCanopy(g,[s*.46,.36,0],.62,.73,.59,col[1],col[0],id+s);
  g.tri([-.97,.31,.15],[0,-1.25,.15],[0,.17,.62],col[0]);g.tri([0,-1.25,.15],[.97,.31,.15],[0,.17,.62],col[0]);
 }else if(/Giraffe/.test(name)){
  for(let j=0;j<6;j++){let a=j*TAU/6;let pts=Array.from({length:11},(_,k)=>{let t=k/10;return [Math.cos(a)*(.28+.44*t)+.22*Math.sin(Math.PI*t),1.12-2.1*t,Math.sin(a)*(.28+.44*t)]});tube(g,pts,pts.map((_,i)=>.1+.19*Math.sin(Math.PI*i/10)),j%2?col[0]:col[1],7)}
 }else if(/Hana Hana/.test(name)){
  for(let k=0;k<11;k++){let a=k*TAU/11;leaf(g,[0,0,0],[Math.cos(a)*1.3,.13,Math.sin(a)*1.2],.45,k%2?col[0]:col[1],col[2]);}
  macroCanopy(g,[0,0,0],.44,.43,.45,'#ffcb66','#fff1a3',3);
 }else if(/Mochi/.test(name)){
  macroCanopy(g,[0,.28,0],1.02,.7,.88,col[0],col[1],id);macroCanopy(g,[0,-.55,0],.70,.42,.71,col[1],col[2],id+1);
 }else{
  let shape=/Nika/.test(name)?[.99,1.06,.95]:/Mera/.test(name)?[.83,1.03,.74]:[.91,1.07,.84];
  blob(g,[0,0,0],shape,col[0],id,12,7);
  if(/Mera/.test(name))for(let k=0;k<8;k++){let a=k*TAU/8;leaf(g,[Math.cos(a)*.4,.75,Math.sin(a)*.4],[Math.cos(a)*.58,1.57+Math.sin(k)*.12,Math.sin(a)*.58],.33,k%2?'#ff5b2b':'#ffda4e','#fff2ab')}
 }
 macroTrunk(g,[[0,.89,0],[.03,1.21,.02],[.36,1.34,.09]],[.15,.09,.04],'#6e9740');
 leaf(g,[.06,1.16,0],[.60,1.34,-.1],.29,'#57aa49','#b4e173');
 if(!/Hana Hana/.test(name)){
  // Sculpted frontal spirals: visually apparent at mobile inspection size.
  for(let k=0;k<5;k++){
   let a=k*TAU/5,x=Math.cos(a)*.41,y=Math.sin(a)*.49;
   const z=.80*Math.sqrt(Math.max(.3,1-(x*x/.99+y*y/1.25)));
   planeSpiral(g,[x,y,z+.03],.18,col[2],1.42,.052,26);
  }
  planeSpiral(g,[0,.03,.91],.35,col[2],1.7,.067,30);
 }
 return g;
}
function familyBranch21(ci){const g=new Mesh(),stem=['#a66a38','#505772','#bf498e'][ci];
 macroTrunk(g,[[-7,-2.7,0],[-4.2,-1.25,0],[0,0,0],[4.3,-1.1,0],[8,-2.5,0]],[.28,.72,1,.72,.23],stem);
 for(let s of [-1,1])leaf(g,[s*3.2,-1.6,0],[s*5.4,-.3,.2],.85,ci===2?'#f8a2d0':ci===1?'#a9dcea':'#7adb49');
 return g;
}
