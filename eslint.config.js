import tseslint from 'typescript-eslint'
import vueParser from "vue-eslint-parser"
import pluginVue from "eslint-plugin-vue"

export default [
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      "vue/no-console": ["error", { allow: ["info", "warn", "error"] }]
    }
  },
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }]
    }
  }
]
