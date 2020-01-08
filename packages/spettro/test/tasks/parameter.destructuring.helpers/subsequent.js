import { pal } from './config'

const { max, min } = pal.foo

export function subsequent ({
  mark: {
    max = max,
    min = min
  } = {},
  direct = 0
} = {}) {
  return {
    max, min, direct
  }
}