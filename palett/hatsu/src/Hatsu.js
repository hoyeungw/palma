import { Callable } from 'kalorie'
import { Rgb, Hsl } from 'farbe'
import { render } from './render'
import { ConsoleColors, Effects } from '../assets/codes'
import { rgbToLong } from './rgbToLong'
// import { decoLog, logger } from 'xbrief'

// let n = 0

export class Hatsu extends Callable {
  /** @property {{color:([*,*,*]), head:{}, tail:{}}} */ config

  constructor (rgb) {
    super(msg => render(msg, this.config))
    this.config = {
      color: rgb,
      head: {},
      tail: {}
    }
    return new Proxy(this, {
      /**
       *
       * @param target
       * @param p
       * @param receiver
       * @returns {Hatsu|function(string):string}
       */
      get (target, p, receiver) {
        if (p in target) return target[p]
        if (p.startsWith('ext')) return (p = p.slice(3).toLowerCase()) in Effects
          ? target.removeEffect(p)
          : (target.clear(), receiver)
        const { config } = target
        if (p in Effects && !(p in config)) return ([config.head[p], config.tail[p]] = Effects[p], receiver)
        if (p in ConsoleColors) return (config.color = p, receiver)
        return receiver
      }
    })
  }

  [Symbol.toPrimitive] (h) {
    const { config } = this
    switch (h) {
      case 'string':
      case 'default':
        return render(config.color, config)
      case 'number':
        return Array.isArray(config.color) ? rgbToLong(config.color) : Number.NaN
      default:
        throw new Error('ink Symbol.toPrimitive error')
    }
  }

  /**
   *
   * @param {number[]} arr
   * @returns {Hatsu|function}
   */
  static rgb (arr) {
    return new Hatsu(arr)
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

  rgb (rgb, text) {
    const { config } = this
    config.color = rgb
    return text ? render(text, config) : this
  }

  hex (hex, text) {
    const { config } = this
    config.color = Rgb.fromHex(hex)
    return text ? render(text, config) : this
  }

  removeEffect (effect) {
    const { config } = this
    delete config.head[effect]
    delete config.tail[effect]
    return this
  }

  clear () {
    const { config } = this
    config.head = {}
    config.tail = {}
    return this
  }
}




