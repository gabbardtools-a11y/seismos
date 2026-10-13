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
  BookOpen,
  Award,
} from "lucide-react";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

type Direction = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlighted?: boolean;
};

/**
 * НАПРАВЛЕНИЯ — сетка из 24 направлений деятельности системы.
 * Иконки статичны, тексты — через словарь (Закон №3).
 */
function buildDirections(lang: 'ru' | 'en' | 'zh'): Direction[] {
  const icons = { Layers: <Layers />, Waves: <Waves />, Activity: <Activity />, Compass: <Compass />, FileText: <FileText />, LineChart: <LineChart />, FlaskConical: <FlaskConical />, Cpu: <Cpu />, Calculator: <Calculator />, AlertTriangle: <AlertTriangle />, MapPin: <MapPin />, Building2: <Building2 />, ShieldCheck: <ShieldCheck />, ShieldAlert: <ShieldAlert />, Vibrate: <Vibrate />, Pickaxe: <Pickaxe />, Beaker: <Beaker />, Brain: <Brain />, BookOpen: <BookOpen />, Award: <Award />, Microscope: <Microscope /> };
  return [
    { icon: icons.Layers, title: t("dir.1t", lang), desc: t("dir.1x", lang) },
    { icon: icons.Waves, title: t("dir.2t", lang), desc: t("dir.2x", lang) },
    { icon: icons.Activity, title: t("dir.3t", lang), desc: t("dir.3x", lang) },
    { icon: icons.Compass, title: t("dir.4t", lang), desc: t("dir.4x", lang) },
    { icon: icons.FileText, title: t("dir.5t", lang), desc: t("dir.5x", lang) },
    { icon: icons.LineChart, title: t("dir.6t", lang), desc: t("dir.6x", lang) },
    { icon: icons.FlaskConical, title: t("dir.7t", lang), desc: t("dir.7x", lang) },
    { icon: icons.Cpu, title: t("dir.8t", lang), desc: t("dir.8x", lang) },
    { icon: icons.Calculator, title: t("dir.9t", lang), desc: t("dir.9x", lang) },
    { icon: icons.AlertTriangle, title: t("dir.10t", lang), desc: t("dir.10x", lang) },
    { icon: icons.Waves, title: t("dir.11t", lang), desc: t("dir.11x", lang) },
    { icon: icons.MapPin, title: t("dir.12t", lang), desc: t("dir.12x", lang) },
    { icon: icons.Building2, title: t("dir.13t", lang), desc: t("dir.13x", lang) },
    { icon: icons.Building2, title: t("dir.14t", lang), desc: t("dir.14x", lang) },
    { icon: icons.ShieldCheck, title: t("dir.15t", lang), desc: t("dir.15x", lang) },
    { icon: icons.Cpu, title: t("dir.16t", lang), desc: t("dir.16x", lang) },
    { icon: icons.Microscope, title: t("dir.17t", lang), desc: t("dir.17x", lang) },
    { icon: icons.ShieldAlert, title: t("dir.18t", lang), desc: t("dir.18x", lang), highlighted: true },
    { icon: icons.Vibrate, title: t("dir.19t", lang), desc: t("dir.19x", lang) },
    { icon: icons.Pickaxe, title: t("dir.20t", lang), desc: t("dir.20x", lang) },
    { icon: icons.Beaker, title: t("dir.21t", lang), desc: t("dir.21x", lang) },
    { icon: icons.Brain, title: t("dir.22t", lang), desc: t("dir.22x", lang), highlighted: true },
    { icon: icons.BookOpen, title: t("dir.23t", lang), desc: t("dir.23x", lang) },
    { icon: icons.Award, title: t("dir.24t", lang), desc: t("dir.24x", lang) },
  ];
}

export async function DirectionsSection() {
  const lang = await getLang();
  const DIRECTIONS = buildDirections(lang);

  return (
    <section id="directions" className="section-pad bg-[#FAF7F2] border-b border-[#D6DCE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">{t("dir.eyebrow", lang)}</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            {t("dir.h2", lang)}
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {t("dir.lead", lang)}
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
            <div className="eyebrow text-white/70 mb-3">{t("worm.eyebrow", lang)}</div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">
              {t("worm.h3", lang)}
            </h3>
            <div className="text-[11px] tracking-[0.14em] uppercase text-white/60">
              {t("worm.badge", lang)}
            </div>
          </div>
          <div className="lg:col-span-2 text-sm text-white/80 leading-relaxed">
            <p className="mb-4">
              {t("worm.p1", lang)}
            </p>
            <p>
              {t("worm.p2", lang)}
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
