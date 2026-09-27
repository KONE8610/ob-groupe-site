/* ===== OB GROUPE — photos pilotées par assets/data/photos.json =====
   Permet de changer les visuels de la vitrine (hero) et des 6 corps de métier
   depuis l'interface d'administration, sans toucher au code. */
(function () {
  fetch('assets/data/photos.json', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (map) {
      if (!map) return;
      Object.keys(map).forEach(function (key) {
        var url = map[key];
        if (!url) return;
        document.querySelectorAll('[data-photo-key="' + key + '"]').forEach(function (img) {
          if (img.getAttribute('src') !== url) img.setAttribute('src', url);
        });
      });
    })
    .catch(function () { /* si le fichier est absent, les images par défaut restent affichées */ });
})();
