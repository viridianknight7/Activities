/* V29: three independent, fully volumetric sculptural trees, built on V28 ONLY.
   Every feature is world-space triangle geometry. No billboards or flat impostors. */
const V29={
 z:{wood:'#99582f',lit:'#c78546',hi:'#edb66f',shadow:'#5b3527',ivory:'#ffdfad',green:['#075c44','#08744b','#188c4e','#269e4b','#45b94e','#7bd359','#b4e57d']},
 l:{wood:'#282539',stone:'#41334f',edge:'#66516b',cloud:['#3d687e','#588aa2','#83afc0','#bddcdb','#e5f5e9'],hot:['#ad3626','#dd4722','#ff792b','#ffb53c','#ffe871'],ice:['#1e92b4','#50d9e7','#a2f6f5','#e5faff']},
 p:{wood:'#682058',bark:'#962c7d',pink:'#d0449e',rose:['#9b2a82','#bb3f99','#dc61ac','#f98cbd','#ffd0e0','#fff0db'],gold:'#ffd66f',mint:'#7de9dd'}
};
function v29lin(g,p,r,c,n=10){tube(g,p,r,c,n)}
function v29ball(g,p,r,c,s=12){blob(g,p,r,c,s,11,7)}
function v29twist(g,seed,start,end,r0,r1,col,turn=.8){let ps=[],rr=[];for(let i=0;i<=14;i++){let t=i/14,a=seed+t*TAU*turn;ps.push(add(mix(start,end,t),[Math.cos(a)*Math.sin(t*Math.PI)*r0*.43,0,Math.sin(a)*Math.sin(t*Math.PI)*r0*.43]));rr.push(lerp(r0,r1,t))}v29lin(g,ps,rr,col,10)}
function v29OrganicCrown(g,p,rad,palette,seed){
 // Closed crown with non-uniform lobed equator and substantial underside.
 const N=18,M=8,rings=[];
 for(let k=0;k<=M;k++){let lat=Math.PI*k/M;let row=[];
  for(let j=0;j<N;j++){let a=j*TAU/N, warp=1+.12*Math.cos(a*5+seed*.51)*Math.pow(Math.sin(lat),2)+.065*Math.sin(a*3-seed+.8);
   let x=p[0]+Math.cos(a)*rad[0]*Math.sin(lat)*warp;
   let z=p[2]+Math.sin(a)*rad[2]*Math.sin(lat)*(warp+.045*Math.cos(2*a+seed));
   let y=p[1]+rad[1]*Math.cos(lat)+.7*Math.sin(a*3+seed)*Math.sin(lat);
   row.push([x,y,z]);
  }rings.push(row);
 }
 for(let k=0;k<M;k++)for(let j=0;j<N;j++){let n=(j+1)%N;
  let c=k<2?palette[3]:k<4?palette[(j+seed)%4]:palette[k<6?1:0];
  g.quad(rings[k][j],rings[k][n],rings[k+1][n],rings[k+1][j],c);
 }
 // Curled green spear-leaves punctuate individual lobe edges, avoiding oval tier repetition.
 for(let q=0;q<5;q++){let a=(q+.27)*TAU/5+seed*.45;
  let v=[Math.cos(a),0,Math.sin(a)],start=[p[0]+v[0]*rad[0]*.70,p[1]+rad[1]*(q%2?.22:-.06),p[2]+v[2]*rad[2]*.70];
  let end=add(start,[v[0]*rad[0]*.37,rad[1]*(q%2?.79:.54),v[2]*rad[2]*.39]);
  v28Frond(g,start,end,[v[0],.25,v[2]],1.25+(q%2)*.6,.92,[palette[3],palette[2],palette[0],palette[1]]);
 }
}
function v29Zoan(g){let c=V29.z;
 // Asymmetric gripping roots, living gnarled trunk with 3D bark and a broad open-crown silhouette.
 for(let j=0;j<11;j++){let a=(j+.08)*TAU/11,rr=15.7+j%4*1.15;
  v29lin(g,[[Math.cos(a)*1.4,9,Math.sin(a)*1.4],[Math.cos(a)*6,4.8,Math.sin(a)*6],[Math.cos(a)*rr*.81,1.9,Math.sin(a)*rr*.77],[Math.cos(a)*rr,.12,Math.sin(a)*rr*.95]], [4.5,3.1,1.6,.05],j%3?c.wood:c.lit,9);
 }
 v29lin(g,[[0,0,0],[2.4,13,-1],[-1.8,25,-3],[1.1,36,-1],[0.8,45,-3],[0,58,-3]], [10.8,9.7,7.8,6.6,4.6,.05],[c.shadow,c.wood,c.lit],13);
 // Bark seams wrap around the trunk and cross the rear as well as front.
 for(let j=0;j<9;j++){let a=j*TAU/9+.16,ps=[];for(let i=0;i<9;i++){let h=3+i*4.4,rad=10.3-i*.78,theta=a+i*.14;ps.push([Math.cos(theta)*rad,h,Math.sin(theta)*rad-.8]);}
  v29lin(g,ps,ps.map((_,i)=>.55*(1-i*.085)),j%3?c.lit:c.shadow,5);
 }
 // Guardian's animal muzzle: skull and cheeks are branches of the tree, not a decal.
 v29ball(g,[0,23,7.8],[6.0,6.1,4.3],[c.wood,c.lit,c.shadow],51);
 for(const s of [-1,1]){
  v29lin(g,[[s*2.5,27,6],[s*6.8,32,7.8],[s*10.2,37,9.2]],[2.5,1.5,.08],c.wood,9);
  v28Frond(g,[s*5.3,27.2,8],[s*9.7,34.9,9],[s*.15,.25,1],2.3,.65,[c.lit,c.wood,c.shadow,c.hi]);
  v29ball(g,[s*2.4,24,11.5],[.96,.81,.47],c.ivory,63+s);v29ball(g,[s*2.5,24,11.85],[.35,.43,.25],'#214638',64+s);
  v29lin(g,[[s*3.6,33,1],[s*7.9,43,2],[s*13,51,0],[s*17.9,58,-3],[s*18.5,62,-6]],[3.15,2.5,1.6,.72,.05],[c.lit,c.hi,c.ivory],10);
  for(let t=1;t<=3;t++){let p=[s*(4.9+t*3.4),40+t*4.8,1-t];v29lin(g,[p,add(p,[s*1.6,3.5,1.5]),add(p,[s*(3.4+t*.4),8.9,2.8])],[1.2,.73,.04],c.ivory,8)}
 }
 v29ball(g,[0,19.9,11.6],[2.9,1.85,1.1],[c.lit,c.hi],70);v29ball(g,[0,20.3,12.6],[1.23,.7,.41],c.shadow,71);
 v25Spiral(g,[0,12.5,9],3.15,c.ivory,1.68,.27);
 // Five unequal primary boughs build a radial crown with real negative gaps and rear branches.
 const limbs=[[-16.3,48,-16,9.4,8.7,10.4],[-18.5,42,15.7,10.8,8.2,9.9],[15.3,46,-16.5,10.4,9.1,10.6],[17.2,48,15.5,11.1,9.0,9.7],[-3.0,59,-13.2,12.0,10,12.1],[6.3,57,14.3,12.4,10.5,11.1],[3,67,0,9.0,8.6,9.7]];
 limbs.forEach((m,i)=>{let [x,y,z,rx,ry,rz]=m;
  v29lin(g,[[0,28,-1],[x*.26,35,z*.28],[x*.58,y-9,z*.62],[x,y-1,z]],[4.8,3.6,2.4,.15],i%3?c.wood:c.lit,9);
  const offset=(i*2)%4,cols=[c.green[offset],c.green[1+offset],c.green[Math.min(6,2+offset)],c.green[Math.min(6,3+offset)]];
  v29OrganicCrown(g,[x,y,z],[rx,ry,rz],cols,i+4);
  // Broad secondary leaf fronds overlap branch junctions, so the foliage appears grown, not stacked.
  for(let k=0;k<2;k++){let a=i*.82+k*1.8+1.2,dir=[Math.cos(a),.35,Math.sin(a)];
   v28Frond(g,[x*.72,y-4,z*.76],[x+dir[0]*rx*.65,y+dir[1]*ry*1.8,z+dir[2]*rz*.65],dir,1.7,1.2,[c.green[3],c.green[4],c.green[1],c.green[0]]);
  }
 });
}
function v29FlameMass(g,p,height,width,seed){
 // Fully closed multi-ring, puffed flame: horizontal cross-sections of actual width and depth.
 let N=11,M=11,rings=[];
 for(let j=0;j<=M;j++){let t=j/M,y=p[1]+height*t;
  let r=width*Math.pow(Math.max(0.001,Math.sin(Math.PI*(.04+t*.93))),.70)*(1-.40*t);
  let cx=p[0]+Math.sin(seed*1.7+t*4.3)*height*.135*t,cz=p[2]+Math.cos(seed*.9+t*5.1)*height*.105*t;
  let row=[];for(let i=0;i<N;i++){let a=i*TAU/N+seed*.2;row.push([cx+Math.cos(a)*r*(1+.2*Math.sin(a*3+t*7)),y+.27*Math.sin(a*3+seed)*Math.sin(Math.PI*t),cz+Math.sin(a)*r*.70]);}rings.push(row);
 }
 const col=V29.l.hot;
 for(let j=0;j<M;j++)for(let i=0;i<N;i++){let k=(i+1)%N;let palette=j<3?col[0]:j<6?col[1]:j<9?col[2]:col[3];
   g.quad(rings[j][i],rings[j][k],rings[j+1][k],rings[j+1][i],i%4===0?col[Math.min(4,Math.floor(j/2)+1)]:palette);
 }
 // Segmented inner gold lick follows the same volumetric fold and reconnects to the parent.
 let q=[p[0]-width*.26,p[1]+height*.16,p[2]+width*.50];
 v29lin(g,[q,[q[0]+.3,p[1]+height*.46,q[2]+.55],[q[0]+1.0,p[1]+height*.71,q[2]],[q[0]+1.9,p[1]+height*.82,q[2]-.4]],[.66,.52,.30,.04],col[4],7);
}
function v29StormMass(g,p,rad,seed){const c=V29.l;
 // True deep continuous storm front supported by the volcanic forks.
 const cols=[c.cloud[0],c.cloud[1],c.cloud[2],c.cloud[3]];
 v29OrganicCrown(g,p,rad,cols,seed);
 for(let j=0;j<4;j++){let a=j*TAU/4+.4+seed*.22,site=[p[0]+Math.cos(a)*rad[0]*.65,p[1]+(j%2?1.7:-1.1),p[2]+Math.sin(a)*rad[2]*.68];
  v29ball(g,site,[rad[0]*.42,rad[1]*.64,rad[2]*.42],[c.cloud[1],c.cloud[2],c.cloud[3]],seed*12+j);
 }
}
function v29Logia(g){const c=V29.l;
 for(let i=0;i<9;i++){let a=i*TAU/9+.12,r=15.2+i%3*1.2;v29lin(g,[[0,7,0],[Math.cos(a)*5.2,3.9,Math.sin(a)*5.2],[Math.cos(a)*r,0.15,Math.sin(a)*r]],[4.8,2.3,.04],c.stone,9)}
 // Three different physical volcanic arms; no detached fire props.
 v29lin(g,[[0,-.5,0],[0,12,-1.0],[-2,25,-1.3],[-4.2,39,-3.1],[-8,52,-5]],[11.2,9.4,7.8,6.3,.1],[c.wood,c.stone],13);
 for(let i=0;i<7;i++){let a=i*TAU/7,pts=[];for(let k=0;k<7;k++){let h=3+k*6.8,rad=10.1-k*.82;pts.push([Math.cos(a+k*.12)*rad,h,Math.sin(a+k*.12)*rad-1]);}v29lin(g,pts,[.67,.59,.46,.32,.18,.08,.03],i%3?c.hot[0]:c.hot[2],6)}
 const cloudArms=[[-15,43,-11,9,6.8,10.5],[-3,56,-15,10.3,7.0,9.2],[8,49,-12,9.3,7.3,9.0],[13,43,1,7.7,6.1,7.2]];
 cloudArms.forEach((m,i)=>{let[x,y,z,rx,ry,rz]=m;v29lin(g,[[0,29,-2],[x*.58,y-8,z*.57],[x,y,z]],[4.2,2.7,.06],c.stone,10);v29StormMass(g,[x,y,z],[rx,ry,rz],i+3)});
 const fireArms=[[11,33,10,17,5.0,.1],[17,45,6,20,6.3,1.4],[2,50,11.2,22,5.6,2.2],[9,40,-2.5,15,4.1,3.2]];
 fireArms.forEach((f,i)=>{let[x,y,z,h,w,s]=f;v29lin(g,[[0,25,-1],[x*.55,y-7,z*.64],[x,y,z]],[4.3,3.1,.05],c.stone,9);v29FlameMass(g,[x,y,z],h,w,s);
  if(i===1||i===2){v29FlameMass(g,[x-3,y+4,z+2],h*.68,w*.58,s+1.1);
   let root=[x-.9,y+h*.30,z+.75],fin=[x+(i===1?5:-5),y+h*.77,z+4];
   v28Frond(g,root,fin,[.2,.4,1],1.9,1.5,[c.hot[2],c.hot[3],c.hot[0],c.hot[1]]);}
 });
 // Electrical storm drawn as real forked sculptural paths rooted in the thunderhead.
 for(let j=0;j<4;j++){let p=[-17+j*6,40+j%2*4,-8+j%3*2];v29lin(g,[p,add(p,[1.3,-3.0,1]),add(p,[-1,-5.2,2.1]),add(p,[1,-8.4,3.4])],[.45,.36,.30,.04],c.hot[4],6)}
 // Water is a coiling helical shell intertwined THROUGH the volcano, not hovering above it.
 for(let k=0;k<2;k++){let pts=[];for(let i=0;i<=74;i++){let t=i/74,a=k*2.6+t*TAU*(k?1.15:1.44);pts.push([Math.cos(a)*(11.4-t*2),2+t*(k?39:49),Math.sin(a)*(10.9-t*2)]);}v27Sheet(g,pts,pts.map((_,i)=>(k?1.56:2.5)*(1-i/115)),c.ice[1],c.ice[0],.65);v29lin(g,pts,pts.map((_,i)=>(k?.21:.34)*(1-i/110)),c.ice[3],6)}
 // Fused, opposed crystalline roots anchor the sea-ice side, with the lava seams behind.
 for(let i=0;i<10;i++){let a=i*TAU/10+.1,r=11.5+i%3*1.2,p=[Math.cos(a)*r,.4,Math.sin(a)*r];
   shard(g,p,add(p,[Math.cos(a)*2,7+(i%4)*2.4,Math.sin(a)*1.8]),2.15,c.ice[i%3+1],7)}
 v25Spiral(g,[0,14.3,9],3.0,c.hot[4],1.7,.31);
}
function v29CupPetal(g,centre,axis,normal,size,colors,seed){
 // Five-dimensional cross-sections yield thick spoon-shaped swept petals, not polygon stars.
 const d=norm(axis),n=norm(normal),side=norm(cross(d,n));let rings=[],N=8;
 for(let i=0;i<=N;i++){let t=i/N;let centreline=add(add(centre,mul(d,size*t)),mul(n,size*(.09*Math.sin(t*Math.PI)+.26*t*t)));
  let width=size*.295*Math.pow(Math.sin(Math.PI*(t*.92+.03)),.78)*(1+.045*Math.sin(seed+t*TAU));
  let thickness=size*(.07+.07*(1-t))*Math.sin(Math.PI*(.12+t*.83));
  let row=[];for(let k=0;k<6;k++){let a=k*TAU/6;row.push(add(centreline,add(mul(side,Math.cos(a)*width),mul(n,Math.sin(a)*Math.max(.15,thickness)))))}rings.push(row);
 }
 for(let j=0;j<N;j++)for(let i=0;i<6;i++)g.quad(rings[j][i],rings[j][(i+1)%6],rings[j+1][(i+1)%6],rings[j+1][i],colors[(i+(j<4?0:1))%colors.length]);
 // Pale raised curled edge traces the physical petal rim.
 let sideR=[];for(let t=0;t<=8;t++){let idx=t,ring=rings[idx];sideR.push(ring[0])};
 v29lin(g,sideR,sideR.map((_,i)=>.06+.05*Math.sin(i/8*Math.PI)),colors[2],5);
}
function v29Bloom(g,p,r,normal,seed){let c=V29.p,n=norm(normal),axis=norm(cross(n,Math.abs(n[1])>.84?[1,0,0]:[0,1,0])),v=norm(cross(n,axis));
 // Inner cup + outer whorl are separately curled in world-space with a luminous seedpod.
 for(let layer=0;layer<2;layer++){let count=layer?6:8;
  for(let i=0;i<count;i++){let a=TAU*(i+.11+layer*.41)/count+seed*.16,rad=add(mul(axis,Math.cos(a)),mul(v,Math.sin(a)));
   let d=norm(add(rad,mul(n,layer?.68:.45))),q=add(p,mul(n,layer?r*.13:0)),s=r*(layer?.57:1.06)*(1+.07*Math.sin(i*2.3+seed));
   let cols=[c.rose[(i+seed)%4],c.rose[(i+seed+1)%4],c.rose[(i+seed+2)%5],c.rose[(i+seed+3)%5]];
   v29CupPetal(g,q,d,n,s,cols,seed+i);
  }
 }
 const head=add(p,mul(n,r*.54));v29ball(g,head,[r*.27,r*.27,r*.27],[c.gold,'#fff1bc','#ffe097'],seed+70);
 for(let i=0;i<6;i++){let a=TAU*i/6,subp=add(head,add(mul(axis,Math.cos(a)*r*.21),mul(v,Math.sin(a)*r*.21)));v29ball(g,add(subp,mul(n,r*.20)),[.42,.6,.43],i%2?'#fff0b1':'#ffc95d',seed*11+i)}
}
function v29Paramecia(g){const c=V29.p;
 for(let j=0;j<9;j++){let a=j*TAU/9,rr=16.5+j%3*1.1;v29lin(g,[[0,8,0],[Math.cos(a)*6,3.5,Math.sin(a)*6],[Math.cos(a)*rr,.14,Math.sin(a)*rr]],[4.1,2.8,.05],j%3?c.wood:c.bark,8)}
 // Three braided living trunks in the full X-Z volume, with rear branches exposed.
 for(let j=0;j<3;j++){let p=[],r=[];for(let k=0;k<=54;k++){let t=k/54,a=j*TAU/3+t*TAU*.96;p.push([Math.cos(a)*(6.5-2.6*t),t*55,Math.sin(a)*(7.2-2.9*t)]);r.push(5.5*(1-t*.87)+.12)}v29lin(g,p,r,[c.wood,c.bark,c.pink][j],10)}
 // Physically penetrating spatial portals, turned towards three different cameras.
 v28Portal(g,[-3.5,42,1.2],13.7,[.79,.20,.58],c.gold,2);
 v28Portal(g,[7.2,48,-2.3],11.5,[.14,.53,.83],c.mint,3);
 v28Portal(g,[-3,29,-4],9.1,[-.22,.75,.54],c.gold,4);
 // Cluster arrangement deliberately leaves multiple central gaps; each bloom has a different facing axis.
 const blooms=[
  {p:[-17.2,47,15.1],s:10.0,n:[-.55,.12,.80]}, {p:[16.7,50,12.5],s:9.5,n:[.74,.05,.69]},
  {p:[-12.2,60,-16.5],s:9.4,n:[-.49,.42,-.71]}, {p:[12.8,63,-16.8],s:9.3,n:[.60,.33,-.71]},
  {p:[1.2,70,1],s:10.1,n:[.13,.76,.52]}
 ];
 blooms.forEach((b,i)=>{let anchor=[0,23+i%2*4,0],back=add(b.p,mul(norm(b.n),-1.9));
  v29lin(g,[anchor,[b.p[0]*.35,b.p[1]-16,b.p[2]*.38],[b.p[0]*.77,b.p[1]-6,b.p[2]*.80],back,b.p],[5.2,3.8,2.3,1.1,.12],i%2?c.bark:c.wood,10);
  v29ball(g,back,[2.6,2.4,2.8],[c.wood,c.bark],i+33);v29Bloom(g,b.p,b.s,b.n,i+1);
 });
 for(let i=0;i<5;i++){let a=i*TAU/5+.3,p=[Math.cos(a)*15.5,31+i%3*5,Math.sin(a)*15.3];v29lin(g,[[0,25,0],[p[0]*.67,p[1]-4,p[2]*.62],p],[2.35,1.4,.09],c.wood,8);v29Bloom(g,p,3.1,[Math.cos(a),.25,Math.sin(a)],i+15)}
 // Golden helices follow the corkscrew body around the back and front.
 let path=[];for(let i=0;i<=78;i++){let t=i/78,a=.44+t*TAU*1.34;path.push([Math.cos(a)*11.7,5+t*45,Math.sin(a)*11.3])}
 v27Sheet(g,path,path.map((_,i)=>2.0*(1-i/170)),c.gold,'#c79347',.62);v29lin(g,path,path.map((_,i)=>.20*(1-i/140)),'#fff7c5',6);
 v25Spiral(g,[0,14,9],3.1,c.gold,1.64,.27);
}
function v29Island(ci){
 let g=v28Island(ci),colors=ci===0?['#59a93e','#c0e668']:ci===1?['#2b889f','#e6ffff']:['#bc7fb3','#ffe6d5'];
 // Shallow source pools and rock-side drips close the visible gap where three cascades cross the island rim.
 for(let j=0;j<3;j++){let [x,z]=[[-10.3,17.9],[11.4,17.6],[3.7,-19.7]][j],dir=Math.sign(z),pts=[];
  v29ball(g,[x,.48,z-dir*1.15],[3.3,.24,2.4],ci===1?['#2a9fc8','#b9faff']:ci===2?['#79d1d7','#b4fff4']:['#49bed4','#ccffff'],j+60);
  for(let k=0;k<=15;k++){let t=k/15;pts.push([x+(j===0?-1:1)*t*.9,.44-8.5*t,z+dir*(t*3.1)])}
  v27Sheet(g,pts,pts.map((_,i)=>1.5*(1-i/40)),ci===2?'#9ff8e1':'#73dce8','#1686a0',.29);
  v29lin(g,pts,pts.map((_,i)=>.15*(1-i/28)),'#e8ffff',5);
 }
 // Minimal class-specific rim strata details, preserving the established floating island shape.
 if(ci===0){for(let j=0;j<7;j++){let a=j*TAU/7,r=19.0,v=[Math.cos(a)*r,.6,Math.sin(a)*r*.79];v28Frond(g,v,add(v,[Math.cos(a)*1.3,2.0,Math.sin(a)*1.1]),[Math.cos(a),.1,Math.sin(a)],.63,.2,[colors[0],colors[1],'#277a45','#2b7838'])}}
 if(ci===1){for(let j=0;j<5;j++){let a=j*TAU/5,r=18.4,p=[Math.cos(a)*r,.3,Math.sin(a)*r*.82];shard(g,p,add(p,[Math.cos(a)*.6,3.6,Math.sin(a)*.6]),1.1,'#8be8ee',6)}}
 if(ci===2){for(let j=0;j<6;j++){let a=j*TAU/6,p=[Math.cos(a)*18.5,.3,Math.sin(a)*16];v29ball(g,p,[1.1,.6,1.2],colors,j+93)}}
 return g;
}
function makeTree29(ci){let g=new Mesh();[v29Zoan,v29Logia,v29Paramecia][ci](g);v25FamilyBoughs(g,ci);return g;}
