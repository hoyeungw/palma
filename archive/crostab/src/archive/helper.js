import { StatFuncs } from '../tableSpec/StatFuncs'
import { Stat }      from 'borel'

export const restoreCell = (cell) => {
  // const cellSet = Ar.clone(cell)
  const cellSet = Object.entries(cell).map(([field, stat]) => ({ field, stat }))
  if (cellSet.length) {
    for (let c of cellSet) {
      if (!c.stat) c.stat = Stat.sum
      if (typeof c.stat !== 'function') c.stat = StatFuncs[c] || Stat.sum
    }
    return cellSet
  } else {
    return [{ field: 0, stat: Stat.cnt }]
  }
}

export const restoreFilters = (filters) => {
  // const cellSet = Ar.clone(cell)
  return Object.entries(filters).map(([field, crit]) => ({ field, crit }))
}

/**
 *
 * @param {{field:[],stat:function(*[]):number}[]} cellIns
 * @param {{ field:string|number, stat:function(*[]):number }[]} cellDef
 */
export const fusionOb = (cellIns, cellDef) => {
  const o = {}
  for (let { field, stat } of cellDef) o[field] = cellIns[field] |> stat
  // Xr().tag(JSON.stringify(cellIns)).tag(JSON.stringify(cellDef)).tag(JSON.stringify(o)).tx |> console.log
  return o
}

/**
 *
 * @param {{field:[],stat:function(*[]):number}[]} cellIns
 * @param {{ field:string|number, stat:function(*[]):number }[]} cellDef
 */
export const fusionAr = (cellIns, cellDef) => {
  const o = []
  for (let { field, stat } of cellDef) o.push(cellIns[field] |> stat)
  return o
}

/**
 *
 * @param {{field:[],stat:function(*[]):number}[]} cellIns
 * @param {{ field:string|number, stat:function(*[]):number }[]} cellDef
 * @param {function(Object<string,number>):number} calc
 */
export const measure = (cellIns, cellDef, calc) => cellIns |> fusionOb(cellIns, cellDef) |> calc
