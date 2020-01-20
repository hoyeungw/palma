import { rn, aeu, rpad, lpad } from '../../utils/str'
import { Preci } from '../../utils/Preci/Preci'
import { Palett, Greys } from 'palett'
import { Visual } from 'hatsu-matrix'
import { isVisual } from '../../utils/isVisual'
import { maxLen } from '../../utils/arr'

export const indexPad = (arr, base = 0) => ~~(Math.log10(arr.length + base)) + 1

class ArrX {

  /**
   *
   * @param {*[]} arr
   * @param {string} [delimiter]
   * @param {function(*):string} [abstract]
   * @param {number} [head]
   * @param {number} [tail]
   * @param {{[max]:string|number[],[min]:string|number[],[na]:string|number[]}} [Palett]
   * @return {string}
   */
  static hBrief (arr, {
      delimiter = ', ',
      abstract,
      head,
      tail,
      visual = {
        on: true,
        mark: {
          max: Palett.lightGreen.accent_3,
          min: Palett.orange.accent_2,
          na: Greys.blueGrey.lighten_3,
        }
      }
    } = {}
  ) {
    const preci = Preci.fromArr(arr, head, tail)
      .map(abstract)
      .stringify()
    let elements = preci.toList('...')
    if (visual.on !== false)
      elements = Visual.vector(elements, visual)
    return elements.length ? elements.join(delimiter) : aeu
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*):string} [abstract]
   * @param {number} [h]
   * @param {number} [t]
   * @param {{[max]:string|number[],[min]:string|number[],[na]:string|number[]}} [Palett]
   * @return {*}
   */
  static vBrief (arr, {
      showIndex = true,
      abstract,
      head: h,
      tail: t,
      visual = {
        on: true,
        mark: {
          max: Palett.lightGreen.accent_3,
          min: Palett.orange.accent_2,
          na: Greys.blueGrey.lighten_3,
        }
      }
    } = {}
  ) {
    if (!arr?.length) return aeu
    const visualOn = visual |> isVisual
    let
      preci = Preci.fromArr(arr, h, t),
      pals = visualOn
        ? Visual.vector(preci.toList('...'), { ...visual, retFn: true })
        : null,
      words = preci.stringify(abstract),
      pad = words |> indexPad,
      base = 1
    let list = showIndex
      ? words
        .map((x, i) => `[${String(i + base).padStart(pad)}] ${x}`)
        .toList('...')
      : words
        .toList('...')
    if (visualOn) list = list.map((x, i) => x |> pals[i])
    return list.length ? list.join(rn) : aeu
  }

  /**
   *
   * @param {string[]} arr
   * @param {?number[]|?number} [pads]
   * @param {?string} [fill]
   * @param {boolean=false} [ansi]
   * @return {string[]}
   */
  static padEnds (arr, { pads, fill, ansi = false } = {}) {
    switch (true) {
      case !pads:
        const pad = maxLen(arr, ansi)
        return arr.map(x => rpad(x, pad, ansi, fill))
      case typeof pads === 'number':
        return arr.map(x => rpad(x, pads, ansi, fill))
      case Array.isArray(pads):
        return arr.map((x, i) => rpad(x, pads[i], ansi, fill))
      default:
        return arr
    }
  }

  /**
   *
   * @param {string[]} arr
   * @param {?number[]|?number} [pads]
   * @param {?string} [fill]
   * @param {boolean=false} [ansi]
   * @return {string[]}
   */
  static padStarts (arr, { pads, fill, ansi = false } = {}) {
    switch (true) {
      case !pads:
        const pad = maxLen(arr, ansi)
        return arr.map(x => lpad(x, pad, ansi, fill))
      case typeof pads === 'number':
        return arr.map(x => lpad(x, pads, ansi, fill))
      case Array.isArray(pads):
        return arr.map((x, i) => lpad(x, pads[i], ansi, fill))
      default:
        return arr
    }
  }

  static maxLen (arr, ansi = false) {
    return maxLen(arr, ansi)
  }
}

export {
  ArrX
}
