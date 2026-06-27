import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SrossemblemMark } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="bg-[#003366] text-white mt-auto">
      {/* Верхняя декоративная полоса с волной */}
      <div className="h-1 bg-gradient-to-r from-[#00549F] via-[#4A8DD2] to-[#00549F]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Колонка 1: Бренд */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <SrossemblemMark className="h-12 w-12" />
              <div className="leading-tight">
                <div className="text-lg font-bold tracking-[0.18em] text-white">
                  СРОСС<sup className="text-[9px] align-super">®</sup>
                </div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-white/70">
                  seismo.ru
                </div>
              </div>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Информационная система «Сейсмобезопасность России». Международный
              проект по устойчивому развитию территорий. Развивается с 2009 года
              на базе Евразийской СЕЙСМО Ассоциации.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">Разделы</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link href="#about" className="hover:text-white transition">О системе</Link></li>
              <li><Link href="#directions" className="hover:text-white transition">Направления</Link></li>
              <li><Link href="#partners" className="hover:text-white transition">Партнёры</Link></li>
              <li><Link href="#publications" className="hover:text-white transition">Публикации</Link></li>
              <li><Link href="#contacts" className="hover:text-white transition">Контакты</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Связанные ресурсы */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">Экосистема</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href="https://seismo.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  seismo.pro — ЕАСА ↗
                </a>
              </li>
              <li>
                <span className="opacity-60">ГРАДОРЕСУРС® — консорциум</span>
              </li>
              <li>
                <span className="opacity-60">100+ · ИНТЕРКОНСТРОЙ</span>
              </li>
              <li>
                <span className="opacity-60">РНКСС · GEOTEX · RISK</span>
              </li>
              <li>
                <span className="opacity-60">GRADINFO · SEISMO</span>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h4 className="eyebrow text-white/80 mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <a href="tel:+74997056712" className="hover:text-white transition">
                  +7 (499) 705 6712
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <a
                  href="mailto:office@seismo.pro"
                  className="hover:text-white transition"
                >
                  office@seismo.pro
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-white/60 shrink-0" />
                <span>
                  119331, Москва,<br />
                  проспект Вернадского, 29
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса — реквизиты СМИ */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] tracking-[0.08em] text-white/55 uppercase">
          <div>
            СМИ · Свидетельство ЭЛ № ФС 77–39562 от 26.04.2010 ·
            Роскомнадзор
          </div>
          <div className="flex items-center gap-3">
            <span>© 2009—2026 СРОСС®</span>
            <span className="opacity-30">·</span>
            <span>Патент · ТЗ «червяк»</span>
            <span className="opacity-30">·</span>
            <span>Все права защищены</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
