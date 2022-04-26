import { Mx }    from 'veho'
import { Table } from 'archive/crostab'

describe('Test NaN', function () {
  const elements = [0, 1, 2, NaN, null, undefined, '0']
  const results = {
    elGreaterThanNaNs: elements.map(it => it > NaN),
    elLessThanNaNs: elements.map(it => it < NaN)
  }
  const banner = ['original', ...Object.keys(results)]
  const matrix = [elements, ...Object.values(results)] |> Mx.transpose
  const table = Table.from({ banner, matrix })
  table.brief() |> console.log

})
