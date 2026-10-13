import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const title = t('meta.title', lang);
  const description = t('meta.desc', lang);
  return {
    title,
    description,
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
      title,
      description: t('meta.ogDesc', lang),
      url: "https://seismo.ru/",
      siteName: t('meta.siteName', lang),
      type: "website",
      locale: lang === 'ru' ? 'ru_RU' : lang === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t('meta.ogDesc', lang),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
