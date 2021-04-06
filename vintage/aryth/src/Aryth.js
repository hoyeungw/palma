/**
 *
 * @param {number} x
 * @returns {number}
 */
export const intExponent = x => ~~(Math.log10(x))

/**
 *
 * @param {number} x
 * @returns {number}
 */
export const round = x => (x + (x > 0 ? 0.5 : -0.5)) << 0

export const almostEquals = (x, y, epsilon) => Math.abs(x - y) < epsilon

export const almostInt = (x, epsilon) => {
  // let rounded = Math.round(x)
  // return rounded - epsilon < x && rounded + epsilon > x
  return Math.abs(x - round(x)) < epsilon
}

