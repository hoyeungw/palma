export const expandHex = (hex, hi) => {
  hi = hi || hex.length
  let x = ''
  for (let i = 0, el; i < hi; i++) {
    el = hex[i]
    x += el + el
  }
  // for (let y of hex) x += y + y
  return x
}
