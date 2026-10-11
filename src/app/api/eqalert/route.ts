import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/eqalert?id=<report_id>
 *   Проксирование к rest-api.eqalert.ru/api/v1/reports/<id>
 *   Нужно чтобы обойти CORS и сохранить свой фронтенд.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  // Защита от проброса произвольных URL
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid id format" },
      { status: 400 }
    );
  }

  try {
    const url = `https://rest-api.eqalert.ru/api/v1/reports/${encodeURIComponent(id)}`;
    const upstream = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "seismos.ru/1.0 (proxy)",
      },
      // Кэшируем на 60 секунд, чтобы не дёргать eqalert при каждом запросе
      next: { revalidate: 60 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `eqalert.ru returned ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 }
    );
  }
}
