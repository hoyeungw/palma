import iconv from 'iconv-lite'
import { tableToSamples } from '@analys/convert'
import { transpose as tr } from '@vect/matrix-transpose'
import { parseCsvReg } from '../parser/parseCsvReg'
import { parseCsvMap } from '../parser/parseCsvMap'
import { popBlank as rowsPopBlank } from '../../utils/popBlank'

export class NaiveCsv {
  /**
   *
   * @param {string|*} csvText
   * @param {string} [de=',']
   * @param {string} [lf='\x\n']
   * @param {string?} [qt]
   * @param {string?} [decode]
   * @param {boolean} [transpose]
   * @param {boolean} [popBlank]
   * @returns {*[][]}
   */
  static toRows (csvText, {
    de = ',',
    lf = '\r\n',
    qt = '\"',
    decode,
    transpose,
    popBlank
  } = {}) {
    if (decode) csvText = iconv.decode(csvText, decode)
    let mx = qt
      ? parseCsvReg(csvText, de, qt)
      : parseCsvMap(csvText, de, lf)
    if (transpose) mx = popBlank
      ? mx|> rowsPopBlank |> tr
      : mx|> tr
    return popBlank
      ? mx|> rowsPopBlank
      : mx
  }

  /**
   *
   * @param {string|*} csvText
   * @param {string} [de=',']
   * @param {string} [lf='\x\n']
   * @param {string?} [qt]
   * @param {string?} [decode]
   * @param {boolean} [transpose]
   * @param {boolean} [popBlank]
   * @param {string} [title]
   * @returns {{head, rows, title}}
   */
  static toTable (csvText, {
    de = ',', lf = '\r\n', qt,
    decode, transpose, popBlank, title
  } = {}) {
    const
      rows = NaiveCsv.toRows(csvText, { de, lf, qt, decode, transpose, popBlank }),
      head = rows.shift()
    return {
      head,
      rows,
      title
    }
  }

  /**
   *
   * @param {string|*} csvText
   * @param {string} [de=',']
   * @param {string} [lf='\x\n']
   * @param {string?} [qt]
   * @param {string?} [decode]
   * @param {boolean} [transpose]
   * @param {boolean} [popBlank]
   * @param {string} [title]
   * @returns {Object[]}
   */
  static toSamples (csvText, {
    de = ',', lf = '\r\n', qt,
    transpose, decode, popBlank
  } = {}) {
    const
      rows = NaiveCsv.toRows(csvText, { de, lf, qt, decode, transpose, popBlank }),
      head = rows.shift()
    return tableToSamples({ head, rows })
  }
}
