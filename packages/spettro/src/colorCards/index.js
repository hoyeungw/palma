import chalk from 'chalk'
import { Ar, Mx } from 'veho'
import { greys, palette } from '../themes/palette'

const expReg = /[A-Z]+|[0-9]+/g

const sepWords = (jvExp) =>
  jvExp.replace(expReg, it => ' ' + it.toLowerCase()).trim()

const hex = chalk.hex.bind(chalk)
/**
 *
 * @param {string} name
 * @returns {string}
 */
const readify = name => (name |> sepWords)
  .replace('light ', 'l.')
  .replace('deep ', 'd.')

const
  lightens = Ar.ini(5, (i) => `lighten_${i + 1}`),
  darkens = Ar.ini(4, (i) => `darken_${i + 1}`),
  accents = Ar.ini(4, (i) => `accent_${i + 1}`)

export class ColorCards {
  static get palette () {
    const side = [...accents.reverse(), ...lightens.reverse(), 'base', ...darkens,]
    return {
      side,
      banner: Object.entries(palette)
        .map(([name, { base }]) => name |> readify |> hex(base)),
      matrix: Object.values(palette)
        .map(tube =>
          side.map(el => tube[el].toUpperCase() |> hex(tube[el]).inverse)
        )
        |> Mx.transpose
    }
  }

  static get greys () {
    const side = [...lightens.reverse(), 'base', ...darkens,]
    return {
      side,
      banner: Object.entries(greys)
        .map(([name, { base }]) => name |> readify |> chalk.hex(base)),
      matrix: Object.values(greys)
        .map(tube =>
          side.map(el => tube[el].toUpperCase() |> hex(tube[el]).inverse)
        )
        |> Mx.transpose
    }
  }
}
