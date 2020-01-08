import { NaiveCsv } from '../src/naivecsv/NaiveCsv'
import { promises as fsPromise } from 'fs'
import ora from 'ora'
import { TableX } from 'xbrief'

const spn = ora()
const file = './test/assets/csv/twitter.csv'
spn.start(`start reading: ${file}`)
fsPromise.readFile(file, 'utf-8').then(
  it => {
    spn.succeed(`done reading: ${file}`)
    // NaiveCsv.toRows(it, { popBlank: true }) |> console.log
    NaiveCsv.toTable(it) |> (_ => TableX.brief(_, { abstract: x => x?.slice(0, 24), chinese: true })) |> console.log
  }
)

fsPromise
  .readFile(file)
  .then(text => {
    console.log(
      NaiveCsv.toRows(text, {
        de: ',',
        lf: '\r\n',
        qt: '\"',
        transpose: false,
        decode: 'utf-8',
        popBlank: true
      }))
  })
