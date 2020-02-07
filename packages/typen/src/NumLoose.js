import { otype } from '../utils/typen'
import { NUM, OBJ, STR } from './enums.brief'

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
    return t === STR
      ? check(+x) ? NUM : STR
      : t === OBJ ? otype(x).toLowerCase() : t
  }
}
