import { Chrono } from 'elprimero'
import { Comparer, Zu } from '../..'
import { descNumArr } from '../asset/desc.num.arr'
import { numStrArr } from '../asset/numStr.arr'
import { randNumArr } from '../asset/rand.num.arr'
import { Mx, Samples, Ar } from 'veho'
import { TableX, Typ } from 'xbrief'
import { rankNative } from './rank.funcs/rankNative'
import { rankShell } from './rank.funcs/rank.shell'
import { rankDivide } from './rank.funcs/rank.divide'
import { rankEntry } from './rank.funcs/rankEntry'
import { rankBubble } from './rank.funcs/rankBubble'
import { Table }      from 'archive/crostab'

const transNumStr = arr => arr.map(x => {
  switch (Typ.inferData(x)) {
    case 'number':
      return x
    case 'numstr':
      return parseFloat(x)
    default:
      return NaN
  }
})

const pickAndChange = (arr, num, el) => {
  const { length } = arr
  const indexes = Ar.ini(num, () => Zu.rand(0, length))
  for (let index of indexes) arr[index] = el
  return arr
}

// numStrArr.zip(numStrArrTransformed, (a, b) => {
//   `${a}`.tag(Typ.inferData(a)).tag(b).tag(Typ.inferData(b)).tag(isNaN(b)) |> console.log
// })

class RankStrategies {
  static test () {
    const paramsList = {
      numStrArr: [numStrArr, isNaN, Comparer.numberAscending],
      numStrArr2: [numStrArr |> transNumStr, isNaN, Comparer.numberAscending],
      descNumArr: [pickAndChange(descNumArr, 10, '-'), x => x === '-', Comparer.numberAscending],
      randNumArr: [pickAndChange(randNumArr, 10, null), x => x === null, Comparer.numberAscending]
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 5E+3,
      paramsList,
      funcList: {
        rankNative,
        rankShell,
        rankDivide,
        rankEntry,
        rankBubble,
        sort: (arr, excluder, comparer) => {
          const comp = (!excluder)
            ? comparer
            : (a, b) => {
              if (excluder(a)) return 1
              if (excluder(b)) return -1
              return comparer(a, b)
            }
          return arr.slice().sort(comp)
        }
      }
    })

    'lapse' |> console.log
    lapse |> CrosTabX.brief|> console.log
    '' |> console.log
    'result' |> console.log
    for (let { label, rankNative, rankShell, rankDivide, rankEntry, rankBubble, sort } of
      Samples.fromCrosTab(result, { sideLabel: 'label' })
      ) {
      label |> console.log
      const
        [arr] = paramsList[label],
        head = [label, 'rankNative', 'rankShell', 'rankDivide', 'rankEntry', 'rankBubble', 'sort'],
        rows = [arr, rankNative, rankShell, rankDivide, rankEntry, rankBubble, sort] |> Mx.transpose
      const table = Table.from({ banner: head, matrix: rows })
      TableX.brief({ head, rows }) |> console.log
      '' |> console.log
    }
    '' |> console.log
  }
}

describe('Rank Strategies Test', function () {
  this.timeout(1000 * 60)
  it('Rank Strategies Test: test ', () => {
    RankStrategies.test()
  })
})
