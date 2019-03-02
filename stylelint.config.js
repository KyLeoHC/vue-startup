module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    'indentation': [2, { baseIndentLevel: 1 }],
    'comment-whitespace-inside': 'always',
    'scss/double-slash-comment-whitespace-inside': 'always'
  }
};
