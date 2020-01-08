import { Chrono } from 'elprimero'
import { descNumArr } from '../asset/desc.num.arr'
import { asceNumArr } from '../asset/asce.num.arr'
import { randNumArr } from '../asset/rand.num.arr'
import { ArrX } from 'xbrief'

export const shell = (arr, comparer) => {
  const { length } = arr
  let el, i, j, gap = 1
  while (gap * 3 < length) gap = gap * 3 + 1
  for (gap; !!gap; gap = ~~(gap / 3)) {
    for (i = gap; i < length; i++) {
      el = arr[i]
      for (j = i - gap; j >= 0 && comparer(el, arr[j]) < 0; j -= gap)
        arr[j + gap] = arr[j]
      arr[j + gap] = el
    }
  }
  return arr
}

const shell_stable = arr => {
  arr = arr.slice()
  const { length } = arr
  let gap, i, j, el
  for (gap = length >> 1; gap > 0; gap >>= 1)
    for (i = gap; i < length; i++) {
      el = arr[i]
      for (j = i - gap; j >= 0 && arr[j] > el; j -= gap)
        arr[j + gap] = arr[j]
      arr[j + gap] = el
    }
  return arr
}

const shell_dev = arr => {
  arr = arr.slice()
  const { length } = arr
  let el, i, j, gap = 1
  while (gap << 1 < length) gap = (gap << 1) + 1
  for (gap; !!gap; gap = ~~(gap >> 1)) {
    for (i = gap; i < length; i++) {
      el = arr[i]
      for (j = i - gap; j >= 0 && el < arr[j]; j -= gap)
        arr[j + gap] = arr[j]
      arr[j + gap] = el
    }
  }
  return arr
}

const shell_edge = arr => {
  arr = arr.slice()
  const [max] = arr, min = max

}

class ShellSortTest {
  static brief () {
    const arr = [3, 2, 5, 1, 4]

    '' |> console.log
    arr |> console.log
    'classic' |> console.log
    insert_classic(arr) |> console.log

    '' |> console.log
    'dev' |> console.log
    insert_dev2(arr) |> console.log

    '' |> console.log
    'de3' |> console.log
    insert_dev3(arr) |> console.log
  }

  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+5,
      paramsList: {
        simpleArr: [[3, 2, 5, 1, 4]],
        descNumArr: [descNumArr],
        asceNumArr: [asceNumArr],
        randNumArr: [randNumArr]
      },
      funcList: {
        shell_classic: shell,
        shell_stable,
        shell_dev
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: x => ArrX.hBrief(x, { head: 5, tail: 3, delimiter: ',' }) }) |> console.log
  }
}

describe('Shell Sort Test', function () {
  this.timeout(1000 * 60)
  it('Shell Sort Test: test ', () => {
    ShellSortTest.test()
  })
})
