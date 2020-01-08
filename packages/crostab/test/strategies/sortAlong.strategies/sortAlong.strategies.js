import { Chrono } from 'elprimero'
import { Comparer, Rank } from 'borel'
import { table } from '../../asset/json/simple.headers.and.rowset'
import { nba_players_performance } from '../../asset/json/nba.players.performance'
import { deco } from 'xbrief'

const { rowSet: countryRows } = table
const { matr: nbaRows } = nba_players_performance

export class SortAlongStrategies {
  static test () {

    const funcList = {
      bench: (keys, rows, y, comparer, filter) => {
        const _comp = (a, b) => comparer(a[y], b[y])
        return (filter ? rows.filter(r => filter(r[y])) : rows.slice())
          .sort(_comp)
      },
      native: (keys, rows, y, comparer, filter) => {
        const
          entries = keys.map((k, i) => [k, rows[i]]),
          _comp = ([, a], [, b]) => comparer(a[y], b[y])
        return entries.sort(_comp)
      },
      stable: (keys, rows, y, comparer, filter) => {
        keys = keys.slice()
        rows = rows.slice()
        let l = keys.length, _comp = (a, b) => comparer(a[0], b[0])
        // let _rows = Array(l), row
        // for (--l; l >= 0; l--) {
        //   row = rows[l]
        //   _rows[l] = [row[y], keys[l], row]
        // }
        // _rows = _rows.sort(_comp)
        let _rows = rows.map((r, i) => [r[y], keys[i], r]).sort(_comp)
        // let row
        l--
        for (let k, el; l >= 0; l--) {
          ([, k, el] = _rows[l])
          keys[l] = k
          rows[l] = el
        }
        return [keys, rows]
      },
      dev: (keys, rows, y, comparer, filter) => {
        const
          _comp = (a, b) => comparer(a[0], b[0]),
          ks = Array(keys.length),
          _rows = rows
            .map((r, i) => [r[y], keys[i], r])
            .sort(_comp)
            .map(([_, k, r], i) => {
              ks[i] = k
              return r
            })
        return [ks, _rows]
      },
      insert: (keys, rows, y, comparer, filter) => {
        keys = keys.slice()
        rows = rows.slice()
        const arr = rows.map(r => r[y])
        let
          { length } = arr,
          j, el, k, r
        for (let i = 1; i < length; i++) {
          [el, r, k] = [arr[i], rows[i], keys[i]]
          j = i - 1
          while (j >= 0 && comparer(el, arr[j]) < 0) {
            [arr[j + 1], rows[j + 1], keys[j + 1]] = [arr[j], rows[j], keys[j]]
            j--
          }
          [arr[j + 1], rows[j + 1], keys[j + 1]] = [el, r, k]
        }
        return [keys, rows]
      },
      shell: (keys, rows, y, comparer, filter) => {
        keys = keys.slice()
        rows = rows.slice()
        const arr = rows.map(r => r[y])
        let
          { length } = arr,
          k, r, el, i, j, d = 1
        while (d * 3 < length) d = d * 3 + 1
        for (d; d > 0; d = ~~(d / 3)) {
          for (i = d; i < length; i++) {
            [el, r, k] = [arr[i], rows[i], keys[i]]
            j = i - d
            while (j >= 0 && comparer(el, arr[j]) < 0) {
              [arr[j + d], rows[j + d], keys[j + d]] = [arr[j], rows[j], keys[j]]
              j -= d
            }
            [arr[j + d], rows[j + d], keys[j + d]] = [el, r, k]
          }
        }
        return [keys, rows]
      },
      original: (keys, rows, y, comparer, filter) => {
        return [keys, rows]
      },
    }
    const { lapse, result } = Chrono.strategies({
      repeat: 1E+5,
      paramsList: {
        simple: [[...countryRows.keys()], countryRows, 0, Comparer.stringAscending],
        numeric: [[...countryRows.keys()], countryRows, 1, Comparer.numberDescending],
        // nba: [[...nbaRows.keys()], nbaRows, 6, Comparer.numberDescending],
      },
      funcList
    })
    'lapse' |> console.log
    lapse.brief() |> console.log
    '' |> console.log
    'result' |> console.log
    for (let key of Object.keys(funcList)) {
      key |> console.log
      result.queryCell('simple', key) |> deco |> console.log
      '' |> console.log
    }
  }
}

describe('Sort Along Strategies', function () {
  this.timeout(1000 * 60)
  it('Sort Along Strategies: test ', () => {
    SortAlongStrategies.test()
  })
})
