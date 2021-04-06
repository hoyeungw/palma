import { Xr } from 'xbrief'

const ymdToInt = ([y, m, d]) => ((y & 0xffff) << 9) + ((m & 0xf) << 5) + ((d & 0x1f) << 0)

const intToYmd = n => {
  return [n >> 9 & 0xffff, n >> 5 & 0xf, n & 0x1f]
}

const dates = [
  [2020, 1, 1],
  [2020, 2, 1],
  [2020, 3, 1],
  [2020, 4, 1],
  [2020, 5, 1],
  [2020, 6, 1],
  [2020, 7, 1],
  [2020, 8, 1],
  [2020, 9, 1],
  [2020, 10, 1],
  [2020, 11, 1],
  [2020, 12, 1],
]

// const ints = dates.map(ymdToInt)
let n0 = 0
for (let ymd of dates) {
  const n = ymdToInt(ymd)
  Xr(ymd).tag('int', n).tag('ymd', intToYmd(n)).tag('diff', n - n0).say |> console.log
  n0 = n
}
