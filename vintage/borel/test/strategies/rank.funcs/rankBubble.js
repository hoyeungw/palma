// Function to print m Maximum
// elements
import {} from 'veho'

const rank4ost = (arr, n) => {
  // Rank Presets
  const ranks = []
  for (let i = 0; i < n; i++) {
    let r = 1, s = 1
    for (let j = 0; j < n; j++) {
      if (j !== i && arr[j] < arr[i]) r += 1
      if (j !== i && arr[j] === arr[i]) s += 1
    }
    // Use formula to obtain rank
    ranks[i] = r + (s - 1) / 2
  }
  return ranks
}

export const rankBubble = (arr, excluder, comparer) => {
  const incls = excluder && arr.some(excluder) ? arr.filter(x => !excluder(x)) : arr
  const { length } = arr, { length: size } = incls
  const ranks = Array(length)
  for (let i = length, rank = 0, el; !!i;) {
    el = arr[--i]
    if (excluder(el)) {
      rank--
    } else {
      for (let j = size; !!j;) if (comparer(el, incls[--j]) > 0) rank++
    }
    ranks[i] = rank
    rank = 0
  }
  return ranks
}

// it('Class: test', () => {
//   const arr = [1, 6, 3, 8, NaN, NaN, 5, 0, 3]
//   arr |> deco |> console.log
//   const ranks = rank4(arr, x => isNaN(x), Comparer.numberAscending)
//   arr.zip(ranks, (a, b) => {
//     (a.toString().padStart(3) + ' => ' + b) |> console.log
//   })
// })
