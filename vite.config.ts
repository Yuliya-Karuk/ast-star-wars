import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../src/styles/mixins.scss"; @import "../src/styles/placeholders.scss"; @import "../src/styles/constants.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
