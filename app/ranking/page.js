import Link from 'next/link';
import { garantirTabela } from '../../lib/db';
import { nivelDe, PONTOS_MAXIMOS } from '../../lib/questions';
import { chaveValida, dataAbertura, rankingAberto, rotuloAbertura } from '../../lib/config';
import Contagem from './Contagem';

export const dynamic = 'force-dynamic';
export const metadata = { title: "Ranking • Dias' Book Club", robots: { index: false } };

export default async function Ranking({ searchParams }) {
  const { key } = await searchParams;
  const admin = chaveValida(key);
  const aberto = rankingAberto();

  // Antes da hora marcada, só quem tem a senha vê o ranking.
  if (!admin && !aberto) {
    return (
      <main className="wrap">
        <div className="hero">
          <img className="logo pequeno" src="/logo.png" alt="Dias' Book Club" />
          <div className="big">🔒</div>
          <h1>O ranking é segredo!</h1>
          <p>O resultado será revelado no encontro, em <b>{rotuloAbertura()}</b>.</p>
        </div>
        <div className="card resultado">
          <div className="sub">Faltam</div>
          <Contagem alvo={dataAbertura().toISOString()} />
          <p className="sub">Quem será a campeã do clube? 👀</p>
        </div>
        <div className="links">
          <Link className="btn ghost" href="/">Voltar ao formulário</Link>
        </div>
      </main>
    );
  }

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
        <img className="logo pequeno" src="/logo.png" alt="Dias' Book Club" />
        <div className="big">🏆</div>
        <h1>Ranking do Clube</h1>
        <p>Máximo possível: {PONTOS_MAXIMOS} pontos</p>
      </div>

      {admin && !aberto && (
        <div className="card aviso">
          👀 <b>Visão privada.</b> As participantes só verão esta página em {rotuloAbertura()}.
        </div>
      )}

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
