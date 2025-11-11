import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Config para GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/henkancx-synk/', // 👈 usa exactamente el nombre del repo
  build: { outDir: 'dist' },
});
