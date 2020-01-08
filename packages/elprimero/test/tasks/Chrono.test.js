import { Chrono } from '../../src/index'

class ChronoTest {
  static testCrossFuncsAndRepeats () {
    const primitVector = Array.from({ length: 12 }, (v, i) => 2 ^ i)
    Chrono.crossByRepeatsAndFuncs({
      repeatList: [10000, 100000, 1000000],
      funcList: {
        for: () => {
          let arr = []
          for (let i = 0, len = primitVector.length; i < len; i++) {
            arr.push(primitVector[i])
          }
          return arr
        },
        forOf: () => {
          let arr = []
          for (let n of primitVector) {
            arr.push(n)
          }
          return arr
        },
        while: () => {
          let arr = []
          let i = primitVector.length
          while (i--) {
            arr.push(primitVector[i])
          }
          return arr
        },
        forEach: () => {
          let arr = []
          primitVector.forEach(it => arr.push(it))
          return arr
        }
      }
    }).brief().wL()
  }

  static testStrategies () {
    const { lapse, result } = Chrono.strategies({
      repeat: 5E+6,
      paramsList: {
        num_arr: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
        str_arr: [['Winston', 'Roosevelt', 'Stalin', 'Clinton', 'Bush', 'Eisenhower'], 5],
        misc_arr: [['foo', 'bar', 128, true, null, new Date()], 5]
      },
      funcList: {
        iterPush: (arr, len) => {
          let rsl = []
          for (let i = 0; i < len; i++) {
            rsl.push(arr[i])
          }
          return rsl
        },
        slice: (arr, len) => {
          return arr.slice(0, len)
        }
      },
    })
    lapse.brief() |> console.log
    result.brief() |> console.log
  }
}

// describe('Chrono Test', function () {
//   this.timeout(1000 * 60)
//   it('Chrono Test: test Cross Funcs And Params ', () => {
//     ChronoTest.testStrategies()
//   })
// })

export {
  ChronoTest
}
