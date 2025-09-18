import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  optimizeDeps: {
    // Explicitly include feather-icons and react-is for pre-bundling.
    // Removing 'prop-types' from exclude allows Vite to optimize it and its dependencies.
    include: ['feather-icons', 'react-is']
  },
  define: {
    // Explicitly define 'global' and 'process.env.NODE_ENV' for browser environment
    // This helps some older CommonJS modules that check for these variables.
    'global': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
})