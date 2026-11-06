// Quando o ranking fica visível para todas: 13/12/2026 às 15h30 (horário de Brasília, UTC-3).
// Para mudar sem mexer no código, crie a variável RANKING_ABRE_EM na Vercel
// com um valor como 2026-12-13T15:30:00-03:00
export const ABERTURA_PADRAO = '2026-12-13T15:30:00-03:00';

export function dataAbertura() {
  const d = new Date(process.env.RANKING_ABRE_EM || ABERTURA_PADRAO);
  return isNaN(d.getTime()) ? new Date(ABERTURA_PADRAO) : d;
}

export function rankingAberto() {
  return Date.now() >= dataAbertura().getTime();
}

// Ex.: "13 de dezembro às 15:30"
export function rotuloAbertura() {
  const tz = 'America/Sao_Paulo';
  const d = dataAbertura();
  const dia = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: tz });
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  return `${dia} às ${hora}`;
}

// Chave do painel e do ranking privado (variável ADMIN_KEY na Vercel).
export function chaveValida(key) {
  const esperado = process.env.ADMIN_KEY;
  return Boolean(esperado) && typeof key === 'string' && key === esperado;
}
