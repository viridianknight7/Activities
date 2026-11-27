/* V26 — three truly volumetric macro-chibi sculptures, deliberately authored
   from the V24 standalone app. Single mesh per class, no selectable variants.
   All detail is geometry with macro facets; no billboards, textures or images. */
const V26COL={
 zo:{wood:'#ad632f',woodLight:'#dc9049',woodDeep:'#793c22',leaf:['#086e3c','#139c49','#48bf35','#89da39','#d2ed58'],horn:'#ffda85',inlay:'#ffea9c'},
 lo:{rock:'#40364f',ridge:'#69506b',crack:'#fa7025',magma:'#ff5826',sun:'#ffd542',cloud:'#e0f4fc',cloudDark:'#81b9ce',water:'#0cbeec',ice:'#91e7fb'},
 pa:{wood:'#b32988',woodLight:'#e755aa',woodDark:'#7c226c',petals:['#ffa2d8','#f95ab3','#cd3e9e','#ad6bc7','#ffe2a8'],gold:'#ffd354',aqua:'#96edeb'}
};
const v25tube=(g,p,r,c,s=8)=>tube(g,p,r,c,s);
const v25orb=(g,c,r,col,seed=1)=>blob(g,c,r,col,seed,10,6);
function v25Spiral(g,c,rad,col,turns=1.7,th=.19,axis='z'){
 let pts=[];for(let i=0;i<=50;i++){let t=i/50,a=t*TAU*turns+.22,v=rad*(1-t*.89);
 pts.push(add(c,axis==='z'?[Math.cos(a)*v,Math.sin(a)*v,.10]:[Math.cos(a)*v,.08,Math.sin(a)*v]));}
 v25tube(g,pts,pts.map((_,i)=>th*(.9-i/95)),col,6);
}
function v25Petal(g,begin,tip,width,depth,primary,facet){
 // Raised double-sided leaf with an actual 3D central ridge and chunky bevel.
 const axis=norm(sub(tip,begin)),side=norm(cross(axis,[0,0,1]));let side2=Math.hypot(...side)<.4?[1,0,0]:side;
 const center=mix(begin,tip,.51),left=add(center,mul(side2,width)),right=sub(center,mul(side2,width));
 const lift=add(center,[0,depth*.24,depth]);
 const back=sub(center,[0,depth*.05,depth*.65]);
 g.tri(begin,left,lift,primary);g.tri(begin,lift,right,facet);
 g.tri(left,tip,lift,facet);g.tri(lift,tip,right,primary);
 g.tri(begin,back,left,facet);g.tri(begin,right,back,primary);
 g.tri(left,back,tip,primary);g.tri(back,right,tip,facet);
 v25tube(g,[begin,center,tip],[width*.095,width*.11,.02],facet,5);
}
function v25LeafCrown(g,center,r,seed){
 // Oversized, domed leaf architecture with depth, not flat stacked discs.
 const greens=V26COL.zo.leaf;
 v25orb(g,center,r,[greens[1],greens[2],greens[0]],seed);
 for(let j=0;j<8;j++){
   const a=j*TAU/8+(seed%8)*.13,base=add(center,[Math.cos(a)*r[0]*.44,-r[1]*.10,Math.sin(a)*r[2]*.45]);
   const tip=add(center,[Math.cos(a)*r[0]*1.05,r[1]*(.24+(j%3)*.12),Math.sin(a)*r[2]*1.09]);
   v25Petal(g,base,tip,1.35+r[0]*.10,.75,greens[(j+seed)%4],greens[(j+seed+2)%5]);
 }
 // Small crown-shaped top leaves in a second spatial tier.
 for(let j=0;j<4;j++){
   let a=j*TAU/4+.6;
   v25Petal(g,add(center,[Math.cos(a)*r[0]*.27,r[1]*.67,Math.sin(a)*r[2]*.27]),
    add(center,[Math.cos(a)*r[0]*.48,r[1]*1.42,Math.sin(a)*r[2]*.48]),1.6,1.1,greens[j+1],greens[4]);
 }
}
function v25RootRing(g,wood,highlight,scale=1){
 for(let i=0;i<10;i++){let a=i*TAU/10,dx=Math.cos(a),dz=Math.sin(a);
 v25tube(g,[[dx*1,8,dz*1],[dx*5.1,4.0,dz*4.6],[dx*11.7,1.2,dz*10.7],[dx*16.8*scale,.2,dz*14.9*scale]],
 [4.8,3.4,1.7,.06],i%4===0?highlight:wood,9);
 }
}
function v25Zoan(g){
 const c=V26COL.zo;
 v25RootRing(g,c.wood,c.woodLight,1.0);
 const trunk=[[0,.2,0],[-1,9,0],[1.8,18,1],[-1.5,28,-1],[.1,39,-.5],[0,48,0]];
 v25tube(g,trunk,[10.2,8.7,7.4,6.0,3.8,.2],c.wood,11);
 // Macro carved bark channels curve around the trunk on front, back and sides.
 for(let k=0;k<7;k++){
  let a=k*TAU/7+.2,pts=trunk.slice(0,5).map((p,i)=>add(p,[Math.sin(a+i*.18)*(8.4-i*.75),0,Math.cos(a+i*.18)*(8.4-i*.75)]));
  v25tube(g,pts,[.43,.42,.30,.20,.04],k%3?c.woodLight:c.woodDeep,5);
 }
 // Animal identity is a subtle piece of the wood, not a pasted mascot face.
 v25orb(g,[0,20.6,7.8],[4.5,4.0,2.6],[c.woodLight,c.wood],22);
 for(const side of [-1,1]){
  v25Petal(g,[side*3.2,22,7.8],[side*6.8,25,8.1],2.7,1.1,c.woodLight,c.woodDeep);
  v25orb(g,[side*2.45,21.1,10.20],[.56,.52,.30],c.inlay,32);
  v25orb(g,[side*2.5,21.15,10.49],[.23,.29,.12],'#244335',22);
 }
 v25orb(g,[0,19.0,10.8],[.92,.64,.42],c.woodDeep,14);
 v25Spiral(g,[0,11,8.4],2.65,c.inlay,1.6,.24);
 // Two living antlers are thick wood converging into pale magical tips.
 for(const side of [-1,1]){
   v25tube(g,[[side*4,26,1.8],[side*8.4,33,2.9],[side*13.6,40,3.6],[side*17.4,47,4],[side*15.6,52,3.2]],[3.0,2.5,1.8,.9,.04],c.woodLight,9);
   v25tube(g,[[side*12,38,3.4],[side*17,42,4],[side*20,46,4]],[1.9,1,.04],c.horn,8);
   v25tube(g,[[side*8.1,33,2.9],[side*9.2,40,3.5],[side*8,44,3.3]],[1.5,.75,.04],c.horn,8);
 }
 // Deeply radial permanent bough system: front, rear, both sides.
 for(let i=0;i<12;i++){
   let a=i*2.399963,dist=11+(i%3)*2.1,y=30+(i%4)*3.0;
   let end=[Math.cos(a)*dist,y,Math.sin(a)*dist];
   v25tube(g,[[0,19+i%3*2,0],[end[0]*.48,y-8,end[2]*.47],end,add(end,[Math.cos(a)*2,3,Math.sin(a)*2])],[4,3,1.75,.08],i%4===0?c.woodLight:c.wood,9);
   const q=add(end,[0,5.3,0]);
   v25LeafCrown(g,q,[6.5+(i%3)*.5,5.3+(i%2)*.8,6.5+(i%4)*.4],51+i*3);
 }
 v25LeafCrown(g,[0,49,-2],[9.8,7.2,10.2],150);
 v25LeafCrown(g,[-4.5,54,-3],[5.1,4.8,5.3],200);
 // Sparse enormous prehistoric fronds breaking the outline.
 for(let i=0;i<9;i++){
  const a=i*2.39,q=[Math.cos(a)*12,37+(i%3)*4,Math.sin(a)*11];
  v25Petal(g,q,add(q,[Math.cos(a)*7,-2.0,Math.sin(a)*7]),2.65,1.2,c.leaf[i%3+1],c.leaf[4]);
 }
}
function v25Flame(g,from,h,seed=0){
 const palette=['#dd341c','#f75a1d','#ff9e26','#ffe355'];
 // Flame arcs lean and fold like oversized stylised fire; avoid crystal columns.
 for(let j=0;j<5;j++){
  let a=j*TAU/5+seed*.37,dx=Math.cos(a),dz=Math.sin(a),base=add(from,[dx*2.0,0,dz*2.0]);
  let curve=add(base,[dx*(1.3+(j%2)*.8),h*.50,dz*1.2]);
  let tip=add(base,[dx*(3.2+(j%3)),h*(.84+(j%3)*.12),dz*3.0]);
  v25tube(g,[base,curve,tip],[2.15,1.7,.02],palette[(j+seed)%3],7);
  v25Petal(g,curve,tip,2.2,1.1,palette[(j+seed+1)%3],palette[3]);
 }
 // Firelight blades are tapered leaves, not straight spikes.
 for(let i=0;i<3;i++){
  let origin=add(from,[(i-1)*2.2,2,1.5]);
  v25Petal(g,origin,add(origin,[(i-1)*2.0,h*.72,1.5]),2.35,1.9,palette[(i+2)%3],palette[3]);
 }
}
function v25Storm(g,base,r,seed){
 const c=V26COL.lo;
 // Volumetric thunderhead with dark underbelly and bright crown silhouette.
 v25orb(g,base,[r,3.9,r*.88],[c.cloudDark,c.cloud,c.cloud],seed);
 for(let i=0;i<6;i++){
  let a=i*TAU/6+.26;
  v25orb(g,add(base,[Math.cos(a)*r*.64,(i%3)*1.0,Math.sin(a)*r*.61]),[r*.43,3.5,r*.48],
   i%3?['#effcff','#bedce9','#a4cee2']:['#f2fdff','#d4eef8'],seed+i+20);
 }
 for(let i=0;i<3;i++){
  let q=add(base,[(i-1)*r*.55,-2,r*.5]);
  v25tube(g,[q,add(q,[1.2,-3,.8]),add(q,[-.7,-3.2,1.2]),add(q,[1.5,-7.2,1])],[.48,.43,.30,.02],c.sun,5);
 }
}
function v25Ice(g,q,h,seed){
 const cs=['#74d1ee','#c5f6ff','#48badd'];
 for(let j=0;j<4;j++){
  let a=j*TAU/4+seed*.16;
  let from=add(q,[Math.cos(a)*2,0,Math.sin(a)*2]);
  const end=add(from,[Math.cos(a)*.7,h*(.7+(j%3)*.18),Math.sin(a)*.6]);
  v25tube(g,[from,add(end,[0,-h*.35,0]),end],[2.3,1.9,.015],cs[j%3],6);
 }
}
function v25Logia(g){
 const c=V26COL.lo;
 v25RootRing(g,c.rock,c.ridge,.96);
 // Rock is the trunk, with wide cracks carrying actual lava volumes.
 const spine=[[0,0,0],[-1,9,0],[2.8,18,-.8],[-3.5,28,1],[1.7,39,-1],[.4,49,-.5]];
 v25tube(g,spine,[10.0,8.8,7.4,6.2,4.1,.20],[c.rock,c.ridge],11);
 for(let k=0;k<6;k++){
  let a=k*TAU/6,pts=spine.slice(0,5).map((p,i)=>add(p,[Math.cos(a+i*.13)*(8.0-i*.45),0,Math.sin(a+i*.13)*(8.0-i*.45)]));
  v25tube(g,pts,[.75,.74,.63,.46,.02],k%2?c.magma:c.sun,6);
 }
 // Two currents orbit the geology as three-dimensional water branches.
 for(let q=0;q<2;q++){
  const ps=Array.from({length:60},(_,i)=>{let t=i/59,a=1.2+q*Math.PI+t*TAU*1.4;return [Math.cos(a)*(9.2-.4*t),3+t*42,Math.sin(a)*(9.8-.6*t)];});
  v25tube(g,ps,ps.map((_,i)=>(q===0?1.72:.65)*(.98-i/185)),q===0?c.water:'#d4faff',8);
 }
 // Three distinct elements crown the tree in an asymmetrical, full-depth orbit.
 const origins=[[10,38,2],[-11,39,-5],[0,51,3],[7,47,-11],[-5,45,12]];
 for(let i=0;i<origins.length;i++){
  const p=origins[i],bend=add(p,[p[0]*.62,1.2,p[2]*.34]);
  v25tube(g,[[0,25+i*1.0,0],[p[0]*.7,p[1]-5,p[2]*.5],bend],[3.4,2.7,.5],i%3?c.rock:c.ridge,8);
 }
 v25Storm(g,[-11,45,8],9.4,11);
 v25Storm(g,[1,55,-4],7.3,41);
 v25Storm(g,[8.5,42,-12],6.2,31);
 v25Flame(g,[12,40,5],9.2,2);
 v25Flame(g,[7,50,0],7,3);
 v25Flame(g,[-1,47,10],7,0);
 // Ice and lightning grow from the geology and root tips.
 for(let i=0;i<6;i++){let a=i*TAU/6;v25Ice(g,[Math.cos(a)*12,.5,Math.sin(a)*12],7+(i%3)*2,i);}
 v25Spiral(g,[0,11,8],2.8,c.sun,1.5,.32);
}
function v25Blossom(g,p,scale,seed){
 const c=V26COL.pa;
 // Seven deep macro-faceted petals point in all three axes (not flattened pancakes).
 const outer=7,colors=c.petals;
 for(let i=0;i<outer;i++){
  const a=i*TAU/outer+seed*.16,start=add(p,[Math.cos(a)*scale*.12,0,Math.sin(a)*scale*.13]);
  const end=add(p,[Math.cos(a)*scale*(.82+(i%3)*.13),scale*(.1+(i%3)*.12),Math.sin(a)*scale*(.8+(i%2)*.15)]);
  v25Petal(g,start,end,scale*.31,scale*.39,colors[(i+seed)%4],colors[(i+seed+2)%4]);
  // Large pillowed outer petal is a deep macro-faceted organic shape.
  const center=mix(start,end,.75);
  v25orb(g,center,[scale*.31,scale*.30,scale*.33],[colors[(i+seed)%4],colors[(i+seed+1)%4]],seed*13+i);
 }
 v25orb(g,add(p,[0,scale*.26,0]),[scale*.38,scale*.31,scale*.39],['#ffe884','#f8a747'],seed+34);
 for(let i=0;i<5;i++){
  let a=i*TAU/5;
  v25orb(g,add(p,[Math.cos(a)*scale*.27,scale*.49,Math.sin(a)*scale*.24]),[.40,.64,.40],'#fff0ab',seed+i+56);
 }
}
function v25FloatingRibbon(g,p,y,rx,rz,col,th=1.15,turn=1){
 let ps=Array.from({length:59},(_,i)=>{let t=i/58,a=turn*t*TAU+.31;
  return add(p,[Math.cos(a)*rx,y*t,Math.sin(a)*rz]);});
 v25tube(g,ps,ps.map((_,i)=>th*(1-.35*i/59)),col,9);
}
function v25Paramecia(g){
 const c=V26COL.pa;
 v25RootRing(g,c.wood,c.woodLight,1.04);
 // Three separate interwoven limbs form an impossible torsion trunk.
 for(let k=0;k<3;k++){
  const pts=Array.from({length:31},(_,i)=>{let t=i/30,a=k*TAU/3+t*TAU*1.28;
    return [Math.cos(a)*(5.5-t*2.0),t*49,Math.sin(a)*(5.7-t*1.7)];});
  v25tube(g,pts,pts.map((_,i)=>Math.max(.3,5.2-i*.153)),[c.wood,c.woodLight,c.woodDark][k],9);
 }
 // Broad branches with enormous petalled crowns, irregular in full XYZ.
 const crowns=[];
 for(let i=0;i<10;i++){
  const a=i*2.399963,rr=10+(i%3)*1.9,y=32+(i%4)*3.3;
  let p=[Math.cos(a)*rr,y,Math.sin(a)*rr];
  v25tube(g,[[0,20+i%3*2,0],[p[0]*.65,y-6,p[2]*.62],p],[3.7,2.65,.3],i%2?c.wood:c.woodDark,9);
  crowns.push(p);
  v25Blossom(g,add(p,[0,4,0]),5.7+(i%3)*.5,i);
 }
 // Two great portals are anchored in different spatial planes, not decorative front hoops.
 const circle=(center,r1,r2,col,phase=0,twist=0)=>{
  let pts=Array.from({length:53},(_,i)=>{let a=i*TAU/52+phase;return add(center,[Math.cos(a)*r1,Math.sin(a)*r2,Math.sin(a)*twist+Math.cos(a)*2]);});
  v25tube(g,pts,pts.map(()=>1.10),col,9);
 };
 circle([1,35,1],11,9,c.gold,.22,7.2);
 circle([-3,43,-3],8.9,10,c.aqua,.9,-6.9);
 v25FloatingRibbon(g,[0,4,0],43,9.5,9.2,c.gold,1.25,1.56);
 v25FloatingRibbon(g,[0,16,-3],25,7.8,7.3,'#ff9ad9',.48,1.3);
 // A giant top bloom anchors the silhouette, angled off-axis rather than oval stack.
 v25Blossom(g,[0,55,-2],7.8,18);
 v25Spiral(g,[0,11,8.1],2.8,'#ffdc74',1.7,.25);
 for(let i=0;i<9;i++){
  let a=i*2.40,rad=14+(i%4);
  v25orb(g,[Math.cos(a)*rad,16+(i%7)*4.5,Math.sin(a)*rad],[1.4,1.65,1.5],i%2?'#efb55a':'#b986e0',i+43);
 }
}
function v25FamilyBoughs(g,ci){
 const cols=[V26COL.zo.wood,V26COL.lo.rock,V26COL.pa.wood],hi=[V26COL.zo.woodLight,V26COL.lo.ridge,V26COL.pa.woodLight];
 for(let i=0;i<groups[ci].length;i++){
  const end=anchorFor(ci,i),from=[end[0]*.19,16+(i%4)*1.7,end[2]*.17];
  v25tube(g,[from,[end[0]*.56,end[1]+5,end[2]*.65],add(end,[0,3.3,0]),add(end,[0,1.2,0])],[3.1,2.2,.95,.18],i%3?cols[ci]:hi[ci],9);
 }
}
function makeTree25(ci){const g=new Mesh();[v25Zoan,v25Logia,v25Paramecia][ci](g);v25FamilyBoughs(g,ci);return g}
function island25(ci){
 const g=new Mesh(),N=19,r=[24.0,24.4,21.4,17.8,13.2,8.5,3.8,.2],y=[.18,-2.7,-6.8,-11.5,-17,-22.3,-26.4,-28.4];
 const rings=r.map((radius,k)=>Array.from({length:N},(_,i)=>{
  let a=i*TAU/N,rr=radius*(1+.075*Math.sin(i*2.7+ci*.2)+.05*Math.cos(i*5));
  return [Math.cos(a)*rr,y[k]+(k<2?.25*Math.sin(i*3):0),Math.sin(a)*rr*.90];
 }));
 for(let i=0;i<N;i++){
  let j=(i+1)%N;g.tri([0,.5,0],rings[0][j],rings[0][i],i%3===0?'#b1df54':'#62bc39');
  for(let k=0;k<7;k++)g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],
    [['#43a437','#75cd40'],['#c49b61','#b58552'],['#947256','#b88e60'],['#80675e','#9c7a69'],['#665663','#7a6467'],['#554960','#4b405b'],['#3e3650','#302d45']][k][i%2]);
 }
 for(let i=0;i<19;i++){
  let a=i*2.39996,q=[Math.cos(a)*(14.2+i%4*1.6),.7,Math.sin(a)*(13.2+i%3*2)];
  v25orb(g,q,[1.7,1.0,1.7],i%3?'#4cab34':'#97d847',i+120);
 }
 // Two waterfall sheets actually follow the angled front of the floating strata.
 for(const side of [-1,1]){
  let root=[side*10,.2,21],rows=[];
  for(let i=0;i<=14;i++){let t=i/14;rows.push([root[0]+side*(1.9*t+1.2*Math.sin(t*Math.PI)),.2-t*29.1,root[2]+8.6*t+Math.sin(t*Math.PI)*.7]);}
  for(let i=0;i<14;i++)for(let j=0;j<5;j++){
   const x=(j-2.5)*.83,x2=(j-1.5)*.83;
   g.quad(add(rows[i],[x,0,0]),add(rows[i],[x2,0,0]),add(rows[i+1],[x2,0,0]),add(rows[i+1],[x,0,0]),
    ['#6ed7ed','#f6ffff','#37c2e7','#b8faff','#118ec1'][j]);
  }
  for(let i=0;i<8;i++)v25orb(g,[rows.at(-1)[0]+(i-4)*.7,-28.4,rows.at(-1)[2]],[.33,.25,.47],i%2?'#c3f7ff':'#84d5eb',i+15);
 }
 return g;
}
function familyBranch25(ci){const g=new Mesh(),c=[V26COL.zo.wood,V26COL.lo.rock,V26COL.pa.wood][ci];
 v25tube(g,[[-13,-2,-1],[-9,0,.9],[-5,1.2,2],[0,2.0,2.9],[5,1.1,2],[9,0,.9],[13,-2,-1]],
  [.55,1.2,2.1,2.4,2.1,1.2,.55],c,9);
 for(let i=0;i<5;i++){let x=(i-2)*5;
  v25Petal(g,[x,1.1,1],[x+.8,3.9,-1],1.3,.55,[V26COL.zo.leaf[1],V26COL.lo.cloudDark,V26COL.pa.petals[0]][ci],
   [V26COL.zo.leaf[4],'#e9fcff',V26COL.pa.petals[2]][ci]);
 }
 return g;
}
function genericFruit25(ci,seed){
 const g=new Mesh(),palletes=[['#7de747','#289e4e','#aee95b','#ffe06e'],['#ffc84b','#13bded','#f77432','#cdfaff'],['#ff7cbd','#a47ce6','#e9b366','#ffdf9e']];
 let c=palletes[ci][seed%4],ratio=seed%4===0?[.95,1.12,.9]:seed%4===1?[1.08,.90,1]:seed%4===2?[.80,1.07,.86]:[1.05,1.04,1.05];
 v25orb(g,[0,0,0],ratio,c,seed);
 v25tube(g,[[0,.88,0],[.14,1.18,.04],[.32,1.18,0]],[.13,.11,.02],'#488b46',6);
 v25Spiral(g,[0,.04,ratio[2]+.1],.33,'#fff4ad',1.38,.053);
 return g;
}

