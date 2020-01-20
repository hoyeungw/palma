import { otype } from '../utils/typen'

/**
 * validate
 * @param x
 * @param y
 * @returns {number}
 */
const vdt = (x, y) => isNaN(x - y) ? NaN : y

export class Num {
  // Angular 4.3
  static isNumeric (x) { return !isNaN(x - parseFloat(x)) }

  static numeric (x) { return vdt(x, parseFloat(x)) }

  static inferData (x) {
    const t = typeof x
    return t === 'string'
      ? isNaN(x - parseFloat(x))
        ? 'string'
        : 'numstr'
      : t === 'object'
        ? otype(x).toLowerCase()
        : t
  }
}





