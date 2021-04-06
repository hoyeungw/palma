export function rankZest (arr, excluder, comparer) {
  const inc = [], exc = []
  let [max] = arr, min = max
  for (let x of arr) {
    if (excluder(x)) {
      exc.push(x)
      continue
    }
    if (comparer(x, min)) {
      inc.unshift(x)
      min = x
      continue
    }
    if (comparer(max, x)) {
      inc.push(x)
      max = x
      continue
    }

    // min <= x <= max
  }
}