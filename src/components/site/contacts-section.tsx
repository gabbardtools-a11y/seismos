"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function ContactsSection() {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Имитация отправки (нет бэкенда — просто показываем toast)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast({
      title: t("cont.toastT"),
      description: t("cont.toastD"),
    });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contacts" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#00549F]" />
            <span className="eyebrow">{t("cont.eyebrow")}</span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.015em] text-[#003366] mb-6 leading-[1.1]">
            {t("cont.h2")}
          </h2>
          <p className="text-base sm:text-lg text-[#4A6378] leading-relaxed">
            {t("cont.lead")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Левая колонка: контакты и реквизиты */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label={t("cont.phone")}
                value="+7 (499) 705 6712"
                href="tel:+74997056712"
              />
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label={t("cont.email")}
                value="office@seismo.pro"
                href="mailto:office@seismo.pro"
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label={t("cont.addr")}
                value={t("cont.addrValue")}
              />
            </div>

            {/* Реквизиты СМИ */}
            <div className="mt-10 p-6 bg-[#F2F4F7] border-l-4 border-[#00549F]">
              <div className="eyebrow mb-3">{t("cont.mediaH")}</div>
              <div className="text-sm text-[#003366] leading-relaxed">
                <p className="mb-2">
                  <strong>{t("cont.mSert")}</strong> ЭЛ № ФС 77–39562
                </p>
                <p className="mb-2">
                  <strong>{t("cont.mDate")}</strong> 26.04.2010
                </p>
                <p className="mb-2">
                  <strong>{t("cont.mReg")}</strong> Роскомнадзор
                </p>
                <p className="text-xs text-[#4A6378] mt-3 pt-3 border-t border-[#D6DCE3]">
                  {t("cont.mFounder")}
                  <br />
                  {t("cont.mEditor")}
                </p>
              </div>
            </div>

            {/* Связанные ресурсы */}
            <div className="mt-8">
              <div className="eyebrow mb-4">{t("cont.resH")}</div>
              <div className="flex flex-col gap-2">
                <a
                  href="https://seismo.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3 bg-[#003366] text-white text-sm hover:bg-[#00549F] transition"
                >
                  <span>{t("cont.res1")}</span>
                  <span className="text-xs tracking-[0.12em] uppercase opacity-70">
                    {t("cont.go")}
                  </span>
                </a>
                <a
                  href="https://akbiev.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3 bg-white border border-[#D6DCE3] text-[#003366] text-sm hover:bg-[#E7EEF6] transition"
                >
                  <span>{t("cont.res2")}</span>
                  <span className="text-xs tracking-[0.12em] uppercase opacity-60">
                    {t("cont.go")}
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
                {t("cont.formH")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label={t("cont.fName")}>
                  <Input
                    required
                    name="name"
                    placeholder={t("cont.fNamePh")}
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
                <Field label={t("cont.fOrg")}>
                  <Input
                    name="organization"
                    placeholder={t("cont.fOrgPh")}
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label={t("cont.fEmail")}>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.ru"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
                <Field label={t("cont.fPhone")}>
                  <Input
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    className="bg-white border-[#D6DCE3] focus:border-[#00549F] h-11"
                  />
                </Field>
              </div>

              <Field label={t("cont.fTopic")} className="mb-5">
                <select
                  required
                  name="topic"
                  className="w-full h-11 px-3 bg-white border border-[#D6DCE3] focus:border-[#00549F] text-sm text-[#003366] rounded-sm"
                >
                  <option value="">{t("cont.fTopicPh")}</option>
                  <option>{t("cont.t1")}</option>
                  <option>{t("cont.t2")}</option>
                  <option>{t("cont.t3")}</option>
                  <option>{t("cont.t4")}</option>
                  <option>{t("cont.t5")}</option>
                  <option>{t("cont.t6")}</option>
                  <option>{t("cont.t7")}</option>
                </select>
              </Field>

              <Field label={t("cont.fMsg")} className="mb-6">
                <Textarea
                  required
                  name="message"
                  rows={5}
                  placeholder={t("cont.fMsgPh")}
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
                  {t("cont.consent")}
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#00549F] hover:bg-[#003366] text-white text-[13px] tracking-[0.14em] uppercase font-semibold h-12 px-8"
              >
                {submitting ? (
                  t("cont.submitting")
                ) : (
                  <>
                    {t("cont.submit")}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="mt-6 flex items-center gap-2 text-xs text-[#4A6378]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00549F]" />
                <span>
                  {t("cont.avgTime")}
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
