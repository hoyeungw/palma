import { GP } from 'elprimero'
import { Stat } from 'borel'
import { Table, TableSpec } from '../../../index'
import { Samples } from 'veho'
import { ArrX, deco, TableX, CrosTabX } from 'xbrief'
import rawData from '../../asset/json/archive/gdp.rows.json'

class JsonTableCrostabQueryTest {

  static async testFromRows () {
    GP.now() |> console.log
    rawData |> console.log
    '' |> console.log

    GP.now().tag(`samplesForm to tableForm`) |> console.log
    const table = Samples.toTable(rawData)
    table  |> console.log
    '' |> console.log

    GP.now().tag(`tableForm to samplesForm`) |> console.log
    const samples = Samples.fromTable(table)
    samples |> console.log
    '' |> console.log

  }

  static testCrosTab () {

    GP.now().tag('Rawdata') |> console.log
    rawData
      |> (_ => ArrX.vBrief(_, { abstract: JSON.stringify, head: 5, tail: 2 }))
      |> console.log
    '' |> console.log

    GP.now().tag(`List<Samples> to Table`) |> console.log
    const table = Table.fromSamples(rawData, { title: 'gdp' })
    'table.types'.tag(table.types |> deco) |> console.log
    // TableX.brief(table, { matrix: { head: 6, tail: 2 } }) |> console.log
    table
      |>(_ => TableX.brief(_, { rows: { head: 6, tail: 2 } }))
      |> console.log
    '' |> console.log

    GP.now().tag('Table to toSamples') |> console.log
    table.toSamples(['year', 'gdp', 'pop'])
      |> (_ => ArrX.vBrief(_, { abstract: JSON.stringify, head: 5, tail: 2 }))
      |> console.log
    '' |> console.log

    GP.now().tag(`Table to CrosTab`) |> console.log
    const spec = new TableSpec(
      'country',
      'year',
      {
        gdp: 'sum',
        pop: null
      },
      {
        country: x => ['USA', 'CHN', 'DEU', 'JPN'].includes(x),
        year: x => x > 1990
      },
      (gdp, pop) => Math.round(gdp * 1000 / pop)
    )
    let crosTab = table.crosTab(spec)
    crosTab = crosTab
      .unshiftCol('avg', crosTab.matrix.map(row => row |> Stat.avg))
      .unshiftRow('stDevP', crosTab.columns.map(col => col |> Stat.stDevP))
      .map(n => n.toFixed())
    crosTab
      |> (_ => CrosTabX.brief(_, {}))
      |> console.log
    '' |> console.log

    GP.now().tag(`CrosTab to toSamples banner`) |> console.log
    crosTab.toSamples({ banner: [2017, 1992] }) |> console.log

    GP.now().tag(`CrosTab to toSamples rows`) |> console.log
    crosTab.toSamples({ side: ['USA', 'DEU'] }) |> console.log
  }

  static async testToSamples () {

    const table = Table.fromSamples(rawData, { title: 'gdp' })
    GP.now().tag(`Table to CrosTab`) |> console.log
    const spec = TableSpec.from({
        side: 'country',
        banner: 'year',
        cell: [
          { field: 'gdp', stat: (arr) => Stat.sum(arr) },
          { field: 'pop' }
        ],
        calc: (cell) => Math.round(cell.gdp * 1000 / cell.pop)
      }
    )
    const crosTab = table.crosTab(spec)
    crosTab |> CrosTabX.brief |> console.log

    GP.now().tag(`CrosTab to toSamples banner`) |> console.log
    crosTab.toSamples({ banner: [2017, 1992] }) |> console.log

    GP.now().tag(`CrosTab to toSamples rows`) |> console.log
    crosTab.toSamples({ side: ['USA', 'DEU'] }) |> console.log
  }
}

JsonTableCrostabQueryTest.testCrosTab()

export {
  JsonTableCrostabQueryTest
}
