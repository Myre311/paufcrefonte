export const dynamic = 'force-dynamic';

import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Detail commande' };

export default function CommandeDetailPage({ params }) {
  return (
    <>
      <PageHeader title="Detail commande" subtitle={`Commande ${params.number}`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10 p-8 text-sm text-white/50">
          Page de detail a venir.
        </div>
      </div>
    </>
  );
}
