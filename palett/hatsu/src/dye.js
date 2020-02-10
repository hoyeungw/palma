import { ADD_FORE, CLR_FORE, ConsoleColors, Effects } from '../assets/codes'
import { Rgb } from 'farbe'
import { br } from './br'

export const dye = function (tx) {
  let { color, effect } = this
  let h = [ADD_FORE], t = [CLR_FORE]
  h = h.concat(Array.isArray(color) ? color.slice(0, 3) : Rgb.fromHex(color))
  if (typeof effect === 'string') effect = (effect.includes(',')) ? effect.split(',') : [effect]
  if (Array.isArray(effect)) {
    let eh, et
    for (let e of effect) if (e in Effects) {
      [eh, et] = Effects[e]
      h.push(eh)
      t.push(et)
    }
  }
  return br(h) + tx + br(t)
}
