export const metadata = {
  title: 'Politique de Cookies — Pau Football Club',
  description: 'Politique d\'utilisation des cookies sur le site officiel du Pau Football Club.',
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
            INFORMATIONS LÉGALES
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night">
            POLITIQUE DE COOKIES
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-sm">
            <p className="text-pau-night/50 text-xs mb-10">Dernière mise à jour : janvier 2026</p>

            <h2>Article 1 — Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
              tablette, téléphone) lorsque vous visitez un site internet. Les cookies permettent
              au site de reconnaître votre navigateur lors de visites ultérieures et de mémoriser
              certaines de vos préférences. Certains cookies sont indispensables au fonctionnement
              du site, d'autres sont utilisés à des fins statistiques ou de personnalisation et
              nécessitent votre consentement préalable.
            </p>

            <h2>Article 2 — Cookies strictement nécessaires</h2>
            <p>
              Ces cookies sont indispensables au bon fonctionnement du site. Ils ne peuvent pas
              être désactivés dans nos systèmes. Ils comprennent notamment le cookie de session
              d'authentification (httpOnly, sécurisé, durée : session), le cookie de panier
              (durée : 24 heures) et le cookie de préférences de consentement (durée : 13 mois).
              Aucun consentement n'est requis pour ces cookies.
            </p>

            <h2>Article 3 — Cookies de mesure d'audience</h2>
            <p>
              Nous utilisons des outils d'analyse d'audience pour mesurer la fréquentation du
              site et améliorer nos services. Ces cookies collectent des données de navigation
              de manière anonymisée (pages visitées, durée de visite, source d'entrée). Ils
              ne sont déposés qu'avec votre consentement explicite, recueilli lors de votre
              première visite via notre bandeau de gestion des cookies.
            </p>

            <h2>Article 4 — Cookies de personnalisation et réseaux sociaux</h2>
            <p>
              Certaines fonctionnalités du site, notamment les lecteurs vidéo YouTube intégrés
              et les boutons de partage sur les réseaux sociaux, peuvent déposer des cookies
              tiers sur votre terminal. Ces cookies sont soumis aux politiques de confidentialité
              de leurs éditeurs respectifs (Google, Meta, X Corp). Nous vous invitons à
              consulter ces politiques pour en savoir plus sur les traitements effectués.
            </p>

            <h2>Article 5 — Gestion de vos préférences</h2>
            <p>
              Vous pouvez à tout moment modifier vos choix en matière de cookies via le lien
              « Gérer mes cookies » disponible en bas de chaque page du site. Vous pouvez
              également configurer votre navigateur pour bloquer ou supprimer les cookies, mais
              certaines fonctionnalités du site pourraient ne plus être disponibles. La plupart
              des navigateurs proposent une option "Navigation privée" qui limite le dépôt de
              cookies persistants.
            </p>

            <h2>Article 6 — Durée de conservation des cookies</h2>
            <p>
              La durée de conservation maximale des cookies soumis à consentement est de
              treize mois à compter de leur dépôt sur votre terminal, conformément aux
              recommandations de la CNIL. Passé ce délai, votre consentement vous sera à nouveau
              demandé. Les cookies de session sont supprimés à la fermeture de votre navigateur.
            </p>

            <h2>Article 7 — Contact</h2>
            <p>
              Pour toute question relative à notre politique de cookies ou à vos droits, vous
              pouvez nous contacter à l'adresse : contact@paufc.fr ou consulter notre Politique
              de Confidentialité accessible depuis le pied de page du site.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
