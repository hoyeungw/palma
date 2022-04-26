import { Comparer, Rank, Zu } from 'borel'
import { Typ } from 'xbrief'

class LocaleComparer {
  static numStrAscending ([a, at], [b, bt]) {
    if (at === 'nan') return -1
    if (bt === 'nan') return -1
    return a - b
  }
}

export class PaletteVecTest {
  static test () {
    'arr' |> console.log
    const arr = [
      Zu.rand(40, 60),
      String(Zu.rand(30, 50)),
      Zu.rand(20, 40),
      Zu.rand(10, 30),
      Zu.rand(0, 20),
      NaN,
      NaN,
      '',
      Zu.rand(60, 80),
      Zu.rand(70, 90),
      String(Zu.rand(80, 100)),
      Zu.rand(90, 110)
    ]
    arr |> console.log
    '' |> console.log

    'types' |> console.log
    const types = arr.map(it => Typ.inferData(it))
    types |> console.log
    '' |> console.log

    'rank' |> console.log
    const ranks = Rank.rank(arr, Comparer.numberAscending)
    ranks |> console.log

    'sorted' |> console.log
    const sortIndexes = Rank.sort(arr, Comparer.numberAscending)
    sortIndexes |> console.log

  }
}

describe('Palette Vec Test', function () {
  this.timeout(1000 * 60)
  it('Palette Vec Test: test ', () => {
    PaletteVecTest.test()
  })
})