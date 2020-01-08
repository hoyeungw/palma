import chalk from 'chalk'

const _hsl = chalk.hsl.bind(chalk)

/**
 * Create a chalk from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {Chalk}
 */
export const tube = (hsl) => _hsl.apply(null, hsl)

export const _f = (n, h, a, l) => {
  const k = (n + h / 30) % 12
  return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
}
