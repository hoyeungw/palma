import { boxOfficeTopList } from '../../asset/table/boxOfficeTopList'
import { Table } from '../../../src/table/Table'
import { TableX } from '../../../src/table/Table.brief'

class TableSpliceColsTest {
  static test () {
    const brief = (_ => TableX.brief(_, { rows: { head: 5, tail: 2 } }))
    const table = Table.from(boxOfficeTopList)
    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log

    'SpliceCols' |> console.log
    table.spliceColumns(['budget', 'director(s)'], { mutate: false }) |> brief |> console.log
    '' |> console.log

    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log
  }
}

describe('Table Splice Cols Test', function () {
  this.timeout(1000 * 60)
  it('Table Splice Cols Test: test', () => {
    TableSpliceColsTest.test()
  })
})
