export async function POST() {
  return Response.json(
    { error: 'Checkout en cours de configuration.' },
    { status: 503 }
  );
}
