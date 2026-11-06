import Link from 'next/link';
import { garantirTabela } from '../../lib/db';
import { nivelDe, PONTOS_MAXIMOS } from '../../lib/questions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ranking • Clube do Livro' };

export default async function Ranking() {
  let linhas = [];
  let erro = null;
  try {
    const sql = await garantirTabela();
    linhas = await sql`SELECT nome, pontos FROM respostas ORDER BY pontos DESC, created_at ASC LIMIT 100`;
  } catch (e) {
    erro = 'Não foi possível carregar o ranking agora.';
  }

  const medalha = (i) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}º`);

  return (
    <main className="wrap">
      <div className="hero">
        <div className="big">🏆</div>
        <h1>Ranking do Clube</h1>
        <p>Máximo possível: {PONTOS_MAXIMOS} pontos</p>
      </div>

      {erro && <div className="card erro">{erro}</div>}
      {!erro && linhas.length === 0 && <div className="card">Ninguém respondeu ainda. Seja a primeira! 🚀</div>}

      <ol className="rank">
        {linhas.map((l, i) => {
          const nv = nivelDe(l.pontos);
          return (
            <li key={l.nome} className={i === 0 ? 'top1' : ''}>
              <div className="pos">{medalha(i)}</div>
              <div className="nome">
                {l.nome}
                <span className="nv">{nv.emoji} {nv.nome}</span>
              </div>
              <div className="pts">{l.pontos} pts</div>
            </li>
          );
        })}
      </ol>

      <div className="links">
        <Link className="btn" href="/">Responder o formulário</Link>
      </div>
    </main>
  );
}
