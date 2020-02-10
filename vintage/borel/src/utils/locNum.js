import { toNumChecker } from './toNumChecker'

export const firstNumInArray = (ar, lo, hi, { level = 0 } = {}) => {
  for (let el, isNum = toNumChecker(level); lo < hi; lo++)
    if (isNum(el = ar[lo]))
      return [lo, el]
  return [hi, NaN]
}

export const firstNumInMatrix = (mx, t, b, l, r, { level = 0 } = {}) => {
  for (let el, isNum = toNumChecker(level); t < b; t++)
    for (l = 0; l < r; l++)
      if (isNum(el = mx[t][l]))
        return [t, l, el]
  return [b, r, NaN]
}

export const firstNumInColumn = (mx, t, b, c, { level = 0 } = {}) => {
  for (let el, isNum = toNumChecker(level); t < b; t++)
    if (isNum(el = mx[t][c]))
      return [t, el]
  return [b, NaN]
}
