import { garantirTabela } from '../../../lib/db';
import { chaveValida } from '../../../lib/config';
import { toCsv } from '../../../lib/export';

export const dynamic = 'force-dynamic';

// Baixar em /admin/csv?key=SUA_CHAVE
export async function GET(req) {
  const key = new URL(req.url).searchParams.get('key');
  if (!chaveValida(key)) {
    return new Response('Acesso negado', { status: 401 });
  }

  const sql = await garantirTabela();
  const linhas = await sql`SELECT nome, answers, pontos FROM respostas ORDER BY pontos DESC, created_at ASC`;

  return new Response(toCsv(linhas), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="respostas-clube-do-livro.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
