import { CrosTab }                                         from '../crostab/CrosTab'
import { toCell }                                          from '../utils/toCell'
import { fusionAr, fusionOb, restoreCell, restoreFilters } from './helper'

const _getSideBanner = (rows, x, y) => {
  const
    { length } = rows,
    s = Array(length),
    b = Array(length)
  for (let i = 0, row; i < length; i++) {
    row = rows[i]
    s[i] = row[x]
    b[i] = row[y]
  }
  return [[...new Set(s)], [...new Set(b)]]
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
export const crosTabEdge = (table, spec) => {
  const cellSet = restoreCell(spec.cell)
  const filterSet = restoreFilters(spec.filter)
  table = table.filter(filterSet, { mutate: false })
  const
    fields = cellSet.map(({ field }) => field),
    { matrix } = table,
    { length } = matrix,
    [x, y, fs] = [
      table.coin(spec.side),
      table.coin(spec.banner),
      fields.map(field => [table.coin(field), field])
    ],
    [side, banner] = _getSideBanner(matrix, x, y);
  /**
   * A CrosTab of which each matrix element/cell is an object {field1:*[],field2:*[],...}
   * @type {CrosTab} crosTab
   */
  const crosTab = CrosTab.ini({
    side,
    banner,
    func: (x, y) => toCell(fields),
    title: spec.title
  })
  for (let i = 0, row, cell; i < length; i++) {
    row = matrix[i]
    cell = crosTab.queryCell(row[x], row[y])
    for (let [j, f] of fs) cell[f].push(row[j])
  }
  const calc = spec.calc
  const measure = !!calc
    ? c => calc.apply(null, fusionAr(c, cellSet))
    : c => fusionOb(c, cellSet)
  return crosTab.map(measure)
}
