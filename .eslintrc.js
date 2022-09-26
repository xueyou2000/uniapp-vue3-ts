module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  ignorePatterns: ['src/manifest.json'],
  plugins: ['vue'],
  rules: {
    indent: ['error', 2],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
