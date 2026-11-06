// Perguntas, opções e pontuação do formulário do clube do livro.
// Este arquivo é usado tanto no navegador (pontos ao vivo) quanto no servidor
// (cálculo oficial, para ninguém conseguir "hackear" a própria pontuação).

export const LIVROS = [
  'Apostando no amor',
  'Patinando no amor',
  'A guarda-costas',
  'Mil vezes amor',
  'Assistente do vilão',
  'Haters do amor',
  'Amor na prática',
  'A seleção',
  'Powerless',
  'Um beijo de inverno na livraria dos corações solitários',
  'Deixa nevar',
  'Nunca minta',
  'Não conte a ninguém',
  'O acidente',
  'E não sobrou nenhum',
  'Querida Debbie',
  'Assassinato no expresso do oriente',
  'Paciente silenciosa',
  'O massacre da família Hope',
  'Jantar secreto',
  'Um casal perfeito',
  'Cartas à igreja',
  'Isto é filtro solar',
  'Inteligência Humilhada',
  'Cartas de um diabo a seu aprendiz',
  'Legalistas em recuperação',
  'Verdadeira espiritualidade',
  'O jesus que as mulheres viram',
  'Discipulado começa com contemplação',
  'O natal escondido',
  'O Deus pródigo',
  'A hora da estrela',
  'A moreninha',
  'A natureza da mordida',
  'O avesso da pele',
  'A cabeça do Santo',
  'Oração para desaparecer',
  'A pequena coreografia do adeus',
  'Ensaios de despedida',
  'Quando',
  'Quarto do despejo',
  'No final daquele dia',
  'A guardiã de pedras',
  'Memórias em um papel timbrado',
  'Em todos os sentido',
];

// Na sua lista, algumas perguntas não incluem os livros religiosos/não ficção
// (índices 21 a 30) e outras também não incluem os dois primeiros.
const SEM_NAO_FICCAO = [...LIVROS.slice(0, 21), ...LIVROS.slice(31)];
const SEM_NAO_FICCAO_E_2_PRIMEIROS = SEM_NAO_FICCAO.slice(2);

const ENCONTROS = ['Cassia', 'Vírgula café', "Riro's Café", 'Arraiá literário', 'Picnic', 'Tarde do suspense', 'Justo Icaraí', 'Armazém Pub'];

const numeros = (n, emoji) =>
  Array.from({ length: n }, (_, i) => ({ valor: String(i + 1), label: String(i + 1), pontos: i + 1 }));

const simNao = (pontosSim) => [
  { valor: 'sim', label: 'Sim', pontos: pontosSim },
  { valor: 'nao', label: 'Não', pontos: 0 },
];

const umPonto = (lista) => lista.map((l) => ({ valor: l, label: l, pontos: 1 }));

export const QUESTOES = [
  {
    id: 'presenciais',
    emoji: '🤝',
    tipo: 'single',
    secao: 'Encontros',
    texto: 'De quantos encontros presenciais do clube você participou?',
    dica: '1 ponto por encontro',
    opcoes: numeros(8),
  },
  {
    id: 'online',
    emoji: '💻',
    tipo: 'single',
    secao: 'Encontros',
    texto: 'De quantos encontros on-line você participou?',
    dica: '1 ponto por encontro',
    opcoes: numeros(3),
  },
  {
    id: 'melhor_encontro',
    emoji: '☕',
    tipo: 'single',
    secao: 'Encontros',
    texto: 'Qual o melhor encontro que você participou?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(ENCONTROS),
  },
  {
    id: 'livros_lidos',
    emoji: '📚',
    tipo: 'multi',
    secao: 'Leituras',
    texto: 'Quais livros você leu junto com o clube? Aqui não vale os que você já tinha lido, em?!',
    dica: '1 ponto por livro marcado',
    opcoes: umPonto(LIVROS),
  },
  {
    id: 'genero_novo',
    emoji: '🧭',
    tipo: 'single',
    secao: 'Leituras',
    texto: 'Você leu algum livro de um gênero que normalmente não escolheria por influência do clube?',
    dica: 'Sim vale 2 pontos',
    opcoes: simNao(2),
  },
  {
    id: 'varios_grupos',
    emoji: '👯',
    tipo: 'single',
    secao: 'Leituras',
    texto: 'Você já participou de mais de um grupo de leitura simultaneamente?',
    dica: 'Sim vale 2 pontos',
    opcoes: simNao(2),
  },
  {
    id: 'indicou',
    emoji: '💌',
    tipo: 'single',
    secao: 'Comunidade',
    texto: 'Você já indicou um livro para alguma integrante?',
    dica: 'Sim vale 1 ponto',
    opcoes: simNao(1),
  },
  {
    id: 'leu_indicado',
    emoji: '🔖',
    tipo: 'single',
    secao: 'Comunidade',
    texto: 'Você já leu um livro indicado por outra integrante do clube?',
    dica: 'Sim vale 1 ponto',
    opcoes: simNao(1),
  },
  {
    id: 'convidou',
    emoji: '🎟️',
    tipo: 'single',
    secao: 'Comunidade',
    texto: 'Você já convidou uma amiga para participar do clube e ela entrou?',
    dica: 'Sim vale 2 pontos',
    opcoes: simNao(2),
  },
  {
    id: 'melhor_livro',
    emoji: '🏆',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Melhor livro que lemos no clube?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(LIVROS),
  },
  {
    id: 'pior_livro',
    emoji: '👎',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Pior livro que lemos no clube?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(LIVROS),
  },
  {
    id: 'reviravolta',
    emoji: '🌪️',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Qual livro teve a maior reviravolta ou te deixou mais surpresa?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(SEM_NAO_FICCAO),
  },
  {
    id: 'raiva',
    emoji: '😡',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Qual livro mais te fez passar raiva?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(SEM_NAO_FICCAO_E_2_PRIMEIROS),
  },
  {
    id: 'surpresa_gostar',
    emoji: '🥹',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Qual livro você não esperava gostar tanto?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(SEM_NAO_FICCAO_E_2_PRIMEIROS),
  },
  {
    id: 'adaptacao',
    emoji: '🎬',
    tipo: 'single',
    secao: 'Hora da opinião',
    texto: 'Qual livro você gostaria de ver adaptado para o cinema ou TV?',
    dica: 'Qualquer resposta vale 1 ponto',
    opcoes: umPonto(SEM_NAO_FICCAO_E_2_PRIMEIROS),
  },
];

// ---------- Pontuação ----------

// Limpa as respostas: só aceita valores que existem nas opções.
export function sanitizeAnswers(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const q of QUESTOES) {
    const validos = new Set(q.opcoes.map((o) => o.valor));
    const v = raw[q.id];
    if (q.tipo === 'multi') {
      if (Array.isArray(v)) out[q.id] = [...new Set(v.filter((x) => validos.has(x)))];
    } else if (typeof v === 'string' && validos.has(v)) {
      out[q.id] = v;
    }
  }
  return out;
}

export function pontosDaQuestao(q, answers) {
  const v = answers?.[q.id];
  if (q.tipo === 'multi') {
    if (!Array.isArray(v)) return 0;
    return q.opcoes.filter((o) => v.includes(o.valor)).reduce((s, o) => s + o.pontos, 0);
  }
  const op = q.opcoes.find((o) => o.valor === v);
  return op ? op.pontos : 0;
}

export function calcularPontos(answers) {
  return QUESTOES.reduce((s, q) => s + pontosDaQuestao(q, answers), 0);
}

export const PONTOS_MAXIMOS = QUESTOES.reduce((s, q) => {
  if (q.tipo === 'multi') return s + q.opcoes.reduce((a, o) => a + o.pontos, 0);
  return s + Math.max(...q.opcoes.map((o) => o.pontos));
}, 0);

// ---------- Níveis e conquistas ----------

export const NIVEIS = [
  { min: 0, nome: 'Leitora Novata', emoji: '🌱' },
  { min: 0.2, nome: 'Leitora Curiosa', emoji: '📖' },
  { min: 0.4, nome: 'Devoradora de Páginas', emoji: '🔥' },
  { min: 0.6, nome: 'Rainha do Clube', emoji: '👑' },
  { min: 0.8, nome: 'Lenda Literária', emoji: '🌟' },
];

export function nivelDe(pontos) {
  const pct = pontos / PONTOS_MAXIMOS;
  let atual = NIVEIS[0];
  let proximo = null;
  for (let i = 0; i < NIVEIS.length; i++) {
    if (pct >= NIVEIS[i].min) {
      atual = NIVEIS[i];
      proximo = NIVEIS[i + 1] || null;
    }
  }
  return {
    ...atual,
    proximo: proximo ? { ...proximo, faltam: Math.ceil(proximo.min * PONTOS_MAXIMOS) - pontos } : null,
  };
}

export function conquistasDe(a) {
  const lidos = Array.isArray(a.livros_lidos) ? a.livros_lidos.length : 0;
  const lista = [
    { ok: a.presenciais === '8', emoji: '🏅', nome: 'Presença Total', desc: 'Foi a todos os 8 encontros presenciais' },
    { ok: a.online === '3', emoji: '📡', nome: 'Sempre Conectada', desc: 'Participou dos 3 encontros on-line' },
    { ok: a.genero_novo === 'sim', emoji: '🧭', nome: 'Exploradora de Gêneros', desc: 'Saiu da zona de conforto' },
    { ok: a.varios_grupos === 'sim', emoji: '👯', nome: 'Multiclubes', desc: 'Participa de mais de um grupo de leitura' },
    { ok: a.indicou === 'sim', emoji: '💌', nome: 'Indicadora Oficial', desc: 'Indicou livro para o clube' },
    { ok: a.leu_indicado === 'sim', emoji: '🔖', nome: 'Aberta a Sugestões', desc: 'Leu uma indicação de outra integrante' },
    { ok: a.convidou === 'sim', emoji: '🎟️', nome: 'Embaixadora', desc: 'Trouxe uma amiga para o clube' },
    { ok: lidos >= 10, emoji: '📚', nome: 'Maratonista', desc: 'Leu 10 ou mais livros com o clube' },
    { ok: lidos >= 25, emoji: '🐛', nome: 'Traça de Livros', desc: 'Leu 25 ou mais livros com o clube' },
  ];
  return lista.filter((c) => c.ok);
}
