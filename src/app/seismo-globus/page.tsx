/**
 * Страница «Сейсмо Глобус» — интерактивный 3D-глобус землетрясений.
 *
 * Источник данных: eqalert.ru (через серверный прокси /api/earthquakes).
 * Глобус построен на three.js + @react-three/fiber (компонент <EqGlobe />).
 * Визуальная палитра синхронизирована с сайтом через CSS-переменные
 * --globe-* (см. globals.css).
 */
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Globe2 } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { EqGlobe } from "@/components/globe/eq-globe";

export const metadata = {
  title: "Сейсмо Глобус · СРОСС®",
  description:
    "Интерактивный 3D-глобус землетрясений Земли в реальном времени. Эпицентры свежих событий по данным eqalert.ru, ГС РАН. Вращайте, приближайте, наводите на маркер — магнитуда, глубина и время события.",
};

export default function SeismoGlobusPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <span>Сейсмо Глобус</span>
        </div>

        {/* Hero заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">Международная мониторинговая визуализация</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-3 flex items-center gap-3">
            <Globe2 className="h-10 w-10 text-[#00549F] flex-none" />
            Сейсмо Глобус
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed max-w-3xl">
            Интерактивный 3D-глобус землетрясений Земли в реальном времени.
            Пульсирующие маркеры — эпицентры последних событий по данным
            eqalert.ru (ГС РАН). Размер и цвет точки зависят от магнитуды,
            при наведении — карточка события с деталями. Вращайте мышью,
            приближайте колесом.
          </p>
        </div>

        {/* === Глобус ===
            EqGlobe — клиентский компонент с three.js Canvas.
            Suspense нужен на случай загрузки текстур (earth_atmos_2048.jpg,
            land-mask.png) и первого запроса к /api/earthquakes. */}
        <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-4 sm:p-6 mb-10">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              Live · данные eqalert.ru
            </div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
              Источник: ГС РАН · EQAlert
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-[#E7EEF6] bg-[#fffbf5]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-[560px] md:h-[760px] text-[#4A6378] text-sm">
                  Загружаем глобус…
                </div>
              }
            >
              <EqGlobe />
            </Suspense>
          </div>

          <p className="mt-3 text-[11px] tracking-[0.08em] uppercase text-[#4A6378]">
            Тяните — вращать · колесо мыши — приближать · наведите на маркер — карточка события
          </p>
        </div>

        {/* Поясняющий блок: что показывает глобус */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <InfoCard
            title="Эпицентры в реальном времени"
            text="Пульсирующие маркеры — свежие землетрясения по данным eqalert.ru. Цвет: оранжевый (M<4), красно-оранжевый (M 4–5.5), тёмно-красный (M≥5.5). Размер пропорционален магнитуде."
          />
          <InfoCard
            title="Два режима суши"
            text="«Реалистичная» — текстура Земли со спутника с атмосферным ореолом. «Точки» — стилизованная синяя суша из 50 000 точек Фибоначчи, на фоне которой красные маркеры читаются максимально контрастно."
          />
          <InfoCard
            title="Обновление каждые 60 с"
            text="Серверный прокси /api/earthquakes обращается к rest-api.eqalert.ru и кэширует ответ на 2 минуты. При недоступности источника отдаются последние сохранённые данные с пометкой «кэш»."
          />
        </div>

        {/* Текстовый SEO-блок снизу */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#003366] mb-3">
            Зачем нужен сейсмо-глобус
          </h2>
          <p className="text-[#4A6378] leading-relaxed mb-4">
            Глобус землетрясений — это наглядная карта сейсмической активности
            планеты в реальном времени. Он показывает, где и когда происходят
            толчки, какой силы они достигают и как распределены по тектоническим
            разломам. Для инженеров-сейсмологов, проектировщиков и страховых
            компаний это рабочий инструмент оценки рисков; для широкой публики —
            способ увидеть, что Земля живая и постоянно движется.
          </p>
          <p className="text-[#4A6378] leading-relaxed">
            Данные поступают из открытого сервиса{" "}
            <a
              href="https://eqalert.ru/"
              target="_blank"
              rel="noreferrer"
              className="text-[#00549F] hover:underline"
            >
              eqalert.ru
            </a>{" "}
            (ООО «Геофизические технологии» / Геофизическая служба РАН).
            Обновление ленты — каждую минуту.
          </p>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-5">
      <h3 className="text-[15px] font-bold text-[#003366] mb-2">{title}</h3>
      <p className="text-[13px] text-[#4A6378] leading-relaxed">{text}</p>
    </div>
  );
}
