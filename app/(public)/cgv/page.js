export const metadata = {
  title: 'Conditions Générales de Vente — Pau Football Club',
  description: 'Conditions générales de vente de la boutique officielle du Pau FC.',
};

export default function CgvPage() {
  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
            INFORMATIONS LÉGALES
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night">
            CONDITIONS GÉNÉRALES DE VENTE
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-sm">
            <p className="text-pau-night/50 text-xs mb-10">Dernière mise à jour : janvier 2026</p>

            <h2>Article 1 — Identification du vendeur</h2>
            <p>
              Les présentes conditions générales de vente (CGV) régissent les relations
              contractuelles entre la société Pau Football Club, SAS au capital de 500 000 euros,
              dont le siège social est situé Stade Nouste Camp, Boulevard du Cami Salié,
              64000 Pau, immatriculée au Registre du Commerce et des Sociétés de Pau sous le
              numéro RCS XXX XXX XXX, numéro de TVA intracommunautaire FR XX XXX XXX XXX,
              ci-après désigné « le Vendeur », et toute personne physique majeure ou morale
              effectuant un achat via la boutique en ligne accessible à l'adresse
              www.paufc.fr/boutique, ci-après désigné « le Client ».
            </p>

            <h2>Article 2 — Objet et champ d'application</h2>
            <p>
              Les présentes CGV ont pour objet de définir les droits et obligations des parties
              dans le cadre de la vente en ligne de produits proposés par le Vendeur. Elles
              s'appliquent à l'exclusion de toutes autres conditions. Toute commande passée sur
              le site implique l'acceptation pleine et entière des présentes CGV. Le Vendeur se
              réserve le droit de modifier les CGV à tout moment ; les conditions applicables sont
              celles en vigueur à la date de la commande.
            </p>

            <h2>Article 3 — Produits et tarifs</h2>
            <p>
              Les produits proposés à la vente sont ceux décrits sur le site au moment de la
              consultation par le Client. Les photographies illustrant les produits sont
              contractuelles sous réserve de variations liées aux conditions d'affichage. Les
              prix sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison.
              Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant précisé
              que les produits seront facturés sur la base des tarifs en vigueur au moment de
              la validation de la commande.
            </p>

            <h2>Article 4 — Commande et formation du contrat</h2>
            <p>
              Toute commande suppose la création d'un compte client ou la commande en tant
              qu'invité. Le Client sélectionne les produits souhaités, les ajoute à son panier
              et valide sa commande après vérification du récapitulatif. La commande est
              définitivement enregistrée après confirmation du paiement. Un email de confirmation
              reprenant le détail de la commande et son numéro de référence est adressé au Client
              dans les meilleurs délais. Le Vendeur se réserve le droit d'annuler ou de refuser
              toute commande passée par un Client avec lequel il existerait un litige relatif au
              paiement d'une commande antérieure.
            </p>

            <h2>Article 5 — Paiement</h2>
            <p>
              Le paiement est exigible immédiatement à la commande. Il s'effectue en ligne par
              carte bancaire (Visa, Mastercard, American Express) via la plateforme sécurisée
              Stripe. Les données bancaires du Client sont transmises cryptées et ne transitent
              pas par les serveurs du Vendeur. En cas de refus d'autorisation de paiement par
              les organismes bancaires, la commande est automatiquement annulée.
            </p>

            <h2>Article 6 — Livraison</h2>
            <p>
              Les produits sont livrés à l'adresse indiquée par le Client lors de la commande.
              Les délais de livraison sont donnés à titre indicatif ; tout retard ne peut donner
              lieu à annulation de commande ou à dommages et intérêts. Les risques liés au
              transport sont à la charge du Client dès la remise des produits au transporteur.
              En cas de colis abîmé ou manquant, le Client doit émettre des réserves explicites
              auprès du transporteur dans les trois jours suivant la réception.
            </p>

            <h2>Article 7 — Droit de rétractation</h2>
            <p>
              Conformément aux articles L.221-18 et suivants du Code de la consommation, le
              Client dispose d'un délai de quatorze jours calendaires à compter de la réception
              des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs
              ni à payer de pénalités. Le Client doit retourner les produits dans leur état
              d'origine, non portés et avec leurs étiquettes, accompagnés du bon de retour. Les
              frais de retour sont à la charge du Client sauf erreur du Vendeur. Le remboursement
              sera effectué dans les quatorze jours suivant la réception du retour.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
