/* littlehill · page change (r16 · 29 Oct · Dell: "jerky on the phone · the backdrop is just a colour and a few stars")
   Same idea Dell picked (C lantern + D station board), rebuilt so the phone only moves pictures, never repaints them:
   · tap a link → the night blooms OUT of the lamp you tapped (one round layer that only grows — transform, GPU)
   · while it is dark: the far hill, a few slow-twinkling stars, the gold line and the lamp you tapped
   · if the next page takes longer than 0.4 s its name glows in the middle (NEXT STOP · TIMETABLE · home = "littlehill")
   · r17 (Dell: the night shrinking back into the lamp pulled the eye): the next page now opens OUTWARD from that same lamp,
     the same direction the night spread — a growing circle cut in the page itself (clip-path), the night is just behind it
   · the sky is tinted toward the page you are going to, so the last frame already matches it
   pages that draw from data call lhReady(); others open on DOMContentLoaded; never longer than 1.4 s.
   reduced motion → a plain short fade. */
(function(){var H=document.documentElement,up=false,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var TINT={home:'#2f2550',traveller:'#3a2c5e',travellers:'#3a2c5e',timetable:'#161c44',auction:'#262a58',rules:'#3a2c5e',delivery:'#1a2040'};
var st=document.createElement('style');st.textContent='@keyframes lhhere{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(245,154,62,0)}35%{transform:scale(1.1);box-shadow:0 0 0 6px rgba(245,154,62,.22)}100%{transform:scale(1);box-shadow:0 0 0 12px rgba(245,154,62,0)}}.lh-here{animation:lhhere .55s cubic-bezier(.35,0,.25,1);border-radius:50%}'+
'html{background:#0b1028}@media (pointer:coarse){html{scrollbar-gutter:stable}}a,button{-webkit-tap-highlight-color:transparent}'+
/* the night: one round layer centred on the lamp; it only scales */
'#lhv{position:fixed;left:0;top:0;width:var(--d,200vmax);height:var(--d,200vmax);border-radius:50%;z-index:2147483000;pointer-events:none;visibility:hidden;will-change:transform;backface-visibility:hidden;'+
' transform:translate3d(calc(var(--x,50vw) - 50%),calc(var(--y,92vh) - 50%),0) scale(.002);'+
' background:radial-gradient(circle at 50% 50%,rgba(255,196,120,.16) 0,rgba(255,196,120,0) 9%),radial-gradient(120% 70% at 50% 0%,var(--tint,#2f2550) 0,#141a3e 45%,#0b1028 75%)}'+
'#lhv.warm{visibility:visible;opacity:.001}#lhv.on{visibility:visible;opacity:1}#lhv.full{transform:translate3d(calc(var(--x) - 50%),calc(var(--y) - 50%),0) scale(1)}'+
'#lhv.grow{transition:transform .42s cubic-bezier(.55,.05,.35,1)}#lhv.shrink{transition:transform .58s cubic-bezier(.45,0,.2,1)}'+
/* what you see while it is dark (not scaled): hill, stars, gold line, lamp, station board */
'#lhw{position:fixed;inset:0;z-index:2147483001;pointer-events:none;visibility:hidden}#lhw.on{visibility:visible}'+
'#lhw .sc{position:absolute;inset:0;opacity:0;transition:opacity .3s ease}#lhw.hold .sc{opacity:1}#lhw.shrink .sc{opacity:0;transition:opacity .18s ease}'+
'#lhw .hill{position:absolute;left:-5%;right:-5%;bottom:0;height:24vh;background:radial-gradient(120% 100% at 50% 100%,#090c20 0,#090c20 55%,rgba(9,12,32,0) 72%)}'+
'#lhw .line{position:absolute;left:8%;right:8%;top:var(--y);height:1.2px;margin-top:-.6px;background:linear-gradient(90deg,rgba(242,180,90,0),rgba(242,180,90,.5) 30%,rgba(242,180,90,.5) 70%,rgba(242,180,90,0))}'+
'#lhw .s{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;animation:lhtw 2.4s ease-in-out infinite}'+
'@keyframes lhtw{50%{opacity:.12}}'+
'#lhw i.lamp{position:absolute;left:var(--x);top:var(--y);width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#ffd38a;box-shadow:0 0 0 4px rgba(245,154,62,.22),0 0 24px 10px rgba(245,154,62,.5);opacity:0;transition:opacity .25s}'+
'#lhw.grow i.lamp,#lhw.hold i.lamp{opacity:1}#lhw.shrink i.lamp{opacity:0;transition:opacity .35s .15s}'+
'#lhw b{position:absolute;left:0;right:0;top:42%;text-align:center;font:400 15px/1.2 "Special Elite","IBM Plex Mono",monospace;letter-spacing:.24em;color:#ffd9a0;opacity:0;transition:opacity .35s;text-shadow:0 0 14px rgba(245,154,62,.45)}'+
'#lhw b small{display:block;font-size:9px;letter-spacing:.3em;color:rgba(236,231,220,.5);margin-bottom:8px}#lhw.word b{opacity:1}#lhw.shrink b{opacity:0;transition:opacity .15s}'+
'html[lang=th] #lhw b{font-family:"IBM Plex Sans Thai",sans-serif;letter-spacing:.06em}'+
'html.lh-in body{clip-path:circle(0px at var(--lx,50vw) var(--ly,92vh))}html.lh-in.lh-open body{clip-path:circle(var(--lr,150vmax) at var(--lx,50vw) var(--ly,92vh));transition:clip-path .62s cubic-bezier(.45,0,.2,1)}'+
'#lhv.fade{transform:none;width:auto;height:auto;inset:0;border-radius:0;transition:opacity .25s;opacity:0}#lhv.fade.full{opacity:1}';
H.appendChild(st);
var v=document.createElement('div');v.id='lhv';v.setAttribute('aria-hidden','true');H.appendChild(v);
var w=document.createElement('div');w.id='lhw';w.setAttribute('aria-hidden','true');
var stars='';[[12,18],[28,9],[44,22],[63,12],[81,19],[91,8],[7,38],[36,40],[70,33],[55,52],[18,58],[86,47]].forEach(function(p,k){stars+='<i class="s" style="left:'+p[0]+'%;top:'+p[1]+'%;animation-delay:-'+(k*.37).toFixed(2)+'s"></i>';});
w.innerHTML='<div class="sc">'+stars+'<div class="hill"></div><div class="line"></div></div><i class="lamp"></i><b><small></small><span></span></b>';H.appendChild(w);
function both(c){v.className=c+(RM?' fade':'');w.className=c;}
/* positions are kept as screen fractions (vw/vh): on arrival this runs in <head>, before the phone has applied the page's viewport, so pixel sizes are not known yet */
function place(fx,fy,tint){[v,w].forEach(function(e){e.style.setProperty('--x',(fx*100).toFixed(2)+'vw');e.style.setProperty('--y',(fy*100).toFixed(2)+'vh');});v.style.setProperty('--d','calc(2 * ('+(Math.max(fx,1-fx)*100).toFixed(2)+'vw + '+(Math.max(fy,1-fy)*100).toFixed(2)+'vh) + 40px)'); /* ≥ 2 × the distance to the far corner, no hypot() needed */if(tint)v.style.setProperty('--tint',tint);}
var memo=null;try{var m=(window.name||'').match(/(?:^|\s)lh-veil=(\S+)/);if(m){memo=m[1].split('|');window.name=window.name.replace(/\s?lh-veil=\S+/g,'');}}catch(e){}
var wt=0;
if(memo){var fx=+memo[0]||.5,fy=+memo[1]||.92,lab=decodeURIComponent(memo[2]||''),key=memo[3]||'',X=(fx*100).toFixed(2)+'vw',Y=(fy*100).toFixed(2)+'vh';place(fx,fy,TINT[key]);
  if(RM){both('on full hold');}else{H.style.setProperty('--lx',X);H.style.setProperty('--ly',Y);H.style.setProperty('--lr','150vmax');H.style.background='radial-gradient(120% 70% at 50% 0%,'+(TINT[key]||'#2f2550')+' 0,#141a3e 45%,#0b1028 75%) fixed #0b1028';H.classList.add('lh-in');w.className='on hold';}
  w.querySelector('span').textContent=lab;w.querySelector('small').textContent=(H.lang==='th'||/[฀-๿]/.test(lab))?'สถานีต่อไป':'NEXT STOP';
  wt=lab?setTimeout(function(){if(!up)w.classList.add('word');},400):0;}
/* r17 (Dell: check speed + jank on phones): the opening waits until the page has finished its own start-up work (two calm frames in a row, at most 0.45 s more), so the circle grows on a quiet main thread */
function settle(cb){var t0=performance.now(),last=t0,calm=0;(function f(n){var d=n-last;last=n;calm=d<22?calm+1:0;if(calm>=2||n-t0>450)cb();else requestAnimationFrame(f);})(t0);}
function rise(){if(up||!memo)return;up=true;clearTimeout(wt);requestAnimationFrame(function(){settle(function(){
    if(RM){both('on shrink');setTimeout(function(){both('');},640);return;}
    w.className='on shrink';H.classList.add('lh-open');setTimeout(function(){H.classList.remove('lh-in','lh-open');H.style.background='';w.className='';},700);});});}
window.lhReady=rise;
/* pre-warm the night layer once the page is idle, so the first frame after a tap has nothing to draw */
addEventListener('load',function(){var go=function(){if(!v.className)v.className='warm';};(window.requestIdleCallback||function(f){setTimeout(f,900);})(go,{timeout:2000});});
if(memo){setTimeout(rise,1400);addEventListener('DOMContentLoaded',function(){if(!H.hasAttribute('data-veil-wait'))setTimeout(rise,40);});}
var NAMES={home:'littlehill',traveller:'TRAVELLERS',travellers:'TRAVELLERS',timetable:'TIMETABLE',auction:'AUCTION',rules:'RULES'};
function keyOf(a){var k=a.getAttribute('data-k')||'';if(!k){var id=a.id||'';k=id==='navHome'?'home':id==='navTrav'?'traveller':id==='navTime'?'timetable':id==='navAuction'?'auction':id==='navRules'?'rules':'';}
  if(!k){try{var p=new URL(a.href,location.href).pathname;k=/\/timetable\//.test(p)?'timetable':/\/travellers\//.test(p)?'travellers':/\/traveller\//.test(p)?'traveller':/\/auction\//.test(p)?'auction':/\/rules\//.test(p)?'rules':/\/(index\.html)?$/.test(p)&&!/\/(timetable|traveller|travellers|auction|rules|owners|teaser|atlas|shop)\//.test(p)?'home':'';}catch(e){}}
  return k;}
function label(a,k){if(k==='home')return 'littlehill'; /* r16 (Dell): home and the logo both say littlehill */
  var t=a.querySelector('.lh-lb,b');var s=(t?t.textContent:'')||NAMES[k]||'';if(!s&&/littlehill/i.test(a.textContent))s='littlehill';return s.trim().slice(0,22);}
function norm(p){return p.replace(/index\.html$/,'').replace(/\/+$/,'/');}
function here(a){try{var u=new URL(a.href,location.href);if(u.origin!==location.origin||u.hash&&u.hash!==location.hash&&u.hash!=='#')return false;return norm(u.pathname)===norm(location.pathname);}catch(e){return false;}}
function same(a){try{var u=new URL(a.href,location.href);return u.origin===location.origin&&!(u.pathname===location.pathname&&u.search===location.search);}catch(e){return false;}}
document.addEventListener('click',function(e){if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
  /* tapping the page you are already on: no reload. scrolled down → glide back to the top; already at the top → the icon gives a small "you are here" nod */
  if(here(a)){e.preventDefault();a.classList.remove('lh-tap');H.classList.remove('lh-leaving','leaving');[].forEach.call(document.querySelectorAll('.lh-tap,.tap'),function(x){x.classList.remove('lh-tap','tap');});if(window.lhSound)lhSound.play('tick');var y=window.scrollY||document.documentElement.scrollTop;
    if(y>40){window.scrollTo({top:0,behavior:RM?'auto':'smooth'});}else{var ic=a.querySelector('.lh-ic,svg,b')||a;ic.classList.remove('lh-here');void ic.offsetWidth;ic.classList.add('lh-here');setTimeout(function(){ic.classList.remove('lh-here');},700);}
    return;}
  if(!same(a))return;
  e.preventDefault();var r=a.getBoundingClientRect(),ic=a.querySelector('.lh-ic,svg')||a,ri=ic.getBoundingClientRect(),small=r.width<160&&r.height<120;var x=small?ri.left+ri.width/2:e.clientX,y=small?ri.top+ri.height/2:e.clientY;
  if(!x&&!y){x=r.left+r.width/2;y=r.top+r.height/2;}
  var k=keyOf(a);
  try{window.name=(window.name||'').replace(/\s?lh-veil=\S+/g,'')+' lh-veil='+(x/innerWidth).toFixed(3)+'|'+(y/innerHeight).toFixed(3)+'|'+encodeURIComponent(label(a,k))+'|'+k;}catch(_){}
  if(window.lhSound)lhSound.play('tick');
  place(x/innerWidth,y/innerHeight,TINT[k]);both('on');void v.offsetWidth;both('on grow full');setTimeout(function(){w.classList.add('hold');},RM?0:300);
  var href=a.href;setTimeout(function(){location.href=href;},RM?220:400);setTimeout(function(){both('');},3000);});
addEventListener('pageshow',function(e){if(e.persisted){both('');H.classList.remove('lh-in','lh-open');H.style.background='';}});
})();
