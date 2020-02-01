import { Dawdle, ETA } from '../../index'
import { Xr } from 'xbrief'
import { lingerStable } from '../../src/Dawdle/archive/lingerStable'
import { lingerDev } from '../../src/Dawdle/archive/lingerDev'

class DawdleTest {
  static async strategies () {

    const fn = x => (x << 1)
    let rsl
    const eta = new ETA()
    const asyncShiftSta = async x => await lingerStable(0, fn, x)
    const asyncShiftDev = async x => await lingerDev(0, fn, x)
    eta.ini() |> console.log
    for (let i = 0; i < 0x800; i++) {
      rsl = await asyncShiftSta(4)
    }
    eta.lap(Xr().p('1st test done').result(rsl).say) |> console.log

    eta.ini() |> console.log
    for (let i = 0; i < 0x800; i++) {
      rsl = await asyncShiftDev(4)
    }
    eta.lap(Xr().p('2nd test done').result(rsl).say) |> console.log
  }
}

DawdleTest.strategies().then(

)

