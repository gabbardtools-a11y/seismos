import { HeroEmblemLarge } from "@/components/site/hero-section";

export const metadata = {
  title: "Варианты логотипа — СРОСС®",
  description: "6 вариантов эмблемы СРОСС® с разными оправами и линзами",
};

export default function LogoVariantsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-[#D6DCE3] bg-[#003366] text-white py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a href="/" className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 hover:text-white">
            ← На главную
          </a>
        </div>
      </div>

      <main className="flex-1">
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-10 bg-[#00549F]" />
                <span className="eyebrow">Варианты логотипа сайта</span>
                <span className="h-px w-10 bg-[#00549F]" />
              </div>
              <h1 className="text-[32px] sm:text-[42px] font-bold tracking-[-0.015em] text-[#003366] mb-4">
                6 вариантов эмблемы СРОСС®
              </h1>
              <p className="text-base text-[#4A6378] max-w-2xl mx-auto">
                Концепция оправы линзы — от мягкой (Soft) до хромированной (Chrome).
                Каждый вариант использует radial gradient для объёмной металлической оправы
                и выпуклой линзы в центре.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <HeroEmblemLarge variant="soft" label="Soft" description="Спокойная объёмность. Минимальный контраст — для мягкого, ненавязчивого восприятия." />
              <HeroEmblemLarge variant="medium" label="Medium" description="Сбалансированная выпуклость. Оптимальное соотношение яркости и глубины." />
              <HeroEmblemLarge variant="strong" label="Strong" description="Металлическая оправа. Выраженный контраст — серебристый блик и тёмный край." />
              <HeroEmblemLarge
                variant="silver"
                label="Silver"
                description="Серебро+синий. Deep Lens — 4 stop'а, выраженная стеклянная линза."
                lensStops={[
                  { offset: "0%", color: "#FFFFFF" },
                  { offset: "45%", color: "#F0F4F8" },
                  { offset: "80%", color: "#D0DCE8" },
                  { offset: "100%", color: "#C0D0DC" },
                ]}
              />
              <HeroEmblemLarge
                variant="platinum"
                label="Platinum"
                description="Платина. Crystal — 5 stop'ов, прозрачный кристалл."
                lensStops={[
                  { offset: "0%", color: "#FFFFFF" },
                  { offset: "30%", color: "#F4F8FC" },
                  { offset: "60%", color: "#E0E8F0" },
                  { offset: "85%", color: "#C8D4E0" },
                  { offset: "100%", color: "#B8C8D4" },
                ]}
              />
              <HeroEmblemLarge
                variant="chrome"
                label="Chrome"
                description="Хром. Frost — матовое стекло, максимум серебра."
                lensStops={[
                  { offset: "0%", color: "#FAFCFE" },
                  { offset: "35%", color: "#EEF2F6" },
                  { offset: "70%", color: "#D8E0E8" },
                  { offset: "100%", color: "#C5D2DE" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#003366] text-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <a href="/" className="text-[12px] tracking-[0.14em] uppercase font-bold text-white/80 hover:text-white">
            ← Вернуться на главную
          </a>
        </div>
      </footer>
    </div>
  );
}
