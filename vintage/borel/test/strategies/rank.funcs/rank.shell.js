import { Ar } from 'veho'
import { Chrono } from 'elprimero'
import { descNumArr } from '../../asset/desc.num.arr'
import { asceNumArr } from '../../asset/asce.num.arr'
import { randNumArr } from '../../asset/rand.num.arr'
import { ArrX } from 'xbrief'
import { Comparer } from '../../../index'
import { shell } from '../../principles/shell.sort'
import { binLoc } from '../binLoc'

const { ini } = Ar
export const rankShell2 = (arr, excluder, comparer) => {
  const comp = (!excluder)
    ? comparer
    : (a, b) => {
      if (excluder(a)) return 1
      if (excluder(b)) return -1
      return comparer(a, b)
    }
  const sorted = shell(arr.slice(), comp)
  return arr.map(x => sorted.indexOf(x))
}
export const rankShell = (arr, excluder, comparer) => {
  const sorted = shell(arr.filter(x => !excluder(x)), comparer)
  return arr.map(x => sorted.indexOf(x))
  // return arr.map(x => excluder(x) ? -1 : binLoc(sorted, x))
}

export const rankShell_edge = (arr, excluder, comparer) => {
  const comp = (!excluder)
    ? comparer
    : (a, b) => {
      if (excluder(a)) return 1
      if (excluder(b)) return -1
      return comparer(a, b)
    }
  arr = arr.map((el, i) => [i, el])
  const { length } = arr
  let i, el, bc, x, y, gap = 1
  while (gap * 3 < length) gap = gap * 3 + 1
  for (gap; !!gap; gap = ~~(gap / 3)) {
    for (x = gap; x < length; x++) {
      [i, el] = arr[x]
      for (y = x - gap; y >= 0; y -= gap) {
        [, bc] = arr[y]
        if (comp(el, bc) < 0) {
          arr[y + gap] = arr[y]
        } else {
          break
        }
      }
      arr[y + gap] = [i, el]
    }
  }
  const ranks = Array(length)
  for (x = length; !!x;) {
    [i] = arr[--x]
    ranks[i] = x
  }
  return ranks
}

const rankShell_dev = (arr, excluder, comparer) => {
  arr = arr.filter(x => !excluder(x))
  const { length } = arr
  arr = ini(length, i => [i, arr[i]])
  // arr = arr.map((x, i) => [i, x])
  let i, el, x, y, gap = 1
  while (gap * 3 < length) gap = gap * 3 + 1
  for (gap; !!gap; gap = ~~(gap / 3)) {
    for (x = gap; x < length; x++) {
      [i, el] = arr[x]
      for (y = x - gap; y >= 0 && comparer(el, arr[y][1]) < 0; y -= gap)
        arr[y + gap] = arr[y]
      arr[y + gap] = [i, el]
    }
  }
  const ranks = Array(length)
  for (x = length; !!x;) {
    [i] = arr[--x]
    ranks[i] = x
  }
  return ranks
}

class ShellRankTest {
  static brief () {
    const arr = [30, 20, 50, 10, 40]

    '' |> console.log
    arr |> console.log
    'classic' |> console.log
    rankShell(arr, (x) => isNaN(x), Comparer.numberAscending) |> console.log

    '' |> console.log
    arr |> console.log
    'classic' |> console.log
    rankShell_dev(arr, (x) => isNaN(x), Comparer.numberAscending) |> console.log
  }

  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        simpleArr: [[3, 2, 5, 1, 4], (x) => isNaN(x), Comparer.numberAscending],
        descNumArr: [descNumArr, (x) => isNaN(x), Comparer.numberAscending],
        asceNumArr: [asceNumArr, (x) => isNaN(x), Comparer.numberAscending],
        randNumArr: [randNumArr, (x) => isNaN(x), Comparer.numberAscending]
      },
      funcList: {
        rankShell,
        rankShell_dev
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: x => ArrX.hBrief(x, { head: 5, tail: 3, delimiter: ',' }) }) |> console.log
  }

}

describe('Shell Rank Test', function () {
  this.timeout(1000 * 60)
  it('Shell Rank Test: brief ', () => {
    ShellRankTest.brief()
  })
  it('Shell Rank Test: test', () => {
    ShellRankTest.test()
  })
})
