import { Chrono } from 'elprimero'
import { Jso, Samples } from 'veho'
import { shell } from '../../principles/shell.sort'
import { binLoc } from '../binLoc'

export const divide_dev_1 = (arr, excluder) => {
  arr = arr.slice()
  if (!excluder || !arr.some(excluder)) return { inc: arr, exc: [] }
  // const inc = new Set(), exc = new Set()
  const inc = [], exc = []
  let el
  while (arr.length) {
    el = arr.pop()
    if (excluder(el)) {exc.push(el)} else {inc.push(el)}
  }
  // return { inc: [...inc], exc: [...exc] }
  return { inc, exc }
}

export const divide_dev_2 = (arr, excluder) => {
  arr = arr.slice()
  if (!excluder || !arr.some(excluder)) return { inc: arr, exc: [] }
  const inc = [], exc = []
  let b
  while ((b = arr.length) !== 0) {
    if (excluder(arr[b - 1])) {exc.push(arr.pop())} else {inc.push(arr.pop())}
  }
  return { inc, exc }
}

/**
 *
 * @param {*[]}arr
 * @param {function(*):boolean} excluder
 * @param {function(*,*):number} comparer
 * @returns {*}
 */
export const divide_fast = (arr, excluder) => {
  if (!excluder || !arr.some(excluder)) return { inc: arr.slice(), exc: [] }
  const inc = [], exc = []
  for (let i = arr.length, el; !!i;) {
    el = arr[--i]
    if (excluder(el)) {exc.push(el)} else {inc.push(el)}
  }
  return { inc, exc }
}

/**
 *
 * @param {*[]}arr
 * @param {function(*):boolean} excluder
 * @param {function(*,*):number} comparer
 * @returns {*}
 */
export const divide_entry = (arr, excluder) => {
  if (!excluder) return { inc: arr.map((x, i) => [i, x]), exc: [] }
  const inc = [], exc = []
  // const { length } = arr
  // let el
  // for (let i = 0; i < length; i++) {
  //   el = arr[i]
  //   if (excluder(el)) {exc.push([i, el])} else {inc.push([i, el])}
  // }

  // for (let i = arr.length, el; !!i;) {
  //   el = arr[--i]
  //   if (excluder(el)) {exc.push([i, el])} else {inc.push([i, el])}
  // }

  for (let entry of arr.entries()) {
    if (excluder(entry[1])) {exc.push(entry)} else {inc.push(entry)}
  }
  return { inc, exc }
}

export const rankDivide = (arr, excluder, comparer) => {
  const { inc, exc } = divide_entry(arr, excluder)
  const { length } = arr
  const ranks = Array(length)
  const sorted = shell(inc, ([, a], [, b]) => {comparer(a, b)})
  for (let [i, el] of inc) {
    ranks[i] = binLoc(sorted, el)
  }
  for (let [i] of exc) {
    ranks[i] = -1
  }
  return ranks
}
export const rankDivide2 = (arr, excluder, comparer) => {
  const sorted = shell(arr.filter(x => !excluder(x)), comparer)
  // return arr.map(x => sorted.indexOf(x))
  return arr.map(x => excluder(x) ? -1 : binLoc(sorted, x))
}

class RankDivideTest {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1000000,
      paramsList: {
        noExcl: [[1, 2, '-', 1, '-', 4]],
        simple: [[1, 2, '-', 1, '-', 4], (x) => x === '-']
      },
      funcList: {
        divide_dev_1: divide_dev_1,
        divide_dev_2: divide_dev_2,
        divide_entry,
        divide_fast: divide_fast
      }
    })
    lapse
      .brief() |> console.log
    const rows = Samples.fromCrosTab(result, { sideLabel: 'srno' })
    for (let row of rows) {
      row.srno |> console.log
      row.divide_dev_1 |> console.log
      row.divide_dev_2 |> console.log
      row.divide_entry |> console.log
      row.divide_fast |> console.log
    }
  }
}

describe('Rank Divide Test', function () {
  this.timeout(1000 * 60)
  it('Rank Divide Test: test ', () => {
    RankDivideTest.test()
  })
})
