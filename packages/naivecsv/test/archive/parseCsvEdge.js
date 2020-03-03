import { CR, LF } from '@spare/util'

function amprow (currRow) {
  ampcol.call(this, currRow)
  this.y = 0
  let row = ['']
  return this.m[this.x++] = row, row
}

function ampcol (row) {
  // xr().x(this.x).y(this.y).word(this.w) |> logger
  let { w } = this
  if (!this.q) w = w.trim()
  row[this.y++] = w
  this.w = ''
}

// q: true -> inside a quoted field
export const Coordinate = () => ({ q: false, x: 0, y: 0, m: [], w: '' })

export function parseCsvEdge (csv, { de = ',', qt = '"' } = {}) {
  let row = amprow.call(this, [])
  for (let i = 0, c, l = csv.length; i < l; i++) {
    c = csv[i]
    if (this.q) {
      if (c === qt) { csv[i + 1] === qt ? (i++, this.w += c) : this.q = !this.q }
      else { this.w += c }
    }
    else if (c === qt) { this.q = !this.q }
    else if (c === de) { ampcol.call(this, row) }
    else if (c === LF) { row = amprow.call(this, row) }
    else if (c === CR) {
      if (csv[i + 1] === LF) ++i
      row = amprow.call(this, row)
    }
    else { this.w += c }
  }
  return this.m
}
