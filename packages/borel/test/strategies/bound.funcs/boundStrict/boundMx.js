import { toBound } from '../../../../src/utils/bound'
import { locNumInMx } from '../../../../src/utils/locNum'
import { boundVec } from './vecBoundNum'

export const boundMx = (mx, { dif = false } = {}) => {
  if (!mx) return toBound(NaN, NaN, dif)
  let { length: ht } = mx
  switch (ht) {
    case 0:
      return toBound(NaN, NaN, dif)
    case 1:
      const [arr] = mx
      return boundVec(arr, { dif })
    default:
      let [row] = mx
      let { length: wd } = row
      if (!row || !wd) return toBound(NaN, NaN, dif)
      let [i, j, el] = locNumInMx(mx, 0, ht, 0, wd)
      if (i < 0 || j < 0) return toBound(NaN, NaN, dif)
      let max = el, min = max
      for (--ht; ht > i; --ht) {
        let { max: _max, min: _min } = boundVec(mx[ht])
        if (_min < min) {min = _min} else if (_max > max) {max = _max}
      }
      return toBound(max, min, dif)
  }
}
