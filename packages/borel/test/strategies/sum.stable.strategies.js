import { Chrono } from 'elprimero'
import { Stat } from '../../src'
import { asceNumArr } from '../asset/asce.num.arr'
import { descNumArr } from '../asset/desc.num.arr'
import { randNumArrLarge } from '../asset/rand.num.arr.large'

function sum_dev (arr) {
  if (!arr) return 0
  const { length } = arr
  switch (length) {
    case 0:
      return NaN
    case 1:
      return arr[0]
    default:
      let sum = 0
      for (let i = length - 1; i >= 0; i--) {
        sum += arr[i]
      }
      return sum
  }
}

function sum_edge (arr) {
  if (!arr) return 0
  const { length } = arr
  switch (length) {
    case 0:
      return NaN
    case 1:
      return arr[0]
    default:
      let sum = 0
      for (let x of arr) {
        sum += x
      }
      return sum
  }
}

const {
  sum: sum_stable,
} = Stat

class SumStableStrategies {
  static testSum () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+6,
      paramsList: {
        vec_1: [[1, 2, 3, 4, 5]],
        vec_2: [asceNumArr],
        vec_3: [descNumArr],
        vec_4: [randNumArrLarge]
      },
      funcList: {
        classic: sum_stable,
        dev: sum_dev,
        edge: arr => sum_edge(arr.slice())
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Sum Stable Strategies', function () {
  this.timeout(1000 * 60)
  it('Sum Stable Strategies: test Sum ', () => {
    SumStableStrategies.testSum()
  })
})
