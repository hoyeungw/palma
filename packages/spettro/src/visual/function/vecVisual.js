import { tube } from '../../utils/hsl'
import { isNum } from '../utils/isNum'
import { chalkify } from '../utils/chalkify'
import { mapAr, mutateMap } from '../../utils/iterate/map'

/**
 *
 * @param {*[]} ar
 * @param {number|*} m
 * @param {number|*} d
 * @param {[number,number,number]} min
 * @param {[number,number,number]} dif
 * @param {Chalk|function} naChalk
 * @param {boolean} retFn
 * @param {boolean} mutate
 * @returns {Chalk[]|*[]}
 */
export const vecVisual = (ar, { val: { min: m, dif: d }, pal: { min, dif }, naChalk, retFn, mutate }) => {
  const map = mutate ? mutateMap : mapAr
  if (isNaN(d) || !d || dif.every(x => !x)) {
    const soleChalk = min |> tube
    return retFn
      ? map(ar, x => isNum(x) ? soleChalk : naChalk)
      : map(ar, x => isNum(x) ? x |> soleChalk : x |> naChalk)
  }
  const rto = mapAr(dif, _ => _ / d, 3)
  return retFn
    ? map(ar, x => isNum(x) ? chalkify(x, m, rto, min) : naChalk)
    : map(ar, x => isNum(x) ? x |> chalkify(x, m, rto, min) : x |> naChalk)
}
