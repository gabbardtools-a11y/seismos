/**
 * Симулятор землетрясений — отдельная страница.
 * Виджет: /public/earthquake-simulator.html (Leaflet + формула Блейка).
 */
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";

export const metadata = {
  title: "Симулятор землетрясений · СРОСС®",
  description:
    "Интерактивный симулятор землетрясений. Задайте магнитуду и глубину очага, поставьте эпицентр на карту — увидите изосейсты (зоны в баллах МСК-64) и оценку баллов для выбранного города. Модель: формула Блейка (1971).",
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-paper-grid">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        {/* Хлебные крошки */}
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link
            href="/"
            className="hover:text-[#00549F] flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
        </div>

        {/* Заголовок */}
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">
              Live · Интерактивная модель
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold tracking-[-0.01em] text-[#003366] mb-3 leading-[1.1]">
            Симулятор землетрясений
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#4A6378] leading-relaxed">
            Задайте магнитуду и глубину очага, поставьте эпицентр на карту —
            увидите изосейсты (зоны в баллах МСК-64) и оценку баллов для
            выбранного города. Модель: упрощённая формула Блейка (1971) с учётом
            глубины очага.
          </p>
        </div>

        {/* Iframe с симулятором */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[#D6DCE3] shadow-xl bg-white"
          style={{ height: "760px" }}
        >
          <iframe
            src="/earthquake-simulator.html"
            title="Симулятор землетрясений — СРОСС®"
            loading="lazy"
            className="w-full h-full"
            style={{ border: 0, background: "#ffffff" }}
            allowFullScreen
          />
        </div>

        {/* Описание модели */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#D6DCE3] rounded-xl p-6">
            <h2 className="text-[15px] font-bold tracking-tight text-[#003366] mb-3 uppercase">
              Как пользоваться
            </h2>
            <ol className="space-y-2 text-sm text-[#4A6378] leading-relaxed list-decimal pl-5">
              <li>
                Двигайте слайдеры <strong className="text-[#003366]">магнитуды</strong> (M 4.0–9.5)
                и <strong className="text-[#003366]">глубины</strong> очага (5–200 км).
              </li>
              <li>
                Щёлкните по карте в нужном месте — появятся изосейсты (контуры
                зон одинаковой интенсивности).
              </li>
              <li>
                Введите название города и нажмите «Найти» — увидите, сколько
                баллов дойдёт именно до вас, PGA, время прихода P/S-волн.
              </li>
              <li>
                Или выберите одно из <strong className="text-[#003366]">реальных землетрясений</strong>{" "}
                в пресетах — подставятся его настоящие параметры.
              </li>
            </ol>
          </div>

          <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6">
            <h2 className="text-[15px] font-bold tracking-tight text-[#003366] mb-3 uppercase">
              Модель и ограничения
            </h2>
            <p className="text-sm text-[#4A6378] leading-relaxed mb-3">
              Интенсивность считается по упрощённой{" "}
              <strong className="text-[#003366]">формуле Блейка (1971)</strong>:
            </p>
            <pre className="bg-[#003366] text-white text-xs p-3 rounded-lg overflow-x-auto mb-3">
{`I(r) = I₀ - 2·log₁₀(√(r² + h²) / h)
I₀ = 1.5·M - 1.5`}
            </pre>
            <p className="text-xs text-[#4A6378] leading-relaxed">
              где <code>r</code> — эпицентральное расстояние (км),{" "}
              <code>h</code> — глубина очага (км), <code>M</code> — магнитуда.
              Модель не учитывает местные грунтовые условия и региональные
              особенности затухания. Для ответственных расчётов используйте
              полные GMPE (Boore & Atkinson 2008 и др.).
            </p>
          </div>
        </div>

        {/* AI-блок */}
        <div className="mt-6 bg-[#003366] text-white rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-3">
            <Brain className="h-6 w-6 mt-1 flex-none text-[#22C55E]" />
            <div>
              <div className="text-[11px] tracking-[0.14em] uppercase text-white/60 font-semibold mb-1">
                TIM, Цифра · ИИ-AI
              </div>
              <div className="text-lg font-bold mb-2">
                Симулятор развивается
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                В следующих версиях подключим нейросетевую модель на основе
                исторических данных USGS и eqalert.ru — для учёта местных
                грунтовых условий и более точного прогноза баллов в городах
                России и стран ЕАЭС.
              </p>
            </div>
          </div>
        </div>

        {/* Атрибуция */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-[#4A6378]">
          <span>
            Источники: модель Blake (1971) · плитки Esri Light Gray Canvas ·
            OpenStreetMap contributors · геокодер Nominatim
          </span>
        </div>
      </div>
    </main>
  );
}
