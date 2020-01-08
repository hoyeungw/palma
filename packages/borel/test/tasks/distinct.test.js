import { StatMx } from '../../src/borel/StatMx'

export class DistinctTest {
  static distinctColTest () {
    const mx = [
      [1, 1, 1, 1],
      [3, 3, 3, 3],
      [1, 1, 1, 1],
      [3, 3, 3, 3],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [1, 1, 1, 1],
      [3, 3, 3, 3],
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
    ]
    // StatMx.distinct(mx,1) |> console.log
    StatMx.distinctCol(mx, 2, { count: false, sort: true }) |> console.log
  }
}

describe('Distinct Test', function () {
  this.timeout(1000 * 60)
  it('Distinct Test: distinct Col Test ', () => {
    DistinctTest.distinctColTest()
  })
})
