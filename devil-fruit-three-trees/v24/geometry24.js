/* V24: one independent, substantial, volumetric macro-chibi sculpture for
   each class. Built ONLY on the V23 engine and historical catalogue.
   All forms are actual XYZ triangle meshes, not billboards or image textures. */
const V24={
 zo:{bark:'#a76132',light:'#d68c45',deep:'#6e3d2b',canopy:['#16995a','#34bd52','#82d944','#c8ec63'],ivory:'#ffe1a0'},
 lo:{rock:'#403655',light:'#665677',deep:'#27223b',cloud:['#e7faff','#a6d3e3','#f9fcff','#799fc3'],fire:['#fd451f','#ff8122','#ffd33d']},
 pa:{bark:'#c23488',deep:'#8d2879',light:'#ed58af',canopy:['#f95ba9','#ff92cc','#f3aedb','#b56ccd'],gold:'#ffda67'}
};
const v24Color=(cs,i)=>cs[(i+cs.length*30)%cs.length];
function v24Orb(g,p,r,cols,seed=1,seg=11,lat=7){blob(g,p,r,Array.isArray(cols)?cols:[cols],seed,seg,lat)}
function v24Path(g,points,thick,c,sides=9){tube(g,points,thick,c,sides)}
function v24Frame(g,p,r,seed,col,highlight){
 // A hollow 3D-facing faceted lobe with readable depth and natural ridge patterns.
 v24Orb(g,p,r,[col,highlight,col],seed,11,7);
 for(let i=0;i<4;i++){let a=(i+.2)*TAU/4+seed*.1;
  const from=add(p,[Math.cos(a)*r[0]*.45,-r[1]*.25,Math.sin(a)*r[2]*.58]);
  const to=add(p,[Math.cos(a)*r[0]*.92,r[1]*.45,Math.sin(a)*r[2]*.92]);
  v24Path(g,[from,mix(from,to,.62),to],[.28,.19,.035],highlight,5);
 }
}
function v24GroveCrown(g,p,r,seed){
 const R=rng(seed+1008),greens=V24.zo.canopy;
 v24Orb(g,p,r,[greens[0],greens[1],greens[2]],seed,12,7);
 // Voluminous orbital leaf-bunches wrap around the front, rear AND sides.
 for(let i=0;i<9;i++){let a=i*TAU/9+seed*.31,top=(i%4-1)*1.85;
  let q=add(p,[Math.cos(a)*r[0]*.69,top+2.3,Math.sin(a)*r[2]*.72]);
  v24Orb(g,q,[r[0]*.40,r[1]*(.55+(i%3)*.06),r[2]*.46],v24Color(greens,i+seed),seed*17+i,9,6);
  if(i%2===0){const t=add(q,[Math.cos(a)*r[0]*.3,3.4,Math.sin(a)*r[2]*.3]);
   v24Path(g,[q,mix(q,t,.55),t],[.35,.28,.02],greens[3],6);
  }
 }
 for(let i=0;i<4;i++){let a=i*TAU/4+.35;let q=add(p,[Math.cos(a)*r[0]*.41,r[1]*.86,Math.sin(a)*r[2]*.46]);v24Orb(g,q,[r[0]*.37,r[1]*.40,r[2]*.39],greens[2],seed*31+i,9,6)}
}
function v24Roots(g,col,light){
 for(let i=0;i<8;i++){const a=i*TAU/8,dx=Math.cos(a),dz=Math.sin(a);
  v24Path(g,[[dx*1.5,7,dz*1.5],[dx*5.8,3.8,dz*6.0],[dx*10.5,1.2,dz*10],[dx*14.6,.4,dz*13.4]],[4.5,3.4,2.1,.23],i%3?col:light,9);
 }
}
function v24Trunk(g,ci){
 const c=[V24.zo.bark,V24.lo.rock,V24.pa.bark][ci],h=[V24.zo.light,V24.lo.light,V24.pa.light][ci];
 const pts=[[0,0,0],[-1.2,6,.8],[1.9,14,-1],[-1,23,0],[.6,32,-.5],[0,40,0]];
 v24Path(g,pts,[9.4,8.6,7.1,6.0,4.5,2.5],c,12);v24Roots(g,c,h);
 // Three physical macro-facet bark veins follow the trunk's actual volume.
 for(let k=0;k<3;k++){let a=TAU*k/3+.3,ps=pts.slice(0,5).map((p,i)=>add(p,[Math.sin(a+i*.2)*(7.3-i*.6),0,Math.cos(a+i*.2)*(7.3-i*.6)]));
  v24Path(g,ps,[.52,.46,.32,.24,.06],h,6);
 }
}
function v24Horns(g,side){
 const s=side;
 v24Path(g,[[s*5.8,24,1.7],[s*10.2,32,2],[s*14.7,38,1.6],[s*17.3,46,1.3],[s*15.7,52,.5]],[3.0,2.4,1.6,.85,.06],V24.zo.ivory,9);
 v24Path(g,[[s*12.0,35,1.5],[s*17.9,41,2.5],[s*20.8,46,2.4]],[1.75,.95,.06],'#ffe9b6',8);
 v24Path(g,[[s*10,32,1.9],[s*11.8,41,3.1],[s*11.3,46,3]],[1.6,.7,.06],'#ebcc88',7);
}
function v24Zoan(g){
 v24Trunk(g,0);
 // The tree's animal face is part of the bark, kept broad and readable.
 v24Orb(g,[0,21,7.8],[4.9,4.3,2.8],[V24.zo.light,V24.zo.bark],411,10,7);
 for(const s of [-1,1]){
  v24Path(g,[[s*2.0,22.3,9.8],[s*2.5,22.0,10.35]],[.8,.8],'#ffdf99',7);
  v24Orb(g,[s*2.65,22.0,10.54],[.43,.48,.22],'#223e45',12,9,5);
  v24Path(g,[[s*3.8,20.8,9.1],[s*5.5,18.3,9.8],[s*5.7,16.5,9.4]],[1.6,1,.02],V24.zo.ivory,8);
  v24Horns(g,s);
 }
 v24Orb(g,[0,19.3,11],[1.1,.76,.52],'#6b3c27',71,8,5);
 planeSpiral(g,[0,12,8.9],2.9,'#ffe3a0',1.73,.30,49);
 // The 3D boughs grow in a full radial crown, not a squashed plane.
 for(let i=0;i<10;i++){let a=i*2.39996,angle=a+.3,y=27+(i%4)*3.2,
  end=[Math.cos(angle)*(10+(i%3)*2.5),y,Math.sin(angle)*(11+(i%2)*2.5)];
  v24Path(g,[[0,17+i%2*2,0],[end[0]*.49,y-8,end[2]*.48],end,add(end,[Math.cos(a)*3.6,2.7,Math.sin(a)*3.6])],[3.6,2.8,1.6,.10],i%3?V24.zo.bark:V24.zo.light,9);
  const leaf=add(end,[0,4.1,0]);v24GroveCrown(g,leaf,[5.5+(i%3)*.6,5.4+(i%2)*.9,5.9+(i%3)*.5],i*5+9);
 }
 v24GroveCrown(g,[0,46,0],[9.0,7.1,9.5],101);
 v24GroveCrown(g,[-4,52,-3],[6.1,5.0,6.3],142);
}
function v24Cloud(g,p,seed=0){
 const cs=V24.lo.cloud;
 for(let i=0;i<6;i++){const a=i*TAU/6;let q=add(p,[Math.cos(a)*4.2,Math.sin(a*1.4)*2.0,Math.sin(a)*4.0]);
  v24Orb(g,q,[4.0+(i%2)*.8,4.3+(i%3)*.35,4.2+(i%3)*.5],[v24Color(cs,i+seed),cs[2]],seed*19+i,10,6);
 }
 v24Orb(g,p,[5.8,4.7,6],[cs[0],cs[1]],seed+801,11,7);
}
function v24Flame(g,p,height,colIndex=0){
 const cs=V24.lo.fire;
 for(let j=0;j<5;j++){const a=j*TAU/5,dx=Math.cos(a),dz=Math.sin(a),h=height*(.73+(j%3)*.12),q=add(p,[dx*1.5,-1.4,dz*1.7]);
  v24Path(g,[q,add(q,[dx*1.2,h*.37,dz*1.2]),add(q,[dx*1.5,h*.74,dz*.6]),add(q,[dx*2.2,h,dz*.5])],[2.7,2.2,1.12,.04],v24Color(cs,j+colIndex),7);
 }
 v24Orb(g,add(p,[0,1.2,0]),[3.9,3.9,3.7],[cs[0],cs[1]],122+colIndex,10,6);
}
function v24Water(g,start=0,top=39,radius=9){
 const ps=Array.from({length:55},(_,i)=>{const t=i/54,a=start+t*TAU*1.38;return [Math.cos(a)*radius*(1-.08*t),4+t*(top-4),Math.sin(a)*radius*(1-.08*t)]});
 v24Path(g,ps,ps.map((_,i)=>1.85-.65*i/54),'#03bfe7',9);
 v24Path(g,ps.map(p=>add(p,[.23,.3,.58])),ps.map(()=>.29),'#baf6ff',6);
}
function v24Lightning(g,start,scale,side=1){
 const [x,y,z]=start;
 v24Path(g,[[x,y,z],[x+side*.5*scale,y-.36*scale,z+1],[x-side*.32*scale,y-.59*scale,z+1.2],[x+side*.06*scale,y-1.03*scale,z+1.6]],[.75,.75,.56,.02],'#fff080',6);
}
function v24Logia(g){
 v24Trunk(g,1);v24Water(g,.2,43,8.4);v24Water(g,2.3,34,10.2);
 // Physically opposed wings: volcanic matter and storm cloud, both fully 3D.
 for(let j=0;j<8;j++){
  let a=j*2.39996,y=27+(j%3)*4,r=10+(j%3)*1.8;
  let p=[Math.cos(a)*r,y,Math.sin(a)*r];
  v24Path(g,[[0,17,0],[p[0]*.55,y-5,p[2]*.59],p],[4.3,2.9,.35],V24.lo.rock,9);
  if(j%2===0){v24Cloud(g,add(p,[0,4,0]),j);v24Lightning(g,add(p,[0,-.5,3]),6,j%3?1:-1)}
  else{v24Flame(g,add(p,[0,3,0]),7.8+(j%3)*2,j)}
 }
 v24Cloud(g,[-5,51,-4],20);v24Cloud(g,[4,52,3],21);
 v24Flame(g,[10,49,-5],10,7);
 for(let j=0;j<9;j++){const a=j*TAU/9;
  const q=[Math.cos(a)*9,.5,Math.sin(a)*9];shard(g,q,add(q,[Math.cos(a)*2,5+j%3*2,Math.sin(a)*2]),1.55,j%2?'#72e8ff':'#b2faff',7);
 }
 planeSpiral(g,[0,12,8.4],2.55,'#ffc262',1.7,.29,45);
}
function v24ParaPetal(g,c,ang,rad,seed){
 // Fat three-dimensional flower petal with contrasting raised ridge.
 const dx=Math.cos(ang),dz=Math.sin(ang),p=add(c,[dx*rad*.57,2.0,dz*rad*.57]);
 v24Orb(g,p,[rad*.43,rad*.65,rad*.45],[V24.pa.canopy[(seed+1)%4],V24.pa.canopy[seed%4]],seed*83,9,6);
 let front=add(p,[dx*rad*.18,rad*.3,dz*rad*.15]);v24Orb(g,front,[rad*.18,rad*.32,rad*.20],'#ffd2ea',seed*93,8,5);
}
function v24Bloom(g,p,r,seed){
 for(let i=0;i<7;i++)v24ParaPetal(g,p,TAU*i/7+seed*.17,r,seed+i);
 v24Orb(g,add(p,[0,1,2]),[r*.34,r*.4,r*.35],'#ffd869',seed*33,10,6);
}
function v24TiltRing(g,c,rx,ry,rz,a0,colour,thick){
 const points=Array.from({length:61},(_,i)=>{const a=i*TAU/60+a0;return add(c,[Math.cos(a)*rx,Math.sin(a)*ry,Math.sin(a+.7)*rz])});
 v24Path(g,points,points.map(()=>thick),colour,9);
}
function v24Paramecia(g){
 // Three massive twisting columns split/merge; impossible geometry from the trunk outward.
 v24Roots(g,V24.pa.bark,V24.pa.light);
 for(let k=0;k<3;k++){
  let a0=k*TAU/3;
  const pts=Array.from({length:29},(_,i)=>{const t=i/28,a=a0+t*TAU*1.28;return [Math.cos(a)*(5.9-t*2),t*45,Math.sin(a)*(6.2-t*2)]});
  v24Path(g,pts,pts.map((_,i)=>Math.max(.3,4.0-i*.117)),v24Color([V24.pa.bark,V24.pa.light,V24.pa.deep],k),9);
 }
 // Not a flat pink cloud: deep radial branching and genuinely spherical blossoms.
 for(let i=0;i<8;i++){
  let a=i*2.39996,ys=25+i%3*3.8,dist=11+(i%3)*2.2;
  let p=[Math.cos(a)*dist,ys,Math.sin(a)*dist];
  v24Path(g,[[0,15,0],[p[0]*.56,ys-5,p[2]*.58],p],[3.4,2.3,.35],i%2?V24.pa.bark:V24.pa.deep,9);
  const top=add(p,[0,5,0]);v24Orb(g,top,[6.0,5.6,5.9],[V24.pa.canopy[0],V24.pa.canopy[2],V24.pa.canopy[3]],i*31+9,11,7);
  if(i%2===0)v24Bloom(g,add(p,[0,7,1.7]),4.8,i);
 }
 v24Orb(g,[0,49,0],[9,7,9],[V24.pa.canopy[0],V24.pa.canopy[1]],22,11,7);
 v24Bloom(g,[0,53,3],6.6,14);
 v24TiltRing(g,[0,27,0],12.4,8.2,5.8,.4,V24.pa.gold,1.25);
 v24TiltRing(g,[0,35,-2],10.0,9.6,7.5,2.0,'#c9f6fa',.80);
 // A rising spiral that bends around the tree in *all three axes*.
 const spiral=Array.from({length:70},(_,i)=>{let t=i/69,a=1.3+t*TAU*1.62;return [Math.cos(a)*8.4,4+t*40,Math.sin(a)*8.9]});
 v24Path(g,spiral,spiral.map((_,i)=>1.20-.5*i/69),V24.pa.gold,9);
 for(let i=0;i<9;i++){let a=i*2.4,y=10+(i%6)*5,r=13+(i%3)*1.2;
  v24Orb(g,[Math.cos(a)*r,y,Math.sin(a)*r],[1.4,1.7,1.6],i%2?'#ffe18c':'#ab75e0',i+122,8,6);
 }
 planeSpiral(g,[0,13,7.5],3.1,'#ffeaa5',1.75,.30,44);
}
function v24Boughs(g,ci){
 const c=[V24.zo.bark,V24.lo.rock,V24.pa.bark][ci],h=[V24.zo.light,V24.lo.light,V24.pa.light][ci];
 for(let i=0;i<groups[ci].length;i++){
  let t=anchorFor(ci,i),e=add(t,[0,3.0,0]);
  let from=[t[0]*.15,15+(i%4)*2.1,t[2]*.17];
  let mid=[t[0]*.58,t[1]+5,t[2]*.62];
  v24Path(g,[from,mid,e,add(t,[0,1.05,0])],[2.75,1.95,.82,.15],i%3?h:c,9);
 }
}
function makeTree24(ci){const g=new Mesh();[v24Zoan,v24Logia,v24Paramecia][ci](g);v24Boughs(g,ci);return g}
function island24(ci){
 // Shared floating archipelago language, class-neutral stone/soil and deep XYZ underside.
 const g=new Mesh(),N=19,r=[22.3,23,22.8,21,18,12,3,0.07],y=[.15,-2.3,-5.7,-10,-14.2,-19.8,-25.5,-27.8];
 const rings=r.map((radius,k)=>Array.from({length:N},(_,j)=>{let a=j*TAU/N,rr=radius*(1+.08*Math.sin(j*2.6+ci*.6)+.035*Math.cos(j*6.9));return [Math.cos(a)*rr,y[k]+(k<2?.40*Math.sin(j*3):0),Math.sin(a)*rr*.91]}));
 for(let j=0;j<N;j++){let nxt=(j+1)%N;g.tri([0,.4,0],rings[0][nxt],rings[0][j],j%3?'#60b932':'#a8e34f');for(let k=0;k<r.length-1;k++)g.quad(rings[k][j],rings[k][nxt],rings[k+1][nxt],rings[k+1][j],[
  ['#308d3a','#56ac26'],['#ca9b64','#be8759'],['#a87e5e','#986a54'],['#806b68','#6c5560'],['#71596e','#5b4a63'],['#51445c','#42384f'],['#312c43','#363a51']][k][j%2]);}
 for(let s of [-1,1]){
  // Three-dimensional waterfall sheets with staggered lateral flow, never straight pipes.
  let pts=[];for(let j=0;j<=11;j++){let t=j/11;pts.push([s*(9+3.3*t+.65*Math.sin(t*TAU)), -.2-26.7*t,20+9*t+1.5*Math.sin(t*Math.PI)])}
  for(let j=0;j<11;j++)for(let k=0;k<7;k++){
   const a=(k/7-.5)*3.2,b=((k+1)/7-.5)*3.2;
   const A=add(pts[j],[a,0,0]),B=add(pts[j],[b,0,0]),C=add(pts[j+1],[b,0,0]),D=add(pts[j+1],[a,0,0]);
   g.quad(A,B,C,D,['#e6feff','#1ebee2','#69d8f7','#17a7d0'][k%4]);
  }
  for(let j=0;j<9;j++)v24Orb(g,[pts[11][0]+(j-4)*.5,-27.5,pts[11][2]],[.35,.3,.46],j%2?'#e8ffff':'#a3f2ff',j+25,7,5);
 }
 // Bigger, grounded vegetation clusters on both the front and rear faces.
 for(let k=0;k<16;k++){let a=k*2.39996,p=[Math.cos(a)*(15.0+(k%3)*1.5),.6,Math.sin(a)*(13.3+(k%3)*1.1)];
  v24Orb(g,p,[1.7,.9,1.8],k%3?'#499f37':'#a0d947',k+23,8,5);
 }
 return g;
}
function familyBranch24(ci){const g=new Mesh();const col=[V24.zo.bark,V24.lo.rock,V24.pa.bark][ci];
 const pts=[[-12,-1,0],[-9,0,1],[-5,1.8,1.1],[0,2.7,1.5],[5,1.8,1.1],[9,0,1],[12,-1,0]];
 v24Path(g,pts,[.5,1.1,1.75,2.1,1.75,1.1,.5],col,9);
 for(let i=-2;i<=2;i++){let p=[i*4.2,1.8-Math.abs(i)*.38,1.0];
  v24Path(g,[p,add(p,[i%2?1:-1,2.0,-1.0])],[.56,.03],[V24.zo.canopy[1],V24.lo.cloud[0],V24.pa.canopy[0]][ci],6);
 }return g;
}
function genericFruit24(ci,seed){
 const g=new Mesh(),palette=[['#8de448','#2ca85c','#c8ec65'],['#ffab3e','#29b8e5','#f7e866'],['#ff7abd','#a77ae7','#f9b475']][ci];
 let shape=seed%4,r=[.9,.94,.90];if(shape===0)r=[.85,1.15,.89];if(shape===1)r=[1.02,.85,1.03];if(shape===2)r=[.82,1.04,.85];
 v24Orb(g,[0,0,0],r,palette[seed%3],seed,9,6);
 v24Path(g,[[0,.88,0],[.08,1.21,0],[.34,1.27,.02]],[.15,.10,.02],'#4a8e4d',6);
 // Low-poly swirl patterns are a real relief above the body.
 planeSpiral(g,[0,0,r[2]],.32,'#fff0af',1.4,.055,18);
 return g;
}