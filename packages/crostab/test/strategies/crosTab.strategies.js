import rawData from '../asset/json/gdp.rows.json'
import { nba_players_performance } from '../asset/json/nba.players.performance'
import { Table, TableSpec } from '../../index'
import { Chrono } from 'elprimero'
import { CrosTabX as CrosX } from 'xbrief'
import { _crosTabShort } from '../../src/temp/_crosTabShort'
import { _crosTabDev } from '../../src/temp/_crosTabDev'
import { _crosTabEdge } from '../../src/temp/_crosTabEdge'
import { _crosTabFut } from '../../src/temp/_crosTabFut'

const gdpTable = Table.fromSamples(rawData, 'gdp')

class CrosTabStrategies {
  static test () {
    const paramsList = {
      sideAndBanner: [gdpTable, TableSpec.from({
        side: 'country',
        banner: 'year'
      })],
      simple: [gdpTable, TableSpec.from({
        side: 'country',
        banner: 'year',
        cell: 'gdp',
      })],
      ordinary: [gdpTable, TableSpec.from({
        side: 'country',
        banner: 'year',
        cell: {
          'gdp': 'sum',
          'pop': null
        },
        filter: {
          'country': it => ['USA', 'CHN', 'DEU', 'JPN'].includes(it),
          'year': it => it > 1990
        },
        calc: (gdp, pop) => Math.round(gdp * 1000 / pop)
      })],
      // nbaPlayers: [
      //   Table.from({ banner: nba_players_performance.banr })
      // ]
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+4,
      paramsList,
      funcList: {
        fut: _crosTabFut,
        short: _crosTabShort,
        edge: _crosTabEdge,
        dev: _crosTabDev
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
    '' |> console.log
    const funcName = 'fut';
    `Printing func: [${funcName}] in the funcList` |> console.log
    for (let paramsName of Object.keys(paramsList)) {
      paramsName |> console.log
      result.queryCell(paramsName, funcName)
        |> (_ => CrosX.brief(_, { abstract: JSON.stringify }))
        |> console.log
      '' |> console.log
    }
  }
}

describe('Cros Tab Strategies', function () {
  this.timeout(1000 * 60)
  it('Cros Tab Strategies: test ', () => {
    CrosTabStrategies.test()
  })
})
