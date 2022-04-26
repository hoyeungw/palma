import { CrosTab, CrosTabX } from '../../index'
import { PalettTable }       from 'palett-table'

/**
 * @type { CrosTab }
 */
const ct = CrosTab.from(PalettTable.crosTab())

const readableDegrees = ['accent_3', 'base', 'darken_1']
const greens = ['cyan', 'teal', 'green', 'l.green']
ct.select({ side: readableDegrees, banner: greens }) |> CrosTabX.brief |> console.log

