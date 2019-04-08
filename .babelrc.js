module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // "debug": true,
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": {
          "version": "3"
        }
      }
    ]
  ],
  "plugins": [
    '@babel/plugin-proposal-class-properties',
    [
      "@babel/plugin-syntax-dynamic-import"
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": true
      }
    ],
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": name => `${name}/style/less`
      }
    ]
  ]
};
