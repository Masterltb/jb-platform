import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anhem JaeBin – Ăn Chơi Điệu Nghệ | Web Card Battler 2026',
  description:
    'Game Thẻ Bài Chiến Thuật trên Web phong cách Đường Phố Gen Z. Đội hình 6 Thẻ Săn Boss, 6 Ô Trang Bị theo Rank, Thanh Style SSS Bùng Nổ.',
  keywords: ['Anhem JaeBin', 'Web Card Game', 'Card Battler', 'Game Thẻ Bài', 'Boss Rush', 'Gen Z Game']
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#0a0d14] text-slate-100 antialiased selection:bg-[#ff0055] selection:text-white">
        {children}
      </body>
    </html>
  );
}
