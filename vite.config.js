import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
  base: '/vvplot/',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '[name].js',
        minifyInternalExports: false,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
