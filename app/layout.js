import './globals.css';

export const metadata = {
  title: 'Oráculo Odara - A Sabedoria dos Búzios & Odùs',
  description: 'Consulta Sagrada aos Odùs e Orixás',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0d0714] text-gray-100 font-sans">{children}</body>
    </html>
  );
}
