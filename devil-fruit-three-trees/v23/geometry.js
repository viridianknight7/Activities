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