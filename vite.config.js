import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, transformWithEsbuild } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const esbuildMinify = {
  name: 'minify-plugin',
  renderChunk(code) {
    return transformWithEsbuild(code, 'index.js', {
      minify: true,
      treeShaking: true,
    })
  }
}

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve',
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    dts({ rollupTypes: true }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VVPlot',
      fileName: 'vvplot',
      cssFileName: "style"
    },
    rollupOptions: {
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
          plugins: [esbuildMinify]
        },
        {
          format: 'iife',
          name: 'VVPlot',
          entryFileNames: 'vvplot.global.js',
          minifyInternalExports: false,
          globals: { vue: 'Vue' },
        },
        {
          format: 'iife',
          name: 'VVPlot',
          entryFileNames: 'vvplot.global.min.js',
          globals: { vue: 'Vue' },
          plugins: [esbuildMinify]
        },
      ],
    },
  },
})
