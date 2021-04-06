import { CrosTab }                       from '@analys/crostab'
import { decoCrostab, decoVector, says } from '@spare/logger'
import { strategies }                    from '@valjoux/strategies'
import { readFileSync }                  from 'fs'
import { NaiveCsv }                      from '../src/naivecsv/NaiveCsv'
import { parseCsvMap }                   from '../src/parser/parseCsvMap'
import { parseCsvReg }                   from '../src/parser/parseCsvReg'
import { parseCsvEdge }                  from './archive/parseCsvEdge'
import { parseCsvFut }                   from './archive/parseCsvFut'
import { parseCsvIter }                  from './archive/parseCsvIter'

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
resultCrosTab.cell('simple', 'iter') |> decoVector |> says['iter']
resultCrosTab.cell('simple', 'edge') |> decoVector |> says['edge']
resultCrosTab.cell('simple', 'fut') |> decoVector |> says['fut']
resultCrosTab.cell('simple', 'map') |> decoVector |> says['map']
resultCrosTab.cell('simple', 'reg') |> decoVector |> says['reg']

// resultCrosTab.cell('finSector', 'class') |> deco |> says['reg']
