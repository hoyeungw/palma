import { Chrono } from 'elprimero'

let idx = [0, 1, 2, 3, 4, +5, +6, +7, +8, +9, 10, 11]
let vec = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]

const bin = (arr, s, e, x) => {
  if (s > e) return (s + e) / 2
  let m = ~~((s + e) >> 1), y = arr[m]
  // ({ s, e, m }) |> console.log
  if (x < y) return bin(arr, s, m - 1, x)
  if (x > y) return bin(arr, m + 1, e, x)
  while (--m >= 0 && arr[m] === y) {}
  return ++m
}
const indexOf_native = (arr, x) => {
  return arr.indexOf(x)
}
export const binLoc = (arr, x) => {
  let
    s = 0,
    e = arr.length - 1,
    m, y
  while (s <= e) {
    m = ~~(s + e >> 1)
    y = arr[m]
    // ({ s, e, m }) |> console.log
    if (x < y) {
      e = m - 1
    } else if (x > y) {
      s = m + 1
    } else {
      while (--m >= 0 && arr[m] === y) {}
      return ++m
    }
  }
  // ({ low, high }) |> console.log
  return (s + e) / 2
  // return -1
}

class BinarySearchTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+6,
      paramsList: {
        simple_4: [vec, 4],
        simple_5: [vec, 5],
        simple_6: [vec, 6],
        simple_14: [vec, 14],
        simple_15: [vec, 15],
        simple_16: [vec, 16],
        rep_1: [[1, 2, 3, 4, 5, 5, 5, 5, 6, 7, 8], 1],
        rep_5: [[1, 2, 3, 4, 5, 5, 5, 5, 6, 7, 8], 5],

      },
      funcList: {
        indexOf_native,
        binarySearch: binLoc,
        binarySearchRecursive: (arr, x) => {
          return bin(arr, 0, arr.length - 1, x)
        }
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Binary Search Test', function () {
  this.timeout(1000 * 60)
  it('Binary Search Test: test ', () => {
    BinarySearchTest.test()
  })
})

