// import { quickSort, quickSortBy } from './sort/quickSort'

// import { timSort } from './sort/timSort'

// If compareFunction(a, b) is less than 0, sort a to an index lower than b (i.e. a comes first).
// If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other.
// If compareFunction(a, b) is greater than 0, sort b to an index lower than a (i.e. b comes first).

class Comparer {
  static stringAscending (a, b) {
    return a.localeCompare(b)
  }

  static stringDescending (a, b) {
    return b.localeCompare(a)
  }

  static numberAscending (a, b) {
    return a - b
  }

  static numberDescending (a, b) {
    return b - a
  }
}

export {
  Comparer
}
