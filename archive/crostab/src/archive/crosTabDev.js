import { CrosTab }                                         from '../crostab/CrosTab'
import { Table }                                           from '../table/Table'
import { fusionAr, fusionOb, restoreCell, restoreFilters } from './helper'
import { Er }                                              from '../utils/Er'

const crAr = () => []
const accumLauncher = (ks, l) => {
  return () => {
    const o = {}
    for (let i = 0; i < l; i++) o[ks[i]] = []
    return o
  }
}

const pileAmp = ([x, y, v], [s, b, mx]) => {
  let i = s.indexOf(x), j = b.indexOf(y)
  if (i < 0) i += vertAmp(x, s, mx, crAr)
  if (j < 0) j += horiAmp(y, b, mx, crAr)
  mx[i][j].push(v)
}

const pileObAmp = ([x, y, fvs], [s, b, mx], crOb) => {
  let i = s.indexOf(x), j = b.indexOf(y)
  if (i < 0) i += vertAmp(x, s, mx, crOb)
  if (j < 0) j += horiAmp(y, b, mx, crOb)
  const ob = mx[i][j]
  for (let [f, v] of fvs) ob[f].push(v)
}

const horiAmp = (y, b, mx, crOb) => {
  for (let i = mx.length - 1; i >= 0; i--) mx[i].push(crOb())
  return b.push(y)
}

const vertAmp = (x, s, mx, crOb) => {
  mx.length ? mx.push(mx[0].map(() => crOb())) : mx.push([])
  return s.push(x)
}

const _sel = (row, [x, y, v]) => [row[x], row[y], row[v]]

const _selFs = (row, [x, y, vis]) => [row[x], row[y], vis.map(([f, k]) => [f, row[k]])]

const pivot = (rows, fields) => {
  const _ms = [[], [], []]
  for (let k = 0, { length } = rows; k < length; k++)
    pileAmp(_sel(rows[k], fields), _ms)
  return { side: _ms[0], banner: _ms[1], matrix: _ms[2] }
}

const pivotFields = (rows, fields) => {
  const
    crOb = accumLauncher(fields[2].map(([f]) => f), fields[2].length),
    _ms = [[], [], []]
  for (let k = 0, { length } = rows; k < length; k++)
    pileObAmp(_selFs(rows[k], fields), _ms, crOb)
  return { side: _ms[0], banner: _ms[1], matrix: _ms[2] }
}

Table.prototype.coordinate = function (side, banner, fields) {
  switch (typeof fields) {
    case 'string':
    case 'number':
      return [
        this.coin(side),
        this.coin(banner),
        this.coin(fields)
      ]
  }
  if (Array.isArray(fields)) {
    return [
      this.coin(side),
      this.coin(banner),
      fields.map(f => [f, this.coin(f)])
    ]
  }
  throw Er.r({ message: 'Input fields is neither \'string\' or \'array\'' })
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
export const crosTabDev = (table, spec) => {
  const cellSet = restoreCell(spec.cell)
  const filterSet = restoreFilters(spec.filter)
  table = table.filter(filterSet, { mutate: false })
  const [x, y, v] = table.coordinate(spec.side, spec.banner, cellSet.map(({ field }) => field))
  // ([x, y, v]) |> console.log
  const { side, banner, matrix } = pivotFields(table.matrix, [x, y, v])
  const calc = spec.calc
  const measure = !!calc
    ? c => calc.apply(null, fusionAr(c, cellSet))
    : c => fusionOb(c, cellSet)
  return CrosTab.from({ side, banner, matrix }).map(measure)
}
