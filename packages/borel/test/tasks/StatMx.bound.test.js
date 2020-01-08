import { Chrono } from 'elprimero'
import { StatMx } from '../../src/borel/StatMx'
import { Mx } from 'veho'
import { Stat } from '../../src/borel/Stat'
import { boundColDev } from '../strategies/bound.funcs/boundColDev'

class StatMxBoundTest {
  static testBoundMx () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        tx_mx: [[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]],
        w_NaN: [[[NaN, NaN, NaN], [4, NaN, 6], [7, 8, 9]]],
        empty: [[]],
        empty2: [[[]]]
      },
      funcList: {
        native: mx => ({
          max: Math.max(...mx.map(r => Math.max(...r))),
          min: Math.min(...mx.map(r => Math.min(...r)))
        }),
        combo: mx => StatMx.bound(Mx.map(mx, x => +x), { dif: true }),
        stable: mx => StatMx.bound(mx, { dif: true }),
        col: mx => StatMx.boundCol(mx, 2, { dif: true }),
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: JSON.stringify }) |> console.log
  }

  static testBoundCol () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
        tx_mx: [[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]],
        w_NaN: [[[NaN, NaN, NaN], [4, NaN, 6], [7, 8, 9]]],
        empty: [[]],
        empty2: [[[]]]
      },
      funcList: {
        col1_combo: mx => {
          const cols = (mx |> Mx.transpose)
          return Stat.bound(cols[1])
        },
        col1_dev: mx => boundColDev(mx, 1, { dif: false }),
        col1: mx => StatMx.boundCol(mx, 1, { dif: false }),
        col4: mx => StatMx.boundCol(mx, 4, { dif: false }),
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: JSON.stringify }) |> console.log
  }
}

describe('Stat Mx Bound Test', function () {
  this.timeout(1000 * 60)
  it('Stat Mx Bound Test: test Bound Col ', () => {
    StatMxBoundTest.testBoundCol()
  })
  it('Stat Mx Bound Test: test Bound Mx ', () => {
    StatMxBoundTest.testBoundMx()
  })
})
