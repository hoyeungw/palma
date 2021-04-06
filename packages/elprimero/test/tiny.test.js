import { GP } from '../index'

describe('Class', function () {
  this.timeout(1000 * 60)
  it('Class: test', () => {
    GP.now() |> console.log
  })
})
