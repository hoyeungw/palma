import { Callable } from 'kalorie'
import { Rgb, Hsl } from 'farbe'
import { render } from './render'
import { ProxyFactory } from './ProxyFactory'

export class Hatsu extends Callable {
  constructor (rgb) {
    super(msg => render(msg, this))
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
    // return new ink(str)
    return ProxyFactory.build(new Hatsu(arr))
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




