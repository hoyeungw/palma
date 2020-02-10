import { toBound } from '../../../../src/utils/bound'
import { firstNumInArray } from '../../../../src/utils/locNum'

export function boundVec (arr, { dif = false } = {}) {
  if (!arr) return toBound(NaN, NaN, dif)
  let { length: l } = arr
  switch (l) {
    case 0:
      return toBound(NaN, NaN, dif)
    case 1:
      return toBound(arr[0], arr[0], dif)
    default:
      let [i, el] = firstNumInArray(arr, 0, l)
      if (i < 0) return toBound(NaN, NaN, dif)
      let max = el, min = max
      for (--l; l > i; --l) {
        el = +arr[l]
        if (el < min) {
          min = el
        } else if (el > max) {
          max = el
        }
      }
      return toBound(max, min, dif)
  }
}
