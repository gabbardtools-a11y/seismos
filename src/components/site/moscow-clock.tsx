"use client";

import { useEffect, useState } from "react";

/**
 * MoscowClock — живое московское время (MSK, UTC+3).
 * Обновляется каждую секунду. Формат: HH:MM:SS.
 *
 * Используется в SeismogramDivider справа рядом с «ОК · 0 событий».
 */
export function MoscowClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    // Форматирование времени в Europe/Moscow (UTC+3) вне зависимости от
    // часового пояса браузера пользователя.
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => {
      try {
        setTime(fmt.format(new Date()));
      } catch {
        setTime("--:--:--");
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={className}>{time}</span>;
}
