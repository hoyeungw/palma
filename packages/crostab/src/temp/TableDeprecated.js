// import { Ar, clone, Mx, Ob, Samples } from 'veho'
// import { CrosTab } from '../crostab/CrosTab'
// import { ArrTyp } from '../misc/ArrTyp'
// import { _crosTabFut } from '../temp/_crosTabFut'
// import { Comparer, StatMx } from 'borel'
// import { totx } from 'xbrief'
// import { sortAlong } from '../misc/sortAlong'
// import { TabQ } from './TabQ'
// import { JoinT } from '../misc/JoinT'
//
// export class Table {
//   // banner
//   // matrix
//   // title
//   // types
//
//   /**
//    *
//    * @param {*[]} [banner]
//    * @param {*[][]} [matrix]
//    * @param {string} [title]
//    * @param {*[]} [types]
//    */
//   constructor (banner, matrix, title, types) {
//     this.banner = banner || []
//     this.matrix = matrix || [[]]
//     this.title = title || ''
//     this.types = types
//   }
//
//   get types () {
//     return this._types
//   }
//
//   set types (value) {
//     this._types = Ar.isEmpty(value) ? [] : value
//   }
//
//   /**
//    *
//    * @param {*[]} [banner]
//    * @param {*[][]} [matrix]
//    * @param {string} [title]
//    * @param {string[]} [types]
//    * @return {Table}
//    */
//   static from ({ banner, matrix, title, types }) {
//     return new Table(banner, matrix, title, types)
//   }
//
//   /**
//    *
//    * @param {...string|number|[*,*]} fields
//    * @returns {Object<*, *>[]}
//    */
//   toSamples (...fields) {
//     if (fields.length) {
//       const entries = fields.map(x =>
//         Array.isArray(x)
//           ? [[x[1]], this.coin(x[0])]
//           : [x, this.coin(x)]
//       )
//       return this.matrix.map(row => Ob.fromEntries(entries, i => row[i]))
//     }
//     return this.matrix.map(row => Ob.ini(this.banner, row))
//   }
//
//   toJson (mutate = true) {
//     const { banner, matrix, title } = this
//     return mutate ? { banner, matrix, title } : {
//       banner: banner.slice(),
//       matrix: matrix |> Mx.clone,
//       title: title.slice()
//     }
//   }
//
//   /**
//    *
//    * @param {{}[]} samples
//    * @param {?string} [title]
//    * @param {?*[]} [types]
//    * @param {*[]|[*,*][]} [fields]
//    * @return {Table}
//    */
//   static fromSamples (samples, title, types, { fields } = {}) {
//     const { head, rows } = Samples.toTable(samples, { fields })
//     return new Table(head, rows, title, types)
//   }
//
//   /**
//    * Return 'this' by loading a new matrix
//    * @param {*[][]} newMx
//    * @param {*[]} [newBanner]
//    * @param {string[]} [newTypes]
//    * @return {Table}
//    */
//   reboot (newMx, newBanner, newTypes) {
//     this.matrix = newMx
//     if (newBanner) this.banner = newBanner
//     if (newTypes) this.types = newTypes
//     return this
//   }
//
//   /**
//    *
//    * @param {*[][]} [newMx]
//    * @param {*[]} [newTypes]
//    * @return {Table}
//    */
//   clone (newMx, newTypes) {
//     return new Table(
//       this.banner.slice(),
//       newMx || (this.matrix |> Mx.clone),
//       this.title,
//       newTypes || this.types.slice()
//     )
//   }
//
//   coins (fields) {
//
//   }
//
//   /**
//    *
//    * @param {...string|number|[*,*]} fields
//    * @returns {Table}
//    */
//   select (...fields) {
//     const { length } = fields
//     if (length) {
//       const [banner, indexes] = [Array(length), Array(length)]
//       for (let i = 0, x; i < length; i++) {
//         x = fields[i];
//         [indexes[i], banner[i]] = Array.isArray(x)
//           ? [this.coin(x[0]), x[1]]
//           : [this.coin(x), x]
//       }
//       const matrix = Mx.select(this.matrix, ...indexes)
//       return Table.from({ banner, matrix })
//     }
//     return this.clone()
//   }
//
//   #fieldIndexes (fields) {
//     const hi = fields?.length
//     if (!hi) return { indexes: [], banner: [] }
//     const [indexes, banner] = [Array(hi), Array(hi)]
//     for (let i = 0, x; i < hi; i++) {
//       x = fields[i];
//       [indexes[i], banner[i]] = Array.isArray(x) ? [this.coin(x[0]), x[1]] : [this.coin(x), x]
//     }
//     return { indexes, banner }
//   }
//
//   /**
//    *
//    * @param {*[]|[*,*][]} fields
//    * @param {boolean=true} [mutate]
//    * @returns {Table}
//    */
//   select2 (fields, { mutate = true }) {
//     const hi = fields?.length
//     if (!hi) return mutate ? this : this.clone()
//     const { indexes, banner } = this.#fieldIndexes(fields)
//     const matrix = Mx.select(this.matrix, ...indexes)
//     if (mutate) {
//       return this.reboot(matrix, banner)
//     } else {
//       return Table.from({ matrix, banner, title: this.title })
//     }
//   }
//
//   spliceColumns (fields, { mutate = true } = {}) {
//     const ys = fields.map(c => this.coin(c))
//     let { matrix } = this
//     if (mutate) {
//       Mx.spliceCols(matrix, ys)
//       return this
//     } else {
//       matrix = Mx.copy(matrix)
//       Mx.spliceCols(matrix, ys)
//       return this.clone(matrix)
//     }
//   }
//
//   map (fn, { mutate = true } = {}) {
//     let { matrix } = this
//     matrix = Mx.map(matrix, fn)
//     if (mutate) {
//       return this.reboot(matrix)
//     }
//     return this.clone(matrix)
//   }
//
//   mapBanner (fn, { mutate = true } = {}) {
//     let { banner } = this
//     banner = banner.map(fn)
//     if (mutate) {
//       this.banner = banner
//       return this
//     }
//     return this.clone(banner)
//   }
//
//   /**
//    *
//    * @param {Table} another
//    * @param {string[]|number[]} indexFields
//    * @param {number} joinType - union:0,left:1,right:2,intersect:-1
//    * @param {*} [fillEmpty]
//    * @returns {Table}
//    */
//   join (another, indexFields, joinType = JoinT.intersect, fillEmpty = null) {
//     return TabQ.join(this, another, indexFields, joinType, fillEmpty)
//   }
//
//   get size () {
//     return Mx.size(this.matrix)
//   }
//
//   get ht () {
//     return !this.matrix ? 0 : this.matrix.length
//   }
//
//   get wd () {
//     return !this.banner ? 0 : this.banner.length
//   }
//
//   get columns () {
//     return Mx.transpose(this.matrix)
//   }
//
// // set types (value) {
// //
// // }
//
//   cell (x, y) {
//     return this.matrix[x][y]
//   }
//
//   /**
//    *
//    * @param {string|number} c
//    */
//   coin (c) {
//     return Number.isInteger(c) && 0 <= c && c < this.wd ? c : this.banner.indexOf(c)
//   }
//
//   column (c) {
//     const y = this.coin(c)
//     return this.matrix.map(row => row[y])
//   }
//
//   setColumn (c, newColumn) {
//     const y = this.coin(c)
//     for (let [i, row] of this.matrix.entries()) {
//       // (`newColumn[${i}]`.tag(newColumn[i]) + '\t' + `row[${y}]`.tag(row[y])).wL()
//       row[y] = newColumn[i]
//     }
//     return this
//   }
//
//   /**
//    *
//    * @param {string|number} c
//    * @param {function} ject
//    */
//   setColumnBy (c, ject) {
//     const y = this.coin(c)
//     for (let row of this.matrix) row[y] = ject(row[y])
//     return this
//   }
//
//   /**
//    * Push row into this and return this.
//    * No shallow nor deep copy of the matrix.
//    * @param {*[]} row
//    * @return {Table}
//    */
//   pushRow (row) {
//     this.matrix.push(row)
//     return this
//   }
//
//   /**
//    * Unshift row into this and return this.
//    * No shallow nor deep copy of the matrix.
//    * @param {*[]} row
//    * @return {Table}
//    */
//   unshiftRow (row) {
//     this.matrix.unshift(row)
//     return this
//   }
//
//   /**
//    * Push column into this and return this.
//    * No shallow nor deep copy of the matrix.
//    * @param {*} name
//    * @param {*[]} col
//    * @return {Table}
//    */
//   pushCol (name, col) {
//     this.banner.push(name)
//     this.matrix.forEach((row, i) => row.push(col[i]))
//     return this
//   }
//
//   /**
//    * Unshift column into this and return this.
//    * No shallow nor deep copy of the matrix.
//    * @param {*} name
//    * @param {*[]} col
//    * @return {Table}
//    */
//   unshiftCol (name, col) {
//     this.banner.unshift(name)
//     this.matrix.forEach((row, i) => row.unshift(col[i]))
//     return this
//   }
//
//   /**
//    *
//    * Specify the type of a column. No return
//    * @param {string|number} field accept both column name in string or column index in integer
//    * @param {string} typeName string | (number, float) | integer | boolean
//    */
//   changeType (field, typeName) {
//     const y = this.coin(field)
//     let column = Mx.column(this.matrix, y)
//     switch (typeName) {
//       case 'string':
//         column = column.map(totx)
//         break
//       case 'number':
//       case 'float':
//         column = column.map(Number.parseFloat)
//         break
//       case 'integer':
//         column = column.map(Number.parseInt)
//         break
//       case 'boolean':
//         column = column.map(Boolean)
//         break
//       default:
//         typeName = this._types[y]
//         break
//     }
//     this.setColumn(field, column)
//     this._types[y] = typeName
//     return this
//   }
//
//   /**
//    * Re-generate this._types based on DPTyp.inferArr method.
//    * Cautious: This method will change all elements of this._types.
//    * @return {string[]}
//    */
//   inferTypes () {
//     const { infer } = ArrTyp
//     this._types = this.columns.map(infer)
//     for (let [i, typ] of this._types.entries()) {
//       switch (typ) {
//         case ('numstr') :
//           this.changeType(i, 'number')
//           break
//         case ('misc'):
//           this.changeType(i, 'string')
//           break
//         default:
//         // `${idx}:${typ}`.tag('no need to change type').wL()
//       }
//     }
//     return this._types
//   }
//
//   /**
//    *
//    * @param {Object<string|number,function(*):boolean>} filters
//    * @param {boolean} mutate
//    * @return {Table}
//    */
//   filter2 (filters, { mutate = true }) {
//     let mx = this.matrix, y
//     for (const { field, crit } of filters) {
//       y = this.coin(field)
//       if (y >= 0) mx = mx.filter(row => crit(row[y]))
//     }
//     for (let [field, crit] of Object.entries(filters)) {
//       y = this.coin(field)
//       if (y >= 0) mx = mx.filter(row => crit(row[y]))
//     }
//     if (mutate) {
//       this.matrix = mx
//       return this
//     } else {
//       return this.clone(mx, true)
//     }
//   }
//
//   /**
//    *
//    * @param {...{field:string|number, crit:function(*):boolean}} filters
//    * @return {Table}
//    */
//   filter (...filters) {
//     let mx = this.matrix, y
//     for (const { field, crit } of filters) {
//       y = this.coin(field)
//       if (y >= 0) mx = mx.filter(row => crit(row[y]))
//     }
//     return this.clone(mx, true)
//   }
//
//   distinct (...fields) {
//     let mx = this.matrix
//     for (let field of fields) mx = StatMx.distinct(mx, this.coin(field))
//     return this.clone(mx)
//   }
//
//   /**
//    *
//    * @param {string|number} field
//    * @param {boolean} [count=false]
//    * @param {string|boolean} [sort=false] - When sort is function, sort must be a comparer between two point element.
//    * @returns {[any, any][]|[]|any[]|*}
//    */
//   distinctCol (field, { count = false, sort = false }) {
//     const y = this.coin(field)
//     return StatMx.distinctCol(this.matrix, y, { count, sort })
//   }
//
//   sort (field, comparer, { mutate = true }) {
//     const
//       y = this.coin(field),
//       comp = (a, b) => comparer(a[y], b[y]),
//       { banner, matrix, title } = this
//
//     return new Table(banner.slice(), matrix.slice().sort(comp), title)
//   }
//
//   /**
//    *
//    * @param {function(*,*):number} comparer - Comparer of banner elements
//    // * @param {function(*):boolean} filter
//    * @returns {Table|*}
//    */
//   sortLabel (comparer) {
//     let { banner, matrix, title } = this;
//     [banner, matrix] = sortAlong(banner, matrix |> Mx.transpose, comparer)
//     return new Table(banner, matrix|> Mx.transpose, title)
//   }
//
//   /**
//    *
//    * @param {TableSpec} spec
//    * @param {string} spec.side side
//    * @param {string} spec.banner banner
//    * @param {{field:string, crit:function(*):boolean}[]} spec.filter
//    * @param {{field:string, stat:function([]):number}[]} spec.cell
//    * @param {function({}):number} spec.calc - ({col1,col2,...})=>number
//    * @returns {CrosTab}
//    */
//   crosTab (spec) {
//     return _crosTabFut(this, spec)
//   }
// }
