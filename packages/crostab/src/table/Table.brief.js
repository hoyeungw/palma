import { Table } from './Table'
import { TableX as TX } from 'xbrief'
import { greys, palette } from 'spettro'

class TabX {

  /**
   *
   * @param {Table|{banner:*[],matrix:*[][],[title]:string,[types]:*[]}} table
   * @param {?function(*):string} [abstract]
   * @param {{[head]:?number,[tail]:?number}} [rows]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [head]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @param {boolean} [chinese=false]
   * @param {boolean} [ansi=false]
   * @return {string}
   */
  static brief (table, {
    abstract = null,
    head = {
      abstract: null,
      head: 0,
      tail: 0
    },
    rows = {
      head: 0,
      tail: 0
    },
    visual = {
      on: true,
      mark: {
        max: palette.lightGreen.accent_3,
        min: palette.orange.accent_2,
        na: greys.blueGrey.lighten_3,
      },
      direct: 2
    },
    chinese = false,
    ansi = false
  } = {}) {
    return (table.title ? `[${table.title}]\r\n` : '')
      + TX.brief(table, { abstract, head, rows, visual, chinese, ansi })
  }
}

/**
 *
 * @param {?function(*):string} [abstract]
 * @param {{[head]:?number,[tail]:?number}} [rows]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [head]
 * @param {{
 *          [on]:boolean,
 *          [mark]:{
 *            [max]:string|number[],
 *            [min]:string|number[],
 *            [na]:string|number[],
 *          },
 *          [direct]:number
 *         }} [visual]
 * @param {boolean} [chinese=false]
 * @param {boolean} [ansi=false]
 * @return {string}
 */
Table.prototype.brief = function ({
    abstract = null,
    head = {
      head: 0,
      tail: 0
    },
    rows = {
      abstract: null,
      head: 0,
      tail: 0
    },
    visual = {
      on: true,
      mark: {
        max: palette.lightGreen.accent_3,
        min: palette.orange.accent_2,
        na: greys.blueGrey.lighten_3,
      },
      direct: 2
    },
    chinese = false,
    ansi = false
  } = {}
) {
  return TX.brief(this, { abstract, head, rows, visual, chinese, ansi })
}

export {
  TabX
}

