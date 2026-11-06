import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
    compressHTML: true,
    compressCSS: true,
    copyPublicDir: true,
    output: 'server',
    adapter: vercel({
    isr: {
        expiration: 60,
    },
    webAnalytics: {
        enabled: true,
    },
    }),
});