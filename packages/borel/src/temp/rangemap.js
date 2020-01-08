import { Stat } from '../borel/Stat'

const mapper = (arr, min, dif, _min, _dif) => {
  const r = _dif / dif
  return arr.map(x => (x - min) * r + _min)
}

const rangeMap = (arr, { min: m, dif: d }) => {
  if (d === 0) return arr.map(() => m)
  const { min, dif } = Stat.bound(arr, { dif: true })
  return mapper(arr, min, dif, m, d)
}