module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
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
