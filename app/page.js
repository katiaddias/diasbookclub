'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  QUESTOES,
  PONTOS_MAXIMOS,
  calcularPontos,
  pontosDaQuestao,
  nivelDe,
  conquistasDe,
} from '../lib/questions';

export default function Home() {
  // etapa 0 = boas-vindas/nome, 1..N = perguntas, N+1 = resultado
  const [etapa, setEtapa] = useState(0);
  const [nome, setNome] = useState('');
  const [answers, setAnswers] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pop, setPop] = useState(false);
  const ultimoPontos = useRef(0);

  const total = QUESTOES.length;
  const pontos = calcularPontos(answers);

  useEffect(() => {
    if (pontos !== ultimoPontos.current) {
      ultimoPontos.current = pontos;
      setPop(true);
      const t = setTimeout(() => setPop(false), 450);
      return () => clearTimeout(t);
    }
  }, [pontos]);

  const q = etapa >= 1 && etapa <= total ? QUESTOES[etapa - 1] : null;

  function escolher(op) {
    if (!q) return;
    if (q.tipo === 'multi') {
      const atual = answers[q.id] || [];
      const novo = atual.includes(op.valor) ? atual.filter((v) => v !== op.valor) : [...atual, op.valor];
      setAnswers({ ...answers, [q.id]: novo });
    } else {
      setAnswers({ ...answers, [q.id]: op.valor });
    }
  }

  async function enviar() {
    setEnviando(true);
    setErro('');
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, answers }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.erro || 'Erro ao enviar.');
      setResultado(data);
      setEtapa(total + 1);
      window.scrollTo({ top: 0 });
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  function avancar() {
    setErro('');
    if (etapa === 0) {
      if (nome.trim().length < 2) {
        setErro('Digite seu nome para começar.');
        return;
      }
      setEtapa(1);
    } else if (etapa < total) {
      setEtapa(etapa + 1);
    } else {
      enviar();
    }
    window.scrollTo({ top: 0 });
  }

  function voltar() {
    setErro('');
    setEtapa(Math.max(0, etapa - 1));
  }

  // ---------- Tela de boas-vindas ----------
  if (etapa === 0) {
    return (
      <main className="wrap">
        <div className="hero">
          <div className="big">📚</div>
          <h1>Jornada do Clube do Livro</h1>
          <p>Responda as perguntas, ganhe pontos, desbloqueie conquistas e descubra seu nível de leitora!</p>
        </div>
        <div className="card">
          <h3>Como você se chama?</h3>
          <div className="sub">Seu nome aparece no ranking do clube.</div>
          <input
            type="text"
            value={nome}
            maxLength={60}
            placeholder="Nome e sobrenome"
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && avancar()}
            autoFocus
          />
          {erro && <div className="erro">{erro}</div>}
          <p className="sub" style={{ fontSize: 13 }}>
            Se você responder de novo com o mesmo nome, suas respostas anteriores são atualizadas.
          </p>
        </div>
        <div className="nav">
          <div className="nav-in">
            <button className="btn" onClick={avancar}>Começar a jornada 🚀</button>
          </div>
        </div>
      </main>
    );
  }

  // ---------- Tela de resultado ----------
  if (etapa === total + 1 && resultado) {
    const nivel = nivelDe(resultado.pontos);
    const conquistas = conquistasDe(answers);
    return (
      <main className="wrap">
        <div className="card resultado" style={{ marginTop: 24 }}>
          <div className="trofeu">{nivel.emoji}</div>
          <div className="sub">Parabéns, {nome.split(' ')[0]}!</div>
          <div className="pontos-big">{resultado.pontos}</div>
          <div className="sub">pontos de {PONTOS_MAXIMOS}</div>
          <div className="nivel">{nivel.nome}</div>
          {nivel.proximo && (
            <div className="sub">
              Faltam {nivel.proximo.faltam} pontos para virar {nivel.proximo.emoji} {nivel.proximo.nome}
            </div>
          )}
          <p>
            Você está em <b>{resultado.posicao}º lugar</b> entre {resultado.total} participante
            {resultado.total === 1 ? '' : 's'}.
          </p>

          {conquistas.length > 0 && (
            <>
              <h3 style={{ marginTop: 20 }}>🏅 Conquistas desbloqueadas</h3>
              <div className="badges">
                {conquistas.map((c) => (
                  <div className="badge" key={c.nome}>
                    <div className="e">{c.emoji}</div>
                    <div>
                      <b>{c.nome}</b>
                      <span>{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="links">
            <Link className="btn" href="/ranking">Ver ranking 🏆</Link>
          </div>
        </div>
      </main>
    );
  }

  // ---------- Perguntas ----------
  const selecionado = answers[q.id];
  const qtdMulti = q.tipo === 'multi' ? (selecionado || []).length : 0;
  const ultima = etapa === total;
  const grade = q.opcoes.length <= 8 && q.opcoes.every((o) => o.label.length <= 2);

  return (
    <main className="wrap">
      <div className="hud">
        <div className="hud-row">
          <span>Pergunta {etapa} de {total}</span>
          <span className={`xp ${pop ? 'pop' : ''}`}>⭐ {pontos} pts</span>
        </div>
        <div className="bar"><div style={{ width: `${((etapa - 1) / total) * 100}%` }} /></div>
      </div>

      <div className="card">
        <div className="secao">{q.secao}</div>
        <div className="q-emoji">{q.emoji}</div>
        <div className="q-texto">{q.texto}</div>
        <div className="q-dica">
          {q.dica}
          {pontosDaQuestao(q, answers) > 0 && <b> · +{pontosDaQuestao(q, answers)} pts agora</b>}
        </div>

        {q.tipo === 'multi' && <div className="contador">{qtdMulti} livro(s) marcado(s)</div>}

        <div className={`opcoes ${grade ? 'grade' : 'lista'}`}>
          {q.opcoes.map((op) => {
            const sel = q.tipo === 'multi' ? (selecionado || []).includes(op.valor) : selecionado === op.valor;
            return (
              <button key={op.valor} className={`opcao ${sel ? 'sel' : ''}`} onClick={() => escolher(op)}>
                {q.tipo === 'multi' && <span className="check">{sel ? '✓' : ''}</span>}
                {op.label}
              </button>
            );
          })}
        </div>
        {erro && <div className="erro">{erro}</div>}
      </div>

      <div className="nav">
        <div className="nav-in">
          <button className="btn ghost" onClick={voltar}>←</button>
          <button className="btn" onClick={avancar} disabled={enviando}>
            {enviando ? 'Enviando…' : ultima ? 'Finalizar e ver meus pontos 🎉' : selecionado === undefined || (Array.isArray(selecionado) && selecionado.length === 0) ? 'Pular' : 'Próxima →'}
          </button>
        </div>
      </div>
    </main>
  );
}
