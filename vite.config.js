import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain en raíz => base '/'
export default defineConfig({
  plugins: [react()],
  base: '/',            // <-- clave para mvp-ot-crm.henkancx.com
  build: { outDir: 'dist' },
});
