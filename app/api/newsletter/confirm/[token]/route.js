import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function GET(request, { params }) {
  const { token } = params;

  if (!token) {
    redirect('/?newsletter=invalid');
  }

  try {
    // Le token est stocké hors de la DB dans cette version stub.
    // En production : créer un champ `confirmToken` sur le modèle
    // et le persister lors du POST /api/newsletter.
    // Pour la démo, on cherche le subscriber le plus récent sans confirmedAt.
    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: { confirmedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!subscriber) {
      redirect('/?newsletter=invalid');
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: { confirmedAt: new Date() },
    });

    redirect('/?newsletter=confirmed');
  } catch (err) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
    console.error('[api/newsletter/confirm] error:', err);
    redirect('/?newsletter=invalid');
  }
}
