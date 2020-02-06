import { RN, AEU } from '@spare/util'
import { Palett, Greys } from 'palett'
import { Mx } from 'veho'
import { isVisual } from '@spare/util'
import { destructPreX } from '@spare/preci'
import { padMx } from '@spare/preci'
import { readCrop } from '@spare/util'
import { maxLen } from '@spare/util'

class MatX {
  /**
   * direct: point-wise=0, row-wise=1, column-wise=2
   * @param {*[][]} matrix
   * @param {function(*):string} [abstract]
   * @param {string} [delimiter=',']
   * @param {{head:number,tail:number}} [rows]
   * @param {{head:number,tail:number}} [columns]
   * @param {{
   *          [on]:boolean,
   *          [mark]:{
   *            [max]:string|number[],
   *            [min]:string|number[],
   *            [na]:string|number[],
   *          },
   *          [direct]:number
   *         }} [visual]
   * @param ansi
   * @returns {string}
   */
  static xBrief (
    matrix,
    {
      abstract,
      delimiter = ', ',
      rows = { head: 0, tail: 0 },
      columns = { head: 0, tail: 0 },
      visual = {
        on: true,
        mark: {
          max: Palett.lightGreen.accent_3,
          min: Palett.orange.accent_2,
          na: Greys.blueGrey.lighten_3,
        },
        direct: 1
      },
      ansi = false
    } = {},
  ) {
    const [h, w] = Mx.size(matrix)
    if (!h || !w) return AEU
    ansi = (visual |> isVisual) ? true : ansi
    const { rawx, palx, wordx } = destructPreX(
      matrix,
      rows |> readCrop, columns |> readCrop,
      { abstract, visual, ansi },
      [h, w]),
      pads = Mx.columns(wordx, col => maxLen(col, ansi)),
      lines = padMx(wordx, rawx, palx, pads, ansi).map(line => `[${line}]`)
    return '[' + lines.join(`,${RN} `) + ']'
  }
}

export {
  MatX,
}
