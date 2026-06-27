"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ContactsSection() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Имитация отправки (нет бэкенда — просто показываем toast)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast({
      title: "Запрос отправлен",
      description:
        "Спасибо! Мы свяжемся с вами в течение 1–2 рабочих дней по указанному e-mail.",
    });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contacts" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">05 · Контакты</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            Связаться с командой СРОСС®
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            Запросы на участие в системе, доступ к данным, методологическую и
            экспертную поддержку, а также предложения по сотрудничеству
            принимаются через форму или по прямым контактам ниже.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Левая колонка: контакты и реквизиты */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label="Телефон"
                value="+7 (499) 705 6712"
                href="tel:+74997056712"
              />
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label="Электронная почта"
                value="office@seismo.pro"
                href="mailto:office@seismo.pro"
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label="Адрес"
                value={
                  <>
                    119331, Москва,
                    <br />
                    проспект Вернадского, 29
                  </>
                }
              />
            </div>

            {/* Реквизиты СМИ */}
            <div className="mt-10 p-6 bg-[#F2F4F7] border-l-4 border-[#00549F]">
              <div className="eyebrow mb-3">Реквизиты СМИ</div>
              <div className="text-sm text-[#003366] leading-relaxed">
                <p className="mb-2">
                  <strong>Свидетельство:</strong> ЭЛ № ФС 77–39562
                </p>
                <p className="mb-2">
                  <strong>Дата регистрации:</strong> 26.04.2010
                </p>
                <p className="mb-2">
                  <strong>Регистратор:</strong> Роскомнадзор
                </p>
                <p className="text-xs text-[#4A6378] mt-3 pt-3 border-t border-[#D6DCE3]">
                  Учредитель: Шолленберг Е. Ф.
                  <br />
                  Главный редактор: Заболоцкая Е. Н.
                </p>
              </div>
            </div>

            {/* Связанные ресурсы */}
            <div className="mt-8">
              <div className="eyebrow mb-4">Связанные ресурсы</div>
              <div className="flex flex-col gap-2">
                <a
                  href="https://seismo.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3 bg-[#003366] text-white text-sm hover:bg-[#00549F] transition"
                >
                  <span>seismo.pro — ЕАСА</span>
                  <span className="text-xs tracking-[0.12em] uppercase opacity-70">
                    Перейти →
                  </span>
                </a>
                <a
                  href="https://akbiev.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3 bg-white border border-[#D6DCE3] text-[#003366] text-sm hover:bg-[#E7EEF6] transition"
                >
                  <span>akbiev.ru — публикации</span>
                  <span className="text-xs tracking-[0.12em] uppercase opacity-60">
                    Перейти →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Правая колонка: форма */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 bg-[#FAF7F2] border border-[#D6DCE3]"
            >
              <h3 className="text-xl font-bold text-[#003366] mb-6 tracking-tight">
                Отправить запрос
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="Имя">
                  <Input
                    required
                    name="name"
                    placeholder="Ваше имя"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
                <Field label="Организация">
                  <Input
                    name="organization"
                    placeholder="Название организации"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="E-mail">
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.ru"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
                <Field label="Телефон">
                  <Input
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
              </div>

              <Field label="Тема запроса" className="mb-5">
                <select
                  required
                  name="topic"
                  className="w-full h-11 px-3 bg-white border border-[#D6DCE3] focus:border-[#00549F] text-sm text-[#003366] rounded-sm"
                >
                  <option value="">Выберите тему...</option>
                  <option>Участие в системе СРОСС®</option>
                  <option>Доступ к данным о сейсмической опасности</option>
                  <option>Методологическая поддержка</option>
                  <option>Экспертная оценка / экспертиза</option>
                  <option>Сотрудничество / партнёрство</option>
                  <option>Вступление в ЕАСА</option>
                  <option>Другое</option>
                </select>
              </Field>

              <Field label="Сообщение" className="mb-6">
                <Textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Кратко опишите ваш запрос..."
                  className="bg-white border-[#D6DCE3] focus:border-[#00549F] resize-none"
                />
              </Field>

              <div className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  required
                  id="consent"
                  className="mt-1 w-4 h-4 accent-[#00549F]"
                />
                <label
                  htmlFor="consent"
                  className="text-xs text-[#4A6378] leading-relaxed"
                >
                  Я согласен с обработкой персональных данных в соответствии
                  с политикой конфиденциальности и Федеральным законом
                  № 152-ФЗ «О персональных данных».
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#00549F] hover:bg-[#003366] text-white text-[13px] tracking-[0.14em] uppercase font-semibold h-12 px-8"
              >
                {submitting ? (
                  "Отправка..."
                ) : (
                  <>
                    Отправить запрос
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="mt-6 flex items-center gap-2 text-xs text-[#4A6378]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00549F]" />
                <span>
                  Среднее время ответа — 1–2 рабочих дня
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-12 h-12 bg-[#E7EEF6] text-[#00549F] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="eyebrow mb-1.5">{label}</div>
        <div className="text-base font-semibold text-[#003366]">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition">
        {content}
      </a>
    );
  }
  return content;
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs font-semibold tracking-[0.1em] uppercase text-[#4A6378] mb-2 block">
        {label}
      </Label>
      {children}
    </div>
  );
}
