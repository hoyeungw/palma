import { ConsoleColors, ESC, ADD_FORE, CLR_FORE } from '../assets/codes'

const br = config => `${ESC}[${config.join(';')}m`

export const renderText = (tx, { color, head, tail } = {}) => {
  let h = Array.isArray(color)
    ? [ADD_FORE].concat(color.slice(0, 3))
    : [ConsoleColors[color] || ConsoleColors.white],
    t = [CLR_FORE], els
  if (head && (els = Object.values(head)) && els.length) h = h.concat(els)
  if (tail && (els = Object.values(tail)) && els.length) t = t.concat(els)
  return br(h) + tx + br(t)
}
