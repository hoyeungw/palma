import { Chrono } from '../../../../dist/index.esm'

const nextMonthDev = ([y, m]) => ++m > 12 ? [++y, 1] : [y, m]
const prevMonth = ([y, m]) => --m < 1 ? [--y, 12] : [y, m]

const nextMonthStable = (ym) => {
  ym[1] += 1
  if (ym[1] > 12) {
    ym[0] += 1
    ym[1] = 1
  }
  return ym
}

const nextMonthFut = (ym) => {
  let [y, m] = ym
  ym = ++m > 12 ? [++y, 1] : [y, m]
  return ym
}

export class PreviousAndNextMonthTest {
  static testSole () {
    const ym = [2019, 12]
    nextMonthDev(ym)
    ym |> console.log
    nextMonthFut(ym)
    ym |> console.log
    const [y, m] = [2019, 12]
    nextMonthStable([y, m]);
    [y, m] |> console.log
  }

  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 4E+6,
      paramsList: {
        simple: [[2019, 12]],
      },
      funcList: {
        dev: nextMonthDev,
        fut: nextMonthFut,
        stable: nextMonthStable,
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Previous And Next Month Test', function () {
  this.timeout(1000 * 60)
  it('Previous And Next Month Test: test Sole ', () => {
    PreviousAndNextMonthTest.testSole()
  })
  it('Previous And Next Month Test: test ', () => {
    PreviousAndNextMonthTest.test()
  })
})
