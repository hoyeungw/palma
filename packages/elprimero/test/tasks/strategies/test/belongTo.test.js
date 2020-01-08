import { Chrono } from '../../../../dist/index.esm'
import { Y4MD } from '../../../../src/Y4MD/Y4MD'

const { fromDate, toDate, addM, addY, addD, belongTo } = Y4MD

class BelongToTest {
  static test () {
    const cur = fromDate()
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        yearW: [cur, addY(cur, -1), addY(cur, +1)],
        yearF: [cur, addY(cur, +1), addY(cur, +2)],
        yearB: [cur, addY(cur, -2), addY(cur, -1)],
        monthW: [cur, addM(cur, -1), addM(cur, +1)],
        monthF: [cur, addM(cur, +1), addM(cur, +2)],
        monthB: [cur, addM(cur, -2), addM(cur, -1)],
        dayW: [cur, addD(cur, -1), addD(cur, +1)],
        dayF: [cur, addD(cur, +1), addD(cur, +2)],
        dayB: [cur, addD(cur, -2), addD(cur, -1)],
        // misc: [],
      },
      funcList: {
        stable: (dt, lo, hi) => {
          dt = toDate(dt)
          lo = toDate(lo)
          hi = toDate(hi)
          return lo <= dt && dt <= hi
        },
        dev: (dt, lo, hi) => {
          let b
          for (let i = 0; i < 3; i++) {
            b = lo[i] <= dt[i] && dt[i] <= hi[i]
            if (!b) return false
          }
          return b
        },
        fut: (dt, lo, hi) => belongTo(dt, lo, hi)
      },
      config: {
        showAverage: true,
        showParamsValues: true
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Belong To Test', function () {
  this.timeout(1000 * 60)
  it('Belong To Test: test ', () => {
    BelongToTest.test()
  })
})
