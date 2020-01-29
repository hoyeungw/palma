export const render = (tx, { indent, stream }) => {
  if (tx && tx.length) stream.push(tx)
  return ' '.repeat(indent << 1) + stream.join(' ')
}
