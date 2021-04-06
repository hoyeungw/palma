import { briefAlpha } from './parameter.destructuring.helpers/brief.alpha'
import { subsequent } from './parameter.destructuring.helpers/subsequent'
import { briefBeta } from './parameter.destructuring.helpers/brief.beta'
import { Zu } from 'borel'
import { Mx } from 'veho'
import { briefMatrix } from './parameter.destructuring.helpers/brief.matrix'
import { deco } from 'xbrief'

class ParameterDestructuringTest {
  static test () {
    const mx = Mx.ini(5, 5, () => Zu.rand(0, 100))
    briefMatrix(mx, { visual: { direct: 1 } }) |> deco |> console.log
  }

  static test1 () {
    briefAlpha() |> subsequent |> console.log
    '' |> console.log
    briefAlpha({ abstract: JSON.stringify, visual: { mark: { max: 64 } } }) |> subsequent |> console.log
    '' |> console.log
  }

  static test2 () {
    briefBeta() |> subsequent |> console.log
    '' |> console.log
    briefBeta({ abstract: JSON.stringify, visual: { mark: { max: 64 } } }) |> subsequent |> console.log
    '' |> console.log
  }
}

describe('Parameter Destructuring Test', function () {
  this.timeout(1000 * 60)

  it('Parameter Destructuring Test: test 2 ', () => {
    ParameterDestructuringTest.test()
  })
  it('Parameter Destructuring Test: test 1 ', () => {
    ParameterDestructuringTest.test1()
  })
  it('Parameter Destructuring Test: test 2 ', () => {
    ParameterDestructuringTest.test2()
  })
})