/* Renders structured article content nodes into styled React elements */
export default function ArticleRenderer({ nodes }) {
  return (
    <div className="article-body">
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'h1':
            return <h1 key={i} className="art-h1">{node.text}</h1>
          case 'h2':
            return <h2 key={i} className="art-h2">{node.text}</h2>
          case 'h3':
            return <h3 key={i} className="art-h3">{node.text}</h3>
          case 'body':
            return <p key={i} className="art-body">{node.text}</p>
          case 'bullet':
            return (
              <ul key={i} className="art-list art-list--bullet">
                {node.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            )
          case 'numbered':
            return (
              <ol key={i} className="art-list art-list--numbered">
                {node.items.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            )
          case 'table':
            return (
              <div key={i} className="art-table-wrap">
                {node.label && <p className="art-table-label">{node.label}</p>}
                <table className="art-table">
                  {node.headers && node.headers.some(h => h) && (
                    <thead>
                      <tr>{node.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                    </thead>
                  )}
                  <tbody>
                    {node.rows.map((row, j) => (
                      <tr key={j}>
                        {row.filter(Boolean).map((cell, k) => <td key={k}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'stat-callout':
            return (
              <div key={i} className="art-stat-callouts">
                {node.stats.map((stat, j) => (
                  <div key={j} className="art-stat-item">
                    <div className="art-stat-number">{stat.value}</div>
                    <div className="art-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
