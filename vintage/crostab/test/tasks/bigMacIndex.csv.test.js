import { NaiveCsv } from 'naivecsv'
import { promises as fsPromise } from 'fs'
import ora from 'ora'
import { CrosTabX, TableX } from 'xbrief'
import { logger, logNeL } from 'palma'
import { TableSpec } from '../../src/tableSpec/TableSpec'

const spn = ora()
const source = './vintage/crostab/test/asset/csv/big-mac-source-data.csv'
const target = './vintage/crostab/test/asset/json/BigMacIndex.json'
spn.start(`start reading: ${source}`)
fsPromise
  .readFile(source, 'utf-8')
  .then(it => {
    spn.succeed(`done reading: ${source}`)
    const table = NaiveCsv.toTable(it, { popBlank: true })
    table |> (_ => TableX.brief(_, { rows: { head: 4, tail: 8 } }))
      |> logNeL
    return table
  })
  .then(table => {
    const countryList = ['USA', 'CHN', 'EUZ', 'GBR', 'RUS', 'JPN', 'KOR', 'HKG', 'SGP', 'TWN', 'BRA']
    const spec = new TableSpec(
      'date',
      'iso_a3',
      { dollar_price: 'sum' },
      {
        iso_a3: x => countryList.includes(x),
        date: x => !x.endsWith('/1/1')
      }
    )
    const crosTab = table
      .crosTab(spec)
      .map(x => (+x).toFixed(2))
      .sortLabel('rows', (a, b) => b.localeCompare(a))
    crosTab.side = crosTab.side.map(x => x
      .replace(/[0-9]+/g, x => x.padStart(2, '0'))
      .replace(/\//g, '-')
    )
    crosTab |> (_ => CrosTabX.brief(_, { side: { head: 5, tail: 3 } })) |> logger
    return crosTab
  })
  .then(async crosTab => await fsPromise
    .writeFile(target, JSON.stringify(crosTab))
  )

