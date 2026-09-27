/* ===== OB GROUPE — actualités dynamiques (chargées depuis assets/data/actualites.json) ===== */
(function () {
  var list = document.getElementById('newsList');
  if (!list) return;
  var src = list.dataset.src || 'assets/data/actualites.json';

  function esc(s) { return (s || '').toString(); }

  function cardHTML(item) {
    var recruit = '';
    if (item.recruit_poste) {
      var email = item.recruit_email
        ? '<div><div class="rk">E-mail</div><div class="rv"><a href="mailto:' + esc(item.recruit_email) + '" style="color:inherit;text-decoration:none">' + esc(item.recruit_email) + '</a></div></div>'
        : '';
      var whats = item.recruit_whatsapp
        ? '<div><div class="rk">WhatsApp</div><div class="rv"><a href="' + esc(item.recruit_whatsapp) + '" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">' + esc(item.recruit_whatsapp_label || 'WhatsApp') + '</a></div></div>'
        : '';
      recruit = '<div class="recruit-box"><div class="rk">Postes</div><div class="rv">' + esc(item.recruit_poste) + '</div>' +
        '<div class="recruit-grid">' + email + whats + '</div></div>';
    }

    var ctaPrimary = item.cta_primary_url
      ? '<a href="' + esc(item.cta_primary_url) + '" target="' + (item.cta_primary_url.indexOf('mailto:') === 0 ? '_self' : '_blank') + '" rel="noopener" class="btn btn-primary">' + esc(item.cta_primary_label || 'En savoir plus') + '</a>'
      : '';
    var ctaSecondary = item.cta_secondary_url
      ? '<a href="' + esc(item.cta_secondary_url) + '" target="' + (item.cta_secondary_url.indexOf('mailto:') === 0 || item.cta_secondary_url.indexOf('.html') !== -1 ? '_self' : '_blank') + '" rel="noopener" class="btn btn-ghost" style="color:var(--ink);border-color:var(--line-dark)">' + esc(item.cta_secondary_label || '') + '</a>'
      : '';

    return (
      '<article class="news-card reveal">' +
        '<div class="nc-media">' +
          '<span class="nc-badge">' + esc(item.badge) + '</span>' +
          '<img src="' + esc(item.image) + '" alt="' + esc(item.image_alt || item.title) + '">' +
        '</div>' +
        '<div class="nc-body">' +
          '<span class="nc-date">' + esc(item.date_label) + '</span>' +
          '<h3>' + esc(item.title) + '</h3>' +
          '<p>' + (item.body || '') + '</p>' +
          recruit +
          '<div class="nc-cta">' + ctaPrimary + ctaSecondary + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  fetch(src, { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = (data && data.items) || [];
      if (!items.length) {
        list.innerHTML = '<p style="color:var(--muted);font-family:\'IBM Plex Sans\',sans-serif">Aucune actualité pour le moment.</p>';
        return;
      }
      list.innerHTML = items.map(cardHTML).join('');
      // relance l'animation "reveal" pour les cartes injectées après coup
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: .14 });
      list.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    })
    .catch(function () {
      list.innerHTML = '<p style="color:var(--muted);font-family:\'IBM Plex Sans\',sans-serif">Impossible de charger les actualités pour le moment.</p>';
    });
})();
