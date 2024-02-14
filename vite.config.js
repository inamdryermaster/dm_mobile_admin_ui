import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: '/manifest.json',
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          dependencies: [
            '@emotion/react',
            '@emotion/styled',
            '@mui/icons-material',
            '@mui/material',
            '@reduxjs/toolkit',
            'axios',
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
          ],
        },
      },
    },
  },
});
