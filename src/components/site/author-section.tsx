import { GraduationCap, BookOpen, Users, Award, Building2, Microscope, Briefcase, Scale, FileText, Megaphone, Lightbulb, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

/**
 * О АВТОРЕ — Биография Акбиева Рустама Тогановича
 *
 * Источник: https://akbiev.ru/biography/
 * Научная школа: https://akbiev.ru/scientific-school/
 * Портфолио: https://akbiev.ru/portfolio/
 */

// Квалификация — 12 направлений профессионального стажа (labels из словаря)
const QUAL_KEYS = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12"] as const;
const QUAL_YEARS = ["40+", "35+", "40+", "40+", "30+", "30+", "30+", "30+", "25+", "15+", "25+", "20+"];
const QUAL_ICONS = [
  <Briefcase key="i1" className="h-5 w-5" />, <Building2 key="i2" className="h-5 w-5" />,
  <BookOpen key="i3" className="h-5 w-5" />, <Microscope key="i4" className="h-5 w-5" />,
  <Scale key="i5" className="h-5 w-5" />, <Briefcase key="i6" className="h-5 w-5" />,
  <Award key="i7" className="h-5 w-5" />, <Users key="i8" className="h-5 w-5" />,
  <FileText key="i9" className="h-5 w-5" />, <Megaphone key="i10" className="h-5 w-5" />,
  <Users key="i11" className="h-5 w-5" />, <Lightbulb key="i12" className="h-5 w-5" />,
];

function buildQualifications(lang: 'ru' | 'en' | 'zh') {
  return QUAL_KEYS.map((k, i) => ({
    icon: QUAL_ICONS[i],
    label: t(`auth.${k}`, lang),
    years: QUAL_YEARS[i],
  }));
}

// Ключевые вехи биографии (тексты из словаря)
function buildBio(lang: 'ru' | 'en' | 'zh') {
  const years = ["1963", "1980—1985", "1983", "1984—1987", "1987", "1986—1988", "1991", "1991", "1993", "1993—2001", "2009", "2010", "2026"];
  return years.map((year, i) => ({
    year,
    title: t(`auth.b${i + 1}t`, lang),
    text: t(`auth.b${i + 1}x`, lang),
    ...(i === 12 ? { active: true } : {}),
  }));
}

// Реализованные проекты (названия — бренды, категории/описания — из словаря)
function buildProjects(lang: 'ru' | 'en' | 'zh') {
  return [
    {
      title: "Гостиничный комплекс",
      category: t("auth.pr1c", lang),
      description: t("auth.pr1x", lang),
    },
    {
      title: "Жилой комплекс с автостоянкой",
      category: t("auth.pr2c", lang),
      description: t("auth.pr2x", lang),
    },
    {
      title: "Находкинский завод минеральных удобрений",
      category: t("auth.pr3c", lang),
      description: t("auth.pr3x", lang),
    },
    {
      title: "Северо-Кавказский федеральный научно-клинический центр ФМБА",
      category: t("auth.pr4c", lang),
      description: t("auth.pr4x", lang),
    },
  ];
}

function buildCountries(lang: 'ru' | 'en' | 'zh') {
  return [
    t("auth.c1", lang), t("auth.c2", lang), t("auth.c3", lang), t("auth.c4", lang),
    t("auth.c5", lang), t("auth.c6", lang), t("auth.c7", lang), t("auth.c8", lang),
    t("auth.c9", lang), t("auth.c10", lang),
  ];
}

export async function AuthorSection() {
  const lang = await getLang();
  const QUALIFICATIONS = buildQualifications(lang);
  const BIO_TIMELINE = buildBio(lang);
  const PROJECTS = buildProjects(lang);
  const SCHOOL_COUNTRIES = buildCountries(lang);

  // Выдающиеся учёные — основоположники (имена собственные — без перевода)
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

  return (
    <section id="author" className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">{t("auth.eyebrow", lang)}</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            {t("auth.h2a", lang)}{" "}
            <span className="text-[#00549F]">{t("auth.h2b", lang)}</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {t("auth.lead", lang)}
          </p>
        </div>

        {/* Квалификация — 12 метрик */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">
            {t("auth.qualsH", lang)}
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
            {t("auth.bioH", lang)}
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
            <span className="eyebrow">{t("auth.schoolEyebrow", lang)}</span>
          </div>
          <h3 className="text-2xl font-bold text-[#003366] mb-4 tracking-tight leading-tight">
            {t("auth.schoolH1", lang)}
            <br />
            <span className="text-[#00549F]">{t("auth.schoolH2", lang)}</span>
          </h3>
          <p className="text-sm text-[#4A6378] leading-relaxed mb-6">
            {t("auth.schoolLead", lang)}
          </p>

          {/* Основоположники направления */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-[#003366] mb-3 tracking-tight">
              {t("auth.pioneersH", lang)}
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
              {t("auth.geogH", lang)}
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
            {t("auth.projectsH", lang)}
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
              {t("auth.projectsLink", lang)}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Контакты автора */}
        <div className="p-6 bg-[#003366] text-white">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-white/80" />
            <span className="eyebrow text-white/80">{t("auth.contactsEyebrow", lang)}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-white/60 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] tracking-[0.14em] uppercase text-white/60 font-bold mb-1">
                  {t("auth.phone", lang)}
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
                  {t("auth.email", lang)}
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
                  {t("auth.office", lang)}
                </div>
                <div className="text-sm font-semibold text-white">
                  {t("auth.officeAddr", lang)}
                  <br />
                  <span className="text-white/70 text-xs">{t("auth.officeRoom", lang)}</span>
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
              {t("auth.personalSite", lang)}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
