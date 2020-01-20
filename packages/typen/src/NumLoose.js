import { otype } from '../utils/typen'

const check = x => !!x || x === 0

export class NumLoose {
  static isNumeric (x) { return check(+x) }

  static numeric (x) {
    x = +x
    return check(x) ? x : NaN
  }

  /**
   *
   * @param {*} x
   * @return {string}
   */
  static inferData (x) {
    const t = typeof x
    return t === 'string'
      ? check(+x)
        ? 'numstr'
        : 'string'
      : t === 'object'
        ? otype(x).toLowerCase()
        : t
  }
}
