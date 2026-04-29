export const metadata = {
  title: 'Politique de Confidentialité (RGPD) — Pau Football Club',
  description: 'Politique de protection des données personnelles du Pau Football Club, conformément au RGPD.',
};

export default function RgpdPage() {
  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
            INFORMATIONS LÉGALES
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-sm">
            <p className="text-pau-night/50 text-xs mb-10">Dernière mise à jour : janvier 2026</p>

            <h2>Article 1 — Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données à caractère personnel collectées via
              le site www.paufc.fr est la société Pau Football Club SAS, dont le siège social
              est situé Stade Nouste Camp, Boulevard du Cami Salié, 64000 Pau. Pour toute
              question relative à la protection de vos données, vous pouvez nous contacter à
              l'adresse : contact@paufc.fr.
            </p>

            <h2>Article 2 — Données collectées et finalités</h2>
            <p>
              Nous collectons vos données dans les situations suivantes :
            </p>
            <ul>
              <li>
                <strong>Création de compte :</strong> nom, prénom, adresse email, mot de passe
                (haché), pour vous permettre d'accéder à votre espace client et de suivre vos
                commandes.
              </li>
              <li>
                <strong>Commande en ligne :</strong> coordonnées de livraison et de facturation,
                pour exécuter et suivre votre commande, émettre la facture et gérer les
                éventuels retours.
              </li>
              <li>
                <strong>Newsletter :</strong> adresse email et préférences de contenu, pour vous
                adresser des communications relatives au club avec votre consentement explicite.
              </li>
              <li>
                <strong>Formulaire de contact :</strong> nom, email, message, pour répondre à
                vos demandes d'information.
              </li>
            </ul>

            <h2>Article 3 — Base légale des traitements</h2>
            <p>
              Les traitements mis en œuvre reposent sur les bases légales suivantes : exécution
              du contrat (commandes), consentement (newsletter, cookies), intérêt légitime
              (sécurité du site, prévention des fraudes) et obligation légale (conservation des
              données comptables).
            </p>

            <h2>Article 4 — Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant la durée strictement nécessaire aux finalités
              pour lesquelles elles ont été collectées : données de compte actif pendant toute
              la durée de la relation contractuelle, données de commande pendant dix ans à des
              fins comptables, données de newsletter jusqu'à votre désinscription ou pendant
              trois ans à compter du dernier contact actif, données de formulaire de contact
              pendant deux ans.
            </p>

            <h2>Article 5 — Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos données : droit
              d'accès, de rectification, d'effacement (droit à l'oubli), de limitation du
              traitement, de portabilité, d'opposition au traitement. Pour exercer ces droits,
              adressez votre demande écrite à contact@paufc.fr en joignant une copie de votre
              pièce d'identité. Vous disposez également du droit d'introduire une réclamation
              auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              www.cnil.fr.
            </p>

            <h2>Article 6 — Sécurité des données</h2>
            <p>
              Le Pau Football Club met en œuvre les mesures techniques et organisationnelles
              appropriées pour protéger vos données contre toute perte, accès non autorisé,
              divulgation, altération ou destruction. Les paiements sont traités par Stripe,
              certifié PCI-DSS. Les mots de passe sont stockés sous forme hachée et salée.
              Les communications entre votre navigateur et nos serveurs sont chiffrées en TLS.
            </p>

            <h2>Article 7 — Transferts internationaux</h2>
            <p>
              Certains de nos prestataires techniques (hébergement, paiement) sont établis hors
              de l'Union européenne. Ces transferts sont encadrés par des garanties appropriées,
              notamment des clauses contractuelles types approuvées par la Commission européenne,
              conformément à l'article 46 du RGPD.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
