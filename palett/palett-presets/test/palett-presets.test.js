import { Presets } from '../index'
import { Ob } from 'veho'
import { logger } from '@spare/logger'
import { deco } from '@spare/deco'
import { xr } from '@spare/xr'
import { Hatsu } from 'hatsu'

for (let theme in Presets) {
  const effects = Ob.mapValues(Presets[theme], hex => hex |> Hatsu.hex(hex))
  xr(theme, effects |> deco) |> logger
}
