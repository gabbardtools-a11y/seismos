/**
 * Страница «Сейсмо Глобус» — интерактивный глобус землетрясений.
 *
 * Контейнер под интерактивный глобус готов. Когда пользователь пришлёт код
 * глобуса (Three.js / Globe.gl / react-globe.gl / D3-ortho / чистый SVG) —
 * вставляем его в компонент <SeismoGlobe /> ниже.
 *
 * Страница построена в той же визуальной системе, что и /seismoprotection:
 *   - SiteHeader с навигацией
 *   - синяя боковая полоса 1.5px
 *   - breadcrumb «На главную»
 *   - hero с иконкой и подзаголовком
 *   - контейнер под глобус (карточка с белой рамкой)
 *   - поясняющий блок снизу
 */
import Link from "next/link";
import { ArrowLeft, Globe2, Activity, Waves } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { SeismoGlobe } from "@/components/site/seismo-globe";

export const metadata = {
  title: "Сейсмо Глобус · СРОСС®",
  description:
    "Интерактивный глобус сейсмической активности Земли: эпицентры землетрясений, активные разломы и тектонические плиты. Вращайте, приближайте, изучайте.",
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
            Интерактивный 3D-глобус землетрясений Земли. Эпицентры свежих и
            исторических событий, активные тектонические разломы и границы плит.
            Вращайте мышью, приближайте колесом, наводите на точку — увидите
            магнитуду, глубину и время события.
          </p>
        </div>

        {/* === Контейнер под интерактивный глобус ===
            Сюда вставляется код пользователя (SeismoGlobe компонент).
            Карточка занимает максимум ширины, высота 70vh на десктопе,
            60vh на мобильном. */}
        <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-2xl p-4 sm:p-6 mb-10">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              Live · данные обновляются в реальном времени
            </div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-[#4A6378]">
              Источники: USGS · EMSC · GS RAS
            </div>
          </div>

          {/* Сам глобус — клиентский компонент */}
          <div className="relative rounded-xl overflow-hidden bg-[#001A33] border border-[#E7EEF6] aspect-[4/3] sm:aspect-[16/10]">
            <SeismoGlobe />
          </div>

          <p className="mt-3 text-[11px] tracking-[0.08em] uppercase text-[#4A6378]">
            Перетаскивайте — вращать · колесо мыши — приближать · клик по точке — детали события
          </p>
        </div>

        {/* Поясняющий блок: что показывает глобус */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <InfoCard
            icon={<Activity className="h-5 w-5 text-[#C8102E]" />}
            title="Эпицентры"
            text="Красные точки — места свежих землетрясений за последние 30 суток. Размер точки пропорционален магнитуде, прозрачность — давности."
          />
          <InfoCard
            icon={<Waves className="h-5 w-5 text-[#00549F]" />}
            title="Разломы и плиты"
            text="Синие линии — главные тектонические разломы и границы литосферных плит. Именно вдоль них происходит 90% всех землетрясений планеты."
          />
          <InfoCard
            icon={<Globe2 className="h-5 w-5 text-[#2D5F3F]" />}
            title="Тихоокеанское кольцо"
            text="Подсветка Тихоокеанского вулканического кольца — зоны, где сосредоточено до 80% мировой сейсмической энергии и 90% крупнейших мегаземлетрясений."
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
            Данные поступают из открытых каталогов <strong>USGS</strong> (Геологическая
            служба США), <strong>EMSC</strong> (Европейско-Средиземноморский
            сейсмологический центр) и <strong>ГС РАН</strong> (Геофизическая служба
            Российской академии наук). Обновление — каждые 5–15 минут.
          </p>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-[15px] font-bold text-[#003366]">{title}</h3>
      </div>
      <p className="text-[13px] text-[#4A6378] leading-relaxed">{text}</p>
    </div>
  );
}
