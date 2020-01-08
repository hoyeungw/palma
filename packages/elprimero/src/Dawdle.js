export class Dawdle {
  static async linger (ms, asyncFunc, ...args) {
    return await Promise
      .all([
        asyncFunc.apply(null, args),
        Dawdle.timeout(ms)
      ]).then(([it]) => {
          return it
        }
      )
  }

  static timeout (ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    )
  }
}