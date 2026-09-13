import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/site.mjs';

// https://astro.build
export default defineConfig({
  // ВАЖНО: замените SITE_URL в src/config/site.mjs на реальный домен перед деплоем.
  // От него зависят canonical, sitemap.xml и Open Graph.
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    // /uslugi/ -> uslugi/index.html  (чистые URL с завершающим слэшем)
    format: 'directory',
  },
  integrations: [
    sitemap({
      // В карту сайта попадают только канонические индексируемые страницы.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
