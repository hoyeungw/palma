import { locNumInAr } from '../utils/locNum'
import { toBound } from '../utils/toBound'
import { toNumLcher } from '../utils/isNumLcher'
import { sortEntries } from '../utils/sortEntries'

const plusOrZero = x => x ? (x + 1) : 1

class Stat {
  static cnt (arr) {
    return !!arr ? arr.length : 0
  }

  /**
   *
   * @param {number[]} arr
   * @param {number} [level] - 0: no check, 1: loose check, 2: strict check
   * @returns {number}
   */
  static sum (arr, { level = 0 } = {}) {
    if (!arr) return 0
    const tr = toNumLcher(level)
    let { length: l } = arr
    switch (l) {
      case 0:
        return NaN
      case 1:
        return level ? tr(arr[0]) : arr[0]
      default:
        let sum = 0
        if (level) {
          for (--l; l >= 0; l--) sum += tr(arr[l])
        } else {
          for (--l; l >= 0; l--) sum += arr[l]
        }
        return sum
    }
  }

  /**
   *
   * @param {number[]} arr
   * @param {number} [level] - 0: no check, 1: loose check, 2: strict check
   * @returns {number}
   */
  static avg (arr, { level = 0 } = {}) {
    return arr && arr.length
      ? Stat.sum(arr, { level }) / arr.length
      : 0
  }

  static mode (arr) {
    return undefined
  }

  /**
   *
   * @param {*[]} arr
   * @param {boolean} [count=false]
   * @param {string|boolean} [sort=false]
   * @returns {[any, any][]|[]|any[]|*}
   */
  static distinct (arr, { count = false, sort = false } = {}) {
    if (!arr) return count ? [[]] : []
    const l = arr.length
    if (!l) return count ? [[]] : []
    if (count) {
      let ents
      if (l <= 0x100) {
        ents = []
        for (let i = 0, j, el; i < l; i++) {
          el = arr[i]
          j = ents.findIndex(x => el === x[0])
          if (j < 0) j += ents.push([el, 0])
          ents[j][1]++
        }
      } else {
        const lx = new Map()
        for (let i = 0, el; i < l; i++) {
          el = arr[i]
          lx.set(el, plusOrZero(lx.get(el)))
        }
        ents = Array.from(lx.entries())
      }
      return sortEntries(ents, sort)
    } else {
      if (l <= 0x100) {
        const dist = []
        for (let i = 0; i < l; i++) if (dist.indexOf(arr[i]) < 0) dist.push(arr[i])
        return dist
      } else {
        return Array.from(new Set(arr))
      }
    }
  }

  static median (arr) {
    return undefined
  }

  /**
   *
   * @param {*[]} arr
   * @param {boolean} [dif=false]
   * @param {number} [level=0]
   * @returns {{min: *, max: *}|{min: *, dif: *}}}
   */
  static bound (arr, { dif = false, level = 0 } = {}) {
    let l = arr?.length
    if (!l) return toBound(NaN, NaN, dif)
    const t = toNumLcher(level)
    let [i, el] = locNumInAr(arr, 0, l, { level })
    let max = t(el), min = max
    for (--l; l > i; --l) {
      el = t(arr[l])
      if (el < min) {min = el} else if (el > max) {max = el}
    }
    return toBound(max, min, dif)
  }

  // Population standard deviation
  static stDevP (arr, { level = 0 } = {}) {
    const cnt = Stat.cnt(arr)
    if (!cnt) return 0
    const avg = Stat.avg(arr, { level })
    return Math.hypot(...arr.map((x) => x - avg)) / Math.sqrt(cnt)
  }

  // Sample standard deviation
  static stDevS (arr, { level = 0 } = {}) {
    const cnt = Stat.cnt(arr) - 1
    if (!cnt) return 0
    const avg = Stat.avg(arr, { level })
    return Math.hypot(...arr.map((x) => x - avg)) / Math.sqrt(cnt)
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):number} ject
   * @return {number}
   */
  static sumBy (arr, ject) {
    if (!arr) return NaN
    const l = arr.length
    switch (l) {
      case 0:
        return NaN
      case 1:
        return ject(arr[0])
      default:
        let sum = 0
        for (let i = 0; i < l; i++) sum += ject(arr[i])
        return sum
    }
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):number} ject
   * @return {number}
   */
  static maxBy (arr, ject) {
    if (!arr) return NaN
    const l = arr.length
    switch (l) {
      case 0:
        return NaN
      case 1:
        return ject(arr[0])
      default:
        let v, max = ject(arr[0])
        for (let i = 1; i < l; i++) {
          v = ject(arr[i])
          if (v > max) max = v
        }
        return max
    }
  }
}

export {
  Stat
}

// function sum(arr) {
//   let rsl = 0;
//   for (let i = 0; i < arr.length; i++) {
//     rsl += arr[i];
//   }
//   return rsl;
// }

// function sum (arr) {
//   switch (arr.length) {
//     case 0:
//       return NaN
//     case 1:
//       return arr[0]
//     default:
//       let sum = 0
//       for (let n of arr) {
//         sum += n
//       }
//       return sum
//   }
// }
