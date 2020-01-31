export function toCell (fields) {
  let o = {}, x
  for (x of fields) o[x] = []
  return o
}