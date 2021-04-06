/**
 *
 * @param {*[]}arr
 * @param {function(*):boolean} excluder
 * @param {function(*,*):number} comparer
 * @returns {*}
 */
export const rankNative2 = (arr, excluder, comparer) => {
  const comp = (!excluder)
    ? comparer
    : (a, b) => {
      if (excluder(a)) return 1
      if (excluder(b)) return -1
      return comparer(a, b)
    }
  const sorted = arr.slice().sort(comp)
  return arr.map(x => sorted.indexOf(x))
}

/**
 *
 * @param {*[]}arr
 * @param {function(*):boolean} excluder
 * @param {function(*,*):number} comparer
 * @returns {*}
 */
export const rankNative = (arr, excluder, comparer) => {
  const sorted = arr.filter(x => !excluder(x)).sort(comparer)
  return arr.map(x => sorted.indexOf(x))
}