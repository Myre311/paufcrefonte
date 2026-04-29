import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Parametres' };

function InputRow({ label, id, defaultValue, type = 'text' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b border-white/5 last:border-0">
      <label htmlFor={id} className="text-sm text-white/60 sm:pt-1">{label}</label>
      <div className="sm:col-span-2">
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          readOnly
          className="w-full bg-pau-night border border-white/10 px-3 py-2 text-sm text-white/40 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-pau-primary border border-white/10 mb-4">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-xs uppercase tracking-widest text-white/40">{title}</h2>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}

export default function ParametresPage() {
  return (
    <>
      <PageHeader title="Parametres" subtitle="Configuration generale du site" />
      <div className="px-6 md:px-8 pb-8 max-w-3xl">
        <Section title="Identite club">
          <InputRow id="club-name" label="Nom du club" defaultValue="Pau FC" />
          <InputRow id="club-slogan" label="Slogan" defaultValue="Nouste Club" />
          <InputRow id="club-city" label="Ville" defaultValue="Pau" />
        </Section>

        <Section title="Coordonnees">
          <InputRow id="club-address" label="Adresse" defaultValue="Nouste Camp, Avenue du Loup, 64000 Pau" />
          <InputRow id="club-phone" label="Telephone" defaultValue="+33 5 59 00 00 00" />
          <InputRow id="club-email" label="Email contact" defaultValue="contact@paufc.fr" />
        </Section>

        <Section title="Reseaux sociaux">
          <InputRow id="social-twitter" label="Twitter / X" defaultValue="@PauFC" />
          <InputRow id="social-instagram" label="Instagram" defaultValue="@paufcofficial" />
          <InputRow id="social-facebook" label="Facebook" defaultValue="PauFCOfficiel" />
          <InputRow id="social-youtube" label="YouTube" defaultValue="PauFC" />
        </Section>

        <Section title="SEO">
          <InputRow id="seo-title" label="Titre par defaut" defaultValue="Pau FC — Club officiel" />
          <InputRow id="seo-description" label="Description" defaultValue="Site officiel du Pau Football Club, club professionnel de Ligue 2 BKT." />
        </Section>

        <Section title="Mode maintenance">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm text-white/60">Mode maintenance</p>
              <p className="text-xs text-white/30 mt-0.5">Affiche une page de maintenance sur le site public</p>
            </div>
            <input
              type="checkbox"
              id="maintenance-toggle"
              disabled
              className="w-5 h-5 cursor-not-allowed opacity-40"
              aria-label="Activer le mode maintenance"
            />
          </div>
        </Section>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            disabled
            className="bg-pau-yellow text-pau-night text-sm font-medium px-6 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </>
  );
}
