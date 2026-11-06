import { garantirTabela } from '../../../lib/db';
import { sanitizeAnswers, calcularPontos } from '../../../lib/questions';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const nome = String(body?.nome || '').trim().replace(/\s+/g, ' ');
    if (nome.length < 2 || nome.length > 60) {
      return Response.json({ erro: 'Digite seu nome (2 a 60 letras).' }, { status: 400 });
    }

    const answers = sanitizeAnswers(body?.answers);
    const pontos = calcularPontos(answers); // sempre recalculado no servidor
    const nomeKey = nome.toLowerCase();

    const sql = await garantirTabela();
    await sql`
      INSERT INTO respostas (nome, nome_key, answers, pontos)
      VALUES (${nome}, ${nomeKey}, ${JSON.stringify(answers)}::jsonb, ${pontos})
      ON CONFLICT (nome_key)
      DO UPDATE SET nome = EXCLUDED.nome, answers = EXCLUDED.answers,
                    pontos = EXCLUDED.pontos, updated_at = now()
    `;

    const [{ posicao }] = await sql`
      SELECT COUNT(*)::int + 1 AS posicao FROM respostas WHERE pontos > ${pontos}
    `;
    const [{ total }] = await sql`SELECT COUNT(*)::int AS total FROM respostas`;

    return Response.json({ ok: true, pontos, posicao, total });
  } catch (e) {
    console.error(e);
    return Response.json({ erro: 'Não foi possível salvar agora. Tente de novo.' }, { status: 500 });
  }
}
