import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, matching the old CRA `"homepage": "."` setting.
  base: './',
  build: {
    // Keep CRA's output dir so `npm run deploy` (gh-pages -d build) is unchanged.
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});
