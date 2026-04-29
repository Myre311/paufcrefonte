import { InboxIcon } from 'lucide-react';

export default function EmptyState({ icon: Icon = InboxIcon, title = 'Aucun element', description, cta }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <Icon size={32} className="text-white/20 mb-4" aria-hidden="true" />
      <p className="text-sm uppercase tracking-widest text-white/60 mb-1">{title}</p>
      {description && <p className="text-xs text-white/40 max-w-xs">{description}</p>}
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}
