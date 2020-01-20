import { Hatsu } from 'hatsu'

/**
 * Create a hatsu tube from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */
export const tube = (hsl) => Hatsu.hsl(hsl)
