import { brace, bracket, Pal } from './utils/pal'
import { initial, isNumeric } from './utils/typeCheck'
import { lpad, rn, tb } from '../../utils/str'
import stringLength from 'string-length'
import { Visual } from 'hatsu-matrix'
import { Ar } from 'veho'

/**
 *
 * @param {*} obj
 * @param {number} [hi] - level of object to show
 * @param {number} [vu] - vertical under
 * @returns {string|number}
 */
export const deco = (obj, { hi, vu } = {}) => deNode(obj, 0, hi, vu)

const { str } = Pal

/**
 *
 * @param {*} node
 * @param {number} [l]
 * @param {number} hi
 * @param {number} vu
 * @return {string|number}
 */
export function deNode (node, l = 0, hi = undefined, vu = 0) {
  switch ((typeof node).slice(0, 3)) {
    case 'str':
      return isNumeric(node) ? node : `${str(node)}`
    case 'obj':
      return deOb(node, l, hi, vu)
    case 'num':
    case 'big':
      return node
    case 'fun':
      return deFn(node)
    case 'boo':
    case 'und':
    case 'sym':
      return `${Pal.udf(node)}`
  }
}

export const deOb = (node, lv = 0, hi = 8, vu = 1) => {
  let lf = rn + tb.repeat(lv)
  switch (initial(node)) {
    case 'Arr':
      return lv >= hi ? '[array]' : deAr(node, lv, lf, hi, vu) |> bracket
    case 'Obj' :
      return lv >= hi ? '{object}' : deEnts(Object.entries(node), lv, lf, hi, vu) |> brace
    case 'Map':
      return lv >= hi ? '(map)' : deEnts([...node.entries()], lv, lf, hi, vu)|> bracket
    // case 'Fun' :
    //   return deFn(node)
    case 'Set':
      return lv >= hi ? '(set)' : `set:[${deAr([...node], lv, lf, hi, vu)}]`
    default:
      return `${node}`
  }
}

export let deAr = (arr, lv, rn, hi, vu) => {
  let len = 0, wrap = false, word
  lv++
  const points = arr.map(node => {
    word = deNode(node, lv, hi, vu).toString()
    if (!wrap && (len += stringLength(word)) > 64) wrap = true
    return word
  }) |> Visual.vector
  return wrap
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(',')
}

export let deEnts = (entries, lv, rn, hi, vu) => {
  let
    pad = 0, sum = 0, wrap = lv < vu, n,
    ents = entries.map(([k, v]) => {
      k = `${k}`
      n = stringLength(k)
      if (!wrap && (sum += n) > 48) wrap = true
      if (n > pad) pad = n
      return [k, v]
    })
  wrap
    ? Ar.mutateMap(ents, ([k, v]) => [Pal.idx(lpad(k, pad, true)), deNode(v, lv + 1, hi, vu)])
    : Ar.mutateMap(ents, ([k, v]) => [k, deNode(v, lv + 1, hi, vu)])
  const points = Visual.column(ents, 1, { mutate: true }).map(([k, v]) => `${k}: ${v}`)
  return wrap
    ? `${rn}  ${points.join(`,${rn + tb}`)}${rn}`
    : points.join(', ')
}

export const deFn = (fn) => {
  fn = `${fn}`
  fn = fn.startsWith('function') ? fn.slice(9) : fn
  return fn |> Pal.fnc
}


