import { toBound } from '../../../src/utils/toBound'
import { toNumerify } from '../../../src/utils/toNumChecker'
import { firstNumInArray } from '../../../src/utils/locNum'

export let boundDev = (arr, { dif = false, level = 0 } = {}) => {
  let l = arr?.length
  if (!l) return toBound(NaN, NaN, dif)
  const tr = toNumerify(level)
  let [i, el] = firstNumInArray(arr, 0, l, { level })
  let max = tr(el), min = max
  for (--l; l > i; --l) {
    el = tr(arr[l])
    if (el < min) {min = el} else if (el > max) {max = el}
  }
  return toBound(max, min, dif)
}
