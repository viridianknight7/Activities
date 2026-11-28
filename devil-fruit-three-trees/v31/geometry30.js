/* V30: Reference-driven hand-directed volumetric low-poly sculptures.
   Only makeTree30 is rendered; all face geometry from earlier versions is excluded.
   All surfaces are actual triangles with front and back volume, not image planes. */
const M30={
 z:{heart:'#7b3f25',wood:'#b36332',lit:'#f8a959',gold:'#f6cb53',amber:'#ffe69b',vein:'#f1aa41',
   crown:['#055d3b','#0f803b','#1ba03e','#40ba38','#6bd53a','#a5ec43','#d7f957']},
 l:{stone:'#33253f',ridge:'#594262',shadow:'#21182e',purple:'#8a73bc',magenta:'#a788ed',lavender:'#ddc6fc',
   fire:['#c9311e','#f3501c','#ff7c20','#ffa929','#ffe271'],ice:['#168bd6','#39b7f4','#6ad7ff','#b7f4ff'],
   water:'#13bde7',wind:'#e5faff',spark:'#bd92ff'},
 p:{dark:'#a73f7c',rosewood:'#db83ac',ivory:'#ffe8d6',white:'#fff5e6',blush:'#f7b5d4',
   gold:'#ffd562',bright:'#fff1a1',petals:['#972469','#b43580','#dd4894','#f569ab','#ff93c5','#ffd1e4'],
   violet:'#6a3bbe',violetLight:'#ccaaff'}
};
const branch30=(g,ps,rs,c,s=10)=>tube(g,ps,rs,c,s),ball30=(g,p,r,c,seed=1)=>blob(g,p,r,c,seed,14,8);
function tubePath30(g,fn,n,radius,colors,sides=9){let ps=Array.from({length:n+1},(_,i)=>fn(i/n));branch30(g,ps,ps.map((_,i)=>typeof radius==='function'?radius(i/n):radius),colors,sides);return ps;}
function arc30(g,p,q,bulge,rad,col){let pts=[];for(let i=0;i<=26;i++){const t=i/26;pts.push(add(mix(p,q,t),[bulge[0]*Math.sin(t*Math.PI),bulge[1]*Math.sin(t*Math.PI),bulge[2]*Math.sin(t*Math.PI)]))}branch30(g,pts,pts.map((_,i)=>rad*(.65+.35*Math.sin(Math.PI*i/26))),col,9)}
function surface30(g,pts,radius,cfront,cside,cback){
 // Organically curved *closed* ribbon blade, with thick ridged middle and coloured bevels.
 // It presents wide faces to the front and the rear even when the camera orbits.
 let rows=[];
 for(let i=0;i<pts.length;i++){
  let t=i/(pts.length-1),q=pts[i],tan=norm(sub(pts[Math.min(pts.length-1,i+1)],pts[Math.max(0,i-1)])),
   horiz=norm(cross(tan,[0,0,1]));if(Math.hypot(...horiz)<.1)horiz=[1,0,0];
  let norm1=norm(cross(tan,horiz));const r=radius[i],thick=Math.max(.12,r*.25);
  rows.push({L:add(q,mul(horiz,r)),R:sub(q,mul(horiz,r)),K:add(q,mul(norm1,thick)),B:sub(q,mul(norm1,thick)),N:norm1});
 }
 for(let i=0;i<rows.length-1;i++){
  let a=rows[i],b=rows[i+1];g.quad(a.L,b.L,b.K,a.K,cfront[(i+1)%cfront.length]);g.quad(a.K,b.K,b.R,a.R,cfront[i%cfront.length]);
  g.quad(a.B,b.B,b.L,a.L,cback[i%cback.length]);g.quad(a.R,b.R,b.B,a.B,cback[(i+1)%cback.length]);
  g.quad(a.L,b.L,b.B,a.B,cside[i%cside.length]);g.quad(a.B,b.B,b.R,a.R,cside[(i+2)%cside.length]);
 }
}
function canopy30(g,center,r,seed){
 // Broad closed faceted foliage crown: 8 rings, 19 polygon sectors, scalloped
 // skyline, broad bright crest, dark real undersurface. Independent in X/Y/Z.
 const col=M30.z.crown,n=19,lats=[[-.99,.16],[-.82,.52],[-.55,.80],[-.17,.99],[.22,1.03],[.56,.91],[.83,.62],[.99,.17]],rings=[];
 for(let i=0;i<lats.length;i++){let [y,fac]=lats[i],layer=[];
  for(let k=0;k<n;k++){let a=TAU*k/n+seed*.09,m=1+.065*Math.sin(5*a+seed*.7)+.035*Math.cos(3*a-seed*.1);
   layer.push([center[0]+Math.cos(a)*r[0]*fac*m,center[1]+r[1]*(y+.055*Math.sin(k*2.7+seed)*(.8-Math.abs(y)*.25)),center[2]+Math.sin(a)*r[2]*fac*(1+.06*Math.cos(4*a+seed))]);}
  rings.push(layer);
 }
 for(let k=0;k<n;k++){let j=(k+1)%n;
  g.tri([center[0],center[1]-r[1],center[2]],rings[0][j],rings[0][k],col[0]);
  for(let i=0;i<lats.length-1;i++){
   let c=i===0?col[0]:i===1?col[1]:i===2?col[1+(k%3===0?1:0)]:i===3?col[3]:i===4?col[4]:i===5?col[5]:col[6];
   g.quad(rings[i][j],rings[i][k],rings[i+1][k],rings[i+1][j],c);
  }
  g.tri([center[0],center[1]+r[1]*1.01,center[2]],rings.at(-1)[k],rings.at(-1)[j],col[6]);
 }
 // Controlled leaf teeth along crown margin, not an entire forest of spikes.
 for(let k=0;k<5;k++){
  const a=k*TAU/5+seed*.15,dx=Math.cos(a),dz=Math.sin(a),base=add(center,[dx*r[0]*.80,r[1]*.34,dz*r[2]*.79]);
  v25Petal(g,base,add(base,[dx*r[0]*.26,r[1]*.27,dz*r[2]*.22]),r[0]*.13,1.5,col[4+k%2],col[2+k%2]);
 }
}
function roots30(g,style){
 const col=style===0?M30.z.wood:style===1?M30.l.stone:M30.p.ivory;
 const hi=style===0?M30.z.lit:style===1?M30.l.ridge:M30.p.blush;
 for(let i=0;i<12;i++){
  let a=i*TAU/12+.09,L=style===0?26:24,dx=Math.cos(a),dz=Math.sin(a);
  branch30(g,[[0,10,0],[dx*6,5,dz*6],[dx*L*.70,1.2,dz*L*.68],[dx*L*.95,.05,dz*L*.95]],
   [6.8,4.2,1.9,.05],i%4===0?hi:col,11);
 }
}
function v30Ancient(g){const c=M30.z;
 roots30(g,0);
 // Exposed, huge polygonal trunk with several crossing structural limbs.
 branch30(g,[[0,-.3,0],[-3,13,-2],[3.5,28,0],[-3,43,-1.5],[.3,62,-3]],[14.2,12.1,10.3,7.5,.35],[c.heart,c.wood,c.lit,c.wood],13);
 // Heavy structural lower branching arms support a broad overhead canopy.
 const boughs=[[-31,58,10],[-23,65,-25],[28,62,-21],[30,56,18],[-9,74,-23],[9,75,25],[-23,54,28],[23,65,23],[-10,80,8],[12,80,-4]];
 boughs.forEach(([x,y,z],i)=>{
  let from=[(-1+i%3)*2,30+(i%3)*4,-1],mid=[x*.42,y-16,z*.35],mid2=[x*.78,y-7,z*.74],tip=[x,y-1.2,z];
  branch30(g,[from,mid,mid2,tip],[6.0,4.0,2.6,.20],i%4===0?c.lit:c.wood,11);
 });
 // Cambium ridges spiral in varied directions. Crucially no mask, skull, face,
 // eyes, snout, pupils, ears or face-like symmetry at any point on this tree.
 for(let k=0;k<12;k++){
  const a=k*TAU/12+.18;let path=[];
  for(let j=0;j<7;j++){const t=j/6,r=(12.6-6.4*t),ang=a+t*.34+Math.sin(k*2.1)*.08;
   path.push([Math.cos(ang)*r,4+t*56,Math.sin(ang)*r]);}
  branch30(g,path,[1.05,.90,.73,.51,.35,.24,.03],k%4===0?c.lit:k%3===0?c.heart:c.wood,7);
 }
 // Only two antique lunar-growth arcs, grown out of living amber bark seams.
 // The celestial motifs are relief embedded in the wood, not separate wings.
 // The two antique moon-growth marks are deliberately OFFSET, not paired
 // like eyes or decorative wings. They follow two actual cambium-veined boughs.
 branch30(g,[[-25,44,24],[-31,50,38],[-26,52,44]],[2.5,1.4,.05],c.wood,9);
 arc30(g,[-31,51,43],[-13,64,43],[-4,6,2],1.1,c.gold);
 arc30(g,[-28,51.5,44.2],[-14,61.5,44.2],[-3,4,1],.34,c.amber);
 branch30(g,[[16,42,24],[24,43,36],[28,47,40]],[2.4,1.3,.1],c.wood,9);
 arc30(g,[17,44,41],[32,53,41],[2,3,1],.78,c.gold);
 // High, overlapping foliage layers. The aerial view reveals all rear crowns.
 const crowns=[
  [-29,63,-25,14.9,10.0,13.9],[-8,74,-28,15.1,10.3,14.5],[15,71,-24,15.2,10.5,14.2],[33,62,-22,14,9.0,12.4],
  [-34,58,16,15.1,10.4,15.0],[-13,67,27,15.8,10.3,14.8],[15,68,29,16.0,10.7,15.1],[34,59,20,14.3,9.3,12.9],
  [-5,84,-4,16.2,12.0,15.5],[17,82,-1,13.7,10.3,12.8]];
 for(let i=0;i<crowns.length;i++){
  let [x,y,z,rx,ry,rz]=crowns[i];
  // Every crown has a wood joint deep inside it, not a floating blob.
  branch30(g,[[x*.48,y-14,z*.48],[x*.78,y-7,z*.78],[x,y,z]],[2.9,1.5,.12],i%3===0?c.lit:c.wood,9);
  canopy30(g,[x,y,z],[rx,ry,rz],i*7+12);
 }
 // Intricate lower organic bark relief with simple ancient spiral language.
 v25Spiral(g,[0,14,12.7],3.3,c.gold,1.75,.28);
 for(let i=0;i<5;i++){
  let a=i*TAU/5+.44;
  v25Petal(g,[Math.cos(a)*10,10,Math.sin(a)*9],[Math.cos(a)*19,14,Math.sin(a)*18],2.4,1.9,c.wood,c.lit);
 }
}
function flameLobe30(g,p,tip,width,colorShift=0){
 let pts=[];for(let j=0;j<=12;j++){const t=j/12,cur=mix(p,tip,t),s=Math.sin(Math.PI*t);
  pts.push([cur[0]+Math.sin(t*5+colorShift)*2*s,cur[1]+(3+colorShift*.3)*s,cur[2]+Math.cos(t*4+colorShift)*3*s]);}
 let widths=pts.map((_,i)=>{let t=i/12;return Math.max(.06,width*Math.pow(Math.sin(Math.PI*(.06+.9*t)),.77)*(1-.12*t))});
 const cs=M30.l.fire;surface30(g,pts,widths,[cs[(1+colorShift)%5],cs[2],cs[3],cs[4]],[cs[0],cs[1],cs[2]],[cs[0],cs[1],cs[2]]);
}
function v30Elemental(g){const c=M30.l;
 roots30(g,1);
 // The dark charcoal trunks coil around each other into the lightning crown.
 branch30(g,[[0,-.1,0],[-3,14,1],[4,30,0],[-4,47,-2],[2,65,-10]],[13.2,11.7,10.0,7.6,.45],[c.shadow,c.stone,c.ridge],13);
 for(let s of [-1,1]){
  branch30(g,[[s*3,28,-1],[s*10,44,s*6],[s*24,57,s*13],[s*30,68,s*16]],[6.1,4.1,2.1,.12],[c.shadow,c.ridge],11);
 }
 // Lava fissures follow actual ridges, from roots to fork junctions.
 for(let i=0;i<11;i++){
  const a=i*TAU/11+.18,ps=[];
  for(let j=0;j<7;j++){let t=j/6,r=11.7-6*t;
   ps.push([Math.cos(a+t*.37)*r,4+t*53,Math.sin(a+t*.37)*r]);}
  branch30(g,ps,[.7,.7,.55,.44,.32,.19,.02],i%3===0?c.fire[4]:c.fire[1],6);
 }
 // Flame is grown from the left branch system, not six unrelated orange fans.
 const flames=[
  [[-10,44,15],[-39,79,18],8.1], [[-17,45,14],[-47,65,15],8.8], [[-13,53,8],[-29,87,-1],7.0],
  [[-27,51,6],[-43,79,-7],7.5], [[-22,58,18],[-38,74,30],6.5], [[-10,48,0],[-20,70,25],7.3],
  [[-17,60,-12],[-28,86,-16],6.7]];
 // The fire is continuous because its ember veins run inside the same
 // living limb; no artificial ring/disc at the flame junction.
 branch30(g,[[-7,34,9],[-18,43,15],[-29,52,16],[-36,60,17]],
  [4.8,3.8,2.6,.09],[c.fire[0],c.fire[1],c.fire[2]],10);
 flames.forEach((f,i)=>flameLobe30(g,f[0],f[1],f[2]*.76,i%4));
 // Volumetric storm, with a genuine funnel reaching back toward basalt forks.
 v29Storm(g,[12,76,-17],[24,13,23],44);
 v29Storm(g,[29,62,-33],[13,10,15],49);
 for(let i=0;i<3;i++){
  const p=[5+i*7,62+i*4,7];arc30(g,p,[p[0]+12,66+i*3,17],[0,7,-6],1.15,i%2?c.magenta:c.lavender);
 }
 let coil=[];for(let i=0;i<=64;i++){
  let t=i/64,a=t*TAU*1.57,rad=11*(1-.80*t);
  coil.push([13+Math.cos(a)*rad,72+Math.sin(a)*rad*.78,9+Math.sin(t*3)*3]);
 }branch30(g,coil,coil.map((_,i)=>.96*(1-i/72)),['#eadbff','#b89af8'],9);
 for(let i=0;i<5;i++){
  let a=i*TAU/5+.35,p=[10+Math.cos(a)*13,69+Math.sin(a)*8,11];
  branch30(g,[p,add(p,[2,-3,1.8]),add(p,[-2,-5,3.8]),add(p,[.8,-10,4.0])],[.63,.54,.42,.06],i%2?'#a473f1':'#f3a9ff',6);
 }
 // Two individually oriented glacier fans, embedded into the opposite bough.
 for(let i=0;i<14;i++){
  let a=i*2.40,xx=25+Math.cos(a)*13,zz=17+Math.sin(a)*19;
  const start=[xx,35+(i%4)*2.2,zz],end=add(start,[((i%4)-1.5)*2,13+(i%5)*2.7,(-1+i%3)*4]);
  shard(g,start,end,3.0+(i%4)*.8,c.ice[i%4],8);
 }
 // Massive icy wind travels around the right-hand glacier in full XYZ.
 for(let k=0;k<3;k++){
  const pts=Array.from({length:54},(_,i)=>{let t=i/53,a=t*TAU*(k===0?.68:k===1?1.04:1.30)+k*2.0;
   return [24+Math.cos(a)*(16-3*t),36+28*t+k*4,17+Math.sin(a)*(18-2*t)];});
  surface30(g,pts,pts.map((_,i)=>{let t=i/53;return Math.max(.07,(k===0?2.5:1.65)*Math.sin(Math.PI*(.02+.96*t)))}),
   ['#dafaff','#8de8ff','#bdf8ff'],['#4baee9','#82d7f3'],['#6ed9f4','#218dcf']);
 }
 // Cyan and hot veining spirals climb opposite trunk sides, not pasted decals.
 tubePath30(g,t=>[Math.cos(t*TAU*1.34+.12)*11,2+t*54,Math.sin(t*TAU*1.34+.12)*11],72,t=>.48*(1-t*.72),c.water,8);
 tubePath30(g,t=>[Math.cos(t*TAU*1.17+Math.PI)*10.6,5+t*47,Math.sin(t*TAU*1.17+Math.PI)*10.6],67,t=>.35*(1-t*.7),c.fire[3],7);
 v25Spiral(g,[0,14,12.8],3.4,c.fire[4],1.7,.31);
}
function v30Sakura(g,p,r,seed){const c=M30.p;
 // Deep layered sakura canopies with actual 3D scalloped petals around the rim,
 // rather than flat identical pink disks. All front/back normal surfaces exist.
 v29Dome(g,p,r,[c.petals[0],c.petals[1],c.petals[2],c.petals[3],c.petals[4],c.petals[5]],seed);
 for(let ring=0;ring<2;ring++){
  const count=ring===0?8:5;
  for(let i=0;i<count;i++){
   const a=TAU*(i+ring*.27)/count+seed*.27,dx=Math.cos(a),dz=Math.sin(a),rr=ring===0?.79:.55;
   const begin=add(p,[dx*r[0]*rr,r[1]*(ring===0?.04:.55),dz*r[2]*rr]);
   const dir=norm([dx,.20+ring*.30,dz]);
   const colors=[c.petals[(i+seed+ring)%6],c.petals[(i+seed+ring+1)%6],c.petals[(i+seed+ring+3)%6],c.petals[(i+seed+ring+4)%6]];
   v28Petal(g,begin,dir,[0,1,0],ring===0?5.8:4.1,colors,seed+i);
  }
 }
 // A single flower centre at the top of selected crowns, never repeated spam.
 if(seed%3===0){v29Lotus(g,[p[0],p[1]+r[1]*.78,p[2]],3.9,[.2,1,.1],seed+7)}
}
function v30Possibility(g){const c=M30.p;
 roots30(g,2);
 // Two prominent cream-white sweeping helixes transform into a blush-pink
 // multi-branch crown. The central trunk carries deep visible open voids.
 branch30(g,[[0,-.2,0],[3,14,-2],[-4,32,0],[1,51,-3],[0,65,-4]],
  [12.5,11,9.0,6.5,.30],[c.dark,c.ivory,c.blush],13);
 for(let k=0;k<3;k++){
  tubePath30(g,t=>{let a=k*TAU/3+t*TAU*1.45;
   return [Math.cos(a)*(7.3-2.3*t),5+t*63,Math.sin(a)*(7.1-1.1*t)];},52,
    t=>Math.max(.1,(5.6-4.95*t)),[c.ivory,c.blush,c.rosewood][k],11);
 }
 // Huge white branch elbows across X and Z, physically connected throughout.
 const boughs=[[-33,55,-22],[-15,74,-30],[19,74,-27],[33,57,-22],[-36,52,24],[-11,66,27],[16,67,29],[35,55,22],[4,83,-7]];
 for(let i=0;i<boughs.length;i++){
  let [x,y,z]=boughs[i];branch30(g,[[0,26+(i%3)*3,-1],[x*.38,y-14,z*.31],[x*.70,y-6,z*.73],[x,y,z]],
    [7.2,5.0,2.9,.18],i%3===0?[c.blush,c.ivory,c.white]:[c.ivory,c.white,c.rosewood],12);
 }
 // Eight individually rotated bloom crowns occupy multiple XYZ planes.
 const crowns=[
  [-32,58,-26,15.9,9.5,15],[-11,76,-30,16,10.4,14.2],[18,76,-27,15.3,10,14.5],[33,60,-24,15.0,9,13.6],
  [-37,55,23,15.0,9.2,14.4],[-11,67,30,16,10.2,15.1],[18,70,28,15.4,9.3,14.6],[36,58,23,14.8,8.8,13.9],
  [2,83,-5,17.8,12.1,16.9]];
 for(let i=0;i<crowns.length;i++){const [x,y,z,rx,ry,rz]=crowns[i];
  branch30(g,[[x*.6,y-9,z*.6],[x*.84,y-4,z*.83],[x,y,z]],[2.5,1.35,.13],c.ivory,9);
  v30Sakura(g,[x,y,z],[rx,ry,rz],11+i*3);
 }
 // A single sculpted lotus centre and two restrained large orbital rings.
 v29Lotus(g,[2,95,0],14,[.13,1,.21],18);
 v29Ring(g,[2,78,-4],19,8.8,8.5,c.gold,1.0,.16);
 v29Ring(g,[2,87,-8],8.2,7.8,6,c.bright,.54,-.24);
 // Portal actually anchored into an opening at the lower entwined trunks.
 v29Portal(g,[0,18,13.0],7.1);
 for(const s of [-1,1]){
  branch30(g,[[s*14,6,9],[s*9,13,14],[s*6,19,12]], [3.7,2.3,.06],s===1?c.ivory:c.rosewood,10);
 }
 v25Spiral(g,[0,34,11.1],2.8,c.gold,1.65,.27);
}
function v30Island(ci){
 // Floating strata and physically connected waterfalls: independent per class.
 const g=new Mesh(),N=27,
   palettes=[
    {grass:['#90d92e','#c6ee46','#62ad39'],rim:['#5fae34','#81cf37'],stone:[['#bd885b','#d6a16b'],['#b08b69','#967459'],['#997b70','#826463'],['#6e5a6c','#594e67'],['#63536c','#493e57']]},
    {grass:['#729b61','#9ab669','#577c60'],rim:['#527b60','#719967'],stone:[['#a4a0a2','#938c9f'],['#726f88','#65687e'],['#5b566f','#56506c'],['#4c4462','#37334f'],['#332c47','#262337']]},
    {grass:['#a0d33c','#c5eb4b','#72b648'],rim:['#77be43','#a4cf4b'],stone:[['#c29abf','#ab82b0'],['#b18aa8','#92709e'],['#9271a1','#735b92'],['#7a6389','#5d4d79'],['#68516e','#473a61']]}
   ][ci],
   radii=[32,33,31,28,22,15,8,.3],depth=[.3,-2.0,-7.1,-14,-22,-30,-36,-40],rings=[];
 for(let k=0;k<radii.length;k++){
  let row=[];for(let i=0;i<N;i++){
   let a=TAU*i/N,r=radii[k]*(1+.06*Math.sin(4*a+ci)+.045*Math.cos(7*a-ci));
   row.push([Math.cos(a)*r,depth[k]+(k===0?.2*Math.sin(i*2.2):0),Math.sin(a)*r*.89]);
  }rings.push(row);
 }
 for(let i=0;i<N;i++){
  let j=(i+1)%N;g.tri([0,.6,0],rings[0][j],rings[0][i],palettes.grass[(i+ci)%3]);
  for(let k=0;k<7;k++){
   let colors=k===0?palettes.rim:palettes.stone[Math.min(4,k-1)];g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],colors[(i+k)%2]);
  }
 }
 // Four separate waterfalls begin at the top edge, fold over a rocky lip,
 // then curve off both front and rear of the floating island. No 2D flat strip.
 let outlets=[[-21,21],[-2,29],[22,21],[-12,-29]];
 for(let n=0;n<outlets.length;n++){
  let [x,z]=outlets[n],isBack=z<0,width=n===1?11.7:n===3?5.0:8.6,ps=[];
  for(let i=0;i<=22;i++){
   let t=i/22,y=t<.08?.5-3*t:-.3-(t-.08)/.92*31,
    xx=x+(n-1.4)*1.3*t+Math.sin(t*4.2+n)*1.7*t,
    zz=z+(isBack?-1:1)*(2+17*t+.75*Math.sin(Math.PI*t));
   ps.push([xx,y,zz]);
  }
  // Colour changes across the stream, never in alternating horizontal bands.
  // Seven continuous extruded channels follow the same three-dimensional path.
  const streamColors=['#248ac2','#45c1ee','#93ebff','#ebfdff','#a3eeff','#48bee8','#2586ba'];
  const channels=streamColors.length;
  for(let strip=0;strip<channels;strip++){
   let L=strip/channels-.5,R=(strip+1)/channels-.5;
   for(let i=0;i<ps.length-1;i++){
    let q=ps[i],next=ps[i+1],w0=width*(1-.10*i/22),w1=width*(1-.10*(i+1)/22);
    let a=[q[0]+L*w0,q[1],q[2]],b=[q[0]+R*w0,q[1],q[2]],
        cc=[next[0]+R*w1,next[1],next[2]],d=[next[0]+L*w1,next[1],next[2]];
    g.quad(a,b,cc,d,streamColors[strip]);
    // Real thickness: an independent rear water face and edge walls.
    g.quad([a[0],a[1],a[2]-.75],[d[0],d[1],d[2]-.75],
     [cc[0],cc[1],cc[2]-.75],[b[0],b[1],b[2]-.75],strip%2?'#2aa1d4':'#53b9de');
    if(strip===0)g.quad(a,d,[d[0],d[1],d[2]-.75],[a[0],a[1],a[2]-.75],'#2377b6');
    if(strip===channels-1)g.quad(b,[b[0],b[1],b[2]-.75],[cc[0],cc[1],cc[2]-.75],cc,'#337eb5');
   }
  }
  branch30(g,ps,ps.map((_,i)=>.17*(1-i/31)),'#e6fdff',6);
  // A splash of low-poly white foam at the bottom, sparse and intentional.
  let foot=ps.at(-1);for(let i=0;i<6;i++)ball30(g,add(foot,[(i-2.5)*.85,Math.sin(i*1.7)*.3,.9]),[.55,.32,.55],i%2?'#dfffff':'#f6ffff',i+25);
 }
 // Each island gets class-specific material accents, not cloned green bushes.
 for(let i=0;i<13;i++){
  let a=i*2.399,r=21+(i%4)*1.8,p=[Math.cos(a)*r,.42,Math.sin(a)*r*.87];
  if(ci===0)ball30(g,p,[1.6,.67,1.3],i%2?'#419c3b':'#a7da50',i+42);
  if(ci===1)shard(g,p,add(p,[.7,3+(i%3)*1.2,.5]),1.4,i%3?'#65d3ec':'#d7f9ff',7);
  if(ci===2){ball30(g,p,[1.35,.52,1.4],i%2?'#b5d663':'#ba8dae',i+33);if(i%6===0)v29Lotus(g,add(p,[0,.6,0]),1.3,[0,1,0],i);}
 }
 // Tiny distant satellite islands in genuine 3-D, never foreground spam.
 for(let i=0;i<2;i++){let x=(i?1:-1)*53,z=-30+i*8,y=-16-i*6;
  ball30(g,[x,y,z],[6,1.3,5],ci===2?'#9fcf48':'#a4d946',i+18);
  shard(g,[x,y-.3,z],[x,y-9,z],3.1,ci===2?'#826692':'#615770',7);
 }
 return g;
}
function makeTree30(ci){const g=new Mesh();[v30Ancient,v30Elemental,v30Possibility][ci](g);v29FamilyBoughs(g,ci);return g}
function makeIsland30(ci){return v30Island(ci)}
function v30HeroFruit(ci,groupIndex){
 const g=v29HeroFruit(ci,groupIndex);
 // Large recognisable spiral boulder and gilded whorl, not multiple smaller clones.
 // Preserve original seeded species-specific silhouette and bespoke curlicue stalk.
 return g;
}
