module.exports = {
  "env": {
    "jest": true
  },
  "extends": "airbnb-base",
  "rules": {
    'no-console': 0,
    'no-bitwise': 0,
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'no-loop-func': 1,
    'no-use-before-define': 0,
    'max-len': ["error", { "code": 500 }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-prototype-builtins': 0,
    'no-continue': 0,
  }
};