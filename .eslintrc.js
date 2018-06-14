module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: ['jest', 'node', 'vue'],
  // add your custom rules here
  rules: {
    'no-trailing-spaces': 'error',
    'sort-keys': 'error',
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'node/no-unsupported-features': [
      'error',
      {
        ignores: ['modules'],
      },
    ],
    'prettier/prettier': ['error'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'BINDING',
          'DEFINITION',
          'OTHER_ATTR',
          'CONTENT',
          'EVENTS',
        ],
      },
    ],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-newline': ['error', { multiline: 'always' }],
    'vue/html-closing-bracket-spacing': ['error'],
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
};
