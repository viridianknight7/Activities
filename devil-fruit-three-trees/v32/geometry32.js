/* V32 — Reference-led volumetric low-poly spirit-tree model refresh.
 * Extends exact verified V31 engine. 3 independent meshes, no billboards,
 * no facial construction on Zoan, no class-design variant controls. */
const V32 = {
 zo:{wood:['#7c3e23','#9d4b26','#bf6630','#de8b44','#f6b15b'],green:['#064f31','#076932','#148334','#249e35','#38ad3e','#66c840','#8add42','#b4ed4d','#d3fa63'],moon:'#f8cf5b'},
 lo:{wood:['#1b192d','#29233b','#3d2a49','#513557','#74516a'],fire:['#a82424','#d52b1d','#f44719','#ff6c20','#ffa52d','#fff06a'],cloud:['#352753','#463363','#5b427f','#735a9b','#9379b8','#c1b1d8'],ice:['#1275bd','#218bd4','#24b0ef','#57d5ff','#93eafe','#dcffff']},
 pa:{wood:['#fef6df','#fbe2d6','#edb7c6','#d989aa','#c365a1'],bloom:['#772b68','#9b3678','#c34486','#e85d96','#f783ab','#ffacc4','#ffd3df','#fff1db'],gold:'#ffd166'}
};
const v32Grow=(g,pts,r,col,n=11)=>tube(g,pts,r,col,n);
const v32Orb=(g,p,r,pal,seed)=>blob(g,p,r,pal,seed,10,7);
function v32Branch(g,start,end,thick,color,seed=0){
 const sx=start[0],sy=start[1],sz=start[2],ex=end[0],ey=end[1],ez=end[2];
 const p=[start,[sx+(ex-sx)*.27+Math.sin(seed*2.7)*1.4,sy+(ey-sy)*.28,sz+(ez-sz)*.20],
 [sx+(ex-sx)*.63-Math.sin(seed*1.4)*1.5,sy+(ey-sy)*.72,sz+(ez-sz)*.70],end];
 v32Grow(g,p,[thick,thick*.79,thick*.44,.09],color,9);
}
function v32LeafMass(g,p,r,seed,colors){
 // Irregular closed surface. A face's colour responds to lighting direction
 // and a deterministic facet hash instead of height-indexed horizontal rings.
 const N=21,M=13,rings=[];let phase=seed*.371;
 for(let j=0;j<=M;j++){
  let t=j/M,lat=-Math.PI/2+t*Math.PI,ring=[];
  for(let k=0;k<N;k++){
   let a=k*TAU/N+phase;
   let warp=1+.070*Math.sin(3*a+seed*1.1+t*4.4)+.025*Math.cos(6*a+t*6+seed);
   let rad=Math.cos(lat)*warp*(1+.04*Math.sin(seed*2+k*1.9));
   ring.push([p[0]+Math.cos(a)*r[0]*rad,
    p[1]+r[1]*(Math.sin(lat)+.055*Math.cos(a*4+seed)*Math.cos(lat)),
    p[2]+Math.sin(a)*r[2]*rad*(1+.065*Math.sin(a*5+seed*.7))]);
  }rings.push(ring);
 }
 for(let j=0;j<M;j++)for(let k=0;k<N;k++){
  const a=rings[j][k],b=rings[j][(k+1)%N],c=rings[j+1][(k+1)%N],d=rings[j+1][k];
  // Facet normals color different directions. A subtle latitude bias gives
  // a bright crown but avoids the old repetitive layered hamburger bands.
  const z=(a[2]+b[2]+c[2]+d[2])/4-p[2],
        h=(a[1]+b[1]+c[1]+d[1])/4-p[1],
        side=(a[0]+b[0]+c[0]+d[0])/4-p[0];
  const sun=.46*(h/r[1])-.22*(side/r[0])+.15*(z/r[2]);
  const theta=(k+.5)*TAU/N+phase;
  const variation=.61*Math.sin(theta*2.4+seed*.35)+.34*Math.cos(theta*4.6+j*.23+seed*.17);
  const idx=Math.max(0,Math.min(colors.length-1,Math.round((colors.length-1)*(.54+sun*.30+variation*.085))));
  const idx2=idx;
  g.tri(a,b,d,colors[idx]);g.tri(b,c,d,colors[idx2]);
 }
 // Leaf rosettes become part of the rim: articulated and offset in Y and Z.
 for(let j=0;j<4;j++){
  const a=j*TAU/4+seed*.43,dx=Math.cos(a),dz=Math.sin(a);
  const at=[p[0]+dx*r[0]*.63,p[1]+r[1]*(.12+.09*Math.sin(j+seed)),p[2]+dz*r[2]*.68];
  const tip=[p[0]+dx*r[0]*(1.08+.13*(j%2)),p[1]+r[1]*(.40+.12*(j%3)),p[2]+dz*r[2]*1.12];
  v28Frond(g,at,tip,[dx,.45,dz],r[0]*.13,.85,[colors[4],colors[6],colors[2],colors[0]]);
 }
}
function v32Lunar(g,base,scale,angle,sign=1){
 // Irregular crescent following living cambium, physically extruded in Z.
 const pts=[];for(let i=0;i<=43;i++){
  const t=i/43,a=(.15+1.6*t)*Math.PI;
  const rad=scale*(1-.17*t);
  pts.push([base[0]+sign*Math.cos(a)*rad*Math.cos(angle),base[1]+Math.sin(a)*rad*.63,base[2]+Math.cos(a)*rad*Math.sin(angle)+Math.sin(t*Math.PI)*2.4]);
 }
 v32Grow(g,pts,pts.map((_,i)=>.99*(1-i/75)),V32.zo.moon,10);
 const inner=pts.map(q=>[q[0],q[1]-.35,q[2]+.35]);v32Grow(g,inner,inner.map(()=>.13),'#fff6ba',7);
}
function v32Zoan(g){const c=V32.zo;
 // Great oak base and asymmetric wide-rooted cathedral framework.
 for(let i=0;i<13;i++){
  let a=i*TAU/13+.13,dx=Math.cos(a),dz=Math.sin(a),reach=27+(i%4)*2.3;
  v32Grow(g,[[0,10,0],[dx*9,4.9,dz*9],[dx*reach*.70,1.2,dz*reach*.75],[dx*reach,.12,dz*reach*.88]],
   [8,5.4,2.2,.045],i%4===0?c.wood[3]:c.wood[i%3],11);
 }
 v31Spine(g,[[0,0,0],[1.6,17,0],[-2.4,35,-1],[2.5,51,0],[-2.3,69,-5],[1,83,-5]],
  [17.2,15.8,13.2,10.2,6.1,.08],[c.wood[0],c.wood[2],c.wood[3]],c.wood[4]);
 // Broad angled paired branches, each with rear layers and support.
 const arms=[[-41,58,22],[-30,75,37],[-6,84,38],[27,74,37],[45,56,20],
             [-43,61,-24],[-28,76,-37],[0,85,-42],[31,78,-36],[46,61,-22],[-10,98,-5],[18,93,4]];
 arms.forEach(([x,y,z],i)=>{
  const root=[(i%4-2)*1.7,29+(i%5)*3.2,-1],mid=[x*.46,y-19,z*.43],end=[x,y,z];
  v32Grow(g,[root,mid,[x*.79,y-8,z*.84],end],[9,6.8,3.5,.05],[c.wood[0],c.wood[1+i%3],c.wood[3]],11);
  if(i%3===0)v32Branch(g,mid,[x*.73,y+1,z*.62],2.2,c.wood[2],i);
 });
 // Trunk engravings are a few growth-lines and planar amber cuts; no face.
 for(let i=0;i<11;i++){
  let a=i*TAU/11+.28,arr=[];for(let j=0;j<=6;j++){let t=j/6,angle=a+t*.35,rad=15-8*t;
   arr.push([Math.cos(angle)*rad,6+t*67,Math.sin(angle)*rad]);}
  v32Grow(g,arr,[.62,.56,.46,.34,.22,.14,.04],i%3?c.wood[2]:c.wood[4],6);
 }
 // Two *non-mirrored* moon-cambium arcs on genuinely supported outgrowth.
 v32Branch(g,[-14,47,18],[-40,61,43],3.1,c.wood[3],3);v32Lunar(g,[-40,66,45],8.2,.36,1);
 v32Branch(g,[19,48,13],[44,60,41],2.5,c.wood[2],7);v32Lunar(g,[44,66,42],5.9,-.30,-1);
 // Denser, smaller overlaid facet masses versus repetitive front-facing disks.
 const canopy=[[-38,72,24,16,12,17],[-21,84,39,18,13,19],[1,90,33,18,14,18],
 [24,81,40,17,13,18],[43,68,22,14,11,16],[-41,70,-29,16,13,17],
 [-22,86,-39,17,14,18],[3,95,-37,20,14,20],[26,87,-34,18,14,18],
 [43,71,-26,15,12,17],[-8,103,-3,19,14,19],[17,106,8,16,13,16]];
 canopy.forEach(([x,y,z,rx,ry,rz],i)=>{
  v32Branch(g,[x*.65,y-13,z*.68],[x,y,z],2.6,c.wood[2],i);
  v32LeafMass(g,[x,y,z],[rx,ry,rz],i*3.7+4,c.green);
 });
 // Short seedling offshoots keep the lower section recognisably alive.
 for(let i=0;i<7;i++){let a=i*TAU/7+1.2,x=Math.cos(a)*21,z=Math.sin(a)*18;
  v32Branch(g,[x*.4,16,z*.45],[x,26+(i%3)*3,z],2.0,c.wood[2],i+6);
  v28Frond(g,[x,25,z],[x*1.2,29+(i%3)*2,z*1.2],[0,1,0],1.8,1.1,[c.green[4],c.green[6],c.green[2],c.green[0]]);
 }
}
function v32FlaringFire(g,from,width,height,seed){const c=V32.lo;
 // A fully thick, arcing 3D body of fire growing from its charcoal branch.
 const path=[];for(let j=0;j<=13;j++){
  let t=j/13;path.push([from[0]-t*width*.75+3.1*Math.sin(t*3.8+seed),
    from[1]+height*t+Math.sin(t*Math.PI)*1.6,
    from[2]+Math.sin(t*3+seed)*width*.35]);
 }
 const widths=path.map((_,i)=>{let t=i/13;return Math.max(.04,width*Math.sin(Math.PI*(.012+.97*t))**.77*(1-.30*t))});
 surface30(g,path,widths,[c.fire[1],c.fire[2],c.fire[3],c.fire[4],c.fire[5]],
    [c.fire[0],c.fire[1],c.fire[2]],[c.fire[0],c.fire[1],c.fire[2]]);
 // Split tongue at different Y and Z, not row of identical flags.
 const q=path[5];if(seed%2===0){const side=[q,[q[0]-width*.50,q[1]+height*.30,q[2]+width*.3],[q[0]-width*.65,q[1]+height*.55,q[2]+width*.58]];
  surface30(g,side,[width*.30,width*.45,.015],[c.fire[3],c.fire[4],c.fire[5]],[c.fire[1]],[c.fire[0]]);}
}
function v32Storm(g,p,r,seed){let c=V32.lo;
 v32LeafMass(g,p,r,seed,[c.cloud[0],c.cloud[0],c.cloud[1],c.cloud[2],c.cloud[3],c.cloud[4],c.cloud[4],c.cloud[5]]);
 for(let i=0;i<5;i++){let a=i*TAU/5+seed*.4,xx=Math.cos(a)*r[0]*.66,zz=Math.sin(a)*r[2]*.6;
  v32Orb(g,[p[0]+xx,p[1]+(i%2)*2,p[2]+zz],[r[0]*.34,r[1]*.56,r[2]*.4],
   [c.cloud[1],c.cloud[2],c.cloud[3]],seed*3+i*19);}
}
function v32Logia(g){const c=V32.lo;
 for(let i=0;i<11;i++){let a=i*TAU/11+.15,dx=Math.cos(a),dz=Math.sin(a),reach=30;
  v32Grow(g,[[0,10,0],[dx*9,4.1,dz*8],[dx*reach*.7,.8,dz*reach*.68],[dx*reach,.12,dz*reach*.85]],
   [7.5,5,2.5,.07],c.wood[i%3],10);}
 v31Spine(g,[[0,0,0],[-3,15,2],[3,35,-1],[-4,55,-3],[1,76,-8]],
  [16,14,11.2,8.4,.06],[c.wood[0],c.wood[1],c.wood[2]],c.wood[3]);
 // A joined, asymmetric cathedral of lightning, burning wood and frozen boughs.
 const burn=[[-43,57,21],[-29,71,28],[-17,80,6],[-42,59,-22],[-26,74,-31]];
 burn.forEach(([x,y,z],i)=>{v32Grow(g,[[-3,28,0],[x*.43,y-14,z*.37],[x*.78,y-6,z*.81],[x,y,z]],
  [7.8,5.4,3.4,.05],c.wood[i%3],11);
  v32FlaringFire(g,[x*.85,y-4,z*.82],9.5+(i%2)*2,17+(i%3)*4,i);
 });
 // The burning canopy has one continuous dense heart behind the tongues.
 v32LeafMass(g,[-29,69,9],[17.2,11.5,15.3],38,
   [c.fire[0],c.fire[1],c.fire[2],c.fire[3],c.fire[4],c.fire[5],c.fire[5],c.fire[4]]);
 for(let j=0;j<4;j++){
  const a=j*TAU/4+1.2;
  const q=[-29+Math.cos(a)*11,71+(j%2)*4,9+Math.sin(a)*9];
  v32FlaringFire(g,q,6.7+j%2*1.8,13+(j%3)*3,11+j);
 }
 const ice=[[38,56,25],[24,76,35],[39,59,-28],[18,80,-29]];
 ice.forEach(([x,y,z],i)=>{
  v32Grow(g,[[3,30,0],[x*.47,y-16,z*.44],[x*.79,y-5,z*.76],[x,y,z]],
   [8,5.6,3.5,.05],[c.wood[1],c.wood[2]],11);
  v32LeafMass(g,[x,y+4,z],[8.3,5.7,9.2],51+i*7,
   [c.ice[0],c.ice[1],c.ice[2],c.ice[3],c.ice[4],c.ice[5],c.ice[4],c.ice[3]]);
  for(let j=0;j<7;j++){let a=j*TAU/7+i*.45,root=[x+Math.cos(a)*4,y,z+Math.sin(a)*4];
   shard(g,root,[root[0]+Math.cos(a)*7,root[1]+9+(j%3)*3,root[2]+Math.sin(a)*9],
    1.9+(j%2)*.7,c.ice[(i+j)%4+1],7);}
 });
 // The single contiguous thunderhead floats over a rear connected trunk fork.
 v32Grow(g,[[-2,52,-4],[-7,68,-10],[-12,78,-15],[0,90,-21]],
  [7,5.3,3.2,.05],c.wood[1],10);
 v32Storm(g,[2,90,-18],[31,18.5,26],17);
 v32Storm(g,[-20,88,-20],[18,11.2,16],24);
 // Lightning follows real storm surface crevices and bough attachments.
 for(let i=0;i<5;i++){
  const p=[-23+i*9,82+(i%2)*7,-5-(i%3)*4];
  v32Grow(g,[p,[p[0]+3,p[1]-5,p[2]+2],[p[0]-1,p[1]-9,p[2]+4],[p[0]+4,p[1]-15,p[2]+6]],
   [.49,.52,.35,.04],i%3===0?'#fff8be':'#a67bfc',6);
 }
 // A two-colour helix fuses fire and ice through real bark relief.
 for(let k=0;k<2;k++){
  let pts=[];for(let i=0;i<=63;i++){let t=i/63,a=(k?3.1:.4)+t*TAU*1.18;
   pts.push([Math.cos(a)*(14-t*5),6+t*65,Math.sin(a)*(14-t*5)]);}
  v32Grow(g,pts,pts.map((_,i)=>.48*(1-i/90)),k?c.ice[2]:c.fire[4],7);
 }
 // Lateral curving sheets of wind wrap the entire frozen right edge.
 for(let i=0;i<3;i++){
  let pt=[];for(let j=0;j<=24;j++){let t=j/24,a=t*TAU*.6+i*.63;
   pt.push([18+Math.cos(a)*17,39+i*8+t*16,17+Math.sin(a)*16]);}
  surface30(g,pt,pt.map((_,j)=>1.6*(1-j/34)),[c.ice[4],c.ice[3],c.ice[2]],
   [c.ice[1],c.ice[3]],[c.ice[1]]);
 }
 v25Spiral(g,[0,13,14],3.8,c.fire[4],1.7,.28);
}
function v32Sakura(g,p,r,seed){let c=V32.pa;
 // Multi-axis crown with deep petals and no repeated latitude stripes.
 v32LeafMass(g,p,r,seed,c.bloom);
 for(let i=0;i<7;i++){
  let a=i*TAU/7+seed*.34,dx=Math.cos(a),dz=Math.sin(a);
  const start=[p[0]+dx*r[0]*.48,p[1]+r[1]*.45,p[2]+dz*r[2]*.40];
  const tip=[p[0]+dx*r[0]*.93,p[1]+r[1]*(.73+.21*(i%3)),p[2]+dz*r[2]*.82];
  v28Petal(g,start,[dx,.68,dz],[0,1,0],4.2+(i%3)*1.1,
   [c.bloom[4],c.bloom[5],c.bloom[2],c.bloom[6]],seed+i);
 }
 // Each crown gets an asymmetrically located open lotus with real thickness.
 if(seed%3===0)v29Lotus(g,[p[0]+r[0]*.15,p[1]+r[1]*.72,p[2]-r[2]*.20],r[0]*.39,[.3,1,.2],seed);
}
function v32Paramecia(g){let c=V32.pa;
 for(let i=0;i<11;i++){let a=i*TAU/11+.1,dx=Math.cos(a),dz=Math.sin(a),reach=30+(i%3)*3;
  v32Grow(g,[[0,11,0],[dx*9,4.6,dz*9],[dx*reach*.65,1.1,dz*reach*.70],[dx*reach,.16,dz*reach*.90]],
   [8,5.6,2.4,.06],c.wood[i%3],11);}
 // Large organic three-strand ivory/blush braiding rising through the canopy.
 for(let k=0;k<3;k++){
  const pts=[];for(let i=0;i<=57;i++){
   let t=i/57,a=k*TAU/3+t*TAU*1.23;
   pts.push([Math.cos(a)*(12-4.9*t),t*86,Math.sin(a)*(12-4*t)]);
  }v32Grow(g,pts,pts.map((_,i)=>Math.max(.13,10-9.7*i/57)),[c.wood[0],c.wood[2],c.wood[3]][k],13);
 }
 // Deep structural pale branches, with wider negative space and true Z forks.
 const limbs=[[-42,55,29],[-26,77,43],[1,89,45],[26,79,43],[45,57,29],
 [-44,62,-28],[-29,85,-42],[3,93,-42],[30,82,-39],[46,62,-25],[-8,109,0]];
 limbs.forEach(([x,y,z],i)=>{
  v32Grow(g,[[0,29,0],[x*.37,y-20,z*.36],[x*.72,y-7,z*.72],[x,y,z]],
   [8.4,6.1,3.4,.09],[c.wood[0],c.wood[(i%4)],c.wood[1]],13);
  if(i%3===0)v32Branch(g,[x*.37,y-20,z*.36],[x*.62,y-3,z*.50],2.8,c.wood[2],i);
 });
 // Blossoms surround a visible living ivory core, not just pink dinner plates.
 const crowns=[[-40,65,27,16,11,17],[-24,85,43,17,12,18],[1,94,43,18,12.5,19],
 [25,88,39,17,12,17],[44,68,27,15,11,16],[-43,70,-25,17,12,17],
 [-27,93,-41,19,13,18],[3,100,-41,19,13,18],[30,89,-39,17,12,18],
 [45,69,-25,15,11,16],[-9,115,0,20,13,21]];
 crowns.forEach(([x,y,z,rx,ry,rz],i)=>{
  v32Branch(g,[x*.68,y-12,z*.68],[x,y,z],2.1,c.wood[0],i);
  v32Sakura(g,[x,y,z],[rx,ry,rz],i*7+7);
 });
 // The orbit is genuinely oblique and passes through different Z layers.
 v29Ring(g,[1,104,-7],22,10.5,13,c.gold,1.17,.31);
 v29Ring(g,[7,117,-10],10.3,6.7,6.3,'#fff4be',.56,-.28);
 // Portal is grown in the central trunk and flanked by ivory root arches.
 v29Portal(g,[0,20,15.5],9.3);
 for(let s of [-1,1])v32Grow(g,[[s*18,6,9],[s*14,13,17],[s*8,23,16]],
  [4.7,2.8,.08],s<0?c.wood[2]:c.wood[0],10);
 v29Lotus(g,[0,126,0],13,[.19,1,.18],17);
}
function v32Island(ci){
 // New continuous, broad stepped geology with three joined curved waterfalls.
 const g=new Mesh(),N=27;
 const cols=[
  {top:['#87d444','#b2ed59','#5cb945'],edge:['#5ead41','#92d54a'],rocks:[['#c9986b','#a87959'],['#ae845f','#906f60'],['#94745c','#7a6564'],['#6e606b','#565065'],['#494153','#372f44']]},
  {top:['#81a776','#9cc37d','#608f78'],edge:['#5d856f','#77a281'],rocks:[['#93858f','#797285'],['#7b7085','#645e76'],['#615c73','#4e4a62'],['#51485e','#40384e'],['#353047','#252238']]},
  {top:['#96d250','#c3eb61','#71b64c'],edge:['#79b249','#9dcd53'],rocks:[['#be9bb8','#af8cab'],['#a989a9','#916d9b'],['#876993','#725982'],['#675277','#544069'],['#513d64','#3a2d51']]}
 ][ci];
 const radius=[34.2,35.6,34.3,32.9,28.0,22.4,15.1,7,.15],H=[.45,-1.4,-5.2,-10.4,-16.7,-23.6,-31.0,-37.7,-39.3];
 const rings=radius.map((r,k)=>Array.from({length:N},(_,i)=>{
  const a=i*TAU/N,rad=r*(1+.071*Math.sin(a*5+ci)+.044*Math.cos(a*11-ci));
  return [Math.cos(a)*rad,H[k]+(k===0?.22*Math.sin(i*2.15):0),Math.sin(a)*rad*.90];
 }));
 for(let i=0;i<N;i++){
  const j=(i+1)%N;g.tri([0,.82,0],rings[0][j],rings[0][i],cols.top[i%3]);
  for(let k=0;k<radius.length-1;k++){
   const palette=k<2?cols.edge:cols.rocks[Math.min(4,k-2)];
   g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],palette[(i+k)%2]);
  }
 }
 // Three wide water sheets start on turf and bend into the air over the rim.
 const streams=[[-20,23.5,5.2],[0,31.0,7.5],[21,23.5,5.2],[-13,-29,3]];
 streams.forEach(([x,z,width],seed)=>{
  let path=[];for(let j=0;j<=25;j++){
   const t=j/25,front=z>=0?1:-1;
   path.push([x+2.0*Math.sin(t*2.8+seed*.4)*t,
    t<.10?.30-5*t:.04-(t-.10)/.9*(seed===1?32:27),
    z+front*(1.2+11*t)+1.5*Math.sin(t*Math.PI)]);
  }
  for(let strip=0;strip<6;strip++){
   const lo=(strip/6-.5)*width,hi=((strip+1)/6-.5)*width;
   for(let j=0;j<25;j++){
    const t=j/25,tt=(j+1)/25,A=path[j],B=path[j+1];
    const wr=1-.19*t+.07*Math.sin(t*8+seed),wn=1-.19*tt+.07*Math.sin(tt*8+seed);
    const a=[A[0]+lo*wr,A[1],A[2]],b=[A[0]+hi*wr,A[1],A[2]],
      c=[B[0]+hi*wn,B[1],B[2]],d=[B[0]+lo*wn,B[1],B[2]];
    const front=['#147eb7','#299fce','#57cdf0','#c9f7ff','#6bd7f7','#2e9ccb'][strip];
    g.quad(a,b,c,d,front);
    g.quad([a[0],a[1],a[2]-.42],[d[0],d[1],d[2]-.42],[c[0],c[1],c[2]-.42],[b[0],b[1],b[2]-.42],front);
   }
  }
  const q=path[25];for(let k=0;k<6;k++)v32Orb(g,[q[0]+(k-2.5)*.9,q[1]+(k%2)*.34,q[2]+.55],
    [.48,.42,.45],['#d7ffff','#f6ffff'],k+seed*10);
 });
 // small class-specific foreground ecology, only at physical ground level.
 for(let i=0;i<10;i++){
  let a=i*TAU/10+.38,r=23+(i%4)*1.7,p=[Math.cos(a)*r,.5,Math.sin(a)*r*.85];
  if(ci===1)shard(g,p,[p[0]+.6,p[1]+3+(i%3),p[2]+.3],1.3,i%2?'#7dd7ee':'#d6faff',6);
  else v32Orb(g,p,[1.3,.72,1.4],ci===0?['#238e3b','#a5d84e']:['#b276ab','#ecc0da'],i+9);
 }
 return g;
}
function makeTree32(ci){const g=new Mesh();[v32Zoan,v32Logia,v32Paramecia][ci](g);v29FamilyBoughs(g,ci);return g;}
function makeIsland32(ci){return v32Island(ci);}
function v32FamilyBranch(ci){
 // Organic 3D cantilever supporting a few individually spaced hanging fruits.
 // Crooked silhouette and local class materials, not a straight generic plank.
 const g=new Mesh(),col=[V32.zo.wood[2],V32.lo.wood[2],V32.pa.wood[1]][ci],tip=[V32.zo.wood[4],V32.lo.wood[4],V32.pa.wood[3]][ci];
 v32Grow(g,[[-14.6,-.55,-1.4],[-9.5,1.2,-.9],[-4.6,3.4,.8],[.9,3.8,1.2],[5.4,2.6,.3],[10.4,1.8,-.6],[15,-.35,-1.5]],
  [.25,.94,1.32,1.70,1.29,.88,.17],[col,tip],10);
 for(const x of [-4.6,0,4.6]){
  v32Grow(g,[[x,3.1,1],[x-.18,0,1.4],[x,-2.0,1.35]],
   [.23,.13,.035],ci===0?'#bd9458':ci===1?'#b0beca':'#e4aeaa',6);
 }
 for(let j=0;j<5;j++){
  let a=j*TAU/5+.4,x=(j-2)*4.2,z=(j%2?-1.5:1.1);
  if(j===2)continue;
  v28Frond(g,[x,2.3,z],[x+Math.cos(a)*3,4.3+j%2,z+Math.sin(a)*2],
   [0,1,0],.80,.55,ci===0?['#5fc53d','#98df51','#2e943a','#145f3b']:
    ci===1?['#9fd8de','#c5eefa','#3e8cb3','#265877']:
    ['#ef9fc6','#ffcade','#bd579b','#823e78']);
 }
 return g;
}
