import { Hatsu } from 'hatsu'

const colorTube = Hatsu.hex

export const paint = (target, hexColor) => target |> (hexColor |> colorTube)
export const ind = (indent) => indent ? '  '.repeat(indent) : ''
