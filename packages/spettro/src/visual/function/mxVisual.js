import { Mx } from 'veho'
import { tube } from '../../utils/hsl'
import { isNum } from '../utils/isNum'
import { chalkify } from '../utils/chalkify'
import { mapAr, mutateMap } from '../../utils/iterate/map'

/**
 *
 * @param {*[][]} mx
 * @param {number|*} m
 * @param {number|*} d
 * @param {[number,number,number]} min
 * @param {[number,number,number]} dif
 * @param {Chalk|function} naChalk
 * @param {boolean} retFn
 * @param {boolean} mutate
 * @returns {Chalk[]|*[]}
 */
export const mxVisual = (mx, { val: { min: m, dif: d }, pal: { min, dif }, naChalk, retFn, mutate }) => {
  const map = mutate ? mutateMap : mapAr
  if (isNaN(d) || !d || dif.every(el => !el)) {
    const soleChalk = min |> tube
    return retFn
      ? map(mx, el => isNum(el) ? soleChalk : naChalk)
      : map(mx, el => isNum(el) ? el |> soleChalk : el |> naChalk)
  }
  const rto = mapAr(dif, _ => _ / d, 3)
  return retFn
    ? map(mx, el => isNum(el) ? chalkify(el, m, rto, min) : naChalk)
    : map(mx, el => isNum(el) ? el |> chalkify(el, m, rto, min) : el |> naChalk)
}

/**
 *
 * @param {*[][]} mx
 * @param {number} y
 * @param {number|*} m
 * @param {number|*} d
 * @param {[number,number,number]} min
 * @param {[number,number,number]} dif
 * @param {Chalk|function} naChalk
 * @param {boolean} retFn
 * @param {boolean} mutate
 * @returns {Chalk[]|*[]}
 */
export const mxVisualCol = (mx, y, { val: { min: m, dif: d }, pal: { min, dif }, naChalk, retFn, mutate }) => {
  const mapCol = mutate ? Mx.mutateCol : Mx.mapCol
  if (isNaN(d) || !d || dif.every(x => !x)) {
    const soleChalk = min |> tube
    return retFn
      ? mapCol(mx, y, el => isNum(el) ? soleChalk : naChalk)
      : mapCol(mx, y, el => isNum(el) ? el |> soleChalk : el |> naChalk)
  }
  const rto = mapAr(dif, _ => _ / d, 3)
  return retFn
    ? mapCol(mx, y, el => isNum(el) ? chalkify(el, m, rto, min) : naChalk)
    : mapCol(mx, y, el => isNum(el) ? el |> chalkify(el, m, rto, min) : el |> naChalk)
}
