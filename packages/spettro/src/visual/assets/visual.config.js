import { greys, palette } from '../../themes/palette'

export const marks = {
  fresh: {
    max: palette.lightGreen.accent_3,
    min: palette.red.accent_2,
    na: greys.brown.base
  },
  subtle: {
    max: greys.grey.lighten_5,
    min: greys.grey.darken_1,
    na: palette.indigo.lighten_2,
  }
}
