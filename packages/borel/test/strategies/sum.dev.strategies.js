import { Zu } from '../../index'
import { Chrono } from 'elprimero'
import { Ar } from 'veho'

const fibonacci = (steps = 2) => {
  const arr = [1, 1]
  for (let i = 2; i <= steps; i++) arr[i] = arr[i - 1] + arr[i - 2]
  return arr
}

const
  by_reduce = arr => arr.reduce((a, b) => a + b),
  by_forOf = arr => {
    let sum = 0
    for (let n of arr) {
      sum += n
    }
    return sum
  },
  by_forEach = arr => {
    let sum = 0
    arr.forEach(x => sum += x)
    return sum
  },
  by_forIndexed = arr => {
    let sum = 0
    const { length } = arr
    for (let i = 0; i < length; i++) sum += arr[i]
    return sum
  },
  by_foriRev1 = arr => {
    let sum = 0, { length: l } = arr
    for (--l; l >= 0; l--) sum += arr[l]
    return sum
  },
  by_foriRev2 = arr => {
    let sum = 0
    for (let { length: i } = arr; i > 0;) sum += arr[--i]
    return sum
  }

export class SumDevStrategies {
  static testBasicSums () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        one_zero: [[0]],
        one_nan: [[NaN]],
        tri_simple: [[1, 2, 3, 4, 5]],
        fibonacci: [fibonacci(20)],
        geometric: [Ar.geometric(20, 2, 2)],
        arithmetic: [Ar.arithmetic(64, 0, 1000)],
        E_032: [Ar.ini(32, () => Zu.rand(0, 100))],
        E_128: [Ar.ini(128, () => Zu.rand(0, 100))],
        // E_1024: [Ar.ini(1024, () => Zu.rand(0, 100))],
      },
      funcList: {
        by_forIndexed,
        by_foriRev1,
        by_foriRev2,
        by_forOf,
        by_forEach,
        by_reduce
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Sum Dev Strategies', function () {
  this.timeout(1000 * 60)
  it('Sum Dev Strategies: test Basic Sums ', () => {
    SumDevStrategies.testBasicSums()
  })
})
