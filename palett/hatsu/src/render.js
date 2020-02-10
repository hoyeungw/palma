import { ConsoleColors, ADD_FORE, CLR_FORE } from '../assets/codes'
import { br } from './br'

export const render = (tx, { color, head, tail } = {}) => {
  let h = Array.isArray(color)
    ? [ADD_FORE].concat(color.slice(0, 3))
    : [ConsoleColors[color] || ConsoleColors.white],
    t = [CLR_FORE], ve
  if (head && (ve = Object.values(head)) && ve.length) h = h.concat(ve)
  if (tail && (ve = Object.values(tail)) && ve.length) t = t.concat(ve)
  return br(h) + tx + br(t)
}
