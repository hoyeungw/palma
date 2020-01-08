import { Chrono } from 'elprimero'
import { printChronoCross } from '../util/printChronoCross'
import chalk from 'chalk'
import { palette } from 'spettro'
import { Typ } from '../../src/Typ'
import { Num } from '../../src/Num'
import { NumLoose } from '../../src/NumLoose'
import { arrays, miscs, numerics, strings } from '../assets/samples.list'

const
  repeat = 1E+6,
  getPipeline = (paramsList) => result => result
    .map(it => it || chalk.hex(palette.red.base)(it))

const { isNumeric: isNumS, inferData: inferS } = Num
const { isNumeric: isNumL, inferData: inferL } = NumLoose

export class IsNumericTest {
  static test = () => {
    const paramsList = {
      ...miscs,
      ...numerics,
      ...strings,
      ...arrays
    }
    const { lapse, result } = Chrono.crossByParamsAndFuncs({
      repeat: 1E+6,
      paramsList: {
        ...miscs,
        ...numerics,
        ...strings,
        ...arrays
      },
      funcList: {
        isNaN: x => !isNaN(x),
        isNumS,
        isNumL,
        inferS,
        inferL,
      }
    })
    printChronoCross({ lapse, result, pipeline: getPipeline(paramsList) })
  }
}

describe('Is Numeric Test', function () {
  this.timeout(1000 * 60)
  it('Is Numeric Test: test ', () => {
    IsNumericTest.test()
  })
})