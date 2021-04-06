import { log, random, sqrt }  from '../helper'

let spare
let hasSpare = false

export const marsagliaPolar = (mean = 0, stdev = 1) => {
  if (hasSpare) {
    hasSpare = false
    return spare * stdev + mean
  } else {
    hasSpare = true
    let u, v, s
    do {
      u = random() * 2 - 1
      v = random() * 2 - 1
      s = u * u + v * v
    } while (s >= 1 || s === 0)
    s = sqrt(-2.0 * log(s) / s)
    spare = v * s
    return mean + stdev * u * s
  }
}
