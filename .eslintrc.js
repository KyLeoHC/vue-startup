module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    // vue-eslint-parser uses the parser which is set by parserOptions.parser to parse scripts
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  globals: {
    // 'build': true
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1,
      'ignores': []
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'selfClosingTag': 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 2,
      'multiline': {
        'allowFirstLine': true
      }
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'error',
      'multiline': 'never'
    }],
    "vue/singleline-html-element-content-newline": 0,
    'vue/no-unused-components': 0,
    'vue/html-self-closing': 0,
    // eslint(check for js) config
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'ignore'
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'eqeqeq': 'off',
    'semi': ['error', 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
};
