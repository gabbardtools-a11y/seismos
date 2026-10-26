/**
 * Next.js 16 middleware для многоязычности seismo.ru (СРОСС®) — RU/EN/ZH/KK/HY/KA.
 * Эталон: mktu (SSR-заголовок) ← aipat (фикс цикла Next 16) ← iznaki (Next 15).
 *
 * Логика:
 * - URL /en/... /zh/... /kk/... /hy/... /ka/... → rewrite на /... + cookie lang=xx
 * - URL /... (без префикса) → отдаётся как есть; язык SSR берётся из cookie.
 *
 * ОТЛИЧИЕ ОТ ЭТАЛОНА iznaki (Next 15): в Next 16 middleware (Proxy) выполняется
 * и на rewritten URL, поэтому redirect из default-ветки создаёт бесконечный цикл.
 * Здесь redirect-ветка УДАЛЕНА: язык рендера определяется cookie.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['en', 'zh', 'kk', 'hy', 'ka', 'tg', 'uz', 'ky', 'ro'] as const;
type NonDefaultLang = typeof SUPPORTED_LANGS[number];

function rewriteWithLang(
  request: NextRequest,
  newPath: string,
  lang: NonDefaultLang,
) {
  const url = request.nextUrl.clone();
  url.pathname = newPath;
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

  // Обработка всех нелокальных языков: /en, /zh, /kk, /hy, /ka
  for (const lang of SUPPORTED_LANGS) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      // cookie lang=ru → пользователь вернулся на русский: redirect без префикса
      if (langCookie === 'ru') {
        const newPath = pathname.replace(new RegExp(`^/${lang}`), '') || '/';
        const url = request.nextUrl.clone();
        url.pathname = newPath;
        return NextResponse.redirect(url);
      }
      // cookie указывает на другой нелокальный язык → перенаправим на нужный префикс
      if (langCookie && langCookie !== 'ru' && langCookie !== lang) {
        const subPath = pathname.replace(new RegExp(`^/${lang}`), '') || '';
        const url = request.nextUrl.clone();
        url.pathname = `/${langCookie}${subPath}`;
        return NextResponse.redirect(url);
      }
      return rewriteWithLang(
        request,
        pathname.replace(new RegExp(`^/${lang}`), '') || '/',
        lang,
      );
    }
  }

  // URL без префикса языка: отдаём страницу, язык рендера из cookie.
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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|apple-touch-icon|robots\\.txt|sitemap|site\\.webmanifest|og-image|earthquake-map\\.html|earthquake-simulator\\.html|.*\\.(?:svg|jpg|jpeg|webp|png|ico|xml|txt|html|mp4|css|js|woff2?|ttf|map)$).*)',
  ],
};
