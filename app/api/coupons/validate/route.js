import { z } from 'zod';

const schema = z.object({
  code: z.string().min(1, 'Code requis'),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Corps de requête invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'Code manquant.' },
      { status: 422 }
    );
  }

  const { code } = parsed.data;

  // Stub : accepte tous les codes, retourne 10 EUR de réduction forfaitaire
  return Response.json({ ok: true, code: code.toUpperCase(), discountCents: 1000 });
}
