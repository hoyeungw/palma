import { Er } from '../misc/Er'
import { Ob } from 'veho'
import { Typ } from 'typen'

/**
 *
 * @param {string|string[]|Object<string|number,function(*[]):number>} cell
 * @private
 */
const createCell = (cell) => {
  if (!cell) return {}
  switch (Typ.infer(cell)) {
    case 'string':
      return Ob.of([cell, 'sum'])
    case 'object':
      return Ob.mapValues(cell, x => x || 'sum')
    case 'array':
      return cell.length
        ? cell.map(el => typeof el === 'string'
          ? Ob.of([el, 'sum'])
          : Ob.of([el.field || '', el.stat || 'sum']))
        : {}
    default:
      throw Er.r({ message: 'Input is neither string nor array' })
  }
}

/***
 *
 * @property {string} side - side, a string
 * @property {string} banner - banner, a string
 * @property {Object<string|number,function(*):boolean>} [filter] - filter definition
 * @property {Object<string|number,function(*[]):number>} [cell] - cell definition
 * @property {function():number} [calc] - calc definition: function<field1,field2,...,number>
 */
class TableSpec {
  constructor (side, banner, cell, filter, calc) {
    if (typeof side !== 'string') throw Er.r({ message: 'Side is not string' })
    if (typeof banner !== 'string') throw Er.r({ message: 'Banner is not string' })
    this.side = side
    this.banner = banner
    this.cell = cell |> createCell
    this.filter = filter || {}
    this.calc = calc
  }

  static from ({
    side,
    banner,
    cell,
    filter,
    calc
  }) {
    return new TableSpec(side, banner, cell, filter, calc)
  }

  get title () {
    return `${this.side} * ${this.banner} · ${this.fields}`
  }

  get fields () {
    return Object.keys(this.cell)
  }

  get filterFields () {
    return Object.keys(this.filter)
  }

  get toJson () {
    const { side, banner, cell, filter, calc } = this
    return { side, banner, cell, filter, calc }
  }
}

export {
  TableSpec
}
