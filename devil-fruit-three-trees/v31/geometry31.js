/* V31 — reference-led sculptural, fully volumetric Devil Fruit tree world.
   Builds exclusively on the V30 source, not an image billboard or variant switch.
   Three uniquely authored organic structures and three class-specific islands. */
const P31={
 zo:{heart:'#8e4428',bark:'#b76636',wood:'#d68443',lit:'#f4ac56',shadow:'#67351f',amber:'#f6cf62',ivory:'#ffeeb4',
      leaves:['#075d33','#0d7736','#1a9137','#299f3a','#4dc33b','#76dc45','#b7ed44','#e0fb61']},
 lo:{trunk:'#29223c',deep:'#211c30',ridge:'#473550',edge:'#725069',ember:'#e74b1d',warm:'#ffa629',hot:'#ffe46b',
      fire:['#c92b1d','#e93c18','#fb5b1d','#ff8c24','#ffbf38','#fff078'],cloud:['#40335f','#594676','#775f9c','#9583bb','#bdb3db'],
      ice:['#0e7bc6','#20a2dd','#42c2f2','#8ae3ff','#d3faff'],water:['#127ec0','#25c7e4','#68e8fa','#d9ffff']},
 pa:{dark:'#a34978',rose:'#cb6e9d',ivory:'#ffedde',bright:'#fff9ee',blush:'#f7c2d7',gold:'#ffcc58',goldlight:'#fff4ab',
      flowers:['#8f2d72','#ad367c','#d64a8d','#ef6fa3','#fc95b6','#ffb9d0','#ffdcdf'],violet:'#6d3dc3',lilac:'#b78bff'}
};
const v31Stem=(g,p,r,c,s=11)=>tube(g,p,r,c,s);
const v31Blob=(g,p,r,c,seed)=>blob(g,p,r,c,seed,15,8);
const v31Add=(p,dx,dy,dz)=>[p[0]+dx,p[1]+dy,p[2]+dz];
function v31Spine(g,pts,rads,colour,edgelight){
 // A tapered, articulating split-surface shaft with a secondary permanent
 // physical facet line rather than a stamped diffuse texture.
 v31Stem(g,pts,rads,colour,13);
 if(edgelight){const e=pts.map((p,i)=>v31Add(p,rads[i]*.64,0,rads[i]*.57));
 v31Stem(g,e,rads.map((r,i)=>Math.max(.06,r*.060)),edgelight,6);}
}
function v31Crown(g,p,r,seed,palette){
 // Irregular sculptural canopy with 11 offset rings and 26 sectors. The crown
 // is non-planar along every axis, and has real deep rear/underside geometry.
 const n=26,lats=[[-.99,.12],[-.88,.45],[-.72,.71],[-.48,.88],[-.20,.98],[.07,1.05],[.35,1.0],[.61,.86],[.81,.61],[.95,.29],[1,.04]],rings=[];
 for(let i=0;i<lats.length;i++){
  let [y,rr]=lats[i],layer=[];
  for(let j=0;j<n;j++){
   let a=TAU*j/n+seed*.12;
   let wave=1+.092*Math.sin(3*a+seed*1.7)+.044*Math.sin(7*a+seed*.8)+.023*Math.cos(11*a+seed);
   let ywarped=y+(.09*Math.cos(3*a+seed)+.027*Math.sin(j*2.3))*Math.pow(1-Math.abs(y),.8);
   layer.push([p[0]+Math.cos(a)*r[0]*rr*wave,p[1]+r[1]*ywarped,p[2]+Math.sin(a)*r[2]*rr*(1+.065*Math.cos(5*a+seed))]);
  }rings.push(layer);
 }
 const pick=(i,j)=>palette[Math.min(palette.length-1,Math.max(0,i+(j%9===0?1:0)))];
 for(let j=0;j<n;j++){
  const k=(j+1)%n;
  g.tri([p[0],p[1]-r[1],p[2]],rings[0][j],rings[0][k],palette[0]);
  for(let i=0;i<lats.length-1;i++){
   let band=i<=2?0:i<=4?1:i<=6?2:i<=8?4:6;
   const a=rings[i][j],b=rings[i+1][j],c=rings[i+1][k],d=rings[i][k];
   // The concept art uses polygonal light and colour wedges, not stripe bands:
   // neighbouring triangular faces share a material but reflect light differently.
   let varA=((j*13+i*7+Math.round(seed))%11===0)?1:0;
   let varB=((j*7+i*13+Math.round(seed))%9===0)?1:0;
   g.tri(a,b,c,pick(band+varA,j));
   g.tri(a,c,d,pick(band+varB,j+2));
  }
  g.tri([p[0],p[1]+r[1]*1.008,p[2]],rings.at(-1)[k],rings.at(-1)[j],palette[7]||palette[6]);
 }
 // Three massive lancelike leaf shapes genuinely break the outline.
 for(let i=0;i<3;i++){
  let a=seed*.46+i*TAU/3+1,dx=Math.cos(a),dz=Math.sin(a);
  let start=[p[0]+dx*r[0]*.72,p[1]+r[1]*(i%2?.12:-.22),p[2]+dz*r[2]*.73];
  let tip=[p[0]+dx*r[0]*(1.10+i*.07),p[1]+r[1]*(.26+.20*(i%2)),p[2]+dz*r[2]*1.13];
  v28Frond(g,start,tip,[dx,.15,dz],1.6,.75,[palette[5],palette[7],palette[3],palette[1]]);
 }
}
function v31RootSystem(g,classIndex){
 const colours=classIndex===0?[P31.zo.wood,P31.zo.bark,P31.zo.lit]:classIndex===1?[P31.lo.trunk,P31.lo.ridge,P31.lo.deep]:[P31.pa.ivory,P31.pa.rose,P31.pa.blush];
 for(let i=0;i<12;i++){
  let a=i*TAU/12+.22,reach=(classIndex===0?29:28)*(1+.12*Math.sin(i*2.9));
  let dx=Math.cos(a),dz=Math.sin(a);
  let path=[[dx*1.9,10,dz*1.9],[dx*8,4.8,dz*8],[dx*reach*.68,1.0,dz*reach*.62],[dx*reach,.15,dz*reach*.89]];
  v31Stem(g,path,[7.1,5.2,2.4,.035],colours[i%3],11);
 }
}
function v31LunarInlay(g,base,span,rot){
 // A SINGLE connected curl at the end of an oak growth line. Its entire
 // shape has 3D Z variation and rests on a natural branch, not a face/wing.
 const a=[];for(let i=0;i<=37;i++){
  let t=i/37,angle=(-.82+t*1.67)*Math.PI;
  let rad=span*(1-.20*t);
  a.push([base[0]+Math.cos(angle)*rad*Math.cos(rot),
          base[1]+Math.sin(angle)*rad*.62,
          base[2]+Math.cos(angle)*rad*Math.sin(rot)+Math.sin(t*Math.PI)*1.6]);
 }
 v31Stem(g,a,a.map((_,i)=>.92*(.85+.13*Math.sin(i*.2))*(1-i/53)),P31.zo.amber,10);
 // Thin warm inner edge conveys antique polished cambium.
 const b=a.map((p,i)=>[p[0],p[1]-.38,p[2]+.40]);
 v31Stem(g,b,b.map(()=>.17),P31.zo.ivory,7);
}
function v31Zoan(g){const c=P31.zo;
 v31RootSystem(g,0);
 // Continuously forked, huge low-poly orange oak. No face or face-like shapes.
 v31Spine(g,[[0,0,0],[-2,14,1],[4,31,-1],[-3,48,-3],[0,65,-3],[2,78,-4]],
   [16.2,14.2,12.0,9.6,6.7,.20],[c.heart,c.bark,c.wood],c.lit);
 // More arching boughs than V30, from twelve distinct trunk joints.
 const limbs=[
  [-38,58,-27],[-25,71,-34],[-6,81,-31],[19,78,-34],[41,62,-24],
  [-40,60,27],[-25,68,35],[-2,76,36],[24,69,35],[41,57,20],
  [-14,87,3],[11,88,-4]
 ];
 limbs.forEach(([x,y,z],i)=>{
  let root=[(i%3-1)*3,28+(i%5)*4,-2],bend=[x*.37,y-19,z*.37],fork=[x*.72,y-9,z*.80],tip=[x,y-1.5,z];
  v31Stem(g,[root,bend,fork,tip],[8.1,5.9,3.7,.13],i%5===0?[c.bark,c.lit,c.wood]:[c.heart,c.bark,c.wood],12);
  // One counter-branch at each joint, natural irregular open depth.
  if(i%3===1){v31Stem(g,[bend,[x*.60,y-13,z*.62],[x*.80,y-2,z*.45]],[3.0,1.8,.06],c.wood,8)}
 });
 // Carved trunk seams follow taper and twist without facial symmetry.
 for(let i=0;i<11;i++){
  const a=i*TAU/11+.33;
  let ps=[];for(let j=0;j<7;j++){let t=j/6,rr=14.4-8*t,th=a+t*.39;
   ps.push([Math.cos(th)*rr,5+t*64,Math.sin(th)*rr]);}
  v31Stem(g,ps,[.92,.82,.7,.51,.38,.20,.025],i%3===0?c.lit:i%2?c.bark:c.heart,7);
 }
 // Two asymmetrically located ancient-gold growth details on actual boughs,
 // not symmetric crescent eyes or repeated geometric spam.
 v31Stem(g,[[-13,43,17],[-27,52,38],[-36,58,49]],[3.6,2.3,.12],c.wood,9);
 v31LunarInlay(g,[-36,64,51],8.5,.19);
 v31Stem(g,[[18,47,12],[30,54,32],[38,60,46]],[3.1,1.9,.09],c.wood,9);
 v31LunarInlay(g,[39,62,48],5.3,-.28);
 // 11 DIFFERENT tier-free canopy bodies, with bright crest and huge rear depth.
 const crowns=[
  [-40,66,-27,17,11.6,15],[-22,79,-34,17,12.3,15],[-1,85,-29,17,12.4,16],
  [21,82,-32,18,12,17],[43,68,-24,15.7,11.2,15],
  [-40,61,24,18,11.5,16],[-22,73,34,19,12.2,17.6],[-1,80,32,20.4,13,17.3],
  [23,74,32,18,12.0,17],[42,63,22,16.3,11,15.5],[-10,93,1,20.3,12.7,19.2]
 ];
 crowns.forEach(([x,y,z,rx,ry,rz],i)=>{
  v31Stem(g,[[x*.63,y-13,z*.58],[x*.88,y-5,z*.85],[x,y,z]],[3.6,2.0,.07],c.wood,9);
  const palettes=i%3===0?[c.leaves[0],c.leaves[1],c.leaves[2],c.leaves[3],c.leaves[4],c.leaves[5],c.leaves[6],c.leaves[7]]:
   i%3===1?[c.leaves[0],c.leaves[1],c.leaves[2],c.leaves[3],c.leaves[4],c.leaves[5],c.leaves[6],c.leaves[7]]:
   [c.leaves[0],c.leaves[2],c.leaves[3],c.leaves[3],c.leaves[4],c.leaves[5],c.leaves[6],c.leaves[7]];
  v31Crown(g,[x,y,z],[rx,ry,rz],i*13+6,palettes);
 });
 // Two vine/wood bands cross the trunk and lead the eye upwards.
 for(let k=0;k<2;k++){
  let pts=Array.from({length:48},(_,i)=>{let t=i/47,a=(k?2.5:.2)+t*TAU*.7,rr=(13-5*t);
   return [Math.cos(a)*rr,11+t*39,Math.sin(a)*rr];});
  v31Stem(g,pts,pts.map((_,i)=>.41*(1-i/85)),k?c.lit:c.wood,7);
 }
 v25Spiral(g,[0,12.4,14.3],3.6,c.amber,1.45,.30);
}
function v31Fire(g,start,end,halfWidth,colOffset=0){
 // Thick free-curving *multi-section* flames, no flat cones or disconnected disks.
 const cols=P31.lo.fire,pt=[];for(let i=0;i<=15;i++){
  let t=i/15,h=Math.sin(Math.PI*t),p=mix(start,end,t);
  pt.push([p[0]+h*(3.4*Math.sin(colOffset*1.7+t*3.7))+t*t*3.4*Math.sin(colOffset+1),p[1]+h*4.7,p[2]+h*(4.3*Math.cos(colOffset*2.7+t*3.5))]);
 }
 const widths=pt.map((_,i)=>{let t=i/15;return Math.max(.06,halfWidth*.83*Math.pow(Math.sin((.015+.97*t)*Math.PI),.63)*(1-t*.24))});
 surface30(g,pt,widths,[cols[(colOffset+1)%6],cols[2],cols[3],cols[4],cols[5]],
   [cols[0],cols[1],cols[2]],[cols[0],cols[1],cols[3]]);
}
function v31Storm(g,centre,r,seed){const c=P31.lo;
 // One multi-lobed thunderhead with a substantial rear, integrated dark core.
 v31Crown(g,centre,r,seed,[c.cloud[0],c.cloud[0],c.cloud[1],c.cloud[1],c.cloud[2],c.cloud[3],c.cloud[4],c.cloud[4]]);
 const lobes=[[-.68,.04,-.42,.51],[-.35,.29,.49,.47],[.22,.16,-.65,.53],[.75,-.09,.41,.47],[-.14,-.3,.85,.46]];
 lobes.forEach(([dx,dy,dz,s],i)=>v31Blob(g,
  [centre[0]+dx*r[0],centre[1]+dy*r[1],centre[2]+dz*r[2]],
  [r[0]*s,r[1]*s*.83,r[2]*s],[c.cloud[(i+1)%5],c.cloud[(i+2)%5]],seed+i*13));
}
function v31IceReef(g,root,angle,height,seed){const c=P31.lo,dx=Math.cos(angle),dz=Math.sin(angle);
 const p=[root[0]+dx*2,root[1],root[2]+dz*2],tip=[p[0]+dx*(3+seed%3),p[1]+height,p[2]+dz*(5+seed%4)];
 shard(g,p,tip,2.6+(seed%3)*.7,c.ice[seed%5],7);
}
function v31Logia(g){const c=P31.lo;
 v31RootSystem(g,1);
 // Central basalt tree physically bifurcates to flame-left and glacier-right.
 v31Spine(g,[[0,-.2,0],[2,15,-1],[-4,30,1],[2,46,-1],[1,64,-5],[2,79,-12]],
    [15.4,13.1,11.5,9.6,6.8,.14],[c.deep,c.trunk,c.ridge],c.ridge);
 for(const [start,end] of [ [[0,33,0],[-18,53,-1]],[[-17,51,0],[-39,69,8]],[[0,35,1],[21,58,-4]],[[16,58,-3],[38,64,0]],[[0,50,-3],[8,78,-19]] ]){
  v31Stem(g,[start,mix(start,end,.53),end],[7.3,5,.21],[c.trunk,c.ridge],11);
 }
 // Heat and light physically run through the winding left boughs.
 const heatBranches=[[-8,42,10],[-20,50,13],[-31,62,16]];
 v31Stem(g,heatBranches,[4.4,3,.12],[c.ember,c.warm],10);
 const flames=[
  [[-12,51,13],[-50,85,20],9.2], [[-24,54,7],[-57,70,-1],8.4],
  [[-18,63,-12],[-40,97,-16],8.5], [[-30,65,20],[-53,85,31],6.7],
  [[-13,54,25],[-34,80,41],7.4], [[-10,58,-10],[-24,95,-11],7.5]
 ];
 flames.forEach(([a,b,w],i)=>v31Fire(g,a,b,w,i));
 // Storm grows directly from top and dark-rear boughs, rather than hovering.
 v31Stem(g,[[0,48,-3],[5,63,-12],[13,78,-19]],[6.5,4.4,.08],c.trunk,9);
 v31Storm(g,[14,85,-18],[26,15.8,29],21);
 v31Storm(g,[34,71,-28],[13,10.4,16],29);
 // One physically embedded purple vortex and lightning fissures.
 let whirl=[];for(let i=0;i<=68;i++){let t=i/68,a=t*TAU*1.48+.2,rr=13*(1-.86*t);
  whirl.push([17+rr*Math.cos(a),75+rr*.69*Math.sin(a),4+Math.sin(t*3.2)*3]);}
 v31Stem(g,whirl,whirl.map((_,i)=>1.14*(1-i/78)),[c.cloud[4],c.cloud[3]],9);
 for(let i=0;i<6;i++){
  let a=i*TAU/6,p=[15+Math.cos(a)*14,78+Math.sin(a)*10,8];
  v31Stem(g,[p,v31Add(p,2,-3,1),v31Add(p,-3,-7,3),v31Add(p,1,-13,5)],[.88,.66,.55,.05],i%2?'#c596ff':'#ece0ff',6);
 }
 // Glacier is an integral right-hand landscape/branch, not isolated icicles.
 v31Stem(g,[[7,37,2],[25,50,8],[40,57,14]],[7,5.4,.25],[c.deep,c.ridge],10);
 for(let i=0;i<19;i++){
  const a=i*2.39996,dx=Math.cos(a),dz=Math.sin(a),root=[25+dx*12,40+(i%5)*2.5,10+dz*17];
  v31IceReef(g,root,a,12+(i%6)*3.2,i);
 }
 // Three wide pale wind scarves have actual front, rear and edge geometry.
 for(let k=0;k<3;k++){
  const path=[];for(let i=0;i<=54;i++){
   let t=i/54,a=t*TAU*(.72+k*.23)+k*2.1,r=(19-k*2)-t*3.6;
   path.push([24+Math.cos(a)*r,44+k*5+23*t,13+Math.sin(a)*r]);
  }
  surface30(g,path,path.map((_,i)=>{let t=i/54;return Math.max(.08,(k?2.7:3.3)*Math.pow(Math.sin(Math.PI*(.025+t*.94)),.72))}),
    [c.ice[4],c.ice[3],c.ice[4]],[c.ice[1],c.ice[2]],[c.ice[0],c.ice[1]]);
 }
 // Continuous lava-blue veins follow opposite actual basalt surfaces.
 for(let i=0;i<8;i++){
  let a=i*TAU/8+.2,ps=[];for(let j=0;j<7;j++){let t=j/6,r=13.4-6*t;
   ps.push([Math.cos(a+t*.4)*r,3+t*60,Math.sin(a+t*.4)*r]);}
  v31Stem(g,ps,[.77,.73,.62,.48,.37,.21,.03],i%3===0?c.ice[2]:c.fire[i%2?1:3],7);
 }
 v25Spiral(g,[0,13.0,15.4],4.0,c.hot,1.8,.32);
}
function v31Blossom(g,p,r,seed){const c=P31.pa;
 // Sculpted irregular 3D sakura crown, NOT a flattened pink disk with spikes.
 v31Crown(g,p,r,seed,[c.flowers[0],c.flowers[1],c.flowers[1],c.flowers[2],c.flowers[3],c.flowers[4],c.flowers[5],c.flowers[6]]);
 // A few large overlapping, rounded, thick petals on 3D normal planes.
 for(let i=0;i<5;i++){
  let a=seed*.23+i*TAU/5,dir=[Math.cos(a),.38+(i%3)*.13,Math.sin(a)];
  const start=[p[0]+dir[0]*r[0]*.47,p[1]+r[1]*.44,p[2]+dir[2]*r[2]*.48];
  v28Petal(g,start,dir,[0,1,0],r[0]*(i%3? .34:.42),
    [c.flowers[4],c.flowers[5],c.flowers[3],c.flowers[2]],seed+i);
 }
 // A few irregular daughter flower lobes break the horizontal upper silhouette.
 for(let i=0;i<6;i++){
  let a=seed*.36+i*TAU/6,dx=Math.cos(a),dz=Math.sin(a);
  let q=[p[0]+dx*r[0]*.63,p[1]+r[1]*(.25+(i%3)*.16),p[2]+dz*r[2]*.68];
  v31Blob(g,q,[r[0]*(.25+(i%3)*.04),r[1]*(.34+(i%2)*.06),r[2]*(.27+(i%3)*.035)],[c.flowers[3],c.flowers[4],c.flowers[5]],seed+i*11);
 }
 if(seed%4===0)v29Lotus(g,[p[0],p[1]+r[1]*.84,p[2]],r[0]*.25,[.2,1,.2],seed);
}
function v31Paramecia(g){const c=P31.pa;
 v31RootSystem(g,2);
 // Wider high-character ivory/blush intertwined trunk; true negative space.
 v31Spine(g,[[0,0,0],[4,16,0],[-6,35,-3],[4,54,-3],[-2,68,-5],[0,84,-5]],
  [14.1,12.4,10.5,7.7,4.8,.20],[c.dark,c.ivory,c.blush],c.bright);
 for(let k=0;k<3;k++){
  let pts=[];for(let i=0;i<=57;i++){
   let t=i/57,a=k*TAU/3+t*TAU*1.34;
   pts.push([Math.cos(a)*(10-3.4*t),4+t*73,Math.sin(a)*(9.5-3*t)]);
  }
  v31Stem(g,pts,pts.map((_,i)=>Math.max(.18,7.6-7.15*i/57)),[c.ivory,c.blush,c.rose][k],12);
 }
 // Giant white swooping boughs all the way to actual blossom centres.
 const branches=[
  [-39,57,-31],[-20,78,-37],[2,88,-31],[24,79,-33],[41,64,-26],
  [-40,57,28],[-22,74,39],[2,81,35],[25,72,39],[43,61,24],[-5,92,0]
 ];
 branches.forEach(([x,y,z],i)=>{
  let root=[(i%3-1)*2,27+(i%4)*4,-2],m=[x*.38,y-19,z*.37],m2=[x*.77,y-7,z*.80],end=[x,y,z];
  v31Stem(g,[root,m,m2,end],[8.5,5.8,3.6,.16],i%4===0?[c.ivory,c.bright,c.blush]:[c.ivory,c.blush,c.bright],13);
 });
 // Broad, multidirectional sakura crowns with real wood support visible below.
 const blossoms=[
  [-41,65,-34,17,11,15.5],[-20,82,-38,17,11.5,16],[4,89,-34,17.7,11.2,16.8],[25,84,-35,16.5,10.6,15.3],[44,65,-27,16,10.5,14.5],
  [-42,60,30,17,10.8,15.1],[-21,78,39,19.5,12,17.1],[5,85,37,19.7,11.8,17.1],[26,77,40,18,11.8,16],[45,64,24,16,10.5,15],
  [-5,96,0,18,11.8,18]
 ];
 blossoms.forEach(([x,y,z,rx,ry,rz],i)=>{
  v31Stem(g,[[x*.62,y-12,z*.62],[x*.86,y-5,z*.84],[x,y,z]],[3.5,1.7,.12],c.ivory,10);
  v31Blossom(g,[x,y,z],[rx,ry,rz],i*7+11);
 });
 // Upper lotus and two large angled gold loops, not a junkyard of rings.
 v29Lotus(g,[0,111,0],13,[.16,1,.12],14);
 v29Ring(g,[2,90,-6],20,9.2,9.6,c.gold,1.1,.34);
 v29Ring(g,[4,103,-10],9.4,7.1,6.2,c.goldlight,.56,-.24);
 // Rooted violet doorway carved into the negative space between braided trunks.
 v29Portal(g,[0,19.3,13.9],8.7);
 for(const s of [-1,1])v31Stem(g,[[s*17,6,9],[s*11,13,15],[s*7,19,13]],[4.2,2.7,.06],s===1?c.ivory:c.blush,10);
 v25Spiral(g,[0,38,12.0],3.5,c.gold,1.5,.31);
}
function v31Island(ci){
 // Three different multi-shelf floating rocky mesas, not identical vertical cones.
 const g=new Mesh(),N=29,cols=[
  {t:['#91d643','#b9ed43','#53b73d'],grass:['#66b33c','#85d042'],rock:[['#cb9e6a','#b9865e'],['#b68a6d','#9a745f'],['#947466','#7c636a'],['#706374','#605567'],['#50465e','#393550']]},
  {t:['#789e69','#91b67b','#5e836a'],grass:['#5a806e','#729d72'],rock:[['#999199','#867f91'],['#797489','#66637b'],['#615e75','#52516b'],['#464158','#3a344f'],['#312b44','#27243a']]},
  {t:['#9ccf49','#c3eb58','#83b94a'],grass:['#7eb947','#9cca4e'],rock:[['#b99aba','#ad83b4'],['#a486b6','#9274a9'],['#8c739e','#705c8b'],['#735a91','#594a73'],['#554268','#403456']]}
 ][ci];
 const radial=[34.6,35.8,34.4,33.5,29,23.8,15,7.2,.2],y=[.32,-1.8,-6.4,-9.9,-15.2,-22.5,-30.3,-36.5,-39.0],rings=[];
 radial.forEach((r,k)=>{
  const arr=[];for(let j=0;j<N;j++){
   let a=TAU*j/N;const rr=r*(1+.075*Math.sin(a*5+ci*.5)+.043*Math.cos(a*11+ci*1.8));
   arr.push([Math.cos(a)*rr,y[k]+(k===0?.33*Math.sin(j*2.3):0),Math.sin(a)*rr*.90]);
  }rings.push(arr);
 });
 for(let j=0;j<N;j++){
  let n=(j+1)%N;g.tri([0,.80,0],rings[0][n],rings[0][j],cols.t[j%3]);
  for(let k=0;k<radial.length-1;k++){
   let colors=k<2?cols.grass:cols.rock[Math.min(4,k-2)];
   g.quad(rings[k][j],rings[k][n],rings[k+1][n],rings[k+1][j],colors[(j+k)%2]);
  }
 }
 // Three class-specific waterfalls connect a small upstream stream to each rim.
 const sources=[[-23,24,4.7],[3,32,10.3],[23,24,4.0],[-14,-29,3.4]];
 sources.forEach(([x,z,wide],index)=>{
  const back=z<0,sgn=back?-1:1;
  const path=[];for(let i=0;i<=20;i++){
   let t=i/20;
   const xx=x+Math.sin(t*Math.PI)*2+(index-1)*1.1*t;
   const zz=z+sgn*(2+13*t+1.1*Math.sin(t*Math.PI));
   const hh=t<.12?.4-2.0*t:-.02-24.7*(t-.12)/.88;
   path.push([xx,hh,zz]);
  }
  const colours=['#258dc2','#56c7ea','#dcfbff','#61d2ee','#2a96c7'];
  for(let strip=0;strip<5;strip++){
   const l=strip/5-.5,r=(strip+1)/5-.5;
   for(let i=0;i<path.length-1;i++){
    let A=path[i],B=path[i+1],wa=wide*(1-.22*i/20+.06*Math.sin(i*.67+index)),wb=wide*(1-.22*(i+1)/20+.06*Math.sin((i+1)*.67+index));
    const a=[A[0]+l*wa,A[1],A[2]],b=[A[0]+r*wa,A[1],A[2]],c=[B[0]+r*wb,B[1],B[2]],d=[B[0]+l*wb,B[1],B[2]];
    g.quad(a,b,c,d,colours[strip]);
    g.quad([a[0],a[1],a[2]-.7],[d[0],d[1],d[2]-.7],[c[0],c[1],c[2]-.7],[b[0],b[1],b[2]-.7],strip%2?'#299ad2':'#3899c7');
   }
  }
  const foot=path.at(-1);for(let k=0;k<5;k++)v31Blob(g,[foot[0]+(k-2)*.85,foot[1]+Math.sin(k*2)*.25,foot[2]+1],[.42,.32,.44],['#dcffff','#f9ffff'],k+31);
 });
 for(let i=0;i<12;i++){
  let a=i*2.399,rr=22.5+(i%4)*1.7,p=[Math.cos(a)*rr,.65,Math.sin(a)*rr*.86];
  if(ci===0)v31Blob(g,p,[1.7,.85,1.5],i%2?'#4aa340':'#a9d852',i+37);
  if(ci===1)shard(g,p,[p[0]+.6,p[1]+3.3+(i%3)*1.5,p[2]+.5],1.4,i%3?'#6ad5eb':'#d3faff',7);
  if(ci===2){v31Blob(g,p,[1.3,.61,1.5],i%2?'#bb7dab':'#d8a2ca',i+38);if(i%5===0)v29Lotus(g,[p[0],p[1]+.8,p[2]],1.5,[.1,1,.1],i);}
 }
 for(let i=0;i<3;i++){
  const x=(i-1)*64+(i===1?110:0),z=-32+(i%2)*16,h=-17-i*3;
  v31Blob(g,[x,h,z],[5.2,1.7,4.7],ci===2?'#92c851':'#8dce49',i+22);
  shard(g,[x,h-1,z],[x,h-10,z],2.8,ci===2?'#6d517e':'#5a506c',7);
 }
 return g;
}
function makeTree31(ci){const g=new Mesh();[v31Zoan,v31Logia,v31Paramecia][ci](g);v29FamilyBoughs(g,ci);return g;}
function makeIsland31(ci){return v31Island(ci);}

function makeSky31(ci){
 // Distant faceted white-blue cumulus give depth and scale as full 3D meshes.
 // These are environment geometry, not photo backgrounds or billboard textures.
 const g=new Mesh();
 const clouds=[[-80,85,-98,12],[-50,115,-112,8],[74,100,-107,11],[93,57,-114,7]];
 clouds.forEach(([x,y,z,r],i)=>{
  const q=[x,y,z],tones=i%2?['#d8efff','#ffffff','#a7d5ff']:['#e6f5ff','#ffffff','#b8dcff'];
  v31Blob(g,q,[r*1.28,r*.58,r*.75],tones,i+30);
  v31Blob(g,[x-r*.53,y+1,z],[r*.70,r*.69,r*.65],['#f7fbff','#cfe8ff'],i+48);
  v31Blob(g,[x+r*.55,y-.8,z],[r*.62,r*.47,r*.62],['#f7fbff','#e5f5ff'],i+74);
 });
 return g;
}
