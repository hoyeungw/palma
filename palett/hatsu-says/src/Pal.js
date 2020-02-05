import { Callable } from 'kalorie'
import { render } from './helpers'

/**
 * @type {class|function}
 */
export class Pal extends Callable {
  /** @type {string} */ title = ''
  /** @type {number} */ indent = 0
  /** @type {*[]} */ keywords = []

  constructor (title, { indent = 0, keywords } = {}) {
    super(tx => render(tx, this))
    this.title = title
    this.indent = indent
    this.keywords = keywords
    // if (keywords?.tmr) {
    //   keywords.tmr += 1
    // }
  }

  /**
   *
   * @param title
   * @param indent
   * @param keywords
   * @returns {Pal|function}
   */
  static build (title, { indent = 0, keywords } = {}) {
    return new Pal(title, { indent, keywords })
  }

  get asc () {
    this.indent++
    return this
  }

  get desc () {
    this.indent--
    return this
  }
}
