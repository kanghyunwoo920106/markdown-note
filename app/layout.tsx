import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./reactmodal.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "마크다운 메모장",
  description: "다크 테마 마크다운 에디터와 프리뷰어",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // 항상 다크 모드로 설정
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
