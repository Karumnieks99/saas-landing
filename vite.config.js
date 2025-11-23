import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use a relative base so the site loads correctly even from subfolders or local file previews
  base: './',
});
