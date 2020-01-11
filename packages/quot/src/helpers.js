import chalk from 'chalk'

const toChalk = chalk.hex.bind(chalk)

export const paint = (target, hexColor) => target |> (hexColor |> toChalk)
export const ind = (indent) => indent ? '  '.repeat(indent) : ''
