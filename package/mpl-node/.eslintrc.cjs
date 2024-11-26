const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: { 'no-undef': 'off' },
    },
  ],
  extends: ['plugin:vue/vue3-recommended', 'plugin:vue/vue3-strongly-recommended'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    LCS: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'node', 'promise'],
  rules: {
    'prettier/prettier': 'off',
    'vue/no-unused-vars': 'error',
    'vue/singleline-html-element-content-newline': ["off", {}],
    'no-debugger': 'error',
    'spaced-comment': [2, 'always'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/prefer-true-attribute-shorthand': ['error'],
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 0,
    'vue/require-v-for-key': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'new-cap': 0,
    'vue/html-self-closing': 0,
    'vue/no-mutating-props': 0,
    'vue/no-v-html': 0,
    'spaced-comment': 0,
  },
})
