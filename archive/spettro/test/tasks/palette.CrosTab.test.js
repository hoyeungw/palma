import { CrosTabX} from 'xbrief'
import { ColorCards } from '../../src/colorCards'

export class PaletteCrosTabTest {
  static showPalette () {
    const crosTab = ColorCards.palette
    CrosTabX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }

  static showGreys () {
    const crosTab = ColorCards.greys
    CrosTabX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

// PaletteCrosTabTest.showPalette()
