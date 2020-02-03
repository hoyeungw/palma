// Python code to find
// rank of elements
import { Ar } from 'veho'

const rankify_improved = (arr) => {
// create rank vector
  const ranks = Ar.ini(arr.length, 0)
// Create an auxiliary array of tuples
// Each tuple stores the data as well
// as its index in arr
  const list = arr.map((x, i) => [x, i])
// list[][0] is the data && list[][1] is
// the index of data in arr

// Sort list according to first element
  list.sort(key = x => x[0])
  let [rank, n, i] = [1, 1, 0]
  let j
  while (i < arr.length) {
    j = i
    // Get no of elements with equal rank
    while (j < arr.length - 1 && list[j][0] == list[j + 1][0]) j += 1
    n = j - i + 1
    for (j of range(n)) {
// For each equal element use formula
// obtain index of list[i+j][0] in arr
      let idx = list[i + j][1]
      ranks[idx] = rank + (n - 1) * 0.5
    }
// Increment rank && i
    rank += n
    i += n
  }
  return ranks
}

const range = (x) => {
  return Ar.ini(x, i => i)
}