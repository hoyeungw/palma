import { CrosTab } from 'crostab'
import { CrosTabX } from '../../index'
import { StrX } from '../../index'
import { Hatsu } from 'hatsu'
import { Palett } from 'palett'
import { Mx } from 'veho'

const repl = x => x.replace('light ', 'l.').replace('deep ', 'd.')
const { jv2py: sep } = StrX

export class PaletteCrosTabTest {
  static test () {
    const crosTab = CrosTab.from({
      side: Object
        .keys(Palett.red),
      banner: Object
        .entries(Palett)
        .map(([name, { base }]) => name |> sep |>repl |> Hatsu.hex(base)),
      matrix: Object
        .values(Palett)
        .map(tube => Object
          .values(tube)
          .map(x => x.toUpperCase() |> Hatsu.hex(x).inverse)
        )
        |> Mx.transpose
    })
    CrosTabX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

PaletteCrosTabTest.test()
// it('Palette Cros Tab Test: test', () => {
//   PaletteCrosTabTest.test()
// })
