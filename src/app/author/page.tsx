/**
 * Страница «Автор» — Акбиев Рустам Тоганович.
 * Биография, научная школа, портфолио, патенты, контакты.
 *
 * Источник контента: src/components/site/author-section.tsx
 * (вынесен с главной на отдельную страницу по запросу).
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AuthorSection } from "@/components/site/author-section";

export const metadata = {
  title: "Акбиев Рустам Тоганович — автор системы СРОСС®",
  description:
    "Акбиев Рустам Тоганович — автор 71 патента, основатель научной школы сейсмобезопасности. Биография, научная школа, портфолио, публикации.",
  keywords:
    "Акбиев, Рустам Тоганович, автор СРОСС, сейсмобезопасность, патенты, научная школа, akbiev.ru",
  alternates: { canonical: "/author" },
};

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span className="text-[#003366]">Автор системы</span>
        </div>

        {/* Контент — та же AuthorSection что была на главной */}
        <AuthorSection />
      </div>

      <SiteFooter />
    </main>
  );
}
