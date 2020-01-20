import { CrosX } from 'crostab'
import { PalettTable } from '../index'

export class PalettTableTest {
  static showPalett (colorType) {
    const crosTab = PalettTable.palett(colorType)
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }

  static showGreys (colorType) {
    const crosTab = PalettTable.greys(colorType)
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

PalettTableTest.showPalett('hsl')
