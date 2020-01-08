import { Ar } from 'veho'
import { Zu } from '../../dist/index.esm'

const swap = (arr, i, j) => {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

/**
 *
 * randoms(*sort): random data
 * ascending(\sort): descending data
 * descending(/sort): ascending data
 * ascW3exch(3sort:) ascending data but with 3 random exchanges
 * duplicates(~sort): many duplicates
 * identical(=sort): all equal
 *
 * not included !sort: worst case scenario
 *
 * @param length
 * @param delta
 * @returns {{
 *            randoms: [number[]],
 *            ascending: [number[]],
 *            descending: [number[]],
 *            ascW3exch: [number[]],
 *            duplicates: [number[]],
 *            identical: [number[]],
 *           }}
 */
export const sortScenariosLcher = (length = 128, delta = 4) => {
  const bound = length * 2,
    randoms = Ar.ini(length, () => Zu.rand(0, bound)),
    ascending = Ar.arithmetic(length, 0, delta),
    descending = ascending.slice().reverse(),
    ascW3exch = ascending.slice(), dups = ~~(Math.sqrt(length)),
    duplicates = Ar.ini(length, i => i % dups),
    identical = Ar.ini(length, ~~(length / delta))
  for (let i = 0; i < 3; i++) swap(ascW3exch, Zu.rand(0, length), Zu.rand(0, length))
  return {
    randoms: [randoms],
    ascending: [ascending],
    descending: [descending],
    ascW3exch: [ascW3exch],
    duplicates: [duplicates],
    identical: [identical],
  }
}

