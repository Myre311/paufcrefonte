import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

const schema = z.object({
  email: z.string().email('Adresse e-mail invalide.'),
  source: z.string().optional().default('homepage'),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Corps de requete invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { email, source } = parsed.data;

  try {
    const token = randomUUID();

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        source,
        confirmedAt: null,
      },
      create: {
        email,
        source,
        confirmedAt: null,
      },
    });

    // Stub mailer : brancher Resend ou Postmark en production
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    console.log(`[newsletter] confirm link: ${siteUrl}/newsletter/confirm/${token}`);

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/newsletter] error:', err);
    return Response.json({ ok: false, error: 'Erreur interne.' }, { status: 500 });
  }
}
