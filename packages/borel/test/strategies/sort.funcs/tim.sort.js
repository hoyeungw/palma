/**
 * Default minimum size of a run.
 */
const DEFAULT_MIN_MERGE = 32

/**
 * Minimum ordered subsequece required to do galloping.
 */
const DEFAULT_MIN_GALLOPING = 7

/**
 * Default tmp storage length. Can increase depending on the size of the
 * smallest run to merge.
 */
const DEFAULT_TMP_STORAGE_LENGTH = 256

/**
 * Pre-computed powers of 10 for efficient lexicographic comparison of
 * small integers.
 */
const POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9]

/**
 * Estimate the logarithm base 10 of a small integer.
 *
 * @param {number} x - The integer to estimate the logarithm of.
 * @return {number} - The estimated logarithm of the integer.
 */
function log10 (x) {
  if (x < 1e5) {
    if (x < 1e2) return x < 1e1 ? 0 : 1
    if (x < 1e4) return x < 1e3 ? 2 : 3
    return 4
  }
  if (x < 1e7) return x < 1e6 ? 5 : 6
  if (x < 1e9) return x < 1e8 ? 7 : 8
  return 9
}

/**
 * Default alphabetical comparison of items.
 *
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @return {number} - A positive number if a.toString() > b.toString(), a
 * negative number if .toString() < b.toString(), 0 otherwise.
 */
function alphabeticalCompare (a, b) {
  if (a === b) return 0
  if (~~a === a && ~~b === b) {
    if (a === 0 || b === 0) return a < b ? -1 : 1
    if (a < 0 || b < 0) {
      if (b >= 0) return -1
      if (a >= 0) return 1
      a = -a
      b = -b
    }
    const al = log10(a)
    const bl = log10(b)
    let t = 0
    if (al < bl) {
      a *= POWERS_OF_TEN[bl - al - 1]
      b /= 10
      t = -1
    } else if (al > bl) {
      b *= POWERS_OF_TEN[al - bl - 1]
      a /= 10
      t = 1
    }
    if (a === b) return t
    return a < b ? -1 : 1
  }
  let aStr = String(a)
  let bStr = String(b)
  if (aStr === bStr) return 0
  return aStr < bStr ? -1 : 1
}

/**
 * Compute minimum run length for TimSort
 *
 * @param {number} n - The size of the array to sort.
 */
function minRunLength (n) {
  let r = 0
  while (n >= DEFAULT_MIN_MERGE) {
    r |= (n & 1)
    n >>= 1
  }
  return n + r
}

/**
 * Counts the length of a monotonically ascending or strictly monotonically
 * descending sequence (run) starting at array[lo] in the range [lo, hi). If
 * the run is descending it is made ascending.
 *
 * @param {array} arr - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function} compare - Item comparison function.
 * @return {number} - The length of the run.
 */
function makeAscendingRun (arr, lo, hi, compare) {
  let runHi = lo + 1
  if (runHi === hi) return 1
  // Descending
  if (compare(arr[runHi++], arr[lo]) < 0) {
    while (runHi < hi && compare(arr[runHi], arr[runHi - 1]) < 0) runHi++
    reverseRun(arr, lo, runHi)
    // Ascending
  } else {
    while (runHi < hi && compare(arr[runHi], arr[runHi - 1]) >= 0) runHi++
  }
  return runHi - lo
}

/**
 * Reverse an array in the range [lo, hi).
 *
 * @param {array} arr - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 */
function reverseRun (arr, lo, hi) {
  hi--
  let t
  while (lo < hi) {
    t = arr[lo]
    arr[lo++] = arr[hi]
    arr[hi--] = t
  }
}

/**
 * Perform the binary sort of the array in the range [lo, hi) where start is
 * the first element possibly out of order.
 *
 * @param {array} arr - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {number} el - First element possibly out of order.
 * @param {function} compare - Item comparison function.
 */
function binaryInsertionSort (arr, lo, hi, el, compare) {
  if (el === lo) el++
  for (; el < hi; el++) {
    let pivot = arr[el]
    // Ranges of the array where pivot belongs
    let left = lo, right = el
    /*
     *   pivot >= array[i] for i in [lo, left)
     *   pivot <  array[i] for i in  in [right, start)
     */
    while (left < right) {
      let mid = (left + right) >>> 1
      if (compare(pivot, arr[mid]) < 0) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    /*
     * Move elements right to make room for the pivot. If there are elements
     * equal to pivot, left points to the first slot after them: this is also
     * a reason for which TimSort is stable
     */
    let n = el - left
    // Switch is just an optimization for small arrays
    switch (n) {
      case 3:
        arr[left + 3] = arr[left + 2]
      /* falls through */
      case 2:
        arr[left + 2] = arr[left + 1]
      /* falls through */
      case 1:
        arr[left + 1] = arr[left]
        break
      default:
        while (n > 0) {
          arr[left + n] = arr[left + n - 1]
          n--
        }
    }
    arr[left] = pivot
  }
}

/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the leftmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} arr - The array in which to insert value.
 * @param {number} el - First element in the range.
 * @param {number} len - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */
function gallopLeft (value, arr, el, len, hint, compare) {
  let lastOffset = 0
  let maxOffset = 0
  let offset = 1
  if (compare(value, arr[el + hint]) > 0) {
    maxOffset = len - hint
    while (offset < maxOffset && compare(value, arr[el + hint + offset]) > 0) {
      lastOffset = offset
      offset = (offset << 1) + 1
      if (offset <= 0) offset = maxOffset
    }
    if (offset > maxOffset) offset = maxOffset
    // Make offsets relative to start
    lastOffset += hint
    offset += hint
    // value <= array[start + hint]
  } else {
    maxOffset = hint + 1
    while (offset < maxOffset && compare(value, arr[el + hint - offset]) <= 0) {
      lastOffset = offset
      offset = (offset << 1) + 1
      if (offset <= 0) offset = maxOffset
    }
    if (offset > maxOffset) offset = maxOffset
    // Make offsets relative to start
    let tmp = lastOffset
    lastOffset = hint - offset
    offset = hint - tmp
  }
  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */
  lastOffset++
  while (lastOffset < offset) {
    let m = lastOffset + ((offset - lastOffset) >>> 1)
    if (compare(value, arr[el + m]) > 0) {
      lastOffset = m + 1
    } else {
      offset = m
    }
  }
  return offset
}

/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the rightmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {arr} arr - The arr in which to insert value.
 * @param {number} el - First element in the range.
 * @param {number} len - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */
function gallopRight (value, arr, el, len, hint, compare) {
  let lastOffset = 0
  let maxOffset = 0
  let offset = 1

  if (compare(value, arr[el + hint]) < 0) {
    maxOffset = hint + 1
    while (offset < maxOffset && compare(value, arr[el + hint - offset]) < 0) {
      lastOffset = offset
      offset = (offset << 1) + 1

      if (offset <= 0) {
        offset = maxOffset
      }
    }
    if (offset > maxOffset) offset = maxOffset
    // Make offsets relative to start
    let tmp = lastOffset
    lastOffset = hint - offset
    offset = hint - tmp
    // value >= arr[start + hint]
  } else {
    maxOffset = len - hint
    while (offset < maxOffset && compare(value, arr[el + hint + offset]) >= 0) {
      lastOffset = offset
      offset = (offset << 1) + 1
      if (offset <= 0) offset = maxOffset
    }
    if (offset > maxOffset) offset = maxOffset
    // Make offsets relative to start
    lastOffset += hint
    offset += hint
  }

  /*
   * Now arr[start+lastOffset] < value <= arr[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant arr[start + lastOffset - 1] < value <=
   * arr[start + offset].
   */
  lastOffset++

  while (lastOffset < offset) {
    let m = lastOffset + ((offset - lastOffset) >>> 1)
    if (compare(value, arr[el + m]) < 0) {
      offset = m
    } else {
      lastOffset = m + 1
    }
  }
  return offset
}

class TimSort {
  // array = null
  // compare = null
  // minGallop = DEFAULT_MIN_GALLOPING
  // length = 0
  // tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH
  // stackLength = 0
  // runStart = null
  // runLength = null
  // stackSize = 0

  constructor (arr, compare) {
    this.stackSize = 0
    this.array = arr
    this.compare = compare

    this.length = arr.length

    if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
      this.tmpStorageLength = this.length >>> 1
    }

    this.tmp = new Array(this.tmpStorageLength)

    this.stackLength =
      (this.length < 120 ? 5 :
        this.length < 1542 ? 10 :
          this.length < 119151 ? 19 : 40)

    this.runStart = new Array(this.stackLength)
    this.runLength = new Array(this.stackLength)
  }

  /**
   * Push a new run on TimSort's stack.
   *
   * @param {number} runStart - Start index of the run in the original array.
   * @param {number} runLength - Length of the run;
   */
  pushRun (runStart, runLength) {
    this.runStart[this.stackSize] = runStart
    this.runLength[this.stackSize] = runLength
    this.stackSize += 1
  }

  /**
   * Merge runs on TimSort's stack so that the following holds for all i:
   * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
   * 2) runLength[i - 2] > runLength[i - 1]
   */
  mergeRuns () {
    while (this.stackSize > 1) {
      let n = this.stackSize - 2
      if ((n >= 1 &&
        this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1]) ||
        (n >= 2 &&
          this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1])) {

        if (this.runLength[n - 1] < this.runLength[n + 1]) {
          n--
        }

      } else if (this.runLength[n] > this.runLength[n + 1]) {
        break
      }
      this.mergeAt(n)
    }
  }

  /**
   * Merge all runs on TimSort's stack until only one remains.
   */
  forceMergeRuns () {
    while (this.stackSize > 1) {
      let n = this.stackSize - 2

      if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
        n--
      }

      this.mergeAt(n)
    }
  }

  /**
   * Merge the runs on the stack at positions i and i+1. Must be always be called
   * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
   *
   * @param {number} i - Index of the run to merge in TimSort's stack.
   */
  mergeAt (i) {
    let compare = this.compare
    let array = this.array

    let start1 = this.runStart[i]
    let length1 = this.runLength[i]
    let start2 = this.runStart[i + 1]
    let length2 = this.runLength[i + 1]

    this.runLength[i] = length1 + length2

    if (i === this.stackSize - 3) {
      this.runStart[i + 1] = this.runStart[i + 2]
      this.runLength[i + 1] = this.runLength[i + 2]
    }

    this.stackSize--

    /*
     * Find where the first element in the second run goes in run1. Previous
     * elements in run1 are already in place
     */
    let k = gallopRight(array[start2], array, start1, length1, 0, compare)
    start1 += k
    length1 -= k

    if (length1 === 0) {
      return
    }

    /*
     * Find where the last element in the first run goes in run2. Next elements
     * in run2 are already in place
     */
    length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare)

    if (length2 === 0) {
      return
    }

    /*
     * Merge remaining runs. A tmp array with length = min(length1, length2) is
     * used
     */
    if (length1 <= length2) {
      this.mergeLow(start1, length1, start2, length2)

    } else {
      this.mergeHigh(start1, length1, start2, length2)
    }
  }

  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length <= run2.length as it uses
   * TimSort temporary array to store run1. Use mergeHigh if run1.length >
   * run2.length.
   *
   * @param {number} elX - First element in run1.
   * @param {number} lenX - Length of run1.
   * @param {number} elY - First element in run2.
   * @param {number} lenY - Length of run2.
   */
  mergeLow (elX, lenX, elY, lenY) {
    let { compare, array, tmp } = this
    let i
    for (i = 0; i < lenX; i++) {
      tmp[i] = array[elX + i]
    }
    let cursor1 = 0, cursor2 = elY, dest = elX
    array[dest++] = array[cursor2++]
    if (--lenY === 0) {
      for (i = 0; i < lenX; i++) {
        array[dest + i] = tmp[cursor1 + i]
      }
      return
    }
    if (lenX === 1) {
      for (i = 0; i < lenY; i++) {
        array[dest + i] = array[cursor2 + i]
      }
      array[dest + lenY] = tmp[cursor1]
      return
    }
    let { minGallop } = this
    while (true) {
      let
        count1 = 0,
        count2 = 0,
        exit = false
      do {
        if (compare(array[cursor2], tmp[cursor1]) < 0) {
          array[dest++] = array[cursor2++]
          count2++
          count1 = 0
          if (--lenY === 0) {
            exit = true
            break
          }
        } else {
          array[dest++] = tmp[cursor1++]
          count1++
          count2 = 0
          if (--lenX === 1) {
            exit = true
            break
          }
        }
      } while ((count1 | count2) < minGallop)
      if (exit) {
        break
      }
      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, lenX, 0, compare)
        if (!!count1) {
          for (i = 0; i < count1; i++) {
            array[dest + i] = tmp[cursor1 + i]
          }
          dest += count1
          cursor1 += count1
          lenX -= count1
          if (lenX <= 1) {
            exit = true
            break
          }
        }
        array[dest++] = array[cursor2++]
        if (--lenY === 0) {
          exit = true
          break
        }
        count2 = gallopLeft(tmp[cursor1], array, cursor2, lenY, 0, compare)
        if (count2 !== 0) {
          for (i = 0; i < count2; i++) {
            array[dest + i] = array[cursor2 + i]
          }
          dest += count2
          cursor2 += count2
          lenY -= count2
          if (lenY === 0) {
            exit = true
            break
          }
        }
        array[dest++] = tmp[cursor1++]
        if (--lenX === 1) {
          exit = true
          break
        }
        minGallop--
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING)
      if (exit) {
        break
      }
      if (minGallop < 0) {
        minGallop = 0
      }
      minGallop += 2
    }
    this.minGallop = minGallop
    if (minGallop < 1) {
      this.minGallop = 1
    }
    if (lenX === 1) {
      for (i = 0; i < lenY; i++) {
        array[dest + i] = array[cursor2 + i]
      }
      array[dest + lenY] = tmp[cursor1]
    } else if (lenX === 0) {
      throw new Error('mergeLow preconditions were not respected')
    } else {
      for (i = 0; i < lenX; i++) {
        array[dest + i] = tmp[cursor1 + i]
      }
    }
  }

  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length > run2.length as it uses
   * TimSort temporary array to store run2. Use mergeLow if run1.length <=
   * run2.length.
   *
   * @param {number} elX - First element in run1.
   * @param {number} lenX - Length of run1.
   * @param {number} elY - First element in run2.
   * @param {number} lenY - Length of run2.
   */
  mergeHigh (elX, lenX, elY, lenY) {
    let
      { compare, array, tmp } = this,
      i
    for (i = 0; i < lenY; i++) {
      tmp[i] = array[elY + i]
    }
    let
      cursor1 = elX + lenX - 1,
      cursor2 = lenY - 1,
      dest = elY + lenY - 1,
      customCursor = 0,
      customDest = 0
    array[dest--] = array[cursor1--]
    if (--lenX === 0) {
      customCursor = dest - (lenY - 1)
      for (i = 0; i < lenY; i++) {
        array[customCursor + i] = tmp[i]
      }
      return
    }
    if (lenY === 1) {
      dest -= lenX
      cursor1 -= lenX
      customDest = dest + 1
      customCursor = cursor1 + 1
      for (i = lenX - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i]
      }
      array[dest] = tmp[cursor2]
      return
    }
    let { minGallop } = this
    while (true) {
      let count1 = 0, count2 = 0, exit = false
      do {
        if (compare(tmp[cursor2], array[cursor1]) < 0) {
          array[dest--] = array[cursor1--]
          count1++
          count2 = 0
          if (--lenX === 0) {
            exit = true
            break
          }
        } else {
          array[dest--] = tmp[cursor2--]
          count2++
          count1 = 0
          if (--lenY === 1) {
            exit = true
            break
          }
        }
      } while ((count1 | count2) < minGallop)
      if (exit) {
        break
      }
      do {
        count1 = lenX - gallopRight(tmp[cursor2], array, elX, lenX, lenX - 1, compare)
        if (count1 !== 0) {
          dest -= count1
          cursor1 -= count1
          lenX -= count1
          customDest = dest + 1
          customCursor = cursor1 + 1
          for (i = count1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i]
          }
          if (lenX === 0) {
            exit = true
            break
          }
        }
        array[dest--] = tmp[cursor2--]
        if (--lenY === 1) {
          exit = true
          break
        }
        count2 = lenY - gallopLeft(array[cursor1], tmp, 0, lenY, lenY - 1, compare)
        if (count2 !== 0) {
          dest -= count2
          cursor2 -= count2
          lenY -= count2
          customDest = dest + 1
          customCursor = cursor2 + 1
          for (i = 0; i < count2; i++) {
            array[customDest + i] = tmp[customCursor + i]
          }
          if (lenY <= 1) {
            exit = true
            break
          }
        }
        array[dest--] = array[cursor1--]
        if (--lenX === 0) {
          exit = true
          break
        }
        minGallop--
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING)
      if (exit) {
        break
      }
      if (minGallop < 0) {
        minGallop = 0
      }
      minGallop += 2
    }
    this.minGallop = minGallop
    if (minGallop < 1) {
      this.minGallop = 1
    }
    if (lenY === 1) {
      dest -= lenX
      cursor1 -= lenX
      customDest = dest + 1
      customCursor = cursor1 + 1
      for (i = lenX - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i]
      }
      array[dest] = tmp[cursor2]
    } else if (lenY === 0) {
      throw new Error('mergeHigh preconditions were not respected')
    } else {
      customCursor = dest - (lenY - 1)
      for (i = 0; i < lenY; i++) {
        array[customCursor + i] = tmp[i]
      }
    }
  }
}

/**
 * Sort an array in the range [lo, hi) using TimSort.
 *
 * @param {array} arr - The array to sort.
 * @param {function=} [compare] - Item comparison function. Default is alphabetical
 * @param {number} [lo] - First element in the range (inclusive).
 * @param {number} [hi] - Last element in the range.
 *     comparator.
 */
export function timsort (arr, compare, lo, hi) {
  arr = arr.slice()
  if (!Array.isArray(arr)) throw new TypeError('Can only sort arrays')
  /*
   * Handle the case where a comparison function is not provided. We do
   * lexicographic sorting
   */
  if (!compare) {
    compare = alphabeticalCompare
  } else if (typeof compare !== 'function') {
    hi = lo
    lo = compare
    compare = alphabeticalCompare
  }
  if (!lo) lo = 0
  if (!hi) hi = arr.length
  let remain = hi - lo
  // The array is already sorted
  if (remain < 2) return
  let runLength = 0
  // On small arrays binary sort can be used directly
  if (remain < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(arr, lo, hi, compare)
    binaryInsertionSort(arr, lo, hi, lo + runLength, compare)
    return
  }
  let ts = new TimSort(arr, compare)
  let minRun = minRunLength(remain)
  do {
    runLength = makeAscendingRun(arr, lo, hi, compare)
    if (runLength < minRun) {
      let force = remain
      if (force > minRun) force = minRun
      binaryInsertionSort(arr, lo, lo + force, lo + runLength, compare)
      runLength = force
    }
    // Push new run and merge if necessary
    ts.pushRun(lo, runLength)
    ts.mergeRuns()
    // Go find next run
    remain -= runLength
    lo += runLength
  } while (remain !== 0)
  // Force merging of remaining runs
  ts.forceMergeRuns()
  return arr
}
