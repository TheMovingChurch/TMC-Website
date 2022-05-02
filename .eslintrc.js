module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ["react", "prettier"],
  rules: {
    'jsx-a11y/anchor-is-valid': 'warn',
    'import/extensions': 0,
    'import/no-unresolved': 'warn',
    'react/function-component-definition': [
      0,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 'warn',
    // 'prettier/prettier': 'warn'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
      alias: {
        map: [
          ['@/*', '/*'],
          // ['@/styles', './styles'],
          // ['@/components', '/components'],
          // Add more here
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
