import { toBound } from '../../../src/utils/toBound'
import { toNumLcher } from '../../../src/utils/isNumLcher'
import { locNumInAr } from '../../../src/utils/locNum'

export let boundDev = (arr, { dif = false, level = 0 } = {}) => {
  let l = arr?.length
  if (!l) return toBound(NaN, NaN, dif)
  const tr = toNumLcher(level)
  let [i, el] = locNumInAr(arr, 0, l, { level })
  let max = tr(el), min = max
  for (--l; l > i; --l) {
    el = tr(arr[l])
    if (el < min) {min = el} else if (el > max) {max = el}
  }
  return toBound(max, min, dif)
}