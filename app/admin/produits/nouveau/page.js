import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Nouveau produit' };

export default function NouveauProduitPage() {
  return (
    <>
      <PageHeader title="Nouveau produit" subtitle="Formulaire de creation" />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10 p-8 text-sm text-white/50">
          Formulaire a venir.
        </div>
      </div>
    </>
  );
}
