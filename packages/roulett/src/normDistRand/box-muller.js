import { random, sqrt, log, cos, sin, PI } from '../helper'

const PRECISION = 1e9
const _2PI = PI * 2

export const boxMullerStable = (mean, std) => {
  const
    a = random(),
    b = random(),
    x = sqrt(-2.0 * log(a)) * cos(_2PI * b)
  // y = sqrt(-2.0 * log(a)) * sin(_2PI * b)
  return x * std + mean
}

export const boxMuller = () => {
  let u = 0, v = 0
  while (u === 0) u = random() //Converting [0,1) to (0,1)
  while (v === 0) v = random()
  return sqrt(-2.0 * log(u)) * cos(_2PI * v)
}
