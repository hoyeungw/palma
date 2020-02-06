import { Chrono } from 'elprimero'
import { Stat } from '../../index'
import { asceNumArr } from '../asset/asce.num.arr'
import { descNumArr } from '../asset/desc.num.arr'
import { boundDev } from './bound.funcs/boundDev'

const { bound } = Stat

export class BoundStrategies {
  static testBound () {
    const { lapse, result } = Chrono.strategies({
      repeat: 3E+5,
      paramsList: {
        one_zero: [[0]],
        one_nan: [[NaN]],
        asc_6: [[0, 1, 2, 3, 4, 5]],
        desc_6: [[5, 4, 3, 2, 1, 0]],
        misc: [[false, 101, 102, 103, 104]],
        misc2: [[1, 2, NaN, 4, 5]],
        tx_nums: [[
          '244', '200', '306', '400', '150', '220', '190', '495',
          '210', '250', '317', '187', '150', '255', '074', '250'
        ]],
        vec_2: [asceNumArr],
        vec_3: [descNumArr],
        // vec_4: [randNumArrLarge]
      },
      funcList: {
        native: _ => ({
          max: Math.max(..._),
          min: Math.min(..._)
        }),
        level_0: _ => bound(_, { dif: true }),
        level_0_dev:_ => boundDev(_, { dif: true }),
        level_1: _ => bound(_, { dif: true, level: 1 }),
        level_2: _ => bound(_, { dif: true, level: 2 }),
        combo: _ => bound(_.map(x => +x), { dif: true }),
      }
    })
    'lapse' |> console.log
    lapse |> CrosTabX.brief |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief({ abstract: x => JSON.stringify(x) }) |> console.log
  }
}
//
// describe('Bound Strategies', function () {
//   this.timeout(1000 * 60)
//   it('Bound Strategies: test Bound ', () => {
//     BoundStrategies.testBound()
//   })
// })
