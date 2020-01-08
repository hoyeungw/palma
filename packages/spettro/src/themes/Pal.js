import { greys, palette, shades } from './palette'
import { marks } from '../visual/assets/visual.config'
import { Ob } from 'veho'

let bases = undefined

const basesLcher = () => {
  bases = Object.entries(palette).map(([name, { base }]) => [name, base]) |> Ob.fromEntries
  return bases
}

export class Pal {
  static greys = greys
  static shades = shades
  static bases = bases || basesLcher()
  static marks = marks
  static dyes = palette
}
