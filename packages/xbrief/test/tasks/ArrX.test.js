import { ArrX } from '../../src/brief/ArrX'
import { logger, logNeL } from 'palma'
import { Xr } from '../../src/ink/Xr'

export class ArrXTest {
  static test () {
    const paramsList = {
      arithmetic: [1, 2, 3, 4, 5, 6, 7, 8],
      empty: [],
      singleElementArray: [1],
      textNum: ['032', '064', '128', '256', '512'],
      misc: [null, undefined, NaN, 'Infinity', '+', 1.2E+1, 1.2E+2, 1.2E+3, 1.2E+4]
    }
    for (let k in paramsList) {
      Xr(k) |> logger
      Xr(' ').array(paramsList[k] |> ArrX.hBrief) |> logger
    }
  }
}

ArrXTest.test()
