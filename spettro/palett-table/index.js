import { Ar, Mx } from 'veho'
import { Greys, Palett } from 'palett'
import { Hatsu } from 'hatsu'
import { readify } from './src/helpers'
import { colorFormatter } from './src/colorFormatter'

const { hex } = Hatsu
const
  lightens = Ar.ini(5, (i) => `lighten_${i + 1}`),
  darkens = Ar.ini(4, (i) => `darken_${i + 1}`),
  accents = Ar.ini(4, (i) => `accent_${i + 1}`)

export class PalettTable {
  static palett (colorType = 'hex') {
    const side = [...accents.reverse(), ...lightens.reverse(), 'base', ...darkens,]
    const formatter = colorFormatter(colorType)
    return {
      side,
      banner: Object.entries(Palett)
        .map(([name, { base }]) => name |> readify |> hex(base)),
      matrix: Object.values(Palett)
        .map(tube =>
          side.map(el => tube[el] |> formatter |> hex(tube[el]).inverse) // HSL: (tube[el] |> hexToHsl)
        )
        |> Mx.transpose
    }
  }

  static greys (colorType = 'hex') {
    const side = [...lightens.reverse(), 'base', ...darkens,]
    const formatter = colorFormatter(colorType)
    return {
      side,
      banner: Object.entries(Greys)
        .map(([name, { base }]) => name |> readify |> hex(base)),
      matrix: Object.values(Greys)
        .map(tube =>
          side.map(el => tube[el] |> formatter |> hex(tube[el]).inverse)
        )
        |> Mx.transpose
    }
  }
}
