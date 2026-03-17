import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: true,         // Allows external access (Docker)
      port: 3000,         // Forces local port 3000
      strictPort: true,   // Error if 3000 is taken
      hmr: {
        clientPort: 3000  // Ensures HMR connects back correctly
      },
      watch: {
        usePolling: true, // Required for HMR on some Docker setups
      },
    },
  };
});