import { bound } from '../../../src/utils/Bound'
import { ToNum } from '../../../src/utils/IsNum'
import { firstNumInColumn } from '../../../src/utils/locNum'
import { size } from '../../../src/utils/size'

// const size = (mx) => {
//   if (!mx) return [undefined,]
//   let h = mx.length
//   if (!h) return [undefined,]
//   let [x] = mx
//   if (!x) return [undefined,]
//   let w = x.length
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
  if (!h || !w) return bound(NaN, NaN, dif)
  const t = ToNum(level)
  let [i, el] = firstNumInColumn(mx, 0, h, y, { level })
  let max = t(el), min = max
  for (--h; h > i; --h) {
    el = t(mx[h][y])
    if (el < min) {min = el} else if (el > max) {max = el}
  }
  return bound(max, min, dif)
}
