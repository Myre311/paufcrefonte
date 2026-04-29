export const dynamic = 'force-dynamic';

import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: {
    template: '%s — Admin Pau FC',
    default: 'Administration — Pau FC',
  },
};

export default function AdminLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pau-yellow focus:text-pau-night focus:text-sm focus:font-medium"
      >
        Aller au contenu principal
      </a>
      <AdminShell>{children}</AdminShell>
    </>
  );
}
