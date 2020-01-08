class BabelLocal {}

BabelLocal.base =
  {
    babelrc: false,
    comments: true,
    sourceMap: true,
    exclude: 'node_modules/**',
  }

/**
 *
 * @ {*[][]}
 */
BabelLocal.presets =
  [
    ['@babel/preset-env', {
      modules: false,
      loose: true,
    }],
  ]

/**
 *
 * @ {*[][]}
 */
BabelLocal.plugins =
  [
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     'absoluteRuntime': false,
    //     'corejs': false,
    //     'helpers': false,
    //     'regenerator': true,
    //     'useESModules': false
    //   }
    // ],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        'proposal': 'minimal'
      }
    ],
    [
      '@babel/plugin-proposal-class-properties'
    ]
  ]

export {
  BabelLocal
}