export const parseCsvIter = (tx, { de = ',', qt = '"' } = {}) => {
  let q = false, r = -1, c = -1, row = [] // q: true -> inside a quoted field
  const
    mx = [],
    ampCol = (row) => {
      if (!q) row[c] = row[c].trim()
      row[++c] = ''
    },
    ampRow = () => {
      mx[++r] = []
      row = mx[r]
      c = 0
      row[c] = ''
    }
  ampRow()
  for (let i = 0, ch, l = tx.length; i < l; i++) {
    ch = tx[i] // current char
    if (q) {
      if (ch === qt) {
        if (tx[i + 1] === qt) {
          i++
        } else {
          q = !q
          continue
        }
      }
    } else
      switch (ch) {
        case qt: // If it's just one 'quote', begin/end quoted field
          q = !q
          continue
        case de: // If it's a comma and we're not in a quoted field, move on to the next column
          ampCol(row)
          continue
        case '\r':
          if (tx[i + 1] === '\n') ++i // If it's a newline (CRLF) and we're not in a quoted field, skip the next char
          ampRow()
          continue // and move on to the next row and move to column 0 of that new row
        case '\n':
          ampRow()
          continue
      }
    row[c] += ch
  }

  return mx
}
