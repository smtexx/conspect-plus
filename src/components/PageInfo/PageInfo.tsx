interface I_Props {
  tables: [string, string][][];
}

export default function PageInfo({ tables }: I_Props) {
  return (
    <div className="d-flex column-gap-5 flex-wrap border-bottom pb-3 mb-4">
      {tables.map((rows, idx) => (
        <table key={idx}>
          <thead></thead>
          <tbody>
            {rows.map(([key, val], idx) => (
              <tr key={idx}>
                <td className="pe-2">{key}</td>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ))}
    </div>
  );
}
