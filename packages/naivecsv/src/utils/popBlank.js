export const popBlank = rows => {
  let { length: l } = rows, tail
  while (l) {
    tail = rows[--l]
    if (tail.length && tail.some(x => x && x.trim().length)) break
    rows.pop()
  }
  return rows
}
