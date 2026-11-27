/* V23 — six original macro-faceted spirit trees. Each sculpture is modelled from
   large sectional forms, sculpted silhouette accents and branch-root continuity.
   The rendering remains intentionally untextured, chibi, and performant. */
const P23={
 zo:['#a76633','#d99449','#f7d17c','#1e8740','#5fbe35','#a2eb42'],
 lo:['#352c51','#584d77','#e1f5ff','#00beee','#ff5d23','#ffe557'],
 pa:['#842567','#c53890','#ff80c0','#ffbee1','#ffe071','#a9f0ff']
};
function seq23(seed){return rng(seed*739+23)}
function line23(g,pts,r,c,side=9){tube(g,pts,r,c,side)}
function swell23(g,p,r,c,id=42){blob(g,p,r,c,id,11,5)}
function bigHorn23(g,points,r=2.2,col='#f7d59a'){
 line23(g,points,points.map((_,i)=>Math.max(.025,r*Math.pow(1-i/(points.length-1),1.2))),col,7);
 line23(g,points.map(p=>add(p,[0,.14,.17])),points.map((_,i)=>Math.max(.018,r*.09*(1-i/(points.length-1)))),'#fff0c4',5);
}
function bigLeaf23(g,start,end,width,col,highlight='#e1ff98'){
 // Two broad triangular planes and a central low-poly ridge, not thin pine needles.
 const tangent=norm(sub(end,start)),side=norm(cross(tangent,[0,0,1]));
 const m=mix(start,end,.49),ridge=add(m,[0,width*.30,.45]);
 const l=add(m,mul(side,width)),r=sub(m,mul(side,width));
 g.tri(start,l,ridge,col);g.tri(l,end,ridge,highlight);
 g.tri(start,ridge,r,col);g.tri(ridge,end,r,highlight);
 g.tri(l,r,end,col);
}
function halo23(g,c,r,ry,color='#ffe57a',thick=.6){
 const ps=Array.from({length:43},(_,j)=>{const a=TAU*j/42;return add(c,[Math.cos(a)*r,Math.sin(a)*ry,0])});
 line23(g,ps,ps.map(()=>thick),color,7);
}
function livingCrown23(g,p,r,light,dark,seed=0,petals=9){
 // Multi-tier canopy: large flattened facets, jagged natural edges, overlapping leaf fans.
 const R=seq23(seed),sides=11,levels=[[-.55,.56],[-.26,.98],[.06,1.16],[.33,.95],[.67,.60],[.93,.18]];
 const rings=levels.map(([h,rs],j)=>Array.from({length:sides},(_,i)=>{const a=TAU*i/sides+.11*seed;
  const radius=rs*(1+.085*Math.sin(i*2.9+seed));return add(p,[Math.cos(a)*r[0]*radius,h*r[1],Math.sin(a)*r[2]*radius]);}));
 for(let j=0;j<levels.length-1;j++)for(let k=0;k<sides;k++){const l=(k+1)%sides;g.quad(rings[j][k],rings[j][l],rings[j+1][l],rings[j+1][k],((k+j*2)%4===0)?light:dark)}
 for(let j=0;j<sides;j++)g.tri(rings.at(-1)[j],rings.at(-1)[(j+1)%sides],add(p,[0,r[1]*1.02,0]),j%2?light:dark);
 for(let i=0;i<petals;i++){const a=i*TAU/petals+.27*seed;
  let src=add(p,[Math.cos(a)*r[0]*.55,.08*r[1],Math.sin(a)*r[2]*.55]);
  let dst=add(p,[Math.cos(a)*r[0]*(1.25+(i%3)*.08),(-.02+(i%2)*.12)*r[1],Math.sin(a)*r[2]*1.22]);
  bigLeaf23(g,src,dst,r[1]*(.35+(i%2)*.07),i%2?dark:light,i%3===0?'#d7f27a':light);
 }
}
function crest23(g,c,sz,base,hi){
 // Inlaid rune with a readable macro-spiral; no texture maps or tiny text.
 let ring=Array.from({length:28},(_,i)=>{let t=i/27,a=t*TAU*1.58;return add(c,[Math.cos(a)*sz*(1-t*.88),Math.sin(a)*sz*(1-t*.88),.13])});
 line23(g,ring,ring.map((_,i)=>.17*(1-i/60)),hi,7);
 swell23(g,add(c,[0,0,-.18]),[sz*.84,sz*.84,.28],base,28);
}
function fruitBoughs23(g,ci){
 let c=['#9a602f','#584f72','#bb358c'][ci];
 for(let j=0;j<groups[ci].length;j++){
  const to=anchorFor(ci,j),a=[to[0]*.14,11.7+(j%3)*3,to[2]*.08],b=[to[0]*.57,to[1]+4.2,to[2]*.50],end=add(to,[0,2.55,0]);
  line23(g,[a,b,end],[2.5,1.48,.22],c,8);
  if(j%2===0)bigLeaf23(g,add(b,[0,.3,-.2]),add(b,[to[0]>=0?4:-4,1.7,-.7]),1.6,['#68c843','#b9ecf1','#fa80b9'][ci],['#b0ed51','#d3f4ff','#ffbadf'][ci]);
 }
}
function deepRoots23(g,wood,rootHi){
 for(let j=0;j<9;j++){const a=j*TAU/9;const o=[Math.cos(a),Math.sin(a)];
  line23(g,[[o[0]*2.3,6,o[1]*2],[o[0]*6,2.0,o[1]*5],[o[0]*12,.35,o[1]*10.6],[o[0]*14.5,-.4,o[1]*12]],[3.9,2.7,1.2,.09],j%3?wood:rootHi,9);
 }
}
function heroTrunk23(g,ci,alt=false){
 const wood=[P23.zo[0],P23.lo[0],P23.pa[1]][ci],hi=[P23.zo[1],P23.lo[1],P23.pa[2]][ci];
 const way=ci===0?[[0,0,0],[-2,8,0],[1,16,0],[-1.2,24,0],[0,32,0]]:ci===1?[[0,0,0],[2,8,0],[-1.5,16,0],[2,24,0],[0,32,0]]:[[0,0,0],[-3,8,0],[3,16,0],[-2,24,0],[0,32,0]];
 line23(g,way,[7.5,6.9,5.7,4.1,1.35],wood,11);
 line23(g,way.map(p=>add(p,[1.1,0,1.3])),[.52,.68,.51,.34,.08],hi,7);
 deepRoots23(g,wood,hi);
}
function beastFace23(g,variant=0){
 // Guardian face is carved in one massive continuous wood trunk.
 const dark='#633e2d',gold='#f6d898',wood='#b97238';
 swell23(g,[0,18,5.4],[5.0,4.4,2.3],wood,12);
 for(let s of [-1,1]){
  bigHorn23(g,[[s*3.1,20.5,6.3],[s*5.0,24.5,6.1],[s*5.4,28,6.0]],1.45,gold);
  swell23(g,[s*2.35,19.0,7.25],[1.0,.72,.35],'#fbe7a5',10);
  swell23(g,[s*2.35,19.07,7.63],[.39,.43,.20],'#18383c',11);
  bigHorn23(g,[[s*3.8,16.6,7.3],[s*4.2,14.2,7.4],[s*3.7,13.6,7.5]],1,gold);
 }
 swell23(g,[0,16.5,8.0],[1.55,1.15,.60],dark,22);
 swell23(g,[0,16.45,8.55],[.82,.49,.16],gold,25);
 bigHorn23(g,[[-2.4,14.6,7.2],[0,14.1,7.5],[2.4,14.6,7.2]],.30,gold);
 crest23(g,[0,10.2,6.5],2.05,'#9c5e32','#ffe0a3');
}
function zoanPrimal23(g){
 heroTrunk23(g,0);beastFace23(g);
 // Silhouette led by enormous organic tree antlers, growing out of the bark.
 for(let s of [-1,1]){
  bigHorn23(g,[[s*4,19,2],[s*8,26,2],[s*12,33,1],[s*14,40,0],[s*12,45,0]],2.65);
  bigHorn23(g,[[s*10,30,1],[s*15,34,1],[s*18,40,1]],1.4);
  bigHorn23(g,[[s*7,26,2],[s*8,34,2],[s*6.5,39,2]],1.15);
 }
 for(let i=0;i<7;i++){const a=i*2.39996,ctr=[Math.cos(a)*12.5,28+(i%3)*3,Math.sin(a)*8];
  line23(g,[[0,17,0],mul(ctr,.56),ctr],[3.4,2.4,.1],'#99582f',8);
  livingCrown23(g,add(ctr,[0,2.8,0]),[7.9,5.2,6.4],i%2?'#9be842':'#3caa37',i%2?'#5dba23':'#178447',i+2,7);
 }
 livingCrown23(g,[0,37,-2],[10,5.6,8],'#a3ed46','#4cae2f',22,11);
}
function zoanMythic23(g){
 heroTrunk23(g,0,true);beastFace23(g,1);
 for(let s of [-1,1]){
  // Truly wide guardian wings, with individual macro-feather facets.
  line23(g,[[s*2,19,2],[s*9,26,1],[s*15,30,1],[s*20,34,.3]],[2.5,1.6,1,.03],'#f3d88e');
  for(let j=0;j<9;j++){
   let base=[s*(7+j*1.18),26+j*.58,2.2],tip=[s*(9+j*1.35),19.0-j*.61,3.0];
   bigLeaf23(g,base,tip,1.45,j%3===0?'#ffe8b1':j%3===1?'#f9b45d':'#d88f48','#fff6c9');
  }
  bigHorn23(g,[[s*4,24,2],[s*9,30,2],[s*13,34,1]],1.8,'#ffdf9e');
 }
 for(let j=0;j<6;j++){const a=j*TAU/6;let p=[Math.cos(a)*12.5,29+j%2*3,Math.sin(a)*8];
  line23(g,[[0,17,0],[p[0]*.63,p[1]-4,p[2]*.5],p],[3.2,2,.1],'#a06a35');
  livingCrown23(g,add(p,[0,3,0]),[6.7,4.7,5.3],j%2?'#b9f452':'#49bf3a',j%2?'#6bbb27':'#178a4e',101+j,7);
 }
 livingCrown23(g,[0,39,-1],[8.6,5,7.3],'#a3e948','#2d9d40',56,8);
 halo23(g,[0,25,0],7.2,7.2,'#f9d772',.56);
 // Mythical animal spirit rises out of its own canopy.
 for(let s of [-1,1])bigLeaf23(g,[s*1,40,1],[s*4.5,46,1.4],2.2,'#ffc773','#fff1b8');
}
function facetFlame23(g,p,h=7,r=3.4){
 // Fat flame-tongues are plump polygons with inset colour ridges, not diamonds.
 const pal=['#e44326','#ff7625','#ffb32b','#ffe66b'];
 for(let k=0;k<4;k++){
  let a=k*TAU/4;const base=add(p,[Math.cos(a)*r*.6,-.2,Math.sin(a)*r*.6]);
  bigLeaf23(g,base,add(base,[Math.sin(a)*r*.5,h*(.8+k*.08),Math.cos(a)*r*.5]),r*(.52-k*.035),pal[k],pal[(k+1)%4]);
 }
 swell23(g,add(p,[0,1.4,0]),[r*.8,2.5,r*.75],'#ff6d25',88);
}
function cloud23(g,p,r=7,k=0){
 const pale=['#e9f8fd','#b5d9e8','#f8ffff','#9cbacd'];
 for(let i=0;i<4;i++){let off=(i-1.5)*r*.52;
  swell23(g,add(p,[off,Math.sin(i*2)*r*.13,i%2*.35]),[r*.58,r*.46,r*.52],pale[(i+k)%4],k*21+i);
 }
}
function bolt23(g,p,scale=5){const path=[p,add(p,[scale*.16,-scale*.4,.6]),add(p,[-scale*.18,-scale*.55,.7]),add(p,[scale*.03,-scale*1.07,.6])];line23(g,path,[.75,.56,.42,.05],'#ffe75f',5)}
function elementalCurrents23(g,phase=0,r=6.8,y=4,h=27){
 const pts=Array.from({length:58},(_,i)=>{const t=i/57,a=phase+TAU*t*1.43;
  return [Math.cos(a)*r*(1-t*.08),y+t*h,Math.sin(a)*r*(1-t*.08)]});
 line23(g,pts,pts.map((_,i)=>1.33-(i/57)*.38),'#04b9e6',7);
 line23(g,pts.map(p=>add(p,[0,.18,.48])),pts.map(()=>.28),'#b1f4ff',5);
}
function elementalCore23(g,spiralPhase=0){
 // Divided core with basalt, lava fissures and glacial water on continuous bark.
 heroTrunk23(g,1);elementalCurrents23(g,spiralPhase);
 for(let s of [-1,1]){
  line23(g,[[s*.8,3,6.8],[s*2.6,8,6.6],[s*.9,13.2,5.4],[s*2.4,19,4.4]],[.58,.75,.58,.10],s===1?'#ff7b29':'#ffda49',7);
 }
 for(let i=0;i<7;i++){let a=i*TAU/7;shard(g,[Math.cos(a)*8,0.4,Math.sin(a)*8],[Math.cos(a)*9.5,4+i%3*3,Math.sin(a)*9.5],1.25,i%2?'#8bebff':'#35bce8',6)}
 crest23(g,[0,9,7],2.2,'#3b3361','#ffcc75');
}
function logiaConfluence23(g){
 elementalCore23(g,.35);
 for(let j=0;j<4;j++){
  let left=[-8-j*1.7,29-j%2*3,Math.sin(j*1.3)*2],right=[9+j*1.55,29+(j%2)*2,Math.sin(j*2)*2];
  line23(g,[[0,19,0],[left[0]*.6,24,left[2]*.6],left],[3,1.8,.12],'#555070');
  cloud23(g,add(left,[0,2,0]),5.8,j);bolt23(g,add(left,[0,-2,3]),3.3);
  line23(g,[[0,18,0],[right[0]*.6,24,right[2]*.6],right],[3,2,.15],'#62415d');
  facetFlame23(g,add(right,[0,2.3,0]),6.2+j%2,2.5);
 }
 // A single water arch forms the middle connective tissue.
 line23(g,[[-10,25,0],[-7,19,3],[-2,15,4],[3,10,4],[8,1,3]],[1.8,1.6,1.4,1.2,.15],'#23bce9');
 for(let i=0;i<6;i++)bolt23(g,[-5-i*.9,25-(i%3)*2,4],2.5);
}
function logiaTempest23(g){
 elementalCore23(g,1.5);
 for(let j=0;j<9;j++){
  const a=j*2.399,ctr=[Math.cos(a)*10,28+j%4*2.0,Math.sin(a)*9];
  line23(g,[[0,19,0],[ctr[0]*.61,ctr[1]-4,ctr[2]*.63],ctr],[2.6,1.6,.1],'#504264');
  cloud23(g,add(ctr,[0,1.4,0]),4.6,j);
  if(j%2===0)bolt23(g,add(ctr,[0,-1.8,3]),4.7);
 }
 // A different silhouette from B1: two long rising storm streamers and central lightning crest.
 for(let s of [-1,1]){
  const ps=Array.from({length:30},(_,i)=>{let t=i/29;return [s*(9+3*Math.sin(t*TAU)),6+t*33,Math.cos(t*TAU*1.4)*7]});
  line23(g,ps,ps.map(()=>.55),s===1?'#9dedff':'#ffffff',7);
  facetFlame23(g,[s*6,17,3],6.2,2.2);
 }
 bolt23(g,[0,41,2],9);
}
function facetedFlower23(g,p,scale=4.3){
 for(let j=0;j<7;j++){
  let a=j*TAU/7;bigLeaf23(g,add(p,[0,0,.7]),add(p,[Math.cos(a)*scale,Math.sin(a)*scale*.7,Math.sin(a)*scale*.44+1.1]),scale*.45,j%2?'#f36fac':'#ff99cc','#ffe0f3');
 }
 swell23(g,add(p,[0,0,1.6]),[scale*.27,scale*.28,scale*.17],'#ffd765',17);
}
function impossibleTrunk23(g){
 deepRoots23(g,'#b63088','#ed6db5');
 for(let s of [-1,1]){
  line23(g,[[s*.4,0,0],[s*3.6,8,0],[s*.8,17,0],[s*4,26,0],[s*2.3,35,0]],[4.7,4.2,3.3,2.2,.45],s<0?'#b53085':'#d3479b',10);
 }
 crest23(g,[0,8,5.6],2.3,'#ab327e','#ffdc6b');
}
function elasticLoop23(g,center,r,light='#ffe171',thick=1.1,z=.2){
 let pts=Array.from({length:55},(_,i)=>{let a=i*TAU/54;return add(center,[Math.cos(a)*r,Math.sin(a)*r*.81,z])});
 line23(g,pts,pts.map(()=>thick),light,9);
}
function paraNexus23(g){
 impossibleTrunk23(g);
 for(let j=0;j<7;j++){const a=j*2.399,p=[Math.cos(a)*13,27+j%3*3,Math.sin(a)*9];
  line23(g,[[0,16,0],[p[0]*.65,p[1]-5,p[2]*.6],p],[3,2,.16],'#bb3589');
  livingCrown23(g,add(p,[0,3,0]),[7.4,4.8,5.3],j%2?'#ff9bd2':'#ff72be',j%2?'#da4d98':'#c03a8a',j+80,5);
 }
 livingCrown23(g,[0,39,-2],[8.2,5.4,6.9],'#ff9bd3','#cf4093',90,7);
 elasticLoop23(g,[-4,26,3],8.2,'#ffda62',1.2);
 elasticLoop23(g,[8,22,-1],6.9,'#bff5ff',.82);
 let pts=Array.from({length:57},(_,i)=>{let t=i/56,a=t*TAU*1.6;return [Math.cos(a)*8.3,5+27*t,Math.sin(a)*8.1]});
 line23(g,pts,pts.map(()=>1.3),'#ffcc42');
 for(let i=0;i<12;i++){let a=i*TAU/12,p=[Math.cos(a)*13,8+i%4*3,Math.sin(a)*11];swell23(g,p,[1.4,1.6,1.2],i%2?'#9a6be6':'#ffd173',50+i)}
}
function paraBloom23(g){
 impossibleTrunk23(g);
 for(let j=0;j<8;j++){let a=j*2.399,p=[Math.cos(a)*11.5,27+j%3*2.8,Math.sin(a)*8.2];
  line23(g,[[0,15,0],[p[0]*.6,p[1]-5,p[2]*.6],p],[3.0,1.8,.15],'#c04096');
  facetedFlower23(g,add(p,[0,2.6,0]),3.9+j%2*1.0);
  livingCrown23(g,add(p,[0,1.3,-3.3]),[4.8,2.8,3.1],'#ff97cb','#d94b9e',30+j,4);
 }
 facetedFlower23(g,[0,40,0],7.0);
 let ps=Array.from({length:42},(_,i)=>{let t=i/41,a=t*TAU*1.4;return [Math.cos(a)*8.7,3+t*31,Math.sin(a)*8]});
 line23(g,ps,ps.map(()=>1.22),'#ffe269');
 for(let j=0;j<5;j++)elasticLoop23(g,[Math.cos(j*2.2)*6.8,26+j%3*2,0],2.2,'#ffe4a1',.32);
}
function makeTree23(ci,variant){let g=new Mesh();
 if(ci===0)(variant===0?zoanPrimal23:zoanMythic23)(g);
 else if(ci===1)(variant===0?logiaConfluence23:logiaTempest23)(g);
 else (variant===0?paraNexus23:paraBloom23)(g);
 fruitBoughs23(g,ci);return g;
}
function island23(ci){
 const g=new Mesh(),N=17, R=seq23(ci+25),radius=[18.5,19.2,18.7],base=radius[ci],radii=[base,base*1.05,base*.96,base*.86,base*.69,base*.44,.06],h=[-.2,-2.2,-5,-9.8,-15.8,-21,-24.0],rings=[];
 for(let y=0;y<radii.length;y++){
  rings.push(Array.from({length:N},(_,i)=>{let a=i*TAU/N;let rad=radii[y]*(1+.075*Math.sin(i*3.3+ci)+.055*Math.sin(i*7+2));return [Math.cos(a)*rad,h[y]+(y<3?.25*Math.sin(i*4.3):0),Math.sin(a)*rad*.83]}));
 }
 for(let i=0;i<N;i++){let j=(i+1)%N;g.tri([0,.35,0],rings[0][i],rings[0][j],i%4===0?'#9ae838':'#63c92a');for(let k=0;k<6;k++)g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],[['#2f9c30','#55b92b'],['#aa7a50','#d2a16c'],['#8b6c54','#ad855e'],['#665567','#876d65'],['#59485e','#614f61'],['#403b57','#4e405b']][k][i%2]);}
 // Each waterfall is a stepped, broad cloth-like ribbon, with visible white foamy seams.
 for(let side of [-1,1]){
  let origin=[side*9.1,-.1,14.7],segments=8;
  for(let j=0;j<segments;j++){
   let t=j/segments,tt=(j+1)/segments,y0=origin[1]-t*25,y1=origin[1]-tt*25,
    x=origin[0]+side*(t*1.8+.6*Math.sin(t*10)),xx=origin[0]+side*(tt*1.8+.6*Math.sin(tt*10)),z=origin[2]+t*5,zz=origin[2]+tt*5;
   for(let k=0;k<7;k++){
    let left=(k/7-.5)*2.8,right=((k+1)/7-.5)*2.8;
    g.quad([x+left,y0,z],[x+right,y0,z],[xx+right,y1,zz],[xx+left,y1,zz],k===0?'#bdfbff':k===4?'#e7ffff':k%2?'#20bce7':'#088abd');
   }
   if(j%2===0)for(let q of [-1,1])swell23(g,[xx+q*1.35,y1+.15,zz+.2],[.3,.4,.28],'#dcffff',j*4+q);
  }
  for(let j=0;j<8;j++)swell23(g,[origin[0]+side*1.5+(j-4)*.57,-24.1,20.0],[.48,.3,.46],j%2?'#93edff':'#e3ffff',j);
 }
 for(let k=0;k<15;k++){let a=k*TAU/15,dist=12.7+(k%3)*1.7;
  let p=[Math.cos(a)*dist,.45,Math.sin(a)*dist*.8];livingCrown23(g,p,[1.4,.6,1.2],k%2?'#51bd32':'#8cda3a','#2b9c35',k,2);
 }
 return g;
}
function genericFruit23(ci,seed){
 // At family scale all fruits deliberately read as one family of stylised objects.
 const g=new Mesh(),s=seed%5,palette=[['#75e443','#168e5e','#e6cd4f'],['#f5752e','#18bce0','#ffe25c'],['#ff7ac9','#9968d9','#ffbd63']][ci];
 blob(g,[0,0,0],s===0?[.77,1.12,.7]:s===1?[.92,.83,.83]:[.81,.94,.77],palette[seed%3],seed,10,5);
 line23(g,[[0,.75,0],[.09,1.04,0],[.3,1.13,0]],[.15,.08,.025],'#598c37',5);
 planeSpiral(g,[0,.02,.75],.28,'#ffe6a3',1.55,.05,18);
 return g;
}
function specialFruit23(d){
 // Published appearance is drawn with distinct in-verse-inspired stylisation; where
 // appearance is unverified the caller never enters this function.
 const g=specialFruit22(d);return g;
}
function familyBranch23(ci){
 const g=new Mesh(),wood=['#a4622c','#524969','#b43887'][ci];
 line23(g,[[-11,-2.5,0],[-8,-.6,0],[-4,1.0,0],[0,1.8,0],[4,1,0],[8,-.6,0],[11,-2.5,0]],[.2,.65,1.05,1.45,1.05,.65,.2],wood,8);
 for(let k=-2;k<=2;k++){
  let x=k*4.0,y=1.7-Math.abs(k)*.68;
  line23(g,[[x,y,0],[x*.99,y-1.0,.04],[x,y-2.3,.04]],[.13,.09,.02],ci===0?'#ca9350':ci===1?'#9ca7bd':'#f18daf',5);
  if(Math.abs(k)!==2)bigLeaf23(g,[x,y,.02],[x+(k%2?2.1:-2.1),y+.8,-.4],1.10,['#83d349','#b5eeef','#ff9ed3'][ci],['#b5eb63','#e0ffff','#ffd2e6'][ci]);
 }
 return g;
}