import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "СРОСС® — Сейсмобезопасность Сейсмозащита Технологии защиты от взрывных воздействий и дронов (антидроновая защита)",
  description:
    "СРОСС® — единая экосистема сейсмобезопасности и сейсмозащиты зданий и сооружений территорий России и стран СНГ и ЕАЭС. Международный проект по устойчивому развитию. Данные о сейсмической опасности, методология оценки рисков, целевое планирование градостроительной деятельности.",
  keywords: [
    "СРОСС",
    "Сейсмобезопасность",
    "Сейсмозащита",
    "антидроновая защита",
    "защита от взрывных воздействий",
    "seismo.ru",
    "сейсмическая опасность",
    "сейсмостойкое строительство",
    "оценка рисков",
    "ЕАСА",
    "ГРАДОРЕСУРС",
    "UN-Habitat",
    "целевое планирование",
  ],
  authors: [{ name: "Евразийская СЕЙСМО Ассоциация (ЕАСА)" }],
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title:
      "СРОСС® — Сейсмобезопасность Сейсмозащита Технологии защиты от взрывных воздействий и дронов (антидроновая защита)",
    description:
      "Единая экосистема сейсмобезопасности и сейсмозащиты зданий и сооружений территорий России и стран СНГ и ЕАЭС.",
    url: "https://seismo.ru/",
    siteName: "СРОСС® — Сейсмобезопасность и Сейсмозащита",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "СРОСС® — Сейсмобезопасность Сейсмозащита Технологии защиты от взрывных воздействий и дронов (антидроновая защита)",
    description:
      "Единая экосистема сейсмобезопасности и сейсмозащиты зданий и сооружений территорий России и стран СНГ и ЕАЭС.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
