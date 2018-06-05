module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: [
    'jest',
    'html',
  ],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
};

