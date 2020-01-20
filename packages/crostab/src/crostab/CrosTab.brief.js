import { CrosTabX } from 'xbrief'
import { CrosTab } from './CrosTab'
import { Greys, Palett } from 'palett'

class CrosX {
  /**
   *
   * @param {CrosTab|{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
   * @param {function(*):string} [abstract]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
   * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
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
  static brief (crosTab, {
    abstract,
    side = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    banner = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    visual = {
      on: true,
      mark: {
        max: Greys.grey.lighten_5,
        min: Greys.grey.darken_1,
        na: Palett.indigo.lighten_2,
      },
      direct: 2
    },
    chinese = false,
    ansi = false
  } = {}) {
    return CrosTabX.brief(crosTab, { abstract, side, banner, visual, chinese, ansi })
  }
}

/**
 *
 * @param {CrosTab|{side:*[],banner:*[],matrix:*[][],[title]:string}} crosTab
 * @param {function(*):string} [abstract]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [side]
 * @param {{[abstract]:?function(*):string,[head]:?number,[tail]:?number}} [banner]
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
CrosTab.prototype.brief = function ({
    abstract = undefined,
    side = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    banner = {
      abstract: undefined,
      head: 0,
      tail: 0
    },
    visual = {
      on: true,
      mark: {
        max: Greys.grey.lighten_5,
        min: Greys.grey.darken_1,
        na: Palett.indigo.lighten_2,
      },
      direct: 2
    },
    chinese = false,
    ansi = false
  } = {}
) {
  return CrosTabX.brief(this, { abstract, side, banner, visual, chinese, ansi })
}

export {
  CrosX
}
