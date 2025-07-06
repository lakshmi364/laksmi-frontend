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
    outDir: 'dist', // Netlify will use this directory for publishing
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html', // ensures Netlify knows what the entry is (required if index.html is used)
    },
  },
});
