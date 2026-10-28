/* littlehill · เว็บอัปเดตสด (ส่งไม้ 4 · 26 ต.ค.)
   โต๊ะประมูลส่งสถานะขึ้น Firebase เองทุกครั้งที่กดบันทึก → หน้าเว็บอ่านจากที่นั่นภายในไม่กี่วินาที
   ถ้า DB ว่าง / Firebase ล่ม / ยังไม่มีข้อมูล → ใช้ state.json บน GitHub เหมือนเดิม (เว็บไม่มีวันว่าง)
   ตั้งค่าครั้งเดียว: ใส่ Database URL ของ Firebase ในบรรทัด DB ข้างล่าง (ไม่ใช่รหัสลับ · ใครเห็นก็ได้ · เขียนได้แค่บัญชี Dell) */
(function(){
  var DB = "https://littlehill-live-default-rtdb.asia-southeast1.firebasedatabase.app"; /* ← เช่น "https://littlehill-xxxxx-default-rtdb.asia-southeast1.firebasedatabase.app" · ว่าง = ปิด (ใช้ state.json อย่างเดียว) */
  DB=String(DB||"").replace(/\/+$/,"");
  var PATH=/[?&]rehearsal=1\b/.test(location.search)?"rehearsal":"live";   /* ?rehearsal=1 = ดูข้อมูลโต๊ะซ้อม */
  var URL_=DB?DB+"/"+PATH+"/state.json":"";
  function timeout(ms){return new Promise(function(_,no){setTimeout(function(){no(new Error("timeout"));},ms);});}
  function fromDb(){
    if(!URL_)return Promise.reject(new Error("off"));
    return Promise.race([fetch(URL_+"?t="+Date.now(),{cache:"no-store"}),timeout(6000)])
      .then(function(r){if(!r.ok)throw new Error("http "+r.status);return r.json();})
      .then(function(j){if(!j||typeof j!=="object")throw new Error("empty");return j;});
  }
  function fromFile(url){return fetch(url,{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("file "+r.status);return r.json();});}
  /* Firebase ดูแลแค่ส่วนประมูล (auction + traveller.stage) · ทีเซอร์/หน้าอื่นมาจาก state.json บน GitHub เสมอ */
  function active(j){return !!(j&&j.auction&&j.auction.status&&j.auction.status!=="soon");}
  function merge(file,db){var o=JSON.parse(JSON.stringify(file));o.auction=db.auction;
    if(db.traveller&&db.traveller.stage){o.traveller=o.traveller||{};o.traveller.stage=db.traveller.stage;}return o;}
  var api={
    on:!!URL_, path:PATH, source:"",
    /* get(fallbackUrl) → Promise<state> · ลอง Firebase ก่อน แล้วค่อย state.json */
    get:function(fallbackUrl){
      var ok=function(p){return p.then(function(v){return {v:v};},function(){return null;});};
      return Promise.all([ok(fromDb()),ok(fromFile(fallbackUrl))]).then(function(r){
        var db=r[0]&&r[0].v,file=r[1]&&r[1].v;
        if(db&&!active(db))db=null;          /* โต๊ะยังไม่เปิดบิด → เว็บใช้ state.json (ทีเซอร์/วันเปิดบิดแก้จาก GitHub ได้เหมือนเดิม) */
        if(db&&file){api.source="live";return merge(file,db);}
        if(file){api.source="file";return file;}
        if(r[0]&&r[0].v){api.source="live";return r[0].v;}
        throw new Error("no state");
      });
    },
    /* stream(cb) → ได้ state ใหม่ทันทีที่โต๊ะส่ง (~1 วินาที) · ถ้าต่อไม่ได้ (เช่นคนดูพร้อมกันเกินโควตาฟรี) ก็เงียบไป หน้าเว็บยังเช็กตามรอบปกติ */
    stream:function(cb){
      if(!URL_||typeof EventSource==="undefined")return false;
      var es,doc=null,fails=0;
      function set(path,data,merge){
        if(path==="/"||!path){doc=merge&&doc?Object.assign({},doc,data):data;return;}
        var ks=path.replace(/^\/|\/$/g,"").split("/"),o=doc=doc||{};
        for(var i=0;i<ks.length-1;i++){o=o[ks[i]]=(o[ks[i]]&&typeof o[ks[i]]==="object")?o[ks[i]]:{};}
        var last=ks[ks.length-1];if(merge&&o[last]&&typeof o[last]==="object")Object.assign(o[last],data);else o[last]=data;
      }
      function onEv(merge){return function(e){try{var m=JSON.parse(e.data);set(m.path,m.data,merge);fails=0;if(active(doc)){api.source="live";cb(doc);}}catch(x){}};}
      function open(){
        try{es=new EventSource(URL_);}catch(x){return;}
        es.addEventListener("put",onEv(false));es.addEventListener("patch",onEv(true));
        es.addEventListener("cancel",function(){es.close();});
        es.onerror=function(){fails++;if(fails>=3){es.close();setTimeout(function(){fails=0;open();},120000);}};
      }
      open();return true;
    }
  };
  /* ตัวละครรอบนี้ (ชุด 14): auction.no / quote / stop / place จากโต๊ะ (หรือ traveller.no ใน state.json) → ชื่อ No. ลิงก์ และการ์ดเปลี่ยนเอง · ไม่มี = No.001 เดิม */
  api.no=function(j){var a=j&&j.auction||{},t=j&&j.traveller||{};return String(a.no||t.no||"001");};
  api.personalize=function(j){var no=api.no(j),a=j&&j.auction||{};
    if(no!=="001"){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
      while((n=w.nextNode()))if(n.nodeValue.indexOf("No.001")>=0)n.nodeValue=n.nodeValue.split("No.001").join("No."+no);
      document.querySelectorAll("a[href*='/001/']").forEach(function(e){e.setAttribute("href",e.getAttribute("href").split("/001/").join("/"+no+"/"));});
      document.querySelectorAll("meta[content*='No.001']").forEach(function(e){e.setAttribute("content",e.getAttribute("content").split("No.001").join("No."+no));});
      if(document.title.indexOf("No.001")>=0)document.title=document.title.split("No.001").join("No."+no);}
    var st=parseInt(a.stop,10),se=document.getElementById("c-seen"),as=document.getElementById("c-asks");
    if(se&&st>0)se.textContent="Stop "+(st<10?"0":"")+st+(a.place?" · "+a.place:"");
    if(as&&a.quote)as.textContent='"'+a.quote+'"';
    return no;};
  window.lhLive=api;
})();
