import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  plugins: [
    vue(),
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
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
        scale: resolve(__dirname, 'src/js/scale.js'),
        break: resolve(__dirname, 'src/js/break.js'),
        label: resolve(__dirname, 'src/js/label.js'),
        theme: resolve(__dirname, 'src/js/theme.js'),
      },
      name: 'VVPlot',
      formats: ['es'],
      cssFileName: "style"
    },
    rollupOptions: {
      external: ['vue'],
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
