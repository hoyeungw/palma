import { Rgb } from 'farbe'

const pads = (arr) => arr.map(x => x.toString().padStart(3, ' '))
export const colorFormatter = (type) => {
  switch (type) {
    case 'rgb':
      return x => x |> Rgb.fromHex |> pads
    case 'hsl':
      return x => x |> Rgb.fromHex |> Rgb.toHsl |> pads
    case 'hex':
    default:
      return x => x
  }
}
