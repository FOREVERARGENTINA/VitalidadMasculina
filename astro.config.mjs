// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://vitalidadmasculina.com.ar';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage: máxima prioridad, actualiza frecuente
        if (item.url === SITE + '/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
          return item;
        }
        // Blog index: alta prioridad (se actualiza con nuevos posts)
        if (item.url === SITE + '/blog/') {
          item.changefreq = 'weekly';
          item.priority = 0.9;
          return item;
        }
        // Posts individuales: contenido más estático
        if (item.url.startsWith(SITE + '/blog/')) {
          item.changefreq = 'monthly';
          item.priority = 0.6;
          return item;
        }
        // Páginas de servicios: importantes para SEO local
        const servicios = [
          '/disfuncion-erectil/',
          '/eyaculacion-precoz/',
          '/falta-de-deseo/',
          '/terapia-hormonal/',
          '/urologia/',
        ];
        if (servicios.some((s) => item.url === SITE + s)) {
          item.changefreq = 'monthly';
          item.priority = 0.85;
          return item;
        }
        // Sobre mí y contacto
        if (item.url === SITE + '/sobre-mi/' || item.url === SITE + '/contacto/') {
          item.changefreq = 'monthly';
          item.priority = 0.7;
          return item;
        }
        return item;
      },
    }),
  ],
});
