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
  var CH=[ /* order: news first → watch → bid → talk → see → clips → support → write (r15: + IG · TikTok · Ko-fi · real YT/FB links 29 Oct) */
    {k:"x", url:"https://x.com/little_hill01", label:"X · @little_hill01",
      d:"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"},
    {k:"yt", url:"https://www.youtube.com/@littlehill01", label:"YouTube · @littlehill01",
      d:"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"},
    {k:"da", url:"https://www.deviantart.com/mkioldell", label:"DeviantArt · mkioldell",
      d:"M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v5.993h4.04l.36.436-4.175 7.98-.24.43V24H8.93l.436-.44 2.07-3.925.644-.436h7.35v-5.993h-4.05l-.36-.438 4.186-7.977z"},
    {k:"fb", url:"https://www.facebook.com/littlehill01", label:"Facebook · littlehill01",
      d:"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"},
    {k:"ig", url:"https://www.instagram.com/little_hill01", label:"Instagram · @little_hill01",
      d:"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"},
    {k:"tt", url:"https://www.tiktok.com/@littlehill1", label:"TikTok · @littlehill1",
      d:"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"},
    {k:"kofi", url:"https://ko-fi.com/littlehill", label:"Ko-fi · littlehill",
      d:"M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298"},
    {k:"mail", url:"mailto:home@littlehill.page", label:"home@littlehill.page",
      d:"M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.3V17h16V7.3l-8 5.6-8-5.6zM5.6 7l6.4 4.5L18.4 7H5.6z"}];
  var cfg=window.LH_EDGE||{};if(cfg.urls)CH.forEach(function(c){if(cfg.urls[c.k]!=null)c.url=cfg.urls[c.k];});
  var NOTE={en:"only these are me",th:"ช่องทางของจริงมีเท่านี้"};
  var css=
  ".lh-footx{display:none!important}"+
  ".lh-edge{position:relative;text-align:center;margin:44px auto 0;padding:0 16px calc(86px + env(safe-area-inset-bottom,0px));color:rgba(236,231,220,.6);clear:both;overflow-x:clip}"+
  ".lh-edge::before{content:'';display:block;width:56px;height:1px;margin:0 auto 14px;background:rgba(236,231,220,.22)}"+
  ".lh-edge-row{display:flex;justify-content:center;flex-wrap:wrap;gap:4px;margin:0}"+
  ".lh-edge a{color:inherit;text-decoration:none}"+
  ".lh-edge .ic{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;transition:color .2s;-webkit-tap-highlight-color:transparent}"+
  ".lh-edge .ic svg{position:static!important;display:block;inset:auto!important;width:19px;height:19px;fill:currentColor;transform:none!important;opacity:1!important;filter:none!important}"+
  ".lh-edge .ic:hover,.lh-edge .ic:focus-visible,.lh-edge .ic:active{color:#ffd9a0}"+
  ".lh-edge .ic:focus-visible{outline:2px solid #f2b45a;outline-offset:-4px}"+
  ".lh-edge .ic.live::after{content:'';position:absolute;top:9px;right:8px;width:6px;height:6px;border-radius:50%;background:#f59a3e;box-shadow:0 0 0 3px rgba(245,154,62,.22),0 0 10px 3px rgba(245,154,62,.45)}"+
  ".lh-edge .tip{visibility:hidden;position:absolute;bottom:42px;left:50%;transform:translateX(-50%);white-space:nowrap;font:400 .6rem 'Special Elite','IBM Plex Mono',monospace;letter-spacing:.12em;color:#ffd9a0;opacity:0;transition:opacity .2s;pointer-events:none}"+
  ".lh-edge .ic:hover .tip,.lh-edge .ic:focus-visible .tip{opacity:1;visibility:visible}"+
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
