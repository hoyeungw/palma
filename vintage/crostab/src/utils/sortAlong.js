/**
 * If y >= 0 then sort rows, else (e.g. y===undefined) sort keys.
 * @param {*[]} keys
 * @param {*[][]} bands
 * @param {function(*,*):number} comparer
 * @param {number} [y]
 * @returns {[*[], *[][]]}
 */
export const sortAlong = (keys, bands, comparer, y) => {
  const keyComparer = (a, b) => comparer(a[0], b[0])
  const nkeys = Array(keys.length)
  const nbands = y >= 0
    ? bands
      .map((r, i) => [r[y], keys[i], r])
      .sort(keyComparer)
      .map(([, k, r], i) => (nkeys[i] = k , r))
    : bands
      .map((r, i) => [keys[i], r])
      .sort(keyComparer)
      .map(([k, r], i) => (nkeys[i] = k, r))
  return [nkeys, nbands]
}
