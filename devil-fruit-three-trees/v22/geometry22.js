/* V22 original replacement sculpture geometry. Deliberately large, flat-shaded
   macro facets, 2 different silhouettes per Devil Fruit class. All functions
   use the original lightweight WebGL Mesh/triangle kit. */
const SPIRIT22={
  zoan:{wood:'#ae662d',shade:'#7d431f',bright:'#e6a354',leaf:'#42b92c'},
  logia:{stone:'#44395f',dark:'#282541',storm:'#e3f6fb',water:'#24c9f2'},
  para:{wood:'#bd398c',deep:'#822a7c',pink:'#ff78c3',gold:'#ffd345'}
};
function branch22(g,pts,r,c){tube(g,pts,r,c,9)}
function gem22(g,p,s,color,segments=6){blob(g,p,s,color,Math.round(p[0]*11+p[1]*7+97),segments,4)}
function oval22(g,p,r,c){blob(g,p,r,c,42+Math.round(p[0]*3),10,5)}
function polyCrown22(g,p,rad,col0,col1,seed=1){
 // Massive, flattened canopy boulders with carved polygon tiles; no smooth spheres.
 const R=rng(14000+seed),n=11,spin=.12*seed;
 let layers=[[-.60,.56],[-.32,.94],[.03,1.05],[.40,.96],[.75,.58],[1.05,.18]];
 const rings=layers.map(([y,r],k)=>Array.from({length:n},(_,i)=>{let a=TAU*i/n+spin,rr=r*(1+.075*Math.sin(i*2.7+seed));return [p[0]+Math.cos(a)*rad[0]*rr,p[1]+y*rad[1],p[2]+Math.sin(a)*rad[2]*rr]}));
 for(let k=0;k<rings.length-1;k++)for(let i=0;i<n;i++){let j=(i+1)%n;
  let mid=(i+k*3)%7===0?col1:col0;
  g.quad(rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i],mid);
  if((i+k*3)%6===0){const a=rings[k+1][i],b=rings[k+1][j],c=mix(a,b,.38);g.tri(a,b,add(c,[0,rad[1]*.20,.04]),col1)}
 }
 for(let i=0;i<n;i++)g.tri(rings.at(-1)[i],rings.at(-1)[(i+1)%n],[p[0],p[1]+rad[1]*1.14,p[2]],i%3===0?col1:col0);
}
function feather22(g,start,end,w,color,facet){
 const tangent=norm(sub(end,start)),side=norm(cross(tangent,[0,0,1]));let center=mix(start,end,.51),height=.55;
 const u=add(center,mul(side,w)),v=sub(center,mul(side,w)),ridge=add(center,[0,height,.62]);
 g.tri(start,u,ridge,color);g.tri(start,ridge,v,facet);g.tri(ridge,u,end,color);g.tri(ridge,end,v,facet);
}
function splitLava22(g,p,phase=0){
 for(let j=0;j<4;j++){let a=phase+j*.62,base=add(p,[j*1.3-2.0,0,j%2*.6]);
 feather22(g,base,add(base,[Math.sin(a)*1.8,6.5+j%3*1.9,1.1]),1.45,j%2?'#ff6424':'#ffa62e','#fff17a')}
}
function frontRune22(g,p,scale,c){planeSpiral(g,p,scale,c,1.68,Math.max(.12,scale*.095),48);}
function angularBranches22(g,style,p,group){
 const colors=['#b46d30','#55476c','#b7398b'];const c=colors[style];
 // Connect family bunches to the actual structural bough, never an isolated UI icon.
 for(let k=0;k<groups[style].length;k++){
  let target=anchorFor(style,k),from=[target[0]*.12,11.5+(k%4)*2,target[2]*.08],middle=[target[0]*.62,target[1]+2.3,target[2]*.62-1.1];
  branch22(g,[from,middle,add(target,[0,3.9,0]),add(target,[0,2.1,0])],[1.85,1.35,.65,.18],c);
  feather22(g,add(target,[-1.25,3.0,-.5]),add(target,[1.3,3.9,-.3]),.78,['#b3df42','#9fe5fd','#ffc5de'][style],['#70b73c','#50cae2','#e479be'][style]);
 }
}
function chunkyRoots22(g,colors,spread=1){for(let i=0;i<8;i++){let a=TAU*i/8;branch22(g,[V(Math.cos(a)*1.6,4,Math.sin(a)*1.5),V(Math.cos(a)*6,1.0,Math.sin(a)*5.6),V(Math.cos(a)*13.2*spread,.22,Math.sin(a)*10.5*spread)],[3.15,1.95,.10],colors);}}
function barkInlay22(g,x,y,z,primary,bright){
 // Faceted bark seams follow the contours rather than drawing circles around a trunk.
 for(let i=0;i<4;i++){let dx=(i-1.5)*1.25;
  branch22(g,[[x+dx,y+i*.85,z],[x+dx-.36,y+1.6+i*.77,z+.13],[x+dx+.35,y+2.35+i*.77,z+.04]],[.18,.21,.09],i%2?primary:bright)}
}
function island22(ci){
 const g=new Mesh(),N=17,R=rng(22+ci);
 const rads=[18.6,18.8,18.0,16.1,13.1,8.1,0.05],heights=[0,-2,-5,-10.2,-15,-18.7,-22.5],rings=[];
 for(let k=0;k<rads.length;k++)rings.push(Array.from({length:N},(_,i)=>{let a=i*TAU/N,rad=rads[k]*(1+.095*Math.sin(i*1.84+ci)+.04*Math.cos(i*4.0));return [Math.cos(a)*rad,heights[k],Math.sin(a)*rad*.78]}));
 for(let j=0;j<N;j++){let k=(j+1)%N;
  g.tri([0,.34,0],rings[0][j],rings[0][k],j%2?'#7ed92b':'#a7e84b');
  for(let layer=0;layer<6;layer++)g.quad(rings[layer][j],rings[layer][k],rings[layer+1][k],rings[layer+1][j],
   layer===0?(j%3===0?'#72c631':'#369d35'):layer===1?(j%2?'#c29459':'#d4a672'):
   layer===2?(j%2?'#ac815f':'#bf926b'):layer===3?'#93706d':layer===4?'#6c536e':'#493858');
 }
 // Bushes and tiny faceted stepping stones, generic across all three types.
 for(let i=0;i<12;i++){let a=i*TAU/12,r=14.0+1.8*R();let p=[Math.cos(a)*r,.66,Math.sin(a)*r*.78];
  polyCrown22(g,p,[1.2,.55,1.15],i%2?'#30aa39':'#78cc30','#afe94a',i+51);
  if(i%4===0)gem22(g,[p[0]+.7,.22,p[2]+1.8],[.75,.55,.85],'#a6b6a7');
 }
 // Chibi waterfall ribbons with bends/steps and white foam fragments.
 for(let side of [-1,1]){
  const z=14.3;let x=side*8.5;
  for(let j=0;j<4;j++){
   let y0=.15-j*5.4,y1=.15-(j+1)*5.4,nx=x+side*(j%2===0?.8:-.5),zz=z+j*.85,znext=z+(j+1)*.85;
   for(let strip=0;strip<5;strip++){
    let q0=(strip/5-.5)*3.65,q1=((strip+1)/5-.5)*3.65;
    g.quad([x+q0,y0,zz],[x+q1,y0,zz],[nx+q1,y1,znext],[nx+q0,y1,znext],
    strip===0?'#b9faff':strip===2?'#f6ffff':strip%2?'#40d7f8':'#129bc4');
   }
   for(let f of [-1,1])gem22(g,[nx+f*1.8,y1+.4,znext],[.38,.52,.42],'#efffff',6);
   x=nx;
  }
  for(let i=0;i<7;i++)gem22(g,[x+(i-3)*.72,-21.3,z+4.3],[.52,.38,.53],i%2?'#d6ffff':'#62d5f6',6);
 }
 return g;
}
function beastMask22(g,wood='#c77b39'){
 polyCrown22(g,[0,15,5.7],[3.9,3.1,2.2],wood,'#eeac60',191);
 for(let side of [-1,1]){
  gem22(g,[side*1.8,16.1,7.35],[.85,.65,.37],'#ffe399',6);
  gem22(g,[side*1.83,16.18,7.74],[.27,.31,.14],'#1c3941',5);
  feather22(g,[side*3.05,15.2,6.7],[side*4.7,13.8,7.1],1.0,'#fff0bd','#efc785');
 }
 gem22(g,[0,14,8.16],[.86,.48,.31],'#ffd37a',6);
 gem22(g,[0,13.87,8.52],[.42,.27,.19],'#243344',5);
 frontRune22(g,[0,10.7,5.8],2.15,'#ffe09c');
}
function zoanBeast22(g){
 chunkyRoots22(g,'#ad632d',1.03);
 branch22(g,[[0,0,0],[-2.2,7,0],[1.6,15,0],[-1.4,23,0],[0,31,0]],[6.6,6.0,4.7,3.2,.45],'#ae662d');
 const angles=[-2.5,-1.72,-.87,.04,.83,1.75,2.59];
 for(let i=0;i<angles.length;i++){
  let a=angles[i],end=[Math.cos(a)*13.2,22+i%3*2.2,Math.sin(a)*9];
  branch22(g,[[0,13.5+i%3*1.5,0],[end[0]*.58,end[1]-4,end[2]*.55],end],[3.35,2.15,.2],'#b87430');
  polyCrown22(g,add(end,[0,4.1,0]),[6.8,4.8,5.8],i%3===0?'#159b45':i%3===1?'#7dd52c':'#37b52f',i%2?'#a8ed36':'#b9f64e',i);
 }
 polyCrown22(g,[0,32,-1],[10.6,5.4,8.6],'#61c923','#b6ee40',77);
 // Huge ivory antlers grow above foliage, branching outward with taper.
 for(let s of [-1,1]){
  branch22(g,[[s*3,20,2],[s*6.5,26,2.4],[s*11.5,32.5,2.9],[s*13.4,37,3],[s*11,41.5,3.3]],[2.6,2.1,1.5,.75,.04],'#ffe0a2');
  branch22(g,[[s*9.3,31,3],[s*13.3,34,3],[s*16,39,3.3]],[1.1,.75,.05],'#fff1c9');
  branch22(g,[[s*6.9,26.7,2.4],[s*7.2,32.2,2.6],[s*5.9,35.7,2.7]],[.9,.6,.05],'#fff0be');
 }
 beastMask22(g);barkInlay22(g,0,3.5,5.0,'#c78946','#f8b354');
 for(let i=0;i<8;i++){let a=i*2.399,p=[Math.cos(a)*10,28+i%4*1.6,Math.sin(a)*7];
  feather22(g,p,add(p,[Math.cos(a)*5,-4,Math.sin(a)*3]),1.7,i%2?'#9bea32':'#66c92d','#c7f45e');}
}
function zoanMyth22(g){
 chunkyRoots22(g,'#9c5e31',.93);
 branch22(g,[[0,0,0],[2.4,8,0],[-1.9,16,0],[1.4,25,0],[0,36,0]],[6.1,5.4,4.3,2.7,.2],'#ae743a');
 // Phoenix wings form a large negative-space silhouette, rather than antler clones.
 for(let s of [-1,1]){
  branch22(g,[[s*1.6,19,1],[s*7.5,26.5,3],[s*13.5,32.5,4],[s*18.4,32.6,3.7]],[2.4,1.6,.8,.02],'#ffdb91');
  for(let j=0;j<9;j++){
    let a=[s*(4.6+j*1.25),25.4+j*.57,3],b=[s*(9+j*1.15),24.8-j*.76,5];
    feather22(g,a,b,1.35,j%3===0?'#ff8345':j%3===1?'#fff3c6':'#feca65','#ffe5a3');
  }
 }
 for(let i=0;i<6;i++){let a=i*TAU/6,p=[Math.cos(a)*10,25+i%2*4,Math.sin(a)*7.5];
  branch22(g,[[0,15,0],[p[0]*.65,p[1]-4,p[2]*.65],p],[2.9,1.6,.12],'#9c653b');
  polyCrown22(g,add(p,[0,3,0]),[5.7,4.3,5.1],i%2?'#0a9457':'#64cf29',i%2?'#61d34a':'#b4ec3d',i+200);
 }
 polyCrown22(g,[0,36,-1.2],[7.8,4.6,6.0],'#7ce33d','#bdf36d',38);
 // Stylised crown crest and breast of mythic phoenix carved into living trunk.
 gem22(g,[0,24,5.4],[2.9,2.7,1.9],'#f4c073');
 for(let s of [-1,1])feather22(g,[s*.4,24,7],[s*2.9,25.2,7.2],1.5,'#ffe699','#ffb75c');
 gem22(g,[0,22.2,7.7],[.8,1.1,.45],'#ffc33c');
 frontRune22(g,[0,12,5.2],2.2,'#ffe0a7');
}
function cloudMass22(g,p,size,seed){polyCrown22(g,p,[size,size*.66,size*.83],seed%2?'#e7f9ff':'#bfdde9','#fffef5',seed)}
function naturalLightning22(g,at,scale){
 branch22(g,[at,add(at,[scale*.32,-scale*.52,.3]),add(at,[-scale*.20,-scale*.51,.7]),add(at,[scale*.05,-scale*1.3,1])],[scale*.16,scale*.11,scale*.12,.025],'#fff05b');
}
function waterVortex22(g,rad,height,phase=0,bright=false){
 let path=Array.from({length:48},(_,i)=>{let t=i/47,a=t*TAU*1.33+phase;return [Math.cos(a)*rad*(1+.08*t),5+height*t,Math.sin(a)*rad*(1+.08*t)]});
 branch22(g,path,path.map((_,i)=>(1-i/47*.25)*(bright?.34:1.25)),bright?'#b8faff':'#15bde6');
}
function logiaFusion22(g){
 chunkyRoots22(g,'#443957',1.04);
 branch22(g,[[0,0,0],[-2,8,0],[2.2,17,0],[-1.4,26,0],[0,35,0]],[6.8,6,4.9,3.1,.4],'#443957');
 // Strongly asymmetric branch crown: left ice-weather, right lava-fire.
 for(let i=0;i<4;i++){
  let left=[-6.5-i*2.1,28-(i%2)*3,0.5+(i%3)*1.5];
  branch22(g,[[0,17,0],[-6,23,.3],left],[3,2,.15],'#56617c');
  cloudMass22(g,add(left,[0,2,0]),6.3,i);
  naturalLightning22(g,add(left,[0,-.1,3.5]),3.6);
  let right=[6.8+i*2.25,27+i%2*2,0.2+(i%3)*1.5];
  branch22(g,[[0,17,0],[6,22,0],right],[2.8,1.7,.12],'#55405b');
  splitLava22(g,add(right,[0,1.5,1]),i*.3);
 }
 cloudMass22(g,[-4,35,0],8.6,38);splitLava22(g,[7,35,1],1.2);
 waterVortex22(g,7.1,23,.7);waterVortex22(g,7.3,23,.7,true);
 // Glowing magma cracks running *along* the basalt bark.
 for(let s of [-1,1])branch22(g,[[s*1.3,3,5.2],[s*2,9,5.6],[s*.6,14,5.1],[s*1.5,20,4.6]],[.35,.52,.31,.08],s>0?'#ff6d22':'#ffcb35');
 for(let j=0;j<9;j++){let a=j*TAU/9,q=[Math.cos(a)*9,.6,Math.sin(a)*9];gem22(g,q,[1.45,3.1+j%2*1.7,1.1],j%2?'#6ce4f7':'#aff7ff',5)}
 frontRune22(g,[0,11.2,5.7],2.2,'#f6bc66');
}
function logiaStorm22(g){
 chunkyRoots22(g,'#4c3861',.94);
 // Arching thunder cyclone with broad ring cloud bands, unlike confluence's side-by-side forces.
 branch22(g,[[0,0,0],[1.7,8,0],[-1.8,17,0],[2,26,0],[-.8,36,0]],[6.4,5.8,4.3,2.8,.22],'#49385e');
 for(let k=0;k<9;k++){let a=k*2.399,p=[Math.cos(a)*11,24+k%4*2.8,Math.sin(a)*9.4];
  branch22(g,[[0,15+k%3*2,0],[p[0]*.66,p[1]-5,p[2]*.52],p],[2.9,1.7,.14],'#54486b');
  cloudMass22(g,add(p,[0,1.2,0]),5.2,k+40);
  if(k%2===0)naturalLightning22(g,add(p,[0,-1.2,3.0]),4.8);
 }
 // White, cyan and bright magma cyclone ribbons cross storm trunk.
 waterVortex22(g,9.5,29,1.7);waterVortex22(g,9.7,29,1.7,true);
 for(let j=0;j<5;j++){let a=j*TAU/5;splitLava22(g,[Math.cos(a)*6,9+j*2.3,Math.sin(a)*6],.8)}
 for(let j=0;j<7;j++){let a=j*TAU/7,p=[Math.cos(a)*9,1.0,Math.sin(a)*9];gem22(g,p,[1.6,3.8+j%3,1.6],j%2?'#70e8ff':'#c1ffff',6)}
 frontRune22(g,[0,11.2,5.7],2.8,'#ffcf68');
}
function goldenRibbon22(g,p,r,height,phase,turns,col='#ffd347',thick=1.18){
 let path=Array.from({length:55},(_,i)=>{let t=i/54,a=phase+t*TAU*turns;return add(p,[Math.cos(a)*r*(1-.06*t),t*height,Math.sin(a)*r*(1-.06*t)])});
 branch22(g,path,path.map((_,i)=>thick*(1-.24*i/54)),col);
}
function paraPortal22(g){
 chunkyRoots22(g,'#a8318b',.93);
 // Two intertwining *separate* trunks. Gold portals physically pierce the canopy.
 for(let s of [-1,1])branch22(g,[[s*.8,0,0],[s*3.6,7,0],[s*1.5,15,0],[s*5.6,22,0],[s*3.1,33,0]],[4.0,3.0,2.8,1.7,.2],s<0?'#bd398f':'#dd4ca7');
 for(let j=0;j<6;j++){let a=TAU*j/6,p=[Math.cos(a)*11.6,24+(j%3)*3,Math.sin(a)*8];
  branch22(g,[[0,18,0],[p[0]*.68,p[1]-3,p[2]*.66],p],[3.5,2.1,.25],'#bc408f');
  polyCrown22(g,add(p,[0,3,0]),[6.5,4.4,5.4],j%2?'#ec63ac':'#fa87cd',j%2?'#ffb8df':'#ff9cd6',j+80);
 }
 polyCrown22(g,[0,36,-1.5],[8.5,4.6,7.0],'#ff6fbf','#ffc4ea',99);
 // Interwoven sky loops with unmistakable large-scale silhouette.
 for(let s of [-1,1]){
  let loop=Array.from({length:57},(_,i)=>{let t=i/56,a=t*TAU;return [s*4.2+Math.cos(a)*7,24.0+Math.sin(a)*7.6,1.0]});
  branch22(g,loop,loop.map(()=>.95),s===1?'#ffe171':'#94f1ff');
  let diamond=[s*4.2,24,2];gem22(g,diamond,[2.0,2.1,.7],'#ffe67e',5);
 }
 goldenRibbon22(g,[0,4,0],8.1,25,1.6,1.8,'#ffcb40',1.0);
 for(let j=0;j<12;j++){let a=j*TAU/12,q=[Math.cos(a)*12,10+j%4*4,Math.sin(a)*9];gem22(g,q,[1.12,1.3,1.05],j%2?'#a868e9':'#ffc268',6)}
 frontRune22(g,[0,10.6,5.8],2.2,'#fff09a');
}
function paraBloom22(g){
 chunkyRoots22(g,'#9c317f',.95);
 branch22(g,[[0,0,0],[-2.4,8,0],[2.7,17,0],[-2,26,0],[0,35,0]],[6.0,5.6,4.4,2.6,.3],'#bc368f');
 for(let j=0;j<7;j++){let a=j*2.399,p=[Math.cos(a)*10.6,22+j%3*3,Math.sin(a)*8.8];
  branch22(g,[[0,13+j%3*2,0],[p[0]*.6,p[1]-4,p[2]*.6],p],[3.1,1.65,.15],'#d44797');
  // Giant chibi cherry blossoms, five individual macro polygon petals each.
  for(let petal=0;petal<5;petal++){
   let ang=petal*TAU/5,r=3.8;
   feather22(g,add(p,[0,1.2,0]),add(p,[Math.cos(ang)*r,4.4,Math.sin(ang)*r]),2.7,
     petal%2?'#ffa2d5':'#fa78b9','#ffe2f1');
  }
  gem22(g,add(p,[0,2.1,0]),[1.3,1.2,1.2],'#ffcb4d',7);
  polyCrown22(g,add(p,[0,3.2,-2.7]),[5.3,3.3,3.9],j%2?'#f574b5':'#f592d2','#ffd0e8',j+80);
 }
 polyCrown22(g,[0,37,-2],[8,4.3,6.5],'#fe76c4','#ffd0e8',89);
 goldenRibbon22(g,[0,4,0],8.5,29,.5,1.35,'#ffd453',1.1);
 goldenRibbon22(g,[0,12,0],6.0,19,2.0,1.1,'#fff0ad',.43);
 frontRune22(g,[0,12.2,5.8],2.5,'#ffd27b');
}
function makeTree22(ci,variant=0){const g=new Mesh();
 if(ci===0)(variant===0?zoanBeast22:zoanMyth22)(g);
 else if(ci===1)(variant===0?logiaFusion22:logiaStorm22)(g);
 else (variant===0?paraPortal22:paraBloom22)(g);
 angularBranches22(g,ci,variant);
 return g;
}
function genericFruit22(ci,seed){
 const g=new Mesh(),color=[['#6ddc38','#18af62','#e7d848'],['#ef6a28','#12baef','#ffdd4c'],['#ff70b3','#8e6bdd','#f7ae4e']][ci][seed%3];
 const ratio=seed%5===0?[.75,1.05,.73]:seed%5===1?[.91,.83,.84]:[.81,.91,.77];
 blob(g,[0,0,0],ratio,color,seed,10,5);
 tube(g,[[0,.71,0],[.08,1.03,0],[.3,1.12,0]],[.13,.085,.03],'#75a739',6);
 feather22(g,[.08,1.01,0],[.56,1.15,-.04],.20,'#bdf45a','#45b844');
 planeSpiral(g,[0,.02,ratio[2]],.27,'#ffe79f',1.5,.05,20);
 return g;
}

/* The known-appearance set receives differentiated, stylised sculptures. These are
   explicitly design interpretations, not a claim of verified exact manga topology. */
function specialFruit22(d){
 const g=new Mesh(),n=d.name,id=d.id;
 const palette= /Nika/.test(n)?['#9f81e9','#d9baff','#fff1ff']:
 /Ope Ope/.test(n)?['#e64e89','#ff7daa','#ffd4e1']:
 /Mera Mera/.test(n)?['#ff7626','#ffb538','#ffe46b']:
 /Seiryu/.test(n)?['#00afcd','#41d8ed','#bcfff0']:
 /Mori Mori/.test(n)?['#27ad6e','#7ee46f','#dfff9a']:
 /Suna Suna/.test(n)?['#db9f42','#ffd784','#fff0c8']:
 /Yami Yami/.test(n)?['#583477','#a36cba','#dfc3f4']:
 /Doru Doru/.test(n)?['#e5e0bd','#fff2d1','#ffffff']:
 /Awa Awa/.test(n)?['#58bce0','#a5eaf9','#ffffff']:
 /Hana Hana/.test(n)?['#ed62ac','#ffb4d8','#fff7e2']:
 /Giraffe/.test(n)?['#e4a34a','#ffce67','#fff1b5']:
 /Bison/.test(n)?['#7b4b2f','#c28b5a','#ffe4ac']:
 /Baku Baku/.test(n)?['#c54466','#ed8192','#fff0bd']:
 /Mero Mero/.test(n)?['#e8659d','#ff9fc5','#ffdbf0']:
 /Kage Kage/.test(n)?['#6446a4','#a88cd4','#eee3ff']:
 /Yomi Yomi/.test(n)?['#cadce3','#edf5ff','#ffffff']:
 /Jiki Jiki/.test(n)?['#876fcb','#e9b8dd','#fff3a8']:
 /Mochi/.test(n)?['#e4d0a3','#fff1d4','#ffffff']:
 /Bara Bara/.test(n)?['#db4d56','#ff809a','#ffe0cc']:
 /Sube Sube/.test(n)?['#8b67c8','#be99f3','#fff2fc']:
 /Hito Hito/.test(n)?['#e75a70','#ffa6ad','#ffe9be']:
 /Neko Neko/.test(n)?['#e8a153','#ffd16c','#fff0a4']:
 ['#ae78df','#d5a4ec','#fff4d5'];
 let shape='oval';
 if(/Nika/.test(n))shape='nika';
 else if(/Ope Ope|Mero Mero/.test(n))shape='heart';
 else if(/Giraffe/.test(n))shape='cluster';
 else if(/Hana Hana/.test(n))shape='flower';
 else if(/Awa Awa/.test(n))shape='bubbles';
 else if(/Mera Mera/.test(n))shape='flame';
 else if(/Mori Mori/.test(n))shape='tree';
 else if(/Bara Bara|Baku Baku/.test(n))shape='pumpkin';
 else if(/Mochi/.test(n))shape='mochi';
 else if(/Seiryu/.test(n))shape='dragon';
 if(shape==='nika'){
  gem22(g,[0,-.06,0],[.64,.86,.63],palette[0],8);
  for(let i=0;i<12;i++){let a=i*2.39996,t=(i+.5)/12;gem22(g,[Math.cos(a)*(.38+.18*t),.68-1.38*t,Math.sin(a)*(.38+.18*t)],[.31,.35,.31],i%3===0?palette[1]:palette[0],7);}
  branch22(g,[[0,.87,0],[.22,1.31,0],[.63,1.33,0],[.75,1.02,0]],[.13,.12,.08,.035],'#4b9d4c');
 }else if(shape==='heart'){
  gem22(g,[-.42,.32,0],[.56,.66,.58],palette[0]);gem22(g,[.42,.32,0],[.56,.66,.58],palette[0]);
  const pp=[[-.95,.25,0],[-.78,-.3,0],[0,-1.28,0],[.78,-.3,0],[.95,.25,0]];
  for(let i=0;i<4;i++){g.tri(pp[i],pp[i+1],[0,.08,.57],palette[1]);g.tri([0,.08,-.57],pp[i+1],pp[i],palette[0]);}
 }else if(shape==='cluster'){
  for(let i=0;i<6;i++){let a=i*TAU/6;const path=Array.from({length:10},(_,j)=>{let t=j/9;return [Math.cos(a)*(.26+.48*t)+.23*Math.sin(Math.PI*t),1.12-2.1*t,Math.sin(a)*(.26+.48*t)]});
  branch22(g,path,path.map((_,j)=>.10+.23*Math.sin(Math.PI*j/9)),i%2?palette[0]:palette[1]);}
 }else if(shape==='flower'){
  for(let i=0;i<9;i++){let a=i*TAU/9;feather22(g,[0,.03,0],[Math.cos(a)*1.28,.05,Math.sin(a)*1.1],.47,i%2?palette[0]:palette[1],palette[2]);}
  gem22(g,[0,0,.5],[.44,.42,.45],'#ffd674');
 }else if(shape==='bubbles'){
  gem22(g,[0,0,0],[.76,.75,.68],palette[0]);for(let i=0;i<8;i++){let a=i*2.4;gem22(g,[Math.cos(a)*.65,Math.sin(a)*.61,Math.sin(a*1.4)*.42],[.32,.33,.3],i%2?palette[1]:palette[2]);}
 }else if(shape==='mochi'){
  gem22(g,[0,.32,0],[.95,.76,.83],palette[0]);gem22(g,[0,-.54,0],[.78,.52,.8],palette[1]);
 }else if(shape==='pumpkin'){
  for(let i=0;i<7;i++){let a=i*TAU/7;gem22(g,[Math.cos(a)*.31,0,Math.sin(a)*.28],[.63,.9,.58],i%2?palette[0]:palette[1]);}
 }else if(shape==='dragon'){
  gem22(g,[0,0,0],[.88,1.1,.79],palette[0]);for(let i=0;i<9;i++){let a=i*TAU/9;feather22(g,[Math.cos(a)*.55,.5,Math.sin(a)*.57],[Math.cos(a)*.9,1.25,Math.sin(a)*.76],.22,palette[1],palette[2]);}
 }else if(shape==='tree'){
  gem22(g,[0,-.2,0],[.88,.94,.82],palette[0]);for(let i=0;i<5;i++){let a=i*TAU/5;feather22(g,[0,.65,0],[Math.cos(a)*.9,1.4,Math.sin(a)*.6],.38,palette[1],palette[2]);}
 }else{
  let size=/Suna Suna/.test(n)?[.85,1.12,.84]:/Yami Yami/.test(n)?[1.0,.86,.92]:/Nika/.test(n)?[.91,1.01,.89]:[.88,1.04,.82];
  // Different crown/shoulder shapes even when the printed fruit's official details aren't available.
  blob(g,[0,0,0],size,palette[0],id,12,6);
 }
 if(/Bara Bara/.test(n)){for(let i=0;i<7;i++){let a=i*TAU/7;feather22(g,[Math.cos(a)*.3,.68,Math.sin(a)*.3],[Math.cos(a)*.55,1.5,Math.sin(a)*.55],.32,'#3ab55b','#8ce74a')}}
 if(shape==='flame'){
  // Fire is grown as flame ridges and curled leaves, not a crystal hat.
  for(let i=0;i<8;i++){let a=i*TAU/8;feather22(g,[Math.cos(a)*.5,.47,Math.sin(a)*.4],[Math.cos(a)*.68,1.47+Math.sin(i*2)*.18,Math.sin(a)*.68],.31,'#f66a24','#ffe45b');}
 }
 if(shape!=='flower'){
  for(let i=0;i<5;i++){let a=i*TAU/5,x=Math.cos(a)*.44,y=Math.sin(a)*.48;
   planeSpiral(g,[x,y,.81+.024*(i%2)],.17,palette[2],1.32,.05,22);
  }
  planeSpiral(g,[0,.04,.93],.33,palette[2],1.74,.072,31);
 }
 branch22(g,[[0,.86,0],[.06,1.23,0],[.38,1.35,.03]],[.16,.11,.04],'#5e9d4a');
 feather22(g,[0,1.12,0],[.62,1.31,-.14],.27,'#50b84c','#b2e75c');
 if(/Neko Neko|Bison/.test(n))for(let side of [-1,1])feather22(g,[side*.55,.65,.15],[side*.9,1.2,.15],.2,palette[1],palette[2]);
 if(/Jiki Jiki/.test(n))branch22(g,[[-.58,.05,.35],[-.65,-.45,.4],[.65,-.45,.4],[.55,.12,.4]],[.13,.13,.13,.13],'#ffe37f');
 return g;
}
function familyBranch22(ci){const g=new Mesh(),base=['#b47535','#524567','#c14591'][ci];
 branch22(g,[[-9.6,-3.3,0],[-4.7,-1.6,0],[0,0,0],[4.8,-1.3,0],[9.5,-3.3,0]],[.32,.91,1.25,.92,.28],base);
 for(let side of [-1,1]){
  feather22(g,[side*4.1,-1.5,0],[side*6.9,-.20,.5],1.2,['#8ee64b','#a8eeff','#ff9fce'][ci],['#c9f56d','#d6fdff','#ffc9df'][ci]);
  feather22(g,[side*5,-1.8,0],[side*7.4,-1.85,.8],.8,['#5ac747','#66cbf0','#e469a6'][ci],'#ffde8f');
 }
 return g;
}
