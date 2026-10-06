import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve',
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    tailwindcss()
  ],
  base: '/vvplot/',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    rolldownOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: '[name].js',
        codeSplitting:{
          groups:[
            { name: 'vue', test: /\/node_modules\/(vue|@vueuse\/core)\/+/ },
            { name: 'commonmark', test: /\/node_modules\/commonmark\/+/ },
            { name: 'vvplot', test: /vvplot\/src|\/node_modules\/d3\/+/ },
          ]
        }
      }
    }
  }
})
