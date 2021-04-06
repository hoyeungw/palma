import { Presets } from '../index'
import { Ob } from 'veho'
import { logger } from '@spare/logger'
import { deco, decoLog } from '@spare/deco'
import { xr } from '@spare/xr'
import { Hatsu } from 'hatsu'
import { Rgb, Hsl } from 'farbe'
import { Mx } from 'veho/src/Mx'
import { almostEquals } from 'aryth'

const range = (min, max, len) => {
  let delta = (max - min) / (len - 1)
  const ar = Array(len)
  if (almostEquals(delta, 0, 0.0008)) delta = 0
  for (let i = 0; i < len; i++) ar[i] = min + i * delta
  return ar
}

const toHsl = hex => Rgb.fromHex(hex) |> Rgb.toHsl
const toHex = hsl => Hsl.toRgb(hsl) |> Rgb.toHex
for (let theme in Presets) {
  const effects = Ob.mapValues(Presets[theme], hex => hex|> toHsl |> Hatsu.hex(hex))
  const { max, min } = Presets[theme]
  xr(theme, effects |> deco) |> logger
  const ranges = Mx.mapColumns([min |> toHsl, max |> toHsl], ([min, max]) => range(min, max, 7))
  ranges.unshift(Presets[theme].na |> toHsl)
  ranges.map((hsl, i) => hsl |> toHex |> Hatsu.hsl(hsl)) |> logger
}
