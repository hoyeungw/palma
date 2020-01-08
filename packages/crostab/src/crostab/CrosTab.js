import { clone, Mx, Ob, Samples } from 'veho'
import { sortAlong } from '../misc/sortAlong'

export class CrosTab {
  side
  banner
  matrix
  title

  /**
   *
   * @param {*[]} side
   * @param {*[]} banner
   * @param {*[][]} matrix
   * @param {string} [title]
   */
  constructor (side, banner, matrix, title) {
    this.side = side
    this.banner = banner
    this.matrix = matrix
    this.title = title || ''
  }

  /**
   * Shallow copy
   * @param {*[]} side
   * @param {*[]} banner
   * @param {*[][]} matrix
   * @param {string} [title]
   * @return {CrosTab}
   */
  static from ({ side, banner, matrix, title }) {
    return new CrosTab(side, banner, matrix, title)
  }

  /**
   * Shallow copy
   * @param {*[]} side
   * @param {*[]} banner
   * @param {function(number,number):*} func
   * @param {string} [title]
   * @return {CrosTab}
   */
  static ini ({ side, banner, func, title }) {
    const matrix = Mx.ini(side?.length, banner?.length, (x, y) => func(x, y))
    return CrosTab.from({ side, banner, matrix, title })
  }

  /**
   *
   * @param {*[]|boolean} [side]
   * @param {*[]|boolean} [banner]
   * @returns {*}
   */
  toSamples ({ side, banner }) {
    const [sideIsArr, bannerIsArr] = [
      Array.isArray(side) && side.length || side === true,
      Array.isArray(banner) && banner.length || banner === true
    ]
    if (sideIsArr) {
      if (bannerIsArr) {
        const entries = banner.map(x => [x, this.coin(x)])
        return (side.map(x => this.matrix[this.roin(x)]) |> Mx.transpose)
          .map(col => Ob.fromEntries(entries, (i) => col[i]))
      } else {
        const entries = side.map(x => [x, this.roin(x)])
        return (this.matrix |> Mx.transpose)
          .map(col => Ob.fromEntries(entries, (i) => col[i]))
      }
    } else {
      if (bannerIsArr) {
        const entries = banner.map(x => [x, this.coin(x)])
        return this.matrix.map(row => Ob.fromEntries(entries, i => row[i]))
      } else {
        return Samples.fromCrosTab(this)
      }
    }
  }

  get toJson () {
    return {
      side: this.side.slice(),
      banner: this.banner.slice(),
      matrix: this.matrix |> clone,
      title: this.title
    }
  }

  get columns () {
    return Mx.transpose(this.matrix)
  }

  /**
   *
   * @param {*[][]} [newMatrix]
   * @param {*[]} [newSide]
   * @param {*[]} [newBanner]
   * @returns {CrosTab}
   */
  reboot (newMatrix, newSide, newBanner) {
    if (newMatrix) this.matrix = newMatrix
    if (newSide) this.side = newSide
    if (newBanner) this.banner = newBanner
    return this
  }

  /**
   * Shallow copy
   * @param {*[][]} [newMatrix]
   * @param {*[]} [newSide]
   * @param {*[]} [newBanner]
   * @return {CrosTab}
   */
  clone (newMatrix, newSide, newBanner) {
    return new CrosTab(
      newSide || this.side.slice(),
      newBanner || this.banner.slice(),
      newMatrix || Mx.clone(this.matrix),
      this.title
    )
  }

  get size () {
    return Mx.size(this.matrix)
  }

  get ht () {
    return this.side?.length
  }

  get wd () {
    return this.banner?.length
  }

  cell (x, y) {
    return this.matrix[x][y]
  }

  queryCell (r, c) {
    const x = this.side.indexOf(r), y = this.banner.indexOf(c)
    return x < 0 || y < 0 ? null : this.matrix[x][y]
  }

  queryCoordinate (r, c) {
    return { x: this.side.indexOf(r), y: this.banner.indexOf(c) }
  }

  roin (r) {
    return Number.isInteger(r) && 0 <= r && r < this.ht ? r : this.side.indexOf(r)
  }

  coin (c) {
    return Number.isInteger(c) && 0 <= c && c < this.wd ? c : this.banner.indexOf(c)
  }

  row (r) {
    const x = this.roin(r)
    return this.matrix[x]
  }

  column (c) {
    const y = this.coin(c)
    return this.matrix.map(row => row[y])
  }

  setRow (r, newRow) {
    const x = this.roin(r)
    this.matrix[x] = newRow
    return this
  }

  setColumn (c, newColumn) {
    const y = this.coin(c)
    this.matrix.forEach((row, i) => {
      row[y] = newColumn[i]
    })
    return this
  }

  map (fn, { mutate = true } = {}) {
    const matrix = Mx.map(this.matrix, fn)
    return mutate
      ? this.reboot(matrix)
      : this.clone(matrix)
  }

  /**
   * Push row into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} field
   * @param {*[]} row
   * @return {CrosTab}
   */
  pushRow (field, row) {
    this.side.push(field)
    this.matrix.push(row)
    return this
  }

  /**
   * Unshift row into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} field
   * @param {*[]} row
   * @return {CrosTab}
   */
  unshiftRow (field, row) {
    this.side.unshift(field)
    this.matrix.unshift(row)
    return this
  }

  /**
   * Push column into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} field
   * @param {*[]} col
   * @return {CrosTab}
   */
  pushCol (field, col) {
    this.banner.push(field)
    this.matrix.forEach((row, i) => row.push(col[i]))
    return this
  }

  /**
   * Unshift column into this and return this.
   * No shallow nor deep copy of the matrix.
   * @param {*} field
   * @param {*[]} col
   * @return {CrosTab}
   */
  unshiftCol (field, col) {
    this.banner.unshift(field)
    this.matrix.forEach((row, i) => row.unshift(col[i]))
    return this
  }

  slice ({
    rows = { begin: undefined, end: undefined },
    cols = { begin: undefined, end: undefined },
  }, { mutate = true } = {}) {
    let { side, banner, matrix } = this
    let begin, end
    if (rows) {
      ({ begin, end } = rows)
      side = side.slice(begin, end)
      matrix = matrix.slice(begin, end)
    }
    if (cols) {
      ({ begin, end } = cols)
      banner = this.banner.slice(begin, end)
      matrix = matrix.map(row => row.slice(begin, end))
    }
    return mutate ? this.reboot(matrix, side, banner) : this.clone(matrix, side, banner)
  }

  sort (by = 'rows', field, comparer, { mutate = true } = {}) {
    let { side, banner, matrix } = this
    switch (by.charAt(0)) {
      case 'c':
        const x = this.roin(field);
        [banner, matrix] = sortAlong(banner, matrix |> Mx.transpose, comparer, x)
        matrix = matrix |> Mx.transpose
        break
      case 'r':
      default:
        const y = this.coin(field);
        [side, matrix] = sortAlong(side, matrix, comparer, y)
        break
    }
    return mutate ? this.reboot(matrix, side, banner) : this.clone(matrix, side, banner)
  }

  sortLabel (by = 'rows', comparer) {
    let { side, banner, matrix, title } = this
    switch (by.charAt(0)) {
      case 'c':
        side = side.slice();
        [banner, matrix] = sortAlong(banner, matrix |> Mx.transpose, comparer)
        matrix = matrix |> Mx.transpose
        break
      case 'r':
      default:
        banner = banner.slice();
        [side, matrix] = sortAlong(side, matrix, comparer)
        break
    }
    return new CrosTab(side, banner, matrix, title)
  }

  transpose (newTitle, { mutate = true } = {}) {
    const { banner: side, side: banner, columns: matrix } = this
    return mutate ? this.reboot(matrix, side, banner) : this.clone(matrix, side, banner)
  }
}
