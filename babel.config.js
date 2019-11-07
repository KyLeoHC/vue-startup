module.exports = api => {
  const isTest = api.env('test');
  const presetEnvConfig = isTest ? {
    targets: { node: 'current' }
  } : {
    // debug: true,
    modules: false,
    useBuiltIns: 'usage',
    corejs: {
      'version': '3'
    }
  };
  return {
    presets: [
      [
        '@babel/preset-env',
        presetEnvConfig
      ],
      [
        '@babel/preset-typescript',
        {
          // 目前vue-loader解析出来的ts代码传递给babel-loader处理时，没能认出是ts代码
          // 所以这里强制所有代码当成ts或者tsx处理
          'isTSX': true,
          'allExtensions': true
        }
      ]
    ],
    plugins: [
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
      ['@babel/plugin-proposal-optional-chaining'],
      [
        '@babel/plugin-proposal-decorators',
        {
          // 'decoratorsBeforeExport': true,
          'legacy': true
        }
      ],
      [
        '@babel/proposal-class-properties',
        {
          'loose': true
        }
      ],
      '@babel/proposal-object-rest-spread',
      [
        '@babel/plugin-syntax-dynamic-import'
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          'corejs': false,
          'helpers': true,
          'regenerator': true,
          'useESModules': true
        }
      ],
      [
        'import',
        {
          'libraryName': 'vant',
          'libraryDirectory': 'es',
          'style': name => `${name}/style/less`
        }
      ]
    ]
  };
};
