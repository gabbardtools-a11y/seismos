/**
 * Страница /login — личный кабинет.
 * Пока простая заглушка с формой входа.
 * Позже можно подключить NextAuth (next-auth уже в зависимостях).
 */
import Link from "next/link";
import { ArrowLeft, UserCircle, Lock, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Личный кабинет",
  description: "Вход в личный кабинет СРОСС® — сертификация сейсмостойкости, заказы, документы.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00549F]" />

      <div className="mx-auto max-w-md px-4 sm:px-6 py-12 lg:py-20">
        <div className="mb-6 flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold">
          <Link href="/" className="hover:text-[#00549F] flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            На главную
          </Link>
        </div>

        <div className="bg-white border border-[#D6DCE3] rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E7EEF6] mb-4">
              <UserCircle className="h-9 w-9 text-[#00549F]" />
            </div>
            <h1 className="text-[26px] font-bold text-[#003366] mb-2">
              Личный кабинет
            </h1>
            <p className="text-sm text-[#4A6378]">
              Войдите для доступа к заказам, документам и сертификатам
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 pt-6 border-t border-[#D6DCE3] text-center">
            <p className="text-xs text-[#4A6378] mb-3">Нет аккаунта?</p>
            <Link
              href="#contacts"
              className="text-sm font-semibold text-[#00549F] hover:text-[#003366] hover:underline"
            >
              Обратитесь к нам для регистрации →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] tracking-[0.1em] uppercase text-[#4A6378]/70">
          СРОСС® · Сейсмобезопасность · SDG 11 ООН
        </p>
      </div>
    </main>
  );
}
