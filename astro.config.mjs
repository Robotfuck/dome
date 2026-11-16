import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://thedomesessions.com',
  output: 'static',
  session: { driver: 'memory' },
  adapter: cloudflare({ imageService: 'compile' }),
  trailingSlash: 'always',
  integrations: [keystatic(), react(), sitemap()],
});
