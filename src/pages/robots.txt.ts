import type { APIRoute } from 'astro';
import { SITE_URL } from '../config/site.mjs';

/**
 * robots.txt генерируется динамически, чтобы Sitemap всегда указывал на
 * актуальный домен из config. Важные страницы НЕ блокируются.
 */
export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

# Технические/непубличные пути (при появлении) закрываются здесь.
Disallow: /404/

Sitemap: ${new URL('sitemap-index.xml', SITE_URL).href}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
