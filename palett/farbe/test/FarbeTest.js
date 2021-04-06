import { normal } from './resources/nord'
import { TableX } from 'xbrief'
import { Samples } from 'veho'
import { Hatsu } from 'hatsu'
import { Rgb, Hsl } from '..'

export class FarbeTest {
  static cycleTransform () {
    'Testing hex -> rgb -> hsl -> rgb -> hex' |> console.log
    const samples = Object.entries(normal).map(([name, hex]) => {
      const rgb = hex |> Rgb.fromHex
      const hsl = rgb |> Rgb.toHsl
      const rgb2 = hsl |> Hsl.toRgb
      const hex2 = rgb2 |> Rgb.toHex
      return {
        name: name |> Hatsu.hex(hex),
        hex: hex |> Hatsu.hex(hex).inverse,
        rgb: rgb,
        hsl: hsl,
        rgb2: rgb2,
        hex2: rgb2 |> Rgb.toHex |> Hatsu.hex(hex2).inverse
      }
    })
    samples |> Samples.toTable |> TableX.brief |> console.log
  }
}

FarbeTest.cycleTransform()

