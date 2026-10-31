/* littlehill · sound (r10c · Dell: "the whole site is silent") — one switch for every page, remembered; off until you turn it on.
   all sounds are drawn in code (no files yet): short, quiet, warm. Browsers only allow sound after a tap on the page. */
(function(){var KEY='lh-sound',AC=null,DST=null;
/* r16 (Dell: "make every sound sit right") · measured offline and balanced by job: small taps ≈ -22 dB peak · moments ≈ -17 · the big bells ≈ -14 (same as the home chime and the delivery page) · the far train and the pen are lifted into the range phone speakers can play */
var LV={tick:1.75,lamp:2.45,paper:2.7,flap:1.45,punch:.8,bell:2.5,closebell:2,rumble:1.7,pen:5,run:3.2};
function memo(v){try{if(v===undefined){var x=localStorage.getItem(KEY);if(x!=null)return x;}else localStorage.setItem(KEY,v);}catch(e){}
  try{if(v===undefined){var y=sessionStorage.getItem(KEY);if(y!=null)return y;}else sessionStorage.setItem(KEY,v);}catch(e){}
  var m=(window.name||'').match(/(?:^|\s)lh-sound=(\S+)/);if(v===undefined)return m?m[1]:null;try{window.name=(window.name||'').replace(/\s?lh-sound=\S+/g,'')+' lh-sound='+v;}catch(e){}return null;}
function on(){return memo()==='1';}
function ctx(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){AC=null;}return AC;}
['pointerdown','keydown'].forEach(function(ev){addEventListener(ev,function(){if(on())ctx();},{capture:true,passive:true});});
function noise(c,d){var n=Math.max(1,Math.floor(c.sampleRate*d)),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(var i=0;i<n;i++)a[i]=Math.random()*2-1;var s=c.createBufferSource();s.buffer=b;return s;}
function env(c,g,t,a,peak,d){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d);}
function nz(c,t,d,type,f,q,peak,a){var s=noise(c,d+.05),fl=c.createBiquadFilter(),g=c.createGain();fl.type=type;fl.frequency.value=f;fl.Q.value=q||1;env(c,g,t,a||.004,peak,d);s.connect(fl);fl.connect(g);g.connect(DST);s.start(t);s.stop(t+d+.05);return g;}
function tone(c,t,f,d,peak,type,f2){var o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d*.8);env(c,g,t,.006,peak,d);o.connect(g);g.connect(DST);o.start(t);o.stop(t+d+.05);}
var S={
 tick:function(c,t){nz(c,t,.05,'bandpass',1900,3,.10);tone(c,t,300,.06,.05,'triangle',180);},             /* a wooden rail switch */
 flap:function(c,t,o){var n=(o&&o.n)||9;for(var i=0;i<n;i++){var tt=t+i*.032+Math.random()*.012;nz(c,tt,.018,'highpass',2600,.7,.07);}nz(c,t+n*.032+.02,.03,'bandpass',900,2,.09);}, /* split-flap settling */
 bell:function(c,t){tone(c,t,1318,1.6,.05);tone(c,t,1976,1.1,.025);tone(c,t,2637,.6,.012);},             /* a new bid: small hand bell */
 closebell:function(c,t){[0,.55,1.1].forEach(function(k){tone(c,t+k,880,2.2,.06);tone(c,t+k,1320,1.6,.03);tone(c,t+k,2200,.7,.012);});}, /* station bell: bidding closed */
 paper:function(c,t){nz(c,t,.26,'bandpass',1400,.8,.06,.06);nz(c,t+.08,.18,'highpass',3200,.5,.03,.03);},   /* a sheet of paper */
 punch:function(c,t){tone(c,t,150,.09,.12,'sine',60);nz(c,t,.03,'bandpass',2400,2,.08);},                 /* a ticket punch */
 lamp:function(c,t){nz(c,t,.02,'bandpass',3000,4,.06);tone(c,t+.01,660,.5,.03);tone(c,t+.01,990,.35,.015);}, /* a lamp switching on */
 rumble:function(c,t,o){var d=(o&&o.d)||1.4,s=noise(c,d+.1),fl=c.createBiquadFilter(),g=c.createGain();fl.type='lowpass';fl.frequency.value=420;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.16,t+d*.35);g.gain.linearRampToValueAtTime(0,t+d);s.connect(fl);fl.connect(g);g.connect(DST);s.start(t);s.stop(t+d+.1);
   for(var k=0;k<d/.36;k++){nz(c,t+.15+k*.36,.03,'bandpass',900,3,.05);}},                            /* the train passing far away */
 run:function(c,t,o){var d=(o&&o.d)||.4,s=noise(c,d+.1),fl=c.createBiquadFilter(),g=c.createGain();fl.type='bandpass';fl.frequency.setValueAtTime(500,t);fl.frequency.linearRampToValueAtTime(1300,t+d);fl.Q.value=.7;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+d*.5);g.gain.linearRampToValueAtTime(0,t+d+.05);s.connect(fl);fl.connect(g);g.connect(DST);s.start(t);s.stop(t+d+.12);
   var n=Math.max(2,Math.round(d/.12));for(var k=0;k<n;k++){nz(c,t+.03+k*(d/n),.022,'bandpass',k%2?1100:850,3,.045);}},   /* the little light running along the rail: soft whoosh + wheel clacks */
 pen:function(c,t,o){var d=(o&&o.d)||1,s=noise(c,d+.05),fl=c.createBiquadFilter(),g=c.createGain(),lf=c.createOscillator(),lg=c.createGain();fl.type='bandpass';fl.frequency.value=3600;fl.Q.value=1.2;
   g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.012,t+.05);g.gain.setValueAtTime(.012,t+d-.08);g.gain.linearRampToValueAtTime(0,t+d);lf.frequency.value=7;lg.gain.value=.007;lf.connect(lg);lg.connect(g.gain);
   s.connect(fl);fl.connect(g);g.connect(DST);s.start(t);s.stop(t+d+.05);lf.start(t);lf.stop(t+d+.05);}  /* a nib on paper */
};
window.lhSound={on:on,set:function(v){memo(v?'1':'0');if(v)ctx();draw();},play:function(k,o){if(!on()||!S[k])return;var c=ctx();if(!c||c.state!=='running'&&c.state!=='suspended')return;try{var g=c.createGain();g.gain.value=LV[k]||1;g.connect(c.destination);DST=g;S[k](c,c.currentTime+.01,o);}catch(e){}}};
/* the switch: next to the language buttons on every page that doesn't have its own (home and the delivery page do) */
var btn=null,btns=[];function icon(){return '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 6h3l4-3v10l-4-3H2z"/>'+(on()?'<path d="M11 5.5c1 1.4 1 3.6 0 5M13 4c1.8 2.3 1.8 5.7 0 8"/>':'<path d="M11 6l4 4M15 6l-4 4"/>')+'</svg>';}
function draw(){var th=document.documentElement.lang==='th';(btn?[btn]:[]).concat(btns,[].slice.call(document.querySelectorAll('.lh-snd-own'))).forEach(function(x){x.innerHTML=icon();x.setAttribute('aria-label',on()?(th?'ปิดเสียง':'Sound on. Turn off'):(th?'เปิดเสียง':'Sound off. Turn on'));x.setAttribute('aria-pressed',on()?'true':'false');});}
function mount(){var pre=document.querySelectorAll('.lh-snd');if(pre.length){[].forEach.call(pre,function(b0){b0.onclick=function(){var v=!on();lhSound.set(v);if(v)lhSound.play('lamp');};});btns=[].slice.call(pre);draw();return;}if(document.getElementById('snd')||document.getElementById('sound')){draw();return;}var host=[].filter.call(document.querySelectorAll('.tt-lang,.langsw,.lang,.lh-lang,[role=group][aria-label*=ang]'),function(e){var r=e.getBoundingClientRect();return r.width>0&&r.top<140&&r.top>-5;})[0];if(!host)return;
  btn=document.createElement('button');btn.type='button';btn.className='lh-snd';btn.style.cssText='display:inline-grid;place-items:center;width:36px;height:36px;margin-left:8px;border-radius:50%;border:1px solid rgba(236,231,220,.28);background:rgba(11,16,40,.35);color:#ece7dc;cursor:pointer;vertical-align:middle;padding:0;flex:0 0 auto';
  var hp=getComputedStyle(host).position;btn.style.marginLeft='0';if(hp!=='absolute'&&hp!=='fixed'){/* r11: keep the language switch in the top-right corner on every page; sound sits just left of it */var wr=document.createElement('span');wr.className='lh-tr';wr.style.cssText='display:inline-flex;align-items:center;gap:8px;flex:0 0 auto;margin-left:auto';host.parentNode.insertBefore(wr,host);wr.appendChild(btn);wr.appendChild(host);}else{host.insertAdjacentElement('afterend',btn);}if(hp==='absolute'||hp==='fixed'){var place=function(){btn.style.position=hp;btn.style.margin='0';btn.style.top=(host.offsetTop+(host.offsetHeight-36)/2)+'px';btn.style.left=(host.offsetLeft-44)+'px';btn.style.zIndex=getComputedStyle(host).zIndex;};place();addEventListener('resize',place);}var p=host.parentNode;if(p&&getComputedStyle(p).display.indexOf('flex')<0){}draw();btn.onclick=function(){var v=!on();lhSound.set(v);if(v)lhSound.play('lamp');};}
if(document.readyState==='loading')addEventListener('DOMContentLoaded',mount);else mount();
})();
