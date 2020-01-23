import { dpArr } from './misc/clone'
import { Num, NumLoose } from 'typen'
import { Ar } from './Ar'

const { numeric: num } = Num, { numeric: numLoose } = NumLoose, { map: mapAr } = Ar

/**
 * Static class containing methods to create 2d-array.
 */
export class Mx {
  /**
   *
   * @param {number} height
   * @param {number} width
   * @param {function} ject
   * @returns {number[][]}
   */
  static ini (height, width, ject) {
    return Array(height).fill(null).map((_, x) =>
      Array(width).fill(null).map((_, y) =>
        ject(x, y)
      )
    )
  }

  static size (mx) {
    const l = mx?.length
    return [l, l ? mx[0]?.length : undefined]
  }

  static isMat (mx) {
    return Array.isArray(mx) && mx.length
      ? Array.isArray(mx[0])
      : false
  }

  static is (mx) {
    return mx && mx.length
      ? !!mx[0]
      : false
  }

  static copy (mx) {
    return mx.map(row => row.slice())
  }

  static clone (mx) {
    return mx.map(dpArr)
  }

  /**
   *
   * @param {*[][]} mx
   * @param {boolean=false} [loose]
   * @returns {*}
   */
  static numeric (mx, { loose = false }) {
    const fn = loose ? numLoose : num
    return mx.map(r => r.map(fn))
  }

  /**
   *
   * @param {*[][]} mx
   * @return {number[]}
   */
  static columnIndexes (mx) {
    return !mx || !mx.length
      ? []
      : !mx[0]
        ? []
        : mx[0].map((_, i) => i)
  }

  /**
   *
   * @param {*[][]} mx
   * @return {number[]}
   */
  static coins (mx) {
    return !mx || !mx.length
      ? []
      : !mx[0]
        ? []
        : mx[0].map((_, i) => i)
  }

  /**
   *
   * @param {*[][]} mx
   * @param {number[]} indexes
   * @returns {*}
   */
  static select (mx, indexes) {
    const hi = indexes.length
    switch (hi) {
      case 0:
        return mx
      case 1:
        const [i] = indexes
        return Mx.column(mx, i)
      default:
        const { select } = Ar
        return mx.map(row => select(row, indexes, hi))
    }
  }

  /**
   * Transpose a 2d-array.
   * @param {*[][]} mx
   * @returns {*[][]}
   */
  static transpose (mx) {
    if (mx && mx.length) {
      let w = mx[0].length, cols = Array(w)
      for (--w; w >= 0; w--) cols[w] = mapAr(mx, r => r[w])
      return cols
    }
    return mx
  }

  static column (mx, y) {
    return mx.map(r => r[y])
  }

  /**
   * Iterate through the columns of a 2d-array and return the transposed
   * @param {*[][]} mx
   * @param {function(*[]):*} fnOnColumn
   * @returns {*[][]|*[]}
   */
  static columns (mx, fnOnColumn) {
    return fnOnColumn
      ? mapAr(Mx.transpose(mx), fnOnColumn)
      : Mx.transpose(mx)
  }

  /**
   * Iterate through elements on each (x of rows,y of columns) coordinate of a 2d-array.
   * @param {*[][]} mx
   * @param {function} fn
   * @returns {*[]}
   */
  static map (mx, fn) {
    const [ht, wd] = Mx.size(mx)
    // return mx.map((r, i) => r.map((el, j) => fn(el, i, j)))
    return mapAr(mx,
      (r, i) => mapAr(r,
        (x, j) => fn(x, i, j),
        wd),
      ht)
  }

  static mutateMap (mx, fn) {
    const [ht, wd] = Mx.size(mx)
    for (let i = 0, j, r; i < ht; i++) {
      r = mx[i]
      for (j = 0; j < wd; j++) {
        r[j] = fn(r[j], i, j)
      }
    }
    return mx
  }

  static mapCol (mx, y, fn) {
    const l = mx.length, _mx = Array(l)
    for (let i = 0, r, l = mx.length; i < l; i++) {
      r = mx[i].slice()
      r[y] = fn(r[y], i)
      _mx[i] = r
    }
    return _mx
  }

  static mutateCol (mx, y, fn) {
    for (let i = 0, r, l = mx.length; i < l; i++) {
      r = mx[i]
      r[y] = fn(r[y], i)
    }
    return mx
  }

  /**
   * Iterate through the columns of a 2d-array.
   * @param {*[][]} mx
   * @param {function(*[]):[]} fnOnColumn
   * @returns {*[][]}
   */
  static mapColumns (mx, fnOnColumn) {
    return Mx.columns(mx, fnOnColumn) |> Mx.transpose
  }

  static spliceCols (mx, ys) {
    const hi = ys.length
    switch (hi) {
      case 0:
        return mx
      case 1:
        const [y] = ys
        return mx.map(row => {
          row.splice(y, 1)
          return row
        })
      default:
        const { splices } = Ar
        return mx.map(row => splices(row, ys, hi))
    }
  }

  /**
   *
   * @param {*[][][]} matrices - a list of 2d-array
   * @param {function(*[]):*} [zipper]
   */
  static zip (matrices, zipper) {
    const hi = matrices?.length, [ht, wd] = Mx.size(matrices[0])
    return typeof zipper !== 'function'
      ? Mx.ini(ht, wd, (i, j) => mapAr(matrices, mx => mx[i][j], hi))
      : Mx.ini(ht, wd, (i, j) => zipper(mapAr(matrices, mx => mx[i][j], hi)))
  }
}
