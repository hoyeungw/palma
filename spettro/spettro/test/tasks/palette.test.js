import { palette } from '../../src/themes/palette'
import ck from 'chalk'
import { Rgb } from '../../index'
import { trimColor } from '../util/colorValueHelper'
import { ArrX } from 'xbrief'

const
  nameLen = Object.keys(palette) |> ArrX.maxLength,
  indexLen = Object.keys(palette.red) |> ArrX.maxLength

export class PaletteTest {
  static testRgbToHsl () {
    for (let [name, colorTube] of Object.entries(palette)) {
      for (let [index, hex] of Object.entries(colorTube)) {
        const
          label = ck.hex(hex).underline(`${name.padStart(nameLen)}.${index.padEnd(indexLen)}`),
          rgb = hex |> Rgb.fromHex |> trimColor,
          hsl = rgb |> Rgb.toHsl |> trimColor;
        `[${label}] (${hex}) [${rgb}] [${hsl}]` |> console.log
      }
      '' |> console.log
    }
  }

}

// it('Palette Test: test Rgb To Hsl ', () => {
//   PaletteTest.testRgbToHsl()
// })
