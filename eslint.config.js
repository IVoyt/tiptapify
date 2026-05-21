import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default [
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    ignores: [
      '**/@core/**',
      '**/@layouts/**',
      '**/views/**',
    ],
  },

  {
    files: ['**/*.{ts,js,vue}'],

    languageOptions: {
      parser: vueParser,

      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },

    rules: {
      'no-console': process.env.NODE_ENV === 'production'
        ? 'warn'
        : 'off',
      'no-debugger': process.env.NODE_ENV === 'production'
        ? 'warn'
        : 'off',

      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],

      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],

      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 6 },
        multiline: { max: 1 },
      }],

      'vue/multi-word-component-names': 'off',

      'multiline-ternary': ['error', 'always-multiline'],
    }
  },
]
