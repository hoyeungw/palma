import rawData from '../asset/json/gdp.rows.json'
import { nba_players_performance } from '../asset/json/nba.players.performance'
import { Table, TableSpec } from '../../index'
import { Chrono } from 'elprimero'
import { CrosTabX as CrosTabX } from 'xbrief'
import { crosTabStable } from '../../src/archive/crosTabStable'
import { crosTabDev } from '../../src/archive/crosTabDev'
import { crosTabEdge } from '../../src/archive/crosTabEdge'
import { crosTabFut } from '../../src/archive/crosTabFut'

const gdpTable = Table.fromSamples(rawData, { title: 'gdp' })

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
        fut: crosTabFut,
        short: crosTabStable,
        edge: crosTabEdge,
        dev: crosTabDev
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
        |> (_ => CrosTabX.brief(_, { abstract: JSON.stringify }))
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
