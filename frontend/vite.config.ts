import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'node_modules'),
        ],
        api: 'legacy',
      },
    },
  },
});
