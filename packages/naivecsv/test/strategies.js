import { strategies } from '@valjoux/strategies'
import { deco, decoCrostab, delogger, says } from '@spare/logger'
import { readFileSync } from 'fs'
import { parseCsvReg } from '../src/parser/parseCsvReg'
import { parseCsvIter } from './archive/parseCsvIter'
import { parseCsvMap } from '../src/parser/parseCsvMap'
import { Coordinate, parseCsvEdge } from './archive/parseCsvEdge'
import { CrosTab } from '@analys/crostab'
import { NaiveCsv } from '../src/naivecsv/NaiveCsv'

const { lapse, result } = strategies({
  repeat: 1E+4,
  candidates: {
    simple: [readFileSync('./packages/naivecsv/test/assets/pome/twitter.csv', 'utf-8')],
    short: [readFileSync('./packages/naivecsv/test/assets/csv/simple.csv', 'utf-8')]
    // misc: [],
  },
  methods: {
    bench: x => x,
    iter: parseCsvIter,
    edge: tx => parseCsvEdge.call(Coordinate(), tx),
    map: parseCsvMap,
    reg: NaiveCsv.toRows,
  }
})
lapse |> decoCrostab |> says['lapse']
// result |> decoCrostab |> says['result']
const resultCrosTab = CrosTab.from(result)
resultCrosTab.cell('short', 'iter') |> deco |> says['iter']
resultCrosTab.cell('short', 'edge') |> deco |> says['edge']
resultCrosTab.cell('short', 'map') |> deco |> says['map']
resultCrosTab.cell('short', 'reg') |> deco |> says['reg']
