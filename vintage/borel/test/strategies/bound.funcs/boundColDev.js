import { toBound } from '../../../src/utils/toBound'
import { toNumLcher } from '../../../src/utils/isNumLcher'
import { locNumInCol } from '../../../src/utils/locNum'
import { size } from '../../../src/utils/size'

// const size = (mx) => {
//   if (!mx) return [undefined,]
//   let h = mx.length
//   if (!h) return [undefined,]
//   let [r] = mx
//   if (!r) return [undefined,]
//   let w = r.length
//   if (!w) return [undefined,]
//   return [h, w]
// }
/**
 *
 * @param {*[]} mx
 * @param {number} y
 * @param {boolean} [dif=false]
 * @param {number} [level=0]
 * @returns {{min: *, max: *}|{min: *, dif: *}}}
 */
export const boundColDev = (mx, y, { dif = false, level = 0 } = {}) => {
  let [h, w] = size(mx)
  if (!h || !w) return toBound(NaN, NaN, dif)
  const t = toNumLcher(level)
  let [i, el] = locNumInCol(mx, 0, h, y, { level })
  let max = t(el), min = max
  for (--h; h > i; --h) {
    el = t(mx[h][y])
    if (el < min) {min = el} else if (el > max) {max = el}
  }
  return toBound(max, min, dif)
}