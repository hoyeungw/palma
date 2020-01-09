import { CrosX } from 'crostab'
import { ColorCards } from '../../src/colorCards'

export class PaletteCrosTabTest {
  static showPalette () {
    const crosTab = ColorCards.palette
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }

  static showGreys () {
    const crosTab = ColorCards.greys
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

// PaletteCrosTabTest.showPalette()
