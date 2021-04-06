import { ArrX, Xr } from 'xbrief'
import { Chrono } from 'elprimero'
import { descNumArr } from '../asset/desc.num.arr'
import { asceNumArr } from '../asset/asce.num.arr'
import { randNumArr } from '../asset/rand.num.arr'

// 插入排序
const insert_classic = arr => {
  arr = arr.slice()
  let { length } = arr
  let pr, el // 前一个元素的索引，当前元素的值
  // Xr().p('skip first').tag(0, arr[0]).tx |> console.log
  for (let i = 1; i < length; i++) {
    el = arr[i]
    pr = i - 1
    // Xr(' ').tag('+').p('take current      ').tag(i, el).p('|').tag(arr).tx |> console.log
    // 依次把当前元素和前面的元素进行比较
    while (pr >= 0 && el < arr[pr]) {
      // Xr().p('      move')
      //   .tag(parenthesis, arr[parenthesis]).p('=> to').tag(parenthesis + 1, arr[parenthesis + 1])
      //   .p('|').tag(arr).p('|').tag('parenthesis', parenthesis).tx |> console.log
      // 比当前的元素大，向后移一位
      arr[pr + 1] = arr[pr]
      pr--
    }
    // Xr('  done while').p('now parenthesis + 1 =').tag(parenthesis + 1).tx |> console.log
    // Xr(' ').tag('-').p('move').tag(i, el).p('=> to').tag(parenthesis + 1, arr[parenthesis + 1]).p('|').tag(arr).tx |> console.log
    // 插入当前元素到合适的位置
    arr[pr + 1] = el
  }
  return arr
}

const insert_dev2 = arr => {
  arr = arr.slice()
  let { length } = arr
  let pr, el // 前一个元素的索引，当前元素的值
  for (let i = 1; i < length; i++) {
    el = arr[i]
    pr = i
    while (pr >= 0 && el < arr[--pr]) {
      arr[pr + 1] = arr[pr]
    }
    arr[pr + 1] = el
  }
  return arr
}

const insert_dev3 = arr => {
  arr = arr.slice()
  let { length } = arr
  let nx, el // 后一个元素的索引，当前元素的值
  for (let i = length; !!i;) {
    el = arr[--i]
    nx = i
    while (nx < length && !(el < arr[++nx])) {
      arr[nx - 1] = arr[nx]
    }
    arr[nx - 1] = el
  }
  return arr
}

const rank_classic = arr => {
  arr = arr.slice()
  let { length } = arr
  let pr, el // 前一个元素的索引，当前元素的值
  // Xr().p('skip first').tag(0, arr[0]).tx |> console.log
  for (let i = 1; i < length; i++) {
    el = arr[i]
    pr = i - 1
    // Xr(' ').tag('+').p('take current      ').tag(i, el).p('|').tag(arr).tx |> console.log
    // 依次把当前元素和前面的元素进行比较
    while (pr >= 0 && el < arr[pr]) {
      // Xr().p('      move')
      //   .tag(parenthesis, arr[parenthesis]).p('=> to').tag(parenthesis + 1, arr[parenthesis + 1])
      //   .p('|').tag(arr).p('|').tag('parenthesis', parenthesis).tx |> console.log
      // 比当前的元素大，向后移一位
      arr[pr + 1] = arr[pr]
      pr--
    }
    // Xr('  done while').p('now parenthesis + 1 =').tag(parenthesis + 1).tx |> console.log
    // Xr(' ').tag('-').p('move').tag(i, el).p('=> to').tag(parenthesis + 1, arr[parenthesis + 1]).p('|').tag(arr).tx |> console.log
    // 插入当前元素到合适的位置
    arr[pr + 1] = el
  }
  return arr
}

class InsertSortTest {
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
      repeat: 10000,
      paramsList: {
        descNumArr: [descNumArr],
        asceNumArr: [asceNumArr],
        randNumArr: [randNumArr]
      },
      funcList: {
        insert_classic,
        insert_dev2,
        insert_dev3
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: x => ArrX.hBrief(x, { head: 5, tail: 3, delimiter: ',' }) }) |> console.log
  }
}

describe('Insert Sort Test', function () {
  this.timeout(1000 * 60)
  it('Insert Sort Test: test ', () => {
    InsertSortTest.test()
  })
})
