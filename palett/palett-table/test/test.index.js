import { PalettTable } from '../index'
import { CrosTabX } from 'xbrief/src/brief/CrosTabX'
import { Degrees } from '../src/Degrees'
import { ColorGroups } from '../src/ColorGroups'
import { deco } from 'xbrief'

export class PalettTableTest {
  static showCrosTab ({ space, degrees, colors, average, cellColor } = {}) {
    PalettTable.crosTab({ space, degrees, colors, average, cellColor })|> CrosTabX.brief |> console.log
  }
}

// PalettTable.meta() |> deco |> console.log

PalettTableTest.showCrosTab({
  space: 'hsl',
  degrees: Degrees.entire,
  colors: [...ColorGroups.grey, ...ColorGroups.red],
  average: false,
  cellColor: true
})
