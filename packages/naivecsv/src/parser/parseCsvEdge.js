export const parseCsvEdge = (csvText, { de = ',', lf = '\r\n' } = {}) => {
  return csvText
    .split(lf)
    .map(row => row.split(de).map(word => word.trim()))
}
