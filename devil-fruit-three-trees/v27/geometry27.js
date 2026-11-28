/* V27: three hand-authored, physically deep macro-faceted spirits. This new
   geometry is built exclusively on the existing V26 engine and catalogue. */
const W27={
 z:{b:'#92542f',b2:'#bc7740',b3:'#e4a85d',shade:'#543522',bone:'#ffdf9d',leaf:['#076943','#17884a','#27a849','#53c74b','#9ddd58','#c6f27a']},
 l:{b:'#383148',mid:'#534259',shade:'#20243d',hi:'#765269',fire:['#bf2f25','#f95b24','#ff9f35','#ffe46b'],storm:['#47677d','#6d94a6','#a7cfdb','#e6f5ed'],water:['#0da5c0','#35d4e4','#9af7ed'],ice:'#b2faff'},
 p:{b:'#892573',b2:'#bc338d',hi:'#e15ba9',dark:'#59205f',petals:['#b74191','#eb6db5','#ff9dd3','#ffd4e9','#ee94bf'],gold:'#ffd66e',aqua:'#8af3e6'}
};
const s27=(g,pts,rad,col,seg=9)=>tube(g,pts,rad,col,seg);
const o27=(g,p,r,col,seed=1)=>blob(g,p,r,col,seed,10,6);
function v27Surface(g,center,rx,rz,thick,palette,seed=0){
 // One unusually shaped, thick, terraced, radial canopy with a top and a
 // shadowed underside. Four closed rings have irregular independent rims.
 const n=15, rings=[], jitter=(a,i)=>1+.075*Math.sin(a*3+seed*.7+i*.3)+.055*Math.cos(a*5-seed*.13);
 const ringSpec=[[.48,thick*.43],[.82,thick*.22],[1,-thick*.12],[.62,-thick*.58],[.13,-thick*.49]];
 for(let layer=0;layer<ringSpec.length;layer++){
  let [rad,y]=ringSpec[layer];rings.push(Array.from({length:n},(_,j)=>{let a=j*TAU/n, f=jitter(a,j);
   return [center[0]+Math.cos(a)*rx*rad*f,center[1]+y+.12*Math.sin(j*2.3+seed),center[2]+Math.sin(a)*rz*rad*(1+.075*Math.cos(j*1.9+seed))]}));
 }
 for(let j=0;j<n;j++){const next=(j+1)%n;g.tri(add(center,[0,thick*.50,0]),rings[0][j],rings[0][next],palette[2]);
  for(let layer=0;layer<4;layer++)g.quad(rings[layer][j],rings[layer][next],rings[layer+1][next],rings[layer+1][j],(layer===0?palette[j%5===0?2:1]:layer===1?palette[1]:layer===2?palette[0]:palette[3]));
  g.tri(add(center,[0,-thick*.53,0]),rings[4][next],rings[4][j],palette[3]);
 }
 // Large foliate fins on the outside grow in 3 dimensions from the rim.
 for(let j=0;j<3;j++){let a=(j+.4)*TAU/3+seed*.31,outer=[center[0]+Math.cos(a)*rx*.8,center[1]+thick*.05,center[2]+Math.sin(a)*rz*.84];
  let tip=[center[0]+Math.cos(a)*rx*(1.0+(j%3)*.08),center[1]+thick*(.28+j%2*.08),center[2]+Math.sin(a)*rz*1.10];
  v25Petal(g,outer,tip,rx*.14,1.2,palette[(j+2)%palette.length],palette[(j+4)%palette.length]);}
}
function v27Crest(g,base,tips,scale,cols){
 for(let i=0;i<tips.length;i++){
  const [p1,p2]=tips[i],start=add(base,p1),end=add(base,p2);
  s27(g,[start,mix(start,end,.52),end],[scale*(.95-i*.12),scale*(.52-i*.08),.04],i%2?cols[0]:cols[1],7);
 }
}
function v27Zoan(g){
 const c=W27.z;
 // Grounded megafauna: asymmetric six-strand buttress roots, each with depth.
 const roots=[[17,11],[-16,14],[5,17],[-7,-16],[15,-9],[-17,-5],[0,-18],[11,18]];
 for(let i=0;i<roots.length;i++){let [x,z]=roots[i];s27(g,[[0,8,0],[x*.38,4.3,z*.38],[x*.77,1.2,z*.75],[x,.15,z]],[4.4,3.2,1.45,.11],i%4===0?c.b2:c.b,9)}
 // Twisted barrel and thick rear volume, bark catches light in individual facets.
 s27(g,[[0,0,0],[2,12,-.7],[-1.7,23,-2],[2.2,35,1],[-1.0,47,-1.8],[0,55,-3]],[10.4,9.1,7.6,6.1,3.8,.25],[c.b,c.b2,c.b],12);
 for(let k=0;k<9;k++){let a=k*TAU/9+.24,pts=[];for(let t=0;t<6;t++){
  let h=4+t*6.6,rr=9.2-t*1.02;pts.push([Math.cos(a+t*.12)*rr,h,Math.sin(a+t*.12)*rr-1]);}
  s27(g,pts,[.55,.47,.39,.28,.19,.02],k%3?c.b2:c.shade,6);
 }
 // Guardian muzzle is a living part of the trunk, not a pasted mascot.
 o27(g,[.2,22.0,8.3],[5.9,5.8,3.0],[c.b2,c.b],72);
 for(const side of [-1,1]){
  v25Petal(g,[side*3.7,25.0,9],[side*9,32.0,9.6],2.9,2.15,c.b2,c.shade);
  o27(g,[side*2.5,23.6,10.67],[.75,.66,.31],c.bone,101+side);
  o27(g,[side*2.5,23.55,10.95],[.3,.36,.17],'#234b40',110+side);
 }
 o27(g,[.1,21.2,11.12],[1.3,.93,.65],c.shade,84);v25Spiral(g,[.2,13.2,8.9],3.2,c.bone,1.7,.29);
 // Antlers traverse front/back depth; tines lean at different angles.
 for(const side of [-1,1]){
  let p=[[side*3,29,0],[side*7.7,38,side*1.9],[side*12.8,44,side*4.3],[side*16.5,50,side*6.1],[side*17.5,56,side*5.2]];
  s27(g,p,[3.5,2.6,1.6,.8,.035],[c.b3,c.bone],9);
  for(let j=1;j<=3;j++){let from=p[j];s27(g,[from,add(from,[side*(1+j*.3),3.0,side*1.2]),add(from,[side*(3+j*.7),8+j,side*(2+j*.6)])],[1.15,.64,.02],c.bone,7)}
 }
 // Vast distinct crown masses. The rear, lateral and forward lobes are all
 // supported by 3D boughs; no repetitive stacked oval canopy geometry.
 const crowns=[
  [-13,44,-10,9,7.9,10.1], [12,46,-10,10,9,10], [-13,42,12,8.7,8.7,10.8],
  [13,44,12,9.0,9.2,10.8], [-2,54,-9,10,9.6,11.7], [1,56,9,9.2,9.4,10.8], [0,62,0,8.2,7.8,10.4]
 ];
 for(let i=0;i<crowns.length;i++){let [x,y,z,rx,rz,h]=crowns[i];
  s27(g,[[0,28,-1],[x*.38,35,z*.35],[x,y-3,z]],[4.3,2.9,.22],i%3===0?c.b2:c.b,9);
  v27Surface(g,[x,y,z],rx,rz,h,[c.leaf[(i+1)%5],c.leaf[2],c.leaf[4],c.leaf[0],c.leaf[3]],i*3);
  // Architectural crown mass with height; unlike a paper-flat green plate.
  // a few tall leaves escape the skyline, with broad wedge-like profiles.
  for(let j=0;j<2;j++){let ang=(j+i*.27)*TAU/2;
   v25Petal(g,[x+Math.cos(ang)*rx*.4,y+h*.3,z+Math.sin(ang)*rz*.35],
    [x+Math.cos(ang)*rx*.7,y+h*(1.08+(j%2)*.13),z+Math.sin(ang)*rz*.68],2.1+(i%3)*.2,1.3,c.leaf[4],c.leaf[0]);}
 }
 // A handful of low thorn-like fern accents rather than a sea of random spikes.
 for(let i=0;i<5;i++){let a=i*TAU/5+.2;v25Petal(g,[Math.cos(a)*7,30,Math.sin(a)*7],[Math.cos(a)*16,34,Math.sin(a)*16],2.2,1.1,c.leaf[2],c.leaf[4]);}
}
function v27Cloud(g,center,rx,rz,seed){const c=W27.l;let colors=c.storm;
 // Dark teal thunderhead, creamy facets across its top and irregular lobes.
 v27Surface(g,center,rx,rz,6.6,[colors[1],colors[2],colors[3],colors[0],colors[2]],seed);
 for(let i=0;i<5;i++){let a=i*TAU/5+seed*.24;
  o27(g,add(center,[Math.cos(a)*rx*.63,1.2+(i%3),Math.sin(a)*rz*.55]),[rx*.36,3.0,rz*.35],i%2?colors[2]:colors[3],11+seed+i);}
}
function v27Sheet(g,pts,widths,front,back,thickness=.38){
 // A tapered double-sided bent surface with actual physical side walls.
 const n=pts.length,frames=[];for(let i=0;i<n;i++){
  const tangent=norm(sub(pts[Math.min(i+1,n-1)],pts[Math.max(i-1,0)]));
  let sideways=norm(cross(tangent,[0,1,0]));if(Math.hypot(...sideways)<.04)sideways=[1,0,0];
  let normal=norm(cross(tangent,sideways));frames.push({a:add(pts[i],mul(sideways,widths[i])),b:sub(pts[i],mul(sideways,widths[i])),n:normal});
 }
 for(let i=0;i<n-1;i++){let A=frames[i],B=frames[i+1],a=sub(A.a,mul(A.n,thickness)),b=sub(A.b,mul(A.n,thickness)),c=sub(B.a,mul(B.n,thickness)),d=sub(B.b,mul(B.n,thickness));
  g.quad(A.a,B.a,B.b,A.b,i%2?front:back);g.quad(a,b,d,c,back);
  g.quad(A.a,a,c,B.a,front);g.quad(A.b,B.b,d,b,back);
 }
}
function v27Flame(g,p,rad,h,phase){const c=W27.l;
 // A few massive folded fire-sails form one contiguous open volume.
 for(let j=0;j<5;j++){let a=phase+j*TAU/5,dir=[Math.cos(a),0,Math.sin(a)],q=add(p,mul(dir,rad*.28));
  const pts=[q,add(q,[dir[0]*2,h*.24,dir[2]*2]),add(q,[dir[0]*4,h*.58,dir[2]*3]),add(q,[dir[0]*(4+j%2),h*(1.02+j%2*.12),dir[2]*2.9])];
  v27Sheet(g,pts,[rad*.22,rad*.4,rad*.26,.01],c.fire[(j+2)%4],c.fire[(j+1)%4],.52);
  if(j%2===0)v27Sheet(g,[add(q,[dir[0],h*.12,0]),add(q,[dir[0]*3,h*.48,0]),add(q,[dir[0]*2,h*.77,dir[2]*2])],[rad*.16,rad*.25,.01],c.fire[3],c.fire[1],.25);
 }
}
function v27Logia(g){const c=W27.l;
 for(let j=0;j<9;j++){let a=j*TAU/9;let end=[Math.cos(a)*16.8,.2,Math.sin(a)*15.5];
  s27(g,[[0,7,0],[end[0]*.40,3.8,end[2]*.38],end],[4.7,3.1,.1],j%3===0?c.mid:c.b,9);
 }
 s27(g,[[0,0,0],[1.8,14,-1],[-1.8,27,1.8],[2.2,40,-3.2],[-3.2,50,-1]], [10.0,9.1,7.9,6.7,.3],[c.b,c.mid],13);
 // Cracks and magma flow physically through the geology in depth.
 for(let j=0;j<9;j++){let a=j*TAU/9+.3,ps=[];for(let k=0;k<5;k++){
  let rad=9.1-k*.9,y=4+k*8.6;ps.push([Math.cos(a+k*.17)*rad,y,Math.sin(a+k*.17)*rad]);}
  s27(g,ps,[.51,.5,.45,.32,.02],j%3===0?c.fire[2]:c.fire[0],5);
 }
 // Storm grows out of LEFT/REAR, fire pours out of RIGHT/FRONT, ice roots and
 // tidal rings orbit both, so side angles expose entirely different anatomy.
 for(const [p,i] of [[[-14,43,-7],0],[[-4,56,-9],1],[[9,50,-14],2]]){
  s27(g,[[0,27,0],[p[0]*.6,p[1]-7,p[2]*.5],p],[4.1,3.0,.2],i%2?c.mid:c.b,9);v27Cloud(g,p,i===0?10:i===1?8:7,i===0?8.1:6.8,i+7);
 }
 for(const [p,i] of [[[14,37,7],0],[[12,47,0],1],[[4,53,11],2]]){
  s27(g,[[0,25,0],[p[0]*.55,p[1]-6,p[2]*.55],p],[4.2,2.5,.15],c.mid,10);v27Flame(g,p,5.8-i*.5,14-i*1.5,i*.5);
 }
 // Broad river curls are surfaces wrapping the trunk, with true front/back sides.
 for(let q=0;q<2;q++){
  let points=[];for(let i=0;i<=54;i++){let t=i/54,a=t*TAU*(q===0?1.32:.93)+(q===0?.3:2.4);let r=(q===0?11.6:8.7)-(q===0?1.9:1)*t;
   points.push([Math.cos(a)*r,4+t*(q===0?42:39),Math.sin(a)*r]);}
  v27Sheet(g,points,points.map((_,i)=>(q===0?2.7:1.0)*(1-.38*i/54)),c.water[q===0?1:2],c.water[q===0?0:1],.45);
  s27(g,points,points.map((_,i)=>(q===0?.43:.22)*(1-i/80)),c.water[2],7);
 }
 // Jagged crystalline reef encircles the roots, not repeating simple cone icicles.
 for(let i=0;i<9;i++){let a=i*TAU/9+.22,foot=[Math.cos(a)*12,.2,Math.sin(a)*12];
  shard(g,foot,add(foot,[Math.cos(a)*2.1,8.4+(i%4)*1.9,Math.sin(a)*2]),2.4,i%3===0?c.ice:i%2?'#68dbef':'#2cbacf',6);
 }
 // Two thunderbolt channels, extruded so there is depth at oblique angles.
 for(const p of [[-13,40,6],[-4,49,-13]])s27(g,[p,add(p,[1.5,-3,1]),add(p,[-2,-6,2]),add(p,[1,-10,2.5])],[.54,.58,.4,.025],c.fire[3],6);
 v25Spiral(g,[0,13.4,9.0],3.1,c.fire[3],1.7,.31);
}
function v27Petal(g,p,normal,radial,scale,col,facet){
 const n=norm(normal),r=norm(radial),side=norm(cross(n,r)),half=scale*.56;
 const p0=add(p,mul(n,.05)),p1=add(add(p,mul(r,scale*.47)),mul(n,scale*.36)),tip=add(add(p,mul(r,scale*1.04)),mul(n,scale*.27));
 const L=add(p1,mul(side,half)),R=sub(p1,mul(side,half));
 const crest=add(p1,mul(n,scale*.22)),back=sub(p1,mul(n,scale*.30));
 g.tri(p0,L,crest,col);g.tri(p0,crest,R,facet);g.tri(L,tip,crest,facet);g.tri(crest,tip,R,col);
 g.tri(p0,back,L,facet);g.tri(p0,R,back,col);g.tri(L,back,tip,col);g.tri(back,R,tip,facet);
}
function v27Flower(g,p,scale,normal,seed){const c=W27.p,n=norm(normal),axis=norm(cross(n,[0,1,0])),other=norm(cross(axis,n));
 // 8 + 5 independently faceted petals, with rotated 3D normals and a large
 // centre, not a cloud of flat triangles or unrelated pink crystals.
 for(let ring=0;ring<2;ring++){let count=ring===0?8:5,sz=scale*(ring===0?1:.68);
  for(let j=0;j<count;j++){let a=(j+(ring*.33))*TAU/count+seed*.14,r=add(mul(axis,Math.cos(a)),mul(other,Math.sin(a)));
   v27Petal(g,add(p,mul(n,ring*.65)),n,r,sz,c.petals[(j+seed+ring)%5],c.petals[(j+seed+ring+2)%5]);
}
 }
 o27(g,add(p,mul(n,scale*.52)),[scale*.29,scale*.30,scale*.29],[c.gold,'#fff0af'],42+seed);
 for(let j=0;j<5;j++){let a=j*TAU/5;let r=add(mul(axis,Math.cos(a)),mul(other,Math.sin(a)));let center=add(add(p,mul(n,scale*.78)),mul(r,scale*.18));
  o27(g,center,[.38,.5,.36],j%2?'#fff7ce':'#ffae65',seed*23+j);}
}
function v27Paramecia(g){const c=W27.p;
 for(let i=0;i<9;i++){let a=i*TAU/9+.15;let t=[Math.cos(a)*16,0,Math.sin(a)*15];
  s27(g,[[0,7,0],[t[0]*.4,2.4,t[2]*.4],[t[0],.1,t[2]]],[4.0,2.7,.12],i%3?c.b:c.dark,10);
 }
 // Three big trunks braid around one another, with visible holes on all sides.
 for(let k=0;k<3;k++){let ps=[];for(let j=0;j<=40;j++){
  let t=j/40,a=k*TAU/3+t*TAU*1.06;ps.push([Math.cos(a)*(5.9-t*2.2),t*52,Math.sin(a)*(6.0-t*1.7)]);}
  s27(g,ps,ps.map((_,j)=>Math.max(.35,5.7-j*.125)),[c.b,c.b2,c.dark][k],11);
 }
 const flowers=[
  {p:[-12,47,9],s:9,n:[-.35,.12,.93]}, {p:[13,45,7],s:10,n:[.46,.20,.89]},
  {p:[-6,57,-10],s:8.2,n:[-.5,.53,-.8]}, {p:[8,59,-9],s:8,n:[.7,.32,-.75]},
  {p:[2,64,0],s:9.7,n:[.14,.60,.81]}
 ];
 for(let i=0;i<flowers.length;i++){let f=flowers[i];
  s27(g,[[0,23+(i%3)*2,0],[f.p[0]*.55,f.p[1]-9,f.p[2]*.52],add(f.p,mul(norm(f.n),-2))],[4.6,3.0,.25],i%2?c.b:c.b2,10);
  v27Flower(g,f.p,f.s,f.n,i);
 }
 // Smaller living buds at separated rear and side heights prevent the bouquet
 // from reading as one flat pink disk.
 for(let i=0;i<5;i++){let a=i*TAU/5+.5,r=17;
  let p=[Math.cos(a)*r,37+(i%3)*4.4,Math.sin(a)*r];
  s27(g,[[0,27,0],[p[0]*.7,p[1]-4,p[2]*.6],p],[2.8,1.8,.15],c.b,8);
  v27Flower(g,p,3.8,[Math.cos(a),.45,Math.sin(a)],i+10);
 }
 // Gold / mint portals are *oblique* loops, not stick-on circular plates.
 const loops=[{p:[1,39,1],r:12,normal:[.28,.1,.96],color:c.gold},
  {p:[-5,46,-1],r:10,normal:[.95,.1,.28],color:c.aqua},
  {p:[6,31,3],r:8,normal:[.7,.55,-.5],color:c.gold}];
 for(const [k,L] of loops.entries()){let n=norm(L.normal),axis=norm(cross(n,[0,1,0])),other=norm(cross(axis,n)),ps=[];
  for(let i=0;i<=76;i++){let a=i*TAU/76;ps.push(add(L.p,add(mul(axis,Math.cos(a)*L.r),mul(other,Math.sin(a)*L.r*(k===1?1.16:.82)))));}
  s27(g,ps,ps.map(()=>k===0?1.0:.63),L.color,9);
 }
 // Wide ribbon twists through real negative space around the trunks.
 let p=[];for(let i=0;i<=82;i++){let t=i/82,a=t*TAU*1.45+.65;
  p.push([Math.cos(a)*10.3,6+t*43,Math.sin(a)*11.0]);}
 v27Sheet(g,p,p.map((_,i)=>2*(1-.55*i/82)),c.gold,'#db9d47',.34);
 v25Spiral(g,[0,13.8,8.9],3.1,c.gold,1.7,.31);
}
function v27Island(ci){const g=new Mesh(),N=19;
 const palettes=[
  {top:['#70ba43','#8fdd55','#407c37'],rim:['#4d943a','#69bd41'],layers:[['#ba8857','#d6a36a'],['#9f7555','#b18d62'],['#7b6d5c','#94644a'],['#5b5962','#746257'],['#494359','#5f5366']]},
  {top:['#58655d','#66796e','#475f5d'],rim:['#435855','#5c7565'],layers:[['#63606b','#777278'],['#4b4a5d','#57546b'],['#404b5d','#4d5267'],['#30364d','#46435c'],['#262d45','#35364d']]},
  {top:['#a778aa','#c58ab7','#8e668d'],rim:['#82577f','#b27baa'],layers:[['#9e6689','#bd8099'],['#825577','#956788'],['#6d4b78','#795882'],['#564568','#6b5075'],['#463958','#58415f']]}
 ][ci];
 const rads=[22.6,23.0,20.6,17.5,12.8,8.3,3.8,.1],height=[.15,-2.9,-6.7,-12.2,-17.8,-23.0,-26.5,-28.0];
 const rings=rads.map((r,k)=>Array.from({length:N},(_,i)=>{
   const a=i*TAU/N,rr=r*(1+.07*Math.sin(3*i+ci*1.5)+.06*Math.cos(5*i+ci)),depth=.91+(ci===2?.065*Math.sin(3*a):0);
   return [Math.cos(a)*rr,height[k]+(k===0?.25*Math.sin(i*2.4+ci):0),Math.sin(a)*rr*depth];}));
 for(let j=0;j<N;j++){let k=(j+1)%N;g.tri([0,.5,0],rings[0][k],rings[0][j],palettes.top[j%3]);
  for(let layer=0;layer<7;layer++){let clr=layer===0?palettes.rim:palettes.layers[Math.min(4,layer-1)];
   g.quad(rings[layer][j],rings[layer][k],rings[layer+1][k],rings[layer+1][j],clr[(j+layer)%2]);}
 }
 // Unique ecological identity rather than identical dotted grass on all three.
 if(ci===1){for(let j=0;j<7;j++){let a=j*2.39996,r=11+j%3*2,px=Math.cos(a)*r,pz=Math.sin(a)*r*.8;
   s27(g,[[px*.55,.65,pz*.55],[px*.83,.63,pz*.80],[px,.66,pz]],[.46,.42,.07],j%2?'#d27d46':'#e1a54f',6);}}
 if(ci===0){for(let j=0;j<17;j++){let a=j*2.39996,r=13.4+j%4*1.45;
  let p=[Math.cos(a)*r,.7,Math.sin(a)*r*.87];o27(g,p,[1.45,.92,1.5],j%2?'#368f43':'#96d453',j+70);}}
 else if(ci===1){for(let j=0;j<12;j++){let a=j*2.39996,r=13.2+j%4*1.7,p=[Math.cos(a)*r,.25,Math.sin(a)*r*.83];
  shard(g,p,add(p,[.65,3.0+(j%3)*1.9,.2]),1.1,j%3?'#56d4e4':'#a8f8ef',7);}}
 else {for(let j=0;j<12;j++){let a=j*2.39996,r=13.4+j%4*1.75,p=[Math.cos(a)*r,.35,Math.sin(a)*r*.82];
  o27(g,p,[1.3,.85,1.3],j%2?'#dc9ac8':'#8e7fbd',j+22);if(j%3===0)shard(g,p,add(p,[.25,2.6,.3]),1.2,'#f6bbdb',6);}}
 // Water is a bent, textured, double-sided 3D waterfall, not 2D vertical bars.
 const streams=ci===2?[[0,19.2],[13,15.4],[-14,-13.6]]:ci===1?[[-12,17.5],[10,17.9],[-13,-13.8]]:[[-10,17.8],[11,17.5],[-13,-13.6]];
 for(const [s,[x,z]] of streams.entries()){let pts=[];for(let i=0;i<=15;i++){let t=i/15;
  pts.push([x+(s===0?-1:1)*(1.8*t+.8*Math.sin(t*Math.PI)),.1-t*29.0,z+Math.sign(z)*t*11.2+.7*Math.sin(t*Math.PI)]);}
  v27Sheet(g,pts,pts.map((_,i)=>s===2?1.35:i<3?2.3:2.0),ci===2?'#aff5fc':'#44d8ee',ci===1?'#207b9d':'#137cba',.2);
  s27(g,pts,pts.map((_,i)=>.23*(1-.15*i/15)),'#f3ffff',5);
  for(let i=0;i<6;i++)o27(g,add(pts[15],[(i-3)*.6,0,1.3]),[.28,.32,.32],i%2?'#dfffff':'#78dcf9',i+2);
 }
 return g;
}
function v27FamilyBranch(ci){const g=new Mesh();const p=[W27.z.b,W27.l.b,W27.p.b][ci],hi=[W27.z.b2,W27.l.mid,W27.p.hi][ci];
 // A long asymmetric living bough with small twiglets; no oversized canopy roof.
 s27(g,[[-13,-1.8,-1],[-8,1,-1],[-3.5,2.6,.9],[3.4,2.3,1.3],[9,.6,-.5],[13.8,-1.2,-1.7]],[.6,1.35,1.7,1.47,.95,.1],[p,hi],9);
 for(const x of [-4,0,4])s27(g,[[x,2,1],[x,-1,1],[x,-2.3,1]],[.13,.14,.02],ci===0?'#d8a66d':ci===1?'#b2e9e4':'#f0b4d1',6);
 for(const s of [-1,1])v25Petal(g,[s*8,1,0],[s*11,3.4,-1],1.2,.9,ci===0?'#63ba50':ci===1?'#79cbd3':'#efa3c7',ci===0?'#b8e98d':ci===1?'#c6eff2':'#ffe1e9');
 return g;
}
function makeTree27(ci){const g=new Mesh();[v27Zoan,v27Logia,v27Paramecia][ci](g);v25FamilyBoughs(g,ci);return g;}
