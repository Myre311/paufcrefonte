import EmptyState from './EmptyState';

export default function DataTable({ columns, rows }) {
  if (!rows || rows.length === 0) {
    return <EmptyState title="Aucune donnee" description="Il n'y a rien a afficher pour l'instant." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" role="table">
        <thead>
          <tr className="bg-pau-night border-y border-white/10">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-sans font-medium whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="border-b border-white/5 hover:bg-white/[0.02]">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-white/80">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
