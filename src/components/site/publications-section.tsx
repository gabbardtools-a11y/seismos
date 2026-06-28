import Link from "next/link";
import { FileText, ExternalLink, Calendar, BookOpen } from "lucide-react";

/**
 * ПУБЛИКАЦИИ — теоретическая база системы (4 статьи 2004–2017 гг.).
 */
const PUBLICATIONS = [
  {
    year: "2004",
    number: "№ 6",
    pages: "5–7",
    title:
      "Информационное обеспечение сейсмобезопасности как основа целевого планирования",
    authors: "Айзенберг Я.М., Акбиев Р.Т., Смирнов В.И.",
    journal: "Сейсмостойкое строительство. Безопасность сооружений",
    url: "https://akbiev.ru/wp-content/uploads/2024/01/2004_06_02.pdf",
    abstract:
      "Сформулирована концепция информационного обеспечения сейсмобезопасности как самостоятельной научно-практической задачи. Показано, что без целостной информационной системы невозможно перейти от реактивных мер к целевому планированию градостроительной деятельности в сейсмических зонах.",
    tags: ["концепция", "целевое планирование", "информационное обеспечение"],
  },
  {
    year: "2008",
    number: "№ 1",
    pages: "51–55",
    title: "Информационные ресурсы и управление развитием территорий",
    authors: "Акбиев Р.Т., Заболоцкая Е.Н.",
    journal: "Сейсмостойкое строительство. Безопасность сооружений",
    url: "https://akbiev.ru/wp-content/uploads/2024/01/2008_01_02.pdf",
    abstract:
      "Рассмотрены информационные ресурсы как ключевой инструмент управления развитием территорий. Предложена структура интегрированной информационной системы, обеспечивающей связь между сейсмологическими данными, градостроительными решениями и стратегией пространственного развития.",
    tags: ["информационные ресурсы", "управление", "территории"],
  },
  {
    year: "2008",
    number: "№ 5",
    pages: "52–56",
    title:
      "Стратегия информатизации градостроительной деятельности с учетом задач по обеспечению сейсмической безопасности территорий",
    authors: "Акбиев Р.Т., Аксенова Н.Г., Заболоцкая Е.Н.",
    journal: "Сейсмостойкое строительство. Безопасность сооружений",
    url: "https://akbiev.ru/wp-content/uploads/2024/01/2008_05_02.pdf",
    abstract:
      "Разработана стратегия информатизации градостроительной деятельности, в которой сейсмическая безопасность рассматривается как неотъемлемая составляющая пространственного развития. Определены приоритеты, этапы и организационные механизмы внедрения информационных технологий в практику управления.",
    tags: ["стратегия", "информатизация", "градостроительная деятельность"],
  },
  {
    year: "2017",
    number: "№ 4 (30)",
    pages: "53–54",
    title:
      "Предложения по концепции информационной системы «SEISMO.SU»",
    authors: "Акбиев Р.Т., Морозова Т.В.",
    journal: "Природные и техногенные риски. Безопасность сооружений",
    url: "https://akbiev.ru/wp-content/uploads/2022/03/PTRBS_2017_4_53-54.pdf",
    abstract:
      "Сформулированы предложения по концепции информационной системы «SEISMO.SU» — прямой предшественнице СРОСС®. Определены архитектурные принципы, состав данных и функциональные блоки системы, обеспечивающей профессиональное сообщество актуальной информацией о сейсмической опасности.",
    tags: ["концепция", "SEISMO.SU", "архитектура системы"],
    featured: true,
  },
];

export function PublicationsSection() {
  return (
    <section id="publications" className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">05 · Публикации · Теоретическая база</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Научная школа СРОСС®
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Концептуальные основы информационной системы СРОСС® заложены в серии
            научных публикаций 2004–2017 годов. Эти работы сформулировали
            ключевые принципы перехода от реактивных мер сейсмобезопасности к
            целевому планированию градостроительной деятельности на основе
            интегрированных информационных ресурсов.
          </p>
        </div>

        {/* Список публикаций */}
        <div className="space-y-6">
          {PUBLICATIONS.map((pub, i) => (
            <PublicationCard key={i} {...pub} index={i + 1} />
          ))}
        </div>

        {/* Блок теоретического наследия */}
        <div className="mt-16 p-8 lg:p-10 bg-white border border-[#D6DCE3]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <BookOpen className="h-8 w-8 text-[#00549F] mb-4" />
              <h3 className="text-xl font-bold text-[#003366] mb-2 tracking-tight">
                От журнала к цифровой системе
              </h3>
              <p className="text-sm text-[#4A6378] leading-relaxed">
                Теоретическая база системы СРОСС® восходит к реферативному
                журналу «Сейсмостойкое строительство» Госстроя СССР,
                выпускавшемуся с 1974 года. 50-летняя преемственность научной
                школы — ключевая ценность проекта.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <PubStat value="1974" label="год основания" />
              <PubStat value="50+" label="лет научной школы" />
              <PubStat value="4" label="ключевые статьи" />
              <PubStat value="13" label="лет развития концепции (2004–2017)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicationCard({
  year,
  number,
  pages,
  title,
  authors,
  journal,
  url,
  abstract,
  tags,
  index,
  featured,
}: {
  year: string;
  number: string;
  pages: string;
  title: string;
  authors: string;
  journal: string;
  url: string;
  abstract: string;
  tags: string[];
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={`group p-6 lg:p-8 border transition-all ${
        featured
          ? "bg-[#E7EEF6] border-[#00549F] border-l-4 border-l-[#00549F]"
          : "bg-white border-[#D6DCE3] hover:border-[#00549F]"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Левая колонка: индекс + год */}
        <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-1">
          <div className="text-[10px] tracking-[0.18em] uppercase text-[#4A6378] font-mono">
            {index.toString().padStart(2, "0")} / {PUBLICATIONS.length.toString().padStart(2, "0")}
          </div>
          <div>
            <div className="text-[36px] font-bold text-[#00549F] leading-none">
              {year}
            </div>
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#4A6378] mt-1">
              {number} · С. {pages}
            </div>
          </div>
        </div>

        {/* Средняя колонка: содержимое */}
        <div className="lg:col-span-8">
          <h3 className="text-lg lg:text-xl font-bold text-[#003366] mb-2 tracking-tight leading-snug">
            {title}
          </h3>
          <div className="text-sm font-semibold text-[#00549F] mb-3">
            {authors}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#4A6378] mb-4">
            <Calendar className="h-3 w-3" />
            <span className="italic">{journal}</span>
          </div>
          <p className="text-sm text-[#4A6378] leading-relaxed mb-4">
            {abstract}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-semibold bg-[#F2F4F7] text-[#4A6378] border border-[#D6DCE3]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Правая колонка: ссылка на PDF */}
        <div className="lg:col-span-2 flex lg:flex-col items-start gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00549F] text-white text-[11px] tracking-[0.12em] uppercase font-bold hover:bg-[#003366] transition w-full justify-center"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-semibold text-[#00549F] hover:text-[#003366] transition"
          >
            Открыть
            <ExternalLink className="h-3 w-3" />
          </a>
          {featured && (
            <span className="inline-block px-2 py-1 bg-[#C8102E] text-white text-[9px] tracking-[0.14em] uppercase font-bold">
              Базовая статья
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function PubStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[28px] font-bold text-[#00549F] leading-none">
        {value}
      </div>
      <div className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378] mt-2">
        {label}
      </div>
    </div>
  );
}
