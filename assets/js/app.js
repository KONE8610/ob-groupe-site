/* ===== OB GROUPE — interactions communes ===== */
(function(){
  // année courante (footer)
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // échelle de mesure (signature accueil)
  var scale = document.querySelector('.scale');
  if(scale){ var s=''; for(var i=0;i<90;i++){ s+='<span></span>'; } scale.innerHTML=s; }

  // menu mobile
  var t=document.getElementById('menuToggle'), l=document.getElementById('navLinks');
  if(t&&l){
    t.addEventListener('click',function(){ l.classList.toggle('open'); });
    l.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ l.classList.remove('open'); }); });
  }

  // reveal au scroll
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // ---- notation par étoiles (page avis) ----
  document.querySelectorAll('.starset').forEach(function(set){
    var stars = set.querySelectorAll('svg');
    function paint(n){ stars.forEach(function(st,i){ st.classList.toggle('on', i<n); }); }
    stars.forEach(function(st,i){
      st.addEventListener('mouseenter',function(){ paint(i+1); });
      st.addEventListener('click',function(){ set.dataset.value=i+1; paint(i+1); });
    });
    set.addEventListener('mouseleave',function(){ paint(parseInt(set.dataset.value||'0',10)); });
  });

  // envoi avis (maquette)
  var sendAvis=document.getElementById('sendAvis');
  if(sendAvis){
    sendAvis.addEventListener('click',function(){
      alert('Merci ! Votre avis a bien été pris en compte.\n\n(Maquette — l\'enregistrement réel sera connecté lors de la mise en production.)');
    });
  }

  // copier le lien (page avis)
  var copyBtn=document.getElementById('copyLink');
  if(copyBtn){
    copyBtn.addEventListener('click',function(){
      var url=document.getElementById('shareUrl');
      var txt=url? (url.textContent||url.value):'';
      if(navigator.clipboard&&txt){ navigator.clipboard.writeText(txt.trim()); }
      copyBtn.textContent='Lien copié';
      setTimeout(function(){ copyBtn.textContent='Copier le lien'; },1800);
    });
  }

  // ---- filtres médiathèque ----
  var fbtns=document.querySelectorAll('.filter-btn');
  if(fbtns.length){
    fbtns.forEach(function(b){
      b.addEventListener('click',function(){
        fbtns.forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        var cat=b.dataset.cat;
        document.querySelectorAll('.tile').forEach(function(tile){
          var show = (cat==='all' || tile.dataset.cat===cat);
          tile.classList.toggle('is-hidden', !show);
        });
      });
    });
  }
})();

// ---- Carrousel du hero (accueil) ----
(function(){
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('#heroDots button');
  if(!slides.length) return;
  var i = 0, timer;
  function show(n){
    slides.forEach(function(s,idx){ s.classList.toggle('active', idx===n); });
    dots.forEach(function(d,idx){ d.classList.toggle('active', idx===n); });
    i = n;
  }
  function next(){ show((i+1) % slides.length); }
  function start(){ timer = setInterval(next, 5000); }
  function stop(){ clearInterval(timer); }
  dots.forEach(function(d){
    d.addEventListener('click', function(){ stop(); show(parseInt(d.dataset.i,10)); start(); });
  });
  start();
})();
