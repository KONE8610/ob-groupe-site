/* ===================================================================
   OB GROUPE — Configuration
   -------------------------------------------------------------------
   Ce fichier centralise les clés de connexion au backend.
   ⚠️ À compléter au CHANTIER 2 (création du projet Supabase).
   La clé "anon" est publique par conception (protégée par les
   politiques RLS côté Supabase) — elle peut rester dans ce fichier.
   =================================================================== */

window.OB_CONFIG = {
  // Renseignés au chantier 2 :
  SUPABASE_URL: "",       // ex : https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: "",  // clé publique "anon"

  // Adresse publique du site (utilisée pour le QR code des avis) :
  SITE_URL: "https://www.ob-groupe.net",

  // Contact affiché (à renseigner) :
  TELEPHONE: "+225 05 75 07 73 48",
  EMAIL: "contact@ob-groupe.net",
  VILLE: "Yamoussoukro, Côte d'Ivoire",
};
