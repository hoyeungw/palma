import { addMonths, addYears, addDays } from 'date-fns'
import { Chrono } from '../../../dist/index.esm'
import moment from 'moment'
import { GP } from '../../../src/GP'
import { Y4MDDev } from './src/Y4MDDev/Y4MDDev'
import { splitY4MD } from '../../../src/Y4MD/utils/parseY4MD'
import { Y4MD } from '../../../src/Y4MD/Y4MD'

export class DateDiffStrategies {
  static diffDays () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        jan20__14: ['2020-01-31', 14],
        feb20__14: ['2020-02-29', 14],
        mar20__14: ['2020-03-01', 14],
        apr20__14: ['2020-04-01', 14],
        dec20__14: ['2020-12-31', 14],
        jan20_365: ['2020-01-31', 365],
        feb20_365: ['2020-02-29', 366],
        mar20_365: ['2020-03-31', 365],
        apr20_365: ['2020-04-30', 365],
        dec20_365: ['2020-12-31', 365],
        jan20_730: ['2020-01-31', 731],
        feb20_730: ['2020-02-29', 731],
        mar20_730: ['2020-03-01', 731],
        apr20_730: ['2020-04-01', 731],
        dec20_730: ['2020-12-31', 731],
      },
      funcList: {
        stable: (dt, qn) => {
          const date = new Date(dt)
          date.setDate(date.getDate() - qn)
          return GP.y4md(date)
        },
        moment: (dt, qn) => moment(new Date(dt)).add(-qn, 'd').format('YYYY-MM-DD'),
        dateFns: (dt, qn) => GP.y4md(addDays(new Date(dt), -qn)),
        dev: (dt, qn) => Y4MDDev.subDays(dt |> splitY4MD, qn),
        fut: (dt, qn) => Y4MD.addD(dt |> splitY4MD, -qn)
      },
      config: {
        showAverage: true,
        showParamsValues: true
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }

  static diffMonth () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        add14m: ['2019-12-31', 14],
        sub14m: ['2019-12-31', -14],
        add2m: ['2015-02-28', 12],
        sub2m: ['2015-02-28', -12],
        add2m1: ['2016-02-29', 2],
        sub2m1: ['2016-02-29', -2],
        add2m2: ['2019-05-30', 1],
        sub2m2: ['2019-05-30', -3],
      },
      funcList: {
        stable: (dt, qn) => {
          const date = new Date(dt)
          date.setMonth(date.getMonth() + qn)
          return GP.y4md(date)
        },
        moment: (dt, qn) => moment(new Date(dt)).add(qn, 'M').format('YYYY-MM-DD'),
        dateFns: (dt, qn) => GP.y4md(addMonths(new Date(dt), qn)),
        edge: (dt, qn) => Y4MD.addM(dt |> splitY4MD, qn)
      },
      config: {
        showAverage: true,
        showParamsValues: true
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }

  static diffYear () {
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        add14m: ['2019-12-31', 14],
        sub14m: ['2019-12-31', -14],
        add2m: ['2016-02-29', 2],
        sub2m: ['2016-02-29', -2],
      },
      funcList: {
        stable: (dt, qn) => {
          const date = new Date(dt)
          date.setFullYear(date.getFullYear() + qn)
          return GP.y4md(date)
        },
        moment: (dt, qn) => moment(new Date(dt)).add(qn, 'Y').format('YYYY-MM-DD'),
        dateFns: (dt, qn) => GP.y4md(addYears(new Date(dt), qn)),
        edge: (dt, qn) => Y4MD.addY(dt |> splitY4MD, qn)
      },
      config: {
        showAverage: true,
        showParamsValues: true
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Date Diff Strategies', function () {
  this.timeout(1000 * 60)
  it('Date Diff Strategies: diff Days ', () => {
    DateDiffStrategies.diffDays()
  })
  it('Date Diff Strategies: test', () => {
    DateDiffStrategies.diffMonth()
  })
  it('Date Diff Strategies: diff Year ', () => {
    DateDiffStrategies.diffYear()
  })
})
