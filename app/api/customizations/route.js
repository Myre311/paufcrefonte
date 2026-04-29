// TODO: persist to JerseyCustomization once cart wiring is done
import { z } from 'zod';

const schema = z.object({
  kit: z.enum(['home', 'away', 'third']),
  name: z.string().min(1).max(12),
  number: z.number().int().min(1).max(99),
  size: z.enum(['S', 'M', 'L', 'XL', 'XXL']),
  quantity: z.number().int().min(1).max(10),
});

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { kit, name, number, size, quantity } = parsed.data;
  console.log('[api/customizations] stub received:', { kit, name, number, size, quantity });

  return Response.json({ ok: true, id: 'demo-' + Date.now() });
}
