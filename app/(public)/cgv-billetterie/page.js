export const metadata = {
  title: 'CGV Billetterie — Pau Football Club',
  description: 'Conditions générales de vente de la billetterie du Pau Football Club.',
};

export default function CgvBilletterieePage() {
  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
            INFORMATIONS LÉGALES
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night">
            CGV BILLETTERIE
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-sm">
            <p className="text-pau-night/50 text-xs mb-10">Dernière mise à jour : janvier 2026</p>

            <h2>Article 1 — Identification de l'organisateur</h2>
            <p>
              La vente de billets pour les matchs à domicile du Pau Football Club est assurée
              par la société Pau Football Club SAS, dont le siège social est situé Stade Nouste
              Camp, Boulevard du Cami Salié, 64000 Pau, ci-après désignée « l'Organisateur ».
              Toute commande de billets implique l'acceptation pleine et entière des présentes
              conditions générales de vente.
            </p>

            <h2>Article 2 — Achat de billets</h2>
            <p>
              La vente de billets s'effectue exclusivement en ligne via le site www.paufc.fr ou
              auprès des points de vente physiques agréés. Chaque billet est nominatif ou
              numéroté selon la catégorie de place. L'achat d'un billet vaut acceptation du
              règlement intérieur du stade Nouste Camp et des conditions générales d'utilisation
              de l'enceinte sportive.
            </p>

            <h2>Article 3 — Tarifs et paiement</h2>
            <p>
              Les tarifs sont affichés en euros TTC sur le site au moment de l'achat. Le paiement
              est exigible immédiatement et s'effectue par carte bancaire via la plateforme
              sécurisée Stripe. Aucun escompte n'est accordé en cas de paiement anticipé. Les
              tarifs réduits (enfants, seniors, personnes en situation de handicap) sont soumis
              à présentation d'un justificatif à l'entrée du stade le jour de l'événement.
            </p>

            <h2>Article 4 — Livraison des billets</h2>
            <p>
              Les billets sont délivrés sous forme électronique et envoyés à l'adresse email
              renseignée lors de la commande. Le Client est responsable de la conservation et
              de la présentation de son billet à l'entrée du stade. En cas de perte, le
              remplacement est soumis à la vérification de l'identité de l'acheteur initial et
              peut entraîner des frais de gestion.
            </p>

            <h2>Article 5 — Politique d'annulation et de remboursement</h2>
            <p>
              Conformément à l'article L.221-28 du Code de la consommation, les billets de
              spectacles et d'événements sportifs sont exclus du droit de rétractation. En cas
              d'annulation du match par l'Organisateur, les billets sont remboursés intégralement.
              En cas de report, les billets restent valables pour la nouvelle date. Si le Client
              ne peut assister à la rencontre reportée, il dispose d'un délai de quinze jours
              à compter de l'annonce du report pour demander le remboursement.
            </p>

            <h2>Article 6 — Comportement dans l'enceinte</h2>
            <p>
              Tout titulaire d'un billet s'engage à respecter le règlement intérieur du stade
              Nouste Camp. L"Organisateur se réserve le droit de refuser l'accès ou d'expulser
              sans remboursement toute personne dont le comportement porterait atteinte à la
              sécurité ou à la tranquillité des autres spectateurs, ou contreviendrait aux
              dispositions légales en vigueur applicables aux enceintes sportives.
            </p>

            <h2>Article 7 — Responsabilité de l'Organisateur</h2>
            <p>
              L'Organisateur ne saurait être tenu responsable des préjudices indirects résultant
              de l'annulation ou du report d'une rencontre pour des raisons indépendantes de sa
              volonté (décision des autorités sportives ou publiques, force majeure). La
              responsabilité de l'Organisateur est limitée au montant du billet acheté par le
              Client.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
