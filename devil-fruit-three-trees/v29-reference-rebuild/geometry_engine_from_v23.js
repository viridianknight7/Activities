/* Devil Fruit World - original self contained geometric modelling toolkit. */
const TAU=Math.PI*2;
const V=(x=0,y=0,z=0)=>[x,y,z];
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,n)=>[a[0]*n,a[1]*n,a[2]*n];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>{const l=Math.hypot(...a)||1;return mul(a,1/l)};
const lerp=(a,b,t)=>a+(b-a)*t;
const mix=(a,b,t)=>a.map((n,i)=>lerp(n,b[i],t));
const C=h=>{const x=parseInt(h.replace('#',''),16);return [((x>>16)&255)/255,((x>>8)&255)/255,(x&255)/255]};
const shades=(h,f=1)=>C(h).map(x=>Math.min(1,x*f));
function rng(seed){let x=seed>>>0;return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296}}
class Mesh {
 constructor(){this.a=[];this.vbo=null;this.n=0}
 tri(a,b,c,col){const n=norm(cross(sub(b,a),sub(c,a)));const color=Array.isArray(col)?col:C(col);for(let p of [a,b,c])this.a.push(...p,...n,...color)}
 quad(a,b,c,d,col){this.tri(a,b,c,col);this.tri(a,c,d,col)}
 append(other,at=V(),scale=1){for(let i=0;i<other.a.length;i+=9){let o=other.a.slice(i,i+9);o[0]=o[0]*scale+at[0];o[1]=o[1]*scale+at[1];o[2]=o[2]*scale+at[2];this.a.push(...o)}}
 upload(gl){if(this.vbo)return;this.vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.a),gl.STATIC_DRAW);this.n=this.a.length/9;this.a.length=0}
}
function tube(g,pts,rad,color,sides=8){const cols=Array.isArray(color)?color:[color];const rings=[];
 for(let i=0;i<pts.length;i++){const tangent=norm(sub(pts[Math.min(pts.length-1,i+1)],pts[Math.max(0,i-1)]));let u=norm(cross(tangent,[0,0,1]));if(Math.hypot(...u)<.01)u=[1,0,0];const w=norm(cross(tangent,u));let r=Array.isArray(rad)?rad[Math.min(i,rad.length-1)]:rad;
 rings.push(Array.from({length:sides},(_,j)=>{const a=j*TAU/sides;return add(pts[i],add(mul(u,Math.cos(a)*r),mul(w,Math.sin(a)*r)))}));}
 for(let i=0;i<rings.length-1;i++)for(let j=0;j<sides;j++)g.quad(rings[i][j],rings[i][(j+1)%sides],rings[i+1][(j+1)%sides],rings[i+1][j],cols[i%cols.length]);
 const top=pts[pts.length-1];for(let j=0;j<sides;j++)g.tri(top,rings.at(-1)[j],rings.at(-1)[(j+1)%sides],cols.at(-1));
}
function blob(g,p,r,color,seed=1,segments=9,lat=5){const R=rng(seed),verts=[];let col=Array.isArray(color)?color:[color];for(let j=0;j<=lat;j++){let t=j*Math.PI/lat,ring=[];for(let k=0;k<segments;k++){let a=k*TAU/segments,sc=1+.045*(R()-.5);ring.push(add(p,[Math.sin(t)*Math.cos(a)*r[0]*sc,Math.cos(t)*r[1],Math.sin(t)*Math.sin(a)*r[2]*sc]))}verts.push(ring)}for(let j=0;j<lat;j++)for(let k=0;k<segments;k++)g.quad(verts[j][k],verts[j][(k+1)%segments],verts[j+1][(k+1)%segments],verts[j+1][k],col[Math.floor(j/2)%col.length]);}
function leaf(g,a,b,w,col,mid){const t=norm(sub(b,a)),side=norm(cross(t,[0,0,1]));const c=mix(a,b,.50),u=add(c,mul(side,w)),v=sub(c,mul(side,w));g.tri(a,u,b,col);g.tri(a,b,v,col);if(mid){g.tri(a,add(c,[0,w*.12,.06]),u,mid);g.tri(a,v,add(c,[0,w*.12,.06]),mid)}}
function shard(g,foot,tip,rad,col,sides=6){const mid=mix(foot,tip,.64);tube(g,[foot,mid,tip],[rad,rad*.7,.015],[col],sides)}
function arc(g,start,end,rise,rad,col,count=11){const pts=[];for(let i=0;i<=count;i++){let t=i/count;pts.push(add(mix(start,end,t),[0,Math.sin(t*Math.PI)*rise,0]))}tube(g,pts,pts.map((_,i)=>Math.max(.06,rad*Math.pow(1-i/pts.length,.83))),col,8)}
function torus(g,p,rx,rz,y,rad,col,start=0,turns=1,steps=65){let ps=Array.from({length:steps+1},(_,i)=>{const t=i/steps,a=start+t*TAU*turns;return add(p,[Math.cos(a)*rx,y(t),Math.sin(a)*rz])});tube(g,ps,ps.map(()=>rad),col,7)}

/* Anonymous silhouette shown when the source has no verified physical appearance. */
function sealedFruit(seed=0){const g=new Mesh();blob(g,[0,0,0],[.72,.87,.68],['#080f1e','#161b2c'],seed,10,6);tube(g,[[0,.74,0],[.15,1.1,.03]],[.12,.04],'#3a3c46',6);
 for(let s of [-1,1]){for(let k=0;k<8;k++){let t=(k+.5)/8,y=lerp(-.56,.56,t),x=s*y*.72,z=.68*Math.sqrt(Math.max(.12,1-y*y/.78-x*x/1.1));const p=[x,y,z+.07],a=[];for(let j=0;j<=10;j++){let th=j*TAU/10;a.push(add(p,[Math.cos(th)*.14,Math.sin(th)*.085,0]))}tube(g,a,a.map(()=>.031),'#bcb39f',5)}}
 // simple golden lock, shackle and keyhole in 3D, visible on black frontal body
 const z=.88;g.quad([-.25,-.41,z],[.25,-.41,z],[.25,-.04,z],[-.25,-.04,z],'#eec75c');tube(g,[[-.15,-.05,z],[ -.15,.16,z],[.15,.16,z],[.15,-.05,z]],[.05,.05,.05,.05],'#ffe8ac',6);shard(g,[0,-.19,z+.025],[0,-.32,z+.02],.055,'#1b2940',5);return g}

/* Flat spiral relief shared by every illustrated fruit and tree. */
function planeSpiral(g,origin,rad,col,turns=1.6,line=.095,steps=42){
 const pp=[];for(let i=0;i<=steps;i++){let t=i/steps,ang=turns*TAU*t+.25;pp.push(add(origin,[Math.cos(ang)*rad*(1-t*.92),Math.sin(ang)*rad*(1-t*.92),.14+.035*Math.sin(ang)]));}
 tube(g,pp,line,col,6);
}

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

