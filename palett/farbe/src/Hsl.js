import { hf } from '../utils/hslHelper'
import { round } from '../utils/round'

export class Hsl {
  /**
   *
   * @param {number} h
   * @param {number} s
   * @param {number} l
   * @returns {number[]}
   */
  static toRgb ([h, s, l]) {
    s /= 100
    l /= 100
    const
      a = s * Math.min(l, 1 - l),
      r = hf(0, h, a, l),
      g = hf(8, h, a, l),
      b = hf(4, h, a, l)
    return [round(r * 0xFF), round(g * 0xFF), round(b * 0xFF)]
    // return [x * 0xFF & 0xFF, g * 0xFF & 0xFF, b * 0xFF & 0xFF]
  }
}
