/**
 * Страница «Сертификаты сейсмостойкости» — лаборатория, испытания, оформление.
 * Источники: gostr.su, rosstandart-test.ru, normasert.ru, sertifikat-plus.ru,
 * couzcert.ru, ГОСТ 30546.1/2/3-98, ГОСТ 17516.1-90, СП 14.13330.2018.
 */
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Building2, FlaskConical, FileText, Wrench, Award } from "lucide-react";

export const metadata = {
  title: "Сертификаты сейсмостойкости сейсмобезопасности зданий сооружений конструкций оборудования материалов лаборатория",
  description: "Сертификация сейсмостойкости: как получить сертификат, какие испытания проводятся, нормативная база (ГОСТ 30546, СП 14.13330), шкала MSK-64, лаборатории и органы по сертификации.",
  keywords: "сертификат сейсмостойкости, сертификация сейсмобезопасности, испытания на сейсмостойкость, ГОСТ 30546, MSK-64, лаборатория сейсмостойкости, сейсмостойкость оборудования, сейсмостойкость зданий",
  openGraph: {
    title: "Сертификаты сейсмостойкости — испытания, оформление, лаборатория",
    description: "Полное руководство по сертификации сейсмостойкости зданий, сооружений, оборудования и материалов. ГОСТы, методы испытаний, шкала MSK-64.",
  },
};

export default function SertifikatyPage() {
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
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow text-[#00549F]">Нормативная база и практика</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold tracking-[-0.01em] text-[#003366] leading-[1.12] mb-3 flex items-center gap-3">
            <Award className="h-10 w-10 text-[#00549F] flex-none" />
            Сертификаты сейсмостойкости
          </h1>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Сертификация сейсмобезопасности зданий, сооружений, конструкций,
            оборудования и материалов. Испытания, нормативная база, порядок
            оформления — подробное руководство.
          </p>
        </div>

        {/* SVG: шкала MSK-64 */}
        <div className="mb-10 bg-white border border-[#D6DCE3] rounded-2xl p-6">
          <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-4">Шкала интенсивности MSK-64</h3>
          <svg viewBox="0 0 800 120" className="w-full" aria-label="Шкала сейсмической интенсивности MSK-64 от 1 до 12 баллов">
            <defs>
              <linearGradient id="mskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#51cf66" />
                <stop offset="33%" stopColor="#ffd43b" />
                <stop offset="66%" stopColor="#ff7a45" />
                <stop offset="100%" stopColor="#ff2d2d" />
              </linearGradient>
            </defs>
            <rect x="10" y="40" width="780" height="30" rx="4" fill="url(#mskGrad)" />
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n, i) => (
              <g key={n}>
                <line x1={10 + i * 70.9} y1="35" x2={10 + i * 70.9} y2="75" stroke="#fff" strokeWidth="1.5" />
                <text x={10 + i * 70.9 + 35} y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#003366">{n}</text>
                <text x={10 + i * 70.9 + 35} y="92" textAnchor="middle" fontSize="8" fill="#4A6378">
                  {n <= 3 ? "незаметно" : n <= 5 ? "ощутимо" : n <= 7 ? "сильно" : n <= 9 ? "разруш." : "катстр."}
                </text>
              </g>
            ))}
            <text x="10" y="110" fontSize="9" fill="#4A6378">1 балл — не ощущается · 5 — предметы падают · 7 — трещины в стенах · 9 — обрушения · 12 — полное разрушение</text>
          </svg>
        </div>

        {/* Что такое сертификат */}
        <Section icon={<FileText className="h-5 w-5" />} title="Что такое сертификат сейсмостойкости">
          <p>Сертификат сейсмостойкости — это документ, который подтверждает, что продукция, оборудование или строительная конструкция способна выдержать сейсмические нагрузки заданного уровня без потери работоспособности и целостности. Сертификат подтверждает соответствие требованиям нормативных документов по ГОСТ 17516.1-90 к сейсмическим нагрузкам в баллах (5, 6, 7, 8, 9) по шкале MSK-64.</p>
          <p>Сертификация проводится в добровольном порядке, однако наличие сертификата может быть обязательным условием для участия в тендерах, поставок на объекты в сейсмически активных районах, а также для получения разрешения на эксплуатацию опасных производственных объектов. Без сертификата сейсмостойкости невозможно получить заключение экспертизы промышленной безопасности для оборудования, устанавливаемого на АЭС, гидротехнических сооружениях и стратегических объектах.</p>
          <p>Сертификат оформляется и регистрируется органом по сертификации, который находится в едином реестре зарегистрированных систем добровольной сертификации. Срок действия сертификата — до 3 лет, после чего требуется повторная сертификация с проведением испытаний.</p>
        </Section>

        {/* Зачем */}
        <Section icon={<ShieldCheck className="h-5 w-5" />} title="Зачем нужна сертификация сейсмостойкости">
          <p>Сертификация сейсмостойкости решает сразу несколько задач. Во-первых, она позволяет предотвратить ущерб от разрушений и угрозу жизни людей при землетрясении. Проверяется, как поведёт себя продукция или объект в реальных сейсмических условиях — не обрушится ли, не выйдет ли из строя критически важное оборудование, не произойдёт ли утечка опасных веществ.</p>
          <p>Во-вторых, сертификат является юридическим документом, который подтверждает, что производитель или поставщик выполнил свои обязательства по обеспечению безопасности. При отсутствии сертификата на объекте, расположенном в сейсмически опасном районе, ответственность за возможные последствия несёт заказчик или застройщик.</p>
          <p>В-третьих, для многих категорий оборудования сертификация сейсмостойкости — это техническое требование. Электротехническое оборудование, шкафы управления, насосные станции, запорная арматура, приборы КИПиА — всё это должно сохранять работоспособность при землетрясении. Сертификат подтверждает это документально.</p>
        </Section>

        {/* Что сертифицируют */}
        <Section icon={<Building2 className="h-5 w-5" />} title="Что подлежит сертификации">
          <p>Сертификация сейсмостойкости охватывает широкий перечень объектов. Вот основные категории:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {[
              "Здания и сооружения (жилые, промышленные, общественные)",
              "Строительные конструкции (колонны, балки, перекрытия, фермы)",
              "Электротехническое оборудование (трансформаторы, шкафы, щиты)",
              "Насосное и компрессорное оборудование",
              "Запорная арматура и трубопроводная обвязка",
              "Приборы КИПиА и системы автоматизации",
              "Сейсмоизоляторы и демпферы",
              "Строительные материалы (бетон, арматура, кирпич)",
              "Мостовые конструкции и опорные части",
              "Оборудование АЭС и гидротехнических сооружений",
              "Резервуары и ёмкости для опасных веществ",
              "Серверные стойки и IT-оборудование",
            ].map((item) => (
              <div key={item} className="bg-white border border-[#D6DCE3] rounded-lg px-3 py-2 text-xs text-[#4A6378] font-medium">
                {item}
              </div>
            ))}
          </div>
        </Section>

        {/* SVG: процесс сертификации */}
        <div className="mb-10 bg-white border border-[#D6DCE3] rounded-2xl p-6">
          <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-4">Процесс сертификации сейсмостойкости</h3>
          <svg viewBox="0 0 800 200" className="w-full" aria-label="Схема процесса сертификации сейсмостойкости">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#00549F" />
              </marker>
            </defs>
            {/* Boxes */}
            {[
              { x: 10, label: "Заявка", desc: "документы, ТУ" },
              { x: 160, label: "Расчёт", desc: "или испытания" },
              { x: 310, label: "Стенд", desc: "вибростол" },
              { x: 460, label: "Протокол", desc: "испытаний" },
              { x: 610, label: "Сертификат", desc: "до 3 лет" },
            ].map((box, i) => (
              <g key={i}>
                <rect x={box.x} y="60" width="130" height="60" rx="8" fill={i === 4 ? "#00549F" : "#E7EEF6"} stroke="#00549F" strokeWidth="1.5" />
                <text x={box.x + 65} y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill={i === 4 ? "#fff" : "#003366"}>{box.label}</text>
                <text x={box.x + 65} y="102" textAnchor="middle" fontSize="9" fill={i === 4 ? "#fff" : "#4A6378"}>{box.desc}</text>
                {i < 4 && <line x1={box.x + 130} y1="90" x2={box.x + 160} y2="90" stroke="#00549F" strokeWidth="2" markerEnd="url(#arrow)" />}
              </g>
            ))}
            <text x="400" y="160" textAnchor="middle" fontSize="10" fill="#4A6378">Расчётный путь: 3–7 дней · Натурные испытания: 5–12 дней · Срок действия: до 3 лет</text>
            <text x="400" y="178" textAnchor="middle" fontSize="10" fill="#4A6378">Стоимость: от 16 000 ₽</text>
          </svg>
        </div>

        {/* Методы */}
        <Section icon={<FlaskConical className="h-5 w-5" />} title="Методы испытаний на сейсмостойкость">
          <p>Испытания на сейсмостойкость проводятся по ГОСТ 30546.2-98 «Испытания на сейсмостойкость машин, приборов и других технических изделий. Общие положения и методы испытаний». Стандарт устанавливает два основных пути подтверждения сейсмостойкости:</p>

          <div className="space-y-4 mt-4">
            <DeviceCard title="Расчётный метод" desc="Сейсмостойкость подтверждается путём выполнения расчётов на основе технических чертежей, спецификаций и характеристик материалов. Расчёт ведётся по спектрам ответа для заданного уровня сейсмической интенсивности (5–9 баллов по MSK-64). Срок — 3–7 рабочих дней. Применяется для стационарного оборудования, конструкций и материалов, где натурные испытания нецелесообразны или невозможны." />
            <DeviceCard title="Натурные испытания на стенде" desc="Оборудование устанавливается на вибростол (сейсмоплатформу), который воспроизводит сейсмические колебания заданной интенсивности. Регистрируются ускорения, перемещения, деформации и повреждения. Испытания проводятся в одной или нескольких плоскостях (горизонтальной, вертикальной). Срок — 5–12 рабочих дней. Это наиболее надёжный метод — показывает реальное поведение объекта при землетрясении." />
          </div>

          <p className="mt-4">Испытания включают несколько этапов. Сначала проводится вибрационное обследование — определение собственных частот и форм колебаний изделия. Затем прикладываются испытательные воздействия — синусоидальная качка, широкополосная случайная вибрация или синтезированная акселерограмма реального землетрясения. После испытания проводится визуальный осмотр и проверка работоспособности.</p>
          <p>Для оборудования, которое не может быть испытано на стенде (крупногабаритные конструкции, здания), применяется метод определения сейсмостойкости на месте эксплуатации по ГОСТ 30546.3-98. В этом случае проводятся натурные динамические испытания с регистрацией отклика конструкции на искусственные или естественные вибрационные воздействия.</p>
        </Section>

        {/* Шкала баллов */}
        <Section icon={<ShieldCheck className="h-5 w-5" />} title="Классы сейсмостойкости по баллам MSK-64">
          <p>Сертификат сейсмостойкости выдаётся на конкретный уровень сейсмической интенсивности в баллах по шкале MSK-64. Чем выше балл, тем более сильное землетрясение может выдержать оборудование:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <BallCard ball="5" desc="Заметное землетрясение. Предметы качаются, двери открываются. Оборудование должно сохранять работоспособность без повреждений." color="#ffd43b" />
            <BallCard ball="6" desc="Сильное землетрясение. Предметы падают, лёгкие повреждения зданий. Оборудование не должно получать повреждений, влияющих на работу." color="#ffd43b" />
            <BallCard ball="7" desc="Очень сильное. Трещины в стенах, падение дымоходов. Оборудование должно сохранять работоспособность, допускаются мелкие повреждения." color="#ff7a45" />
            <BallCard ball="8" desc="Разрушительное. Частичное обрушение зданий. Оборудование должно сохранять целостность, допускается временная потеря работоспособности." color="#ff7a45" />
            <BallCard ball="9" desc="Опустошительное. Обрушение большинства зданий. Оборудование не должно разрушиться катастрофически — обеспечивается безопасный останов." color="#ff2d2d" />
            <BallCard ball="9+" desc="Для особо ответственных объектов (АЭС, плотины) — расчёт на максимальное расчётное землетрясение (МРЗ). Полная целостность при экстремальных нагрузках." color="#ff2d2d" />
          </div>
        </Section>

        {/* Нормативы */}
        <Section icon={<FileText className="h-5 w-5" />} title="Нормативная база">
          <p>Сертификация сейсмостойкости в России опирается на следующую нормативную базу:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <NormCard code="ГОСТ 30546.1-98" title="Общие требования к машинам, приборам и другим техническим изделиям по стойкости к землетрясениям" />
            <NormCard code="ГОСТ 30546.2-98" title="Испытания на сейсмостойкость. Общие положения и методы испытаний" />
            <NormCard code="ГОСТ 30546.3-98" title="Методы определения сейсмостойкости при аттестации на месте эксплуатации" />
            <NormCard code="ГОСТ 17516.1-90" title="Требования к стойкости при сейсмических нагрузках (5–9 баллов MSK-64)" />
            <NormCard code="СП 14.13330.2018" title="Строительство в сейсмических районах. Нормы проектирования" />
            <NormCard code="ГОСТ Р 57353—2016" title="Опоры строительных конструкций. Скользящие сейсмоизолирующие опоры" />
            <NormCard code="ГОСТ Р 57354—2016" title="Опоры строительных конструкций. Эластомерные опоры" />
            <NormCard code="НП-031-01" title="Нормы проектирования сейсмостойких атомных станций" />
          </div>
          <p className="mt-4">Для каждого типа изделия применяется свой набор стандартов. Электротехническое оборудование дополнительно сертифицируется по ГОСТ Р МЭК 60068-3-3 — испытания на устойчивость к вибрации. Строительные материалы — по соответствующим ГОСТ на конкретный материал (бетон, арматура, кирпич) с дополнительной проверкой на сейсмические воздействия.</p>
        </Section>

        {/* Лаборатории */}
        <Section icon={<FlaskConical className="h-5 w-5" />} title="Лаборатории и органы по сертификации">
          <p>Испытания на сейсмостойкость проводят аккредитованные лаборатории, имеющие соответствующее оборудование — вибростенды, сейсмоплатформы, системы регистрации ускорений и деформаций. Орган по сертификации должен быть зарегистрирован в едином реестре систем добровольной сертификации.</p>
          <p>Процедура выбора лаборатории зависит от типа объекта. Для электротехнического оборудования нужны вибростенды с возможностью воспроизведения широкополосной случайной вибрации. Для строительных конструкций — крупногабаритные сейсмоплатформы с нагрузочной способностью до десятков тонн. Для зданий — натурные испытания на месте эксплуатации с использованием вибромашин или взрывных источников.</p>
          <p>Лаборатория выдаёт протокол испытаний — основной документ, на основании которого орган по сертификации оформляет сертификат. Протокол содержит: описание объекта испытаний, применяемое оборудование, параметры испытательных воздействий (ускорения, частоты, длительность), результаты визуального осмотра и измерений, заключение о соответствии или несоответствии требованиям.</p>
          <p>Стоимость сертификации сейсмостойкости начинается от 16 000 рублей и зависит от сложности объекта, количества испытательных воздействий и необходимости выезда на место эксплуатации. Срок оформления — от 2 дней (расчётный метод) до 12 дней (натурные испытания на стенде).</p>
        </Section>

        {/* SVG: вибростенд */}
        <div className="mb-10 bg-white border border-[#D6DCE3] rounded-2xl p-6">
          <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-4">Схема испытаний на вибростенде</h3>
          <svg viewBox="0 0 800 250" className="w-full" aria-label="Схема испытаний оборудования на сейсмическом вибростенде">
            {/* Ground */}
            <rect x="0" y="200" width="800" height="50" fill="#E7EEF6" />
            <text x="400" y="235" textAnchor="middle" fontSize="10" fill="#4A6378">Основание (грунт)</text>

            {/* Vibration table */}
            <rect x="250" y="170" width="300" height="30" rx="4" fill="#00549F" />
            <text x="400" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Вибростол (сейсмоплатформа)</text>

            {/* Equipment on table */}
            <rect x="330" y="100" width="140" height="70" rx="4" fill="#fff" stroke="#003366" strokeWidth="2" />
            <text x="400" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="#003366">Оборудование</text>
            <text x="400" y="150" textAnchor="middle" fontSize="9" fill="#4A6378">(испытываемое)</text>

            {/* Mounting */}
            <line x1="340" y1="170" x2="340" y2="100" stroke="#003366" strokeWidth="1.5" />
            <line x1="460" y1="170" x2="460" y2="100" stroke="#003366" strokeWidth="1.5" />

            {/* Actuator arrows */}
            <path d="M 200 185 L 240 185" stroke="#C8102E" strokeWidth="3" markerEnd="url(#arrow2)" />
            <path d="M 560 185 L 600 185" stroke="#C8102E" strokeWidth="3" markerEnd="url(#arrow2rev)" />
            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#C8102E" />
              </marker>
              <marker id="arrow2rev" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#C8102E" />
              </marker>
            </defs>
            <text x="210" y="175" fontSize="9" fill="#C8102E" fontWeight="600">← Горизонтальные</text>
            <text x="555" y="175" fontSize="9" fill="#C8102E" fontWeight="600">колебания →</text>

            {/* Vertical arrow */}
            <path d="M 400 80 L 400 50" stroke="#C8102E" strokeWidth="2" strokeDasharray="4,2" />
            <text x="410" y="60" fontSize="9" fill="#C8102E" fontWeight="600">Вертикальные</text>

            {/* Sensors */}
            <circle cx="350" cy="115" r="4" fill="#22C55E" />
            <circle cx="400" cy="115" r="4" fill="#22C55E" />
            <circle cx="450" cy="115" r="4" fill="#22C55E" />
            <text x="500" y="118" fontSize="9" fill="#22C55E">● Датчики (акселерометры)</text>

            {/* Label */}
            <text x="400" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#003366">Испытательный стенд для сертификации сейсмостойкости</text>
          </svg>
        </div>

        {/* Оформление */}
        <Section icon={<Wrench className="h-5 w-5" />} title="Порядок оформления сертификата">
          <p>Процесс получения сертификата сейсмостойкости состоит из нескольких шагов:</p>
          <ul className="space-y-2 mt-3">
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">1.</span><span><strong>Заявка</strong> — заказчик предоставляет техническую документацию: чертежи, ТУ, спецификации, паспорт изделия, описание условий эксплуатации.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">2.</span><span><strong>Расчёт или испытания</strong> — лаборатория проводит расчётный анализ или натурные испытания на вибростенде. Определяется уровень сейсмостойкости в баллах.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">3.</span><span><strong>Протокол испытаний</strong> — документ с результатами: параметры воздействий, измеренные отклики, заключение о соответствии.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">4.</span><span><strong>Сертификат</strong> — орган по сертификации оформляет и регистрирует сертификат на основании протокола. Срок действия — до 3 лет.</span></li>
            <li className="flex gap-2"><span className="text-[#00549F] font-bold">5.</span><span><strong>Инспекционный контроль</strong> — в течение срока действия сертификата орган может проводить периодические проверки.</span></li>
          </ul>
          <p className="mt-4">Для получения сертификата заказчик предоставляет: заявку, свидетельство ОГРН и ИНН, технические условия (ТУ) или ГОСТ на продукцию, эксплуатационную документацию, чертежи общего вида, расчётные модели (при наличии). Для импортного оборудования — сертификат страны-производителя и перевод документации.</p>
        </Section>

        {/* Источники */}
        <div className="mt-10 bg-[#F8FBF9] border border-[#D6DCE3] rounded-xl p-6">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#4A6378] mb-3">Источники и нормативные документы</h3>
          <ul className="space-y-1.5 text-sm text-[#4A6378]">
            <li>ГОСТ 30546.1-98 — Общие требования к сейсмостойкости технических изделий</li>
            <li>ГОСТ 30546.2-98 — Испытания на сейсмостойкость, методы</li>
            <li>ГОСТ 30546.3-98 — Методы определения сейсмостойкости на месте эксплуатации</li>
            <li>ГОСТ 17516.1-90 — Требования к стойкости при сейсмических нагрузках</li>
            <li>СП 14.13330.2018 — Строительство в сейсмических районах</li>
            <li>НП-031-01 — Нормы сейсмостойких атомных станций</li>
            <li><a href="https://gostr.su/sertifikat-sejsmostojkosti" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">gostr.su</a> — сертификат сейсмостойкости</li>
            <li><a href="https://rosstandart-test.ru/2022/07/06/sertifikat-na-seysmostoykost" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">rosstandart-test.ru</a> — сертификация и испытания</li>
            <li><a href="https://normasert.ru/production/sertifikat-sejsmostojkosti" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">normasert.ru</a> — подтверждение устойчивости оборудования</li>
            <li><a href="https://sertifikat-plus.ru/uslugi/sertifikat-sejsmostojkosti" target="_blank" rel="noopener noreferrer" className="text-[#2D5F3F] hover:text-[#22C55E] underline underline-offset-2">sertifikat-plus.ru</a> — оформление сертификата</li>
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

function BallCard({ ball, desc, color }: { ball: string; desc: string; color: string; }) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-4 flex items-start gap-3">
      <div className="flex-none w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: color }}>
        {ball}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-bold text-[#003366] mb-1">{ball} баллов MSK-64</div>
        <div className="text-xs text-[#4A6378] leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function NormCard({ code, title }: { code: string; title: string; }) {
  return (
    <div className="bg-white border border-[#D6DCE3] rounded-xl p-4">
      <div className="text-[13px] font-bold text-[#00549F] mb-1">{code}</div>
      <div className="text-[12px] text-[#4A6378] leading-relaxed">{title}</div>
    </div>
  );
}
