import { Callable } from 'kalorie'

const TAB = ' '.repeat(2)
const renderText = (message, { title, indent, keywords }) =>
  `${TAB.repeat(indent)}[${title}] ${message}` |> console.log

/**
 * @type {class|function}
 */
export class Pal extends Callable {
  constructor (title, { indent = 0, keywords } = {}) {
    super(tx => renderText(tx, this))
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
   * @returns {Pal|function}
   */
  static build (title, indent) {
    return new Pal(title, indent)
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
