import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve',
        }
      }
    }),
  ],
  publicDir: false,
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, '../src/index.global.ts'),
      name: 'VVPlot',
      fileName: 'vvplot',
      cssFileName: "vvplot.global"
    },
    rolldownOptions: {
      external: ['vue'],
      output: [
        {
          format: 'iife',
          entryFileNames: 'vvplot.global.js',
          minifyInternalExports: false,
          name: 'VVPlot',
          globals: { vue: 'Vue' },
        },
        {
          format: 'iife',
          entryFileNames: 'vvplot.global.min.js',
          minify: true,
          name: 'VVPlot',
          globals: { vue: 'Vue' },
        },
      ],
    },
  },
})
