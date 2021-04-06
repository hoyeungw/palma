export class Rank {
  /**
   *
   * @param {*[]} arr
   * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return negative number or
   * zero, then 'prev' comes first, else 'next' comes first.
   * @return {*[]} Sorted arr.
   */
  static sort (arr, comparer) {
    return arr.slice().sort(comparer)
  }

  /**
   *
   * @param {*[]} arr
   * @param {function(*,*):number} comparer Compare 'prev' & 'next' element in an array. If return < 0, 'prev' comes first. If return > 0, 'next' comes first.
   * @param {function(*):boolean} [filter]
   * @return {number[]} Rank order array, where 0 denote the first.
   */
  static rank (arr, comparer, filter) {
    const sorted = (!filter ? arr.slice() : arr.filter(filter)).sort(comparer)
    return arr.map(x => sorted.indexOf(x))
  }

  /**
   *
   * @param {*[]} arr
   * @param {number[]} arrRank array of the same length as 'arr', containing rank order of 'arr', 0 comes first.
   * @return {*[]}
   */
  static reorderBy (arr, arrRank) {
    const rsl = Array(arr.length)
    for (let [i, ord] of arrRank.entries()) rsl[ord] = arr[i]
    return rsl
  }
}