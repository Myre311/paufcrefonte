import { z } from 'zod';

const schema = z.object({
  nom: z.string().min(1, 'Nom requis.'),
  email: z.string().email('Adresse e-mail invalide.'),
  sujet: z.string().min(1, 'Sujet requis.'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caracteres.'),
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

  try {
    // Brancher un mailer (Resend, Postmark...) en production
    console.log('[api/contact] message received:', parsed.data);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] error:', err);
    return Response.json({ ok: false, error: 'Erreur interne.' }, { status: 500 });
  }
}
