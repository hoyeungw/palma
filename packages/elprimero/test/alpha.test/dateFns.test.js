import { subMonths } from 'date-fns'
import { GP } from '../../src/GP'

class DateFnsTest {
  static test () {
    const result = subMonths(new Date(2019, 1, 1), 12)
    GP.y4md(result) |> console.log
  }
}

describe('Date Fns Test', function () {
  this.timeout(1000 * 60)
  it('Date Fns Test: test ', () => {
    DateFnsTest.test()
  })
})
