import { Chrono } from '../../../../dist/index.esm'
import { Y4MD } from '../../../../src/Y4MD/Y4MD'

const { fromDate, toDate, addM, addY, addD} = Y4MD
const ymdToInt = ([y, m, d]) => ((y & 0xffff) << 9) + ((m & 0xf) << 5) + ((d & 0x1f) << 0)

class BelongToTest {
  static test () {
    const cur = fromDate()
    const { lapse, result } = Chrono.strategies({
      repeat: 8E+5,
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
        some: [[2020, 5, 1], [2019, 12, 31], [2021, 1, 1]],
        misc: [[2020, 6, 16], [2020, 5, 17], [2020, 7, 14]]
        // misc: [],
      },
      funcList: {
        stable: (dt, lo, hi) => {
          dt = toDate(dt)
          lo = toDate(lo)
          hi = toDate(hi)
          return lo <= dt && dt <= hi
        },
        edge: (dt, lo, hi) => {
          return (dt = ymdToInt(dt)) && ymdToInt(lo) <= dt && dt <= ymdToInt(hi)
        },
        dev: (dt, lo, hi) => {
          let b
          for (let i = 0; i < 3; i++) {
            b = lo[i] < dt[i] && dt[i] < hi[i]
            if (b) return true
          }
          return b
        },
        fut: (dt, lo, hi) => {
          let i = -1, b = true
          while (b && i++ < 2) b = lo[i] <= dt[i] && dt[i] <= hi[i]
          return b
        }
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

BelongToTest.test()
// describe('Belong To Test', function () {
//   this.timeout(1000 * 60)
//   it('Belong To Test: test ', () => {
//     BelongToTest.test()
//   })
// })
