import ora from 'ora'
import { promises as fsPromise } from 'fs'
import { NaiveCsv } from '../src/naivecsv/NaiveCsv'
import { decoTable, DecoTable, delogger, logger } from '@spare/logger'

const spn = ora()
const file = './packages/naivecsv/test/assets/pome/twitter.csv'
spn.start(`start reading: ${file}`)
fsPromise.readFile(file, 'utf-8').then(
  it => {
    spn.succeed(`done reading: ${file}`)
    // NaiveCsv.toRows(it, { popBlank: true }) |> console.log
    NaiveCsv.toTable(it)
      |> DecoTable({ abstract: x => x?.slice(0, 24), fullAngle: true })
      |> logger;
    ({ head: [], rows: [[]] }) |> decoTable |> logger
  }
)

fsPromise
  .readFile(file)
  .then(text => {
    NaiveCsv.toSamples(text, {
      de: ',',
      lf: '\r\n',
      qt: '\"',
      transpose: false,
      decode: 'utf-8',
      popBlank: true
    }) |> delogger
  })
