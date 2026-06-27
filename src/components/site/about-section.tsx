import Link from "next/link";
import { CheckCircle2, History, Layers, Globe2, FileBadge, Network } from "lucide-react";

/**
 * О СИСТЕМЕ — большой блок с описанием миссии, статуса, истории.
 */
export function AboutSection() {
  return (
    <section id="about" className="section-pad bg-white border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">01 · О системе</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Информационная система{" "}
            <span className="text-[#00549F]">СРОСС®</span> —
            научно-инженерная основа сейсмобезопасности России
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Система объединяет данные о сейсмической опасности территорий,
            методологию оценки рисков и инструменты целевого планирования
            градостроительной деятельности. Развивается с 2009 года как
            зарегистрированное средство массовой информации и базовый проект
            международного консорциума «ГРАДОРЕСУРС®».
          </p>
        </div>

        {/* Три ключевые характеристики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={<FileBadge className="h-6 w-6" />}
            title="Статус СМИ"
            text="Зарегистрированное средство массовой информации (ЭЛ № ФС 77–39562 от 26.04.2010, Роскомнадзор). Цифровое развитие общества и координация профессиональной деятельности по обеспечению устойчивого пространственного развития сейсмических зон РФ."
          />
          <FeatureCard
            icon={<Network className="h-6 w-6" />}
            title="Международный проект"
            text="С 12 января 2009 года — базовый проект международного консорциума «ГРАДОРЕСУРС®», координируемый Евразийской СЕЙСМО Ассоциацией (ЕАСА). Открыт для присоединения новых участников из России, ЕАЭС и стран СНГ."
          />
          <FeatureCard
            icon={<History className="h-6 w-6" />}
            title="Преемственность с 1974 года"
            text="История системы восходит к реферативному журналу «Сейсмостойкое строительство», выпускавшемуся Госстроем СССР. Сегодня это цифровая платформа, сохраняющая научную школу и преемственность поколений."
          />
        </div>

        {/* Большая цитата / миссия */}
        <blockquote className="relative my-16 p-8 lg:p-12 bg-[#F2F4F7] border-l-4 border-[#00549F]">
          <div className="absolute top-4 right-6 text-[120px] leading-none text-[#00549F]/15 font-serif select-none">
            «
          </div>
          <p className="relative text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-[#003366] font-medium mb-6">
            Сейсмобезопасность — это не стихийное бедствие, а управляемый риск.
            Цель системы СРОСС® — превратить разрозненные данные о сейсмической
            опасности в целевое планирование градостроительной деятельности и
            снизить потери от землетрясений на территориях России и сопредельных
            стран.
          </p>
          <footer className="relative text-[13px] tracking-[0.12em] uppercase text-[#00549F] font-bold">
            — Миссия СРОСС® · SEISMO.RU
          </footer>
        </blockquote>

        {/* Историческая шкала */}
        <div className="mt-16">
          <h3 className="text-[20px] font-bold tracking-tight text-[#003366] mb-8">
            Хронология развития
          </h3>
          <div className="relative">
            {/* Линия */}
            <div className="absolute left-0 right-0 top-3 h-px bg-[#D6DCE3] hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              <TimelineItem
                year="1974"
                title="Госстрой СССР"
                text="Начат выпуск реферативного журнала «Сейсмостойкое строительство» — научная основа будущей системы."
              />
              <TimelineItem
                year="2004"
                title="Концепция"
                text="Сформулирована концепция информационного обеспечения сейсмобезопасности как основы целевого планирования."
              />
              <TimelineItem
                year="2009"
                title="Запуск seismo.ru"
                text="Регистрация домена, запуск информационной системы. Присоединение к консорциуму ГРАДОРЕСУРС®."
              />
              <TimelineItem
                year="2010"
                title="Статус СМИ"
                text="Получено свидетельство о регистрации средства массовой информации ЭЛ № ФС 77–39562."
              />
              <TimelineItem
                year="2026"
                title="СРОСС® 2.0"
                text="Новая редакция системы: открытые данные, патентованная технология «червяк», международная интеграция."
                active
              />
            </div>
          </div>
        </div>

        {/* Цели устойчивого развития ООН */}
        <div className="mt-20 p-8 lg:p-10 bg-[#003366] text-white">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3 mb-3">
                <Globe2 className="h-6 w-6 text-white/80" />
                <span className="eyebrow text-white/80">UN SDG 11</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Цели устойчивого развития
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Проект СРОСС® вносит прямой вклад в достижение Цели 11 ООН —
                «Устойчивые города и населённые пункты».
              </p>
            </div>
            <div className="lg:w-2/3 space-y-4">
              <SdgItem
                num="11.5"
                title="Снижение потерь от бедствий"
                text="К 2030 году — значительное снижение числа погибших и пострадавших от бедствий, в том числе от землетрясений, с особым вниманием нуждам женщин, детей, пожилых и инвалидов."
              />
              <SdgItem
                num="11.b"
                title="Политика включения и устойчивости"
                text="К 2020 году — существенное увеличение числа городов и населённых пунктов, принимающих и внедряющих интегрированные политики и планы по включению, эффективному использованию ресурсов, адаптации к изменению климата и устойчивости к бедствиям."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="p-7 border border-[#D6DCE3] bg-white hover:border-[#00549F] hover:shadow-sm transition-all">
      <div className="flex items-center justify-center w-12 h-12 bg-[#E7EEF6] text-[#00549F] mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#003366] mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[#4A6378] leading-relaxed">{text}</p>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  text,
  active,
}: {
  year: string;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={`absolute -top-0.5 left-0 w-6 h-6 rounded-full border-2 ${
          active
            ? "bg-[#C8102E] border-[#C8102E]"
            : "bg-white border-[#00549F]"
        } z-10`}
      />
      <div className="pt-10">
        <div
          className={`text-[22px] font-bold mb-1 ${
            active ? "text-[#C8102E]" : "text-[#00549F]"
          }`}
        >
          {year}
        </div>
        <div className="text-sm font-bold text-[#003366] mb-2 tracking-tight">
          {title}
        </div>
        <p className="text-xs text-[#4A6378] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function SdgItem({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-16 h-16 bg-[#00549F] flex items-center justify-center text-white font-bold text-sm">
        {num}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold mb-1 text-white">{title}</h4>
        <p className="text-sm text-white/75 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
