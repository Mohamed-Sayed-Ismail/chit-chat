import esbuild from 'rollup-plugin-esbuild'
import sucrase from '@rollup/plugin-sucrase'
import mixexport from '@mnrendra/rollup-plugin-mixexport'
import css from 'rollup-plugin-css-only'
const bundle = (config) => ({
  ...config,
  input: 'src/ChitChat.(js|cjs|mjs|jsx|ts|cts|mts|tsx)',
  external: (id) => !/^[./]/.test(id)
})

export default [
  esbuild({
    exclude: ['./src/App.vue'],
    transforms: ['typescript', 'jsx']
  }),
  bundle({
    plugins: [esbuild(), css()],
    output: [
      {
        dir: 'dist',
        format: 'es',
        exports: 'named',
        preserveModules: true
      }
    ]
  }),
  bundle({
    plugins: [sucrase({ minify: true }), mixexport()],
    onwarn({ code }) {
      if (code === 'MIXED_EXPORTS') return false
    },
    output: {
      dir: 'dist',
      format: 'es',
      exports: 'named',
      preserveModules: true
    }
  })
]
