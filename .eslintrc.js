module.exports = {
  extends: [
    '@seed/config-eslint-config',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    "react-hooks/exhaustive-deps": "warn"
  },
};
