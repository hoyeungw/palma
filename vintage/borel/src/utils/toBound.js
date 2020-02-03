export const toBound = (max, min, dif) =>
  dif
    ? { min, dif: max - min }
    : { max, min }
