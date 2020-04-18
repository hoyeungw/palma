import { strategies } from '@valjoux/strategies'
import { deco, decoCrostab, delogger, says } from '@spare/logger'
import { readFileSync } from 'fs'
import { parseCsvReg } from '../src/parser/parseCsvReg'
import { parseCsvIter } from './archive/parseCsvIter'
import { parseCsvMap } from '../src/parser/parseCsvMap'
import { parseCsvEdge } from './archive/parseCsvEdge'
import { CrosTab } from '@analys/crostab'
import { NaiveCsv } from '../src/naivecsv/NaiveCsv'
import { parseCsvFut } from './archive/parseCsvFut'

const { lapse, result } = strategies({
  repeat: 1E+4,
  candidates: {
    twitter: [readFileSync('./packages/naivecsv/test/assets/pome/twitter.csv', 'utf-8')],
    simple: [readFileSync('./packages/naivecsv/test/assets/csv/simple.csv', 'utf-8')],
    // finSector: [readFileSync('./packages/naivecsv/test/assets/csv/industry_sw.csv', 'utf-8')],
  },
  methods: {
    bench: x => x,
    iter: parseCsvIter,
    edge: parseCsvEdge,
    fut: parseCsvFut,
    map: parseCsvMap,
    reg: parseCsvReg,
    class: NaiveCsv.toRows
  }
})
lapse |> decoCrostab |> says['lapse']
// result |> decoCrostab |> says['result']
const resultCrosTab = CrosTab.from(result)
resultCrosTab.cell('simple', 'iter') |> deco |> says['iter']
resultCrosTab.cell('simple', 'edge') |> deco |> says['edge']
resultCrosTab.cell('simple', 'fut') |> deco |> says['fut']
resultCrosTab.cell('simple', 'map') |> deco |> says['map']
resultCrosTab.cell('simple', 'reg') |> deco |> says['reg']

// resultCrosTab.cell('finSector', 'class') |> deco |> says['reg']
