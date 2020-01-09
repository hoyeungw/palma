import { GP } from '../src'

describe('Class', function () {
  this.timeout(1000 * 60)
  it('Class: test', () => {
    GP.now() |> console.log
  })
})
