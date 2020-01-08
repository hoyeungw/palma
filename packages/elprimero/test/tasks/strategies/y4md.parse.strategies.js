import { Chrono } from '../../../dist/index.esm'

class Y4mdParseStrategies {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        simple: ['2020-02-28'],
        misc: [],
      },
      funcList: {
        stable: x => x,
        dev,
        edge,
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}
