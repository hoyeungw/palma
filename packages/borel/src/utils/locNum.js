import { isNumLcher } from './isNumLcher'

export const locNumInAr = (arr, sta, end, { level = 0 } = {}) => {
  for (let el, isNum = isNumLcher(level); sta < end; sta++) {
    el = arr[sta]
    if (isNum(el)) return [sta, el]
  }
  return [end, NaN]
}

export const locNumInMx = (mx, ri, re, ci, ce, { level = 0 } = {}) => {
  for (let el, isNum = isNumLcher(level); ri < re; ri++) {
    for (ci = 0; ci < ce; ci++) {
      el = mx[ri][ci]
      if (isNum(el)) return [ri, ci, el]
    }
  }
  return [re, ce, NaN]
}

export const locNumInCol = (mx, ri, re, c, { level = 0 } = {}) => {
  for (let el, isNum = isNumLcher(level); ri < re; ri++) {
    el = mx[ri][c]
    if (isNum(el)) return [ri, el]
  }
  return [re, NaN]
}