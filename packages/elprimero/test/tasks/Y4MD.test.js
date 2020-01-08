import { Y4MD } from '../../src/Y4MD/Y4MD'
import { Xr } from 'xbrief'

const { fromDate, toDate, fromTx, toTx, addY, addM, addD, monthLoHi, seasonLoHi } = Y4MD

export class Y4MDTest {
  static test () {
    const date = new Date()
    // const date = toDate([2020, 2, 29])
    Xr('date', date).tx |> console.log
    'Y4MD.fromDate' |> console.log
    const ymd = fromDate(date)
    ymd |> console.log
    'Y4MD.toDate' |> console.log
    const _date = toDate(ymd)
    _date.toString() |> console.log
    'Y4MD.toTx' |> console.log
    const tx = toTx(ymd)
    tx |> console.log
    'Y4MD.fromTx' |> console.log
    fromTx(tx) |> console.log
    'Y4MD.addYear' |> console.log
    addY(ymd, -1) |> toTx |> console.log
    'Y4MD.addQuarter' |> console.log
    addM(ymd, -3) |> toTx |> console.log
    'Y4MD.addMonth' |> console.log
    addM(ymd, -1) |> toTx |> console.log
    'Y4MD.addDays' |> console.log
    addD(ymd, -1) |> toTx |> console.log
    'Y4MD.monthBeginAndEnd' |> console.log
    monthLoHi(ymd)  |> console.log
    'Y4MD.seasonBeginAndEnd' |> console.log
    seasonLoHi(ymd)  |> console.log
  }
}

describe('Y 4 MD Test', function () {
  this.timeout(1000 * 60)
  it('Y 4 MD Test: test ', () => {
    Y4MDTest.test()
  })
})
