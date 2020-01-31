import { Stat, StatMx } from 'borel'
import { Ar, Mx } from 'veho'
import { Rgb } from 'farbe'
import { vecVisual } from './function/vecVisual'
import { mxVisual, mxVisualCol } from './function/mxVisual'
import { marks } from './assets/visual.config'
import { tube } from '../../utils/tube'
import { mapAr, mutateMap } from '../../utils/iterate/map'

const { fromHex, toHsl } = Rgb
const parseHsl = color => typeof color === 'string' ? color |> fromHex |> toHsl : color

/**
 *
 * @param max
 * @param min
 * @returns {{dif: [number,number,number], min: [number,number,number]}}
 */
const colorBound = (max, min) => ({ min, dif: Ar.mutateMap(max, (a, i) => a - min[i], 3) })

export class Visual {
  /**
   *
   * @param {*[]} arr
   * @param {string|number[]} [max]
   * @param {string|number[]} [min]
   * @param {string|number[]} [na]
   * @param {boolean} [mutate=true]
   * @param {boolean} [retFn=false]
   */
  static vector (arr, {
    mark: {
      max = marks.fresh.max,
      min = marks.fresh.min,
      na = marks.fresh.na
    } = {},
    mutate = false,
    retFn = false
  } = {}) {
    return vecVisual(arr, {
      val: Stat.bound(arr, { dif: true, level: 2 }),
      pal: colorBound(max |> parseHsl, min |> parseHsl),
      naChalk: na |> parseHsl |> tube,
      mutate,
      retFn
    })
  }

  /**
   *
   * @param {*[][]} mx
   * @param {string|number[]} [max]
   * @param {string|number[]} [min]
   * @param {string|number[]} [na]
   * @param {number} [direct=1] - 0:p-wise, 1:r-wise, 2:c-wise
   * @param {boolean} [mutate=true]
   * @param {boolean} [retFn=false]
   * @returns {*}
   */
  static matrix (mx, {
    mark: {
      max = marks.subtle.max,
      min = marks.subtle.min,
      na = marks.subtle.na
    } = {},
    direct = 1,
    mutate = false,
    retFn = false
  } = {}) {
    if (!Mx.isMat(mx)) throw new Error('Not valid matrix')
    switch (direct) {
      case 2:
        const mapCols = Mx.mapColumns
        return mapCols(mx, c => Visual.vector(c, { mark: { max, min, na }, mutate, retFn }))
      case 1:
        const mapRows = mutate ? mutateMap : mapAr
        return mapRows(mx, r => Visual.vector(r, { mark: { max, min, na }, mutate, retFn }))
      case 0:
      default:
        return mxVisual(mx, {
          val: StatMx.bound(mx, { dif: true, level: 2 }),
          pal: colorBound(max |> parseHsl, min |> parseHsl),
          naChalk: na |> parseHsl |> tube,
          mutate,
          retFn
        })
    }
  }

  /**
   *
   * @param {*[][]} mx
   * @param {number} y
   * @param {string|number[]} [max]
   * @param {string|number[]} [min]
   * @param {string|number[]} [na]
   * @param {boolean} deep
   */
  static column (mx, y, {
    mark: {
      max = marks.fresh.max,
      min = marks.fresh.min,
      na = marks.fresh.na
    } = {},
    mutate = false,
    retFn = false
  } = {}) {
    return mxVisualCol(mx, y, {
      val: StatMx.boundCol(mx, y, { dif: true, level: 2 }),
      pal: colorBound(max |> parseHsl, min |> parseHsl),
      naChalk: na |> parseHsl |> tube,
      mutate,
      retFn
    })
  }
}
