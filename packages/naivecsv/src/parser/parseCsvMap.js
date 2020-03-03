export const parseCsvMap = (csvText, de = ',', lf = '\n') => {
  return csvText
    .split(lf)
    .map(row => row.split(de).map(word => word.trim()))
}
