import './globals.css';

export const metadata = {
  title: "Dias' Book Club • Jornada de Leitura",
  description: "Responda, ganhe pontos e descubra quem é a campeã do Dias' Book Club!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
