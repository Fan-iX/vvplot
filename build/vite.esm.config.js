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
  publicDir: false,
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: {
        vvplot: resolve(__dirname, '../src/index.esm.ts'),
        utils: resolve(__dirname, '../src/js/utils.js'),
        components: resolve(__dirname, '../src/components.ts'),
        base: resolve(__dirname, '../src/base/index.ts'),
        "base-utils": resolve(__dirname, '../src/base/utils.js'),
      },
      name: 'VVPlot',
      fileName: 'vvplot',
      cssFileName: "vvplot"
    },
    rolldownOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          chunkFileNames: 'chunk-[name].js',
          entryFileNames: '[name].esm.js',
          minifyInternalExports: false,
        },
        {
          format: 'es',
          chunkFileNames: 'chunk-[name].min.js',
          entryFileNames: '[name].esm.min.js',
          minify: true,
        },
      ],
    },
  },
})
