import { Callable } from '../util/callable'
import { Rgb, Hsl } from 'farbe'
import { renderText } from './renderText'
import { HatsuProxyFab } from './HatsuProxyFab'

export class Hatsu extends Callable {
  constructor (rgb) {
    super(msg => renderText(msg, this))
    this.color = rgb
    this.head = {}
    this.tail = {}
  }

  /**
   *
   * @param {number[]} arr
   * @returns {Hatsu|function}
   */
  static rgb (arr) {
    // return new Hatsu(str)
    return HatsuProxyFab.build(new Hatsu(arr))
  }

  /**
   *
   * @param str
   * @returns {Hatsu|function}
   */
  static hex (str) {
    return Hatsu.rgb(Rgb.fromHex(str))
  }

  /**
   *
   * @param arr
   * @returns {Hatsu|function}
   */
  static hsl (arr) {
    return Hatsu.rgb(Hsl.toRgb(arr))
  }

  static ini (rgb, config) {
    return new Hatsu(rgb, config)
  }

  clear () {
    this.config = {}
    return this
  }
}




