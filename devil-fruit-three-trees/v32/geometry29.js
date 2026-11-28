/* V29: Reference-led, independent 3D spirit sculptures. Not texture planes.
   One distinctive mesh per class, built on the exact V28 WebGL engine and data. */
const PAL29={
 zo:{bark:'#ad632d',heart:'#803d22',sun:'#ec9a49',lit:'#fdc26d',gold:'#ffd85b',goldHi:'#fff0a1',green:['#075f37','#11843c','#28a83d','#4fc342','#7cdb36','#b7ed32','#dbf44a']},
 lo:{bark:'#34253f',bone:'#55405a',deep:'#221d36',lava:'#f35d2b',gold:'#ffde65',water:'#35bde4',aqua:'#76e8ff',cloud:['#43366f','#61519a','#8173bd','#ac9ddd','#dbd3ff'],fire:['#c93420','#ed4d21','#ff791d','#ffb42e','#ffeb59'],ice:['#1eaadd','#56cff2','#98e6f6','#d3fdff']},
 pa:{dark:'#a83f78',wood:'#efacd0',cream:'#ffe3d0',ivory:'#fff0d7',bark:'#e07eac',pink:['#992a76','#c3388c','#e756a5','#f978b9','#ffa4ce','#ffcae5'],gold:'#ffda65',mint:'#a6f7e9',violet:'#7a53dc'}
};
const v29s=(g,p,r,col,side=10)=>tube(g,p,r,col,side);
const v29b=(g,p,r,col,seed=4)=>blob(g,p,r,col,seed,12,7);
function v29Ring(g,center,rx,ry,rz,col,th=.5,phase=0){let ps=[];for(let i=0;i<=64;i++){
 const a=TAU*i/64+phase;ps.push([center[0]+Math.cos(a)*rx,center[1]+Math.sin(a)*ry,center[2]+Math.sin(a*1.5)*rz]);}
 v29s(g,ps,ps.map(()=>th),col,8);
}
function v29Dome(g,ctr,R,colors,seed=1){
 // Irregular closed macro canopy with real top, round sides, and a deep underside.
 const rng29=rng(10521+seed),rings=[],lats=[[-.80,.24],[-.61,.63],[-.34,.91],[.03,1],[.34,.94],[.64,.73],[.90,.35]];
 const n=15;
 for(let k=0;k<lats.length;k++){
  let [y,r]=lats[k];let ring=[];for(let i=0;i<n;i++){let a=i*TAU/n+.07*seed;
   let wobble=1+.06*Math.sin(3*a+seed*.32)+.035*Math.cos(5*a-seed*.19),
   depth=1+.09*Math.sin(2*a+seed*.7);
   ring.push([ctr[0]+Math.cos(a)*R[0]*r*wobble,
    ctr[1]+R[1]*(y+.07*Math.sin(3*a+seed*.36)*(1-Math.abs(y)*.55)),
    ctr[2]+Math.sin(a)*R[2]*r*depth]);}
  rings.push(ring);
 }
 const top=[ctr[0],ctr[1]+R[1]*.95,ctr[2]],bottom=[ctr[0],ctr[1]-R[1]*.84,ctr[2]];
 for(let i=0;i<n;i++){
  const j=(i+1)%n;g.tri(bottom,rings[0][i],rings[0][j],colors[0]);
  for(let k=0;k<lats.length-1;k++){
   let col=k===0?colors[0]:k<2?colors[1]:k<4?colors[(i%5===0)?3:2]:k===4?colors[3]:colors[4];
   g.quad(rings[k][i],rings[k+1][i],rings[k+1][j],rings[k][j],col);
  }
  g.tri(top,rings.at(-1)[j],rings.at(-1)[i],colors[5]||colors[4]);
 }
}
function v29EllipticCrescent(g,ctr,span,side,colorA,colorB){
 // Real two-sided crescent plates grown from a wooden antler and curled inward.
 const n=18,rows=[];for(let i=0;i<=n;i++){let t=i/n,a=(-.18+1.28*t)*Math.PI;
  let c=[ctr[0]+side*Math.cos(a)*span[0],ctr[1]+Math.sin(a)*span[1],ctr[2]+Math.sin(a*1.4)*span[2]];
  let w=(.5+Math.sin(t*Math.PI)*1.1)*(1-t*.4);
  const left=add(c,[-side*w,0,1.35]),right=add(c,[side*w,0,-1.0]);
  rows.push({left,right,l2:add(left,[0,0,-.7]),r2:add(right,[0,0,-.7])});
 }
 for(let i=0;i<n;i++){let a=rows[i],b=rows[i+1];g.quad(a.left,b.left,b.right,a.right,i%5===0?colorB:colorA);
  g.quad(a.l2,a.r2,b.r2,b.l2,colorB);g.quad(a.left,a.l2,b.l2,b.left,colorA);g.quad(a.right,b.right,b.r2,a.r2,colorB);}
 let edge=rows.map(q=>q.left);v29s(g,edge,edge.map((_,i)=>(1-i/n)*.42+.06),colorB,6);
}
function v29Ancient(g){const p=PAL29.zo;
 // Massive roots and a true twisted trunk, with two wide dominant branch forks.
 for(let i=0;i<10;i++){let a=TAU*i/10+.19,L=22+(i%3)*1.5;
  v29s(g,[[0,8,0],[Math.cos(a)*6,3.5,Math.sin(a)*6],[Math.cos(a)*L*.73,1.2,Math.sin(a)*L*.7],[Math.cos(a)*L,.12,Math.sin(a)*L*.92]],
    [6.9,4.5,2.2,.07],i%3===0?p.sun:p.bark,10);}
 v29s(g,[[0,0,0],[2.6,12,0],[-2.1,27,1],[3.1,40,-1],[0,55,-3],[1,64,-4]],
  [13.5,11.7,10.2,7.6,4.3,.15],[p.heart,p.bark,p.sun,p.bark],13);
 // Interlocking timber spines add geometric depth and readable facets, no texture.
 for(let j=0;j<8;j++){let a=j*TAU/8+.18;
  let coords=[];for(let i=0;i<5;i++){let rad=11.5-i*1.7;
   coords.push([Math.cos(a+i*.1)*rad,5+i*10,Math.sin(a+i*.1)*rad]);}
  v29s(g,coords,[.9,.68,.58,.30,.04],j%3===0?p.heart:p.sun,6);
 }
 // Strong side, rear and frontal bough anatomy; canopy is grown from these.
 const lobes=[
  [-25,54,-22,12.0,8.4,10.2],[-7,65,-26,12,7.8,10],
  [13,66,-24,13.3,8.7,11.5],[26,56,-20,12.3,8.3,10.7],
  [-27,52,21,12.3,8.6,11.0],[-10,60,22,12.4,8.5,11.9],
  [16,60,23,12.5,8.8,11.6],[29,51,20,10.3,8.1,9.4],
  [-3,76,-4,13.1,9.2,12.0]
 ];
 lobes.forEach((v,i)=>{const [x,y,z,rx,ry,rz]=v;
  v29s(g,[[1,32,-1],[x*.36,40,z*.25],[x*.72,y-9,z*.66],[x,y-3,z]],
   [6.1,4.4,2.8,.08],i%3===1?p.sun:p.bark,11);
  let colors=i%2===0?[p.green[0],p.green[1],p.green[2],p.green[3],p.green[4],p.green[6]]
    :[p.green[0],p.green[1],p.green[3],p.green[4],p.green[5],p.green[6]];
  v29Dome(g,[x,y,z],[rx,ry,rz],colors,i*7+12);
 });
 // Integrated animal guardian, restrained and carved within the living bark.
 v29b(g,[1,28,9],[6,5.5,4.6],[p.bark,p.sun],67);
 for(let side of [-1,1]){
  v29b(g,[side*3,28.5,12.7],[.85,.77,.36],p.gold,26+side);
  v29b(g,[side*3,28.35,13.03],[.39,.39,.18],p.heart,30+side);
  v29s(g,[[side*3.9,31,10.7],[side*6.5,34.3,10],[side*8.5,33.4,8.2]],
      [1.55,1.13,.06],p.sun,7);
 }
 v29b(g,[.3,26,13.6],[1.6,1.15,.85],p.heart,72);
 // Ancient moon wings: two purposeful golden crescents fused to the antlers.
 for(let side of [-1,1]){
  v29s(g,[[side*3,43,1],[side*9.2,53,5],[side*17,59,8],[side*24.5,58,8]],
    [3.2,2.7,1.3,.08],[p.bark,p.sun],9);
  v29s(g,[[side*16,52,7],[side*21,52,19],[side*23,53,27]],
      [1.95,1.36,.12],p.sun,8);
  v29EllipticCrescent(g,[side*23,55,27],[6.8,9.1,1.7],side,p.gold,p.goldHi);
 }
 // One ancient gold swirl at the lower bark, not repeated celestial ornaments.
 v25Spiral(g,[0,15.5,12],3.1,p.goldHi,1.5,.34);
}
function v29Flame(g,pts,halfWidths,colors,seed=0){
 // Full thick volumetric tapering flame, broad visible surface from front and back.
 // Each section has a front ridge and back ridge, rather than a billboard triangle.
 const rings=[];for(let i=0;i<pts.length;i++){
  let tangent=norm(sub(pts[Math.min(pts.length-1,i+1)],pts[Math.max(0,i-1)]));
  let side=norm(cross(tangent,[0,0,1]));if(Math.hypot(...side)<.1)side=[1,0,0];
  let width=halfWidths[i];const c=pts[i],th=Math.max(.07,width*.36);
  rings.push({lf:add(c,add(mul(side,width),[0,0,th])),rf:add(c,add(mul(side,-width),[0,0,th])),
      lb:add(c,add(mul(side,width),[0,0,-th])),rb:add(c,add(mul(side,-width),[0,0,-th]))});
 }
 for(let i=0;i<rings.length-1;i++){let a=rings[i],b=rings[i+1];
  g.quad(a.lf,b.lf,b.rf,a.rf,colors[(i+seed)%colors.length]);
  g.quad(a.lb,a.rb,b.rb,b.lb,colors[(i+seed+1)%colors.length]);
  g.quad(a.lf,a.lb,b.lb,b.lf,colors[(i+seed+2)%colors.length]);
  g.quad(a.rf,b.rf,b.rb,a.rb,colors[(i+seed)%colors.length]);}
}
function v29Storm(g,p,r,seed){const c=PAL29.lo;
 // The purple storm is one huge multi-depth canopy; connected chambers circle a vortex.
 v29Dome(g,p,r,[c.cloud[0],c.cloud[1],c.cloud[2],c.cloud[3],c.cloud[4],c.cloud[4]],seed);
 const offsets=[[-.8,.0,-.25],[-.35,.28,.65],[.4,.06,-.6],[.72,-.14,.5],[-.12,-.27,.8]];
 offsets.forEach((o,i)=>{v29b(g,add(p,[o[0]*r[0],o[1]*r[1],o[2]*r[2]]),
   [r[0]*(i%2?.45:.52),r[1]*(i%2?.49:.55),r[2]*(i%2?.51:.46)],
   [c.cloud[i%3+1],c.cloud[i%3+2]],i*8+seed);});
}
function v29Wind(g,centre,radii,baseColor,turns=1.5,phase=0){
 let points=[];for(let i=0;i<=52;i++){const t=i/52,a=phase+t*TAU*turns,rad=(1-.35*t);
  points.push([centre[0]+Math.cos(a)*radii[0]*rad,centre[1]+t*radii[1],centre[2]+Math.sin(a)*radii[2]*rad]);}
 v29s(g,points,points.map((_,i)=>(.70-(i/52)*.45)),baseColor,8);
}
function v29Elemental(g){const c=PAL29.lo;
 for(let i=0;i<10;i++){let a=i*TAU/10,L=20+(i%3)*1.5;
  v29s(g,[[0,7,0],[Math.cos(a)*5,3.5,Math.sin(a)*6],[Math.cos(a)*L*.75,1.2,Math.sin(a)*L*.75],[Math.cos(a)*L,0,Math.sin(a)*L]],
   [5.3,3.8,1.5,.06],i%3?c.bark:c.bone,9);}
 v29s(g,[[0,0,0],[2.5,14,0],[-2.1,28,1],[2,41,-1],[0,54,-3]],
  [12.3,11.0,8.8,7.6,.08],[c.deep,c.bark,c.bone],12);
 // Reinforced boughs support each elemental crown across opposite sides.
 for(const [x,y,z] of [[-20,48,14],[-29,52,11],[-13,62,-21],[13,65,-19],[22,49,14],[30,45,18]]){
  v29s(g,[[0,27,0],[x*.42,y-11,z*.55],[x*.77,y-3,z*.9],[x,y,z]],
   [5.1,4.0,2.1,.08],c.bark,10);
 }
 // Fire's volume is the left-hand canopy itself, using broad curved tongues.
 const flameBases=[[-13,45,16,-33,73,20,7.4],[-20,43,12,-39,62,17,9.3],[-11,54,-8,-21,80,-15,8.0],[-28,46,-13,-34,70,-19,7],[-11,42,19,-25,64,23,7.5],[-3,51,14,-12,70,21,5.9]];
 for(let i=0;i<flameBases.length;i++){let [x,y,z,tx,ty,tz,w]=flameBases[i];let start=[x,y,z],end=[tx,ty,tz];
  let curve=[];
  for(let k=0;k<=6;k++){
   let t=k/6,travel=mix(start,end,t),bend=Math.sin(t*Math.PI);
   curve.push([travel[0]+bend*(i%2?-2.9:3.6),travel[1]+bend*(3.4+i%3),travel[2]+bend*(i%2?3.1:-2.5)]);
  }
  v29Flame(g,curve,[w*.38,w*.84,w*1.13,w*.96,w*.73,w*.35,.04],
    i%2?[c.fire[0],c.fire[1],c.fire[2],c.fire[3],c.fire[4]]:[c.fire[1],c.fire[2],c.fire[3],c.fire[4],c.fire[4]],i);
 }
 // Giant volumetric thunderhead and a spatial spiral vortex at the top rear.
 v29Storm(g,[11,71,-18],[21.5,12.2,18.8],12);
 v29Storm(g,[21,60,-26],[12,8.7,11],23);
 // Spiral coil at near face of storm, with electric bolt forks.
 let swirl=[];for(let i=0;i<=48;i++){let t=i/48,a=t*TAU*1.56+.5,rad=(1-t*.78)*9.2;
  swirl.push([14+Math.cos(a)*rad,67+Math.sin(a)*rad*.80,11+t*1.6]);}
 v29s(g,swirl,swirl.map((_,i)=>.9*(1-i/58)),['#ded0ff','#b9a3fa'],7);
 for(let i=0;i<5;i++){
  const a=i*TAU/5+.5,from=[13+Math.cos(a)*11,64+Math.sin(a)*8,11];
  v29s(g,[from,add(from,[1,-4,1]),add(from,[-2,-6,2]),add(from,[.7,-11,2])],
    [.62,.54,.40,.03],i%2?'#a278ff':'#f3c0ff',5);
 }
 // Large right-hand glacier, crystal needles of several widths and spatial planes.
 for(let i=0;i<12;i++){
  let a=-.5+i*2.4,xx=22+Math.cos(a)*7.2,zz=16+Math.sin(a)*9.4;
  const from=[xx,39+(i%3)*2.2,zz],tip=add(from,[(i%4-1.5)*2.1,11+(i%4)*3.4,(-1+i%3)*3.1]);
  shard(g,from,tip,3.2+(i%3)*.70,c.ice[i%4],7);
 }
 // Two giant curling pale wind/ice ribbons wrap the glacier in full 3D.
 for(let k=0;k<2;k++){
  let p=[];for(let i=0;i<=45;i++){let t=i/45,a=t*TAU*1.28+k*2.6;
   let r=13.3-(t*1.9);p.push([24+Math.cos(a)*r,42+t*17,16+Math.sin(a)*r]);}
  v27Sheet(g,p,p.map((_,i)=>2.0*(1-i/55)),k?'#adf3ff':'#ecffff',c.ice[1],.58);
 }
 // Bright river coils, lava fissures, roots and a front portal tie all four forces.
 for(let i=0;i<2;i++){
  let pts=[];for(let j=0;j<=60;j++){const t=j/60,a=(i?2.2:.45)+t*TAU*(i?1.05:1.4),rr=10.4-t*1.2;
   pts.push([Math.cos(a)*rr,6+t*(i?39:47),Math.sin(a)*rr]);}
  v27Sheet(g,pts,pts.map((_,j)=>(i?1.0:2.1)*(1-j/100)),i?c.aqua:c.water,'#087ca9',.55);
 }
 for(let j=0;j<6;j++){let a=j*TAU/6+.4,ps=[];for(let t=0;t<6;t++){
  const rr=11.2-t*1.35;ps.push([Math.cos(a+t*.16)*rr,4+t*8.6,Math.sin(a+t*.16)*rr]);}
  v29s(g,ps,[.75,.6,.55,.43,.3,.04],j%2?c.fire[2]:c.aqua,6);
 }
 v25Spiral(g,[0,13,11.6],4.2,c.fire[3],2.0,.36);
}
function v29Petal(g,start,radial,normal,len,width,colors){
 const d=norm(radial),n=norm(normal),s=norm(cross(d,n)),rings=[],num=6;
 for(let i=0;i<=num;i++){let t=i/num;
  let base=add(start,add(mul(d,len*t),mul(n,(.20*Math.sin(t*Math.PI)+.38*t*t)*len)));
  let w=width*Math.pow(Math.sin(Math.PI*(t*.94+.03)),.80),th=(.19+.08*Math.sin(t*Math.PI))*(1-t*.75)*len;
  rings.push({a:add(base,mul(s,w)),b:sub(base,mul(s,w)),f:add(base,mul(n,th)),k:sub(base,mul(n,th*.75))});
 }
 for(let i=0;i<num;i++){let a=rings[i],b=rings[i+1];g.quad(a.a,b.a,b.f,a.f,colors[0]);g.quad(a.f,b.f,b.b,a.b,colors[1]);
  g.quad(a.a,a.k,b.k,b.a,colors[2]);g.quad(a.b,b.b,b.k,a.k,colors[3]);
  g.quad(a.a,b.a,b.k,a.k,colors[2]);g.quad(a.b,a.k,b.k,b.b,colors[3]);}
}
function v29Lotus(g,ctr,r,normal,seed){const c=PAL29.pa,n=norm(normal),axis=norm(cross(n,[0,1,0]));
 const u=Math.hypot(...axis)<.2?[1,0,0]:axis,v=norm(cross(n,u));
 for(let ring=0;ring<2;ring++){
  let count=ring===0?9:6;
  for(let i=0;i<count;i++){
   const a=TAU*(i+.21+ring*.37)/count+seed*.17,rad=add(mul(u,Math.cos(a)),mul(v,Math.sin(a))),
    color=[c.pink[(i+seed+3)%6],c.pink[(i+seed+4)%6],c.pink[(i+seed+2)%6],c.pink[(i+seed)%6]];
   v29Petal(g,add(ctr,mul(n,ring*.43)),rad,n,r*(ring===0?1:.62),r*.25*(ring===0?1:.74),color);
  }
 }
 const center=add(ctr,mul(n,r*.39));v29b(g,center,[r*.25,r*.30,r*.26],[c.gold,'#fff1bd'],seed+30);
}
function v29Sakura(g,ctr,r,seed){const c=PAL29.pa;
 v29Dome(g,ctr,r,[c.pink[0],c.pink[1],c.pink[2],c.pink[3],c.pink[4],c.pink[5]],seed);
 // A few large faceted edge petals create a natural sakura silhouette.
 for(let j=0;j<5;j++){
  const a=j*TAU/5+seed*.19,outer=[ctr[0]+Math.cos(a)*r[0]*.86,ctr[1]+r[1]*.23,ctr[2]+Math.sin(a)*r[2]*.83];
  v29Petal(g,outer,[Math.cos(a),.30,Math.sin(a)],[0,1,0],2.9+(j%2)*.65,1.15,
   [c.pink[(j+2)%6],c.pink[(j+3)%6],c.pink[j%6],c.pink[(j+4)%6]]);
 }
 // Crown blossoms burst from canopy edges rather than isolated pole tips.
 if(seed%3!==1){let a=.6+seed*.32;
  let p=[ctr[0]+Math.cos(a)*r[0]*.38,ctr[1]+r[1]*.82,ctr[2]+Math.sin(a)*r[2]*.35];
  v29Lotus(g,p,4.3,[Math.cos(a)*.17,1,Math.sin(a)*.17],seed);
 }
}
function v29Portal(g,ctr,rad){const c=PAL29.pa;
 v29b(g,ctr,[rad,rad,1.5],['#291c72','#3c2488','#6641bd'],28);
 for(let k=0;k<3;k++){let path=[];for(let i=0;i<=55;i++){let a=i*TAU/55;
  path.push([ctr[0]+Math.cos(a)*(rad+.55-k*.58),ctr[1]+Math.sin(a)*(rad+.55-k*.58),ctr[2]+1.0+k*.21]);}
  v29s(g,path,path.map(()=>.67-k*.11),k===0?c.gold:k===1?c.ivory:'#b799fa',8);
 }
 for(let k=0;k<3;k++){
  let pp=[];for(let i=0;i<=45;i++){let t=i/45,a=t*TAU*(1.55+k*.26)+k*2.09,rr=rad*.87*(1-t*.92);
   pp.push([ctr[0]+Math.cos(a)*rr,ctr[1]+Math.sin(a)*rr,ctr[2]+2.1]);}
  v29s(g,pp,pp.map((_,i)=>.43*(1-i/58)),k%2?'#d8b6ff':'#8c61ff',7);
 }
}
function v29Possibility(g){const c=PAL29.pa;
 // A three-colour braid winds from the muscular roots into an elegant ivory crown.
 for(let i=0;i<10;i++){
  let a=i*TAU/10+.18,L=22+(i%3)*2.1,dx=Math.cos(a),dz=Math.sin(a);
  v29s(g,[[0,8,0],[dx*7,4,dz*6],[dx*L*.76,1.6,dz*L*.7],[dx*L,.15,dz*L]],
      [6.1,4.1,2.0,.06],i%3===0?c.ivory:i%3===1?c.wood:c.bark,10);
 }
 v29s(g,[[0,0,0],[2,15,-1],[-2.4,30,1],[1.8,47,-1],[0,61,-3]],
     [10.9,9.9,8.1,6.3,.12],[c.wood,c.ivory,c.bark],12);
 for(let k=0;k<3;k++){
  let pts=[];for(let i=0;i<=45;i++){let t=i/45,a=k*TAU/3+t*TAU*1.18;
   pts.push([Math.cos(a)*(5.1-t*1.0),4+56*t,Math.sin(a)*(5.6-t*1.5)]);}
  v29s(g,pts,pts.map((_,i)=>Math.max(.40,4.85-i*.091)),[c.ivory,c.bark,c.cream][k],11);
 }
 // Twinned white and blush arms spiral into two large sweeping lateral limbs.
 v29s(g,[[3,2,3],[-5,18,4],[-11,32,3],[-21,45,7],[-28,50,13]],
  [7.5,6.8,5.0,3.0,.12],[c.ivory,c.cream,c.wood],12);
 v29s(g,[[-3,4,-1],[6,19,3],[12,34,5],[24,45,8],[28,53,11]],
  [7.2,6.3,4.8,3.0,.12],[c.bark,c.ivory,c.cream],12);
 // Five truly broad ivory limbs, back and front, carry pink sakura canopies.
 const crowns=[
  [-27,55,-24,14.4,9.2,12.2],[-10,71,-25,14.8,9.5,12.7],
  [16,69,-23,14.5,9.4,12.7],[29,55,-18,13.5,8.6,12.2],
  [-27,49,24,14,8.7,11.9],[-8,60,26,14.2,9.1,12.7],
  [20,59,24,13.7,8.9,12.2],[3,79,-3,14.5,10.3,13.5]
 ];
 for(let i=0;i<crowns.length;i++){
  const [x,y,z,rx,ry,rz]=crowns[i];
  v29s(g,[[0,25,0],[x*.31,35,z*.29],[x*.65,y-12,z*.56],[x,y-2,z]],
    [7.1,5.8,3.4,.06],[i%3===0?c.bark:c.ivory,c.wood,c.cream],11);
  v29Sakura(g,[x,y,z],[rx,ry,rz],11+i*4);
 }
 // Only the top has the giant lotus crown, not a copy on every little branch.
 v29Lotus(g,[1,83,0],12,[.09,1,.18],18);
 // Two wide, interpenetrating oblique golden orbits and small celestial accents.
 v29Ring(g,[2,71,-1],18,9.0,5.8,c.gold,1.05,.25);
 v29Ring(g,[3,80,-5],7.6,7.7,3.0,'#fff4b0',.58,-.2);
 // Portal is cut into the front of the pale twisted trunk, with actual depth.
 v29Portal(g,[0,18,12.5],5.9);
 v25Spiral(g,[0,32,9.4],2.6,c.gold,1.7,.31);
}
function v29Island(g,ci){
 const n=23,palette=[
  {grass:['#80ce38','#b9e73e','#65ae36'],rim:['#4c9436','#70c73a'],layers:[['#d6a46d','#b88355'],['#ad8d6c','#9e735b'],['#957468','#836357'],['#766167','#5f5264'],['#625368','#453e58']]},
  {grass:['#628568','#82a66b','#4b705c'],rim:['#4c785c','#6aa17a'],layers:[['#a69b96','#7a7180'],['#786f83','#5c5c72'],['#5a526c','#514d67'],['#47415e','#393651'],['#313046','#29253e']]},
  {grass:['#8dc952','#c5ed59','#72a848'],rim:['#7fc44c','#93c856'],layers:[['#c99bc6','#b384b2'],['#b485b1','#8f729d'],['#9573a0','#725f8a'],['#806485','#665376'],['#604767','#473952']]}
 ][ci];
 const rad=[29.7,30.2,29.1,25.6,20.6,14.4,7.7,.25],yy=[.15,-2.5,-5.9,-12.1,-20.5,-27.9,-33.6,-36.8];
 const rings=rad.map((r,k)=>Array.from({length:n},(_,i)=>{const a=TAU*i/n;
  return [Math.cos(a)*r*(1+.060*Math.sin(a*5+ci)+.04*Math.sin(a*3+ci)),yy[k],Math.sin(a)*r*.88*(1+.06*Math.sin(a*3+ci))];}));
 for(let i=0;i<n;i++){let j=(i+1)%n;
  g.tri([0,.30,0],rings[0][j],rings[0][i],palette.grass[(i+ci)%3]);
  for(let k=0;k<7;k++){let col=k===0?palette.rim:palette.layers[Math.min(4,k-1)];
   g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],col[(i+k)%2]);}
 }
 // A lush island perimeter, rocks for Zoan; ice and warm fissures for Logia;
 // lotus buds and lavender stones for Paramecia. Distinct identity, not spam.
 for(let i=0;i<14;i++){let a=i*2.399,r=20.5+(i%3)*1.5,p=[Math.cos(a)*r,.7,Math.sin(a)*r*.86];
  if(ci===0)v29b(g,p,[1.5,.8,1.3],i%2?'#61a934':'#a4db4a',i+90);
  if(ci===1)shard(g,p,add(p,[.9,2.0+(i%3),1]),1.3,i%2?'#6be2e5':'#b0f9f4',6);
  if(ci===2){v29b(g,p,[1.3,.55,1.3],i%2?'#a3c14d':'#b48ab5',i+43);if(i%5===0)v29Lotus(g,add(p,[0,.7,0]),1.25,[0,1,0],i);}
 }
 // Three wide, faceted, physically thick waterfalls pour over the island rim.
 const waterfallSources=[[-18,21],[-1.8,27],[19,20]];
 for(let j=0;j<waterfallSources.length;j++){
  const [x,z]=waterfallSources[j],ww=j===1?8.3:5.2;
  const layers=[];
  for(let t=0;t<=18;t++){
   let f=t/18,yy=f<.16?(.2-3.6*f):(-.38-38*(f-.16)/.84);
   layers.push([x+(j-1)*2.1*f+Math.sin(f*3.6+j)*1.2*f,yy,z+12.4*f+2.0*Math.sin(f*Math.PI)]);
  }
  for(let i=0;i<18;i++)for(let k=0;k<6;k++){
   const A=layers[i],B=layers[i+1],L=(k/6-.5)*ww,R=((k+1)/6-.5)*ww;
   const col=['#48c6ef','#8fe9ff','#d8fcff','#4eb9ef','#a8f6ff','#3ea2dc'][k];
   g.quad(add(A,[L,0,.2+Math.sin(k*1.5)*.20]),add(A,[R,0,.2+Math.sin((k+1)*1.5)*.20]),
      add(B,[R,0,.2+Math.sin((k+1)*1.5)*.2]),add(B,[L,0,.2+Math.sin(k*1.5)*.2]),col);
   if(k===0||k===5)g.quad(add(A,[L,0,.2]),add(B,[L,0,.2]),add(B,[L,0,-.7]),add(A,[L,0,-.7]),'#217fb7');
  }
  let foot=layers.at(-1);for(let k=0;k<7;k++)v29b(g,add(foot,[(k-3)*.92,.2,1.3]),[.57,.45,.59],k%2?'#ffffff':'#e0fbff',k+40);
 }
 // Small satellite islands add scale: far behind rather than in front of tree.
 for(let i=0;i<2;i++){
  const a=[-.85,.85][i],x=Math.cos(a)*51,z=-27+Math.sin(a)*15,y=-15-(i%3)*6;
  v29b(g,[x,y,z],[6.0,1.4,5],ci===2?'#b1e548':'#b0dc57',i+7);
  shard(g,[x,y-.3,z],[x,y-8-(i%2)*3,z],3.4,ci===2?'#80658f':'#65566e',7);
 }
 // Three puffy white faceted cloud families float safely *behind* the art.
 for(let i=0;i<3;i++){
  const x=[-50,47,61][i],y=[75,80,48][i],z=-43-i*3;
  const c=['#f6fdff','#e3f4ff','#b8dcfa'];
  v29b(g,[x,y,z],[6.5,3.4,4.8],c,i+14);
  v29b(g,[x-3.5,y-1.1,z+.4],[4.8,2.8,4.1],c,i+32);
  v29b(g,[x+3.8,y-.9,z-.3],[4.4,2.4,3.5],c,i+63);
 }
}
function makeIsland29(ci){const g=new Mesh();v29Island(g,ci);return g;}
function v29FamilyBoughs(g,ci){
 const c=[PAL29.zo.bark,PAL29.lo.bark,PAL29.pa.ivory][ci],hi=[PAL29.zo.sun,PAL29.lo.bone,PAL29.pa.wood][ci];
 for(let k=0;k<groups[ci].length;k++){
  let target=anchorFor(ci,k), start=[0,29+(k%3)*4,0];
  // Every family stem connects to actual radial branch and droops below.
  v29s(g,[start,[target[0]*.46,target[1]-6,target[2]*.47],add(target,[0,2.5,0]),add(target,[0,0,0])],
    [2.9,1.8,.86,.18],k%3===0?hi:c,8);
 }
}
function v29FamilyBranch(ci){return v27FamilyBranch(ci);}
function makeTree29(ci){const g=new Mesh();[v29Ancient,v29Elemental,v29Possibility][ci](g);v29FamilyBoughs(g,ci);return g;}
/* One large colourful reference-like fruit per actual family; smaller fruit
   members are still physically retained in the 3D group mesh. */
function v29HeroFruit(ci,groupIndex){
 const g=new Mesh();const hue=['#ff83bd','#a76bff','#ffc439','#fb6348','#6bdded','#4c91ff','#5bea93','#feab35','#ff72b0','#e7cfb8','#8bb9ff','#f7de5e'];
 const c=hue[(groupIndex*5+ci*3)%hue.length],dark=['#a83175','#5d3cb6','#b87615','#ca3e31','#168a9b','#1d57b2','#33965d','#d87b19','#b92e83','#a79076','#4e6db2','#aa991e'][(groupIndex*5+ci*3)%hue.length];
 const mode=(groupIndex+ci*2)%5;
 if(mode===0){
  v29b(g,[0,-.13,0],[.96,1.0,.94],[c,dark],groupIndex+21);
  v29b(g,[-.35,.48,.06],[.60,.52,.66],[c,dark],groupIndex+43);
  v29b(g,[.35,.48,.06],[.60,.52,.66],[c,dark],groupIndex+45);
 }else if(mode===1){
  v29b(g,[0,0,0],[1.00,1.11,1.00],[c,dark],groupIndex+20);
  for(let i=0;i<9;i++){let a=i*2.4,z=.86*Math.sin(a),x=.83*Math.cos(a),y=(i%3-1)*.45;
   v29b(g,[x*.5,y,z*.6],[.34,.33,.34],i%2?c:dark,groupIndex+i+38);}
 }else if(mode===2){
  v29b(g,[0,0,0],[.95,1.05,.96],[c,dark],groupIndex+12);
  for(let i=0;i<7;i++){let a=TAU*i/7;
   shard(g,[Math.cos(a)*.78,0,Math.sin(a)*.72],[Math.cos(a)*1.12,(i%3)*.20,Math.sin(a)*1.05],.22,c,5);}
 }else{
  v29b(g,[0,0,0],[.99,1.08,.97],[c,dark],groupIndex+11);
 }
 // Hand-swirl relief, not an embossed screenshot or procedural billboard.
 v25Spiral(g,[0,.01,1.00],.52,mode%2?'#ffe2c1':dark,1.45,.085);
 v25Spiral(g,[-.47,.33,.88],.27,mode%2?'#ffe9b1':dark,1.38,.065);
 v25Spiral(g,[.55,-.34,.84],.26,mode%2?'#fff1c2':dark,1.45,.06);
 v29s(g,[[0,.87,0],[.05,1.46,.1],[0,1.78,.11]],[.16,.17,.065],'#6d953c',6);
 // Pair of large, symmetrical golden curlicue stalks like the supplied photos.
 for(const sign of [-1,1]){
  let pts=[];for(let i=0;i<=18;i++){let t=i/18,a=t*TAU*.95+.15,
    rad=.55*(1-.75*t);pts.push([sign*(.55+Math.cos(a)*rad),1.78+.20*Math.sin(a),.12+Math.sin(a)*rad*.35]);}
  v29s(g,[[0,1.70,.11],...pts],Array(pts.length+1).fill(.11),'#ffdf70',7);
 }
 return g;
}
