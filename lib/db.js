import { neon } from '@neondatabase/serverless';

let sqlClient;
let pronto = false;

export function getSql() {
  if (!sqlClient) {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!url) throw new Error('DATABASE_URL não configurada. Veja o README.');
    sqlClient = neon(url);
  }
  return sqlClient;
}

// Cria a tabela automaticamente na primeira vez que o site é usado.
export async function garantirTabela() {
  if (pronto) return getSql();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS respostas (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      nome_key TEXT NOT NULL UNIQUE,
      answers JSONB NOT NULL,
      pontos INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  pronto = true;
  return sql;
}
