import { GraduationCap, BookOpen, Users, Award, Building2, Microscope, Briefcase, Scale, FileText, Megaphone, Lightbulb, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

/**
 * О АВТОРЕ — Биография Акбиева Рустама Тогановича
 *
 * Источник: https://akbiev.ru/biography/
 * Научная школа: https://akbiev.ru/scientific-school/
 * Портфолио: https://akbiev.ru/portfolio/
 */

// Квалификация — 12 направлений профессионального стажа
const QUALIFICATIONS = [
  { icon: <Briefcase className="h-5 w-5" />, label: "Профессиональный стаж", years: "40+" },
  { icon: <Building2 className="h-5 w-5" />, label: "В градостроительной отрасли", years: "35+" },
  { icon: <BookOpen className="h-5 w-5" />, label: "В сфере науки и образования", years: "40+" },
  { icon: <Microscope className="h-5 w-5" />, label: "Опыт обследования и испытаний", years: "40+" },
  { icon: <Scale className="h-5 w-5" />, label: "Стаж экспертной деятельности", years: "30+" },
  { icon: <Briefcase className="h-5 w-5" />, label: "Опыт управления проектами", years: "30+" },
  { icon: <Award className="h-5 w-5" />, label: "В сфере стоимостной оценки", years: "30+" },
  { icon: <Users className="h-5 w-5" />, label: "Общественной деятельности", years: "30+" },
  { icon: <FileText className="h-5 w-5" />, label: "Разработка норм и стандартов", years: "25+" },
  { icon: <Megaphone className="h-5 w-5" />, label: "Выпуск журналов (СМИ)", years: "15+" },
  { icon: <Users className="h-5 w-5" />, label: "Организация мероприятий", years: "25+" },
  { icon: <Lightbulb className="h-5 w-5" />, label: "Тиражирование ноу-хау", years: "20+" },
];

// Ключевые вехи биографии
const BIO_TIMELINE = [
  {
    year: "1963",
    title: "Рождение",
    text: "Родился 4 ноября 1963 года в г. Душанбе, Таджикистан, СССР.",
  },
  {
    year: "1980—1985",
    title: "Образование",
    text: "Таджикский политехнический институт (ТПИ), факультет «Промышленное и гражданское строительство», специальность 1202. Окончил с отличием, квалификация «инженер-строитель».",
  },
  {
    year: "1983",
    title: "Встреча с наставником",
    text: "Историческая встреча с доцентом Смирновым Владимиром Иосифовичем — куратором группы, ставшим на многие годы до самой его смерти не только учителем, научным руководителем, коллегой, но также партнёром и близким другом.",
  },
  {
    year: "1984—1987",
    title: "Начало научной деятельности",
    text: "Преподавательская деятельность на кафедрах «Железобетонные конструкции» и «Экономика строительного производства» ТПИ. Участие в НИОКР. Стажировка в Центре исследований сейсмостойкости ЦНИИСК им. В.А. Кучеренко Госстроя СССР.",
  },
  {
    year: "1987",
    title: "Аспирантура и ЦНИИСК",
    text: "Поступление в аспирантуру при кафедре «Теоретическая механика» ВЗИСИ (ныне МИКХиС). Работа в ЦНИИСК под руководством Смирнова В.И. и профессора Айзенберга Я.М. — известного учёного с мировым именем, основателя научной школы «Сейсмоизоляция».",
  },
  {
    year: "1986—1988",
    title: "Вибрационные испытания",
    text: "На базе ЛенЗНИИЭП — участие в вибрационных испытаниях, результаты которых стали основой для диссертации.",
  },
  {
    year: "1991",
    title: "Защита диссертации",
    text: "Защита диссертации на соискание учёной степени кандидата технических наук по теме: «Разработка и исследования конструктивных решений крупнопанельных зданий с сухими стыками для районов повышенной сейсмической опасности».",
  },
  {
    year: "1991",
    title: "Северокавказский филиал ЦНИИСК",
    text: "После серии землетрясений на границе Грузии и Осетии организовал работу Северокавказского филиала ЦНИИСК (г. Нальчик, Кабардино-Балкарская Республика).",
  },
  {
    year: "1993",
    title: "Оценка недвижимости и РОО",
    text: "В одной из первых групп прошёл обучение по направлению «оценка недвижимости». Принял участие в учредительном собрании по созданию Российского общества оценщиков (РОО).",
  },
  {
    year: "1993—2001",
    title: "Независимый эксперт",
    text: "Становление как независимого строительного эксперта и оценщика. Активное сотрудничество с Федеральным фондом государственного имущества, Архитектурно-градостроительной службой, Налоговой полицией, Службой судебных приставов.",
  },
  {
    year: "2009",
    title: "Запуск seismo.ru",
    text: "Регистрация домена seismo.ru. Запуск информационной системы Сейсмобезопасность России. Присоединение к консорциуму ГРАДОРЕСУРС®.",
  },
  {
    year: "2010",
    title: "Статус СМИ",
    text: "Получение свидетельства о регистрации средства массовой информации ЭЛ № ФС 77–39562 от 26.04.2010.",
  },
  {
    year: "2026",
    title: "СРОСС® 2.0",
    text: "Новая редакция системы: открытые данные, патентованная технология «червяк», международная интеграция, знак качества «СейсмоБезопасность».",
    active: true,
  },
];

// Реализованные проекты
const PROJECTS = [
  {
    title: "Гостиничный комплекс",
    category: "Сейсмостойкое строительство",
    description: "Проектирование и строительство гостиничного комплекса с применением систем сейсмоизоляции в сейсмических районах.",
  },
  {
    title: "Жилой комплекс с автостоянкой",
    category: "Градостроительное проектирование",
    description: "Комплексное проектирование жилого комплекса с подземной автостоянкой в сейсмической зоне, с учётом требований СП 14.13330.",
  },
  {
    title: "Находкинский завод минеральных удобрений",
    category: "Промышленные объекты",
    description: "Установка для производства метанола производительностью 5400 метрических тонн в сутки. Проектирование сейсмостойких конструкций промышленного объекта.",
  },
  {
    title: "Северо-Кавказский федеральный научно-клинический центр ФМБА",
    category: "Социальные объекты",
    description: "Проектирование и строительство медицинского центра Федерального медико-биологического агентства с обеспечением сейсмостойкости ответственных сооружений.",
  },
];

// Выдающиеся учёные — основоположники направления
const PIONEER_SCIENTISTS = [
  "Цшохер Вольдемар Оскарович",
  "Айзенберг Яков Моисеевич",
  "Ашимбаев Марат Умарбаевич",
  "Баркан Доминик Доминикович",
  "Болотин Владимир Васильевич",
  "Быховский Владимир Александрович",
  "Гольденблат Иосиф Израилевич",
  "Жунусов Толеубай Жунусович",
  "Завриев Кирияк Самсонович",
  "Ильичев Вячеслав Александрович",
  "Корчинский Иосиф Люцианович",
  "Назаров Армен Георгиевич",
  "Напетваридзе Шио Германович",
  "Николаенко Николай Александрович",
  "Поляков Святослав Васильевич",
  "Савин Олег Александрович",
];

// Страны развития научной школы
const SCHOOL_COUNTRIES = [
  "Азербайджан", "Армения", "Грузия", "Казахстан",
  "Кыргызстан", "Молдова", "Таджикистан", "Туркменистан",
  "Узбекистан", "Украина",
];

export function AuthorSection() {
  return (
    <section id="author" className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">05 · О авторе</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Акбиев Рустам{" "}
            <span className="text-[#00549F]">Тоганович</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Кандидат технических наук, автор 71 патента, основатель информационной
            системы СРОСС® и Международной научной школы «Сейсмическая безопасность
            сооружений и городов». Более 40 лет профессиональной деятельности в
            области сейсмостойкого строительства, градостроительства и оценки
            недвижимости.
          </p>
        </div>

        {/* Квалификация — 12 метрик */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">
            Квалификация и профессиональный стаж
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3]">
            {QUALIFICATIONS.map((q, i) => (
              <div key={i} className="bg-white p-4 hover:bg-[#E7EEF6] transition-colors">
                <div className="flex items-center gap-2 mb-2 text-[#00549F]">
                  {q.icon}
                </div>
                <div className="text-[22px] font-bold text-[#003366] leading-none mb-1">
                  {q.years}
                </div>
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#4A6378] font-semibold leading-tight">
                  {q.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Биография — таймлайн */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003366] mb-8 tracking-tight">
            Биография
          </h3>
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-px bg-[#D6DCE3] hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {BIO_TIMELINE.map((item, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -top-0.5 left-0 w-5 h-5 rounded-full border-2 z-10 ${
                      item.active
                        ? "bg-[#C8102E] border-[#C8102E]"
                        : "bg-white border-[#00549F]"
                    }`}
                  />
                  <div className="pt-8">
                    <div
                      className={`text-[14px] font-bold mb-1 ${
                        item.active ? "text-[#C8102E]" : "text-[#00549F]"
                      }`}
                    >
                      {item.year}
                    </div>
                    <div className="text-sm font-bold text-[#003366] mb-2 tracking-tight leading-snug">
                      {item.title}
                    </div>
                    <p className="text-xs text-[#4A6378] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Международная научная школа */}
        <div className="mb-16 p-8 lg:p-10 bg-white border border-[#D6DCE3]">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-6 w-6 text-[#00549F]" />
            <span className="eyebrow">Inter-SEISMO-School</span>
          </div>
          <h3 className="text-2xl font-bold text-[#003366] mb-4 tracking-tight leading-tight">
            Международная научная школа
            <br />
            <span className="text-[#00549F]">«Сейсмическая безопасность сооружений и городов»</span>
          </h3>
          <p className="text-sm text-[#4A6378] leading-relaxed mb-6">
            <strong className="text-[#003366]">Inter-SEISMO-School</strong> — более 15 лет
            развивается в рамках деятельности Евразийской СЕЙСМО Ассоциации (ЕАСА), на базе
            ФГБУ «ЦНИИП Минстроя России» совместно с организациями-партнёрами. История
            создания уходит корнями в события начала ХХ века, когда советскими учёными
            Академии наук РАН, Госстроя СССР и Минобороны началось формирование общего
            научного направления строительной науки под названием
            «Антисейсмическое строительство».
          </p>

          {/* Основоположники направления */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#003366] mb-3 tracking-tight">
              Выдающиеся учёные — основоположники направления:
            </h4>
            <div className="flex flex-wrap gap-2">
              {PIONEER_SCIENTISTS.map((name, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] bg-[#E7EEF6] text-[#003366] border border-[#D6DCE3] font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Страны развития */}
          <div>
            <h4 className="text-sm font-bold text-[#003366] mb-3 tracking-tight">
              География научной школы:
            </h4>
            <div className="flex flex-wrap gap-2">
              {SCHOOL_COUNTRIES.map((country, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] bg-[#003366] text-white font-medium"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Реализованные проекты */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">
            Реализованные проекты
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-[#D6DCE3] hover:border-[#00549F] hover:shadow-sm transition-all"
              >
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#C8102E] font-bold mb-2">
                  {project.category}
                </div>
                <h4 className="text-base font-bold text-[#003366] mb-2 tracking-tight leading-snug">
                  {project.title}
                </h4>
                <p className="text-sm text-[#4A6378] leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a
              href="https://akbiev.ru/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#003366] transition"
            >
              Все проекты на akbiev.ru
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Контакты автора */}
        <div className="p-6 bg-[#003366] text-white">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-white/80" />
            <span className="eyebrow text-white/80">Контакты автора</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-bold mb-1">
                  Телефон
                </div>
                <a
                  href="tel:+79260751111"
                  className="text-sm font-semibold text-white hover:text-[#5BA8DB] transition"
                >
                  +7 (926) 075-11-11
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-bold mb-1">
                  Email
                </div>
                <a
                  href="mailto:rt@akbiev.ru"
                  className="text-sm font-semibold text-white hover:text-[#5BA8DB] transition"
                >
                  rt@akbiev.ru
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-bold mb-1">
                  Офис
                </div>
                <div className="text-sm font-semibold text-white">
                  119331, Москва, пр-т Вернадского, 29
                  <br />
                  <span className="text-white/70 text-xs">этаж 19, пом. 1, комн. 24, 25</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/15">
            <a
              href="https://akbiev.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5BA8DB] hover:text-white transition"
            >
              Персональный сайт: akbiev.ru
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
