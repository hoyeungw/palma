import { bound, hue } from '../utils/rgbHelper'
import { expandHex } from '../utils/expandHex'
import { round } from '../utils/round'

export class Rgb {
  /**
   * !dif: dif===0
   * @param {number} r - [0,255]
   * @param {number} g - [0,255]
   * @param {number} b - [0,255]
   * @returns {[number,number,number]} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])]
   */
  static toHsl ([r, g, b]) {
    r /= 255
    g /= 255
    b /= 255
    const { max, sum, dif } = bound([r, g, b])
    let
      h = hue(r, g, b, max, dif) * 60,
      s = !dif
        ? 0
        : sum > 1
          ? dif / (2 - sum)
          : dif / sum,
      l = sum / 2
    return [round(h), round(s * 1000) / 10, round(l * 1000) / 10]
  }

  /**
   *
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {string}
   */
  static toHex ([r, g, b]) {
    // [x, g, b] = [Math.round(x), Math.round(g), Math.round(b)]
    return '#' + (((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)).toString(16).toUpperCase().padStart(6, '0')
  }

  static fromHex (hex) {
    if (hex.charAt(0) === '#') hex = hex.substring(1)
    if (!hex[3]) hex = expandHex(hex)
    const n = parseInt(hex, 16)
    return [n >> 16 & 0xFF, n >> 8 & 0xFF, n & 0xFF]
  }
}
