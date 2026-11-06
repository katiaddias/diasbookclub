import { QUESTOES } from './questions';

export const CABECALHOS = ['Nome', 'Pontos', ...QUESTOES.map((q) => q.texto)];

function celula(q, answers) {
  const v = answers?.[q.id];
  const rotulo = (valor) => q.opcoes.find((o) => o.valor === valor)?.label ?? valor;
  if (Array.isArray(v)) return v.map(rotulo).join(' | ');
  if (v) return rotulo(v);
  return '';
}

export function linhaDe(l) {
  return [l.nome, l.pontos, ...QUESTOES.map((q) => celula(q, l.answers))];
}

// CSV com ";" (padrão do Excel em português) e BOM para os acentos aparecerem certinho.
export function toCsv(linhas) {
  const esc = (c) => {
    let s = String(c ?? '');
    if (/^[=+\-@]/.test(s)) s = "'" + s; // evita fórmulas maliciosas em planilhas
    return `"${s.replace(/"/g, '""')}"`;
  };
  const todas = [CABECALHOS, ...linhas.map(linhaDe)];
  return '﻿' + todas.map((r) => r.map(esc).join(';')).join('\r\n');
}
