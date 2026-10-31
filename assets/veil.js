/* littlehill · page change (r18 · 30 Oct · Dell tried 3 phones: Chrome jerky, background flashed, light not on the icon)
   r19: the night closes IN onto the lamp you tapped (a train light runs there along the gold line) → the next page opens OUT of that lamp.
   r18 rebuilt for real phones:
   · both moving layers are a small 256 px picture that is only SCALED (GPU) — the old night circle was a ~2400 px picture
     (×3 on a phone screen) that mid-range phones could not move smoothly
   · the night is one flat colour on both pages + the same stars / hill / gold line drawn in the same place → no flash at the swap
   · the lamp is placed by its distance from the BOTTOM of the screen (the menu is pinned there) in pixels measured at the tap,
     so Chrome's address bar showing / hiding cannot push it off the icon
   · the opening waits until the new page has settled (two calm frames, ≤0.45 s)
   station board (NEXT STOP · …) after 0.4 s · home = "littlehill" · reduced motion → a plain short fade */
(function(){var H=document.documentElement,up=false,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,NIGHT='#0b1028',T=256;
var st=document.createElement('style');st.textContent='@keyframes lhhere{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(245,154,62,0)}35%{transform:scale(1.1);box-shadow:0 0 0 6px rgba(245,154,62,.22)}100%{transform:scale(1);box-shadow:0 0 0 12px rgba(245,154,62,0)}}.lh-here{animation:lhhere .55s cubic-bezier(.35,0,.25,1);border-radius:50%}'+
'html{background:'+NIGHT+';scrollbar-width:none}html::-webkit-scrollbar{width:0;height:0;display:none}a,button{-webkit-tap-highlight-color:transparent}'+
/* moving layers: 256 px, scaled only */
'.lhm{position:fixed;left:0;top:0;width:'+T+'px;height:'+T+'px;margin:-'+(T/2)+'px 0 0 -'+(T/2)+'px;border-radius:50%;pointer-events:none;z-index:2147483000;visibility:hidden;will-change:transform;backface-visibility:hidden;contain:strict}'+
'#lhv{background:radial-gradient(closest-side,'+NIGHT+' 0,'+NIGHT+' 92%,rgba(11,16,40,0) 100%)}'+
'#lho{border-radius:0;background:radial-gradient(circle closest-side,rgba(11,16,40,0) 0,rgba(11,16,40,0) 1.2%,'+NIGHT+' 3.2%,'+NIGHT+' 100%)}'+
'.lhm.on{visibility:visible}'+
/* what you see while it is dark (not scaled): night, stars, far hill, gold line, the lamp, the station board */
'#lhw,#lhw *{box-sizing:border-box}#lhw *{margin:0;padding:0;top:auto;right:auto;transform:none;animation-name:none}#lhw{position:fixed;inset:0;z-index:2147483001;pointer-events:none;visibility:hidden}#lhw.on{visibility:visible}'+
'#lhw .lhv-bg{position:absolute;inset:0;background:'+NIGHT+';opacity:0}#lhw.cover .lhv-bg{opacity:1}'+
'#lhw .lhv-sc{position:absolute;inset:0;opacity:0;transition:opacity .28s ease}#lhw.hold .lhv-sc{opacity:1}#lhw.open .lhv-sc{opacity:0;transition:opacity .2s ease}'+
'#lhw .lhv-hill{position:absolute;left:-5%;right:-5%;bottom:0;height:26%;background:radial-gradient(120% 100% at 50% 100%,#070a1c 0,#070a1c 55%,rgba(7,10,28,0) 72%)}'+
'#lhw .lhv-glow{position:absolute;left:0;right:0;top:0;height:60%;background:radial-gradient(90% 70% at 50% 0%,rgba(80,60,130,.35),rgba(80,60,130,0) 70%)}'+
'#lhw .lhv-line{position:absolute;left:8%;right:8%;bottom:var(--b,60px);height:1.2px;margin-bottom:-.6px;background:linear-gradient(90deg,rgba(242,180,90,0),rgba(242,180,90,.5) 30%,rgba(242,180,90,.5) 70%,rgba(242,180,90,0))}'+
'#lhw .lhv-s{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;animation:lhtw 2.4s ease-in-out infinite}'+
'@keyframes lhtw{50%{opacity:.12}}'+
'#lhw i.lhv-lamp{position:absolute;left:var(--x,50%);bottom:var(--b,60px);width:10px;height:10px;margin:0 0 -5px -5px;border-radius:50%;background:#ffd38a;box-shadow:0 0 0 4px rgba(245,154,62,.22),0 0 24px 10px rgba(245,154,62,.5);opacity:0;transition:opacity .2s}'+
'#lhw.lit i.lhv-lamp{opacity:1}#lhw.open i.lhv-lamp{opacity:0;transition:opacity .3s .1s}'+
'#lhw b{position:absolute;left:0;right:0;top:42%;text-align:center;font:400 15px/1.2 "Special Elite","IBM Plex Mono",monospace;letter-spacing:.24em;color:#ffd9a0;opacity:0;transition:opacity .35s;text-shadow:0 0 14px rgba(245,154,62,.45)}'+
'#lhw b small{display:block;font-size:9px;letter-spacing:.3em;color:rgba(236,231,220,.5);margin-bottom:8px}#lhw.word b{opacity:1}#lhw.open b{opacity:0;transition:opacity .15s}'+
'html[lang=th] #lhw b{font-family:"IBM Plex Sans Thai",sans-serif;letter-spacing:.06em}'+
'#lhw.fade{transition:opacity .25s}';
H.appendChild(st);
function mk(id,cls){var e=document.createElement('div');e.id=id;if(cls)e.className=cls;e.setAttribute('aria-hidden','true');H.appendChild(e);return e;}
var v=mk('lhv'),o=mk('lho'),w=mk('lhw');v.className='lhm';o.className='lhm';
var stars='';[[12,18],[28,9],[44,22],[63,12],[81,19],[91,8],[7,38],[36,40],[70,33],[55,52],[18,58],[86,47]].forEach(function(p,k){stars+='<i class="lhv-s" style="left:'+p[0]+'%;top:'+p[1]+'%;animation-delay:-'+(k*.37).toFixed(2)+'s"></i>';});
w.innerHTML='<div class="lhv-bg"></div><div class="lhv-sc"><div class="lhv-glow"></div>'+stars+'<div class="lhv-hill"></div><div class="lhv-line"></div></div><i class="lhv-lamp"></i><b><small></small><span></span></b>';
function setXY(fx,b){w.style.setProperty('--x',(fx*100).toFixed(2)+'%');w.style.setProperty('--b',b.toFixed(1)+'px');}
function tf(e,x,y,k){e.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+k.toFixed(4)+')';}
function far(x,y){return Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));}
function anim(e,from,to,ms,ease,done){e.style.transition='none';e.style.transform=from;void e.offsetWidth;e.style.transition='transform '+ms+'ms '+ease;e.style.transform=to;var fin=false,end=function(){if(fin)return;fin=true;done&&done();};e.addEventListener('transitionend',end,{once:true});setTimeout(end,ms+120);}
var memo=null;try{var m=(window.name||'').match(/(?:^|\s)lh-veil=(\S+)/);if(m){memo=m[1].split('|');window.name=window.name.replace(/\s?lh-veil=\S+/g,'');}}catch(e){}
var wt=0,FX=.5,FB=60;
if(memo){FX=+memo[0]||.5;FB=+memo[1]||60;var lab=decodeURIComponent(memo[2]||'');setXY(FX,FB);w.className='on cover hold lit';
  w.querySelector('span').textContent=lab;w.querySelector('small').textContent=(H.lang==='th'||/[\u0E00-\u0E7F]/.test(lab))?'สถานีต่อไป':'NEXT STOP';
  wt=lab?setTimeout(function(){if(!up)w.classList.add('word');},400):0;}
/* the opening waits until the page has finished its own start-up work (two calm frames, at most 0.45 s more) */
function settle(cb){var t0=performance.now(),last=t0,calm=0;(function f(n){var d=n-last;last=n;calm=d<22?calm+1:0;if(calm>=2||n-t0>450)cb();else requestAnimationFrame(f);})(t0);}
function rise(){if(up||!memo)return;up=true;clearTimeout(wt);requestAnimationFrame(function(){settle(function(){
    if(RM){w.classList.add('fade');w.style.opacity=0;setTimeout(function(){w.className='';w.style.opacity='';},300);return;}
    var x=FX*innerWidth,y=innerHeight-FB,R=far(x,y)+40,k0=R/(T/2),k1=(R+60)/(T/2*0.012);
    window.lhOpening=true; /* pages with their own moving bits (No.001 dust) hold them for these 0.65 s */tf(o,x,y,k0);w.classList.remove('cover');w.classList.add('open');
    anim(o,o.style.transform,'translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+k1.toFixed(2)+')',TRIPS>=3?520:650,'cubic-bezier(.5,0,.25,1)',function(){window.lhOpening=false;o.style.transition='none';o.style.transform='translate3d(-2000px,-2000px,0) scale(1)';w.className='';});});});}
window.lhReady=rise;
if(memo){setTimeout(rise,1400);addEventListener('DOMContentLoaded',function(){if(!H.hasAttribute('data-veil-wait'))setTimeout(rise,40);});}
/* pre-warm the moving layer once the page is idle */
/* both moving layers are first drawn at their own 256 px size (parked off screen); with will-change the phone keeps that small picture and only scales it later — it never has to redraw a screen-sized circle */
[v,o].forEach(function(e){e.style.transform='translate3d(-2000px,-2000px,0) scale(1)';e.classList.add('on');});
/* r19 (Dell 30 Oct: keep the new night + light, but the OLD direction) · leaving: the night closes IN onto the lamp you tapped
   · and the lamp is a small train light that runs along the gold line from the station you are on to the one you tapped,
     so you see where you are going (only when both are on the menu rail)
   · repeat trips in one visit are a little quicker (the first one is the full ceremony) · a 6 ms tap on phones that allow it */
var TRIPS=0;try{var mt=(window.name||'').match(/(?:^|\s)lh-trips=(\d+)/);TRIPS=mt?+mt[1]:0;}catch(e){}
function bumpTrips(){try{window.name=(window.name||'').replace(/\s?lh-trips=\d+/g,'')+' lh-trips='+(TRIPS+1);}catch(e){}}
function from(){var c=document.querySelector('.lh-nav.lh-rail a[aria-current=page] .lh-ic,nav#menu a.lit svg');if(!c)return null;var r=c.getBoundingClientRect();return r.width?[r.left+r.width/2,Math.min(r.top+r.height/2,innerHeight-47)]:null;}
function leave(x,y,href,sx,sy){var R=far(x,y)+40,k0=R/(T/2),kOpen=(R+60)/(T/2*0.012),quick=TRIPS>=2,MS=quick?340:440;
  setXY(x/innerWidth,innerHeight-y);bumpTrips();try{navigator.vibrate&&navigator.vibrate(6);}catch(e){}
  if(RM){w.className='on fade cover lit';setTimeout(function(){location.href=href;},220);return;}
  var lamp=w.querySelector('.lhv-lamp'),f=(sx!=null)?[sx,sy]:from(),run=f&&Math.hypot(f[0]-x,f[1]-y)>8;
  w.className='on lit';
  if(run){lamp.style.transition='none';lamp.style.transform='translate3d('+(f[0]-x).toFixed(1)+'px,'+(f[1]-y).toFixed(1)+'px,0)';void lamp.offsetWidth;lamp.style.transition='transform '+MS+'ms cubic-bezier(.45,0,.25,1),opacity .2s';lamp.style.transform='translate3d(0,0,0)';if(window.lhSound&&Math.hypot(f[0]-x,f[1]-y)>30)lhSound.play('run',{d:MS/1000});}
  /* the night: a ring whose hole shrinks onto the lamp */
  anim(o,'translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+kOpen.toFixed(2)+')','translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scale('+k0.toFixed(3)+')',MS,'cubic-bezier(.6,0,.4,1)',function(){w.classList.add('cover');});
  setTimeout(function(){w.classList.add('hold');},MS*.6);
  setTimeout(function(){location.href=href;},MS+20);
  setTimeout(function(){o.style.transition='none';o.style.transform='translate3d(-2000px,-2000px,0) scale(1)';lamp.style.transform='';w.className='';},3000);}
/* prefetch: the menu's pages are fetched quietly once this page is idle, and any same-site link the moment a finger lands on it — so the next page is usually already here */
function pf(u){try{var a=new URL(u,location.href);if(a.origin!==location.origin||norm(a.pathname)===norm(location.pathname))return;var k=a.pathname;if(pf[k])return;pf[k]=1;var l=document.createElement('link');l.rel='prefetch';l.href=a.href.split('#')[0];document.head.appendChild(l);}catch(e){}}
addEventListener('load',function(){(window.requestIdleCallback||function(f){setTimeout(f,1200);})(function(){[].forEach.call(document.querySelectorAll('.lh-nav.lh-rail a[href],nav#menu a[href]'),function(a){pf(a.href);});},{timeout:3000});});
document.addEventListener('pointerdown',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a&&!a.target)pf(a.href);},{capture:true,passive:true});
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
  var k=keyOf(a),sx=null,sy=null,st=station(k);
  /* r20: a link inside the page (e.g. "Meet No.001") — the light leaves the button you tapped and runs to that page's station on the menu; the night closes there */
  if(st&&!a.closest('.lh-nav,nav#menu')){sx=x;sy=y;x=st[0];y=st[1];}
  try{window.name=(window.name||'').replace(/\s?lh-veil=\S+/g,'')+' lh-veil='+(x/innerWidth).toFixed(3)+'|'+(innerHeight-y).toFixed(1)+'|'+encodeURIComponent(label(a,k))+'|'+k;}catch(_){} /* x as a fraction of the width · y as px from the bottom */
  if(window.lhSound)lhSound.play('tick');
  leave(x,y,a.href,sx,sy);});
function station(k){var rk=k==='travellers'?'traveller':k,e=document.querySelector('.lh-nav.lh-rail a[data-k="'+rk+'"] .lh-ic');
  if(!e){var id={home:'navHome',traveller:'navTrav',travellers:'navTrav',timetable:'navTime',auction:'navAuction',rules:'navRules'}[k];var h=id&&document.getElementById(id);e=h&&(h.querySelector('svg')||h);}
  if(!e)return null;var r=e.getBoundingClientRect();if(!r.width)return null;/* the rail may have slid away while reading — aim where it rests */return [r.left+r.width/2,Math.min(r.top+r.height/2,innerHeight-47)];}
/* r20 · browser Back/Forward: the page comes straight back (no night), and a small train light runs along the menu from the station you left to this one */
/* history entries bring their own window.name back, so the 'from' station goes in sessionStorage (per tab) */
addEventListener('pagehide',function(){var f=from();try{if(f)sessionStorage.setItem('lh-from',(f[0]/innerWidth).toFixed(3)+'|'+(innerHeight-f[1]).toFixed(1)+'|'+Date.now());else sessionStorage.removeItem('lh-from');}catch(e){}});
function backRun(){var v=null;try{v=sessionStorage.getItem('lh-from');sessionStorage.removeItem('lh-from');}catch(e){}if(!v||RM)return;var p=v.split('|'),t=from();if(!t||Date.now()-(+p[2]||0)>600000)return;
  var fx=(+p[0])*innerWidth,fy=innerHeight-(+p[1]);if(Math.hypot(fx-t[0],fy-t[1])<8)return;setXY(t[0]/innerWidth,innerHeight-t[1]);var lamp=w.querySelector('.lhv-lamp');w.className='on lit';
  lamp.style.transition='none';lamp.style.transform='translate3d('+(fx-t[0]).toFixed(1)+'px,'+(fy-t[1]).toFixed(1)+'px,0)';void lamp.offsetWidth;lamp.style.transition='transform 380ms cubic-bezier(.45,0,.25,1)';lamp.style.transform='translate3d(0,0,0)';
  if(window.lhSound)lhSound.play('run',{d:.38});setTimeout(function(){w.className='on';setTimeout(function(){w.className='';lamp.style.transform='';lamp.style.transition='';},350);},520);}

addEventListener('pageshow',function(e){var nav=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0]||{}).type;
  if(e.persisted){[v,o].forEach(function(x){x.style.transition='none';x.style.transform='translate3d(-2000px,-2000px,0) scale(1)';});w.className='';}
  if(e.persisted||(nav==='back_forward'&&!memo))setTimeout(backRun,e.persisted?60:350);});
})();
