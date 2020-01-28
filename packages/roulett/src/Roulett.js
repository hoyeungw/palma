import { Ziggurat } from './normDistRand/ziggurat'
import { randIdx, randSel, random } from './helper'

export class Roulett {
  /**
   * Generate a random integer between [min, max].
   * Both min & max are inclusive.
   * @param {Number} min  Int
   * @param {Number} max  Int
   * @returns {Number}  Int
   */
  static between (min, max) {
    return ~~(random() * (max - min + 1)) + min
  }

  /**
   * Generate a random integer between [min, max).
   * Notice: min is inclusive & max is exclusive.
   * @param {Number} min  Int
   * @param {Number} max(exclusive)  Int
   * @returns {Number}  Int
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

  static gaussSamples (len, mean = 0, stdev = 1) {
    const z = new Ziggurat(mean, stdev), arr = Array(len)
    for (let i = 0; i < len; i++) arr[i] = z.next()
    return arr
  }
}

