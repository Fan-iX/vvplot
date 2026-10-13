import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    dts({ rollupTypes: true }),
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VVPlot',
      fileName: 'vvplot',
      cssFileName: "style"
    },
    rolldownOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: 'vvplot.esm.js',
          minifyInternalExports: false,
        },
        {
          format: 'es',
          entryFileNames: 'vvplot.esm.min.js',
          minify: true,
        },
        {
          format: 'iife',
          entryFileNames: 'vvplot.global.js',
          minifyInternalExports: false,
          name: 'VVPlot',
          globals: { vue: 'Vue' },
          exports: "named",
        },
        {
          format: 'iife',
          entryFileNames: 'vvplot.global.min.js',
          minify: true,
          name: 'VVPlot',
          globals: { vue: 'Vue' },
          exports: "named",
        },
      ],
    },
  },
})
