import { locNumInCol, locNumInMx } from '../utils/locNum'
import { toBound } from '../utils/toBound'
import { Stat } from './Stat'
import { toNumLcher } from '../utils/isNumLcher'
import { size } from '../utils/size'
import { sortEntries } from '../utils/sortEntries'
import { sortRows } from '../utils/sortRows'

export class StatMx {
  static cnt (mx) {
    if (mx && mx.length) {
      const [row] = mx
      if (row && row.length) return length * row.length
    }
    return 0
  }

  // /**
  //  *
  //  * @param {number[] }mx
  //  * @returns {number}
  //  */
  // static sum (mx) {
  //   if (!mx) return 0
  //   let { length: l } = mx
  //   switch (l) {
  //     case 0:
  //       return NaN
  //     case 1:
  //       return mx[0]
  //     default:
  //       let sum = 0
  //       for (--l; l >= 0; l--) sum += mx[l]
  //       return sum
  //   }
  // }
  //
  // static avg (mx) {
  //   const cnt = StatMx.cnt(mx)
  //   return cnt ? StatMx.sum(mx) / cnt : 0
  // }

  /**
   *
   * @param {*[]} mx
   * @param {boolean} [dif=false]
   * @param {number} [level=0]
   * @returns {{min: *, max: *}|{min: *, dif: *}}}
   */
  static bound (mx, { dif = false, level = 0 } = {}) {
    let [h, w] = size(mx)
    if (!h || !w) return toBound(NaN, NaN, dif)
    const t = toNumLcher(level)
    let
      [i, , el] = locNumInMx(mx, 0, h, 0, w, { level }),
      max = t(el), min = max, _a, _i
    for (--h; h > i; --h) {
      ({ max: _a, min: _i } = Stat.bound(mx[h], { level }))
      if (_i < min) {min = _i} else if (_a > max) {max = _a}
    }
    return toBound(max, min, dif)
  }

  /**
   *
   * @param {*[]} mx
   * @param {number} y
   * @param {boolean} [dif=false]
   * @param {number} [level=0] - level: 0, none; 1, loose; 2, strict
   * @returns {{min: *, max: *}|{min: *, dif: *}}}
   */
  static boundCol (mx, y, { dif = false, level = 0 } = {}) {
    let [h, w] = size(mx)
    if (!h || !w || y >= w) return toBound(NaN, NaN, dif)
    const t = toNumLcher(level)
    let
      [i, el] = locNumInCol(mx, 0, h, y, { level }),
      max = t(el), min = max
    for (--h; h > i; --h) {
      el = t(mx[h][y])
      if (el < min) {min = el} else if (el > max) {max = el}
    }
    return toBound(max, min, dif)
  }

  static distinct (mx, y) {
    let [h, w] = size(mx)
    if (!h || !w || y >= w) return [[]]
    let rows = []
    for (let i = 0, _r; i < h; i++) {
      _r = mx[i]
      if (rows.findIndex(r => _r[y] === r[y]) < 0) rows.push(_r)
    }
    return rows
  }

  /**
   *
   * @param {*[]} mx
   * @param {number} y
   * @param {boolean} [count=false]
   * @param {string|boolean} [sort=false] - When sort is function, sort must be a comparer between two point element.
   * @returns {[any, any][]|[]|any[]|*}
   */
  static distinctCol (mx, y, { count = false, sort = false } = {}) {
    const [h, w] = size(mx)
    if (!h || !w || y >= w) return count ? [[]] : []
    if (!count) {
      const dist = []
      for (let i = 0, el; i < h; i++) {
        el = mx[i][y]
        if (dist.indexOf(el) < 0) dist.push(el)
      }
      return dist
    } else {
      let ents = []
      for (let i = 0, j, el; i < h; i++) {
        el = mx[i][y]
        j = ents.findIndex(x => el === x[0])
        if (j < 0) j += ents.push([el, 0])
        ents[j][1]++
      }
      return sortEntries(ents, sort)
    }
  }
}
