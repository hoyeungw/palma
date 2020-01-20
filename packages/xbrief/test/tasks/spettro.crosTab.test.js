import { CrosTab, CrosX } from 'crostab'
import { Hatsu } from 'hatsu'
import { Palett } from 'palett'
import { Mx } from 'veho'
import { StrX } from '../../index'

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
    CrosX.brief(crosTab, { ansi: true })  |> console.log
    '' |> console.log
  }
}

// it('Palette Cros Tab Test: test', () => {
//   PaletteCrosTabTest.test()
// })
