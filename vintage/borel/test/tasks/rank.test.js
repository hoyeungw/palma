import newTechs from 'funfact/dist/data/tech/newTechs'
import { Comparer } from '../..'
import { Rank }  from '../..'
import { Table } from 'archive/crostab'
import { Mx }    from 'veho'
import { Typ } from 'typen'
import { deco } from 'xbrief'

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
      const t = Typ.infer(it)
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
