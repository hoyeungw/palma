import { boxOfficeTopList } from '../../asset/table/boxOfficeTopList'
import { Table } from '../../../src/table/Table'
import { TableX } from '../../../src/table/Table.brief'

class TableSelectTest {
  static test () {
    const brief = (_ => TableX.brief(_, { rows: { head: 5, tail: 2 } }))
    const table = Table.from(boxOfficeTopList)
    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log

    'Select' |> console.log
    table.select(['film', 'year'], { mutate: true }) |> brief |> console.log
    '' |> console.log

    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log
  }
}

describe('Table Select Test', function () {
  this.timeout(1000 * 60)
  it('Table Select Test: test', () => {
    TableSelectTest.test()
  })
})
