/* V28 — Organic macro-sculptures built on the tested V27 WebGL geometry engine.
   Every tree is one fully three-dimensional triangle mesh. No image billboards. */
const C28={
 z:{heart:'#89502f',wood:'#b8783e',light:'#dfa05c',dark:'#583523',ivory:'#ffe6ad',pupil:'#223e32',greens:['#075b3c','#0d7545','#168b46','#269d4d','#52b94d','#80d75e','#b5ef7f']},
 l:{black:'#28253f',shade:'#35334f',rock:'#4a405a',rim:'#695272',lava:'#e04b25',hot:'#ff9531',flame:'#ffdc58',cloud:['#426c83','#6492a8','#91bbca','#c3dfdf','#eff6e5'],water:['#057dba','#12b1d5','#44dce4','#b9f8ea'],ice:['#3dcbd9','#86edee','#d7fded']},
 p:{bark:'#70215c',wood:'#982a78',glow:'#c43a98',rose:['#8e2a84','#b73a93','#d755a3','#f37fbc','#ffaed2','#ffe0e5'],gold:'#ffe189',aqua:'#9cfbe4'}
};
const V28UP=[0,1,0];
const v28wood=(g,pts,radii,color,seg=9)=>tube(g,pts,radii,color,seg);
const v28sphere=(g,pos,rad,pal,seed)=>blob(g,pos,rad,pal,seed,11,7);
function v28Crown(g,p,r,colors,seed){
 // Closed 3-D organic dome, independently varied around both horizontal axes.
 // Unlike a stacked oval canopy, top, sides and underside all carry substantial volume.
 const n=15, rings=[],levels=[[.17,.90],[.67,.57],[.99,.08],[.85,-.44],[.31,-.82]];
 for(let k=0;k<levels.length;k++){
  const [s,h]=levels[k];rings.push(Array.from({length:n},(_,i)=>{const a=i*TAU/n;
   const warp=1+.075*Math.sin(3*a+seed*.67)+.045*Math.cos(5*a-seed*.13);
   return [p[0]+Math.cos(a)*r[0]*s*warp,p[1]+r[1]*h+.20*Math.sin(a*2+seed*.4),p[2]+Math.sin(a)*r[2]*s*(1+.06*Math.sin(4*a+seed))];}));
 }
 for(let i=0;i<n;i++){
  const j=(i+1)%n;
  g.tri([p[0],p[1]+r[1]*1.01,p[2]],rings[0][j],rings[0][i],colors[3]);
  for(let k=0;k<4;k++){
   let color=k===0?colors[3]:k===1?colors[(i%5===0)?2:1]:k===2?colors[0]:colors[4];
   g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],color);
  }
  g.tri([p[0],p[1]-r[1]*.88,p[2]],rings[4][i],rings[4][j],colors[4]);
 }
}
function v28Frond(g,root,tip,normal,width,length,palette){
 // Dense, curled lance-shaped leaf in real 3-D with closed top/back/side surfaces.
 const n=norm(normal),d=norm(sub(tip,root)),side=norm(cross(d,n));
 let prev=null;const num=5;
 for(let i=0;i<num;i++){
  let t=i/(num-1),c=add(mix(root,tip,t),mul(n,Math.sin(t*Math.PI)*length));
  let w=width*Math.pow(Math.sin(Math.PI*(t*.94+.03)),.83),th=.40*(1-t)+.06;
  let A=add(c,mul(side,w)),B=sub(c,mul(side,w)),F=add(c,mul(n,th)),K=sub(c,mul(n,th*.85));
  if(prev){const col=i%2?palette[0]:palette[1];g.quad(prev.A,A,F,prev.F,col);g.quad(prev.F,F,B,prev.B,palette[2]);
    g.quad(prev.K,K,A,prev.A,palette[2]);g.quad(prev.B,B,K,prev.K,palette[3]);g.quad(prev.A,A,K,prev.K,palette[3]);g.quad(prev.B,prev.K,K,B,palette[2]);}
  prev={A,B,F,K};
 }
}
function v28CrownWithLeaves(g,p,r,cols,seed){
 v28Crown(g,p,r,cols,seed);
 // Only a few independent foliate ends break each crown silhouette.
 for(let i=0;i<3;i++){
  let a=(i*2.39+seed*.41),dir=[Math.cos(a),0,Math.sin(a)];
  let s=[p[0]+dir[0]*r[0]*.71,p[1]+r[1]*(i%2?.18:-.08),p[2]+dir[2]*r[2]*.74];
  let tip=add(s,[dir[0]*r[0]*.43,r[1]*(i%2?.55:.42),dir[2]*r[2]*.52]);
  v28Frond(g,s,tip,[dir[0],.25,dir[2]],1.5+(i%2)*.36,.7,[cols[2],cols[3],cols[1],cols[4]]);
 }
}
function v28Roots(g,color,highlight,spread=1){
 for(let i=0;i<9;i++){const a=i*TAU/9+.2,dx=Math.cos(a),dz=Math.sin(a);
  const reach=15.5+(i%3)*1.7;
  v28wood(g,[[0,9,0],[dx*4.5,5.2,dz*4.1],[dx*reach*.74,2.0,dz*reach*.69],[dx*reach*spread,.16,dz*reach*spread]],
   [4.5,3.1,1.5,.04],i%3?color:highlight,9);
 }
}
function v28Zoan(g){
 const c=C28.z;
 v28Roots(g,c.heart,c.wood,1.09);
 // Barrel twists through the entire canopy rather than ending below an isolated clump.
 v28wood(g,[[0,-.5,0],[2,12,-1],[-2.7,24,-1],[2.0,37,2],[-1.2,48,-1],[0,61,-2]],
  [10.1,9.5,7.6,6.2,3.8,.04],[c.heart,c.wood],12);
 // Long bark folds and gnarly knots wrap both sides of the living trunk.
 for(let k=0;k<11;k++){
  let a=k*TAU/11+.18,ps=[];
  for(let j=0;j<6;j++){const h=6+j*8.1,rad=9.6-j*1.07,turn=a+j*.19;
   ps.push([Math.cos(turn)*rad,h,Math.sin(turn)*rad]);}
  v28wood(g,ps,[.58,.52,.43,.32,.22,.02],k%4?c.wood:c.dark,6);
 }
 // Animal face is carved into a forward-growing, thick wooden head.
 v28sphere(g,[0,23.5,7.7],[6.1,6.0,4.7],[c.wood,c.light,c.heart],120);
 for(const s of [-1,1]){
  // Actual cheek plates and ears, not a pasted eye texture.
  v28Frond(g,[s*4.6,26.2,7],[s*9.3,33.4,8.7],[s*.2,.4,1],2.6,1.1,[c.wood,c.light,c.heart,c.dark]);
  v28sphere(g,[s*2.55,24.1,11.30],[1.00,.95,.45],[c.ivory],40+s);
  v28sphere(g,[s*2.63,24.1,11.68],[.42,.52,.24],[c.pupil],42+s);
  v28wood(g,[[s*1.5,26.6,11.2],[s*3.0,26.85,11.0],[s*4.3,26.2,10.2]],[.43,.54,.04],c.dark,6);
 }
 v28sphere(g,[0,20.5,11.6],[2.35,1.65,1.00],[c.light,c.wood],200);
 v28sphere(g,[0,21.1,12.43],[1.15,.67,.43],[c.dark],208);
 for(const s of [-1,1])v28sphere(g,[s*.80,20.4,12.26],[.25,.23,.17],[c.dark],220+s);
 v25Spiral(g,[0,12.7,9.15],3.0,c.ivory,1.6,.30);
 // Two living branching antlers fork backward as well as outward.
 for(const s of [-1,1]){
  let line=[[s*3.6,32,1.0],[s*8.4,42,2.5],[s*13.8,49,1.1],[s*18.1,55,-1.5],[s*19.0,61,-4.5]];
  v28wood(g,line,[3.3,2.6,1.7,.85,.03],[c.wood,c.light,c.ivory],10);
  for(let j=1;j<4;j++){
   let q=line[j];v28wood(g,[q,add(q,[s*.95,3.6,1.8+j*.3]),add(q,[s*(2.9+j*.8),8.2+j,-.65+j*.6])],
    [1.25,.67,.035],c.ivory,8);
  }
 }
 // All crown masses have distinct X/Z placement AND thick height. There is
 // no central conical tier: broad asymmetrical boughs distribute the canopy.
 const masses=[
  [-14.8,47,-12.0,10.3,8.1,9.5], [13.4,49,-12.7,11.0,8.3,10.2],
  [-16.4,44,10.6,10.2,8.1,10.5], [16.9,46,11.2,9.8,8.3,10.1],
  [-3.8,58,-8.4,10.3,8.3,9.8], [8.2,58,7.3,10.7,8.0,9.2],
  [-7.2,60,10.8,8.5,7.0,8.6], [3.8,63,-3.0,9.5,7.2,9.3]
 ];
 masses.forEach((m,i)=>{
  let [x,y,z,rx,ry,rz]=m;
  v28wood(g,[[0,30,-1],[x*.37,38,z*.39],[x*.7,y-6,z*.69],[x,y-1,z]],
   [4.6,3.35,2.25,.05],i%3===0?c.wood:c.heart,9);
  let start=(i%3)*1;
  const colors=[c.greens[1+start],c.greens[2+start],c.greens[3+start],c.greens[4+start],c.greens[start]];
  v28CrownWithLeaves(g,[x,y,z],[rx,ry,rz],colors,i*2.83+3);
 });
 // Three oversized prehistoric fronds arc through gaps rather than spiking up.
 for(const item of [[-17,39,4,-21,48,14],[16,40,4,23,49,14],[0,49,-17,2,58,-22]]){
  const [x,y,z,tx,ty,tz]=item;
  v28Frond(g,[x,y,z],[tx,ty,tz],[0,.55,1],2.9,1.8,[c.greens[3],c.greens[4],c.greens[1],c.greens[0]]);
 }
}
function v28Thunderhead(g,p,r,seed){
 const c=C28.l,cols=c.cloud;
 // One spatial storm organism built from broad irregular rock/air chambers.
 v28Crown(g,p,r,[cols[0],cols[1],cols[2],cols[3],cols[0]],seed);
 const lobes=[[-.66,0,.42,.46],[-.24,.20,-.45,.47],[.36,.14,.28,.44],[.75,-.13,-.3,.39]];
 for(const [x,y,z,s] of lobes){let centre=add(p,[x*r[0],y*r[1],z*r[2]]);
  v28sphere(g,centre,[r[0]*s,r[1]*.63,r[2]*s],[cols[2],cols[3],cols[1]],seed+Math.round(s*100));}
}
function v28FireSail(g,origin,dir,length,width,seed){
 // Four closed twisting cross sections make one thick organic flame blade.
 const c=C28.l,d=norm(dir),side=norm(cross(d,[0,0,1])),n=norm(cross(side,d));
 let prev=null;
 for(let i=0;i<6;i++){
  let t=i/5,twist=Math.sin(t*TAU*.66+seed)*2.1;
  let centre=add(add(origin,mul(d,length*t)),[Math.sin(t*Math.PI)*2.0,Math.sin(t*2.7)*.4,Math.cos(t*4+seed)*2.2]);
  let w=width*Math.pow(Math.sin(Math.PI*(t*.94+.03)),.68),th=(1-t)*1.35+.10;
  let normal=norm(add(n,mul(side,Math.sin(t*3+seed)*.5)));
  let A=add(centre,mul(side,w)),B=sub(centre,mul(side,w)),F=add(centre,mul(normal,th+twist*.34)),K=sub(centre,mul(normal,th));
  if(prev){g.quad(prev.A,A,F,prev.F,i<3?c.flame:c.hot);g.quad(prev.F,F,B,prev.B,i%2?c.hot:c.lava);
   g.quad(prev.A,prev.K,K,A,c.lava);g.quad(prev.B,B,K,prev.K,c.hot);
   g.quad(prev.A,A,K,prev.K,c.lava);g.quad(prev.B,prev.K,K,B,c.lava);}
  prev={A,B,F,K};
 }
}
function v28Logia(g){
 const c=C28.l;
 v28Roots(g,c.shade,c.rock,1.0);
 // Asymmetric volcanic bifurcation, with a huge dark 3D core.
 v28wood(g,[[0,-.4,0],[-2,13,0],[2,24,-1],[-1,36,-2],[-3,48,-3]],
  [10.4,9.0,7.9,6.6,.1],[c.black,c.rock],13);
 for(let i=0;i<8;i++){
  let a=i*TAU/8+.3,pts=[];
  for(let j=0;j<6;j++){let h=3+j*8.0,rad=10-j*.84,theta=a+j*.2;
   pts.push([Math.cos(theta)*rad,h,Math.sin(theta)*rad]);}
  v28wood(g,pts,[.75,.67,.55,.42,.29,.015],i%2?c.lava:c.hot,6);
 }
 // Three thick, connected structural boughs grow into the storm canopy.
 const storms=[[-13,43,-11,9.5,5.9,9],[-4,57,-13,9.0,6.5,8.9],[9,51,-13,8.5,6.3,7.9]];
 storms.forEach((s,i)=>{
  let [x,y,z,rx,ry,rz]=s;
  v28wood(g,[[0,26,-2],[x*.54,y-8,z*.58],[x,y,z]], [4.3,2.7,.04],i%2?c.black:c.rock,10);
  v28Thunderhead(g,[x,y,z],[rx,ry,rz],17+i*5);
 });
 // Fire spreads as huge arcing, thick flame leaves on the OTHER axis of the crown.
 const firebase=[[11,37,8,5.5,19,.3],[12,46,1,6.0,22,1.2],[2,51,11,5.1,16,2.4],[15,32,-2,4.8,14,3.1]];
 for(const f of firebase){let [x,y,z,w,h,a]=f;
  v28wood(g,[[0,24,0],[x*.6,y-6,z*.62],[x,y,z]],[4.0,2.65,.08],c.rock,9);
  v28FireSail(g,[x,y,z],[Math.cos(a)*.28,.91,Math.sin(a)*.23],h,w,a);
  // Wide, half-height child flame grows from the parent sail in a different plane.
  if(a<2.5)v28FireSail(g,[x+2.0,y+2,z+2.0],[Math.sin(a+.9)*.38,.82,Math.cos(a+.9)*.31],h*.56,w*.60,a+1.55);
 }
 // Storm electricity grows through the dark underside, bends and forks.
 for(let i=0;i<4;i++){
  let q=[-15+i*4.2,37+i%2*6,-6+(i%2)*4];
  v28wood(g,[q,add(q,[.8,-3,2]),add(q,[-1.8,-5,2.5]),add(q,[.45,-10,3.8])],
   [.42,.43,.35,.02],c.flame,6);
 }
 // Blue water forms substantial, interlocking *surfaces*, never a paper ribbon.
 for(let k=0;k<2;k++){
  let points=[];for(let i=0;i<=65;i++){
   let t=i/65,a=(k===0?.7:3.2)+t*TAU*(k===0?1.22:.87),rad=(k===0?11.6:9.0)-t*.7;
   points.push([Math.cos(a)*rad,3+t*(k===0?46:41),Math.sin(a)*rad]);}
  v27Sheet(g,points,points.map((_,i)=>(k===0?2.75:1.56)*(1-i/120)),c.water[k===0?1:2],c.water[0],.67);
  v28wood(g,points,points.map((_,i)=>(k===0?.47:.28)*(1-i/130)),c.water[3],7);
 }
 // Frozen ocean roots and fractures give the whole sculpture weight.
 for(let i=0;i<10;i++){
  let a=i*TAU/10+.2,r=12+(i%3)*1.1;
  const q=[Math.cos(a)*r,.2,Math.sin(a)*r];
  shard(g,q,add(q,[Math.cos(a)*(1+i%2),6.5+(i%4)*2.8,Math.sin(a)*(1+i%3)]),2.1+(i%3)*.35,c.ice[i%3],7);
 }
 v25Spiral(g,[0,14.3,9.2],3.0,c.flame,1.7,.32);
}
function v28Petal(g,centre,dir,normal,scale,palette,seed=0){
 // Hand-shaped six-section bent petal: full front, back, bevels and rolled edges.
 const d=norm(dir),n=norm(normal),side=norm(cross(d,n));let prev=null;
 for(let i=0;i<=6;i++){
  const t=i/6,bulge=Math.sin(t*Math.PI),bent=.37*t*t;
  const ctr=add(add(centre,mul(d,scale*t)),mul(n,scale*(.16*bulge+bent)));
  let w=scale*.30*Math.pow(Math.sin(Math.PI*(.90*t+.035)),.75)*(1+.08*Math.sin(seed+t*4));
  let th=(.15+.04*bulge)*(1-t*.8)*scale;
  const a=add(ctr,mul(side,w)),b=sub(ctr,mul(side,w)),top=add(ctr,mul(n,th)),back=sub(ctr,mul(n,th*.78));
  if(prev){g.quad(prev.a,a,top,prev.top,palette[1]);g.quad(prev.top,top,b,prev.b,palette[0]);
   g.quad(prev.a,prev.back,back,a,palette[2]);g.quad(prev.b,b,back,prev.back,palette[3]);
   g.quad(prev.a,a,back,prev.back,palette[2]);g.quad(prev.b,prev.back,back,b,palette[3]);}
  prev={a,b,top,back};
 }
}
function v28Blossom(g,p,r,normal,seed){
 const c=C28.p,n=norm(normal),u=norm(cross(n,Math.abs(n[1])>.88?[1,0,0]:V28UP)),v=norm(cross(u,n));
 // Six large individual 3-D outer petals, each with its own curl and coloured
 // faceted surfaces, plus smaller inner ring. Physical supports grow behind.
 for(let ring=0;ring<2;ring++){
  const count=ring===0?7:5;
  for(let i=0;i<count;i++){
   let a=TAU*(i+.13+ring*.43)/count+seed*.15;
   const radial=add(mul(u,Math.cos(a)),mul(v,Math.sin(a)));
   let begin=add(p,mul(n,ring===0?0:r*.14));
   const lean=norm(add(radial,mul(n,ring===0?.47:.64)));
   const s=r*(ring===0?1.06:.57)*(1+.09*Math.sin(i*2+seed));
   const cols=[c.rose[(i+ring+seed)%5],c.rose[(i+ring+seed+1)%5],c.rose[(i+ring+seed+2)%5],c.rose[(i+ring+seed+3)%5]];
   v28Petal(g,begin,lean,n,s,cols,seed+i);
  }
 }
 const head=add(p,mul(n,r*.45));
 v28sphere(g,head,[r*.29,r*.29,r*.29],[c.gold,'#fff5bd','#ffd37c'],44+seed);
 for(let i=0;i<5;i++){
  let a=TAU*i/5,rad=add(mul(u,Math.cos(a)*r*.19),mul(v,Math.sin(a)*r*.19));
  v28sphere(g,add(add(head,rad),mul(n,r*.22)),[.43,.55,.4],i%2?'#fff2c3':'#ffd05c',seed*8+i);
 }
}
function v28Portal(g,p,r,normal,palette,seed){
 const n=norm(normal),u=norm(cross(n,V28UP)),v=norm(cross(u,n)),path=[];
 for(let i=0;i<=84;i++){
  let a=i/84*TAU,shape=(1+.08*Math.sin(a*3+seed*.9));
  path.push(add(p,add(mul(u,Math.cos(a)*r*shape),add(mul(v,Math.sin(a)*r*.91),mul(n,Math.sin(2*a+seed)*.70)))));
 }
 v28wood(g,path,path.map((_,i)=>.82+.16*Math.sin(i*.1+seed)),palette,10);
 // Thin secondary inlay follows the inner section of the 3D portal.
 let inset=path.map(x=>mix(p,x,.948));v28wood(g,inset,inset.map(()=>.18),'#fff5b7',6);
}
function v28Paramecia(g){
 const c=C28.p;
 v28Roots(g,c.bark,c.wood,.99);
 // Braided trunk curves through huge negative space; each path has depth in Z.
 for(let k=0;k<3;k++){
  let pts=[];for(let i=0;i<=45;i++){
   let t=i/45,a=k*TAU/3+t*TAU*1.02;
   pts.push([Math.cos(a)*(6.4-t*2.3),t*54,Math.sin(a)*(6.5-t*2.0)]);
  }
  v28wood(g,pts,pts.map((_,i)=>Math.max(.15,5.9-i*.122)),[c.bark,c.wood,c.glow][k],11);
 }
 // Gold and mint geometry is embedded through the trunk, rather than in front.
 v28Portal(g,[-2.8,41,1],13.1,[.82,.15,.56],c.gold,2);
 v28Portal(g,[7.3,48,-2],10.7,[.16,.47,.87],c.aqua,3);
 v28Portal(g,[-3.5,29,3],8.2,[.25,.7,-.62],c.gold,4);
 // Five large thick flowers face different world directions and create many
 // readable side/rear profiles; no merged mass or stacked frontal flowers.
 const blooms=[
  {p:[-15,46,11],s:8.8,n:[-.48,.18,.85]},
  {p:[14.7,49,10],s:8.8,n:[.65,.13,.78]},
  {p:[-10,59,-10],s:8.1,n:[-.56,.48,-.68]},
  {p:[12,60,-9],s:8.5,n:[.63,.29,-.72]},
  {p:[1.5,67,1],s:9.2,n:[.11,.68,.63]}
 ];
 blooms.forEach((f,i)=>{
  let root=[0,21+(i%3)*2,0],back=add(f.p,mul(norm(f.n),-2.1));
  v28wood(g,[root,[f.p[0]*.46,f.p[1]-10,f.p[2]*.5],[f.p[0]*.83,f.p[1]-4,f.p[2]*.83],back,f.p],
   [4.7,3.4,2.1,.9,.16],i%2?c.wood:c.bark,10);
  v28sphere(g,back,[2.2,2.2,2.2],[c.bark,c.wood],i+40);
  v28Blossom(g,f.p,f.s,f.n,i+2);
 });
 // A few developing buds at different depth, not a uniform wreath of repeats.
 for(let i=0;i<4;i++){
  const a=i*TAU/4+.35,p=[Math.cos(a)*16.5,34+(i%2)*6.2,Math.sin(a)*16.5];
  v28wood(g,[[0,25,0],[p[0]*.7,p[1]-4,p[2]*.6],p],[2.45,1.2,.08],c.wood,8);
  v28Blossom(g,p,3.7,[Math.cos(a),.22,Math.sin(a)],i+14);
 }
 // A broad luminous ribbon follows a three-dimensional helical pathway.
 let path=[];for(let i=0;i<=78;i++){
  const t=i/78,a=.45+t*TAU*1.42;
  path.push([Math.cos(a)*(11.2-t*.8),6+t*44,Math.sin(a)*(10.4-t*.6)]);
 }
 v27Sheet(g,path,path.map((_,i)=>2.0*(1-i/160)),c.gold,'#d79e4b',.54);
 v28wood(g,path,path.map((_,i)=>.22*(1-i/130)),'#fff6b5',6);
 v25Spiral(g,[0,14.3,9],3.2,c.gold,1.7,.27);
}
function v28Island(ci){
 const g=new Mesh(),N=23;
 const palettes=[
  {top:['#71bd48','#8fda50','#387c40'],sides:['#539445','#75bd4e'],rock:[['#cb9863','#ad8053'],['#ab795b','#947358'],['#92735f','#84665c'],['#6d605e','#5c545b'],['#54495a','#49435e']]},
  {top:['#556b69','#738987','#3d585d'],sides:['#445c61','#5e7774'],rock:[['#6d6572','#7d727b'],['#555263','#66606d'],['#46485f','#4d4b61'],['#37374e','#3d3951'],['#272840','#33334a']]},
  {top:['#ab75a4','#c48eb6','#94618e'],sides:['#8f648c','#bb7faf'],rock:[['#a37096','#be849f'],['#8b5a81','#a16b93'],['#764f7a','#825879'],['#5e486b','#705475'],['#493958','#5b4366']]}
 ][ci];
 const radii=[22.8,23.1,22.4,20.4,16.9,12.5,7.2,.3],levels=[.25,-2.0,-5.9,-10.9,-16.9,-22.3,-26.7,-28.4];
 const rings=radii.map((r,k)=>Array.from({length:N},(_,i)=>{
  let a=i*TAU/N,rr=r*(1+.075*Math.sin(3*a+ci*.75)+.05*Math.cos(5*a+ci*2));
  return [Math.cos(a)*rr,levels[k]+(k===0?.24*Math.sin(i*2.1):0),Math.sin(a)*rr*(.89+.035*Math.cos(a*3+ci))];
 }));
 for(let i=0;i<N;i++){const j=(i+1)%N;
  g.tri([0,.60,0],rings[0][j],rings[0][i],palettes.top[(i+ci)%3]);
  for(let k=0;k<7;k++){
   const col=k===0?palettes.sides:palettes.rock[Math.min(4,k-1)];
   g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],col[(i+k)%2]);
  }
 }
 // Every island's ornaments have a materially different origin and silhouette.
 if(ci===0){for(let i=0;i<13;i++){
  let a=i*2.40,r=12+i%4*1.3,p=[Math.cos(a)*r,.72,Math.sin(a)*r*.83];
  v28sphere(g,p,[1.1,.7,1.3],[C28.z.greens[i%4+1],C28.z.greens[4]],i+43);
 }}
 if(ci===1){for(let i=0;i<9;i++){
  let a=i*2.40,r=13+i%3*1.3,p=[Math.cos(a)*r,.4,Math.sin(a)*r*.84];
  shard(g,p,add(p,[.35,3.5+i%3*1.0,.4]),1.3,C28.l.ice[i%3],6);
 }}
 if(ci===2){for(let i=0;i<11;i++){
  let a=i*2.40,r=13+i%4*1.2,p=[Math.cos(a)*r,.45,Math.sin(a)*r*.84];
  v28sphere(g,p,[1.0,.65,1.1],i%2?'#d6a2cb':'#9273ad',i+32);
 }}
 // Each waterfall begins *on the top surface*, hugs the rim/stratum then
 // curves fully off the floating island into three-dimensional spray.
 const sources=[[-10.3,17.9],[11.4,17.6],[3.7,-19.7]];
 for(let j=0;j<3;j++){
  let [x,z]=sources[j],sign=Math.sign(z),side=j===0?-1:1,pts=[];
  for(let i=0;i<=18;i++){
   let t=i/18;
   let zz=z+sign*(1.2+10.3*t+Math.sin(t*Math.PI)*1.1);
   let xx=x+side*(1.6*t+.7*Math.sin(t*Math.PI));
   let yy=t<.13?.32-3*t:-.08-31*(t-.13)/.87;
   pts.push([xx,yy,zz]);
  }
  v27Sheet(g,pts,pts.map((_,i)=>(j===2?1.25:2.35)*(1-.15*i/18)),ci===2?'#97f9f0':'#56dff1',ci===1?'#086d9b':'#147ca7',.30);
  v28wood(g,pts,pts.map((_,i)=>.23*(1-.3*i/18)),'#dcffff',6);
  const foot=pts.at(-1);
  for(let k=0;k<7;k++)v28sphere(g,add(foot,[(k-3)*.46,Math.sin(k*2.5)*.45,(k%3-1)*.5]),[.29,.27,.32],['#dfffff','#5bcce7'],k+20);
 }
 return g;
}
function v28FamilyBranch(ci){
 // Retain V27's correctly scaled, structurally supported small 3-D bough.
 return v27FamilyBranch(ci);
}
function makeTree28(ci){const g=new Mesh();[v28Zoan,v28Logia,v28Paramecia][ci](g);v25FamilyBoughs(g,ci);return g;}
