import { Chrono } from 'elprimero'
import { Zu } from '../../../dist/index.esm'
import { Ar } from 'veho'
import { Stat } from '../../../src/borel/Stat'

const p1or0 = x => x ? (x + 1) : 1

export class DistinctStrategies {
  static test () {
    const { lapse, result } = Chrono.strategies({
      repeat: 2E+4,
      paramsList: {
        // el_512_l: [Ar.ini(512, () => Zu.rand(0, 512))],
        // el_512_m: [Ar.ini(512, () => Zu.rand(0, 256))],
        // el_512_s: [Ar.ini(512, () => Zu.rand(0, 32))],
        el_256_l: [Ar.ini(256, () => Zu.rand(0, 256))],
        el_256_m: [Ar.ini(256, () => Zu.rand(0, 128))],
        el_256_s: [Ar.ini(256, () => Zu.rand(0, 32))],
        el_128_l: [Ar.ini(128, () => Zu.rand(0, 128))],
        el_128_m: [Ar.ini(128, () => Zu.rand(0, 64))],
        el_128_s: [Ar.ini(128, () => Zu.rand(0, 16))],
        el_016_l: [Ar.ini(16, () => `P${Zu.rand(0, 16)}`)],
        el_016_m: [Ar.ini(16, () => `P${Zu.rand(0, 8)}`)],
        el_016_s: [Ar.ini(16, () => `P${Zu.rand(0, 4)}`)],
      },
      funcList: {
        distinct_native: arr => Array.from(new Set(arr)),
        distinct_dev: arr => {
          const dist = []
          for (let i = 0, l = arr.length; i < l; i++) if (dist.indexOf(arr[i]) < 0) dist.push(arr[i])
          return dist
        },
        distinct_edge: arr => Stat.distinct(arr, { count: false, sort: false }),
        w_count_native: arr => {
          const lx = new Map()
          for (let i = 0, l = arr.length, el; i < l; i++) {
            el = arr[i]
            lx.set(el, p1or0(lx.get(el)))
          }
          return Array.from(lx.entries())
        },
        w_count_dev: arr => {
          const ents = []
          for (let k = 0, l = arr.length, i, el; k < l; k++) {
            el = arr[k]
            i = ents.findIndex(x => el === x[0])
            if (i < 0) i += ents.push([el, 0])
            ents[i][1]++
          }
          return ents
        },
        w_count_edge: arr => Stat.distinct(arr, { count: true, sort: false })
      }
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    result.brief() |> console.log
  }
}

describe('Distinct Strategies', function () {
  this.timeout(1000 * 60)
  it('Distinct Strategies: test ', () => {
    DistinctStrategies.test()
  })
})
