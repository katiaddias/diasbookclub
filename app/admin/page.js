import { garantirTabela } from '../../lib/db';
import { QUESTOES } from '../../lib/questions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Painel • Clube do Livro', robots: { index: false } };

// Acesse em /admin?key=SUA_CHAVE (a chave é a variável ADMIN_KEY na Vercel).
export default async function Admin({ searchParams }) {
  const { key } = await searchParams;
  const esperado = process.env.ADMIN_KEY;

  if (!esperado || key !== esperado) {
    return (
      <main className="wrap">
        <div className="card">
          <h2>🔒 Área do clube</h2>
          <p className="sub">
            Acesse com <code>/admin?key=SUA_CHAVE</code>. Defina a chave na variável de ambiente <code>ADMIN_KEY</code>.
          </p>
        </div>
      </main>
    );
  }

  const sql = await garantirTabela();
  const linhas = await sql`SELECT nome, answers, pontos FROM respostas`;

  const media = linhas.length ? (linhas.reduce((s, l) => s + l.pontos, 0) / linhas.length).toFixed(1) : 0;

  function contar(id) {
    const q = QUESTOES.find((x) => x.id === id);
    const cont = {};
    for (const l of linhas) {
      const v = l.answers?.[id];
      const lista = Array.isArray(v) ? v : v ? [v] : [];
      for (const item of lista) cont[item] = (cont[item] || 0) + 1;
    }
    return Object.entries(cont)
      .map(([valor, n]) => ({ label: q.opcoes.find((o) => o.valor === valor)?.label ?? valor, n }))
      .sort((a, b) => b.n - a.n);
  }

  const blocos = [
    ['🏆 Melhor livro', 'melhor_livro'],
    ['👎 Pior livro', 'pior_livro'],
    ['🌪️ Maior reviravolta', 'reviravolta'],
    ['😡 Mais raiva', 'raiva'],
    ['🥹 Surpreendeu positivamente', 'surpresa_gostar'],
    ['🎬 Merece adaptação', 'adaptacao'],
    ['☕ Melhor encontro', 'melhor_encontro'],
    ['📚 Livros mais lidos', 'livros_lidos'],
  ];

  return (
    <main className="wrap">
      <div className="hero">
        <div className="big">📊</div>
        <h1>Painel do Clube</h1>
        <p>{linhas.length} resposta(s) · média de {media} pontos</p>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {blocos.map(([titulo, id]) => {
          const dados = contar(id).slice(0, id === 'livros_lidos' ? 15 : 5);
          return (
            <div className="card" key={id}>
              <h3>{titulo}</h3>
              {dados.length === 0 ? (
                <span className="sub">Sem respostas ainda.</span>
              ) : (
                <table className="tabela">
                  <tbody>
                    {dados.map((d) => (
                      <tr key={d.label}>
                        <td>{d.label}</td>
                        <td>{d.n}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
