import Link from "next/link";
import { ExternalLink, Users, Building, Globe2, ArrowRight } from "lucide-react";

/**
 * ПАРТНЁРЫ — экосистема ЕАСА и связанных организаций.
 */
const PARTNERS = [
  {
    name: "ЕАСА",
    full: "Евразийская СЕЙСМО Ассоциация",
    desc: "Международная организация с историей более 50 лет. Координатор консорциума ГРАДОРЕСУРС® и базовых проектов системы СРОСС®.",
    url: "https://seismo.pro",
    badge: "seismo.pro",
  },
  {
    name: "ГРАДОРЕСУРС®",
    full: "Международный консорциум",
    desc: "Координационная структура, объединяющая профессиональные организации в сфере градостроительной безопасности территорий ЕАЭС.",
    badge: "Консорциум",
  },
  {
    name: "100+",
    full: "Форум и выставка",
    desc: "Крупнейшая отраслевая площадка, посвящённая строительству и сейсмобезопасности в сейсмических регионах России.",
    badge: "Форум",
  },
  {
    name: "ИНТЕРКОНСТРОЙ",
    full: "Международная ассоциация",
    desc: "Ассоциация строительных организаций стран СНГ. Площадка профессионального сотрудничества и обмена опытом.",
    badge: "Ассоциация",
  },
  {
    name: "РНКСС",
    full: "Российский национальный комитет",
    desc: "Российский национальный комитет по сейсмостойкому строительству. Представительство России в IAEE.",
    badge: "Комитет",
  },
  {
    name: "GEOTEX",
    full: "Геотехническая платформа",
    desc: "Профильная платформа по геотехнике и инженерным изысканиям в сейсмических зонах.",
    badge: "Платформа",
  },
  {
    name: "GRADINFO",
    full: "Градостроительная информация",
    desc: "Информационная система градостроительной деятельности, интегрированная с данными СРОСС®.",
    badge: "Система",
  },
  {
    name: "RISK",
    full: "Управление рисками",
    desc: "Платформа методологии оценки и управления природными и техногенными рисками территорий.",
    badge: "Методология",
  },
];

const REGIONS = [
  "Россия / Москва",
  "Камчатский край",
  "Санкт-Петербург",
  "Волгоградская обл.",
  "Иркутская обл.",
  "Республика Алтай",
  "Республика Дагестан",
  "Республика Ингушетия",
  "Республика Казахстан",
];

export function PartnersSection() {
  return (
    <section id="partners" className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">04 · Партнёры</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Экосистема СРОСС®
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Информационная система развивается в тесной координации с
            профессиональными ассоциациями, региональными представительствами и
            отраслевыми платформами. В экосистему входит более 9 региональных
            представительств ЕАЭС и стран СНГ.
          </p>
        </div>

        {/* Сетка партнёров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D6DCE3] border border-[#D6DCE3] mb-16">
          {PARTNERS.map((p, i) => (
            <PartnerCard key={i} {...p} />
          ))}
        </div>

        {/* Региональные представительства */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Globe2 className="h-5 w-5 text-[#00549F]" />
              <span className="eyebrow">Региональные представительства</span>
            </div>
            <h3 className="text-2xl font-bold text-[#003366] mb-3 tracking-tight">
              9 регионов ЕАЭС
            </h3>
            <p className="text-sm text-[#4A6378] leading-relaxed mb-6">
              Региональные представительства ЕАСА обеспечивают координацию
              экспертов на местах и работу с региональными органами власти.
              Открыты для присоединения новых регионов.
            </p>
            <Link
              href="https://seismo.pro"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#003366] transition"
            >
              Все представительства на seismo.pro
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {REGIONS.map((r, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-[#F2F4F7] border-l-2 border-[#00549F] text-sm font-medium text-[#003366]"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Блок «Присоединиться» */}
        <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-[#00549F] to-[#003366] text-white">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-6 w-6 text-white/80" />
                <span className="eyebrow text-white/80">Открытое сообщество</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 tracking-tight">
                Присоединяйтесь к экосистеме СРОСС®
              </h3>
              <p className="text-base text-white/85 leading-relaxed max-w-2xl">
                Система открыта для присоединения новых участников — научных
                организаций, проектных институтов, экспертов в области
                сейсмобезопасности, региональных органов власти. Участие в
                системе даёт доступ к данным, методологии и профессиональному
                сообществу ЕАЭС.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:office@seismo.pro?subject=Запрос%20на%20участие%20в%20СРОСС"
                className="inline-flex items-center justify-center bg-white text-[#003366] px-6 py-3 text-[13px] tracking-[0.14em] uppercase font-bold hover:bg-[#E7EEF6] transition"
              >
                Запросить участие
              </a>
              <a
                href="https://seismo.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/40 text-white px-6 py-3 text-[13px] tracking-[0.14em] uppercase font-bold hover:bg-white/10 transition"
              >
                Вступить в ЕАСА
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  name,
  full,
  desc,
  url,
  badge,
}: {
  name: string;
  full: string;
  desc: string;
  url?: string;
  badge: string;
}) {
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block bg-white p-6 hover:bg-[#E7EEF6] transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <Building className="h-6 w-6 text-[#00549F]" />
        <span className="text-[10px] tracking-[0.14em] uppercase text-[#4A6378]/60 font-mono">
          {badge}
        </span>
      </div>
      <div className="text-lg font-bold text-[#003366] mb-1 tracking-tight">
        {name}
      </div>
      <div className="text-[11px] tracking-[0.08em] uppercase text-[#00549F] font-semibold mb-3">
        {full}
      </div>
      <p className="text-xs text-[#4A6378] leading-relaxed">{desc}</p>
      {url && (
        <div className="mt-4 flex items-center gap-1 text-[11px] tracking-[0.12em] uppercase font-bold text-[#00549F] opacity-0 group-hover:opacity-100 transition">
          Открыть
          <ExternalLink className="h-3 w-3" />
        </div>
      )}
    </Wrapper>
  );
}
