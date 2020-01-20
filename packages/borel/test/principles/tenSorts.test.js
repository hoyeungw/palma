// 判断是否数组
import { Comparer} from '../../dist/index.esm'
import { Chrono } from 'elprimero'
import { Rank } from '../../index'
import { Mx, Samples } from 'veho'
import { TableX, ArrX } from 'xbrief'
import { TenSorts } from './tenSorts.resources'
import { timsort } from '../strategies/sort.funcs/tim.sort'
import { sortScenariosLcher } from '../asset/sort.case.scenarios'

class TenSortsTest {
  static testTimSort () {
    const arr = [5, 3, 8, 4, 9, 2]
    timsort(arr, Comparer.numberAscending)
    arr |> console.log
  }

  static test () {
    const paramsList = {
      ...sortScenariosLcher(128, 4),
      // randNumArrLarge: [randNumArrLarge.slice()]
      // numStrArr: [numStrArr.slice()],
      // numStrArr2: [numStrArrTransformed.slice()]
    }
    for (let [key, [list]] of Object.entries(paramsList)) {
      key |> console.log
      ArrX.hBrief(list, { head: 12, tail: 3 }) |> console.log
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 10000,
      paramsList,
      funcList: {
        sort: arr => Rank.sort(arr, Comparer.numberAscending),
        timsort: arr => timsort(arr, Comparer.numberAscending),
        ...TenSorts
      }
    })

    'lapse' |> console.log
    lapse
      .brief()
      |> console.log
    '' |> console.log
    'result' |> console.log
    for (let {
      label,
      sort,
      timsort,
      bubble,
      insert,
      quick,
      select,
      merge,
      shell,
      heap,
      // radix,
      bucket,
      count
    } of Samples.fromCrosTab(result, { sideLabel: 'label' })) {
      label |> console.log
      const
        [arr] = paramsList[label],
        head = [
          label,
          'sort',
          'timsort',
          'bubble',
          'insert',
          'quick',
          'select',
          'merge',
          'shell',
          'heap',
          // 'radix',
          'bucket',
          'count'
        ],
        rows = [
          arr,
          sort,
          timsort,
          bubble,
          insert,
          quick,
          select,
          merge,
          shell,
          heap,
          // radix,
          bucket,
          count
        ] |> Mx.transpose
      TableX.brief({ head, rows }) |> console.log
      '' |> console.log
    }
    '' |> console.log
  }
}

describe('Ten Sorts Test', function () {
  this.timeout(1000 * 60)
  it('Ten Sorts Test: test ', () => {
    TenSortsTest.test()
  })
})

it('Ten Sorts Test: test Tim Sort ', () => {
  TenSortsTest.testTimSort()
})
