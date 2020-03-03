export function bound (max, min) {
  return this.dif
    ? { min, dif: max - min }
    : { max, min }
}

export const Bound = (dif) => bound.bind({ dif })

export const toBound = (max, min, dif) => bound.call({ dif }, max, min)
