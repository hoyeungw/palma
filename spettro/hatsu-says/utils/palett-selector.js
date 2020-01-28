import { ColorGroups, Degrees, PalettTable } from 'palett-table'
import { Roulett } from 'roulett'

const xPalett = PalettTable.crosTab({
  degrees: Degrees.readable,
  colors: ColorGroups.rainbow
})

export class PalettSelector {
  static pool = xPalett.ht * xPalett.wd

  static random () {
    const color = Roulett.element(xPalett.banner)
    const degree = Roulett.element(xPalett.side)
    const hex = xPalett.queryCell(degree, color)
    return { color, degree, hex }
  }
}
