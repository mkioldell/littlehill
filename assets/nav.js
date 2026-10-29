/* littlehill · shared nav + contextual links. Reads state.json (same file the pages use).
   Pages: <script src="(root)assets/nav.js" data-root="(root)" data-page="auction" defer></script>
   Prototype artifacts set window.LH_NAV = {urls:{...}, state:{...}, target:"_blank"} before this script. */
/* LAND · every page opens at its top (no remembered scroll from the last visit / back-forward cache) */
(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";}catch(e){}
  function top(){if(!location.hash)window.scrollTo(0,0);}top();addEventListener("pageshow",function(e){if(e.persisted)top();});})();
(function(){
  var cfg=window.LH_NAV||{}, me=document.currentScript;
  var root=cfg.root||(me&&me.getAttribute("data-root"))||"./";
  var page=cfg.page||(me&&me.getAttribute("data-page"))||"";
  var U=cfg.urls||{home:root+"?in=1",teaser:root+"teaser/",traveller:root+"traveller/001/",auction:root+"auction/",rules:root+"rules/",timetable:root+"timetable/"};
  var U0=cfg.urls?null:U.traveller;
  /* H3: traveller No. of this round (auction.no / traveller.no) → label + link · a traveller page that is not this round (registry, or another No.) sets <html data-lh-noctx> */
  function curNo(){try{return window.lhLive&&S?lhLive.no(S):"001";}catch(e){return "001";}}
  var X="https://x.com/little_hill01";
  /* LAND r8 (Dell: logos, not words only): each rail stop has a small icon sitting on the line · words stay small under it */
  var ICO={home:'<path d="M4 11.5 12 4.5l8 7V20H4z"/><path d="M10 20v-5h4v5"/>',
    traveller:'<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c.8-3.9 3.7-6.2 7-6.2s6.2 2.3 7 6.2"/>',
    timetable:'<rect x="6" y="3.5" width="12" height="13" rx="2.5"/><path d="M6 10.5h12M8.5 20.5l2-3.5M15.5 20.5l-2-3.5"/><circle cx="9" cy="13.5" r=".9"/><circle cx="15" cy="13.5" r=".9"/>',
    auction:'<path d="M3.5 11.5V4h7.5l9 9-7.5 7.5z"/><circle cx="7.8" cy="8.2" r="1.5"/>',
    rules:'<path d="M6.5 3.5h8.5l3.5 3.5v13.5h-12z"/><path d="M15 3.5V7h3.5M9.5 11.5h6M9.5 15h6"/>'};
  function icon(k){return ICO[k]?'<svg class="lh-ic" viewBox="0 0 24 24" aria-hidden="true">'+ICO[k]+'</svg>':'';}

  var TX={
    en:{home:"Home",traveller:"Travellers",auction:"Auction",sold:"Found a home",rules:"Rules",timetable:"Timetable",
      ctxOpen:"Bidding is open · see the auction →",ctxClosed:"Bidding closed · see the auction →",ctxSold:"Found a home · see the night it happened →",
      meet:"Meet No.001 →",teaserTrav:"Meet Traveller No.001 →",back:"← Back",toTrav:"← Traveller No.001",toHome:"← littlehill"},
    th:{home:"หน้าแรก",traveller:"นักเดินทาง",auction:"ประมูล",sold:"ได้บ้านแล้ว",rules:"กติกา",timetable:"ตารางเดินรถ",
      ctxOpen:"เปิดบิดแล้ว · ดูหน้าประมูล →",ctxClosed:"ปิดรับบิดแล้ว · ดูหน้าประมูล →",ctxSold:"ได้บ้านแล้ว · ดูคืนที่เกิดขึ้น →",
      meet:"รู้จัก No.001 →",teaserTrav:"รู้จัก Traveller No.001 →",back:"← กลับ",toTrav:"← Traveller No.001",toHome:"← littlehill"}};
  /* P10 · W1 (P18): past closeAt while status is still open/extended → "checking last-minute bids", not "Bidding is open" */
  TX.en.ctxCheck="Checking last-minute bids · see the auction →";TX.th.ctxCheck="กำลังตรวจบิดนาทีสุดท้าย · ดูหน้าประมูล →";
  var ORDER=["teaser","preview","open","extended","closed","sold"];
  var S=cfg.state||null;

  function lang(){var l=(document.documentElement.getAttribute("lang")||"").toLowerCase();
    if(l.indexOf("th")===0)return"th";if(l.indexOf("en")===0)return"en";
    try{l=localStorage.getItem("lh-lang");}catch(e){l=null;}return l==="th"?"th":"en";}
  /* null = state unknown (e.g. opened from a file): show every public link */
  function info(){if(!S)return null;var st=(S.traveller||{}).stage||"teaser",as=(S.auction||{}).status||"";
    if(as==="sold")st="sold";var i=ORDER.indexOf(st);if(i<0)i=1;
    return {st:st,as:as,trav:i>=1,auc:i>=2||as==="sold"};}
  function sameSite(){try{if(!document.referrer)return false;var r=new URL(document.referrer);return r.origin===location.origin&&r.pathname!==location.pathname;}catch(e){return false;}}
  function tgt(a){if(cfg.target){a.target=cfg.target;a.rel="noopener";}}

  function render(){
    var L=TX[lang()],f=info(),no=curNo();if(U0)U.traveller=root+"traveller/"+no+"/";
    var noctx=document.documentElement.hasAttribute("data-lh-noctx");
    [].forEach.call(document.querySelectorAll(".lh-nav a[data-k]"),function(a){
      var k=a.getAttribute("data-k");
      if(k==="x"){a.href=X;a.hidden=true;return;}
      if(U[k])a.href=U[k];if(k==="traveller"&&!cfg.urls&&regOn())a.href=root+"travellers/";tgt(a);
      var t=L[k]||a.textContent;if(typeof t==="string")t=t.split("No.001").join("No."+no);
      if(k==="auction"&&f){if(f.st==="sold")t=L.sold;}
      if(ICO[k]){var lb=a.querySelector(".lh-lb");if(!lb){a.innerHTML=icon(k)+'<span class="lh-lb"></span>';lb=a.querySelector(".lh-lb");}lb.textContent=t;a.setAttribute("aria-label",t);}else a.textContent=t;
      if(f){if(k==="traveller")a.hidden=!f.trav;if(k==="auction"){a.hidden=false;var la=((S&&S.auction)||{}).status||"";a.classList.toggle("lh-quiet",!/^(open|extended|closed|waiting)$/.test(la)&&page!=="auction");} /* Dell 28 Oct: Auction always in the rail (the page has a no-auction state) */}else a.hidden=false;
      if(k===page&&!(k==="traveller"&&noctx)||(k==="traveller"&&page==="travellers"))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
    [].forEach.call(document.querySelectorAll("a.lh-home,a.brand"),function(a){if(U.home){a.href=U.home;tgt(a);}});
    [].forEach.call(document.querySelectorAll("[data-lh-ctx]"),function(el){
      var c=el.getAttribute("data-lh-ctx");
      if(c==="auction"){ /* traveller page → auction status */
        if(!f||!f.auc||noctx){el.hidden=true;return;}
        el.href=U.auction;tgt(el);el.hidden=false;
        el.textContent=f.st==="sold"?L.ctxSold:(f.st==="closed"?L.ctxClosed:L.ctxOpen);
      }else if(c==="traveller"){ /* teaser → traveller once revealed */
        if(!f||!f.trav){el.hidden=true;return;}
        el.href=U.traveller;tgt(el);el.hidden=false;el.textContent=L.teaserTrav.split("No.001").join("No."+no);
      }else if(c==="meet"){ /* auction card → traveller */
        if(f&&!f.trav){el.hidden=true;return;}el.hidden=false;
        el.href=U.traveller;tgt(el);el.textContent=L.meet.split("No.001").join("No."+no);
      }else if(c==="back"){ /* rules → where the visitor came from */
        if(!cfg.target&&sameSite()&&history.length>1){el.href=document.referrer;el.textContent=L.back;
          el.onclick=function(e){e.preventDefault();history.back();};}
        else{var tv=!f||f.trav;el.href=tv?U.traveller:U.home;tgt(el);el.textContent=tv?L.toTrav.split("No.001").join("No."+no):L.toHome;el.onclick=null;}
        el.hidden=false;
      }
    });
    /* W1: checking last-minute bids (a tick at closeAt so the link changes without waiting for the next reload) */
    clearTimeout(chkT);var A=(S&&S.auction)||{},ca=A.closeAt?new Date(A.closeAt).getTime():NaN;
    if(f&&(f.st==="open"||f.st==="extended")&&(f.as==="open"||f.as==="extended")&&!isNaN(ca)){
      if(Date.now()>=ca)[].forEach.call(document.querySelectorAll('[data-lh-ctx="auction"]'),function(el){if(!el.hidden)el.textContent=L.ctxCheck;});
      else if(ca-Date.now()<864e5)chkT=setTimeout(render,ca-Date.now()+500);}
  }
  var chkT=0;
  /* LAND · the rail answers the finger at once (lit dot) and the page dims while the next stop loads */
  document.addEventListener("pointerdown",function(e){var a=e.target.closest&&e.target.closest(".lh-nav.lh-rail a");if(a&&a.getAttribute("aria-current")!=="page")a.classList.add("lh-tap");},true);
  document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".lh-nav.lh-rail a");if(!a||a.target==="_blank"||e.metaKey||e.ctrlKey||a.getAttribute("aria-current")==="page")return;a.classList.add("lh-tap"); /* r17: no class on <html> here — it restyled the whole page on the tap frame (nothing uses it since the night transition) */},true);
  addEventListener("pageshow",function(){document.documentElement.classList.remove("lh-leaving");[].forEach.call(document.querySelectorAll(".lh-tap"),function(a){a.classList.remove("lh-tap");});});
  /* LAND · platform edge (Dell 28 Oct): official channels as logos at the foot of every page · assets/edge.js */
  function edge(){function go(){lhEdge.foot();if(S)lhEdge.set(S);}
    if(window.lhEdge){go();return;}var s=document.createElement("script");s.src=root+"assets/edge.js";s.onload=go;document.head.appendChild(s);}

  function regOn(){return !!(S&&S.pages&&S.pages.travellers===true);}
  /* rail: X goes to the foot of the page · words shrink until they fit · out of the way while reading down */
  function rail(){if(!document.getElementById("lh-rail4")){var st=document.createElement("style");st.id="lh-rail4";
      /* LAND · four fixed columns: every page puts each word in the same spot */
      st.textContent='html body .lh-nav.lh-rail{display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:0!important;justify-items:center;padding:15px max(6vw,calc(50% - 280px)) 0!important}html body .lh-nav.lh-rail::before{background:rgba(242,180,90,.45)!important;width:84vw!important}@media (orientation:landscape){html body .lh-nav.lh-rail::before{width:48vw!important}}html body .lh-nav.lh-rail{grid-template-columns:repeat(5,minmax(0,112px))!important;justify-content:center!important}html body .lh-nav.lh-rail a[hidden]{display:none!important}html body .lh-nav.lh-rail a.lh-quiet{opacity:.5!important}html body .lh-nav.lh-rail a.lh-quiet:hover{opacity:1!important}html body .lh-nav.lh-rail a{gap:3px!important;font-size:9px!important;letter-spacing:.08em!important}html body .lh-nav.lh-rail a::before{display:none!important}html body .lh-nav.lh-rail .lh-ic{width:22px;height:22px;margin-top:-9px;padding:2px;box-sizing:content-box;border-radius:50%;background:#0b1028;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;transition:transform .15s,filter .15s}html body .lh-nav.lh-rail a[aria-current=page] .lh-ic{color:#ffb860;filter:drop-shadow(0 0 6px rgba(245,154,62,.75))}html body .lh-nav.lh-rail.lh-iconly a:not([aria-current=page]) .lh-lb{display:none}@media (max-width:600px){html body .lh-nav.lh-rail a:not([aria-current=page]) .lh-lb{display:none}}html[lang=th] body .lh-nav.lh-rail a{font-size:10px!important;letter-spacing:0!important}html body .lh-nav.lh-rail a.lh-tap .lh-ic{transform:scale(1.15);color:#ffd9a0}html body .lh-nav.lh-rail a.lh-tap{color:#ffd9a0!important;opacity:1!important}html body .lh-nav.lh-rail a.lh-tap::before{background:#f59a3e!important;box-shadow:0 0 0 5px rgba(245,154,62,.3),0 0 18px 6px rgba(245,154,62,.5)!important;transform:scale(1.25)}';
      document.head.appendChild(st);}
    [].forEach.call(document.querySelectorAll(".lh-nav"),function(n){n.classList.add("lh-rail");
      /* LAND · slot 4 = Timetable (Dell 28 Oct) */
      if(!n.querySelector('a[data-k="timetable"]')){var t=document.createElement("a");t.setAttribute("data-k","timetable");t.href=root+"timetable/";t.textContent="Timetable";var xx=n.querySelector('a[data-k="x"]');n.insertBefore(t,xx||null);}
      /* order (Dell 28 Oct): who → when → bid → the fine print */
      if(!n.querySelector('a[data-k="home"]')){var hm=document.createElement("a");hm.setAttribute("data-k","home");hm.href=root;hm.textContent="Home";n.insertBefore(hm,n.firstChild);}
      ["home","traveller","timetable","auction","rules","x"].forEach(function(k){var a=n.querySelector('a[data-k="'+k+'"]');if(a)n.appendChild(a);});});
    render();
    document.documentElement.classList.add("lh-has-rail");
    edge();
    fit();}
  function fit(){[].forEach.call(document.querySelectorAll(".lh-nav.lh-rail"),function(n){var as=[].slice.call(n.querySelectorAll("a:not([hidden])"));
    as.forEach(function(a){a.style.letterSpacing="";a.style.fontSize="";});
    function hit(){for(var i=0;i<as.length;i++){var r=as[i].getBoundingClientRect();if(!r.width)continue;if(r.left<2||r.right>innerWidth-2)return true;
      if(i&&r.left<as[i-1].getBoundingClientRect().right+8)return true;}return false;}
    n.classList.remove("lh-iconly");var k=0;while(hit()&&k<40){k++;var shrunk=false;as.forEach(function(a){var cs=getComputedStyle(a),ls=parseFloat(cs.letterSpacing)||0,fs=parseFloat(cs.fontSize);
      if(ls>0.5){a.style.letterSpacing=Math.max(0,ls-1)+"px";shrunk=true;}else if(fs>8.5){a.style.fontSize=(fs-.5)+"px";shrunk=true;}});if(!shrunk)break;}
    if(hit())n.classList.add("lh-iconly");});}
  var y0=0;addEventListener("scroll",function(){var n=document.querySelector(".lh-nav.lh-rail");if(!n)return;if(document.getElementById("dock")){n.classList.remove("away");return;} /* pages with their own bottom dock keep the rail still (Dell: overlap + jank on No.001) */var y=scrollY,end=innerHeight+y>=document.documentElement.scrollHeight-40;
    n.classList.toggle("away",y>y0+4&&y>240&&!end);if(y<y0-4||end)n.classList.remove("away");y0=y;document.documentElement.classList.toggle("lh-rail-away",n.classList.contains("away"));},{passive:true});
  (function(w){addEventListener("resize",function(){if(innerWidth!==w){w=innerWidth;fit();}});})(innerWidth);
  function load(){if(cfg.state)return;
    (window.lhLive?lhLive.get(root+"state.json?t="+Date.now()):fetch(root+"state.json?t="+Date.now(),{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json();}))
      .then(function(j){S=j;render();fit();if(window.lhEdge)lhEdge.set(S);}).catch(function(){render();fit();});}
  /* follow each page's own language switch (they set <html lang>) */
  try{new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});}catch(e){}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){render();rail();load();});else{render();rail();load();}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  if(!cfg.state)setInterval(load,60000);
  window.LH_NAV_RENDER=render;
})();
