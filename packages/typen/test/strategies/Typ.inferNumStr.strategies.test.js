import { Chrono } from 'elprimero'
import { Ob } from 'veho'
import { Typ } from '../../src'
import { printChronoCross } from '../util/printChronoCross'
import { otype, oc } from '../../src/utils/typen'

const _entries = [
  ['foo', 12],
  ['bar', 12 * 2],
  ['fiz', 12 * 4],
  ['baz', 12 * 8],
]
const { protoType, initial, infer, inferData } = Typ
const
  _isStrNum = x => !!(+x) || parseFloat(x) === 0,
  _isNumeric = v => !isNaN(v - parseFloat(v)),
  _isNaNNum = x => isNaN(x - x),
  _otype = x => oc.call(x).slice(8, -1),
  toLower = x => x[0].toLowerCase() + x.slice(1)

export class TypInferNumStrStrategiesTest {
  static test () {
    const { lapse, result } = Chrono.crossByParamsAndFuncs(
      {
        repeat: 800000,
        paramsList: {
          number: [1024],
          numNaN: [NaN],
          numInf: [Number.POSITIVE_INFINITY],
          string: ['Shakespeare'],
          numStr: ['-1024.2048'],
          // bigint: [BigInt(9007199254740991)],
          boolean: [false],
          null: [null],
          undefined: [undefined],
          array: [_entries.map(([k]) => k)],
          map: [new Map(_entries)],
          set: [new Set(_entries.map(([k]) => k))],
          object: [Ob.of(..._entries)],
          function: [(x) => console.log(x)],
        },
        funcList: {
          protoType,
          initial,
          infer,
          infer_dev: (o) => {
            const raw = typeof o
            return raw !== 'object' ? raw : toLower(otype(o))
          },
          inferData,
        }
      }
    )
    printChronoCross({ lapse, result })
  }
}

describe('Typ Infer Num Str Strategies Test', function () {
  this.timeout(1000 * 60)
  it('Typ Infer Num Str Strategies Test: test ', () => {
    TypInferNumStrStrategiesTest.test()
  })
})
