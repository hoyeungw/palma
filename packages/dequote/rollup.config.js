import pkg from './package.json'
import { BabelLocal } from './build/BabelLocal'
import babel from 'rollup-plugin-babel'

const input = 'src/index.js'

const externalDependencies = Object.keys(pkg.dependencies)

export default [
  {
    input,
    external: externalDependencies,
    output: [
      { file: pkg.main, format: 'cjs' },  // CommonJS (for Node) build.
      { file: pkg.module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins: [
      babel({
        ...BabelLocal.base,
        plugins: BabelLocal.plugins
      })
    ]
  }
]
