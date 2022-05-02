module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'warn',
    'react/prop-types': 'warn',
    'import/extensions': 0,
    // "prettier/prettier": "warn"
  },
};
