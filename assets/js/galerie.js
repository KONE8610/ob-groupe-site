/* ===== OB GROUPE — médiathèque dynamique (chargée depuis assets/data/galerie.json) ===== */
(function () {
  var gallery = document.getElementById('gallery');
  if (!gallery) return;
  var src = gallery.dataset.src || 'assets/data/galerie.json';

  function esc(s) { return (s || '').toString(); }

  function tileHTML(item) {
    return (
      '<article class="tile reveal" data-cat="' + esc(item.cat) + '">' +
        '<div class="ph"><span class="cat">' + esc(item.cat_label) + '</span><img src="' + esc(item.image) + '" alt="' + esc(item.alt || item.title) + '" loading="lazy"></div>' +
        '<div class="body"><div class="date">' + esc(item.date_label) + '</div><h3>' + esc(item.title) + '</h3>' +
          '<p>' + esc(item.body) + '</p></div>' +
      '</article>'
    );
  }

  fetch(src, { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = (data && data.items) || [];
      if (!items.length) {
        gallery.innerHTML = '<p style="color:var(--muted);font-family:\'IBM Plex Sans\',sans-serif">Aucun visuel pour le moment.</p>';
        return;
      }
      gallery.innerHTML = items.map(tileHTML).join('');
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: .14 });
      gallery.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    })
    .catch(function () {
      gallery.innerHTML = '<p style="color:var(--muted);font-family:\'IBM Plex Sans\',sans-serif">Impossible de charger la médiathèque pour le moment.</p>';
    });
})();
