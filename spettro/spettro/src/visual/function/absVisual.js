import { mapAr, mutateMap } from '../../../utils/iterate/map'
import { isNum } from '../utils/isNum'

/**
 *
 * @param arr
 * @param numChalk
 * @param naChalk
 * @param retFn
 * @param mutate
 * @returns {*|*[]}
 */
export const absVisual = (arr, numChalk, naChalk, retFn = true, mutate = true) => {
  const map = mutate ? mutateMap : mapAr
  return retFn
    ? map(arr, x => isNum(x) ? numChalk : naChalk)
    : map(arr, x => isNum(x) ? numChalk(x) : naChalk(x))
}
