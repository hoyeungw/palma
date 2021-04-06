import { Ziggurat } from './normDistRand/ziggurat'
import { randIdx, randSel, random } from './helper'

export class Roulett {
  /**
   * From [min, max] return a random integer.
   * Of [min, max], both min and max are inclusive.
   * @param {number} min(inclusive) - int
   * @param {number} max(inclusive) - int
   * @returns {number} int
   */
  static between (min, max) {
    return ~~(random() * (max - min + 1)) + min
  }

  /**
   * From [min, max) return a random integer.
   * Of [min, max), min is inclusive but max is exclusive.
   * @param {number} min(inclusive) - int
   * @param {number} max(exclusive) - int
   * @returns {number} int
   */
  static rand (min, max) {
    return ~~(random() * (max - min)) + min
  }

  static index (len) {
    return ~~(random() * len)
  }

  static arrayIndex (arr) {
    return randIdx(arr)
  }

  static element (arr) {
    return randSel(arr)
  }

  static key (obj) {
    return randSel(Object.keys(obj))
  }

  static value (obj) {
    return randSel(Object.values(obj))
  }

  static entry (obj) {
    return randSel(Object.entries(obj))
  }

  /**
   * Return an array of random number that follows gaussian distribution(normal distribution).
   * @param {number} len - length of the returned array
   * @param {number} mean - mean
   * @param {number} stdev - standard deviation
   * @returns {number[]}
   */
  static gaussSamples (len, mean = 0, stdev = 1) {
    const z = new Ziggurat(mean, stdev), arr = Array(len)
    for (let i = 0; i < len; i++) arr[i] = z.next()
    return arr
  }
}

