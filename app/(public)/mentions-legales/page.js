export const metadata = {
  title: 'Mentions Légales — Pau Football Club',
  description: 'Mentions légales du site officiel du Pau Football Club.',
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
            INFORMATIONS LÉGALES
          </p>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night">
            MENTIONS LÉGALES
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-sm">
            <p className="text-pau-night/50 text-xs mb-10">Dernière mise à jour : janvier 2026</p>

            <h2>Article 1 — Éditeur du site</h2>
            <p>
              Le site www.paufc.fr est édité par la société Pau Football Club, SAS au capital
              de 500 000 euros, dont le siège social est situé Stade Nouste Camp,
              Boulevard du Cami Salié, 64000 Pau. Immatriculée au Registre du Commerce et des
              Sociétés de Pau sous le numéro RCS XXX XXX XXX. Numéro de TVA intracommunautaire :
              FR XX XXX XXX XXX. Directeur de la publication : le Président de la SAS Pau
              Football Club. Contact : contact@paufc.fr — +33 5 59 27 50 30.
            </p>

            <h2>Article 2 — Hébergeur</h2>
            <p>
              Le site est hébergé par la société Vercel Inc., dont le siège social est situé
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données sont stockées
              via Supabase (DigitalOcean LLC, 101 Avenue of the Americas, New York, NY 10013,
              États-Unis). Les transferts de données vers des pays tiers sont encadrés par des
              clauses contractuelles types conformes au RGPD.
            </p>

            <h2>Article 3 — Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant ce site (textes, images, logos, chartes
              graphiques, illustrations, structure) est protégé par le droit d'auteur et la
              législation sur la propriété intellectuelle. Toute reproduction, représentation,
              modification, publication ou adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation
              écrite préalable du Pau Football Club.
            </p>

            <h2>Article 4 — Limitation de responsabilité</h2>
            <p>
              Le Pau Football Club s'efforce d'assurer l'exactitude et la mise à jour des
              informations diffusées sur le site, dont il se réserve le droit de corriger le
              contenu à tout moment sans préavis. Toutefois, la responsabilité du Pau Football
              Club ne pourra être engagée en cas d'inexactitude ou d'omission portant sur des
              informations disponibles sur le site. Le site peut contenir des liens hypertextes
              vers des sites tiers ; le Pau Football Club ne saurait être tenu responsable du
              contenu de ces sites.
            </p>

            <h2>Article 5 — Données personnelles</h2>
            <p>
              Les informations collectées via les formulaires du site font l'objet d'un
              traitement informatique dont le responsable est le Pau Football Club. Conformément
              au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous
              disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de
              vos données, ainsi que d'un droit d'opposition et de limitation du traitement.
              Pour exercer ces droits, adressez votre demande à : contact@paufc.fr. Pour plus
              d'informations, consultez notre Politique de Confidentialité.
            </p>

            <h2>Article 6 — Loi applicable et juridiction</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de
              litige, et après tentative de résolution amiable, les tribunaux compétents du
              ressort de la Cour d'appel de Pau seront seuls compétents.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
