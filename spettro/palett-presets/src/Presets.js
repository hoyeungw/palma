import { Greys, Palett } from 'palett'

export const Presets = {
  fresh: {
    max: Palett.lightGreen.accent_3,
    min: Palett.red.accent_2,
    na: Greys.brown.base
  },
  subtle: {
    max: Greys.grey.lighten_5,
    min: Greys.grey.darken_1,
    na: Palett.indigo.lighten_2,
  }
}
