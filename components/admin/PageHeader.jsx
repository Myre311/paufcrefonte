export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 px-6 md:px-8 pt-8 pb-4">
      <div>
        <h1 className="font-display text-3xl uppercase text-pau-white">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-white/60">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
