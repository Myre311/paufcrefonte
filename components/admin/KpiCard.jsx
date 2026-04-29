export default function KpiCard({ label, value, delta, icon: Icon }) {
  const isPositive = delta && delta.startsWith('+');
  const isNegative = delta && delta.startsWith('-');

  return (
    <div className="bg-pau-primary border border-white/10 p-6">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
        {Icon && <Icon size={18} className="text-white/30" aria-hidden="true" />}
      </div>
      <p className="mt-3 font-display text-3xl text-pau-white">{value}</p>
      {delta && (
        <p
          className={[
            'mt-1 text-xs',
            isPositive ? 'text-pau-yellow' : isNegative ? 'text-red-400' : 'text-white/50',
          ].join(' ')}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
