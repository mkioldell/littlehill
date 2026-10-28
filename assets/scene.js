/* littlehill · 2.5D platform scene (P10) · LHScene.init(el) · LHScene.event(el, id, ok)
   - parallax: mouse position on computers, page scroll on phones (no drag, no scroll-jacking) · max ~1.5 units × depth px
   - train: passes ONCE per viewer per real event, only while that event is fresh (never random, never on a timer)
   - prefers-reduced-motion: nothing moves, no train */
(function(){
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine=window.matchMedia&&matchMedia("(pointer:fine)").matches;
  function init(el){
    if(!el||reduce)return;
    var tx=0,ty=0,cx=0,cy=0,raf=0;
    function loop(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;el.style.setProperty("--px",cx.toFixed(3));el.style.setProperty("--py",cy.toFixed(3));
      if(Math.abs(tx-cx)>.002||Math.abs(ty-cy)>.002)raf=requestAnimationFrame(loop);else raf=0;}
    function kick(){if(!raf)raf=requestAnimationFrame(loop);}
    if(fine){addEventListener("pointermove",function(e){if(e.pointerType!=="mouse")return;tx=(e.clientX/innerWidth-.5)*-2;ty=(e.clientY/innerHeight-.5)*-1;kick();},{passive:true});}
    else{addEventListener("scroll",function(){var r=el.getBoundingClientRect(),k=(r.top+r.height/2)/innerHeight-.5;ty=Math.max(-1,Math.min(1,k*-1.6));tx=ty*.4;kick();},{passive:true});}
  }
  function seen(id){try{return localStorage.getItem("lh-train-"+id)==="1";}catch(e){return true;}}
  function mark(id){try{localStorage.setItem("lh-train-"+id,"1");}catch(e){}}
  /* id: "reveal" | "open" | "sold" … · ok: the page has checked the event is real and still fresh
     (reveal: date shown and bidding not open yet · open: within 24 h of openedAt · sold: within 24 h of soldAt) */
  function event(el,id,ok,force){
    if(!el||reduce)return false;
    if(!force&&(!ok||seen(id)))return false;
    var g=el.querySelector(".train");if(!g)return false;
    if(!force)mark(id);
    el.classList.add("passing");
    var t0=performance.now(),D=3200;
    (function step(n){var k=Math.min(1,(n-t0)/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
      g.setAttribute("transform","translate("+(-1400+e*2800)+" 0)");
      if(k<1)requestAnimationFrame(step);else{el.classList.remove("passing");g.setAttribute("transform","translate(-1400 0)");}})(t0);
    return true;
  }
  window.LHScene={init:init,event:event};
})();
