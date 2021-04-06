import { Chrono } from '../../../../dist/index.esm'

class MonthDaysTest {
  static test () {
    const monthDaysOb = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    }
    const monthDaysAr = [0,
      31, 28, 31,
      30, 31, 30,
      31, 31, 30,
      31, 30, 31
    ]
    const { lapse, result } = Chrono.strategies({
      repeat: 3E+6,
      paramsList: {
        m1: [1, true],
        m2: [2, true],
        m3: [3, true],
        m4: [4, true],
        m5: [5, true],
        m6: [6, true],
        m7: [7, true],
        m8: [8, true],
        m9: [9, true],
        m10: [10, true],
        m11: [11, true],
        m12: [12, true],
      },
      funcList: {
        stable: (m, lp) => monthDaysOb[m] + +(m === 2 && lp),
        classic: (m, lp) => {
          switch (m) {
            case 2:
              return 28 + +lp
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              return 31
            default:
              return 30
          }
        },
        dev: (m, lp) => m !== 0b10
          ? 30 + (m < 0x8 ? +(m % 0b10) : +!(m % 0b10))
          : 28 + +lp,
        edge: (m, lp) => m !== 0b10
          ? 30 + m % 0b10 ^ m >= 0x8
          : 28 + lp,
        fut: (m, lp) => monthDaysAr[m] + +(m === 2 && lp)
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Month Days', function () {
  this.timeout(1000 * 60)
  it('Month Days: test ', () => {
    MonthDaysTest.test()
  })
})
