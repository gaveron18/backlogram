import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  cacheDir: '.vite',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    hmr: { overlay: false },
    proxy: {
      // Proxy RSS feed to avoid CORS in dev
      '/blog-rss': {
        target: 'https://blog.ideav.online',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-rss/, '/feed/rss'),
      },
      // Proxy Integram API calls
      '/integram-api': {
        target: 'https://integram.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/integram-api/, ''),
      },
    },
  },
  optimizeDeps: { cacheDir: '.vite' },
})
