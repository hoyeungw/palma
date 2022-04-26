import { boxOfficeTopList } from '../../asset/table/boxOfficeTopList'
import { Table }            from '../../../src/table/Table'
import { TableX }           from '../../../src/table/Table.brief'

class TableFiltersTest {
  static test () {
    // const brief = (_ => TableX.brief(_, { rows: { head: 5, tail: 2 } }))
    const brief = TableX.brief
    const table = Table.from(boxOfficeTopList)
    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log

    'Filters' |> console.log
    table.filter(
      {
        year: x => x > 2010,
        budget: x => x > 200
      },
      { mutate: false }
    ) |> brief |> console.log
    '' |> console.log

    'Original' |> console.log
    table |> brief |> console.log
    '' |> console.log
  }
}

describe('Table Filters Test', function () {
  this.timeout(1000 * 60)
  it('Table Filters Test: test ', () => {
    TableFiltersTest.test()
  })
})

