import { Hatsu } from 'hatsu'

/**
 * Create a chalk from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */
export const tube = (hsl) => Hatsu.hsl(hsl)
