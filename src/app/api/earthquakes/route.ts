import { NextResponse } from "next/server";
import {
  normalizeReport,
  type EqApiReport,
  type EqEvent,
  type EqResponse,
} from "@/lib/earthquakes";

/**
 * Серверный прокси к открытому API eqalert.ru.
 *
 * Зачем прокси: rest-api.eqalert.ru не отдаёт CORS-заголовки для браузера,
 * поэтому запрос делаем с сервера и кэшируем результат на 2 минуты,
 * чтобы не нагружать источник.
 */

const UPSTREAM =
  "https://rest-api.eqalert.ru/api/v1/reports/lightweightList?limit=100";
const REVALIDATE_SECONDS = 120;

/** Последний удачный ответ — для аварийной отдачи, если источник упал. */
let lastGood: { fetchedAt: string; events: EqEvent[] } | null = null;

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      headers: { accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) {
      throw new Error(`источник ответил ${res.status}`);
    }
    const json = (await res.json()) as { data?: EqApiReport[] };
    const events = (json.data ?? [])
      .map(normalizeReport)
      .filter((e): e is EqEvent => e !== null)
      .sort((a, b) => b.time.localeCompare(a.time));

    const payload: EqResponse = {
      ok: true,
      source: "eqalert.ru",
      fetchedAt: new Date().toISOString(),
      events,
    };
    lastGood = { fetchedAt: payload.fetchedAt, events };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "неизвестная ошибка";
    if (lastGood && lastGood.events.length > 0) {
      const payload: EqResponse = {
        ok: true,
        stale: true,
        source: "eqalert.ru",
        fetchedAt: lastGood.fetchedAt,
        events: lastGood.events,
        error: `Источник недоступен (${message}). Показаны последние сохранённые данные.`,
      };
      return NextResponse.json(payload);
    }
    const payload: EqResponse = {
      ok: false,
      source: "eqalert.ru",
      fetchedAt: new Date().toISOString(),
      events: [],
      error: `Не удалось получить данные eqalert.ru: ${message}`,
    };
    return NextResponse.json(payload);
  }
}
