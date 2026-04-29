import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/animations/Reveal';

export const metadata = {
  title: 'Contact — Pau Football Club',
  description: 'Contactez le Pau Football Club : billetterie, boutique, partenariat, presse et renseignements généraux.',
};

const SUBJECT_MAP = {
  partenariat: 'partenariat',
  presse: 'presse',
  billetterie: 'billetterie',
  boutique: 'boutique',
  academie: 'academie',
};

export default function ContactPage({ searchParams }) {
  const sujet = SUBJECT_MAP[searchParams?.sujet] ?? '';

  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-accueil.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            PAU FC
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            CONTACT
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-20">
            <div className="md:col-span-3">
              <h2 className="font-display text-xl uppercase text-pau-night mb-8">
                NOUS ÉCRIRE
              </h2>
              <ContactForm defaultSubject={sujet} />
            </div>

            <aside className="md:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                  ADRESSE
                </p>
                <address className="not-italic text-sm text-pau-night/70 leading-relaxed">
                  Stade Nouste Camp<br />
                  Boulevard du Cami Salié<br />
                  64000 Pau
                </address>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                  EMAIL
                </p>
                <a
                  href="mailto:contact@paufc.fr"
                  className="text-sm text-pau-night/70 hover:opacity-70 transition-opacity duration-200 min-h-[44px] flex items-center break-all"
                >
                  contact@paufc.fr
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                  TÉLÉPHONE
                </p>
                <a
                  href="tel:+33559275030"
                  className="text-sm text-pau-night/70 hover:opacity-70 transition-opacity duration-200 min-h-[44px] flex items-center"
                >
                  +33 5 59 27 50 30
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                  RÉSEAUX
                </p>
                <nav aria-label="Réseaux sociaux Pau FC" className="flex flex-wrap items-center gap-2 text-sm text-pau-night/60">
                  <a
                    href="https://instagram.com/paufootballclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity duration-200"
                  >
                    INSTAGRAM
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://facebook.com/paufc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity duration-200"
                  >
                    FACEBOOK
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://x.com/paufc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity duration-200"
                  >
                    X
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://youtube.com/@paufc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity duration-200"
                  >
                    YOUTUBE
                  </a>
                </nav>
              </div>
            </aside>
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}
