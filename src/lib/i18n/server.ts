/**
 * Серверная функция для чтения языка (эталон aipat/mktu/iqin).
 * Приоритет: заголовок x-seismos-lang (ставится middleware при rewrite /en/... и
 * /zh/... — чтобы SSR рендерил правильный язык с ПЕРВОГО захода, без мигания),
 * затем cookie lang.
 */
import { cookies, headers } from 'next/headers';
import { type Lang, DEFAULT_LANG, parseLang } from './translations';

export async function getLang(): Promise<Lang> {
  try {
    const h = await headers();
    const viaHeader = h.get('x-seismos-lang');
    if (viaHeader && ['ru', 'en', 'zh', 'kk', 'hy', 'ka', 'tg', 'uz', 'ky', 'md'].includes(viaHeader)) {
      return viaHeader as Lang;
    }
  } catch {
    // headers() недоступен (не в request scope) — падаем на cookie
  }
  const cookieStore = await cookies();
  const cookieStr = cookieStore.toString();
  return parseLang(cookieStr || null);
}
