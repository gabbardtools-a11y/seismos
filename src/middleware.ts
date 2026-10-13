/**
 * Next.js 16 middleware для трёхъязычности seismo.ru (СРОСС®) — RU/EN/ZH.
 * Эталон: mktu (SSR-заголовок) ← aipat (фикс цикла Next 16) ← iznaki (Next 15).
 *
 * Логика:
 * - URL /en/... → rewrite на /... + cookie lang=en + request-header x-seismos-lang
 * - URL /zh/... → rewrite на /... + cookie lang=zh + request-header x-seismos-lang
 * - URL /... (без префикса) → отдаётся как есть; язык SSR берётся из cookie.
 *
 * ОТЛИЧИЕ ОТ ЭТАЛОНА iznaki (Next 15): в Next 16 middleware (Proxy) выполняется
 * и на rewritten URL, поэтому redirect из default-ветки (cookie=en на «/» →
 * redirect /en) создаёт бесконечный цикл. Здесь redirect-ветка УДАЛЕНА:
 * язык рендера определяется cookie, URL-префикс остаётся как есть.
 *
 * ВНИМАНИЕ (ловушка R17 mktu): НЕ задавать HOSTNAME в pm2-энве — прокси-слой
 * Next строит абсолютный initURL из hostname:port, игнорируя Host за прокси,
 * и rewrite становится кросс-доменным (500 на /en|/zh).
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function rewriteWithLang(
  request: NextRequest,
  newPath: string,
  lang: 'en' | 'zh',
) {
  const url = request.nextUrl.clone();
  url.pathname = newPath;
  // Заголовок на запрос → SSR (getLang в server.ts) рендерит правильный язык сразу
  const headers = new Headers(request.headers);
  headers.set('x-seismos-lang', lang);
  const response = NextResponse.rewrite(url, { request: { headers } });
  response.cookies.set('lang', lang, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const langCookie = request.cookies.get('lang')?.value;

  // URL начинается с /zh — переписываем
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    // cookie lang=ru → пользователь вернулся на русский: redirect без префикса
    if (langCookie === 'ru') {
      const newPath = pathname.replace(/^\/zh/, '') || '/';
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      return NextResponse.redirect(url);
    }
    return rewriteWithLang(request, pathname.replace(/^\/zh/, '') || '/', 'zh');
  }

  // URL начинается с /en — переписываем
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    // cookie lang=ru → redirect без префикса
    if (langCookie === 'ru') {
      const newPath = pathname.replace(/^\/en/, '') || '/';
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      return NextResponse.redirect(url);
    }
    // cookie lang=zh, а URL /en/... → перенаправим на /zh/...
    if (langCookie === 'zh') {
      const subPath = pathname.replace(/^\/en/, '') || '';
      const url = request.nextUrl.clone();
      url.pathname = `/zh${subPath}`;
      return NextResponse.redirect(url);
    }
    return rewriteWithLang(request, pathname.replace(/^\/en/, '') || '/', 'en');
  }

  // URL без префикса языка: в Next 16 здесь МОЖЕТ быть и внутренний проход
  // после rewrite (URL /en → rewrite → проход на «/»). Redirect здесь создаёт
  // цикл, поэтому просто отдаём страницу — язык рендера возьмётся из cookie.

  // По умолчанию (нет cookie) — фиксируем ru (cookie на 1 год)
  const response = NextResponse.next();
  if (!langCookie) {
    response.cookies.set('lang', 'ru', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  // Применяем middleware ко всем URL кроме: API routes, служебных файлов,
  // статических файлов (включая .html-виджеты карты и симулятора!)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|apple-touch-icon|robots\\.txt|sitemap|site\\.webmanifest|og-image|earthquake-map\\.html|earthquake-simulator\\.html|.*\\.(?:svg|jpg|jpeg|webp|png|ico|xml|txt|html|mp4|css|js|woff2?|ttf|map)$).*)',
  ],
};
