import './globals.css';

export const metadata = {
  title: 'Clube do Livro • Jornada de Leitura',
  description: 'Responda, ganhe pontos e suba no ranking do clube do livro!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
