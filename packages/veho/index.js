/**
 * Take the first "n" elements from an array.
 * @param len. The number denote the first "n" elements in an array.
 * @returns {*[]}. A new array length at "len".
 */

Array.prototype.take = function (len) {
  return this.slice(0, len)
}

Array.prototype.zip = function (another, zipper) {
  const { length } = this, arr = Array(length)
  for (let i = 0; i < length; i++) arr[i] = zipper(this[i], another[i], i)
  return arr
  // return Array.from({ length: size }, (v, i) => zipper(this[i], another[i], i))
  // return this.map((x, i) => zipper(x, another[i]))
}

export { Pivot } from './src/utils/Pivot'
export { PivotModes } from './src/utils/PivotModes'
export { Ar } from './src/Ar'
export { Mx } from './src/Mx'
export { Dc } from './src/Dc'
export { Ob } from './src/Ob'
export { Samples } from './src/Samples'
export { Fn } from './src/Fn'
export { clone } from './src/misc/clone'
