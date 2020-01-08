import { Chrono } from '../../../../dist/index.esm'

class ParseY4MDTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: ['2019-12-31'],
        misc: ['0221-05-04'],
      },
      funcList: {
        bench: y4md => new Date(y4md),
        stable: y4md => y4md.split('-'),
        dev: y4md => y4md.match(/\d+/g),
        edge: y4md => [y4md.slice(0, 4), y4md.slice(5, 7), y4md.slice(8, 10)]
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Parse Y 4 MD Test', function () {
  this.timeout(1000 * 60)
  it('Parse Y 4 MD Test: test ', () => {
    ParseY4MDTest.test()
  })
})
