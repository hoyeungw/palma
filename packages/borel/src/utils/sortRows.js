export function sortRows (rows, y, sort) {
  if (typeof sort === 'function')
    return rows.sort((a, b) => sort(a[y], b[y]))
  switch (sort) {
    case true:
    case 'desc':
      return rows.sort((a, b) => b[y] - a[y])
    case 'asc':
      return rows.sort((a, b) => a[y] - b[y])
    case false:
    default:
      return rows
  }
}
