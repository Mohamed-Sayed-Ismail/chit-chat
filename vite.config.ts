import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript2 from 'rollup-plugin-typescript2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript2({
      check: false,
      include: ['src/**/*vue', './components/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: true
        },
        exclude: ['vite.config.ts']
      }
    })
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, './src/ChitChat.ts'),
      formats: ['es', 'cjs'],
      name: 'chit-chat.js',
      fileName: (format) => (format == 'es' ? 'chit-chat.es' : 'chit-chat.js')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
