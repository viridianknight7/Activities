/* V26 – Three independent volumetric, macro-faceted legendary trees. V25 is the
   exclusive source. The geometry is genuinely 3D, not planes or billboards. */
const P26={
  zo:{bark:'#a46737',lit:'#cc8b4b',dark:'#713f25',leaf:['#217939','#369f3f','#70c84d','#a4df57','#0f614a'],bone:'#ffdf9e'},
  lo:{stone:'#3c3554',ridge:'#62506c',dark:'#242542',magma:'#f15b29',ember:'#ffc249',water:'#2cc6e6',ice:'#a9e9ef'},
  pa:{trunk:'#a52b89',bright:'#da469f',shade:'#66216e',pink:'#f87ab7',petal:'#ffc5db',gold:'#f8c65f',aqua:'#8ed8d6'}
};
function v26Bulge(g,p,r,c,s=31){v25orb(g,p,r,c,s)}
function v26Stem(g,pts,r,c,s=9){tube(g,pts,r,c,s)}
function v26Frond(g,origin,tip,w,c1,c2){v25Petal(g,origin,tip,w,1.75,c1,c2)}
function v26Crown(g,p,scale,seed){
  // Thick multi-lobed canopy. Seven-sided sub-crowns occupy all three axes.
  let z=P26.zo.leaf;
  v26Bulge(g,p,[scale*1.05,scale*.63,scale*.86],[z[1],z[2],z[0]],seed);
  for(let k=0;k<9;k++){
    const a=(k/9)*TAU+.15*seed,y=(k%3-1)*scale*.12;
    const base=add(p,[Math.cos(a)*scale*.35,y,Math.sin(a)*scale*.33]);
    const top=add(p,[Math.cos(a)*scale*(.88+(k%2)*.14),y+scale*(.35+(k%4)*.06),Math.sin(a)*scale*.95]);
    v26Frond(g,base,top,scale*.23,z[(k+seed)%5],z[(k+seed+1)%5]);
  }
  for(let k=0;k<4;k++){
    let a=k*TAU/4+.25;
    v26Bulge(g,add(p,[Math.cos(a)*scale*.65,scale*.18,Math.sin(a)*scale*.5]),[scale*.47,scale*.34,scale*.45],[z[0],z[2]],seed+k+100);
  }
}
function v26Zoan(g){
 const c=P26.zo;
 // Four broad buttress pairs give a heavy animal-like planted stance.
 for(let i=0;i<11;i++){
  let a=i*TAU/11;
  v26Stem(g,[[Math.cos(a)*2,7,Math.sin(a)*2],[Math.cos(a)*6,3.0,Math.sin(a)*6],[Math.cos(a)*14.6,.2,Math.sin(a)*13.5]],[4.1,2.9,.10],i%3===0?c.lit:c.bark);
 }
 v26Stem(g,[[0,0,0],[-1,11,1.1],[2,22,-.6],[-1.5,34,1.0],[0,49,-1]], [10.5,9.4,7.9,5.2,1.45],c.bark,13);
 // Growth seams are carved through the front and back rather than drawn in flat text.
 for(let i=0;i<8;i++){
  let a=i*TAU/8;
  let pts=[[Math.cos(a)*8.7,6,Math.sin(a)*8.7],[Math.cos(a+.13)*8.15,15,Math.sin(a+.13)*8.15],[Math.cos(a+.19)*6.8,24,Math.sin(a+.19)*6.8],[Math.cos(a+.21)*4.5,33,Math.sin(a+.21)*4.5]];
  v26Stem(g,pts,[.62,.51,.39,.08],i%3===0?c.dark:c.lit,6);
 }
 // Massive natural antlers visibly emerge from the structure, with several tines.
 for(const side of [-1,1]){
  let pts=[[side*4,28,0],[side*7,36,2],[side*11,43,3],[side*16,48,4],[side*18,54,2.8]];
  v26Stem(g,pts,[3.7,2.6,1.7,.9,.03],c.lit,9);
  for(let j=0;j<3;j++){
   let b=pts[j+1],t=add(b,[side*(3.5+j*1.2),5.8+j*.9,-(j%2)*1.6]);
   v26Stem(g,[b,add(b,[side*2,2.3,0]),t],[1.55,.85,.04],c.bone,7);
  }
 }
 // A subtle animal-mask core, but NOT a pasted 2D mascot face.
 v26Bulge(g,[0,23,7.1],[6.8,5.9,4.2],[c.lit,c.bark],33);
 for(const s of [-1,1]){
  v26Frond(g,[s*3.2,25.0,10.0],[s*8.9,30.2,9.1],2.7,c.lit,c.bark);
  v26Bulge(g,[s*2.7,23.8,10.75],[.95,.88,.36],'#f3dca0',40+s);
  v26Bulge(g,[s*2.7,23.7,11.05],[.37,.49,.21],'#1e473c',44+s);
 }
 v26Bulge(g,[0,21.4,11.25],[1.6,1.1,.85],c.dark,45);
 v25Spiral(g,[0,12.3,8.65],3.1,c.bone,1.9,.29);
 // Crown branches spiral all around the camera so the tree is full in oblique views.
 for(let i=0;i<12;i++){
  let a=i*2.39996,r=11.8+(i%4)*1.4,y=35+(i%4)*3.5;
  const end=[Math.cos(a)*r,y,Math.sin(a)*r];
  v26Stem(g,[[0,23+i%4,0],[end[0]*.48,y-6,end[2]*.46],end],[4.6,3.3,.24],i%3===0?c.lit:c.bark,9);
  v26Crown(g,add(end,[0,4.4,0]),6.4+(i%3)*.8,i+7);
 }
 v26Crown(g,[0,54,-2],9.5,29);
 for(let k=0;k<7;k++){
   let a=k*TAU/7;
   v26Frond(g,[Math.cos(a)*8,57,Math.sin(a)*7],[Math.cos(a)*15.5,64+(k%2)*2,Math.sin(a)*14],3.8,c.leaf[(k+1)%5],c.leaf[4]);
 }
}
function v26Cloud(g,p,sz,seed){
 const c=P26.lo;
 v26Bulge(g,p,[sz*1.1,sz*.51,sz*.9],[c.ice,'#c7e8ea','#a4c4db'],seed);
 for(let i=0;i<6;i++){
  let a=i*TAU/6;
  v26Bulge(g,add(p,[Math.cos(a)*sz*.63,(i%3-1)*.8,Math.sin(a)*sz*.58]),[sz*.47,sz*.45,sz*.42],i%2?'#e5f5fa':'#9ac4d3',seed+i+31);
 }
}
function v26Fire(g,p,height,seed){
 let cols=['#ffb830','#eb501c','#ff7a28','#ffe268'];
 // Curling tongues originate in the rock and taper, never simple orange triangles.
 for(let i=0;i<7;i++){
  let a=i*TAU/7,dx=Math.cos(a),dz=Math.sin(a),q=add(p,[dx*2,0,dz*2]);
  v26Stem(g,[q,add(q,[dx*1.5,height*.44,dz*1.1]),add(q,[dx*3.3,height*.79,dz*2]),add(q,[dx*(3.5+i%3),height*(1.12-i%3*.06),dz*2.5])],[2.4,2.0,.9,.015],cols[(i+seed)%3],7);
  if(i%2===0)v26Frond(g,add(q,[dx*1.2,height*.42,dz]),add(q,[dx*3.3,height*.90,dz*2.5]),1.6,cols[3],cols[1]);
 }
}
function v26Logia(g){
 const c=P26.lo;
 // Steep geological buttress columns and a rising fragmented volcanic spine.
 for(let i=0;i<10;i++){
  let a=i*TAU/10;
  v26Stem(g,[[0,9,0],[Math.cos(a)*8.7,2,Math.sin(a)*8.3],[Math.cos(a)*15.8,.15,Math.sin(a)*14.5]],[3.1,2,.07],i%2?c.stone:c.ridge,8);
 }
 v26Stem(g,[[0,0,0],[-2,12,1],[3,25,-1.5],[0,37,1],[2,49,-2]], [10.2,9.7,7.1,5.2,1.0],c.stone,11);
 for(let i=0;i<8;i++){
  let a=i*2.4,base=[Math.cos(a)*6,7+i%3*3,Math.sin(a)*6];
  shard(g,base,add(base,[Math.cos(a)*2,7+(i%4)*3,Math.sin(a)*2]),2.6,i%3===0?'#81a7b6':c.ridge,6);
 }
 // Wide, separated, physical branches carry different phases of the elements.
 for(let i=0;i<8;i++){
  let a=i*TAU/8+.15,p=[Math.cos(a)*14.5,37+(i%3)*4,Math.sin(a)*13];
  v26Stem(g,[[0,24,0],[p[0]*.55,30,p[2]*.52],p],[4.2,2.5,.15],i%2?c.stone:c.ridge,10);
  if(i<4){v26Cloud(g,add(p,[0,4.0,0]),6.1+(i%2),i+11);for(let k=0;k<3;k++){
    let z=add(p,[k*2.4-2.4,-.8,1.1]);v26Stem(g,[z,add(z,[-1.3,-3.3,0]),add(z,[2.3,-6.5,.1])],[.37,.32,.03],k%2?'#ffee6a':'#ffcf28',5);
  }}else{v26Fire(g,add(p,[0,2,0]),12+(i%2)*3,i)}
 }
 v26Cloud(g,[1,53,-4],7.1,31);
 // The opposing flowing elements wind around the stone through space.
 const spiral=(rise,radius,turns,color,width,phase=0)=>{
  let points=[];for(let i=0;i<=78;i++){let t=i/78,a=t*TAU*turns+phase;
   points.push([Math.cos(a)*(radius+(1-t)*1.8),5+t*rise,Math.sin(a)*(radius+(1-t)*1.8)]);
  }
  v26Stem(g,points,points.map((_,i)=>width*(1-.52*i/79)),color,9);
 };
 spiral(46,10.0,1.43,c.water,2.35,.2);
 spiral(39,8.5,1.24,'#89f2f2',.74,.8);
 spiral(36,7.5,1.1,c.magma,1.40,Math.PI);
 spiral(33,7.9,1.1,'#ffd85e',.48,Math.PI+.15);
 for(let i=0;i<9;i++){
  let a=i*TAU/9,p=[Math.cos(a)*13.6,1,Math.sin(a)*12.4];
  shard(g,p,add(p,[Math.cos(a)*1.1,7.5+i%4*2.3,Math.sin(a)*1.1]),1.9,i%3===0?'#a7f8fe':'#38c6e4',6);
 }
}
function v26PetalRing(g,p,r,seed){
 const c=P26.pa;
 // Huge geometric flower cups made of individually raised 3D planes.
 v26Bulge(g,p,[r*.46,r*.36,r*.46],[c.gold,c.bright],31+seed);
 for(let i=0;i<8;i++){
  let a=i*TAU/8+.12*seed;
  const base=add(p,[Math.cos(a)*r*.35,-r*.10,Math.sin(a)*r*.35]);
  const end=add(p,[Math.cos(a)*r*1.10,r*(.30+(i%3)*.07),Math.sin(a)*r*1.15]);
  v26Frond(g,base,end,r*.38,i%3===0?c.petal:c.pink,i%2?c.bright:c.shade);
 }
 for(let i=0;i<4;i++){
  let a=i*TAU/4+.3;
  const base=add(p,[Math.cos(a)*r*.3,r*.42,Math.sin(a)*r*.3]);
  const tip=add(p,[Math.cos(a)*r*.67,r*1.12,Math.sin(a)*r*.65]);
  v26Frond(g,base,tip,r*.23,c.petal,c.bright);
 }
}
function v26Para(g){
 const c=P26.pa;
 for(let i=0;i<9;i++){let a=i*TAU/9;
  v26Stem(g,[[Math.cos(a)*1.1,7,Math.sin(a)*1.1],[Math.cos(a)*7,2.5,Math.sin(a)*6.8],[Math.cos(a)*15.4,.25,Math.sin(a)*14]],[3.7,2.8,.1],i%3?c.trunk:c.shade,9);
 }
 // Interwoven triple trunks give true 360° volume with separated negative space.
 for(let k=0;k<3;k++){
  let arr=[];for(let i=0;i<=35;i++){let t=i/35,a=k*TAU/3+t*TAU*1.25;
   arr.push([Math.cos(a)*(5.2-t*2),.2+t*51,Math.sin(a)*(5.5-t*2)]);
  }
  v26Stem(g,arr,arr.map((_,i)=>Math.max(.40,5.8-i*.14)),[c.trunk,c.bright,c.shade][k],10);
 }
 // Sculptural branches describe impossible twisting paths into three-dimensional petals.
 for(let i=0;i<9;i++){
  let a=i*2.39996,rr=11.8+(i%3)*2,y=35+(i%4)*3.5,p=[Math.cos(a)*rr,y,Math.sin(a)*rr];
  v26Stem(g,[[0,21,0],[p[0]*.63,y-5,p[2]*.63],p],[4.2,3.0,.2],i%2?c.trunk:c.shade,10);
  v26PetalRing(g,add(p,[0,3.8,0]),5.9+(i%3)*.4,i);
 }
 v26PetalRing(g,[0,55,-1],8.8,11);
 // Spatial portals in perpendicular and oblique planes, not flat stick-on discs.
 for(let k=0;k<3;k++){
   let ps=[],center=[[3,38,1],[-5,45,-3],[2,30,-6]][k];
   for(let j=0;j<=70;j++){
    let a=j*TAU/70;
    ps.push(add(center,k===0?[Math.cos(a)*9,Math.sin(a)*10,Math.cos(a)*5]:k===1?[Math.sin(a)*7,Math.cos(a)*9,Math.sin(a)*9]:[Math.cos(a)*10,Math.sin(a)*7,Math.cos(a)*8]));
   }
   v26Stem(g,ps,ps.map(()=>k===0?1.25:.70),k===0?c.gold:k===1?c.aqua:c.petal,9);
 }
 let rings=[];for(let i=0;i<=90;i++){
  let t=i/90,a=t*TAU*1.65+.8;
  rings.push([Math.cos(a)*9.2,5+39*t,Math.sin(a)*10]);
 }
 v26Stem(g,rings,rings.map((_,i)=>1.52*(1-.3*i/90)),c.gold,9);
 v25Spiral(g,[0,14.8,8.8],3.0,c.gold,1.8,.32);
 for(let i=0;i<12;i++){
  let a=i*2.4,rr=14+(i%3)*3;
  v26Bulge(g,[Math.cos(a)*rr,21+(i%7)*4,Math.sin(a)*rr],[1.45,1.6,1.6],i%2?'#eb9fcf':'#a0d3d8',i+120);
 }
}
function makeTree26(ci){const g=new Mesh();[v26Zoan,v26Logia,v26Para][ci](g);v25FamilyBoughs(g,ci);return g}
function island26(ci){const g=island25(ci);const tint=[['#90ce5d','#c2df7a'],['#73c4b4','#dbd7ad'],['#bd8db5','#d5b0cf']][ci];
 // Isolated thick carved stones and miniature vegetation personalise the rim while
 // preserving a coherent series of enormous generic floating islands.
 for(let i=0;i<12;i++){
  let a=i*TAU/12+.22,rad=19.5+i%3*.7,p=[Math.cos(a)*rad,.65,Math.sin(a)*rad*.84];
  v26Bulge(g,p,[1.75,.85,1.62],[tint[0],tint[1]],70+i);
 }
 return g;
}
function familyBranch26(ci){
 const g=new Mesh(),base=[P26.zo.bark,P26.lo.stone,P26.pa.trunk][ci],hi=[P26.zo.lit,P26.lo.ridge,P26.pa.bright][ci];
 // Open curved cantilever. Fruit hang underneath, no oversized roof geometry.
 v26Stem(g,[[-12.4,-.7,-1.3],[-8.2,1.3,-.4],[-4,2.2,1],[0,2.6,1.6],[4,2.2,1],[8.2,1.3,-.4],[12.4,-.7,-1.3]],
  [.4,.84,1.18,1.18,1.18,.84,.4],[base,hi],8);
 for(const x of [-4.1,0,4.1])v26Stem(g,[[x,2.4,1],[x,-.5,1],[x,-1.5,1.2]],[.16,.13,.03],ci===0?'#b58c59':ci===1?'#b4deee':'#e6ad90',5);
 for(const side of [-1,1])v26Frond(g,[side*8,1,-.4],[side*11,2.2,-2],1.3,
   ci===0?'#4db742':ci===1?'#95dce9':'#ef8fc1',ci===0?'#abd856':ci===1?'#d9f8fc':'#ffcee4');
 return g;
}
