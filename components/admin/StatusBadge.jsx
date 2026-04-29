const STATUS_CLASSES = {
  paid: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  shipped: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  delivered: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  active: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  published: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  pending: 'bg-white/10 text-white/80 border border-white/20',
  scheduled: 'bg-white/10 text-white/80 border border-white/20',
  preparing: 'bg-white/10 text-white/80 border border-white/20',
  cancelled: 'bg-red-500/15 text-red-400 border border-red-500/30',
  failed: 'bg-red-500/15 text-red-400 border border-red-500/30',
  refunded: 'bg-red-500/15 text-red-400 border border-red-500/30',
};

const STATUS_LABELS = {
  paid: 'Paye',
  shipped: 'Expedie',
  delivered: 'Livre',
  active: 'Actif',
  published: 'Publie',
  pending: 'En attente',
  scheduled: 'Programme',
  preparing: 'En preparation',
  cancelled: 'Annule',
  failed: 'Echoue',
  refunded: 'Rembourse',
  draft: 'Brouillon',
  archived: 'Archive',
  live: 'En direct',
  played: 'Joue',
  postponed: 'Reporte',
};

export default function StatusBadge({ status }) {
  const classes = STATUS_CLASSES[status] ?? 'bg-white/5 text-white/60 border border-white/10';
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider font-sans ${classes}`}>
      {label}
    </span>
  );
}
