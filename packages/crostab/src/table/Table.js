import { Ar, Mx, Ob, Samples } from 'veho'
import { Comparer, StatMx } from 'borel'
import { totx } from 'xbrief'
import { CrosTab } from '../crostab/CrosTab'
import { ArrTyp } from '../utils/ArrTyp'
import { sortAlong } from '../utils/sortAlong'
import { joiner } from '../utils/MxJoin/MxJoin'
import { JoinT } from '../utils/MxJoin/JoinT'
import { crosTabFut } from '../archive/crosTabFut'

export class Table {
  /**
   *
   * @param {*[]} [banner]
   * @param {*[][]} [matrix]
   * @param {string} [title]
   * @param {*[]} [types]
   */
  constructor (banner, matrix, title, types) {
    this.banner = banner || []
    this.matrix = matrix || [[]]
    this.title = title || ''
    this.types = types
  }

  /**
   *
   * @returns {[]|Array}
   */
  get types () {
    return this._types
  }

  /**
   *
   * @param {Array} [value]
   */
  set types (value) {
    this._types = Ar.isEmpty(value) ? [] : value
  }

  /**
   *
   * @param {*[]} [banner]
   * @param {*[][]} [matrix]
   * @param {string} [title]
   * @param {string[]} [types]
   * @return {Table}
   */
  static from ({ banner, matrix, title, types }) {
    return new Table(banner, matrix, title, types)
  }

  /**
   *
   * @param {string|number|[*,*]} fields
   * @returns {Object<*, *>[]}
   */
  toSamples (fields) {
    if (fields?.length) {
      const entries = fields.map(x =>
        Array.isArray(x)
          ? [[x[1]], this.coin(x[0])]
          : [x, this.coin(x)]
      )
      return this.matrix.map(row => Ob.fromEntries(entries, i => row[i]))
    }
    return this.matrix.map(row => Ob.ini(this.banner, row))
  }

  /**
   *
   * @param {boolean} [mutate=true]
   * @returns {*}
   */
  toJson (mutate = true) {
    const { banner, matrix, title } = this
    return mutate ? { banner, matrix, title } : {
      banner: banner.slice(),
      matrix: matrix |> Mx.clone,
      title: title.slice()
    }
  }

  /**
   *
   * @param {{}[]} samples
   * @param {*[]|[*,*][]} [fields]
   * @param {string} [title]
   * @param {*[]} [types]
   * @return {Table}
   */
  static fromSamples (samples, { fields, title, types } = {}) {
    const { head, rows } = Samples.toTable(samples, { fields })
    return new Table(head, rows, title, types)
  }

  /**
   * Return 'this' by loading a new matrix
   * @param {*[][]} newMx
   * @param {*[]} [newBanner]
   * @param {string[]} [newTypes]
   * @return {Table}
   */
  reboot (newMx, newBanner, newTypes) {
    this.matrix = newMx
    if (newBanner) this.banner = newBanner
    if (newTypes) this.types = newTypes
    return this
  }

  /**
   *
   * @param {*[][]} [newMx]
   * @param {*[]} [newBanner]
   * @param {*[]} [newTypes]
   * @return {Table}
   */
  clone (newMx, newBanner, newTypes) {
    return new Table(
      newBanner || this.banner.slice(),
      newMx || (this.matrix |> Mx.clone),
      this.title,
      newTypes || this.types.slice()
    )
  }

  /**
   *
   * @param {*[]|[*,*][]} fields
   * @returns {{indexes: [], banner: []}|{indexes: *, banner: *}}
   */
  #fieldIndexes (fields) {
    const hi = fields?.length
    if (!hi) return { indexes: [], banner: [] }
    const [indexes, banner] = [Array(hi), Array(hi)]
    for (let i = 0, x; i < hi; i++) {
      x = fields[i];
      [indexes[i], banner[i]] = Array.isArray(x) ? [this.coin(x[0]), x[1]] : [this.coin(x), x]
    }
    return { indexes, banner }
  }

  /**
   *
   * @param {*[]|[*,*][]} fields
   * @param {boolean=true} [mutate]
   * @returns {Table}
   */
  select (fields, { mutate = true } = {}) {
    const hi = fields?.length
    if (!hi) return mutate ? this : this.clone()
    const { indexes, banner } = this.#fieldIndexes(fields)
    const matrix = Mx.select(this.matrix, indexes)
    return mutate
      ? this.reboot(matrix, banner)
      : this.clone(matrix, banner)
  }

  /**
   *
   * @param {*[]|[*,*][]} fields
   * @param {boolean=true} [mutate]
   * @returns {Table}
   */
  spliceColumns (fields, { mutate = true } = {}) {
    const
      ys = fields.map(c => this.coin(c)).sort(Comparer.numberAscending),
      { matrix, banner } = this
    return mutate
      ? this.reboot(Mx.spliceCols(matrix, ys), Ar.splices(banner, ys))
      : this.clone(Mx.spliceCols(matrix |> Mx.copy, ys), Ar.splices(banner.slice(), ys))
  }

  map (fn, { mutate = true } = {}) {
    let { matrix } = this
    matrix = Mx.map(matrix, fn)
    return mutate
      ? this.reboot(matrix)
      : this.clone(matrix)
  }

  mapBanner (fn, { mutate = true } = {}) {
    let { banner, matrix } = this
    banner = banner.map(fn)
    return mutate
      ? this.reboot(matrix, banner)
      : this.clone(matrix, banner)
  }

  /**
   *
   * @param {Table} another
   * @param {string[]|number[]} indexFields
   * @param {number} joinType - union:0,left:1,right:2,intersect:-1
   * @param {*} [fillEmpty]
   * @returns {Table}
   */
  join (another, indexFields, joinType = JoinT.intersect, fillEmpty = null) {
    return TableJoin.join(this, another, indexFields, joinType, fillEmpty)
  }

  get size () {
    return Mx.size(this.matrix)
  }

  get ht () {
    return this.matrix?.length
  }

  get wd () {
    return this.banner?.length
  }

  get columns () {
    return Mx.transpose(this.matrix)
  }

// set types (value) {
//
// }

  cell (x, y) {
    return this.matrix[x][y]
  }

  /**
   *
   * @param {string|number} c
   */
  coin (c) {
    return Number.isInteger(c) && 0 <= c && c < this.wd ? c : this.banner.indexOf(c)
  }

  column (c) {
    const y = this.coin(c)
    return this.matrix.map(row => row[y])
  }

  setColumn (c, newColumn) {
    const y = this.coin(c), { ht, matrix } = this
    for (let i = 0; i < ht; i++) matrix[i][y] = newColumn[i]
    return this
  }

  /**
   *
   * @param {string|number} c
   * @param {function} ject
   */
  setColumnBy (c, ject) {
    const y = this.coin(c)
    for (let row of this.matrix) row[y] = ject(row[y])
    return this
  }

  /**
   * Push row into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*[]} row
   * @return {Table}
   */
  pushRow (row) {
    this.matrix.push(row)
    return this
  }

  /**
   * Unshift row into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*[]} row
   * @return {Table}
   */
  unshiftRow (row) {
    this.matrix.unshift(row)
    return this
  }

  /**
   * Push column into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} name
   * @param {*[]} col
   * @return {Table}
   */
  pushCol (name, col) {
    this.banner.push(name)
    this.matrix.forEach((row, i) => row.push(col[i]))
    return this
  }

  /**
   * Unshift column into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} name
   * @param {*[]} col
   * @return {Table}
   */
  unshiftCol (name, col) {
    this.banner.unshift(name)
    this.matrix.forEach((row, i) => row.unshift(col[i]))
    return this
  }

  /**
   *
   * Specify the type of a column. No return
   * @param {string|number} field accept both column name in string or column index in integer
   * @param {string} typeName string | (number, float) | integer | boolean
   */
  changeType (field, typeName) {
    const y = this.coin(field)
    let column = Mx.column(this.matrix, y)
    switch (typeName) {
      case 'string':
        column = column.map(totx)
        break
      case 'number':
      case 'float':
        column = column.map(Number.parseFloat)
        break
      case 'integer':
        column = column.map(Number.parseInt)
        break
      case 'boolean':
        column = column.map(Boolean)
        break
      default:
        typeName = this._types[y]
        break
    }
    this.setColumn(field, column)
    this._types[y] = typeName
    return this
  }

  /**
   * Re-generate this._types based on DPTyp.inferArr method.
   * Cautious: This method will change all elements of this._types.
   * @return {string[]}
   */
  inferTypes () {
    const { infer } = ArrTyp
    this.types = this.columns.map(infer)
    for (let [i, typ] of this.types.entries()) {
      switch (typ) {
        case ('numstr') :
          this.changeType(i, 'number')
          break
        case ('misc'):
          this.changeType(i, 'string')
          break
        default:
      }
    }
    return this.types
  }

  /**
   *
   * @param {Object<string|number,function(*):boolean>} filters
   * @param {boolean} [mutate=true]
   * @return {Table}
   */
  filter (filters, { mutate = true } = {}) {
    let mx = this.matrix, y
    for (let [field, crit] of Object.entries(filters)) {
      y = this.coin(field)
      if (y >= 0) mx = mx.filter(row => crit(row[y]))
    }
    return mutate ? this.reboot(mx) : this.clone(mx)
  }

  distinct (fields, { mutate = true } = {}) {
    let mx = this.matrix
    for (let field of fields) mx = StatMx.distinct(mx, this.coin(field))
    return mutate ? this.reboot(mx) : this.clone(mx)
  }

  /**
   *
   * @param {string|number} field
   * @param {boolean} [count=false]
   * @param {string|boolean} [sort=false] - When sort is function, sort must be a comparer between two point element.
   * @returns {[any, any][]|[]|any[]|*}
   */
  distinctCol (field, { count = false, sort = false } = {}) {
    const y = this.coin(field)
    return StatMx.distinctCol(this.matrix, y, { count, sort })
  }

  sort (field, comparer, { mutate = true } = {}) {
    const
      y = this.coin(field),
      comp = (a, b) => comparer(a[y], b[y]),
      mx = this.matrix.slice().sort(comp)
    return mutate ? this.reboot(mx) : this.clone(mx)
  }

  /**
   *
   * @param {function(*,*):number} comparer - Comparer of banner elements
   * @param {boolean} mutate
   * @returns {Table|*}
   */
  sortLabel (comparer, { mutate = true } = {}) {
    let { banner, columns } = this;
    [banner, columns] = sortAlong(banner, columns, comparer)
    return mutate
      ? this.reboot(columns|> Mx.transpose, banner)
      : this.clone(columns|> Mx.transpose, banner)
  }

  /**
   *
   * @param {TableSpec} spec
   * @param {string} spec.side side
   * @param {string} spec.banner banner
   * @param {{field:string, crit:function(*):boolean}[]} spec.filter
   * @param {{field:string, stat:function([]):number}[]} spec.cell
   * @param {function({}):number} spec.calc - ({col1,col2,...})=>number
   * @returns {CrosTab}
   */
  crosTab (spec) {
    return crosTabFut(this, spec)
  }

  /**
   *
   * @param {TableSpec} spec
   * @param {string} spec.side side
   * @param {string} spec.banner banner
   * @param {{field:string, crit:function(*):boolean}[]} spec.filter
   * @param {{field:string, stat:function([]):number}[]} spec.cell
   * @param {function({}):number} spec.calc - ({col1,col2,...})=>number
   * @returns {CrosTab}
   */
  figure (spec) {
    return crosTabFut(this, spec)
  }
}

export class TableJoin {
  /**
   *
   * @param {Table} table
   * @param {Table} another
   * @param {string[]|number[]} indexFields
   * @param {number} [joinType=-1] - union:0,left:1,right:2,intersect:-1
   * @param {*} [fillEmpty]
   * @returns {Table}
   */
  static join (table, another, indexFields, joinType = JoinT.intersect, fillEmpty = null) {
    const
      ysL = indexFields.map(x => table.coin(x)),
      ysR = indexFields.map(x => another.coin(x)),
      joinFn = joiner(joinType),
      matrix = joinFn({ mx: table.matrix, ys: ysL }, { mx: another.matrix, ys: ysR }, fillEmpty),
      banner = Ar.select(table.banner, ysL).concat(
        Ar.splices(table.banner.slice(), ysL.slice().sort(Comparer.numberAscending)),
        Ar.splices(another.banner.slice(), ysL.slice().sort(Comparer.numberAscending))
      )
    return new Table(banner, matrix, `${table.title} ${another.title}`)
  }
}
