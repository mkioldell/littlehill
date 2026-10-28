/* littlehill · shared nav + contextual links. Reads state.json (same file the pages use).
   Pages: <script src="(root)assets/nav.js" data-root="(root)" data-page="auction" defer></script>
   Prototype artifacts set window.LH_NAV = {urls:{...}, state:{...}, target:"_blank"} before this script. */
(function(){
  var cfg=window.LH_NAV||{}, me=document.currentScript;
  var root=cfg.root||(me&&me.getAttribute("data-root"))||"./";
  var page=cfg.page||(me&&me.getAttribute("data-page"))||"";
  var U=cfg.urls||{home:root,teaser:root+"teaser/",traveller:root+"traveller/001/",auction:root+"auction/",rules:root+"rules/"};
  var U0=cfg.urls?null:U.traveller;
  /* H3: traveller No. of this round (auction.no / traveller.no) → label + link · a traveller page that is not this round (registry, or another No.) sets <html data-lh-noctx> */
  function curNo(){try{return window.lhLive&&S?lhLive.no(S):"001";}catch(e){return "001";}}
  var X="https://x.com/little_hill01";
  var TX={
    en:{home:"littlehill",traveller:"Traveller No.001",auction:"Auction",sold:"Found a home",rules:"Boarding rules",
      ctxOpen:"Bidding is open · see the auction →",ctxClosed:"Bidding closed · see the auction →",ctxSold:"Found a home · see the night it happened →",
      meet:"Meet No.001 →",teaserTrav:"Meet Traveller No.001 →",back:"← Back",toTrav:"← Traveller No.001",toHome:"← littlehill"},
    th:{home:"littlehill",traveller:"Traveller No.001",auction:"ประมูล",sold:"ได้บ้านแล้ว",rules:"กติกา",
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
      if(k==="x"){a.href=X;return;}
      if(U[k])a.href=U[k];tgt(a);
      var t=L[k]||a.textContent;if(typeof t==="string")t=t.split("No.001").join("No."+no);
      if(k==="auction"&&f){if(f.st==="sold")t=L.sold;}
      a.textContent=t;
      if(f){if(k==="traveller")a.hidden=!f.trav;if(k==="auction")a.hidden=!f.auc;}else a.hidden=false;
      if(k===page&&!(k==="traveller"&&noctx))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
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
  function load(){if(cfg.state)return;
    (window.lhLive?lhLive.get(root+"state.json?t="+Date.now()):fetch(root+"state.json?t="+Date.now(),{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json();}))
      .then(function(j){S=j;render();}).catch(function(){render();});}
  /* follow each page's own language switch (they set <html lang>) */
  try{new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});}catch(e){}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){render();load();});else{render();load();}
  if(!cfg.state)setInterval(load,60000);
  window.LH_NAV_RENDER=render;
})();
