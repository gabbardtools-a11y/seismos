"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

/**
 * Клиентская форма входа. Пока не подключена к бэкенду —
 * показывает сообщение "функционал в разработке" при сабмите.
 * Позже подключим NextAuth.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Заполните email и пароль");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Неверный формат email");
      return;
    }

    // Пока бэкенда нет — показываем сообщение
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E7EEF6] mb-3">
          <AlertCircle className="h-6 w-6 text-[#00549F]" />
        </div>
        <h3 className="text-[16px] font-bold text-[#003366] mb-2">
          Функционал в разработке
        </h3>
        <p className="text-sm text-[#4A6378] leading-relaxed mb-4">
          Личный кабинет СРОСС® находится в стадии разработки.
          Для оформления заказов, получения сертификатов и доступа
          к документам свяжитесь с нами напрямую — мы ответим
          в течение рабочего дня.
        </p>
        <a
          href="mailto:info@seismo.ru"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00549F] hover:text-[#003366]"
        >
          info@seismo.ru
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A6378]/50" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-11 pl-10 pr-3 border border-[#D6DCE3] rounded-lg text-sm text-[#003366] placeholder:text-[#4A6378]/40 focus:outline-none focus:border-[#00549F] focus:ring-2 focus:ring-[#00549F]/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.14em] uppercase text-[#4A6378] font-semibold mb-1.5">
          Пароль
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A6378]/50" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 pl-10 pr-3 border border-[#D6DCE3] rounded-lg text-sm text-[#003366] placeholder:text-[#4A6378]/40 focus:outline-none focus:border-[#00549F] focus:ring-2 focus:ring-[#00549F]/20 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-1.5 text-[#4A6378] cursor-pointer">
          <input type="checkbox" className="rounded border-[#D6DCE3]" />
          Запомнить меня
        </label>
        <a href="#" className="text-[#00549F] hover:underline">
          Забыли пароль?
        </a>
      </div>

      <button
        type="submit"
        className="w-full h-11 bg-[#00549F] hover:bg-[#003366] text-white text-[13px] tracking-[0.14em] uppercase font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Войти
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
