import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Set root to current folder
  publicDir: 'public', // Vite will look for index.html and assets here
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use @ for src path
    },
  },
  build: {
    outDir: 'dist', // Output directory for Netlify
    emptyOutDir: true, // Clean dist folder before build
  },
})
