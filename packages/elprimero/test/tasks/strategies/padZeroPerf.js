import { Stat, Zu } from 'borel'
import { Chrono } from '../../../src/Chrono'
import { CrosX } from 'crostab'

class PadZeroPerf {

  static test () {
    const paramsList = {
      n___1_: [1],
      n__x0s: [Zu.rand(0, 10)],
      n_x00s: [Zu.rand(10, 100)],
      n_100_: [100],
      nx000s: [Zu.rand(100, 1000)],
      ny000s: [Zu.rand(100, 1000)],
    }
    const _z2 = '00'
    const { lapse, result } = Chrono.strategies({
      repeat: 1000000,
      paramsList,
      funcList: {
        pad1: ms =>
          ms < 10
            ? `00${ms.toString()}`
            : ms < 100
            ? `0${ms.toString()}`
            : `${ms.toString()}`,
        pad2: ms => {
          ms = '' + ms
          switch (ms.length) {
            case 3:
              return ms
            case 2:
              return '0' + ms
            case 1:
              return '00' + ms
          }
        },
        pad3: ms => ms > 99 ? String(ms) : ('00' + ms).slice(-3),
        pad4: ms => {
          ms = '' + ms
          return ms.length > 2 ? ms : (_z2 + ms).slice(-3)
          // return ('0000' + x).substring(x.length)
        },
        pad5: ms => String(ms).padStart(3, '0'),
        pad6: ms => {
          ms = '' + ms
          return !ms[2] ? (_z2 + ms).slice(-3) : ms
          // return ('0000' + x).substring(x.length)
        },
      }
    })
    lapse
      .unshiftRow('[avg]', lapse.columns.map(Stat.avg).map(n => n.toFixed()))
      |> CrosX.brief
      |> console.log
    '' |> console.log
    result
      .unshiftCol('[val]', Object.values(paramsList))
      |> CrosX.brief
      |> console.log

  }
}

describe('PadZeroPerf', function () {
  it('Pad Zero Perf: test', () => {
    PadZeroPerf.test()
  })
})