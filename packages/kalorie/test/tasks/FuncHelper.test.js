import { Stat } from 'borel'
import { FuncHelper } from '../..'
import { Chrono } from 'elprimero/src/Chrono'

const { pipeline } = FuncHelper

class FuncHelperTest {
  static test () {
    const fn1 = x => x * 5
    const fn2 = x => [x, x]
    const fn3 = arr => Stat.sum(arr)
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        simple: [1],
        misc: [2],
      },
      funcList: {
        bench: x => x,
        stable: x => fn3(fn2(fn1(x))),
        dev: x => x |> fn1 |> fn2 |> fn3,
        fut: pipeline(fn1, fn2, fn3),
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

FuncHelperTest.test()
