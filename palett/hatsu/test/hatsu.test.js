import { Hatsu } from '../index'
import { logger } from 'palma'
import { Palett } from 'palett'

const ConsoleColors = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  grey: '90',
}

const hatsu = Hatsu.rgb([44, 181, 233])
// hatsu.yellow.italic.inverse |> console.log
hatsu |> logger
hatsu('BMW Z5') |> console.log
hatsu.bold('BMW M3') |> console.log
hatsu.yellow.italic.inverse('Lamborghini Urus') |> console.log
hatsu.red.ext.bold('Ferrari Tributo') |> logger
hatsu.black.inverse.bold('Audi A10') |> logger
hatsu.red.ext('Porsche 911') |> logger
hatsu.hex(Palett.indigo.accent_2, 'Maserati GranTurismo') |> logger

