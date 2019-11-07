module.exports = {
  root: true,
  env: {
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // vue-eslint-parser uses the parser which is set by parserOptions.parser to parse scripts
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    // add more generic rulesets here, such as:
    'standard',
    'plugin:vue/strongly-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // vue rules
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
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/html-self-closing': 0,
    // typescript-eslint rules
    '@typescript-eslint/indent': ['error', 2],
    // once typescript-eslint support these rules, we will remove it
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'ignore'
    }],
    'semi': ['error', 'always'],
    'lines-between-class-members': 0
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'no-trailing-spaces': 'off',
        '@typescript-eslint/indent': 'off'
      }
    }
  ]
};
