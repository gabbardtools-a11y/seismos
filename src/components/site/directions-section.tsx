import {
  Waves,
  Building2,
  Microscope,
  FileText,
  ShieldCheck,
  Network,
  Calculator,
  LineChart,
  FlaskConical,
  Cpu,
  MapPin,
  Activity,
  AlertTriangle,
  Compass,
  Layers,
  ShieldAlert,
  Vibrate,
  Pickaxe,
  Beaker,
  Brain,
} from "lucide-react";

type Direction = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlighted?: boolean;
};

/**
 * НАПРАВЛЕНИЯ — сетка из 22 направлений деятельности системы.
 * Источник: реальный список с действующего seismo.ru + направление
 * «Защита от экстремальных воздействий» + новые направления (Вибросейсм,
 * ИНЖГЕОТЕХ, НИР/НИОКР, TIM/Цифра).
 */
const DIRECTIONS: Direction[] = [
  { icon: <Layers />, title: "Сейсмостойкое строительство", desc: "Нормативная база и методология сейсмостойкого проектирования сооружений" },
  { icon: <Waves />, title: "Сейсмоизоляция", desc: "Современные системы сейсмоизоляции зданий и сооружений разного назначения" },
  { icon: <Activity />, title: "Виброгашение", desc: "Методы и устройства активного и пассивного виброгашения конструкций" },
  { icon: <Compass />, title: "Обследование", desc: "Инструментальное обследование зданий и сооружений в сейсмических зонах" },
  { icon: <FileText />, title: "Паспортизация", desc: "Составление сейсмических паспортов объектов и территорий" },
  { icon: <LineChart />, title: "Мониторинг", desc: "Мониторинг состояния и безопасности. Системы непрерывного сейсмического мониторинга объектов и инфраструктуры" },
  { icon: <FlaskConical />, title: "Испытания", desc: "Экспериментальные исследования. Натурные и лабораторные испытания конструкций на сейсмические воздействия" },
  { icon: <Cpu />, title: "Моделирование", desc: "Численное и физическое моделирование сейсмического отклика сооружений" },
  { icon: <Calculator />, title: "Расчёты", desc: "Расчётный анализ и моделирование. Расчёты несущих конструкций на сейсмические нагрузки, нелинейный анализ" },
  { icon: <AlertTriangle />, title: "Оценка рисков", desc: "Оценка и управление рисками. Сейсмический риск территорий и инфраструктуры" },
  { icon: <Waves />, title: "Сейсмология", desc: "Сейсмологическое районирование и наблюдения за сейсмическим режимом" },
  { icon: <MapPin />, title: "Изыскания", desc: "Инженерно-сейсмологические изыскания под строительство и реконструкцию" },
  { icon: <Building2 />, title: "Динамика сооружений", desc: "Динамический расчёт и анализ сооружений при сейсмических воздействиях" },
  { icon: <Building2 />, title: "Реконструкция", desc: "Сейсмическая реконструкция существующих зданий и сооружений" },
  { icon: <ShieldCheck />, title: "СейсмоУсиление", desc: "Технологии сейсмического усиления существующих конструкций" },
  { icon: <Cpu />, title: "Инновации", desc: "Новые строительные технологии. Внедрение инновационных материалов и технологий сейсмозащиты" },
  { icon: <Microscope />, title: "Экспертиза", desc: "Независимая оценка и экспертиза. Аналитическая и экспертная работа в области сейсмобезопасности" },
  {
    icon: <ShieldAlert />,
    title: "Защита от экстремальных воздействий",
    desc: "Антидроновая защита, защита от взрывных волн от взрывов большой мощности специализированных предприятий. Активная и пассивная защита зданий и сооружений",
    highlighted: true,
  },
  { icon: <Vibrate />, title: "Вибросейсм", desc: "Защита от землетрясений и вибраций. Комплексные решения по защите сооружений от сейсмических и вибрационных воздействий" },
  { icon: <Pickaxe />, title: "ИНЖГЕОТЕХ", desc: "Изыскания и исследования природы. Инженерно-геотехнические работы для строительства в сейсмических зонах" },
  { icon: <Beaker />, title: "НИР, НИОКР", desc: "Научные исследования и разработки. Фундаментальные и прикладные исследования в области сейсмобезопасности" },
  { icon: <Brain />, title: "TIM, Цифра", desc: "Цифровые технологии и развитие. Искусственный интеллект (ИИ-AI) в сейсмопрогнозах, расчётах конструкций, мониторинге и предупреждениях", highlighted: true },
];

export function DirectionsSection() {
  return (
    <section id="directions" className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">02 · Направления</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            22 направления деятельности
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Система СРОСС® объединяет профессиональное сообщество, работающее по
            всему циклу обеспечения сейсмобезопасности — от сейсмологических
            изысканий до управления рисками территорий и экспертизы. Каждое
            направление курируется профильными экспертами ассоциации ЕАСА.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3]">
          {DIRECTIONS.map((d, i) => (
            <DirectionCard key={i} {...d} num={i + 1} />
          ))}
        </div>

        {/* Блок-врезка про технологию «червяк» */}
        <div className="mt-16 p-8 lg:p-10 bg-[#003366] text-white grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <div className="eyebrow text-white/70 mb-3">Патентованная технология</div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">
              ТЗ «червяк»
            </h3>
            <div className="text-[11px] tracking-[0.14em] uppercase text-white/60">
              Патент · Зарегистрировано в Роспатенте
            </div>
          </div>
          <div className="lg:col-span-2 text-sm text-white/80 leading-relaxed">
            <p className="mb-4">
              Техническое задание «червяк» — оригинальная методология
              сейсмологического мониторинга, разработанная авторским
              коллективом системы СРОСС®. Технология обеспечивает
              высокоточную локализацию эпицентров и оценку магнитуды
              сейсмических событий в реальном времени на территориях
              России и сопредельных регионов.
            </p>
            <p>
              Патент защищает ключевые алгоритмические и архитектурные
              решения, лежащие в основе информационной системы. Использование
              технологии в коммерческих и государственных проектах
              осуществляется по лицензии через Евразийскую СЕЙСМО Ассоциацию.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectionCard({
  icon,
  title,
  desc,
  num,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  num: number;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`group p-6 transition-colors cursor-default ${
        highlighted
          ? "bg-[#003366] hover:bg-[#003366]/95"
          : "bg-white hover:bg-[#E7EEF6]"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            highlighted
              ? "bg-[#00549F] text-white"
              : "bg-[#E7EEF6] text-[#00549F] group-hover:bg-[#00549F] group-hover:text-white"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] tracking-[0.16em] uppercase font-mono ${
            highlighted ? "text-white/60" : "text-[#4A6378]/60"
          }`}
        >
          {num.toString().padStart(2, "0")}
        </span>
      </div>
      <h3
        className={`text-[15px] mb-2 tracking-tight leading-snug ${
          highlighted
            ? "font-extrabold text-white text-[16px]"
            : "font-bold text-[#003366]"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-xs leading-relaxed ${
          highlighted ? "text-white/80" : "text-[#4A6378]"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
