import { GP } from '../../src'
import { Fn, Ar } from 'veho'
import { Dawdle } from '../../src/Dawdle'
import { ArrX } from 'xbrief'

export class GPTest {
  static testAllGP () {
    let statics = GP |> Fn.getStaticMethodNames
    for (const name of statics) {
      name.tag(GP[name].call()) |> console.log
    }
  }

  static async testGPNow () {
    const arr = Ar.arithmetic(24, 0, 1)
    arr |> ArrX.hBrief |> console.log
    const func = (x, y) => GP.now().tag(x).tag(y)
    for (const el of arr) {
      await Dawdle.linger(64, func, el, el ** 2).then(it => {
        it |> console.log
      })
    }
  }
}

describe('GPTest', function () {
  this.timeout(1000 * 60)
  it('GP Test: test All GP ', async () => {
    GPTest.testAllGP()
    await GPTest.testGPNow()
  })
})

// export {
//   GPTest
// }