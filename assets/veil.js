/* littlehill · page change (r10c · Dell picked C + D)
   C · lantern iris — tap a link: the night closes in a circle onto the place you tapped, leaving one small lamp;
       the next page opens out of that same lamp (the rail spots are locked, so it is the same spot on every page).
   D · station board — if the next page takes longer than 0.4 s, its name glows softly in the middle ("NEXT STOP · TIMETABLE").
   pages that draw from data call lhReady(); others open on DOMContentLoaded; never longer than 1.4 s.
   no @property support / reduced motion → a plain fade. */
(function(){var H=document.documentElement,K='lh-veil',up=false,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,IR=!RM&&!!(window.CSS&&CSS.registerProperty);
if(IR){try{CSS.registerProperty({name:'--vr',syntax:'<length>',inherits:false,initialValue:'0px'});}catch(e){}}
var st=document.createElement('style');st.textContent='@keyframes lhhere{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(245,154,62,0)}35%{transform:scale(1.1);box-shadow:0 0 0 6px rgba(245,154,62,.22)}100%{transform:scale(1);box-shadow:0 0 0 12px rgba(245,154,62,0)}}.lh-here{animation:lhhere .55s cubic-bezier(.35,0,.25,1);border-radius:50%}html{background:#0b1028}@media (pointer:coarse){html{scrollbar-gutter:stable}}a,button{-webkit-tap-highlight-color:transparent}'+
'#lhv{position:fixed;inset:0;z-index:2147483000;pointer-events:none;visibility:hidden;opacity:1;--vx:50vw;--vy:92vh;--vr:150vmax;background:radial-gradient(1px 1px at 18% 24%,rgba(255,255,255,.8),transparent),radial-gradient(1px 1px at 72% 16%,rgba(255,255,255,.7),transparent),radial-gradient(1.3px 1.3px at 42% 58%,rgba(255,255,255,.75),transparent),radial-gradient(1px 1px at 84% 66%,rgba(255,255,255,.6),transparent),radial-gradient(1px 1px at 12% 78%,rgba(255,255,255,.5),transparent),radial-gradient(1px 1px at 58% 36%,rgba(255,255,255,.5),transparent),radial-gradient(1px 1px at 30% 8%,rgba(255,255,255,.5),transparent),radial-gradient(1px 1px at 90% 40%,rgba(255,255,255,.55),transparent),linear-gradient(#151b40,#0b1028)}'+
(IR?'#lhv{-webkit-mask:radial-gradient(circle at var(--vx) var(--vy),transparent var(--vr),#000 calc(var(--vr) + 1.5px));mask:radial-gradient(circle at var(--vx) var(--vy),transparent var(--vr),#000 calc(var(--vr) + 1.5px))}':'#lhv{transition:opacity .3s}#lhv.fade0{opacity:0}')+
'#lhv.on{visibility:visible}#lhv.close{transition:--vr .34s cubic-bezier(.55,0,.75,.2),opacity .2s}#lhv.close{--vr:0px}#lhv.dark{--vr:0px;transition:none}#lhv.open{--vr:150vmax;transition:--vr .55s cubic-bezier(.2,.7,.25,1),opacity .35s}'+
'#lhw{position:fixed;inset:0;z-index:2147483001;pointer-events:none;visibility:hidden}#lhw.on{visibility:visible}#lhw i{position:absolute;left:var(--vx);top:var(--vy);width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#ffd38a;box-shadow:0 0 0 4px rgba(245,154,62,.22),0 0 22px 9px rgba(245,154,62,.55);opacity:0;transition:opacity .25s}#lhw.close i,#lhw.dark i{opacity:1;transition:opacity .25s .12s}#lhw.open i{opacity:0;transition:opacity .2s}'+
'#lhw b{position:absolute;left:0;right:0;top:44%;text-align:center;font:400 15px/1.2 "Special Elite","IBM Plex Mono",monospace;letter-spacing:.24em;color:#ffd9a0;opacity:0;transition:opacity .35s;text-shadow:0 0 14px rgba(245,154,62,.45)}#lhw b small{display:block;font-size:9px;letter-spacing:.3em;color:rgba(236,231,220,.5);margin-bottom:8px}#lhw.word b{opacity:1}#lhw.open b{opacity:0;transition:opacity .2s}';
H.appendChild(st);
var v0=document.createElement('div');v0.id='lhv';v0.setAttribute('aria-hidden','true');H.appendChild(v0);var w=document.createElement('div');w.id='lhw';w.setAttribute('aria-hidden','true');w.innerHTML='<i></i><b><small></small><span></span></b>';H.appendChild(w);
/* v = both layers move together */var v={set className(c){v0.className=c;w.className=c;},get className(){return v0.className;},classList:{add:function(c){v0.classList.add(c);w.classList.add(c);}},style:{setProperty:function(a,b){v0.style.setProperty(a,b);w.style.setProperty(a,b);},removeProperty:function(a){v0.style.removeProperty(a);},set opacity(o){v0.style.opacity=o;}},querySelector:function(q){return w.querySelector(q);},get offsetWidth(){return v0.offsetWidth;}};
function pos(x,y){v.style.setProperty('--vx',x+'px');v.style.setProperty('--vy',y+'px');}
var memo=null;try{var m=(window.name||'').match(/(?:^|\s)lh-veil=(\S+)/);if(m){memo=m[1].split('|');window.name=window.name.replace(/\s?lh-veil=\S+/g,'');}}catch(e){}
if(memo){var fx=+memo[0]||.5,fy=+memo[1]||.92;pos(fx*innerWidth,fy*innerHeight);v.className='on dark';
  var lab=decodeURIComponent(memo[2]||'');v.querySelector('span').textContent=lab;v.querySelector('small').textContent=(H.lang==='th'||/[฀-๿]/.test(lab))?'สถานีต่อไป':'NEXT STOP';
  var wt=lab?setTimeout(function(){if(!up)v.classList.add('word');},400):0;}
function rise(){if(up||!memo)return;up=true;clearTimeout(wt);requestAnimationFrame(function(){requestAnimationFrame(function(){v.className=IR?'on open':'on fade0';setTimeout(function(){v.className='';},620);});});}
window.lhReady=rise;
if(memo){setTimeout(rise,1400);addEventListener('DOMContentLoaded',function(){if(!H.hasAttribute('data-veil-wait'))setTimeout(rise,40);});}
var NAMES={home:'HOME',traveller:'TRAVELLERS',travellers:'TRAVELLERS',timetable:'TIMETABLE',auction:'AUCTION',rules:'RULES'};
function label(a){var t=a.querySelector('.lh-lb,b');var s=(t?t.textContent:'')||NAMES[a.getAttribute('data-k')]||'';if(!s){var id=a.id||'';s=id==='navHome'?'HOME':'';}if(!s&&/littlehill/i.test(a.textContent))s='littlehill';return s.trim().slice(0,22);}
function norm(p){return p.replace(/index\.html$/,'').replace(/\/+$/,'/');}
function here(a){try{var u=new URL(a.href,location.href);if(u.origin!==location.origin||u.hash&&u.hash!==location.hash&&u.hash!=='#')return false;return norm(u.pathname)===norm(location.pathname);}catch(e){return false;}}
function same(a){try{var u=new URL(a.href,location.href);return u.origin===location.origin&&!(u.pathname===location.pathname&&u.search===location.search);}catch(e){return false;}}
document.addEventListener('click',function(e){if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
  /* r11 · tapping the page you are already on: no reload. scrolled down → glide back to the top; already at the top → the icon gives a small "you are here" nod */
  if(here(a)){e.preventDefault();a.classList.remove('lh-tap');H.classList.remove('lh-leaving','leaving');[].forEach.call(document.querySelectorAll('.lh-tap,.tap'),function(x){x.classList.remove('lh-tap','tap');});if(window.lhSound)lhSound.play('tick');var y=window.scrollY||document.documentElement.scrollTop;var sc=document.querySelector('.lhb-sheet.on,[data-scroller]');
    if(y>40){window.scrollTo({top:0,behavior:RM?'auto':'smooth'});}else{var ic=a.querySelector('.lh-ic,svg,b')||a;ic.classList.remove('lh-here');void ic.offsetWidth;ic.classList.add('lh-here');setTimeout(function(){ic.classList.remove('lh-here');},700);}
    return;}
  if(!same(a))return;
  e.preventDefault();var r=a.getBoundingClientRect(),ic=a.querySelector('.lh-ic,svg')||a,ri=ic.getBoundingClientRect();var x=(r.width<160&&r.height<120)?ri.left+ri.width/2:e.clientX,y=(r.width<160&&r.height<120)?ri.top+ri.height/2:e.clientY;
  if(!x&&!y){x=r.left+r.width/2;y=r.top+r.height/2;}
  try{window.name=(window.name||'').replace(/\s?lh-veil=\S+/g,'')+' lh-veil='+(x/innerWidth).toFixed(3)+'|'+(y/innerHeight).toFixed(3)+'|'+encodeURIComponent(label(a));}catch(_){}
  if(window.lhSound)lhSound.play('tick');
  pos(x,y);v.className='on';v.style.setProperty('--vr',Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))+'px');void v.offsetWidth;v.style.removeProperty('--vr');v.className=IR?'on close':'on';if(!IR){v.style.opacity=0;void v.offsetWidth;v.style.opacity=1;}
  var href=a.href;setTimeout(function(){location.href=href;},IR?330:200);setTimeout(function(){v.className='';v.style.opacity='';},3000);});
addEventListener('pageshow',function(e){if(e.persisted){v.className='';v.style.opacity='';}});
})();
