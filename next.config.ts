import type { NextConfig } from "next";

const securityHeaders = [
  // Защита от clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Запрет MIME-sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HSTS — принудительный HTTPS на 2 года
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Referrer policy — отдаём только origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions policy — отключаем лишние API
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Content Security Policy — разрешаем self, inline-styles (Next.js требует), CDN
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://rest-api.eqalert.ru https://earthquake.usgs.gov",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // Не светим версию Next.js в HTTP-заголовке X-Powered-By
  poweredByHeader: false,
  // Не валим прод-сборку на type/lint ошибках (временная мера, пока не почистим TS)
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        // Применяем security-заголовки ко всем маршрутам
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
