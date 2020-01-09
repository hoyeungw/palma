import pkg from './package.json'
import { BabelLocal } from './build/BabelLocal'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'

const input = 'src/index.js'

const externalDependencies = Object.keys(pkg.dependencies)

export default [
  // {
  //   input,
  //   output: {
  //     name: pkg.name,
  //     file: pkg.browser,
  //     format: 'umd' // browser-friendly UMD build
  //   },
  //   plugins: [
  //     resolve({ preferBuiltins: true }),
  //     babel({
  //       ...BabelLocal.base,
  //       presets: BabelLocal.presets,
  //       plugins: BabelLocal.plugins
  //     }),
  //     commonjs(),
  //     builtins(),
  //     terser()
  //   ]
  // },
  {
    input,
    external: externalDependencies,
    output: [
      { file: pkg.main, format: 'cjs' },  // CommonJS (for Node) build.
    ],
    plugins: [
      // resolve(),
      babel({
        ...BabelLocal.base,
        // presets: BabelLocal.presets,
        plugins: BabelLocal.plugins
      }),
      // commonjs(),
      terser(),
      progress(),
      filesize(),
      visualizer()
    ]
  },
  {
    input,
    external: externalDependencies,
    output: [
      { file: pkg.module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins: [
      // resolve(),
      babel({
        ...BabelLocal.base,
        // presets: BabelLocal.presets,
        plugins: BabelLocal.plugins
      }),
      // commonjs(),
      terser(),
      progress(),
      filesize(),
      visualizer()
    ]
  }
]

// "os": "^0.1.1",
//   "tty": "^1.0.1"
