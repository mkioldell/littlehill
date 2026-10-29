/* littlehill · "platform edge" — the official channels as quiet logos (Dell 28 Oct: links on the site replace Linktree).
   One list, two looks:  pages → a row at the foot of the page (after the page's own <footer>)
                         homepage → a faint row under "the night line · season one" (#cap), no scrolling needed.
   A channel with no url is not shown (no dead icons). During bidding DA gets the rail's lantern dot = "bids here".
   Logos: Simple Icons (CC0) paths · mail glyph drawn here. */
/* LAND · every page opens at its top (no remembered scroll from the last visit / back-forward cache) */
(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";}catch(e){}
  function top(){if(!location.hash)window.scrollTo(0,0);}top();addEventListener("pageshow",function(e){if(e.persisted)top();});})();
(function(){
  if(window.lhEdge)return;
  var CH=[ /* order: news first → watch → bid → talk → write */
    {k:"x", url:"https://x.com/little_hill01", label:"X · @little_hill01",
      d:"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"},
    {k:"yt", url:"", label:"YouTube",
      d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"},
    {k:"da", url:"https://www.deviantart.com/mkioldell", label:"DeviantArt · mkioldell",
      d:"M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v5.993h4.04l.36.436-4.175 7.98-.24.43V24H8.93l.436-.44 2.07-3.925.644-.436h7.35v-5.993h-4.05l-.36-.438 4.186-7.977z"},
    {k:"fb", url:"", label:"Facebook · littlehill",
      d:"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"},
    {k:"mail", url:"mailto:home@littlehill.page", label:"home@littlehill.page",
      d:"M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.3V17h16V7.3l-8 5.6-8-5.6zM5.6 7l6.4 4.5L18.4 7H5.6z"}];
  var cfg=window.LH_EDGE||{};if(cfg.urls)CH.forEach(function(c){if(cfg.urls[c.k]!=null)c.url=cfg.urls[c.k];});
  var NOTE={en:"only these are me",th:"ช่องทางของจริงมีเท่านี้"};
  var css=
  ".lh-footx{display:none!important}"+
  ".lh-edge{position:relative;text-align:center;margin:44px auto 0;padding:0 16px calc(86px + env(safe-area-inset-bottom,0px));color:rgba(236,231,220,.6);clear:both}"+
  ".lh-edge::before{content:'';display:block;width:56px;height:1px;margin:0 auto 14px;background:rgba(236,231,220,.22)}"+
  ".lh-edge-row{display:flex;justify-content:center;flex-wrap:wrap;gap:4px;margin:0}"+
  ".lh-edge a{color:inherit;text-decoration:none}"+
  ".lh-edge .ic{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;transition:color .2s;-webkit-tap-highlight-color:transparent}"+
  ".lh-edge .ic svg{position:static!important;display:block;inset:auto!important;width:19px;height:19px;fill:currentColor;transform:none!important;opacity:1!important;filter:none!important}"+
  ".lh-edge .ic:hover,.lh-edge .ic:focus-visible,.lh-edge .ic:active{color:#ffd9a0}"+
  ".lh-edge .ic:focus-visible{outline:2px solid #f2b45a;outline-offset:-4px}"+
  ".lh-edge .ic.live::after{content:'';position:absolute;top:9px;right:8px;width:6px;height:6px;border-radius:50%;background:#f59a3e;box-shadow:0 0 0 3px rgba(245,154,62,.22),0 0 10px 3px rgba(245,154,62,.45)}"+
  ".lh-edge .tip{position:absolute;bottom:42px;left:50%;transform:translateX(-50%);white-space:nowrap;font:400 .6rem 'Special Elite','IBM Plex Mono',monospace;letter-spacing:.12em;color:#ffd9a0;opacity:0;transition:opacity .2s;pointer-events:none}"+
  ".lh-edge .ic:hover .tip,.lh-edge .ic:focus-visible .tip{opacity:1}"+
  ".lh-edge-note{margin:6px 0 0;font:400 .6rem/1.6 'Special Elite','IBM Plex Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,231,220,.45)}"+
  ".lh-edge-note a{letter-spacing:.06em;text-transform:none;color:rgba(236,231,220,.62)}"+
  "html[lang^='th'] .lh-edge-note{font-family:'IBM Plex Sans Thai',sans-serif;letter-spacing:.02em;font-size:.68rem}"+
  /* homepage: faint row under the caption — part of the station sign */
  ".lh-edge.sign{background:none!important;border:0!important;box-shadow:none!important;width:auto!important;height:auto!important;position:absolute;z-index:6;margin:0;padding:0;text-align:left;color:rgba(236,231,220,.42)}"+
  ".lh-edge.sign::before,.lh-edge.sign .lh-edge-note{display:none}"+
  ".lh-edge.sign .lh-edge-row{justify-content:flex-start;gap:0}"+
  ".lh-edge.sign .ic{width:34px;height:34px}.lh-edge.sign .ic svg{width:15px;height:15px}"+
  ".lh-edge.sign .ic.live::after{top:5px;right:4px;width:5px;height:5px}"+
  ".lh-edge.sign .tip{bottom:auto;top:34px;left:50%}"+
  "@media (hover:none){.lh-edge .tip{display:none}}"+
  "@media (prefers-reduced-motion:reduce){.lh-edge .ic,.lh-edge .tip{transition:none}}";
  function lang(){return (document.documentElement.getAttribute("lang")||"").toLowerCase().indexOf("th")===0?"th":"en";}
  var live=false,els=[];
  function row(){return '<div class="lh-edge-row">'+CH.filter(function(c){return c.url;}).map(function(c){
    var ext=c.url.indexOf("mailto:")!==0;
    return '<a class="ic'+(c.k==="da"&&live?' live':'')+'" data-ch="'+c.k+'" href="'+c.url+'"'+(ext?' target="_blank" rel="noopener"':'')+' aria-label="'+c.label+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+c.d+'"/></svg><span class="tip" aria-hidden="true">'+c.label+'</span></a>';}).join('')+'</div>';}
  function fill(f){var sign=f.classList.contains("sign");
    f.innerHTML=row()+(sign?'':'<p class="lh-edge-note">'+NOTE[lang()]+' · <a href="mailto:home@littlehill.page">home@littlehill.page</a></p>');}
  function addCss(){if(document.getElementById("lh-edge-css"))return;var s=document.createElement("style");s.id="lh-edge-css";s.textContent=css;document.head.appendChild(s);}
  /* pages: after the page's own footer (or at the end of the body) */
  function foot(){addCss();if(document.querySelector(".lh-edge:not(.sign)"))return;
    var f=document.createElement("footer");f.className="lh-edge";f.setAttribute("aria-label","littlehill elsewhere");fill(f);
    var host=document.querySelector("footer:not(.lh-edge)");if(host&&host.parentNode)host.parentNode.insertBefore(f,host.nextSibling);else document.body.appendChild(f);
    els.push(f);}
  /* homepage: under the caption */
  function sign(anchor){addCss();var a=document.getElementById(anchor||"cap");if(!a)return;
    var f=document.createElement("div");f.className="lh-edge sign";f.setAttribute("role","navigation");f.setAttribute("aria-label","littlehill elsewhere");fill(f);a.parentNode.insertBefore(f,a.nextSibling);els.push(f);
    function place(){var r=a.getBoundingClientRect(),p=f.offsetParent?f.offsetParent.getBoundingClientRect():{left:0,top:0};f.style.left=(r.left-p.left-10)+"px";f.style.top=(r.bottom-p.top+4)+"px";}
    place();addEventListener("resize",place);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);setTimeout(place,600);}
  /* state: DA shows the lantern dot while bidding is open */
  function set(S){var a=(S&&S.auction)||{},on=a.status==="open"||a.status==="extended";if(on===live)return;live=on;
    [].forEach.call(document.querySelectorAll('.lh-edge .ic[data-ch="da"]'),function(e){e.classList.toggle("live",live);});}
  try{new MutationObserver(function(){els.forEach(fill);}).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});}catch(e){}
  window.lhEdge={foot:foot,sign:sign,set:set};
})();
