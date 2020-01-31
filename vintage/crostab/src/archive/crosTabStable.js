import { CrosTab, Table } from '..'
import { toCell } from '../utils/toCell'
import { fusionAr, fusionOb, restoreCell, restoreFilters } from './helper'

/**
 *
 * @param {string|number} side
 * @param {string|number} banner
 * @param {Array<string|number>} fields
 * @return {Table}
 // * @return {{x:*, y:*, ag:*[]}[]}
 */
Table.prototype.samples = function (side, banner, fields) {
  const [x, y, fs] = [
    this.coin(side),
    this.coin(banner),
    fields.map(label => this.coin(label))
  ]
  const types = [this.types[x], this.types[y], fs.map(z => this.types[z])]
  const rows = this.matrix.map(row => ([row[x], row[y], fs.map(z => row[z])]))
  return new Table([side, banner, fields], rows, '', types)
}

/**
 *
 * @param {Table} table
 * @param {TableSpec} spec
 * @param {string} spec.side side
 * @param {string} spec.banner banner
 * @param {{field:string|number, crit:function(*):boolean}[]} spec.filter
 * @param {{field:string|number, stat:function([]):number}[]} spec.fields
 * @param {function({}):number} spec.calc - ({col1,col2,...})=>number
 * @returns {CrosTab}
 */
export const crosTabStable = (table, spec) => {
  const cellSet = restoreCell(spec.cell)
  const filterSet = restoreFilters(spec.filter)
  table = table.filter(filterSet, { mutate: false })
  /**
   * @type {string[]} fields
   */
  const fields = cellSet.map(({ field }) => field)
  const { matrix: samples } = table.samples(spec.side, spec.banner, fields)
  /**
   * A CrosTab of which each matrix element/cell is an object {field1:*[],field2:*[],...}
   * @type {CrosTab} crosTab
   */
  const crosTab = CrosTab.ini({
    side: [...new Set(samples.map(([x]) => x))],
    banner: [...new Set(samples.map(([, y]) => y))],
    func: (x, y) => toCell(fields),
    title: `${spec.side} * ${spec.banner} · ${fields}`
  })
  for (const [x, y, fs] of samples) {
    let cell = crosTab.queryCell(x, y)
    for (let [i, field] of fields.entries()) cell[field].push(fs[i])
  }
  const calc = spec.calc
  const measure = !!calc
    ? c => calc.apply(null, fusionAr(c, cellSet))
    : c => fusionOb(c, cellSet)
  return crosTab.map(measure)
}
