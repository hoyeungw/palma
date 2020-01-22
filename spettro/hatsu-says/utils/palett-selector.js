import { ColorGroups, Degrees, PalettTable } from 'palett-table'
import { Ar } from 'veho/src/Ar'

const palCrosTab = PalettTable.crosTab({
  degrees: Degrees.readable,
  colors: ColorGroups.rainbow
})

const poolSize = palCrosTab.ht * palCrosTab.wd

export class PalettSelector {
  static poolSize = poolSize

  static random () {
    const sideTag = Ar.randSample(palCrosTab.side)
    const banrTag = Ar.randSample(palCrosTab.banner)
    const color = palCrosTab.queryCell(sideTag, banrTag)
    return { color: banrTag, degree: sideTag, hex: color }
  }
}
