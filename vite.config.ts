import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets':     path.resolve(__dirname, './src/assets'),
      '@data':       path.resolve(__dirname, './src/data'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@utils':      path.resolve(__dirname, './src/utils'),
      '@styles':     path.resolve(__dirname, './src/styles'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    /*
      Target ES2020 — modern browsers only.
      Skips legacy class-fields polyfills, optional-chaining transforms, etc.
      Reduces bundle size ~5-8% vs the default ES2015 target.
    */
    target: 'es2020',

    /*
      CSS code-splitting: each async chunk (TrustedCompanies, Footer) gets
      its own .css file that is only loaded when the chunk is requested.
      Keeps the initial CSS bundle smaller → faster FCP.
    */
    cssCodeSplit: true,

    /*
      Per-chunk source maps only in dev; in prod we drop them to avoid
      shipping extra bytes. (Default is false in build mode already.)
    */
    sourcemap: false,

    rollupOptions: {
      output: {
        /*
          Manual chunks — splits the bundle into deterministic named files
          instead of content-hash opaque names. Key splits:

          ┌─────────────────────────────────────────────────────────┐
          │ vendor-react   │ react + react-dom (biggest dep, cached) │
          │ hero           │ Hero component + its CSS                 │
          │ navbar         │ Navbar + hooks                           │
          │ below-fold     │ TrustedCompanies + Footer                │
          └─────────────────────────────────────────────────────────┘

          vendor-react is stable across deploys → long cache TTL.
          below-fold is lazy-loaded so it never blocks initial paint.
        */
        manualChunks(id) {
          // React core — isolated for maximum cache reuse
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Lazy below-fold chunks into one deferred bundle
          if (
            id.includes('TrustedCompanies') ||
            id.includes('Footer')
          ) {
            return 'below-fold';
          }
        },

        /*
          Name asset files with content hash for cache-busting,
          but group JS/CSS into logical directories.
        */
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
