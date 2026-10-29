/**
 * Страница «Антидроновая защита зданий и сооружений»
 * Источники: русскаясила.рф, aktive-montage.ru, пассивная-защита.рф,
 * dronset.ru, baumak.ru, apit-kovrov.ru
 */
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Building2, Wrench, Zap, Network, Radio } from "lucide-react";

export const metadata = {
  title: "Антидроновая защита зданий и сооружений: методы, системы, монтаж",
  description: "Антидроновая защита — активные и пассивные методы. Сетчатые конструкции, РЭБ, бронирование. Как защитить склад, резервуар, подстанцию от БПЛА. Простым языком.",
  keywords: "антидроновая защита, защита от БПЛА, пассивная защита от дронов, сетчатые конструкции, РЭБ, бронирование зданий, защита резервуаров, защита подстанций",
  openGraph: {
    title: "Антидроновая защита зданий и сооружений",
    description: "Активные и пассивные методы защиты от БПЛА. Сетчатые конструкции, РЭБ, бронирование.",
  },
};

export default function AntidronPage() {
  return (
    <main className="min-h-screen bg-paper-grid">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
          <span className="text-[#D6DCE3]">·</span>
          <Link href="/seismoprotection" className="hover:text-[#00549F]">Сейсмозащита</Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#C8102E]" />
            <span className="eyebrow text-[#C8102E]">Защита от экстремальных воздействий</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.1] mb-3 flex items-center gap-3">
            <ShieldAlert className="h-10 w-10 text-[#C8102E] flex-none" />
            Антидроновая защита
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Как защитить здания, резервуары и подстанции от беспилотных
            летательных аппаратов. Методы, системы и особенности монтажа —
            простым языком.
          </p>
        </div>

        {/* Зачем */}
        <Section icon={<ShieldAlert className="h-5 w-5" />} title="Зачем нужна антидроновая защита">
          <p>Беспилотные летательные аппараты (БПЛА) стали реальной угрозой для промышленных и гражданских объектов. Дрон массой 30–150 кг, летящий со скоростью 150–200 км/ч, несущий боевую часть 10–30 кг — этого достаточно, чтобы пробить крышу склада, повредить резервуар с нефтепродуктами или вывести из строя трансформаторную подстанцию.</p>
          <p>Поражающие элементы при подрыве разлетаются со скоростью 300–1000 м/с. Ударная волна от взрыва 5–10 кг в тротиловом эквиваленте причиняет разрушения на значительном расстоянии. Защита должна учитывать оба фактора — удар самого аппарата и осколочное поражение.</p>
          <p>С 26 января 2025 года в России действует свод правил <strong>СП 542.1325800.2024</strong> — первый нормативный документ, прямо описывающий физическую защиту зданий и сооружений от БПЛА. Конструкция рассчитывается на таранный удар, воздушную ударную волну и осколки.</p>
        </Section>

        {/* Два подхода */}
        <Section icon={<Zap className="h-5 w-5" />} title="Два подхода: активный и пассивный">
          <p>Защита от дронов делится на две принципиально разные группы методов:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#FFF8F0] border border-[#D6DCE3] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="h-5 w-5 text-[#D97706]" />
                <h3 className="text-[15px] font-bold text-[#003366]">Активная защита (РЭБ)</h3>
              </div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Радиоэлектронная борьба — подавление каналов управления и навигации дрона. Глушит GPS/ГЛОНАСС и радиоканал оператора. Дрон теряет управление и падает или возвращается на базу.</p>
              <p className="text-xs text-[#C8102E] mt-2 font-semibold">Минусы: не работает против дронов на оптоволокне или с инерциальным наведением; требует разрешения на излучение; глушит вашу собственную связь.</p>
            </div>
            <div className="bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-5 w-5 text-[#00549F]" />
                <h3 className="text-[15px] font-bold text-[#003366]">Пассивная защита (сети)</h3>
              </div>
              <p className="text-sm text-[#4A6378] leading-relaxed">Физические барьеры — сетчатые конструкции на мачтах или каркасах. Сеть перехватывает дрон на подлёте, инициирует подрыв на безопасном удалении от защищаемого объекта.</p>
              <p className="text-xs text-[#2D5F3F] mt-2 font-semibold">Плюсы: не излучает, не зависит от типа управления дроном, работает без питания, круглосуточно.</p>
            </div>
          </div>
          <p className="mt-4">На практике системы комбинируют: РЭБ сбивает наведение, а сеть — последний рубеж, который гарантированно не пропустит аппарат к конструкции.</p>
        </Section>

        {/* Пассивная защита */}
        <Section icon={<Network className="h-5 w-5" />} title="Пассивная защита: сетчатые конструкции">
          <p>Сетчатое полотно натягивается на несущих опорах — мачтах, строительных лесах или канатных контурах. Дрон не должен долететь до кровли, трансформатора или стенки резервуара. Сеть инициирует подрыв на удалении и не пускает аппарат внутрь контура.</p>
          <p>Это не просто «сетка» — это инженерная система. Рассчитывается вся конструкция целиком: металл опор, натяжение полотна, шаг ячейки, ветровая и снеговая нагрузка, расстояние от сети до защищаемого объекта.</p>

          <div className="space-y-4 mt-4">
            <DeviceCard title="Сетка на металлических мачтах" desc="Свободное пространство под сеткой, опоры расставлены с учётом расположения оборудования, проездов и коммуникаций. Подходит для открытых площадок: резервуарные парки, подстанции, элеваторы." />
            <DeviceCard title="Каркас из строительных лесов" desc="Пространственная конструкция для сложной геометрии — зданий, локальных участков промышленной площадки. Позволяет обойти трубы, эстакады и выступы оборудования." />
            <DeviceCard title="Канатные контуры" desc="Сетчатое полотно на тросах, натянутых между существующими конструкциями или специально установленными анкерами. Минимум новых опор — подходит для резервуаров РВС, где по периметру ставится кольцо лесов с сетью." />
            <DeviceCard title="Быстровозводимые укрытия" desc="Сборные пространственные конструкции под конкретную задачу. Модульная схема — можно адаптировать под конфигурацию площадки и быстро демонтировать при необходимости." />
          </div>
        </Section>

        {/* Бронирование */}
        <Section icon={<ShieldAlert className="h-5 w-5" />} title="Бронирование и противоосколочная защита">
          <p>Когда дрон всё же пробивает сеть или когда нужно защитить элементы, которые нельзя закрыть сеткой (окна, двери, вентиляционные отверстия), применяется бронирование.</p>

          <div className="space-y-4 mt-4">
            <DeviceCard title="Бронематы" desc="Модульные защитные элементы из высокопрочного композитного баллистического материала. Размер — 1×2 м. Скорость непробития — от 300 до 1000 м/с в зависимости от класса защиты. Выдерживают удар БПЛА планерного типа массой 30–150 кг на скорости 150–200 км/ч. Защитный чехол из кордуры с пропиткой — от УФ и влаги. Огнетермозащитная ткань из арамидных волокон. Стоимость — от 12 000 ₽/м²." />
            <DeviceCard title="Противоосколочные шторы" desc="Защищают персонал и оборудование внутри здания от осколков при взрыве снаружи. Навешиваются на стены и перекрытия. Не останавливают сам дрон, но гасят осколочное поле." />
            <DeviceCard title="Бронеостекление" desc="Пулестойкие и взрывостойкие стёкла в раме для оконных проёмов. Класс защиты — от ударостойкого до взрывостойкого. Защищает от осколков и ударной волны." />
            <DeviceCard title="Металлобетонные панели" desc="Сварные или болтовые соединения. Модульные защитные панели для стен и перекрытий. Облегчённый вариант — сендвич-панели. Применяются для административных зданий, складов, серверных." />
          </div>
        </Section>

        {/* Объекты */}
        <Section icon={<Building2 className="h-5 w-5" />} title="Какие объекты защищают">
          <p>Антидроновая защита применяется на объектах, где последствия удара БПЛА критичны — взрыв, пожар, экологическая катастрофа, остановка производства:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {[
              "Нефтебазы и АЗС",
              "Резервуарные парки (РВС)",
              "НПЗ и нефтехимия",
              "Электроподстанции 35–500 кВ",
              "Газораспределительные станции",
              "Ж/д наливные эстакады",
              "Логистические склады и РЦ",
              "Элеваторы и зернохранилища",
              "ЦОД и серверные площадки",
              "Портовые терминалы",
              "Водозаборы и насосные станции",
              "Животноводческие комплексы",
            ].map((item) => (
              <div key={item} className="bg-white border border-[#D6DCE3] rounded-lg px-3 py-2 text-xs text-[#4A6378] font-medium">
                {item}
              </div>
            ))}
          </div>
        </Section>

        {/* Монтаж */}
        <Section icon={<Wrench className="h-5 w-5" />} title="Особенности монтажа на действующих объектах">
          <p>Монтаж пассивной защиты — это не забор и не навес. Это пространственная конструкция на несущих опорах, которая должна выдержать прямое попадание аппарата и погасить его энергию. На действующем промышленном объекте монтаж требует:</p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold">•</span><span><strong>Работы на высоте</strong> — часто свыше 25 метров. Нужны промышленные альпинисты с допусками.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold">•</span><span><strong>Отказ от сварки и открытого огня</strong> — на пожароопасных производствах (НПЗ, нефтебазы) все соединения выполняются болтовыми.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold">•</span><span><strong>Координация с технологическими службами</strong> — нельзя останавливать производство и перекрывать проезды.</span></li>
            <li className="flex gap-2"><span className="text-[#C8102E] font-bold">•</span><span><strong>Допуски и ответственность</strong> — каждый человек на площадке должен иметь соответствующие разрешения.</span></li>
          </ul>
          <p className="mt-3">Обычная строительная бригада для этого не подходит. Нужна специализированная команда, которая умеет работать на высоте, в условиях действующего производства и с пожароопасными объектами.</p>
        </Section>

        {/* Нормативы */}
        <Section icon={<ShieldAlert className="h-5 w-5" />} title="Нормативная база">
          <p>С 26 января 2025 года в России действует первый свод правил, прямо описывающий физическую защиту от БПЛА:</p>
          <div className="bg-white border border-[#D6DCE3] rounded-xl p-5 mt-3">
            <div className="text-[13px] font-bold text-[#C8102E] mb-1">СП 542.1325800.2024</div>
            <div className="text-sm text-[#4A6378]">«Защитные ограждающие конструкции от беспилотных летательных аппаратов». Конструкция считается на таранный удар, воздушную ударную волну и осколки — а не просто «навешивается сетка».</div>
          </div>
          <p className="mt-4">Также применяются: ГОСТ на баллистическую защиту (скорость непробития 300–1000 м/с), пожарные нормы для пожароопасных производств, и стандарты на высотные работы.</p>
        </Section>

        {/* Источники */}
        <div className="mt-10 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-3">Источники</h3>
          <ul className="space-y-1.5 text-sm text-[#4A6378]">
            <li><a href="https://русскаясила.рф/complex" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">русскаясила.рф</a> — комплексная защита предприятий от БПЛА</li>
            <li><a href="https://aktive-montage.ru/bpla-aktiv-montazh/" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">aktive-montage.ru</a> — монтаж пассивной защиты промышленными альпинистами</li>
            <li><a href="https://пассивная-защита.рф" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">пассивная-защита.рф</a> — инженерные системы защитных сетей</li>
            <li><a href="https://dronset.ru/" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">dronset.ru</a> — проектирование и монтаж антидроновой защиты</li>
            <li><a href="https://baumak.ru/services/antidronovaya-zashchita/" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">baumak.ru</a> — производство защитных конструкций</li>
            <li><a href="https://apit-kovrov.ru/stati/antidronovaya-zashita-administrativnyh-i-kommercheskih-zdaniy/" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">apit-kovrov.ru</a> — защита административных и коммерческих зданий</li>
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
        <div className="w-8 h-8 bg-[#C8102E]/10 rounded-lg flex items-center justify-center text-[#C8102E]">{icon}</div>
        <h2 className="text-xl lg:text-2xl font-bold text-[#003366] tracking-tight">{title}</h2>
      </div>
      <div className="text-sm sm:text-base text-[#4A6378] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function DeviceCard({ title, desc }: { title: string; desc: string; }) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-5 hover:border-[#C8102E]/30 transition-colors">
      <h3 className="text-[15px] font-bold text-[#003366] mb-2">{title}</h3>
      <p className="text-sm text-[#4A6378] leading-relaxed">{desc}</p>
    </div>
  );
}
