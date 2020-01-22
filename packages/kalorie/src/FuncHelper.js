export class FuncHelper {
  /**
   *
   * @param {function(*): *} pointwiseFunc
   * @return {function(*[]): *[]}
   */
  static rowwise (pointwiseFunc) {
    return (row) => row.map(x => pointwiseFunc(x))
  }

  /**
   *
   * @param {function(*): *} seinFunc function
   * @param {function(*): *} funcs function whose sole parameter and return value are typed identically
   * @return {function(*): *}
   */
  static chain (seinFunc, ...funcs) {
    return funcs.reduce((curr, prev) => x => prev(curr(x)), seinFunc)
  }

  /**
   *
   * @param {function(*): *} funcs - function whose sole parameter and return value are typed identically
   * @return {function(*): *}
   */
  static pipeline (...funcs) {
    funcs = funcs.filter(x => x)
    switch (funcs.length) {
      case 0:
        return x => x
      case 1:
        return funcs[0]
      default:
        let f = funcs.shift()
        return funcs.reduce((curr, prev) => x => prev(curr(x)), f)
    }
    // return funcs.length ? x => funcs.filter(x => x).reduce((a, b) => a |> b, x) : x => x
  }
}
