import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://db.ygoprodeck.com',
        changeOrigin: true,
        assetsInlineLimit: 0, // Disable inlining images during development
        rewrite: (path) => path.replace(/^\/api/, ''), // removes '/api' prefix
      },
    },
  },
});
