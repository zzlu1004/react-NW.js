module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": ["standard", "standard-react"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "process": false
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // enable additional rules
    'indent'                            : 'off',
    'react/jsx-indent'                  : ['error', 2],
    'eqeqeq'                            : 'off',
    'camelcase'                         : 'off',
    'no-extra-boolean-cast'             : 'off',
    'padded-blocks'                     : 'off',
    'eol-last'                          : 'off',
    'no-useless-escape'                 : 'off',
    'no-useless-constructor'            : 'off',
    'semi'                              : ['error', 'always'],
    'arrow-parens'                      : ['error', 'as-needed'],
    'no-multiple-empty-lines'           : ['error', { 'max': 1 }],
    'space-before-function-paren'       : ['error', 'never'],
    'no-trailing-spaces'                : ['error', { 'skipBlankLines': true }],
    'jsx-quotes'                        : ['error', 'prefer-single'],
    'no-unreachable'                    : process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger'                       : process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console'                        : 'off',
    'no-eval'                           : 'off',
    'prefer-const'                      : 'off',
    'react/prop-types'                  : 'off',
    'react/no-array-index-key'          : 'off',
    'react/self-closing-comp'           : ['error', {'component': true, 'html': false}],
    'react/jsx-tag-spacing'             : ['error', {'beforeSelfClosing': 'always'}],
    'react/jsx-filename-extension'      : ['error', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-indent-props'            : ['error', 4],
    "react/jsx-handler-names"           : 'off' 
  }
};