import { Mx } from '../../../src/Mx'
import { Chrono } from 'elprimero'

const { map: mapx, mutateMap, copy } = Mx

export class MxTest {
  static spliceCols () {
    const cols = [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ]
    Mx.spliceCols(cols, [2]) |> console.log
  }

  static mapTest () {
    const fn = (x, i, j) => x + i + j
    const paramsList = {
        simple: [[
          [, 3, 4,],
          [2, , 4,],
          [2, 3, ,],
        ]],
      },
      funcList = {
        stable: mx => mx.map((r, i) => r.map((el, j) => fn(el, i, j))),
        dev: mx => mapx(mx, fn),
        devMutate: mx => mutateMap(copy(mx), fn),
        mapColumns: mx => Mx.mapColumns(mx, col => col),
      }
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+0,
      paramsList,
      funcList
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    for (let key of Object.keys(funcList)) {
      key |> console.log
      const mx = result.queryCell('simple', key)
      mx|> console.log
      '' |> console.log
    }
  }

  static transposeTest () {
    const paramsList = {
        simple: [[
          [, 3, 4,],
          [2, , 4,],
          [2, 3, ,],
        ]],
      },
      funcList = {
        native: mx => Mx.coins(mx).map(c => mx.map(r => r[c])),
        dev: mx => Mx.transpose(mx),
      }
    const { lapse, result } = Chrono.strategies({
      repeat: 3E+6,
      paramsList,
      funcList
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    for (let key of Object.keys(funcList)) {
      key |> console.log
      const mx = result.queryCell('simple', key)
      mx|> console.log
      '' |> console.log
    }
  }
}

describe('Mx Test', function () {
  this.timeout(1000 * 60)
  it('Mx Test: splice Cols ', () => {
    MxTest.spliceCols()
  })
  it('Mx Test: map Test ', () => {
    MxTest.mapTest()
  })
  it('Mx Test: transpose Test ', () => {
    MxTest.transposeTest()
  })
})
