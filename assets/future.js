/* littlehill · shared helpers for the prototype pages (travellers · atlas · owners · shop) · 24 Oct 2026
   Each page:  <script src="(root)assets/future.js"></script>  then  LH.start({key:"atlas", root:"../", render:fn})
   Gate: the page shows only when state.json → pages.<key> === true.
         ?preview=1 (or opening the file straight from the computer) always shows it, with a yellow banner.
   Nothing here talks to the internet except the page's own JSON files. */
(function(){
  'use strict';
  var LH=window.LH={};
  var q;try{q=new URLSearchParams(location.search);}catch(e){q={has:function(){return false;}};}
  LH.preview=q.has('preview')||location.protocol==='file:';

  var l='';try{l=localStorage.getItem('lh-lang')||'';}catch(e){}
  if(l!=='th'&&l!=='en')l=(navigator.language||'').toLowerCase().indexOf('th')===0?'th':'en';
  LH.lang=l;

  LH.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  /* "[to be written]" style placeholders never reach visitors */
  LH.isPh=function(s){return typeof s==='string'&&/^\s*\[/.test(s);};
  LH.loc=function(v){var s=v&&typeof v==='object'?(v[LH.lang]||v.en||''):(v||'');return LH.isPh(s)?'':String(s);};
  LH.get=function(u){return fetch(u+(u.indexOf('?')<0?'?':'&')+'t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json();});};
  LH.inline=function(id){var el=document.getElementById(id);if(!el)return null;try{return JSON.parse(el.textContent);}catch(e){return null;}};
  LH.fmtDate=function(iso){if(!iso)return'';var d=new Date(iso);if(isNaN(d))return'';
    try{return new Intl.DateTimeFormat(LH.lang==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Bangkok'}).format(d);}catch(e){return iso.slice(0,10);}};

  var COMMON={
    en:{closedK:'littlehill',closedT:"This platform isn't open yet.",closedB:'Nothing is waiting here for now.',home:'← back to littlehill',
        prevOff:'PREVIEW · switched off for visitors (state.json → pages.{k} = false). Visitors see "This platform isn\'t open yet."',
        prevOn:'PREVIEW · this page is switched on (pages.{k} = true).',
        prevUnknown:'PREVIEW · state.json could not be read here, so the switch is unknown. On the real site an unreadable switch = closed.'},
    th:{closedK:'littlehill',closedT:'ชานชาลานี้ยังไม่เปิด',closedB:'ตอนนี้ยังไม่มีอะไรรออยู่ตรงนี้',home:'← กลับ littlehill',
        prevOff:'ตัวอย่าง · หน้านี้ปิดอยู่สำหรับคนทั่วไป (state.json → pages.{k} = false) · คนอื่นจะเห็น "ชานชาลานี้ยังไม่เปิด"',
        prevOn:'ตัวอย่าง · หน้านี้เปิดอยู่ (pages.{k} = true)',
        prevUnknown:'ตัวอย่าง · อ่าน state.json ไม่ได้ เลยไม่รู้ว่าเปิดหรือปิด · บนเว็บจริงถ้าอ่านไม่ได้ = ปิด'}};
  LH.c=function(k){return (COMMON[LH.lang]||COMMON.en)[k];};

  LH.state=null;LH.stateKnown=false;LH.on=false;
  LH.visible=function(){return LH.on||LH.preview;};

  function paintGate(){
    var key=LH.key,content=document.getElementById('content'),closed=document.getElementById('closed'),bar=document.getElementById('previewbar');
    var show=LH.visible();
    if(content)content.hidden=!show;
    if(closed){closed.hidden=show;
      closed.innerHTML='<div class="lamp" aria-hidden="true"></div><span class="kicker">'+LH.esc(LH.c('closedK'))+'</span><h1>'+LH.esc(LH.c('closedT'))+'</h1><p>'+LH.esc(LH.c('closedB'))+'</p><p><a href="'+LH.esc(LH.root)+'">'+LH.esc(LH.c('home'))+'</a></p>';}
    if(bar){
      if(LH.preview){bar.hidden=false;bar.textContent=(!LH.stateKnown?LH.c('prevUnknown'):(LH.on?LH.c('prevOn'):LH.c('prevOff'))).replace('{k}',key);}
      else bar.hidden=true;}
  }

  function setLangButtons(){
    document.documentElement.lang=LH.lang;   /* nav.js follows <html lang> */
    [].forEach.call(document.querySelectorAll('.langsw button'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-set')===LH.lang?'true':'false');});
  }

  /* opts: {key, root, render} · render() is called after every language switch and data load */
  LH.start=function(opts){
    LH.key=opts.key;LH.root=opts.root||'../';
    var draw=function(){setLangButtons();paintGate();if(LH.visible()&&opts.render)opts.render();};
    LH.redraw=draw;
    var sw=document.querySelector('.langsw');
    if(sw)sw.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;LH.lang=b.getAttribute('data-set')==='th'?'th':'en';try{localStorage.setItem('lh-lang',LH.lang);}catch(x){}draw();});
    setLangButtons();
    return LH.get(LH.root+'state.json').then(function(s){LH.state=s;LH.stateKnown=true;},function(){LH.state=null;LH.stateKnown=false;})
      .then(function(){LH.on=!!(LH.state&&LH.state.pages&&LH.state.pages[LH.key]===true);draw();return LH.visible();});
  };
})();
