/**
 *
 * @param {Object} palett
 * @returns {Object|{colors:string[],degrees:string[]}}
 */
export const addProps = (palett) => {
  Reflect.defineProperty(palett, 'colors', {
    get () {
      return Object.keys(palett)
    },
    enumerable: false
  })
  Reflect.defineProperty(palett, 'degrees', {
    get () {
      for (let color in palett) return Object.keys(palett[color])
    },
    enumerable: false
  })
  return palett
}
