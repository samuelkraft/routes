module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: './',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0, // next-links require empty a tags
    'jsx-a11y/label-has-associated-control': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    camelcase: 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'no-case-declarations': 0,
    'no-constant-condition': 0,
    'no-await-in-loop': 0,
  },
  globals: {
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
