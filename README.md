# 📚 Jornada do Clube do Livro

Formulário gamificado com pontos ao vivo, níveis, conquistas, ranking e painel do clube.
Feito com Next.js + banco Postgres (Neon), pronto para a Vercel.

## Páginas

| Página | O que faz |
|---|---|
| `/` | Formulário em etapas, com pontos subindo a cada resposta |
| `/ranking` | Ranking secreto: as participantes só veem a partir de **13/12/2026 às 15h30** (antes disso aparece uma contagem regressiva) |
| `/ranking?key=SUA_CHAVE` | Ranking **sempre visível** para você, mesmo antes da data |
| `/admin?key=SUA_CHAVE` | Painel privado: melhor/pior livro, melhor encontro, livros mais lidos, respostas de cada pessoa e download da planilha (CSV) |

Para mudar a data de abertura sem mexer no código, crie na Vercel a variável `RANKING_ABRE_EM`
com um valor como `2026-12-13T15:30:00-03:00` e faça um Redeploy.

As **perguntas e a pontuação** ficam em `lib/questions.js`. Para mudar uma pontuação, incluir um livro novo ou
mudar um nível, é só editar esse arquivo.

## Publicar na Vercel (passo a passo)

1. **GitHub**: crie uma conta em github.com, clique em *New repository* (ex.: `clube-do-livro`) e envie
   os arquivos desta pasta (no site: *Add file → Upload files*; não envie `node_modules`).
2. **Vercel**: entre em vercel.com com sua conta do GitHub → *Add New → Project* → escolha o repositório → *Deploy*.
   (O primeiro deploy vai abrir o site, mas ainda sem banco.)
3. **Banco de dados**: no projeto da Vercel, abra a aba **Storage** → *Create Database* → **Neon (Postgres)**
   → plano gratuito → conecte ao projeto. A Vercel cria a variável `DATABASE_URL` sozinha.
4. **Chave do painel**: em *Settings → Environment Variables*, crie `ADMIN_KEY` com uma senha sua.
5. **Redeploy**: aba *Deployments* → menu `…` do último deploy → *Redeploy*.

Pronto! A tabela é criada automaticamente no primeiro uso. Compartilhe o link do site com o grupo.

## Testar no seu computador (opcional)

```bash
npm install
cp .env.example .env.local   # preencha DATABASE_URL e ADMIN_KEY
npm run dev
```

## Regras que eu assumi (fácil de mudar)

- Cada pessoa é identificada pelo **nome**. Responder de novo com o mesmo nome **atualiza** as respostas.
- Todas as perguntas podem ser puladas (valem 0 pontos).
- A pontuação é sempre recalculada no servidor.
- O ranking mostra só nome, nível e pontos; as respostas individuais não aparecem para ninguém.
