import newTechs from 'funfact/dist/data/tech/newTechs'
import { Comparer } from '../../dist/index.esm'
import { Rank } from '../../dist/index.esm'
import { Table } from 'crostab'
import { Mx } from 'veho'
import { deco, Typ } from 'xbrief'

function _test (arr, comparer) {
  const
    sorted = Rank.sort(arr, comparer),
    ranks = Rank.rank(arr, comparer),
    reordered = Rank.reorderBy(arr, ranks)
  const
    banner = ['index', 'original', '=>', 'ranks', ' => ', 'sorted', 'reordered'],
    matrix = [
      [...arr.keys()],
      arr,
      arr.map(_ => '.'),
      ranks,
      arr.map(_ => '.'),
      sorted,
      reordered
    ] |> Mx.transpose,
    table = Table.from({ matrix, banner })
  table.brief() |> console.log
  '' |> console.log
}

class RankTest {
  static testNewTechs () {
    _test(newTechs, Comparer.stringAscending)
  }

  static testNumStr () {
    const arr = [
      '128',
      +64,
      '-',
      null,
      32.00,
      NaN,
      '1/4',
      -16
    ]
    _test(arr.map(it => {
      const t = Typ.inferData(it)
      let r
      switch (t) {
        case 'numstr':
          r = parseFloat(it)
          break
        case 'number':
          r = it
          break
        default:
          r = NaN
          break
      }
      return r
    }), Comparer.numberAscending)
  }
}

describe('Rank Test', function () {
  this.timeout(1000 * 60)
  it('Rank Test: test New Techs ', () => {
    RankTest.testNewTechs()
  })
  it('Rank Test: test Num Str ', () => {
    RankTest.testNumStr()
  })
})
