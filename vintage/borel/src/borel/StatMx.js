import { firstNumInColumn, firstNumInMatrix } from '../utils/locNum'
import { bound } from '../utils/Bound'
import { Stat } from './Stat'
import { ToNum } from '../utils/ToNum'
import { size } from '../utils/size'
import { sortEntries } from '../utils/sortEntries'

export class StatMx {
  static cnt (mx) {
    if (mx && mx.length) {
      const [row] = mx
      if (row && row.length) return length * row.length
    }
    return 0
  }

  /**
   *
   * @param {*[]} mx
   * @param {boolean} [dif=false]
   * @param {number} [level=0]
   * @returns {{min: *, max: *}|{min: *, dif: *}}}
   */
  static bound (mx, { dif = false, level = 0 } = {}) {
    let [h, w] = size(mx)
    if (!h || !w) return bound(NaN, NaN, dif)
    const t = ToNum(level)
    let
      [i, , el] = firstNumInMatrix(mx, 0, h, 0, w, { level }),
      max = t(el), min = max, rowMax, rowMin
    for (--h; h >= i; h--) {
      ({ max: rowMax, min: rowMin } = Stat.bound(mx[h], { level }))
      if (rowMin < min) { min = rowMin } else if (rowMax > max) { max = rowMax }
    }
    return bound(max, min, dif)
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
    if (!h || !w || y >= w) return bound(NaN, NaN, dif)
    const t = ToNum(level)
    let
      [i, el] = firstNumInColumn(mx, 0, h, y, { level }),
      max = t(el), min = max
    for (--h; h >= i; h--) {
      el = t(mx[h][y])
      if (el < min) {min = el} else if (el > max) {max = el}
    }
    return bound(max, min, dif)
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
