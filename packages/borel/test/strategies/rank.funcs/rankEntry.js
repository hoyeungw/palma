const sortEntry = (arr, excluder, comparer) => {
  const comp = (!excluder)
    ? comparer
    : (a, b) => {
      if (excluder(a)) return 1
      if (excluder(b)) return -1
      return comparer(a, b)
    }
  return arr
    .map((x, i) => [x, i])
    .sort(([a, x], [b, y]) => comp(a, b))
}

const _getRanks = (sorted) => {
  const
    { length } = sorted,
    arr = Array(sorted.length)
  let r
  // for (let [i, r] of sortedIndexes.entries()) arr[r] = i
  for (let i = length; !!i;) {
    [, r] = sorted[--i]
    arr[r] = i
  }
  return arr
}

export const rankEntry = (arr, excluder, comparer) => {
  return sortEntry(arr, excluder, comparer)|> _getRanks
}