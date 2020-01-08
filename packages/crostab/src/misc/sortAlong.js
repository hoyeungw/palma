/**
 * If y >= 0 then sort rows, else (e.g. y===undefined) sort keys.
 * @param {*[]} keys
 * @param {*[][]} rows
 * @param {function(*,*):number} comparer
 * @param {number} [y]
 * @returns {[*[], *[][]]}
 */
export const sortAlong = (keys, rows, comparer, y) => {
  const
    comp = (a, b) => comparer(a[0], b[0]),
    ks = Array(keys.length),
    rs = y >= 0
      ? rows.map((r, i) => [r[y], keys[i], r])
        .sort(comp)
        .map(([, k, r], i) => {
          ks[i] = k
          return r
        })
      : rows.map((r, i) => [keys[i], r])
        .sort(comp)
        .map(([k, r], i) => {
          ks[i] = k
          return r
        })
  return [ks, rs]
}
