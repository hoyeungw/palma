import { Chrono } from '../../../../dist/index.esm'
// if (year is not divisible by 4) then (it is a common year)
// else if (year is not divisible by 100) then (it is a leap year)
// else if (year is not divisible by 400) then (it is a common year)
// else (it is a leap year)

class LeapYearTest {
  static testLeapYear () {
    const paramsList = {
      y1500: [1500],
      y1600: [1600],
      y1700: [1700],
      y1800: [1800],
      y1900: [1900],
      y2000: [2000],
      y2016: [2016],
      y2019: [2019],
      y2100: [2100],
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+7,
      paramsList,
      funcList: {
        stable: y => y % 4 ? false : y % 100 ? true : !(y % 400),
        dev: y => !(y % 4 || !(y % 100)) || !(y % 400)
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Leap Year Test', function () {
  this.timeout(1000 * 60)
  it('Leap Year Test: test Leap Year ', () => {
    LeapYearTest.testLeapYear()
  })
})
