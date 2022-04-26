import { Table }      from '../../../index'
import { ArrX, EntX } from 'xbrief'

export class TableDistinctTest {
  static test () {
    const table = Table.from({
      banner: ['foo', 'bar', 'kha', 'mia'],
      matrix: [
        [1, 21, 31, 'a'],
        [1, 22, 31, 'a'],
        [1, 23, 31, 'b'],
        [2, 24, 32, 'b'],
        [2, 25, 32, 'c'],
        [3, 26, 32, 'c'],
        [4, 27, 33, 'd']
      ]
    })
    'table distinct' |> console.log
    table.distinct('foo').brief() |> console.log

    'table distinctCol' |> console.log
    table.distinctCol('foo', { count: false, sort: false }) |> ArrX.vBrief |> console.log

    'table original' |> console.log
    table.brief() |> console.log
  }
}

describe('Table Indexed By Test', function () {
  this.timeout(1000 * 60)
  it('Table Indexed By Test: test ', () => {
    TableDistinctTest.test()
  })
})
