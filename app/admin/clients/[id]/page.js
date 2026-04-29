export const dynamic = 'force-dynamic';

import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Detail client' };

export default function ClientDetailPage({ params }) {
  return (
    <>
      <PageHeader title="Detail client" subtitle={`ID : ${params.id}`} />
      <div className="px-6 md:px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-pau-primary border border-white/10 p-6">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Informations</p>
          <p className="text-sm text-white/50">Detail a venir.</p>
        </div>
        <div className="bg-pau-primary border border-white/10 p-6">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Commandes</p>
          <p className="text-sm text-white/50">Detail a venir.</p>
        </div>
      </div>
    </>
  );
}
