import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Confirmation newsletter — Pau Football Club',
};

export default async function NewsletterConfirmPage({ params }) {
  const { token } = params;

  let confirmed = false;

  if (token) {
    try {
      const subscriber = await prisma.newsletterSubscriber.findFirst({
        where: { confirmedAt: null },
        orderBy: { createdAt: 'desc' },
      });

      if (subscriber) {
        await prisma.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: { confirmedAt: new Date() },
        });
        confirmed = true;
      }
    } catch {
      // Token invalide ou erreur DB
    }
  }

  return (
    <section className="bg-pau-white min-h-[60vh] flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">
        {confirmed ? (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
              NEWSLETTER
            </p>
            <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night mb-4">
              INSCRIPTION CONFIRMEE
            </h1>
            <p className="text-sm text-pau-night/60 font-sans leading-relaxed">
              Merci, votre inscription a la newsletter Pau FC est confirmee.
              Vous recevrez bientot nos actualites.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
              NEWSLETTER
            </p>
            <h1 className="font-display text-3xl uppercase text-pau-night mb-4">
              LIEN INVALIDE
            </h1>
            <p className="text-sm text-pau-night/60 font-sans leading-relaxed">
              Ce lien de confirmation est invalide ou a deja ete utilise.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
