import { CR, LF } from '@spare/util'

export const parseCsvIter = (tx, de = ',', qt = '"') => {
  let q = false, x = 0, y = 0, row = [] // q: true -> inside a quoted field
  const
    mx = [],
    amprow = () => { mx[x++] = row = [''], y = 0 },
    ampcol = (row) => {
      if (!q) row[y] = row[y].trim()
      row[++y] = ''
    }
  amprow()
  for (let i = 0, c, l = tx.length; i < l; i++) {
    c = tx[i] // current char
    if (q) {
      if (c === qt) {
        if (tx[i + 1] === qt) {
          i++
        }
        else {
          q = !q
          continue
        }
      }
    }
    else
      switch (c) {
        case qt: // If it's just one 'quote', begin/end quoted field
          q = !q
          continue
        case de: // If it's a comma and we're not in a quoted field, move on to the next column
          ampcol(row)
          continue
        case LF:
          amprow()
          continue
        case CR:
          if (tx[i + 1] === LF) ++i // If it's a newline (CRLF) and we're not in a quoted field, skip the next char
          amprow()
          continue // and move on to the next row and move to column 0 of that new row
      }
    row[y] += c
  }

  return mx
}
