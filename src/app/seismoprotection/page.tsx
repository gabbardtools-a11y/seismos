/**
 * Страница «Сейсмозащита» — виды, принципы, технологии.
 * Информация скомпилирована из открытых источников:
 * - rosneoprom.ru (неолит-проект)
 * - k2-engineering.ru
 * - stroycomplex-5.ru
 * Текст написан простым языком, без сложных оборотов.
 */
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Building2, Wrench, Activity, Layers, Waves, Zap } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";

export const metadata = {
  title: "Сейсмозащита зданий и сооружений · СРОСС®",
  description:
    "Сейсмозащита — что это такое, какие бывают виды и как они работают. Сейсмоизоляция, сейсмогашение, демпферы, маятниковые и резинометаллические опоры. Простым языком.",
};

export default function SeismoProtectionPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#22C55E]" />
            <span className="eyebrow text-[#2D5F3F]">Технологии и решения</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-3 flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 text-[#00549F] flex-none" />
            Сейсмозащита
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Как защитить здания и сооружения от землетрясений. Виды систем,
            принципы работы и где они применяются — простым языком.
          </p>
        </div>

        {/* Иллюстрация: здание на сейсмоизоляторах */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/seismo-protection-1.png"
          alt="Схема сейсмоизоляции здания: резинометаллические опоры между фундаментом и надземной частью"
          className="w-full rounded-2xl border border-[#D6DCE3] mb-10"
          loading="lazy"
        />

        {/* Зачем нужна сейсмозащита */}
        <Section icon={<Activity className="h-5 w-5" />} title="Зачем нужна сейсмозащита">
          <p>При землетрясении здание получает удар снизу — от фундамента. Чем выше жёсткость связи между землёй и зданием, тем сильнее этот удар передаётся на стены, перекрытия и крышу. Если конструкция не рассчитана на такую нагрузку — появляются трещины, деформации, а в худшем случае здание обрушивается.</p>
          <p>Сейсмозащита работает иначе: вместо того чтобы делать здание ещё крепче и тяжелее, она <strong>разрывает</strong> жёсткую связь между фундаментом и надземной частью. Удар гасится или изолируется — и здание остаётся целым. Это дешевле, легче и надёжнее, чем просто увеличивать толщину стен и колонн.</p>
          <p>Современные системы сейсмозащиты способны гарантировать сохранность конструкций при землетрясениях силой до 7, 8 и даже 9 баллов. Наибольшую опасность представляют не сами толчки, а резонансные явления — когда частота колебаний земли совпадает с собственной частотой здания. Сейсмозащита как раз и меняет эту частоту.</p>
        </Section>

        {/* Два подхода */}
        <Section icon={<Layers className="h-5 w-5" />} title="Два основных подхода">
          <p>Все системы сейсмозащиты делятся на две большие группы — <strong>сейсмоизоляция</strong> и <strong>сейсмогашение</strong>. Часто их комбинируют для максимального эффекта.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="h-5 w-5 text-[#00549F]" />
                <h3 className="text-[15px] font-bold text-[#003366]">Сейсмоизоляция</h3>
              </div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Здание «отрывается» от фундамента с помощью специальных опор. Они позволяют зданию смещаться относительно земли, не передавая колебания на конструкцию. Энергия землетрясения тратится на перемещение, а не на разрушение.</p>
            </div>
            <div className="bg-[#FFF8F0] border border-[#D6DCE3] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-[#D97706]" />
                <h3 className="text-[15px] font-bold text-[#003366]">Сейсмогашение</h3>
              </div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Специальные устройства — демпферы — поглощают энергию колебаний, превращая её в тепло или трение. Как амортизаторы в автомобиле: кочка есть, но салон не трясёт. Демпферы могут быть фрикционными, вязкими или гидравлическими.</p>
            </div>
          </div>
        </Section>

        {/* Виды сейсмоизоляторов */}
        <Section icon={<Building2 className="h-5 w-5" />} title="Виды сейсмоизоляторов">
          <p>Сейсмоизоляторы устанавливаются между фундаментом и надземной частью здания. Вот основные типы:</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/seismo-protection-2.png"
            alt="Гидравлический сейсмический демпфер в каркасе здания — схема устройства"
            className="w-full rounded-xl border border-[#D6DCE3] mt-4"
            loading="lazy"
          />
          <div className="space-y-4 mt-4">
            <DeviceCard title="Резинометаллические опоры (RB)" desc="Многослойные пластины из резины и стали. Резина даёт эластичность, сталь — прочность. Здание может смещаться горизонтально, но не проваливается вертикально. Самый распространённый и проверенный тип." />
            <DeviceCard title="Резинометаллические опоры со свинцовым сердечником (LRB)" desc="Та же конструкция, но в центр вставлен свинцовый стержень. Свинец поглощает энергию колебаний — получается комбинированное устройство: и изолятор, и демпфер одновременно." />
            <DeviceCard title="Маятниковые (скользящие) опоры" desc="Здание опирается на вогнутую поверхность, по которой может скользить. При землетрясении здание «качается» как маятник, возвращаясь в исходное положение за счёт гравитации. Можно комбинировать с домкратной системой для выравнивания здания после толчков." />
            <DeviceCard title="Шаровые сегментные опорные части" desc="Используются преимущественно для мостов. Опора имеет сферическую поверхность, что позволяет пролету поворачиваться и смещаться при сейсмическом воздействии. Не имеют мелких деталей — надёжны при динамических нагрузках." />
            <DeviceCard title="Гидравлические демпферы" desc="Устанавливаются внутри каркаса здания. Принудительное движение жидкости внутри распорки поглощает энергию. Работают как автомобильные амортизаторы — чем сильнее толчок, тем сильнее сопротивление." />
            <DeviceCard title="Фрикционно-подвижные соединения" desc="Демпферы сухого трения. При обычной нагрузке соединение жёсткое, но при превышении расчётной силы происходит проскальзывание, и энергия гасится трением. Второй уровень защиты включается при экстремальных воздействиях." />
          </div>
        </Section>

        {/* Мосты */}
        <Section icon={<Wrench className="h-5 w-5" />} title="Сейсмозащита мостов и инфраструктуры">
          <p>Мосты — особый случай. Их нельзя просто «поставить на резину», потому что мост должен выдерживать постоянные нагрузки от транспорта, ветра и температуры. Сейсмозащита мостов требует индивидуального подхода для каждого объекта.</p>
          <p>Типовой комплекс сейсмозащиты моста включает несколько уровней:</p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">1.</span><span><strong>Стопоры с амортизаторами</strong> — снижают воздействие за счёт обжатия пружин. Первый уровень защиты.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">2.</span><span><strong>Скользящие опорные части</strong> с демпферами сухого трения — при превышении расчётной силы происходит контролируемое смещение. Второй уровень.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">3.</span><span><strong>Устройства против сброса пролётов</strong> — металлические тяги с овальными отверстиями, предотвращают опрокидывание при максимальном землетрясении.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">4.</span><span><strong>Стяжки между смежными пролётами</strong> — гасят удары при асинфазных колебаниях соседних опор.</span></li>
          </ul>
          <p className="mt-3">Пример: железнодорожный мост через Амударью в Туркмении — первый объект, где был внедрён полный комплекс сейсмозащиты такого типа. Мост открыт для движения поездов в 2009 году. Для Олимпиады 2014 года в Сочи была разработана аналогичная система с вязкоупругими демпферами.</p>
        </Section>

        {/* Нормативы */}
        <Section icon={<ShieldCheck className="h-5 w-5" />} title="Нормативы и расчёты">
          <p>Все решения по сейсмозащите проектируются в соответствии с действующими СНиП и ГОСТ. Расчёт ведётся на два уровня землетрясений:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white border border-[#D6DCE3] rounded-xl p-5">
              <div className="text-[12px] tracking-[0.1em] uppercase font-bold text-[#00549F] mb-2">ПЗ — проектное землетрясение</div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Повторяется 1 раз в 500 лет. Здание должно работать нормально — без повреждений, эксплуатация не прекращается.</p>
            </div>
            <div className="bg-white border border-[#D6DCE3] rounded-xl p-5">
              <div className="text-[12px] tracking-[0.1em] uppercase font-bold text-[#C8102E] mb-2">МРЗ — максимальное расчётное землетрясение</div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Повторяется 1 раз в 1000–5000 лет. Допускаются повреждения, но здание не должно обрушиться. Люди должны успеть эвакуироваться.</p>
            </div>
          </div>
          <p className="mt-4">При подборе сейсмоизоляции проектировщик обязан гарантировать стабильность характеристик устройств на весь срок службы сооружения. Резина не должна стареть, металл — ржаветь, а демпферы — терять свои свойства.</p>
        </Section>

        {/* Готовые здания */}
        <Section icon={<Building2 className="h-5 w-5" />} title="Можно ли добавить сейсмозащиту в готовое здание?">
          <p>Да, и это одно из главных преимуществ современных систем. Сейсмозащитные устройства можно интегрировать в уже существующие объекты — для повышения их сейсмостойкости. Это особенно актуально для регионов, где нормы сейсмостойкости изменились после постройки здания, или для зданий с изношенными несущими конструкциями.</p>
          <p>Процесс обычно включает: обследование здания, расчёт нагрузок, подбор устройств, монтаж опор или демпферов в узлах сопряжения фундамента с каркасом. Часто совмещается с общим усилением конструкций.</p>
        </Section>

        {/* Источники */}
        <div className="mt-10 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-3">Источники информации</h3>
          <ul className="space-y-1.5 text-sm text-[#4A6378]">
            <li><a href="https://rosneoprom.ru/seismic_protection" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">rosneoprom.ru</a> — ГК РОСНЕОЛИТ, проектирование и производство сейсмозащитного оборудования</li>
            <li><a href="https://k2-engineering.ru/news/seysmozashchitnye-ustroystva-vidy-i-osobennosti/" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">k2-engineering.ru</a> — К2 Инжиниринг, виды и особенности сейсмозащитных устройств</li>
            <li><a href="https://stroycomplex-5.ru/seism.php" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">stroycomplex-5.ru</a> — СК Стройкомплекс-5, производство и поставка сейсмозащитных устройств</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode; }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[#00549F]/10 rounded-lg flex items-center justify-center text-[#00549F]">{icon}</div>
        <h2 className="text-xl lg:text-2xl font-bold text-[#003366] tracking-tight">{title}</h2>
      </div>
      <div className="text-sm sm:text-base text-[#4A6378] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function DeviceCard({ title, desc }: { title: string; desc: string; }) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-5 hover:border-[#00549F]/30 transition-colors">
      <h3 className="text-[15px] font-bold text-[#003366] mb-2">{title}</h3>
      <p className="text-sm text-[#4A6378] leading-relaxed">{desc}</p>
    </div>
  );
}
