'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Contagem regressiva até o ranking abrir. Quando chega a zero, recarrega a página.
export default function Contagem({ alvo }) {
  const router = useRouter();
  const [resta, setResta] = useState(null);

  useEffect(() => {
    const alvoMs = new Date(alvo).getTime();
    const tick = () => {
      const r = alvoMs - Date.now();
      setResta(r);
      if (r <= 0) router.refresh();
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [alvo, router]);

  if (resta === null) return <div className="contagem">&nbsp;</div>;
  if (resta <= 0) return <div className="contagem">Revelando… 🥁</div>;

  const s = Math.floor(resta / 1000);
  const dias = Math.floor(s / 86400);
  const horas = Math.floor((s % 86400) / 3600);
  const min = Math.floor((s % 3600) / 60);
  const seg = s % 60;

  const caixa = (n, rotulo) => (
    <div className="caixa-tempo">
      <b>{String(n).padStart(2, '0')}</b>
      <span>{rotulo}</span>
    </div>
  );

  return (
    <div className="contagem">
      {caixa(dias, 'dias')}
      {caixa(horas, 'horas')}
      {caixa(min, 'min')}
      {caixa(seg, 'seg')}
    </div>
  );
}
