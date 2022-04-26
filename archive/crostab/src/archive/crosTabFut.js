import { CrosTab }               from '../crostab/CrosTab'
import { Mx, Pivot, PivotModes } from 'veho'

const pivotMode = (stat) => {
  return typeof stat === 'string'
    ? (PivotModes[stat] || (stat === 'cnt' ? PivotModes.count : PivotModes.array))
    : PivotModes.array
}

Pivot.prototype.pivotStat = function ([x, y], [index, stat], { boot } = {}) {
  const mode = stat |> pivotMode
  let { side, banner, matrix } = this.pivot([x, y, index], { mode, boot })
  if (mode === PivotModes.array) matrix = Mx.map(matrix, stat)
  return { side, banner, matrix }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {{index:number,stat:string|function(*[]):number}[]}fields
 */
Pivot.prototype.pivotMatrices = function ([x, y], fields) {
  const hi = fields.length
  let { side, banner, matrix } = this.pivotStat([x, y], fields[0], { boot: true })
  const matrices = [matrix]
  for (let i = 1; i < hi; i++) {
    this.pivotStat([x, y], fields[i], { boot: false }).matrix
      |> matrices.push
  }
  return { side, banner, matrix: Mx.zip(matrices) }
}

/**
 *
 * @param {Table} table
 * @param {TableSpec} spec
 * @param {string} spec.side side
 * @param {string} spec.banner banner
 * @param {Object<string|number,function(*):boolean>} spec.filter
 * @param {string|string[]|Object<string|number,function(*[]):number>} spec.cell
 * @param {function():number} spec.calc - (field1,field2,...)=>number
 * @returns {CrosTab}
 */
export const crosTabFut = (table, spec) => {
  // spec |> console.log
  table = table.filter(spec.filter, { mutate: false })
  const
    pvt = new Pivot(table.matrix),
    coin = table.coin.bind(table),
    cellEntries = Object.entries(spec.cell),
    [x, y] = [spec.side |> coin, spec.banner |> coin]
  let side, banner, matrix
  switch (cellEntries.length) {
    case 0:
      ({ side, banner, matrix } = pvt.pivot([x, y], { mode: PivotModes.count }))
      break
    case 1:
      const [[field, stat]] = cellEntries;
      ({ side, banner, matrix } = pvt.pivotStat([x, y], [field |> coin, stat]))
      break
    default:
      ({ side, banner, matrix } = pvt.pivotMulti([x, y],
          cellEntries.map(([field, stat]) => [field |> coin, stat]))
      )
  }
  const { calc } = spec
  if (calc) {
    const fn = ar => calc.apply(null, ar)
    matrix = Mx.map(matrix, fn)
  }
  return CrosTab.from({ side, banner, matrix, spec: spec.title })
}
