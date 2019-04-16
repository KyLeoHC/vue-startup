module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss'
  ],
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    'indentation': [2, { baseIndentLevel: 1 }],
    'at-rule-empty-line-before': ['always', {
      ignore: ['inside-block', 'blockless-after-same-name-blockless']
    }],
    'comment-whitespace-inside': 'always',
    'scss/double-slash-comment-whitespace-inside': 'always'
  }
};
