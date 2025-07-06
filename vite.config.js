import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'dist', // 🔥 Tells Vite to output to dist (important for Netlify)
    emptyOutDir: true,
  }
});
