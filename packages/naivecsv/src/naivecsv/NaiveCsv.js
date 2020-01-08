import { Mx } from 'veho'
import { Table } from 'crostab'
import iconv from 'iconv-lite'
import { parseCsv } from '../parser/parseCsv'
import { parseCsvEdge } from '../parser/parseCsvEdge'
import { popBlank as rowsPopBlank } from '../utils/popBlank'

export class NaiveCsv {
  static toRows (csvText, {
    de = ',',
    lf = '\r\n',
    qt = '\"',
    transpose,
    decode,
    popBlank = false
  } = {}) {
    if (decode) csvText = iconv.decode(csvText, decode)
    let mx = qt
      ? parseCsv(csvText, { de, qt })
      : parseCsvEdge(csvText, { de, lf })
    if (transpose) mx = popBlank
      ? mx|> rowsPopBlank|> Mx.transpose
      : mx|> Mx.transpose
    return popBlank
      ? mx|> rowsPopBlank
      : mx
  }

  static toTable (csvText, { de = ',', lf = '\r\n', qt, transpose, decode = false, popBlank, title } = {}) {
    const rows = NaiveCsv.toRows(csvText, { de, lf, qt, decode, transpose, popBlank }), head = rows.shift()
    return new Table(head, rows, title ? title : '')
  }
}
